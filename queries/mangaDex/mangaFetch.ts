import { config } from "@/apiConfig"
import { MangaItem } from "@/types/manga/mangaTypes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Props {
  limit: number
  offset: number
  title: string
}

interface MangaId {
  mangaID: string
}

// export const singleManga = async (mangaID: string) => {
//   try {
//     const response = await axios.get(config.getSingleManga({ mangaID }))
//     const statistics = await axios.get(config.getMangaChapters({ mangaID }))
//     const chapters = await axios.get(config.getMangaStatistics({ mangaID }))

//     return {
//       mangaInfo: response.data,
//       chapter: statistics.data,
//       statistics: chapters.data,
//     }
//   } catch (error) {
//     console.error("Error fetching manga:", error)
//   }
// }

async function fetchMangaWithRatings(url: string) {
  try {
    const response = await axios.get(url)
    const mangaData = response.data.data

    const data = mangaData
      .map((data: MangaItem) => `manga[]=${data.id}`)
      .join("&")

    const ratingsResponse = await axios.get(
      `https://api.mangadex.org/statistics/manga?${data}`
    )

    const ratingsData = ratingsResponse.data.statistics

    const mergedData = mangaData.map((manga: MangaItem) => ({
      ...manga,
      rating: ratingsData[manga.id] || {},
    }))

    return mergedData
  } catch (error) {
    console.error("Error fetching manga data:", error)
    return []
  }
}

export async function fetchMangaList({
  limit,
  offset,
  title,
}: {
  limit: number
  offset: number
  title: string
}) {
  return fetchMangaWithRatings(config.getMangaList({ limit, offset, title }))
}

export async function fetchTopManhwa({
  limit,
  offset,
}: {
  limit: number
  offset: number
}) {
  return fetchMangaWithRatings(config.getTopManhwa({ limit, offset }))
}

export async function fetchTopManhua() {
  return fetchMangaWithRatings(config.getTopManhua)
}

export async function fetchPopularManga() {
  return fetchMangaWithRatings(config.getPopularManga)
}

export const useMangaFetch = ({ limit, offset, title }: Props) => {
  return useQuery({
    queryKey: ["mangaList", limit, offset, title],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: config.getMangaList({ limit, offset, title }),
        },
      })
      const mangaData = response.data.data

      const data = mangaData
        .map((data: MangaItem) => `manga[]=${data.id}`)
        .join("&")

      const ratingsResponse = await axios.get(
        `https://api.mangadex.org/statistics/manga?${data}`
      )

      const ratingsData = ratingsResponse.data.statistics

      const mergedData = mangaData.map((manga: MangaItem) => ({
        ...manga,
        rating: ratingsData[manga.id] || {},
      }))
      return mergedData
    },
  })
}

export const useMangaData = (mangaID: string) => {
  // Fetch manga info
  const mangaInfoQuery = useQuery({
    queryKey: ["mangaInfo", mangaID],
    queryFn: async () => {
      const data = await singleMangaInfo({ mangaID })
      return data
    },
    enabled: !!mangaID, // Only fetch if mangaID is valid
  })

  // Fetch chapter data after manga info is fetched
  const chapterQuery = useQuery({
    queryKey: ["chapter", mangaID],
    queryFn: async () => {
      if (mangaInfoQuery.data?.data.id) {
        const data = await getChapter({ mangaID: mangaInfoQuery.data.data.id })
        return data
      }
      return null
    },
    enabled: !!mangaInfoQuery.data?.data.id, // Fetch only if manga info is fetched
  })

  // Fetch statistics data after manga info is fetched
  const statisticsQuery = useQuery({
    queryKey: ["statistics", mangaID],
    queryFn: async () => {
      if (mangaInfoQuery.data?.data.id) {
        const data = await getMangaStatistics({
          mangaID: mangaInfoQuery.data.data.id,
        })
        return data
      }
      return null
    },
    enabled: !!mangaInfoQuery.data?.data.id, // Fetch only if manga info is fetched
  })

  return {
    mangaInfo: mangaInfoQuery.data,
    chapter: chapterQuery.data,
    statistics: statisticsQuery.data,
    isLoading:
      mangaInfoQuery.isLoading ||
      chapterQuery.isLoading ||
      statisticsQuery.isLoading,
    error: mangaInfoQuery.error || chapterQuery.error || statisticsQuery.error,
  }
}

export const singleMangaInfo = async ({ mangaID }: MangaId) => {
  try {
    const response = await axios.get("/api/proxy", {
      params: {
        url: config.getSingleManga({ mangaID }),
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const getChapter = async ({ mangaID }: MangaId) => {
  try {
    const response = await axios.get("/api/proxy", {
      params: {
        url: config.getMangaChapters({ mangaID }),
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const getMangaStatistics = async ({ mangaID }: MangaId) => {
  try {
    const response = await axios.get("/api/proxy", {
      params: {
        url: config.getMangaStatistics({ mangaID }),
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching manga:", error)
  }
}

export const useGetMangaArt = (mangaID: string) => {
  return useQuery({
    queryKey: ["getMangaArt", mangaID],
    queryFn: async () => {
      const response = await axios.get("/api/proxy", {
        params: {
          url: config.getMangaArt(mangaID),
        },
      })
      return response.data.data
    },
  })
}

export const useGetChapterPages = (chapterID: string) => {
  return useQuery({
    queryKey: ["getChapterPages", chapterID],
    queryFn: async () => {
      const response = await axios.get(config.getChapterData(chapterID))
      return response.data.data
    },
  })
}
export const getChapterData = async (chapterID: string) => {
  try {
    const response = await axios.get(config.getChapterData(chapterID))
    return response.data
  } catch (error) {
    console.log("error fetching chapter")
  }
}
