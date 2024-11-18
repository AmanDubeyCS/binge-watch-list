import { useRouter } from "next/navigation"
import React from "react"
import { ImageLoader } from "../Card"
import { Star } from "lucide-react"
import { MangaTag } from "@/types/manga/mangaTypes"

interface MangaCardProps {
  coverImage: string
  publication: string
  title: string
  genresData: MangaTag[]
  rating: number
  follows: number
}

export default function MangaCard({
  coverImage,
  publication,
  title,
  genresData,
  rating,
  follows,
}: MangaCardProps) {
  const router = useRouter()

  const handleClick = (mangaID: any) => {
    router.push(`manga/${mangaID}`)
  }

  const genresList = genresData
    .filter((item) => item.attributes.group === "genre")
    .map((item) => item.attributes.name.en)

  return (
    <div
      onClick={handleClick}
      className="flex h-full w-[360px] cursor-pointer items-center justify-start overflow-hidden bg-white p-2 shadow-md duration-300 hover:scale-105"
    >
      <div className="flex gap-2">
        <div className="relative w-[140px] shrink-0 overflow-hidden rounded-lg">
          <ImageLoader
            src={coverImage}
            alt=""
            fallback={
              <div className="flex h-auto w-[140px] items-center justify-center bg-white text-center text-black">
                <p>Image not available</p>
              </div>
            }
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 w-fit rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
            {publication}
          </div>
          <h3 className="mb-2 line-clamp-2 text-wrap text-base font-semibold text-gray-800">
            {title}
          </h3>

          {rating && (
            <div className="mb-2 flex items-center">
              <Star className="mr-1 size-5 fill-current text-yellow-500" />
              <span className="mr-2 text-lg font-semibold text-gray-800">
                {rating.toFixed(1) || "N/A"}
              </span>
            </div>
          )}
          <div className="mb-3 flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-700">
              Follows:
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {follows}
            </span>
          </div>

          <div className="mb-2 flex flex-wrap gap-1.5">
            {genresList.slice(0, 4).map((genre) => (
              <div
                key={genre}
                className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500"
              >
                {genre}
              </div>
            ))}
            {genresList.length > 4 && (
              <p className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500">
                +{genresList.length - 4}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
