"use client"

import React from "react"
import Image from "next/image"

interface ChapterData {
  hash: string
  data: string[]
  dataSaver: string[]
}

interface MangaChapterResponse {
  result: string
  baseUrl: string
  chapter: ChapterData
}

export function MangaReadPage({ data }: { data: MangaChapterResponse }) {
  return (
    <div className="flex flex-col items-center justify-center">
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
