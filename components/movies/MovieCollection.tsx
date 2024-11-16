import { useMovieCollection } from "@/queries/TMDB/movies/moviesFetch"
import { Calendar, Star } from "lucide-react"
import React from "react"

export function MovieCollection({
  collectionId,
}: {
  collectionId: number | null
}) {
  const { data } = useMovieCollection(
    collectionId !== null ? collectionId : null
  ) || { data: null }

  return (
    <div className="container mx-auto rounded-lg bg-white p-2 px-4 py-8 text-black">
      {data && collectionId ? (
        <>
          <div className="relative mb-8 overflow-hidden rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              alt={data.name}
              className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-black bg-opacity-60">
              <div className="p-6">
                <h1 className="mb-2 text-4xl font-bold text-white">
                  {data.name}
                </h1>
                <p className="text-xl text-gray-200">{data.overview}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {data.parts.map((movie: any) => (
              <div
                key={movie.id}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                  className="h-72 w-full object-cover md:w-48"
                />
                <div className="flex grow flex-col justify-between p-4">
                  <div>
                    <h2 className="mb-2 text-xl font-semibold">
                      {movie.title}
                    </h2>
                    <div className="mb-2 flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 size-4" />
                      {new Date(movie.release_date).getFullYear()}
                    </div>
                    <div className="mb-4 flex items-center">
                      <Star className="mr-1 size-5 text-yellow-400" />
                      <span className="font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="ml-2 text-sm text-gray-600">
                        ({movie.vote_count.toLocaleString()} votes)
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-gray-600">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Does Not belong to any collection</div>
      )}
    </div>
  )
}
