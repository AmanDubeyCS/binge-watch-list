import { db } from "@/app/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { fetchFromMangaDex } from "./fetchFromTMDB"
import { fetchCanonicalAndEncode } from "./fetchFromMangaUpdates"
import { config } from "@/apiConfig"

const updateMediaDetails = async (
  userId: string,
  mediaType: string,
  id: number | string,
  data: Record<string, any>
) => {
  try {
    const docRef = doc(db, "users", userId, mediaType, id.toString())
    await setDoc(docRef, data, { merge: true })
    console.log(`${mediaType} details updated successfully!`)
  } catch (error) {
    console.error(`Error updating ${mediaType} details:`, error)
  }
}

export const handleMovieStatusChange = async (
  userId: string,
  id: number,
  selectedStatus: string,
  movieDetails: {
    name: string
    coverImage: string
    genre: string[]
    voteAverage: number
    voteCount: number
  },
  remarks?: string
) => {
  const data = {
    id,
    ...movieDetails,
    remarks: remarks || "",
    watchStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "movie", id, data)
}

export const handleTvShowStatusChange = async (
  userId: string,
  id: number,
  selectedStatus: string,
  tvDetails: {
    name: string
    coverImage: string
    genre: string[]
    voteAverage: number
    voteCount: number
    tvProgress?: string
  },
  remarks?: string
) => {
  const data = {
    id,
    ...tvDetails,
    tvProgress: tvDetails.tvProgress || "S01-E01",
    remarks: remarks || "",
    watchStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "tv", id, data)
}

export const handleAnimeStatusChange = async (
  userId: string,
  id: number,
  selectedStatus: string,
  animeDetails: {
    name: string
    coverImage: string
    genre: string[]
    voteAverage: number
    voteCount: number
    episodes?: number
    aniProgress?: number
  },
  remarks?: string
) => {
  const data = {
    id,
    ...animeDetails,
    animeProgress: animeDetails.aniProgress || 1,
    remarks: remarks || "",
    watchStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "anime", id, data)
}

export const handleGameStatusChange = async (
  userId: string,
  id: number,
  selectedStatus: string,
  gameDetails: {
    name: string
    coverImage: string
    genre: string[]
    voteAverage: number
    voteCount: number
    platforms: any
  },
  remarks?: string
) => {
  const data = {
    id,
    ...gameDetails,
    remarks: remarks || "",
    gameStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "game", id, data)
}

const checkdata = async (mangaID: string) => {
  try {
    const manga = await fetchFromMangaDex(config.getSingleManga({ mangaID }))
    const mangaInfo = await manga.data

    if (Number(mangaInfo.attributes.links.mu)) {
      const muID = await fetchCanonicalAndEncode(
        `https://www.mangaupdates.com/series.html?id=${mangaInfo.attributes.links.mu}`
      )

      return muID
    } else if (!mangaInfo.attributes.links.mu) {
      return 1
    } else {
      return parseInt(mangaInfo.attributes.links.mu, 36)
    }
  } catch (error) {
    console.error("Error fetching manga data:", error)
    return <div>Error fetching manga data.</div>
  }
}

export const handleMangaStatusChange = async (
  userId: string,
  id: number | string,
  selectedStatus: string,
  mangaDetails: {
    name: string
    coverImage: string
    genre: string[]
    voteAverage: number
    voteCount: number
    mgProgress?: number
  },
  remarks?: string
) => {
  const muID = await checkdata(String(id))
  const data = {
    id,
    ...mangaDetails,
    mangaUpdatesID: muID,
    mangaProgress: mangaDetails.mgProgress || 1,
    remarks: remarks || "",
    readStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "manga", id, data)
}
