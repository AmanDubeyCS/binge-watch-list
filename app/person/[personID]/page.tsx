'use client'
import { useGetPersonData } from "@/quries/TMDB/getPersonData"
import React from "react"

export default function SinglePerson({ params }: any) {
  const personID = params.personID
  const {data, error, isLoading} = useGetPersonData(personID)
//   console.log(data)
  return <div></div>
}
