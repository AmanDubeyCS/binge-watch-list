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
    toast.success("Sucsess", {
      description: "content added/updated sucsessfuly",
    })
  } catch (error) {
    toast.error("Error", {
      description: "Failed to add/update content please try again later",
    })
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
    BWLstatus: selectedStatus,
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
    progress?: string
  },
  remarks?: string
) => {
  const data = {
    id,
    ...tvDetails,
    progress: tvDetails.progress || "S01 E01",
    remarks: remarks || "",
    BWLstatus: selectedStatus,
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
    progress?: number
  },
  remarks?: string
) => {
  const data = {
    id,
    ...animeDetails,
    progress: animeDetails.progress || 1,
    remarks: remarks || "",
    BWLstatus: selectedStatus,
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
    BWLstatus: selectedStatus,
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
    progress?: number
    mangaUpdatesID?: number | string
  },
  remarks?: string,
  muID?: string
) => {
  const data = {
    id,
    ...mangaDetails,
    progress: mangaDetails.progress || 1,
    remarks: remarks || "",
    BWLstatus: selectedStatus,
  }

  if (muID !== undefined) {
    data.mangaUpdatesID = muID
  }

  await updateMediaDetails(userId, "manga", id, data)
}
