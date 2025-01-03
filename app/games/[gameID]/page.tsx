import { configRAWG } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
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
    <main>
      <ContentDetails
        backdropPoster={gameInfo.background_image}
        poster={gameInfo.background_image}
        title={gameInfo.name}
        date={gameInfo.released || "TBA"}
        genres={gameInfo.genres.map((genres: { name: string }) => genres.name)}
        rating={gameInfo.rating * 2}
        voteCount={gameInfo.ratings_count}
        overview={gameInfo.description_raw}
        production={gameInfo.developers.map(
          (dev: { name: string }) => dev.name
        )}
        producer={gameInfo.publishers.map((pub: { name: string }) => pub.name)}
        esbrrating={gameInfo.esrb_rating?.name || "N/A"}
        type="game"
      />
      <GameInfo gameData={gameInfo} />
    </main>
  )
}
