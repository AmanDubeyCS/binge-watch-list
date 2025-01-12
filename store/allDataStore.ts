import { create } from "zustand"
import { collection, getDocs, Firestore } from "firebase/firestore"

export const useDataStore = create((set) => ({
  data: [], // Stores all fetched data
  loading: false, // Loading state
  error: null, // Error state
  fetchData: async (db: Firestore, userId: string) => {
    const collectionNames = ["movie", "tv", "anime", "manga", "game"]
    set({ loading: true, error: null })

    try {
      const allData = await Promise.all(
        collectionNames.map(async (collectionName) => {
          const collectionRef = collection(
            db,
            `users/${userId}/${collectionName}`
          )
          const querySnapshot = await getDocs(collectionRef)

          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            collection: collectionName, // Add collection name for context
            ...doc.data(),
          }))
        })
      )

      set({ data: allData.flat(), loading: false })
    } catch (error) {
      console.error("Error fetching data:", error)
      set({ error, loading: false })
    }
  },

  upsertItem: (newItem: any) => {
    set((state: any) => {
      const existingIndex = state.data.findIndex(
        (item: any) => String(item.id) === String(newItem.id)
      )

      if (existingIndex !== -1) {
        // Update existing item
        const updatedData = [...state.data]
        updatedData[existingIndex] = {
          ...updatedData[existingIndex],
          ...newItem,
        }
        return { data: updatedData }
      } else {
        // Add new item
        return { data: [...state.data, newItem] }
      }
    })
  },

  removeFromWatchlist: (id: string | number, mediaType: string) => {
    set((state: any) => ({
      data: state.data.filter(
        (item: any) => !(item.id === id && item.collection === mediaType)
      ),
    }))
  },
}))

export interface DataStore {
  data: any
  upsertItem: (newItem: any) => void
  fetchData: (db: any, userId: string) => void
  removeFromWatchlist: (id: string | number, mediaType: string) => void
}
