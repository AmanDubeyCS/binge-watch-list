import { db } from "@/app/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

export interface WatchListData {
  id: string | number
  name: string
  coverImage: string
  genre: string[]
  numbers: number
  voteAverage: number
  voteCount: number
  tag: string
  collection: string
  status: string
  remarks: string
  progress: string
  episodeCount: number
  showStatus: string
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
