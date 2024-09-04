import { configTMDB } from "@/apiConfig"
import axios from "axios"

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTViMTQ1YTcwMDk1N2YwMjFmNjEzYjY3MjU5OTcwYyIsIm5iZiI6MTcyNTAwNTE3MS4yMjkwOTYsInN1YiI6IjY2ZDBhMWE3MDUwODQ5ZmQzMDAxOTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pg36xW8hMzVn3rhMTRptM3bzDeMWVcbr_SPppLNbSWs",
  },
}

export const trendingTvFetch = async () => {
  try {
    const response = await axios.get(configTMDB.getTvList(), options)
    if (response.status === 200) {
      const tv = response.data.results

      const moviesWithImages = tv.map((movie: any) => ({
        ...movie,
        coverImage: `${TMDB_IMAGE_BASE_URL}w300${movie.poster_path}`,
      }))
      return moviesWithImages
    } else {
      console.error(`API request failed with status ${response.status}`)
      return null
    }
    // console.log(response.data);
    // return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const singleTvFetch = async ({ tvID }: any) => {
  try {
    const response = await axios.get(configTMDB.getSingleTv({ tvID }), options)
    if (response.status === 200) {
      const tv = response.data

      return {
        ...tv,
        coverImage: `${TMDB_IMAGE_BASE_URL}w500${tv.poster_path}`, // Change 'w500' to desired image size
        backdropImage: `${TMDB_IMAGE_BASE_URL}w1280${tv.backdrop_path}`, // Example for backdrop image
      }
    } else {
      console.error(`API request failed with status ${response.status}`)
      return null
    }
  } catch (error) {
    console.error("Error fetching movie:", error)
  }
}
