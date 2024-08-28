"use client"

import React, { useEffect, useState } from "react"
import {
  getChapter,
  getMangaStatistics,
  singleMangaInfo,
} from "@/quries/mangaDex/mangaFetch"

import { MangaInfoPage } from "@/components/mangaPage/MangaInfoPage"

export default function page({ params }: any) {
  const [error, setError] = useState<string | null>(null)
  const [mangaInfo, setMangaInfo] = useState<any>(null)
  const [chapter, setChapter] = useState<any>(null)
  const [statistic, setStatistics] = useState(null)
  const [loading, setLoading] = useState(false)
  const mangaID = params.mangaDetails

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await singleMangaInfo({ mangaID })

        if (response && response.data) {
          setMangaInfo(response.data) // Set the manga items array

          const chapterResponse = await getChapter({
            mangaID: response.data.id,
          })

          const chapterStatistics = await getMangaStatistics({
            mangaID: response.data.id,
          })

          if (chapterResponse && chapterStatistics) {
            setChapter(chapterResponse)
            setStatistics(chapterStatistics)
          } else {
            setError("Failed to fetch chapters.")
          }
          setLoading(false)
        } else {
          setError("Failed to fetch manga data.")
        }
      } catch (err) {
        setError(`Error fetching data: ${err}`)
      }
    }
    fetchData()
  }, [])
 
  if (error) {
    return <div>Error: {error}</div>
  }
  
  return (
    <>
    {loading && (<div>Loading...</div>)}
      {chapter && mangaInfo && statistic && (
        <MangaInfoPage
          mangaInfo={mangaInfo}
          chapters={chapter}
          statistics={statistic}
        />
      )}
    </>
  )
}
