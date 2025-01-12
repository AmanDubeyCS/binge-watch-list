import { create } from "zustand"

interface StatusProp {
  statusState: string | null // Store the anime ID, can be null initially
  setStatusState: (status: string) => void // Function to set the anime ID
}

const useStatusChange = create<StatusProp>((set) => ({
  statusState: null, // Initial state is null
  setStatusState: (status: string) => set({ statusState: status }), // Function to update the anime ID
}))

export default useStatusChange
