import puppeteer from "puppeteer"

export async function fetchCanonicalAndEncode(url: string) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  try {
    // Navigate to the given URL
    await page.goto(url, { waitUntil: "domcontentloaded" })

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

    return decodedNumber
  } catch (error: any) {
    console.error("Error fetching canonical URL:", error)
    return { error: error.message }
  } finally {
    await browser.close()
  }
}
