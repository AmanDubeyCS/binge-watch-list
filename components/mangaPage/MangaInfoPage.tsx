import React from "react"
import Image from "next/image"

import { Manga, StatisticsData, VolumesData } from "@/types/manga/singleManga"

import { Bookmark, Heart, Info, Star } from "lucide-react"
import { SidebarDetails } from "./SidebarDetails"
import { MainContent } from "./MainContent"

export function MangaInfoPage({
  mangaInfo,
  chapters,
  statistics,
}: {
  mangaInfo: Manga
  chapters: VolumesData
  statistics: StatisticsData
}) {
  const image = mangaInfo.relationships.filter(
    (data: {type: string}) => data.type === "cover_art"
  )
  const mangaId = Object.keys(statistics.statistics)[0]
  const ratingData = statistics.statistics[mangaId]
  const reviews = statistics.statistics[mangaId].comments
  const volumes = chapters.volumes

  const authors = mangaInfo.relationships.filter(
    (item) => item.type === "author"
  )
  const artist = mangaInfo.relationships.filter(
    (item) => item.type === "artist"
  )
  const creators = mangaInfo.relationships.filter(
    (item) => item.type === "creator"
  )

  const genres = mangaInfo.attributes.tags.filter(
    (tag) => tag.attributes.group === "genre"
  )
  // const themes = mangaInfo.attributes.tags.filter(
  //   (tag) => tag.attributes.group === "theme"
  // )
  // const formats = mangaInfo.attributes.tags.filter(
  //   (tag) => tag.attributes.group === "format"
  // )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/")
  }

  return (
    <div className="text-b flex flex-col gap-4">
      <div
        className="relative h-fit overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%)",
        }}
      >
        {image && (
          <Image
            src={`https://mangadex.org/covers/${mangaInfo.id}/${image[0]?.attributes?.fileName}`}
            alt="image"
            width={1000}
            height={1000}
            className="absolute -z-30 h-auto w-full pl-72"
          />
        )}

        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-center px-10 py-8">
          <div className="flex w-fit shrink-0 justify-center">
            {image && (
              <Image
                src={`https://mangadex.org/covers/${mangaInfo.id}/${image[0]?.attributes?.fileName}`}
                alt="image"
                width={1000}
                height={1000}
                className="h-[450px] w-auto shrink-0 rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <h1 className="text-3xl font-bold">
              {" "}
              {mangaInfo.attributes.title.en} ({mangaInfo.attributes.year})
            </h1>
            <div className="flex items-center gap-2 text-base">
              <p className="rounded-md border border-white px-[4px]">
                {mangaInfo.attributes.status}
              </p>
              <p>{formatDate(mangaInfo.attributes.createdAt)}</p>
              <div className="size-[4px] rounded-full bg-white"></div>
              <div className="flex flex-1 flex-wrap">
                {genres.map((genra) => (
                  <p key={genra.id}>{genra.attributes.name.en},</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full px-3 py-1">
                <Star className="size-5 text-yellow-400" />
                <span className="text-lg font-bold">
                  {ratingData.rating.bayesian.toFixed(1)}
                </span>
                <span className="text-sm text-gray-300">Rating</span>
              </div>
              <button className="rounded-full bg-[#161b22] p-2">
                <Heart className="size-5" />
              </button>
              <button className="rounded-full bg-[#161b22] p-2">
                <Bookmark className="size-5" />
              </button>
            </div>
            <p className="text-[22px] font-bold text-white">Overview</p>
            <p className="line-clamp-6 text-gray-300">
              {mangaInfo.attributes.description.en}
            </p>
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Author
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  {authors.map((author) => (
                    <div key={author.id}>
                      <p className="text-base font-medium text-gray-300">
                        {author?.attributes?.name},
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Artist
                </h3>

                <div className="flex flex-wrap text-gray-400">
                  {artist.map((artist) => (
                    <div key={artist.id}>
                      <p className="text-base font-medium">
                        {artist?.attributes?.name},
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {creators.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Info className="size-4" /> Creators
                  </h3>

                  <div className="flex flex-wrap text-gray-400">
                    {creators.map((creators) => (
                      <div key={creators.id}>
                        <p className="text-base font-medium">
                          {creators?.attributes?.username}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          <SidebarDetails mangaInfo={mangaInfo} statistics={ratingData} />
          <MainContent
            volums={volumes}
            mangaId={mangaInfo.id}
            reviews={reviews}
          />
        </div>
      </div>
    </div>
  )
}
