import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import Card from "../common/Card"
import { useSearchGame } from "@/queries/RAWG/gameFetch"
import { Game } from "@/types/game/singleGame"
import { gameStatuses } from "../common/ListContent"

export default function SearchGame() {
  const searchParams = useSearchParams()
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchParams.get("q") || "")
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchParams])

  const { data: gameData, error, isLoading } = useSearchGame(debouncedSearch)

  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className="mx-auto flex max-w-[1600px] flex-wrap justify-center gap-2">
        <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {!isLoading &&
            gameData &&
            gameData.map((game: Game) => {
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
      </div>
    </>
  )
}
