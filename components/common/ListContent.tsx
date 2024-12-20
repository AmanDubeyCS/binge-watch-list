"use client"
import React from "react"
import { TvShow } from "@/types/tv/tvListType"
import { Movie } from "@/types/movie/movieListType"
import { DataStore, useDataStore } from "@/store/allDataStore"
import { AnimeData } from "@/types/anime/animeTypes"
import { MangaItem } from "@/types/manga/mangaTypes"
import Card from "./Card"
import { Game } from "@/types/game/singleGame"
import { CircleCheckBig, Clock, Eye, Gamepad2, ThumbsDown } from "lucide-react"
export const genreMap = {
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

export function ListCards({
  tvData,
  movieData,
  animeData,
  mangaData,
  gameData,
  title,
  titleIcon,
}: {
  tvData?: TvShow[]
  movieData?: Movie[]
  animeData?: AnimeData[]
  mangaData?: MangaItem[]
  gameData?: Game[]
  title: string
  titleIcon: any
}) {
  const { data } = useDataStore() as DataStore
  const tvDataFilter = tvData?.filter(
    (tv) => tv.vote_average !== 0 && !tv.genre_ids.includes(16)
  )

  const uniqueData = animeData?.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.mal_id === item.mal_id)
  )

  const tvStatuses = {
    watching: { label: "Watching", icon: <Eye size={14} /> },
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  const movieStatuses = {
    completed: { label: "I've seen this", icon: <CircleCheckBig size={14} /> },
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  const bookStatuses = {
    reading: { label: "Reading", icon: <Eye size={14} /> },
    planning: { label: "Plan to Read", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  const gameStatuses = {
    playing: { label: "Playing", icon: <Gamepad2 size={14} /> },
    planning: { label: "Want to play", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  return (
    <section>
      <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900">
        {/* <Tv className="mr-2" /> */}
        {titleIcon}
        {title}
      </h2>
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        {tvData && (
          <div
            style={{
              width: `${Math.round((tvDataFilter?.length || 0) / 2) * 375}px`,
            }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {tvDataFilter?.map((tv) => {
              return (
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
                  statusData={data}
                />
              )
            })}
          </div>
        )}
        {movieData && (
          <div
            style={{
              width: `${Math.round((movieData?.length || 0) / 2) * 375}px`,
            }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {movieData.map((movie) => (
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
                statusData={data}
              />
            ))}
          </div>
        )}
        {uniqueData && (
          <div
            style={{
              width: `${Math.round((uniqueData?.length || 0) / 2) * 375}px`,
            }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {uniqueData.map((anime) => (
              <Card
                key={anime.mal_id}
                id={anime.mal_id}
                name={anime.title_english || anime.title}
                coverImage={anime.images.webp.image_url}
                tag={anime.status}
                voteAverage={anime.score}
                voteCount={anime.scored_by}
                genre={anime.genres.map((genres) => genres.name)}
                numbers={anime.rank}
                mediaType="anime"
                status={tvStatuses}
                statusData={data}
                episodes={anime.episodes}
                showStatus={anime.status}
              />
            ))}
          </div>
        )}
        {mangaData && (
          <div
            style={{
              width: `${Math.round((mangaData?.length || 0) / 2) * 375}px`,
            }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {mangaData.map((manga: MangaItem) => {
              const image = manga.relationships.filter(
                (data) => data.type === "cover_art"
              )
              return (
                <Card
                  key={manga.id}
                  id={manga.id}
                  name={
                    manga.attributes?.title.en ||
                    manga.attributes?.title.ja ||
                    manga.attributes?.title["ja-ro"]
                  }
                  coverImage={`https://uploads.mangadex.org/covers/${manga.id}/${image[0].attributes.fileName}.256.jpg`}
                  tag={manga.attributes.status}
                  voteAverage={manga.rating.rating.average}
                  voteCount={0}
                  genre={manga.attributes.tags
                    .filter((item) => item.attributes.group === "genre")
                    .map((item) => item.attributes.name.en)}
                  numbers={manga.rating.follows}
                  mediaType="manga"
                  status={bookStatuses}
                  statusData={data}
                />
              )
            })}
          </div>
        )}
        {gameData && (
          <div
            style={{
              width: `${Math.round((gameData?.length || 0) / 2) * 375}px`,
            }}
            className="flex flex-wrap gap-3 py-3 pr-5"
          >
            {gameData.map((game: any) => {
              return (
                <Card
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  coverImage={game.background_image}
                  tag={game.released}
                  voteAverage={game.rating * 2}
                  voteCount={game.ratings_count}
                  genre={game.genres.map((g: { name: string }) => g.name)}
                  numbers={10}
                  platforms={game.parent_platforms}
                  mediaType="game"
                  status={gameStatuses}
                  statusData={[]}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
