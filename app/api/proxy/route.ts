import { NextResponse } from "next/server"
import axios from "axios"

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
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: needsToken
          ? `Bearer ${process.env.TMDB_API_KEY}`
          : undefined,
      },
      params,
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: (error as any).response?.status || 500 }
    )
  }
}
