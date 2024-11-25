import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMangaFetch } from "@/queries/mangaDex/mangaFetch"

import { MangaItem } from "@/types/manga/mangaTypes"

import { ImageLoader } from "../Card"

export default function SearchManga() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  const { data, error, isLoading } = useMangaFetch({
    limit: 5,
    offset: 0,
    title: debouncedSearch,
  })

  const handleClick = (mangaID: string) => {
    router.push(`manga/${mangaID}`)
  }

  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <div className="group flex size-[40px] items-center overflow-hidden rounded-full p-3 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] duration-300 hover:w-[270px] hover:bg-[#4070f4] hover:duration-300">
        <div className="flex items-center justify-center fill-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Isolation_Mode"
            data-name="Isolation Mode"
            viewBox="0 0 24 24"
            width="15"
            height="15"
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent px-4 text-[20px] font-normal text-white outline-none"
        />
      </div>
      <div className="flex justify-center gap-2">
        {!isLoading && search.length > 0 ? (
          data.map((manga: MangaItem) => {
            const image = manga.relationships.filter(
              (data: {type: string}) => data.type === "cover_art"
            )
            return (
              <div
                onClick={() => handleClick(manga.id)}
                key={manga.id}
                className="w-[100px]"
              >
                {image && (
                  <>
                    <ImageLoader
                      src={`https://mangadex.org/covers/${manga.id}/${image[0].attributes.fileName}`}
                      alt="image"
                      fallback={
                        <div className="flex aspect-[5/7] h-auto w-[100px] items-center justify-center bg-white text-center text-black">
                          <p>Image not available</p>
                        </div>
                      }
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
          <div></div>
        )}
      </div>
    </>
  )
}
