import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { mangaId: string; imageId: string } }
) {
  const { mangaId, imageId } = params

  // Construct the Mangadex URL
  const imageUrl = `https://mangadex.org/covers/${mangaId}/${imageId}.256.jpg `

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error("Failed to fetch the image")
    }

    const contentType = response.headers.get("content-type")
    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      headers: { "Content-Type": contentType || "image/jpeg" },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to proxy the image" },
      { status: 500 }
    )
  }
}