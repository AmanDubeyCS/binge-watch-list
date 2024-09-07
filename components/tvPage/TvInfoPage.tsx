"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { TMDB_IMAGE_BASE_URL } from "@/quries/TMDB/TV/tvFetch"

export function TvInfoPage({ tvInfo }: any) {
  const router = useRouter()
  // console.log(tvInfo)

  const handleClick = (personID: number) => {
    router.push(`/person/${personID}`)
  }

  return (
    <div>
      <Image
        src={tvInfo.coverImage}
        alt="image"
        width={200}
        height={200}
        className="h-auto w-[200]"
      />
      <Image
        src={tvInfo.backdropImage}
        alt="image"
        width={700}
        height={200}
        className="absolute top-0 -z-10 h-[300px] w-[700px] blur-[10px]"
      />
      <p>{tvInfo.name}</p>
      <p>{tvInfo.overview}</p>
      {tvInfo.seasons.map((season: any) => (
        <div className="flex w-fit border border-blue-300">
          <Image
            src={`${TMDB_IMAGE_BASE_URL}w300${season.poster_path}`}
            alt=""
            width={100}
            height={100}
          />
          <div>
            <p>{season.name}</p>
            <p>Episodes: {season.episode_count}</p>
            <p>Rating: {season.vote_average}</p>
          </div>
        </div>
      ))}

      {tvInfo.credits.cast.map((cast: any) => (
        <div key={cast.id} onClick={() => handleClick(cast.id)}>
          <Image
            src={`${TMDB_IMAGE_BASE_URL}w300${cast.profile_path}`}
            alt=""
            width={100}
            height={100}
          />
          <p>Name: {cast.name}</p>
          <p>character: {cast.character}</p>
          <p>Popularity: {cast.popularity}</p>
        </div>
      ))}
    </div>
  )
}
