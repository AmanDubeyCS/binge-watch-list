import { configTMDB } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
}

export const trendingTvFetch = async () => {
  try {
    const response = await axios.get(configTMDB.getTvList, options)
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

export const useTvCast = (seriesId: number) => {
  return useQuery({
    queryKey: ["TvCharacter", seriesId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getSingleTvCast(seriesId),
        options
      )
      return response.data
    },
  })
}

export const useTvRecommendations = (seriesId: number) => {
  return useQuery({
    queryKey: ["TvRecommendations", seriesId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getTvRecommendations(seriesId),
        options
      )
      return response.data
    },
  })
}

export const useTvReviews = (seriesId: number) => {
  return useQuery({
    queryKey: ["TvReviews", seriesId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getTvReviews(seriesId),
        options
      )
      return response.data
    },
  })
}

export const useTvImages = (seriesId: number) => {
  return useQuery({
    queryKey: ["TvImages", seriesId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getTvImages(seriesId),
        options
      )
      return response.data
    },
  })
}

export const useSeasonEpisodes = (seriesId: number, seasonId: number) => {
  return useQuery({
    queryKey: ["SeasonEpisodes", seriesId, seasonId],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getSeasonEpisodes(seriesId, seasonId),
        options
      )
      return response.data
    },
  })
}
