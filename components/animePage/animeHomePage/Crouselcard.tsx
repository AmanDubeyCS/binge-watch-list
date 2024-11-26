"use client"
import { Calendar, Clock, Tv } from "lucide-react"
import React from "react"
import { formatDate } from "../AnimeInfoPage"
import { useRouter } from "next/navigation"

export function Crouselcard({
  animeID,
  title,
  type,
  duration,
  year,
  synopsis,
  image,
  index,
}: {
  animeID: number
  title: string
  type: string
  duration: string
  year: string
  synopsis: string
  image: string
  index: number
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`anime/${animeID}`)
  }
  return (
    <div
      onClick={handleClick}
      className="relative h-[500px] w-full min-w-[700px] overflow-hidden rounded-lg bg-gray-900 text-white"
    >
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900 via-gray-900 to-transparent"></div> */}
      <div className="relative z-20 flex h-full flex-col justify-end p-8">
        <div className="mb-4 w-fit rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold hover:bg-pink-600">
          #{index + 1} Trending
        </div>
        <h1 className="mb-2 text-4xl font-bold leading-tight">{title}</h1>
        <div className="mb-4 flex items-center space-x-4">
          <span className="flex items-center">
            <Tv className="mr-1 size-4" /> {type}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 size-4" /> {duration}
          </span>
          <span className="flex items-center">
            <Calendar className="mr-1 size-4" /> {formatDate(year)}
          </span>
        </div>
        <p className="mb-6 line-clamp-5 max-w-2xl text-gray-300">{synopsis}</p>
        <div className="flex space-x-4">
          <button className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium hover:bg-pink-600">
            Watch Trailer
          </button>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
            Details
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-auto w-3/5">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900"></div>
        <img
          src={image}
          alt="Anime characters"
          className="size-full object-cover object-right"
        />
      </div>
    </div>
  )
}
