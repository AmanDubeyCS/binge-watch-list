import { NextRequest, NextResponse } from "next/server"

const CACHE_DURATION = 60 * 5
const cache = new Map<string, { data: any; expires: number }>()

function sanitizeResponseUrls(data: any): any {
  if (data.next) data.next = data.next.replace(/key=[^&]+&?/, "")
  if (data.previous) data.previous = data.previous.replace(/key=[^&]+&?/, "")
  return data
}

function buildQueryParams(params: Record<string, string | undefined>): string {
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value)
  })
  return queryParams.toString()
}

function getCachedResponse(cacheKey: string): any | null {
  const cached = cache.get(cacheKey)
  if (cached && cached.expires > Date.now()) {
    return cached.data
  }
  // Remove expired cache
  if (cached) cache.delete(cacheKey)
  return null
}

function setCachedResponse(cacheKey: string, data: any): void {
  cache.set(cacheKey, { data, expires: Date.now() + CACHE_DURATION * 1000 })
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const paginationUrl = searchParams.get("url")

  // Filters
  const filters = {
    search: searchParams.get("search") || undefined,
    ordering: searchParams.get("ordering") || undefined,
    genres: searchParams.get("genres") || undefined,
    platforms: searchParams.get("platforms") || undefined,
    dates: searchParams.get("release") || undefined,
    stores: searchParams.get("stores") || undefined,
    page: searchParams.get("page") || undefined,
  }

  const apiKey = process.env.RAWG_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { message: "RAWG API key is missing" },
      { status: 500 }
    )
  }

  // Build the URL
  const baseUrl = "https://api.rawg.io/api/games"
  const queryParams = buildQueryParams({ ...filters, key: apiKey })
  const apiUrl = paginationUrl
    ? `${paginationUrl}&key=${apiKey}`
    : `${baseUrl}?${queryParams}`

  // Validate pagination URL if provided
  if (
    paginationUrl &&
    !/^https:\/\/api\.rawg\.io\/api\/games/.test(paginationUrl)
  ) {
    return NextResponse.json(
      { message: "Invalid pagination URL" },
      { status: 400 }
    )
  }

  // Generate cache key
  const cacheKey = paginationUrl || queryParams

  // Check in-memory cache
  const cachedResponse = getCachedResponse(cacheKey)
  if (cachedResponse) {
    return NextResponse.json(cachedResponse, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  }

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`RAWG API error: ${response.statusText}`)
    }

    const data = await response.json()
    const sanitizedData = sanitizeResponseUrls(data)

    // Cache the response
    setCachedResponse(cacheKey, sanitizedData)

    // Send response with caching headers
    return NextResponse.json(sanitizedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch (error: unknown) {
    console.error("Error fetching data from RAWG API:", error)
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    )
  }
}
