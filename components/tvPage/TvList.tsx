"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Card from "../Card"

export default function TvList({ tvData }: any) {
  const router = useRouter()
    console.log(tvData)

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
          <Card title_en={tv.name} image={tv.coverImage} rating={tv.vote_average*10}/>
        </div>
      ))}
    </div>
  )
}
