import { configRAWG } from "@/apiConfig"
import { ListCards } from "@/components/common/ListContent"
import { GameGenresList } from "@/components/gamePage/GameGenresList"
import GamingPlatforms from "@/components/gamePage/GamingPlatforms"
import { Tv } from "lucide-react"
import React from "react"

interface Common {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Platform {
  platform: Common
}

interface Store {
  store: Common
}

interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

interface EsrbRating {
  id: number
  name: string
  slug: string
  name_en: string
  name_ru: string
}

export interface Game {
  slug: string
  name: string
  playtime: number
  platforms: Platform[]
  parent_platforms: Platform[]
  stores: Store[]
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number
  suggestions_count: number
  updated: string
  id: number
  score: number | null
  clip: string | null
  tags: Tag[]
  esrb_rating: EsrbRating
  user_game: any
  reviews_count: number
  saturated_color: string
  dominant_color: string
  short_screenshots: {
    id: number
    image: string
  }[]
  genres: Common[]
}

export default async function page() {
  const response = await fetch(configRAWG.getGamesList)
  const gamesList = await response.json()

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-5 pb-10 text-black">
      <ListCards
        gameData={gamesList.results}
        title="Popular Games"
        titleIcon={<Tv className="mr-2" />}
      />
      <GamingPlatforms />
      <GameGenresList />
    </main>
  )
}
