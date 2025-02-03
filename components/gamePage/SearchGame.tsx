import React from "react"
import { useSearchParams } from "next/navigation"

import Card from "../common/Card"
import { Game } from "@/types/game/singleGame"
import { gameStatuses } from "../common/ListContent"
import { useDebounce } from "@/util/debouncing"
import { useSearchData } from "@/queries/search"
import { LoadingCard } from "../LoadingCard"
import { NoDataFound } from "../NoDataFound"

export function SearchGame() {
  const searchParams = useSearchParams()

  const debouncedQuery = useDebounce(searchParams.get("q") || "")

  const {
    data: gameData,
    isLoading,
    error,
  } = useSearchData("game", debouncedQuery)

  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {isLoading && (
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-4">
          {Array.from({ length: 16 }, (_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2">
        {!isLoading && gameData && gameData?.length != 0 ? (
          <div className="grid grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {gameData.map((game: Game) => (
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
              />
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  )
}
