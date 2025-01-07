import { configTMDB } from "@/apiConfig"
import Card from "@/components/common/Card"
import { TvShow } from "@/types/tv/tvListType"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { CircleCheckBig, Clock, Eye, ThumbsDown } from "lucide-react"
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

export default async function page({ params }: { params: { tvID: number } }) {
  const seriesId = params.tvID
  const data = await fetchFromTMDB(configTMDB.getTvRecommendations(seriesId))

  const tvStatuses = {
    watching: { label: "Watching", icon: <Eye size={14} /> },
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-2 sm:grid-cols-3 md:p-6 2xl:grid-cols-4">
      {data?.results?.map((tv: TvShow) => (
        <Card
          key={tv.id}
          id={tv.id}
          name={tv.name}
          coverImage={`https://image.tmdb.org/t/p/w300/${tv.poster_path}.webp`}
          tag={tv.first_air_date}
          voteAverage={tv.vote_average}
          voteCount={tv.vote_count}
          genre={tv.genre_ids.map(
            (genres) => genreMap[genres as keyof typeof genreMap]
          )}
          numbers={tv.popularity}
          mediaType="tv"
          status={tvStatuses}
        />
      ))}
    </div>
  )
}
