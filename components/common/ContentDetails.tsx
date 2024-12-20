import React from "react"
import Image from "next/image"
import { Info, Star } from "lucide-react"
import { ImdbData } from "@/types/ImdbType"
import BookmarkTag from "./BookmarkTag"

interface ContentDetailsProps {
  id?: number | string
  backdropPoster: string
  poster: string
  title: string
  date: string
  genres: any[]
  rating: number
  voteCount: number
  overview: string
  production: any[]
  producer?: string[]
  imdbData?: ImdbData
  type?: string
  status?: string
  esbrrating?: any
}

export function ContentDetails({
  id,
  backdropPoster,
  poster,
  title,
  date,
  genres,
  rating,
  voteCount,
  overview,
  production,
  producer,
  imdbData,
  type,
  status,
  esbrrating,
}: ContentDetailsProps) {
  return (
    <div
      className="relative h-fit overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%)",
      }}
    >
      <Image
        src={backdropPoster}
        alt="image"
        width={1000}
        height={1000}
        priority={false}
        className="absolute -z-30 h-auto w-full pl-72"
      />
      <div className="mx-auto flex h-full max-w-[1600px] items-center px-10 py-8 text-white">
        <Image
          src={poster}
          alt="image"
          width={600}
          height={500}
          className="h-[450px] w-auto max-w-[350px] rounded-lg"
        />
        <div className="flex flex-col gap-4 overflow-y-auto p-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-2 text-base">
            <p className="rounded-md border border-white px-[4px]">
              {imdbData?.Rated || status || esbrrating}
            </p>
            <p>{date}</p>
            <div className="size-[4px] rounded-full bg-white"></div>
            <div className="flex flex-1 flex-wrap">
              {genres.map((genre, index: number) => (
                <p key={index}>
                  {genre}
                  {index < genres.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full px-3 py-1">
              <Star className="size-5 text-yellow-400" />
              <span className="text-lg font-bold">{rating?.toFixed(1)}</span>
              {voteCount !== 0 && (
                <span className="text-sm text-gray-300">
                  ({voteCount} votes)
                </span>
              )}
            </div>
            <BookmarkTag mangaID={String(id)} />
          </div>
          <p className="text-[22px] font-bold text-white">Overview</p>
          <p className="line-clamp-6 text-gray-300">{overview}</p>
          <div className="grid grid-cols-3 gap-4">
            {imdbData?.Director && (
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Director
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  <p className="text-base font-medium">{imdbData.Director}</p>
                </div>
              </div>
            )}
            {imdbData?.Writer && imdbData?.Writer !== "N/A" && (
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Writer
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  <p className="text-base font-medium">{imdbData.Writer}</p>
                </div>
              </div>
            )}
            <div>
              <h3 className="flex items-center gap-2 font-semibold">
                <Info className="size-4" />{" "}
                {type === "manga"
                  ? "Artist"
                  : type === "game"
                    ? "Developers"
                    : "Production"}
              </h3>
              <div className="flex flex-wrap text-gray-400">
                {production.map((productionCompanies, index: number) => (
                  <div key={index}>
                    <p className="text-base font-medium">
                      {productionCompanies}
                      {index < production.length - 1 ? "," : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {producer && (
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Producers
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  {producer.map((producer, index) => (
                    <div key={index}>
                      <p className="text-base font-medium">{producer},</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
