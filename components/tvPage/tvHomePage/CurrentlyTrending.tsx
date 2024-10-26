import React from "react"
import TVShowCard from "./TvShowCard"
import { Tv } from "lucide-react"

export function CurrentlyTrending({ tvData, movieData, title }: any) {
  // console.log(movieData)
  return (
    <section>
      <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900">
        <Tv className="mr-2" />
        {title}
      </h2>
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        {tvData && (
          <div className="flex w-max space-x-4 py-3 pr-5">
            {tvData.map((tv: any) => (
              <TVShowCard
                key={tv.id}
                id={tv.id}
                name={tv.name}
                coverImage={
                  tv.coverImage
                    ? tv.coverImage
                    : `https://image.tmdb.org/t/p/w300/${tv.poster_path}`
                }
                firstAirDate={tv.first_air_date}
                voteAverage={tv.vote_average}
                voteCount={tv.vote_count}
                genreIds={tv.genre_ids}
                popularity={tv.popularity}
              />
            ))}
          </div>
        )}
        {movieData && (
          <div className="flex w-max space-x-4 py-3 pr-5">
            {movieData.map((movie: any) => (
              <TVShowCard
                key={movie.id}
                id={movie.id}
                name={movie.title || movie.original_title}
                coverImage={
                  movie.coverImage
                    ? movie.coverImage
                    : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                }
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
