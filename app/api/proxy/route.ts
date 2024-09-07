import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  // Extract headers and query params from the request
  const token = searchParams.get("token") // Authorization token
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    if (key !== "url" && key !== "token") {
      params[key] = value
    }
  })

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Include Authorization header if token is provided
      },
      params, // Pass all query parameters except 'url' and 'token'
    })
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: (error as any).response?.status || 500 }
    )
  }
}
