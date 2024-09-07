import { config } from "@/apiConfig"
import { AnimeResponse } from "@/types/anime/animeTypes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useAnimeFetch = () => {
  return useQuery({
    queryKey: ["animeFetch"],
    queryFn: async () => {
      const response = await axios.get(config.getAnimeList())
      const data: AnimeResponse = response.data
      return data.data
    },
  })
}

export const useSingleAnimeInfo = (animeID: number) => {
  return useQuery({
    queryKey: ["singleAnimeInfo", animeID],
    queryFn: async () => {
      const response = await axios.get(config.getSingleAnime(animeID))
      return response.data.data
    },
  })
}

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

export const useAnimeCharacters = (animeID: number) => {
  return useQuery({
    queryKey: ["AnimeCharacters", animeID],
    queryFn: async () => {
      console.log("Fetching from server...")
      const response = await axios.get(config.getCharactersDetail(animeID))
      return response.data.data
    },
  })
}
