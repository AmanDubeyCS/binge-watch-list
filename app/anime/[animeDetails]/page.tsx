"use client"

import React, { useEffect } from "react"
import { useSingleAnimeInfo } from "@/quries/jikan/animefetch"
import useAnimeStore from "@/store/animeIdStore"

import { AnimeInfoPage } from "@/components/animePage/AnimeInfoPage"

export default function Page({ params }: any) {
  const { setAnimeID } = useAnimeStore()
  const animeID = params.animeDetails
  const { data, error, isLoading } = useSingleAnimeInfo(animeID)

  useEffect(() => {
    if (data) {
      setAnimeID(data.mal_id)
    }
  }, [data, setAnimeID])

  if (error) {
    return <div>faild to load the page</div>
  }
  return <>{!isLoading && <AnimeInfoPage animdInfo={data} />}</>
}
