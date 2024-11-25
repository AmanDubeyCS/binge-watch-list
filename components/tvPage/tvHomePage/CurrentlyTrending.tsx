import React from "react"
import TVShowCard from "./TvShowCard"
import { Tv } from "lucide-react"
import { TvShow } from "@/types/tv/tvListType"
import { Movie } from "@/types/movie/movieListType"

export function CurrentlyTrending({
  tvData,
  movieData,
  title,
}: {
  tvData?: TvShow[]
  movieData?: Movie[]
  title: string
}) {
  const tvDataFilter = tvData?.filter(
    (tv) => tv.vote_average !== 0 && !tv.genre_ids.includes(16)
  )

  return (
    <section>
      <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900">
        <Tv className="mr-2" />
        {title}
      </h2>
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        {tvData && (
          <div
            style={{ width: `${Math.round((tvDataFilter?.length || 0) / 2) * 375}px` }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {tvDataFilter?.map((tv) => {
              return (
                <TVShowCard
                  key={tv.id}
                  id={tv.id}
                  name={tv.name}
                  coverImage={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`}
                  firstAirDate={tv.first_air_date}
                  voteAverage={tv.vote_average}
                  voteCount={tv.vote_count}
                  genreIds={tv.genre_ids}
                  popularity={tv.popularity}
                />
              )
            })}
          </div>
        )}
        {movieData && (
          <div style={{ width: `${Math.round((movieData?.length || 0) / 2) * 375}px` }}
          className="flex flex-wrap gap-3 py-3 pr-5">
            {movieData.map((movie) => (
              <TVShowCard
                key={movie.id}
                id={movie.id}
                name={movie.title || movie.original_title}
                coverImage={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                firstAirDate={movie.release_date}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                genreIds={movie.genre_ids}
                popularity={movie.popularity}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
