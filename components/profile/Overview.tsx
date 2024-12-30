import React from "react"
import { BookOpen, Film, Tv, Gamepad } from "lucide-react"
import TVShowCard from "../tvPage/tvHomePage/TvShowCard"
import { WatchListData } from "@/util/fetchProfileList"

const collectionMap = {
  manga: <BookOpen className="mr-2 size-5" />,
  anime: <Tv className="mr-2 size-5" />,
  tv: <Tv className="mr-2 size-5" />,
  movies: <Film className="mr-2 size-5" />,
  game: <Gamepad className="mr-2 size-5" />,
}

export function Overview({
  movieData,
  animeData,
  tvData,
  mangaData,
}: {
  movieData: WatchListData[]
  animeData: WatchListData[]
  tvData: WatchListData[]
  mangaData: WatchListData[]
}) {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      <h2 className="mb-6 text-2xl font-bold">OVERVIEW</h2>

      <div className="flex w-full flex-wrap gap-3">
        <div className="w-full rounded-lg border border-gray-200 bg-white">
          <div className="bg-gray-100 p-4">
            <h3 className="flex items-center text-lg font-semibold capitalize">
              {collectionMap["movies" as keyof typeof collectionMap]} Movies
            </h3>
          </div>
          <ul className="hide-scrollbar flex w-full gap-5 divide-y divide-gray-200 overflow-scroll p-3">
            {movieData &&
              movieData
                .slice(0, 5)
                .map((data: any) => (
                  <TVShowCard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    coverImage={data.coverImage}
                    tag={data.tag}
                    voteAverage={data.voteAverage}
                    voteCount={data.voteCount}
                    genre={data.genre}
                    numbers={data.numbers}
                    mediaType={data.collection}
                    statusData={[]}
                  />
                ))}
            {movieData.length < 4 &&
              Array.from({ length: Math.round(5 - movieData.length) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="h-[245px] w-[360px] shrink-0 rounded-md border-2 border-gray-100 shadow-md"
                  ></div>
                )
              )}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="bg-gray-100 p-4">
            <h3 className="flex items-center text-lg font-semibold capitalize">
              {collectionMap["movies" as keyof typeof collectionMap]} Anime
            </h3>
          </div>
          <ul className="hide-scrollbar flex w-full gap-5 divide-y divide-gray-200 overflow-scroll p-3">
            {animeData &&
              animeData
                .slice(0, 5)
                .map((data: any) => (
                  <TVShowCard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    coverImage={data.coverImage}
                    tag={data.tag}
                    voteAverage={data.voteAverage}
                    voteCount={data.voteCount}
                    genre={data.genre}
                    numbers={data.numbers}
                    mediaType={data.collection}
                    statusData={[]}
                  />
                ))}
            {animeData.length < 4 &&
              Array.from({ length: Math.round(5 - animeData.length) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="h-[245px] w-[360px] shrink-0 rounded-md border-2 border-gray-100 shadow-md"
                  ></div>
                )
              )}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="bg-gray-100 p-4">
            <h3 className="flex items-center text-lg font-semibold capitalize">
              {collectionMap["movies" as keyof typeof collectionMap]} Tv Shows
            </h3>
          </div>
          <ul className="hide-scrollbar flex w-full gap-5 divide-y divide-gray-200 overflow-scroll p-3">
            {tvData &&
              tvData
                .slice(0, 5)
                .map((data: any) => (
                  <TVShowCard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    coverImage={data.coverImage}
                    tag={data.tag}
                    voteAverage={data.voteAverage}
                    voteCount={data.voteCount}
                    genre={data.genre}
                    numbers={data.numbers}
                    mediaType={data.collection}
                    statusData={[]}
                  />
                ))}
            {tvData.length < 4 &&
              Array.from({ length: Math.round(5 - tvData.length) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="h-[245px] w-[360px] shrink-0 rounded-md border-2 border-gray-100 shadow-md"
                  ></div>
                )
              )}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="bg-gray-100 p-4">
            <h3 className="flex items-center text-lg font-semibold capitalize">
              {collectionMap["movies" as keyof typeof collectionMap]} Manga
            </h3>
          </div>
          <ul className="hide-scrollbar flex w-full gap-5 divide-y divide-gray-200 overflow-scroll p-3">
            {mangaData &&
              mangaData
                .slice(0, 5)
                .map((data: any) => (
                  <TVShowCard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    coverImage={data.coverImage}
                    tag={data.tag}
                    voteAverage={data.voteAverage}
                    voteCount={data.voteCount}
                    genre={data.genre}
                    numbers={data.numbers}
                    mediaType={data.collection}
                    statusData={[]}
                  />
                ))}
            {mangaData.length < 4 &&
              Array.from({ length: Math.round(5 - mangaData.length) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="h-[245px] w-[360px] shrink-0 rounded-md border-2 border-gray-100 shadow-md"
                  ></div>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  )
}
