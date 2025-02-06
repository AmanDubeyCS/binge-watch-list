import { config, configRAWG, configTMDB } from "@/apiConfig"
import { ListCards } from "@/components/common/ListContent"
import { fetchTopManhua } from "@/queries/mangaDex/mangaFetch"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { BookOpen, Clapperboard, Gamepad2, Tv } from "lucide-react"
import React from "react"

export default async function page() {
  const popularMovies = await fetchFromTMDB(configTMDB.getPopularMovie)
  const PopularTV = await fetchFromTMDB(configTMDB.getTvPopular)
  const trendingAnime = await fetchFromJikan(config.getAnimeList, 0)
  const response = await fetch(configRAWG.getGamesList)
  const gamesList = await response.json()
  const topManhua = await fetchTopManhua()

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 p-2 pb-16">
      {popularMovies && (
        <ListCards
          movieData={popularMovies.results}
          title="Popular Movie"
          titleIcon={<Clapperboard className="mr-2" />}
        />
      )}
      {PopularTV && (
        <ListCards
          tvData={PopularTV.results}
          title="Popular TV"
          titleIcon={<Tv className="mr-2" />}
        />
      )}

      {trendingAnime?.data?.length > 0 && (
        <ListCards
          animeData={trendingAnime.data}
          title="Airing Anime"
          titleIcon={<Tv className="mr-2" />}
        />
      )}

      {gamesList.results.length > 0 && (
        <ListCards
          gameData={gamesList.results}
          title="Popular Games"
          titleIcon={<Gamepad2 className="mr-2" />}
        />
      )}

      {topManhua && (
        <ListCards
          mangaData={topManhua}
          title="Top Manhua"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
    </main>
  )
}
