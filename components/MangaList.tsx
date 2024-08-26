"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { mangaFetch, singleMangaInfo } from "@/quries/mangaDex/mangaFetch"
import SearchManga from "./SearchManga"

interface MangaTag {
  id: string
  type: string
  attributes: {
    name: {
      en: string
    }
    description: Record<string, unknown>
    group: string
    version: number
  }
  relationships: any[] // Adjust type if needed
}

interface MangaLinks {
  al?: string
  ap?: string
  bw?: string
  kt?: string
  mu?: string
  amz?: string
  cdj?: string
  ebj?: string
  mal?: string
  raw?: string
}

interface Manga {
  title: {
    en: string
  }
  altTitles: Array<{
    [key: string]: string
  }>
  description: {
    en: string
  }
  isLocked: boolean
  links: MangaLinks
  originalLanguage: string
  lastVolume: string
  lastChapter: string
  publicationDemographic: string
  status: string
  year: number
  contentRating: string
  tags: MangaTag[]
  state: string
  chapterNumbersResetOnNewVolume: boolean
  createdAt: string // or Date
  updatedAt: string // or Date
  version: number
  availableTranslatedLanguages: string[]
  latestUploadedChapter: string
}

interface MangaItem {
  id: string
  type: string
  attributes: Manga
  relationships: Array<{
    id: string
    type: string
    related: string
    attributes: Record<string, unknown>
  }>
}

interface MangaResponse {
  result: string
  response: string
  data: MangaItem[] // Define the shape of the `data` array
  limit: number
  offset: number
  total: number
}

export function MangaList() {
  const router = useRouter()
  const [mangaData, setMangaList] = useState<MangaItem[]>([])
  const [error, setError] = useState<string | null>(null)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: MangaResponse | null = await mangaFetch({
          limit: 50,
          offset: 0,
          title: "",
        })

        if (response && response.data) {
          setMangaList(response.data) // Set the manga items array
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

  const handleClick = (mangaID: any) => {
    router.push(`dashboard/${mangaID}`)
  }

  return (
    <div className="flex flex-col flex-wrap gap-2">
      <SearchManga />
      <div className="flex flex-wrap justify-center gap-2">
        {mangaData.length > 0 ? (
          mangaData.map((manga) => {
            const image = manga.relationships.filter(
              (data) => data.type === "cover_art"
            )
            return (
              <div
                onClick={() => handleClick(manga.id)}
                key={manga.id}
                className="w-[250px]"
              >
                {image && (
                  <>
                    <ImageLoader
                      src={`https://mangadex.org/covers/${manga.id}/${image[0].attributes.fileName}`}
                      alt="image"
                      fallback={<div className="aspect-[5/7] h-auto w-[256px] bg-white text-black justify-center items-center text-center flex"><p>Image not available</p></div>} // Optional fallback content
                    />
                    <p className="line-clamp-2 text-base">
                      {manga.attributes?.title.en}
                    </p>
                  </>
                )}
              </div>
            )
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

interface ImageLoaderProps {
  src: string
  alt: string
  fallback?: JSX.Element // Optional fallback element if the image fails to load
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, fallback }) => {
  const [isLoaded, setIsLoaded] = useState(true)

  const handleError = () => {
    setIsLoaded(false)
  }

  return isLoaded ? (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      width={256}
      height={200}
      className="aspect-[5/7] h-auto w-[256px]"
    />
  ) : (
    fallback || null
  )
}
