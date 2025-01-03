import { configTMDB } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useMovieCast = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieCast", movieId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.getSingleMovieCast(movieId),
        },
      })
      return response.data
    },
  })
}

export const useMovieCollection = (movieId: number | null) => {
  if (movieId === null) {
    return
  }
  return useQuery({
    queryKey: ["MovieCollection", movieId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.getSingleMovieCollection(movieId),
        },
      })
      return response.data
    },
  })
}

export const useMovieReviews = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieReviews", movieId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.getMovieReviews(movieId),
        },
      })
      return response.data
    },
  })
}

export const useMovieRecommendations = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieRecommendations", movieId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.getMovieRecommendations(movieId),
        },
      })
      return response.data
    },
  })
}

export const useMovieImages = (movieId: number) => {
  return useQuery({
    queryKey: ["MovieImages", movieId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.getMovieImages(movieId),
        },
      })
      return response.data
    },
  })
}

export const useFetchMedia = (
  type: "tv" | "movie",
  currentParams: Record<string, string>
) => {
  return useQuery({
    queryKey: ["Media", type, currentParams],
    queryFn: async () => {
      const queryString = new URLSearchParams({
        ...currentParams,
        type,
      }).toString()
      const response = await fetch(`/api/fetchMovies?${queryString}`)
      if (!response.ok) throw new Error("Error fetching media")
      return response.json()
    },
  })
}

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: ["MovieSerch", query],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.searchMovie(query),
        },
      })
      return response.data.results
    },
  })
}

export const useSingleMovie = (movieID: number) => {
  return useQuery({
    queryKey: ["MovieID", movieID],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configTMDB.getSingleMovieProfile(movieID),
        },
      })
      return response.data.reults
    },
  })
}
