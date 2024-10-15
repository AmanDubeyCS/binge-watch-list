import { configTMDB } from "@/apiConfig"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTViMTQ1YTcwMDk1N2YwMjFmNjEzYjY3MjU5OTcwYyIsIm5iZiI6MTcyNTAwNTE3MS4yMjkwOTYsInN1YiI6IjY2ZDBhMWE3MDUwODQ5ZmQzMDAxOTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pg36xW8hMzVn3rhMTRptM3bzDeMWVcbr_SPppLNbSWs",
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
