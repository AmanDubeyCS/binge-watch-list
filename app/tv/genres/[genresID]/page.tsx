import { configTMDB } from "@/apiConfig"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { Calendar, Star } from "lucide-react"
import React from "react"

export default async function page({ params }: any) {
  const tvByprovider = await fetchFromTMDB(
    configTMDB.getTvByGenres(params.genresID)
  )
  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="flex flex-wrap justify-center gap-6">
        {tvByprovider?.results?.map((show: any) => (
          <div
            key={show.id}
            className="w-[260px] overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={`${show.name} Poster`}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 flex h-[56px] items-center text-xl font-semibold">
                {show.name}
              </h2>
              <p className="mb-2 line-clamp-3 text-sm text-gray-600">
                {show.overview}
              </p>
              <div className="mb-2 flex items-center">
                <Star className="mr-1 size-5 text-yellow-400" />
                <span className="font-semibold">
                  {show.vote_average.toFixed(1)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({show.vote_count} votes)
                  </span>
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <Calendar className="mr-1 size-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {show.first_air_date}
                </span>
              </div>
              {/* <div className="flex flex-wrap gap-2">
                {show.genre_ids.slice(0, 3).map((genreId: number) => (
                  <span
                    key={genreId}
                    className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
                  >
                    {genreMap[genreId] || "Unknown"}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
