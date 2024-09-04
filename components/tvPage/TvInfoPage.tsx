import React from "react"
import Image from "next/image"

export function TvInfoPage({ tvInfo }: any) {
  return (
    <div>
      <Image src={tvInfo.coverImage} alt="image" width={200} height={200} />
      {/* <Image src={movieInfo.backdropImage} alt='image' width={700} height={200} className='w-[700px] h-[200px]'/> */}
      <p>{tvInfo.name}</p>
    </div>
  )
}
