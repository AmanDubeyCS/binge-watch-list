import { configTMDB } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
}

export const useGetPersonData = (personID: number) => {
  return useQuery({
    queryKey: ["getPersonData", personID],
    queryFn: async () => {
      const response = await axios.get(
        configTMDB.getPersonDetails(personID),
        options
      )

      return response.data
    },
  })
}

export const useGetPopularPersons = () => {
  return useQuery({
    queryKey: ["popularPersons"],
    queryFn: async () => {
      const response = await axios.get(configTMDB.getPopularPersons, options)
      return response.data
    },
  })
}
