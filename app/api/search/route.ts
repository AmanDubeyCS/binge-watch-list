import { config } from "@/apiConfig"
import { MangaItem } from "@/types/manga/mangaTypes"
import axios from "axios"
import { NextResponse } from "next/server"

async function fetchMovieDetails(movieID: number, type: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movieID}?append_to_response=keywords&language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieID}:`, error)
    throw new Error("Failed to fetch movie details.")
  }
}

const TMDbFetch = async (query: string, type: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=true&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    )
    const TMDBRes = response.data

    if (!TMDBRes || !TMDBRes.results) {
      console.log("No results found.")
      return []
    }

    const promises = TMDBRes.results.map(async (movie: any) => {
      const movieDetails = await fetchMovieDetails(movie.id, type)
      return { ...movie, details: movieDetails }
    })

    const result = await Promise.all(promises)

    const filteredResponse = result.filter((item) => {
      if (type === "tv") {
        return !item.details.keywords.results.some(
          (keyword: { id: number }) => keyword.id === 210024
        )
      } else {
        return !item.details.keywords.keywords.some(
          (keyword: { id: number }) => keyword.id === 210024
        )
      }
    })

    return filteredResponse
  } catch (error) {
    console.error("Error fetching movie data:", error)
    throw new Error("Failed to fetch movie data.")
  }
}

const mangaFetch = async (query: string) => {
  const response = await fetch(
    `https://api.mangadex.org/manga?title=${query}&limit=16&offset=0&includes%5B%5D=cover_art&order%5BfollowedCount%5D=desc`
  )
  const responseData = await response.json()
  const mangaData = responseData.data

  const data = mangaData
    .map((data: MangaItem) => `manga[]=${data.id}`)
    .join("&")

  const ratingsResponse = await fetch(
    `https://api.mangadex.org/statistics/manga?${data}`
  )

  const ratingsResponseData = await ratingsResponse.json()

  const ratingsData = ratingsResponseData.statistics

  const mergedData = mangaData.map((manga: MangaItem) => ({
    ...manga,
    rating: ratingsData[manga.id] || {},
  }))
  return mergedData
}

const fetchFromAPI = async (type: string, query: string) => {
  switch (type) {
    case "anime":
      return fetch(config.getSearchedAnime(query)).then((res) => res.json())
    case "manga":
      return mangaFetch(query)
    case "movie":
      return TMDbFetch(query, "movie")
    case "show":
      return TMDbFetch(query, "tv")
    case "game":
      return fetch(
        `https://api.rawg.io/api/games?search=${query}&page_size=16&ordering=-rating&key=${process.env.RAWG_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => res.results)
    default:
      throw new Error("Unsupported search type")
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const query = searchParams.get("q")

  if (!type || !query) {
    return NextResponse.json(
      { error: "Missing type or query" },
      { status: 400 }
    )
  }

  try {
    const results = await fetchFromAPI(type, query)
    return NextResponse.json(results)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
