import { config, configRAWG, configTMDB } from "@/apiConfig"
import { GameCard } from "@/components/gamePage/GameCard"
import { CurrentlyTrending } from "@/components/tvPage/tvHomePage/CurrentlyTrending"
import { fetchTopManhua } from "@/queries/mangaDex/mangaFetch"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { BookOpen, Tv } from "lucide-react"
import React from "react"

export default async function page() {
  const popularMovies = await fetchFromTMDB(configTMDB.getPopularMovie)
  const PopularTV = await fetchFromTMDB(configTMDB.getTvPopular)
  const trendingAnime = await fetchFromJikan(config.getAnimeList, 0)
  const response = await fetch(configRAWG.getGamesList)
  const gamesList = await response.json()
  const topManhua = await fetchTopManhua()

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
      {popularMovies && (
        <CurrentlyTrending
          movieData={popularMovies.results}
          title="Popular Movie"
          titleIcon={<Tv className="mr-2" />}
        />
      )}
      {PopularTV && (
        <CurrentlyTrending
          tvData={PopularTV.results}
          title="Popular TV"
          titleIcon={<Tv className="mr-2" />}
        />
      )}

      {trendingAnime?.data?.length > 0 && (
        <CurrentlyTrending
          animeData={trendingAnime.data}
          title="Currently Airing"
          titleIcon={<Tv className="mr-2" />}
        />
      )}
      <div>
        <h2 className="mb-6 text-3xl font-bold">Popular Games</h2>
        <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
          <div className="grid w-[3400px] grid-cols-10 gap-3 py-3 pr-5">
            {gamesList &&
              gamesList.results.map((game: any) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.name}
                  image={game.background_image}
                  rating={game.rating * 2}
                  platforms={game.parent_platforms}
                  release={game.released}
                  genres={game.genres}
                  tags={game.tags}
                  grade={game.ratings}
                />
              ))}
          </div>
        </div>
      </div>

      {topManhua && (
        <CurrentlyTrending
          mangaData={topManhua}
          title="Top Manhua"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
    </main>
  )
}
