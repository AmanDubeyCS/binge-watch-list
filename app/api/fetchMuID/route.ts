import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

// Function to fetch and decode the canonical URL
async function fetchCanonicalAndEncode(url: string) {
  const browser = await puppeteer.launch({ headless: true }) // Adjust headless mode if needed
  const page = await browser.newPage()

  try {
    // Navigate to the given URL
    const response = await page.goto(url, { waitUntil: "domcontentloaded" })

    if (!response || !response.ok()) {
      throw new Error(`Failed to load the page: ${response?.status()}`)
    }

    // Extract the canonical URL
    const canonicalUrl = await page.evaluate(() => {
      const link = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement
      return link ? link.href : null
    })

    if (!canonicalUrl) {
      throw new Error("Canonical URL not found")
    }

    const pathSegments = canonicalUrl.split("/")
    const base36Code = pathSegments[pathSegments.length - 2]

    if (!base36Code) {
      throw new Error("Base36 code not found in the URL")
    }

    // Decode the Base36 code to a number
    const decodedNumber = parseInt(base36Code, 36)

    return { canonicalUrl, decodedNumber }
  } catch (error: any) {
    console.error("Error fetching canonical URL:", error)
    return { error: error.message }
  } finally {
    await browser.close()
  }
}

// API Route handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    // Fetch canonical and decode the base36 code
    const result = await fetchCanonicalAndEncode(url)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
