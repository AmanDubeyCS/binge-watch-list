import { configTMDB } from "@/apiConfig"
import Card from "@/components/common/Card"
import { genreMap, movieStatuses } from "@/components/common/ListContent"
import { Movie } from "@/types/movie/movieListType"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React, { ReactElement } from "react"

function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}min`
}

export default async function layout({
  params,
  children,
}: {
  params: { contentID: number }
  children: ReactElement
}) {
  const { contentID } = params
  const movieInfo = await fetchFromTMDB(
    configTMDB.getSingleMovie({ movieID: contentID })
  )
  const data = await fetchFromTMDB(
    configTMDB.getMovieRecommendations(contentID)
  )

  const genres = movieInfo.genres.map((genres: { name: string }) => genres.name)
  return (
    <div>
      {children}
      <div className="flex flex-col items-center gap-2 p-4">
        <p className="text-xl font-bold">{movieInfo.title}</p>
        <div className="flex items-center gap-2">
          <p className="flex items-center text-sm text-gray-600">
            {new Date(movieInfo.release_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <span className="size-1 rounded-full bg-gray-600"></span>
          <p className="text-sm text-gray-600">
            {convertMinutesToHoursAndMinutes(movieInfo.runtime)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {genres.map((genre: string, index: number) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              {genre}
              {genres.length != index+1 && (
                <span className="size-1 rounded-full bg-gray-600"></span>
              )}
            </span>
          ))}
        </div>

        <p className="line-clamp-3 text-base font-normal text-gray-600">
          {movieInfo.overview}
        </p>
      </div>
      <div className="p-4 ">
        <h2 className="text-xl font-bold pl-4">More Like This</h2>
        <div className="grid grid-cols-2 place-items-center gap-3 p-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data?.results?.map((movie: Movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              name={movie.title || movie.original_title}
              coverImage={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              tag={movie.release_date}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              genre={movie.genre_ids.map(
                (genres) => genreMap[genres as keyof typeof genreMap]
              )}
              numbers={movie.popularity}
              mediaType="movie"
              status={movieStatuses}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
