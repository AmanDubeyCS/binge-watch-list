import { db } from "@/app/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

export interface WatchListData {
  id: number | string // Unique identifier for the anime
  name: string // Title of the anime
  coverImage: string // URL of the anime's cover image
  genre: string[] // Array of genres associated with the anime
  numbers: number // Some numerical value (e.g., episode count)
  status: string // User's current status with the anime (e.g., "watching")
  watchStatus?: string
  readStatus?: string
  gameStatus?: string
  tag: string // Additional tag or label (e.g., "Currently Airing")
  voteAverage: number // Average user rating for the anime
  voteCount: number // Total number of votes or ratings
  remarks: string
  progress: string
  episodeCount: number
  showStatus: string
  WatchStatus: any
  poster_path: string
  vote_average: number
  vote_count: number
  genres: string[]
  popularity: number
  tvProgress: string
  seasons: any
  platforms: any
  animeProgress: number
  episodes: number
  mangaProgress: number
  mangaUpdatesID: number | string
  BWLstatus: string
  // latest_chapter: number
}

export const fetchProfileList = async (
  userId: string,
  mediaType: string
): Promise<WatchListData[]> => {
  const collectionRef = collection(db, `users/${userId}/${mediaType}`)
  const querySnapshot = await getDocs(collectionRef)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as WatchListData[]
}
