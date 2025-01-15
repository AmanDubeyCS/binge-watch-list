import { Star } from "lucide-react"
import Image from "next/image"
import React from "react"

export function Banner({ movie }: any) {
  return (
    <div className="relative h-[800px] w-full shrink-0 overflow-hidden rounded-lg">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={`${movie.title} poster`}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent" />
      <div className="relative z-20 flex h-full flex-col items-center justify-end p-8 text-white">
        <h1 className="mb-2 text-4xl font-bold">{movie.title}</h1>
        <div className="mb-4 flex items-center">
          <Star className="mr-1 size-5 text-yellow-400" />
          <span>{movie.vote_average.toFixed(1)}/10</span>
        </div>
        <p className="mb-6 line-clamp-2 max-w-2xl">{movie.overview}</p>
        <button className="w-40">Watch Trailer</button>
      </div>
    </div>
  )
}
