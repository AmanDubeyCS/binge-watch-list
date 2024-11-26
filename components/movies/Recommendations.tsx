import { useMovieRecommendations } from "@/queries/TMDB/movies/moviesFetch"
import { Movie } from "@/types/movie/movieListType"
import { Calendar, Star } from "lucide-react"
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

export function Recommendations({ movieId }: { movieId: number }) {
  const { data } = useMovieRecommendations(movieId)

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="flex flex-wrap justify-center gap-6">
        {data?.results?.map((movie: Movie) => (
          <div
            key={movie.id}
            className="w-[260px] overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 flex h-[56px] items-center text-xl font-semibold">
                {movie.title}
              </h2>
              <p className="mb-2 line-clamp-3 text-sm text-gray-600">
                {movie.overview}
              </p>
              <div className="mb-2 flex items-center">
                <Star className="mr-1 size-5 text-yellow-400" />
                <span className="font-semibold">
                  {movie.vote_average.toFixed(1)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({movie.vote_count} votes)
                  </span>
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <Calendar className="mr-1 size-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {movie.release_date}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genre_ids.slice(0, 3).map((genreId: number) => (
                  <span
                    key={genreId}
                    className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
                  >
                    {genreMap[genreId as keyof typeof genreMap] || "Unknown"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
