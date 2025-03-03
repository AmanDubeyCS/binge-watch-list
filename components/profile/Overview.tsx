import React from "react"
import { BookOpen, Film, Tv, Gamepad } from "lucide-react"
import { WatchListData } from "@/util/fetchProfileList"
import Card from "../common/Card"
import { bookStatuses, movieStatuses, tvStatuses } from "../common/ListContent"

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
    <div className="flex flex-wrap justify-center gap-10 pb-20">
      <h2 className="mb-6 text-2xl font-bold">OVERVIEW</h2>

      {movieData.length > 0 && (
        <div className="flex w-full flex-wrap gap-3">
          <div className="w-full rounded-lg border border-gray-200 bg-white">
            <div className="bg-gray-100 p-4">
              <h3 className="flex items-center text-lg font-semibold capitalize">
                {collectionMap["movies" as keyof typeof collectionMap]} Movies
              </h3>
            </div>
            <ul className="hide-scrollbar grid w-full grid-cols-2 gap-1 divide-y divide-gray-200 overflow-scroll p-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between">
              {movieData &&
                movieData
                  .slice(-4)
                  .map((data: any) => (
                    <Card
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      coverImage={data.coverImage}
                      tag={data.tag}
                      voteAverage={data.voteAverage}
                      voteCount={data.voteCount}
                      genre={data.genre}
                      numbers={data.numbers}
                      mediaType="movie"
                      profileCardStatus={data.movieStatus}
                      status={movieStatuses}
                    />
                  ))}
              {/* {movieData.length < 4 &&
                Array.from({ length: Math.round(4 - movieData.length) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="h-full w-full shrink-0 rounded-md border-2 border-gray-100 shadow-md lg:h-[245px] lg:w-[360px]"
                    ></div>
                  )
                )} */}
            </ul>
          </div>
        </div>
      )}

      {animeData.length > 0 && (
        <div className="flex w-full flex-wrap gap-3">
          <div className="w-full rounded-lg border border-gray-200 bg-white">
            <div className="bg-gray-100 p-4">
              <h3 className="flex items-center text-lg font-semibold capitalize">
                {collectionMap["movies" as keyof typeof collectionMap]} Anime
              </h3>
            </div>
            <ul className="hide-scrollbar grid w-full grid-cols-2 gap-1 divide-y divide-gray-200 overflow-scroll p-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between">
              {animeData &&
                animeData
                  .slice(0, 4)
                  .map((data: any) => (
                    <Card
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      coverImage={data.coverImage}
                      tag={data.tag}
                      voteAverage={data.voteAverage}
                      voteCount={data.voteCount}
                      genre={data.genre}
                      numbers={data.numbers}
                      mediaType="anime"
                      profileCardStatus={data.status}
                      status={tvStatuses}
                    />
                  ))}
              {/* {animeData.length < 4 &&
                Array.from({ length: Math.round(4 - animeData.length) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="h-full w-full shrink-0 rounded-md border-2 border-gray-100 shadow-md lg:h-[245px] lg:w-[360px]"
                    ></div>
                  )
                )} */}
            </ul>
          </div>
        </div>
      )}

      {tvData.length > 0 && (
        <div className="flex w-full flex-wrap gap-3">
          <div className="w-full rounded-lg border border-gray-200 bg-white">
            <div className="bg-gray-100 p-4">
              <h3 className="flex items-center text-lg font-semibold capitalize">
                {collectionMap["movies" as keyof typeof collectionMap]} Tv Shows
              </h3>
            </div>
            <ul className="hide-scrollbar grid w-full grid-cols-2 gap-1 divide-y divide-gray-200 overflow-scroll p-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between">
              {tvData &&
                tvData
                  .slice(0, 4)
                  .map((data: any) => (
                    <Card
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      coverImage={data.coverImage}
                      tag={data.tag}
                      voteAverage={data.voteAverage}
                      voteCount={data.voteCount}
                      genre={data.genre}
                      numbers={data.numbers}
                      mediaType="tv"
                      profileCardStatus={data.status}
                      status={tvStatuses}
                    />
                  ))}
              {/* {tvData.length < 4 &&
                Array.from({ length: Math.round(4 - tvData.length) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="h-full w-full shrink-0 rounded-md border-2 border-gray-100 shadow-md lg:h-[245px] lg:w-[360px]"
                    ></div>
                  )
                )} */}
            </ul>
          </div>
        </div>
      )}

      {mangaData.length > 0 && (
        <div className="flex w-full flex-wrap gap-3">
          <div className="w-full rounded-lg border border-gray-200 bg-white">
            <div className="bg-gray-100 p-4">
              <h3 className="flex items-center text-lg font-semibold capitalize">
                {collectionMap["movies" as keyof typeof collectionMap]} Manga
              </h3>
            </div>
            <ul className="hide-scrollbar grid w-full grid-cols-2 gap-1 divide-y divide-gray-200 overflow-scroll p-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between">
              {mangaData &&
                mangaData
                  .slice(0, 4)
                  .map((data: any) => (
                    <Card
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      coverImage={data.coverImage}
                      tag={data.tag}
                      voteAverage={data.voteAverage}
                      voteCount={data.voteCount}
                      genre={data.genre}
                      numbers={data.numbers}
                      mediaType="manga"
                      profileCardStatus={data.readStatus}
                      status={bookStatuses}
                    />
                  ))}
              {/* {mangaData.length < 4 &&
                Array.from({ length: Math.round(4 - mangaData.length) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="h-full w-full shrink-0 rounded-md border-2 border-gray-100 shadow-md lg:h-[245px] lg:w-[360px]"
                    ></div>
                  )
                )} */}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
