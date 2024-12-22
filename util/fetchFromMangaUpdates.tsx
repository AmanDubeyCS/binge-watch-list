import axios from "axios"

export async function fetchCanonicalAndEncode(url: string) {
  try {
    const response = await axios.get(url)
    const $ = require('cheerio').load(response.data)

    const canonicalUrl = $('link[rel="canonical"]').attr("href")
    if (!canonicalUrl) {
      throw new Error("Canonical URL not found")
    }

    const pathSegments = canonicalUrl.split("/")
    const base36Code = pathSegments[pathSegments.length - 2]

    if (!base36Code) {
      throw new Error("Base36 code not found in the URL")
    }

    const code = parseInt(base36Code, 36)
    return code
  } catch (error: any) {
    console.error("Error fetching canonical URL:", error)
    return { error: error.message }
  }
}
