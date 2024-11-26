import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const CACHE_DURATION = 60 * 5
const cache = new Map<string, { data: any; expires: number }>()

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

  // Build the URL
  const baseUrl = `https://api.themoviedb.org/3/discover/${searchParams.get("type")}?air_date.gte=&air_date.lte=&certification=${searchParams.get("certification") || ""}&certification_country=IN&debug=&first_air_date.gte=&first_air_date.lte=&page=${searchParams.get("page") || 1}&primary_release_date.gte=${searchParams.get("releaseFrom")}&primary_release_date.lte=${searchParams.get("releaseTo") || "2025-05-19"}&region=&release_date.gte=&release_date.lte=&show_me=everything&sort_by=${searchParams.get("sortBy") || "popularity.desc"}&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_genres=${searchParams.get("genres") || ""}&with_keywords=&with_networks=&with_origin_country=&with_original_language=${searchParams.get("language") || ""}&with_watch_monetization_types=${searchParams.get("availabilities")?.toLowerCase() || "flatrate%7Cfree%7Cads%7Crent%7Cbuy"}&with_watch_providers=${searchParams.get("providers") || ""}&with_release_type=&with_runtime.gte=0&with_runtime.lte=400&without_keywords=210024`

  // Generate cache key
  const cacheKey = baseUrl

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
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    })

    // Cache the response
    setCachedResponse(cacheKey, response.data)

    // Send response with caching headers
    return NextResponse.json(response.data, {
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
