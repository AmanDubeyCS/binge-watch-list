import { config } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAnimeSerch = (animeID: string) => {
  return useQuery({
    queryKey: ["searchedAnime", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getSearchedAnime(animeID))
      return response.data.data
    },
  })
}

export const useEpisodeDetails = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimeEpisodes", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getAnimeEpisodes(animeID))
      return response.data.data
    },
  })
}

export const useAnimeStatistics = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimeStatistics", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getAnimeStatistics(animeID))
      return response.data.data
    },
  })
}

export const useAnimeReviews = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimeReviews", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getAnimeReviews(animeID))
      return response.data.data
    },
  })
}

export const useAnimePictures = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimePictures", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getAnimePictures(animeID))
      return response.data.data
    },
  })
}

export const useAnimeRecommendations = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimeRecommendations", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getAnimerecommendations(animeID))
      return response.data.data
    },
  })
}

export const useAnimeCharacters = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimeCharacters", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getCharactersDetail(animeID))
      return response.data.data
    },
  })
}
