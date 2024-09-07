"use client"

import React from "react"
import Image from "next/image"

export function MangaReadPage({ data }: any) {

  return (
    <div className="flex flex-col justify-center items-center">
      {data.chapter.data.map((chapter: string) => (
        <Image
          key={chapter}
          src={`${data.baseUrl}/data/${data.chapter.hash}/${chapter}`}
          alt="images"
          width={500}
          height={500}
        />
      ))}
    </div>
  )
}
