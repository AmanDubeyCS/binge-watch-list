import { configRAWG } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"

export const useGameAdditions = (gameId: number) => {
  return useQuery({
    queryKey: ["GameAdditions", gameId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configRAWG.getAdditions(gameId),
        },
      })
      return response.data
    },
  })
}

export const useGameAchivements = (gameId: number) => {
  return useQuery({
    queryKey: ["GameAchivements", gameId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configRAWG.getGameAchivements(gameId),
        },
      })
      return response.data
    },
  })
}

export const useBuyGames = (gameId: number) => {
  return useQuery({
    queryKey: ["BuyGames", gameId],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: configRAWG.getWhereToBuy(gameId),
        },
      })
      return response.data
    },
  })
}

const fetchGames = async (params: Record<string, string>) => {
  const queryString = new URLSearchParams(params).toString()
  const response = await fetch(`/api/fetchGames?${queryString}`)
  if (!response.ok) throw new Error("Error fetching games")
  return response.json()
}

export const useFetchGames = () => {
  const searchParams = useSearchParams()
  const currentParams = Object.fromEntries(searchParams.entries())

  return useQuery({
    queryKey: ["Games", currentParams],
    queryFn: () => fetchGames(currentParams),
  })
}
