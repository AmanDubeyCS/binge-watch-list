"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Manga } from "@/types/manga/singleManga"

import RadialProgress from "../RadialProgress"
import { Icon } from "../icons"

export function MangaInfoPage({
  mangaInfo,
  chapters,
  statistics,
}: {
  mangaInfo: Manga
  chapters: any
  statistics: any
}) {
  const router = useRouter()
  const image = mangaInfo.relationships.filter(
    (data: any) => data.type === "cover_art"
  )
  const mangaId = Object.keys(statistics.statistics)[0]
  const ratingData = statistics.statistics[mangaId]?.rating
  const volumes = chapters.volumes

  const handleChapter = (chapterID: any) => {
    router.push(`/manga/${mangaId}/${chapterID}`)
  }
  const maxCount = Math.max(
    ...Object.values(ratingData.distribution).map(Number)
  )

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
  const themes = mangaInfo.attributes.tags.filter(
    (tag) => tag.attributes.group === "theme"
  )
  const formats = mangaInfo.attributes.tags.filter(
    (tag) => tag.attributes.group === "format"
  )

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
    <div className="flex flex-col gap-4">
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10.5, 31.5, 73.5, 1) calc((50vw - 170px) - 340px), rgba(10.5, 31.5, 73.5, 0.84) 50%, rgba(10.5, 31.5, 73.5, 0.84) 100%)",
        }}
        className="relative flex gap-[40px] overflow-hidden px-[40px] py-[30px]"
      >
        {image && (
          <Image
            src={`https://mangadex.org/covers/${mangaInfo.id}/${image[0]?.attributes?.fileName}`}
            alt="image"
            width={1000}
            height={1000}
            className="absolute -z-30 w-full"
          />
        )}

        <div className="mx-auto flex max-w-[1400px] gap-16">
          <div className="flex w-fit overflow-hidden rounded-md">
            {image && (
              <Image
                src={`https://mangadex.org/covers/${mangaInfo.id}/${image[0]?.attributes?.fileName}`}
                alt="image"
                width={1000}
                height={1000}
                className="max-h-[450px] w-[300px]"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div>
              <p className="text-[36px] font-bold text-white">
                {mangaInfo.attributes.title.en} ({mangaInfo.attributes.year})
              </p>
              <div className="flex items-center gap-2 text-base">
                <p className="rounded-md border border-white px-[4px]">
                  {mangaInfo.attributes.status}
                </p>
                <p>{formatDate(mangaInfo.attributes.createdAt)}</p>
                <div className="size-[4px] rounded-full bg-white"></div>
                <div className="flex flex-1 flex-wrap">
                  {genres.map((genra: any) => (
                    <p key={genra.id}>{genra.attributes.name.en},</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative size-[60px] shrink-0 rounded-full bg-black p-[2px]">
                <RadialProgress
                  percentage={Math.floor(ratingData.bayesian) * 10}
                />
                <span className="text-neutrals-800 absolute left-1/2 top-1/2 flex min-h-[22px] min-w-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[18px] font-[800]">
                  {Math.floor(ratingData.bayesian) * 10}
                </span>
              </div>
              <p className="font-extrabold">User Rating</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[22px] font-bold text-white">Overview</p>
                <p className="line-clamp-6">
                  {mangaInfo.attributes.description.en}
                </p>
              </div>

              <div className="flex max-w-[600px] justify-between">
                {authors.map((author) => (
                  <div key={author.id}>
                    <p className="text-base font-medium">
                      {author?.attributes?.name}
                    </p>
                    <p className="text-sm">{author.type}</p>
                  </div>
                ))}

                {artist.map((artist) => (
                  <div key={artist.id}>
                    <p className="text-base font-medium">
                      {artist?.attributes?.name}
                    </p>
                    <p className="text-sm">{artist.type}</p>
                  </div>
                ))}
                {creators.map((creators) => (
                  <div key={creators.id}>
                    <p className="text-base font-medium">
                      {creators?.attributes?.username}
                    </p>
                    <p className="text-sm">{creators.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-4">
        <div className="flex h-fit flex-col gap-5 rounded-md px-4 py-2 shadow-[0px_0px_50px_15px_#00000024]">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Genres</p>
            <div className="flex gap-1">
              {genres.map((genre: any) => (
                <p
                  key={genre.id}
                  className="rounded-[4px] bg-[#343a40] px-2 py-1 text-xs leading-[normal]"
                >
                  {genre.attributes.name.en}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Themes</p>
            <div className="flex gap-1">
              {themes.map((themes: any) => (
                <p
                  key={themes.id}
                  className="rounded-[4px] bg-[#343a40] px-2 py-1 text-xs leading-[normal]"
                >
                  {themes.attributes.name.en}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Format</p>
            <div className="flex gap-1">
              {formats.map((format: any) => (
                <p
                  key={format.id}
                  className="text-nowrap rounded-[4px] bg-[#343a40] px-2 py-1 text-xs leading-[normal]"
                >
                  {format.attributes.name.en}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Ratings Distribution</p>
            <div className="flex flex-col-reverse gap-1">
              {Object.entries(ratingData.distribution).map(([score, count]) => (
                <div key={score} className="flex items-center gap-2">
                  <p className="w-[16px]">{String(score)} </p>
                  <Icon.starIcon className="w-[16px] text-yellow-500" />{" "}
                  {/* Progress bar */}
                  <div className="relative h-1 w-[150px] overflow-hidden bg-gray-200">
                    <div
                      className="h-1 bg-yellow-500"
                      style={{
                        width: `${(Number(count) / maxCount) * 100}%`,
                      }}
                    ></div>
                  </div>
                  ({String(count)})
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Alternative Titles</p>
            <div className="flex flex-col gap-1">
              {mangaInfo.attributes.altTitles.map(
                (title: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    {Object.keys(title).map((langKey) => (
                      <p
                        key={langKey}
                        className="mr-1 rounded-[4px] bg-[#343a40] px-2 py-1 text-xs leading-[normal]"
                      >
                        {title[langKey]}
                      </p>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex h-10 items-center justify-center gap-3 rounded-md shadow-[0px_0px_50px_15px_#00000024]">
            <div className="rounded-[4px] bg-[#343a40] px-2 py-1 text-[18px] leading-[normal]">
              <p>chapters</p>
            </div>
            <div className="rounded-[4px] bg-[#343a40] px-2 py-1 text-[18px] leading-[normal]">
              <p>Comments</p>
            </div>
            <div className="rounded-[4px] bg-[#343a40] px-2 py-1 text-[18px] leading-[normal]">
              <p>Art</p>
            </div>
          </div>
          <div className="flex-1 rounded-md shadow-[0px_0px_50px_15px_#00000024]">
            {volumes && (
              <div className="flex flex-col gap-3">
                {Object.keys(volumes).map((volumeKey) => {
                  const volume = volumes[volumeKey]
                  return (
                    <div key={volumeKey} className="flex flex-col gap-2">
                      <h2 className="text-base font-bold">
                        Volume {volume.volume}
                      </h2>
                      <ul className="flex flex-wrap gap-2">
                        {Object.keys(volume.chapters).map((chapterKey) => {
                          const chapter = volume.chapters[chapterKey]
                          return (
                            <li
                              key={chapter.id}
                              onClick={() => handleChapter(chapter.id)}
                              className="w-[150px] rounded-[4px] bg-[#343a40] px-2 py-1 text-center text-[18px] leading-[normal]"
                            >
                              Chapter {chapter.chapter}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
