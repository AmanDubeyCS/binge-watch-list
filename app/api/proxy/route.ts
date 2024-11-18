import { NextResponse } from "next/server"
import axios from "axios"

function sanitizeResponseUrls(data: any): any {
  if (data.next) data.next = data.next.replace(/key=[^&]+&?/, "")
  if (data.previous) data.previous = data.previous.replace(/key=[^&]+&?/, "")
  return data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  // Extract headers and query params from the request
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    if (key !== "url" && key !== "token") {
      params[key] = value
    }
  })
  const needsToken = url.includes("themoviedb")
  const RAWGUrl = url.includes("rawg") && !url.includes("page")
  try {
    const response = await axios.get(
      RAWGUrl ? `${url}?key=${process.env.RAWG_API_KEY}` : url,
      {
        headers: {
          Authorization: needsToken
            ? `Bearer ${process.env.TMDB_API_KEY}`
            : undefined,
        },
        params,
      }
    )

    const sanitizedData = sanitizeResponseUrls(response.data)
    return NextResponse.json(sanitizedData)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: (error as any).response?.status || 500 }
    )
  }
}
