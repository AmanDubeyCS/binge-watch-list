import { configRAWG } from "@/apiConfig"
import GameInfo from "@/components/gamePage/GameInfo"
import React from "react"

interface Props {
  gameID: number
}

export default async function page({ params }: { params: Props }) {
  const gameId = params.gameID
  const response = await fetch(configRAWG.getSingleGame(gameId))
  const gameInfo = await response.json()
  return (
    <div>
      <div className="fixed -z-10 size-full">
        <img
          src={gameInfo.background_image}
          alt={gameInfo.name}
          className="h-auto w-full blur-[px]"
        />
      </div>
      <GameInfo gameData={gameInfo} />
    </div>
  )
}
