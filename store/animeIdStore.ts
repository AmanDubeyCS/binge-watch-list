import { create } from "zustand"

interface TMDBiDStore {
  ID: number | null // Store the anime ID, can be null initially
  setTMDBiD: (id: number) => void // Function to set the anime ID
}

const useTMDBiDStore = create<TMDBiDStore>((set) => ({
  ID: null, // Initial state is null
  setTMDBiD: (id: number) => set({ ID: id }), // Function to update the anime ID
}))

export default useTMDBiDStore
