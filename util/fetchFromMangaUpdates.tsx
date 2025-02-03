"use server"
import axios from "axios"
import { fetchFromMangaDex } from "./fetchFromTMDB"
import { config } from "@/apiConfig"

export async function fetchCanonicalAndEncode(url: string) {
  try {
    const response = await axios.get(url)
    const $ = require("cheerio").load(response.data)

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

export const checkdata = async (mangaID: string) => {
  try {
    const manga = await fetchFromMangaDex(config.getSingleManga({ mangaID }))
    const mangaInfo = await manga.data

    if (Number(mangaInfo.attributes.links.mu)) {
      const muID = await fetchCanonicalAndEncode(
        `https://www.mangaupdates.com/series.html?id=${mangaInfo.attributes.links.mu}`
      )

      return muID
    } else if (!mangaInfo.attributes.links.mu) {
      return false
    } else {
      return parseInt(mangaInfo.attributes.links.mu, 36)
    }
  } catch (error) {
    console.error("Error fetching manga data:", error)
    return <div>Error fetching manga data.</div>
  }
}
