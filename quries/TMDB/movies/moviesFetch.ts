import { configTMDB } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
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

export const useMovieCast = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieCast", movieId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getSingleMovieCast(movieId),
        options
      )
      return response.data
    },
  })
}

export const useMovieCollection = (movieId: number | null) => {
  if(movieId === null){
    return
  }
  return useQuery({
    queryKey: ["MovieCollection", movieId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getSingleMovieCollection(movieId),
        options
      )
      return response.data
    },
  })
}

export const useMovieReviews = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieReviews", movieId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getMovieReviews(movieId),
        options
      )
      return response.data
    },
  })
}

export const useMovieRecommendations = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieRecommendations", movieId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getMovieRecommendations(movieId),
        options
      )
      return response.data
    },
  })
}

export const useMovieImages = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieImages", movieId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getMovieImages(movieId),
        options
      )
      return response.data
    },
  })
}