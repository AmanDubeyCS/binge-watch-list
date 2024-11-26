"use client"
import React from "react"
import { Star } from "lucide-react"
import { ImageLoader } from "@/components/Card"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface TVShowCardProps {
  id: number
  name: string
  coverImage: string
  firstAirDate: string
  voteAverage: number
  voteCount: number
  genreIds: number[]
  popularity: number
  mediaType?: string
}

const genreMap = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
}

const genresList = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
]

export default function TVShowCard({
  id,
  name,
  coverImage,
  firstAirDate,
  voteAverage,
  voteCount,
  genreIds,
  popularity,
  mediaType,
}: TVShowCardProps) {
  const router = useRouter()
  const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const genres = searchParams.get("genres")

  const handleClick = () => {
    if (mediaType === "movie") {
      router.push(`/movies/${id}`)
    } else if (mediaType === "tv") {
      router.push(`/tv/${id}`)
    } else if (mediaType === "game") {
      router.push(`/games/${id}`)
    } else {
      router.push(`${pathname}/${id}`)
    }
  }
  return (
    <div
      onClick={handleClick}
      className={`flex ${pathname === "/games" ? "w-[550px]" : "w-[360px]"} cursor-pointer items-center justify-start overflow-hidden rounded-md bg-white p-2 shadow-md duration-300 hover:scale-105`}
    >
      <div className="flex gap-2">
        <div
          className={`relative ${pathname === "/games" ? "w-[300px]" : "w-[140px]"} shrink-0 overflow-hidden rounded-lg`}
        >
          <ImageLoader
            src={coverImage}
            alt=""
            fallback={
              <div
                className={`flex h-auto ${pathname === "/games" ? "w-full" : "w-[140px]"} items-center justify-center bg-white text-center text-black`}
              >
                <p>Image not available</p>
              </div>
            }
          />
        </div>
        <div className="flex-1">
          {firstAirDate && (
            <div className="mb-2 w-fit rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
              {firstAirDate}
            </div>
          )}
          <h3 className="mb-2 line-clamp-2 text-wrap text-base font-semibold text-gray-800">
            {name}
          </h3>
          <div className="mb-2 flex items-center">
            <Star className="mr-1 size-5 fill-current text-yellow-500" />
            <span className="mr-2 text-lg font-semibold text-gray-800">
              {voteAverage > 0 ? voteAverage.toFixed(1) : "N/A"}
            </span>
            <span className="text-sm text-gray-600">
              ({voteCount > 0 ? voteCount.toLocaleString() : "N/A"} users)
            </span>
          </div>
          <div className="mb-3 flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-700">
              Popularity:
            </span>
            <span className="text-sm font-semibold text-gray-800">
              #{Math.round(popularity) || "N/A"}
            </span>
          </div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {genreIds.slice(0, 3).map((genreId: any) => (
              <div
                key={genreId}
                className={cn(
                  "rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500",
                  // genres?.includes(genreId) &&
                  //   "border border-green-600 bg-green-100"
                )}
              >
                {genreMap[genreId as keyof typeof genreMap] ||
                  genreId.name ||
                  "Unknown"}
              </div>
            ))}
            {genreIds.length > 3 && (
              <p className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500">
                +{genreIds.length - 3}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
