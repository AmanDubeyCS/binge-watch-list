"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Card from "../Card"

export default function MoviesList({ moviesData }: any) {
  const router = useRouter()

  const handleClick = (movieID: any) => {
    router.push(`movies/${movieID}`)
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      // year: "numeric",
    }
    return new Intl.DateTimeFormat("en-GB", options).format(date)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {moviesData.map((movies: any) => (
        <div
          className="w-[250px"
          key={movies.id}
          onClick={() => handleClick(movies.id)}
        >
          <Card title_en={movies.title} image={movies.coverImage} rating={movies.vote_average*10} publication={formatDate(movies.release_date)}/>
        </div>
      ))}
    </div>
  )
}
