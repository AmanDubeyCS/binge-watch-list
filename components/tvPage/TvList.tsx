"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function TvList({ tvData }: any) {
  const router = useRouter()
  //   console.log(moviesData)

  const handleClick = (tvID: any) => {
    router.push(`tv/${tvID}`)
  }
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tvData.map((tv: any) => (
        <div
          className="w-[250px"
          key={tv.id}
          onClick={() => handleClick(tv.id)}
        >
          <Image src={tv.coverImage} alt="cover" width={250} height={200} />
          <p>{tv.title}</p>
          {/* <p>{movies.overview}</p> */}
        </div>
      ))}
    </div>
  )
}
