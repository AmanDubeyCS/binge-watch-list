import { create } from "zustand"

interface AnimeStore {
  animeID: number | null // Store the anime ID, can be null initially
  setAnimeID: (id: number) => void // Function to set the anime ID
}

const useAnimeStore = create<AnimeStore>((set) => ({
  animeID: null, // Initial state is null
  setAnimeID: (id: number) => set({ animeID: id }), // Function to update the anime ID
}))

export default useAnimeStore
