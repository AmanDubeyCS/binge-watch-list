import { db } from "@/app/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

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
  }
) => {
  const data = {
    id,
    ...movieDetails,
    remarks: "",
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
  }
) => {
  const data = {
    id,
    ...tvDetails,
    tvProgress: tvDetails.tvProgress || "S01-E01",
    remarks: "",
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
  }
) => {
  const data = {
    id,
    ...animeDetails,
    animeProgress: animeDetails.aniProgress || 1,
    remarks: "",
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
  }
) => {
  const data = {
    id,
    ...gameDetails,
    remarks: "",
    gameStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "game", id, data)
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
  }
) => {
  const data = {
    id,
    ...mangaDetails,
    mangaProgress: mangaDetails.mgProgress || 1,
    remarks: "",
    readStatus: selectedStatus,
  }

  await updateMediaDetails(userId, "manga", id, data)
}
