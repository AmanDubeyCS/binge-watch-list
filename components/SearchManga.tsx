import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { mangaFetch } from "@/quries/mangaDex/mangaFetch"

import { ImageLoader } from "./MangaList"

export default function SearchManga() {
  const [search, setSearch] = useState("")
  const [searchedData, setSearchedData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mangaFetch({
          limit: 5,
          offset: 0,
          title: search,
        })

        if (response && response.data) {
          setSearchedData(response.data) // Set the manga items array
        } else {
          setError("Failed to fetch manga data.")
        }
      } catch (err) {
        setError(`Error fetching data: ${err}`)
      }
    }

    search.length > 0 && fetchData()
  }, [search])

  const handleClick = (mangaID: any) => {
    router.push(`dashboard/${mangaID}`)
  }
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
        {searchedData.length > 0 && search.length > 0 ? (
          searchedData.map((manga) => {
            const image = manga.relationships.filter(
              (data: any) => data.type === "cover_art"
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
                      } // Optional fallback content
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
