import React from "react"
import Image from "next/image"

export function AnimeInfoPage({ animdInfo }: any) {
  console.log(animdInfo)
  return (
    <div>
      <Image
        src={animdInfo.images?.webp.image_url}
        alt="image"
        width={256}
        height={200}
        className="aspect-[5/7] h-auto w-[256px]"
      />
      <p>{animdInfo.title_english}</p>
    </div>
  )
}
