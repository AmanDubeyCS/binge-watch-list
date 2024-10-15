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

export const trendingMoviesFetch = async () => {
  try {
    const response = await axios.get(configTMDB.getMoviesList, options)
    if (response.status === 200) {
      const movies = response.data.results

      const moviesWithImages = movies.map((movie: any) => ({
        ...movie,
        coverImage: `${TMDB_IMAGE_BASE_URL}w300${movie.poster_path}`,
      }))
      return moviesWithImages
    } else {
      console.error(`API request failed with status ${response.status}`)
      return null
    }
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const singleMovieFetch = async ({ movieID }: any) => {
  try {
    const response = await axios.get(
      configTMDB.getSingleMovie({ movieID }),
      options
    )
    if (response.status === 200) {
      const movie = response.data

      // Add full image URLs to the movie object
      return {
        ...movie,
        coverImage: `${TMDB_IMAGE_BASE_URL}w500${movie.poster_path}`, // Change 'w500' to desired image size
        backdropImage: `${TMDB_IMAGE_BASE_URL}w1280${movie.backdrop_path}`, // Example for backdrop image
      }
    } else {
      console.error(`API request failed with status ${response.status}`)
      return null
    }
    // console.log(response.data);
    // return response.data
  } catch (error) {
    console.error("Error fetching movie:", error)
  }
}
