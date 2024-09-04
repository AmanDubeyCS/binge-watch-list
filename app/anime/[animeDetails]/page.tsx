"use client"

import React, { useEffect, useState } from "react"
import { singleAnimeInfo } from "@/quries/jikan/animefetch"

import { AnimeInfoPage } from "@/components/animePage/AnimeInfoPage"

export default function Page({ params }: any) {
  const [animeInfo, setAnimeInfo] = useState([])
  const [error, setError] = useState("")
  const animeID = params.animeDetails

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await singleAnimeInfo({ animeID })

        if (response && response.data) {
          setAnimeInfo(response.data)
        } else {
          setError("Failed to fetch manga data.")
        }
      } catch (err) {
        setError(`Error fetching data: ${err}`)
      }
    }
    fetchData()
  }, [animeID])

  if (error) {
    return <div>faild to load the page</div>
  }
  return <>{animeInfo && <AnimeInfoPage animdInfo={animeInfo} />}</>
}
