import { NextResponse } from "next/server"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { config, configTMDB } from "@/apiConfig"
import { fetchTopManhua } from "@/queries/mangaDex/mangaFetch"

const BASE_URL = "https://mybingelist.fun"

export async function GET() {
  try {
    const animeData = await fetchFromJikan(config.getAnimeList, 0)
    const mangaData = await fetchTopManhua()
    const movieData = await fetchFromTMDB(configTMDB.getMoviesList)

    const animeUrls =
      animeData?.data
        ?.map(
          (anime: { mal_id: number }) =>
            `<url><loc>${BASE_URL}/anime/${anime.mal_id}</loc></url>`
        )
        .join("") || ""

    const mangaUrls =
      mangaData
        ?.map(
          (manga: { id: string }) =>
            `<url><loc>${BASE_URL}/manga/${manga.id}</loc></url>`
        )
        .join("") || ""

    const movieUrls =
      movieData?.results
        ?.map(
          (movie: { id: number }) =>
            `<url><loc>${BASE_URL}/movies/${movie.id}</loc></url>`
        )
        .join("") || ""

    const staticPages = ["", "anime", "movies", "tv", "games", "manga"]

    const staticUrls = staticPages
      .map(
        (page) => `
        <url>
          <loc>${BASE_URL}/${page}</loc>
          <priority>${page === "" ? "1.0" : "0.8"}</priority>
        </url>
      `
      )
      .join("")

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${animeUrls}
      ${mangaUrls}
      ${movieUrls}
    </urlset>`

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return new NextResponse("Failed to generate sitemap", { status: 500 })
  }
}
