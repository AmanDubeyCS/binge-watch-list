import React from "react"
import Image from "next/image"
import { Bookmark, Heart, Info, Star } from "lucide-react"
import { Anime, Genre } from "@/types/anime/singleAnime"
import SideBarDetails from "./SideBarDetails"
import { MainContent } from "./MainContent"
import { ImdbData } from "@/types/ImdbType"

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/")
}

export function AnimeInfoPage({
  animaInfo,
  animeID,
  imdbData,
}: {
  animaInfo: Anime
  animeID: number
  imdbData: ImdbData
}) {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%)",
        }}
        className="relative h-fit overflow-hidden"
      >
        <Image
          src={animaInfo.images?.webp.large_image_url}
          alt="image"
          width={1000}
          height={1000}
          priority={false}
          className="absolute -z-30 h-auto w-full pl-72"
        />

        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-center px-10 py-8 text-white">
          <div className="flex w-fit shrink-0 justify-center">
            <Image
              src={animaInfo.images?.webp.large_image_url}
              alt="image"
              width={1000}
              height={1000}
              priority={true}
              className="h-[450px] w-auto shrink-0 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <h1 className="text-3xl font-bold">
              {" "}
              {animaInfo.title_english || animaInfo.title} ({animaInfo.year})
            </h1>
            <div className="flex items-center gap-2 text-base">
              <p className="rounded-md border border-white px-[4px]">
                {animaInfo.rating}
              </p>
              <p>{formatDate(animaInfo.aired.from)}</p>
              <div className="size-[4px] rounded-full bg-white"></div>
              <div className="flex flex-1 flex-wrap">
                {animaInfo.genres.map((genra: Genre) => (
                  <p key={genra.mal_id}>{genra.name},</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full px-3 py-1">
                <Star className="size-5 text-yellow-400" />
                <span className="text-lg font-bold">
                  {animaInfo.score.toFixed(1)}
                </span>
                <span className="text-sm text-gray-300">
                  ({animaInfo.scored_by} votes)
                </span>
              </div>
              <button className="rounded-full bg-[#161b22] p-2">
                <Heart className="size-5" />
              </button>
              <button className="rounded-full bg-[#161b22] p-2">
                <Bookmark className="size-5" />
              </button>
            </div>
            <p className="text-[22px] font-bold text-white">Overview</p>
            <p className="line-clamp-6 text-gray-300">{animaInfo.synopsis}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Studio
                </h3>
                {animaInfo.studios.map((studio: Genre) => (
                  <div key={studio.mal_id}>
                    <p className="text-base font-medium text-gray-300">
                      {studio.name}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Producers
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  {animaInfo.producers.map((producer: Genre) => (
                    <div key={producer.mal_id}>
                      <p className="text-base font-medium">{producer.name},</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] gap-4 p-10">
          <SideBarDetails animeInfo={animaInfo} imdbData={imdbData} />
          <MainContent animaInfo={animaInfo} animeID={animeID} />
        </div>
      </div>
    </>
  )
}
