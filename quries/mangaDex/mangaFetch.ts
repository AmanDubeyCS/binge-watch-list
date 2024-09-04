import { config } from "@/apiConfig"
import axios from "axios"

interface Props {
  limit: number
  offset: number
  title: string
}

export const mangaFetch = async ({ limit, offset, title }: Props) => {
  try {
    const response = await axios.get("/api/proxy", {
      params: {
        url: config.getMangaList({ limit, offset, title }),
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

// export const mangaFetch = async ({ limit, offset, title }: Props) => {
//   try {
//     const response = await axios.get(
//       config.getMangaList({ limit, offset, title })
//     )
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
