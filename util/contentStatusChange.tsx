import { db } from "@/app/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { toast } from "sonner"

const updateMediaDetails = async (
  userId: string,
  mediaType: string,
  id: number | string,
  data: Record<string, any>
) => {
  try {
    const docRef = doc(db, "users", userId, mediaType, id.toString())
    await setDoc(docRef, data, { merge: true })
    toast.success("Sucsess", {description: "content added/updated sucsessfuly"})
  } catch (error) {
    toast.error("Error", {description: "Failed to add/update content please try again later"})
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
    tvProgress: tvDetails.tvProgress || "S01 E01",
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
    episodes: number
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
    mangaUpdatesID?: number | string
  },
  remarks?: string,
  muID?: string
) => {
  const data = {
    id,
    ...mangaDetails,
    mangaProgress: mangaDetails.mgProgress || 1,
    remarks: remarks || "",
    readStatus: selectedStatus,
  }

  if (muID !== undefined) {
    data.mangaUpdatesID = muID
  }

  await updateMediaDetails(userId, "manga", id, data)
}
