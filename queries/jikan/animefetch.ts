import { BASE_URL_ANIME, config } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAnimeSerch = (title: string) => {
  return useQuery({
    queryKey: ["searchedAnime", title],
    queryFn: async () => {
      const response = await axios.get(config.getSearchedAnime(title))
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

export const useFetchAnime = (currentParams: Record<string, string>) => {
  return useQuery({
    queryKey: ["Anime", currentParams],
    queryFn: async () => {
      const queryString = new URLSearchParams({ ...currentParams }).toString()
      const response = await fetch(
        `${BASE_URL_ANIME}/anime?limit=24&sort=desc&${queryString}`
      )
      if (!response.ok) throw new Error("Error fetching media")
      return response.json()
    },
  })
}
