import { configTMDB } from "@/apiConfig"
import TVShowCard from "@/components/common/Card"
import { genreMap, movieStatuses } from "@/components/common/ListContent"
import { Movie } from "@/types/movie/movieListType"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  const data = await fetchFromTMDB(configTMDB.getMovieRecommendations(movieID))
  return (
    <div className="grid grid-cols-2 place-items-center gap-3 p-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.results?.map((movie: Movie) => (
        <TVShowCard
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
  )
}
