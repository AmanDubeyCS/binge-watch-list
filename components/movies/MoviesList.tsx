"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function MoviesList({ moviesData }: any) {
  const router = useRouter()
  //   console.log(moviesData)

  const handleClick = (movieID: any) => {
    router.push(`movies/${movieID}`)
  }
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {moviesData.map((movies: any) => (
        <div
          className="w-[250px"
          key={movies.id}
          onClick={() => handleClick(movies.id)}
        >
          <Image src={movies.coverImage} alt="cover" width={250} height={200} />
          <p>{movies.title}</p>
          {/* <p>{movies.overview}</p> */}
        </div>
      ))}
    </div>
  )
}
