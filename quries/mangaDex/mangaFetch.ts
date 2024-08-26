import { config } from "@/apiConfig"
import axios from "axios"

interface Props {
  limit: number
  offset: number
  title: string
}

export const mangaFetch = async ({ limit, offset, title }: Props) => {
  try {
    const response = await axios.get(config.getMangaList({ limit, offset, title }))
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

// export const mangaCovers = async ({ mangaIDs }: any) => {
//   const params = new URLSearchParams()

//   // Add manga IDs as multiple `manga[]` parameters
//   mangaIDs.forEach((id: string) => params.append("manga[]", id))
//   try {
//     const response = await axios.get(config.getCovers({ mangaIDs: params }))
//     // console.log(response.data);
//     return response.data
//   } catch (error) {
//     console.error("Error fetching manga:", error)
//   }
// }

// export const mangaCover = async ({ mangaIDs }: any) => {
//   const params = new URLSearchParams()
//   params.append("manga[]", mangaIDs)
//   try {
//     const response = await axios.get(config.getCovers({ mangaIDs: params }))
//     // console.log(response.data);
//     return response.data
//   } catch (error) {
//     console.error("Error fetching manga:", error)
//   }
// }

export const singleMangaInfo = async ({ mangaID }: any) => {
  try {
    const response = await axios.get(config.getSingleManga({ mangaID }))
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const getChapter = async ({ mangaID }: any) => {

  try {
    const response = await axios.get(config.getMangaChapters({ mangaID }))
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const getMangaStatistics = async ({ mangaID }: any) => {

  try {
    const response = await axios.get(config.getMangaStatistics({ mangaID }))
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}
