import { configTMDB } from "@/apiConfig"
import TVShowCard from "@/components/common/Card"
import { Movie } from "@/types/movie/movieListType"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { CircleCheckBig, Clock, ThumbsDown } from "lucide-react"
import React from "react"

const genreMap = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
}

export default async function page({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  const data = await fetchFromTMDB(configTMDB.getMovieRecommendations(movieID))

  const movieStatuses = {
    completed: { label: "I've seen this", icon: <CircleCheckBig size={14} /> },
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }
  return (
    <div className="container mx-auto text-black">
      <div className="flex flex-wrap justify-center gap-3">
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
            statusData={[]}
            status={movieStatuses}
          />
        ))}
      </div>
    </div>
  )
}
