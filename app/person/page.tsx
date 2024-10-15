"use client"

import React from "react"
import { useGetPopularPersons } from "@/quries/TMDB/getPersonData"

export default function PersoneData({}) {
  const { data } = useGetPopularPersons()
  // console.log(data)
  return <div></div>
}
