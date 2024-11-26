import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAnimeSerch } from "@/queries/jikan/animefetch"

import { AnimeData } from "@/types/anime/animeTypes"

export default function SearchAnime() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [animeID, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  const { data, error, isLoading } = useAnimeSerch(animeID)

  const handleClick = (animeID: number) => {
    router.push(`anime/${animeID}`)
  }

  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <div className="group flex h-[50px] w-[60px] items-center overflow-hidden rounded-full bg-[#4070f4] p-5 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] hover:w-[250px]">
        <div className="flex items-center justify-center fill-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Isolation_Mode"
            data-name="Isolation Mode"
            viewBox="0 0 24 24"
            width="22"
            height="22"
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
        {!isLoading &&
          search.length > 0 &&
          data.map((data: AnimeData) => (
            <div onClick={() => handleClick(data.mal_id)}>
              {data.images?.webp.image_url && (
                <Image
                  src={data.images?.webp.image_url}
                  alt="image"
                  width={256}
                  height={200}
                  className="aspect-[5/7] h-auto w-[256px]"
                />
              )}
              <p>{data.title_english}</p>
            </div>
          ))}
      </div>
    </>
  )
}
