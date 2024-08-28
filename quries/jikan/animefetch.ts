import { config } from "@/apiConfig"
import axios from "axios"

interface Props {
  limit: number
  offset: number
  title: string
}

export const animeFetch = async ({ limit, offset, title }: Props) => {
  try {
    const response = await axios.get(
      config.getAnimeList({ limit, offset, title })
    )
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const singleAnimeInfo = async ({ animeID }: any) => {
  try {
    const response = await axios.get(config.getSingleAnime({ animeID }))
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}
