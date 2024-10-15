"use client"

import React from "react"
import { useGetPersonData } from "@/quries/TMDB/getPersonData"

export default function SinglePerson({ params }: any) {
  const personID = params.personID
  const { data } = useGetPersonData(personID)
  // console.log(data)
  return <div></div>
}
