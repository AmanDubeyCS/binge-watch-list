import { useSearchParams } from "next/navigation"
import React from "react"
import SearchManga from "../mangaPage/SearchManga"
import SearchAnime from "../animePage/SearchAnime"
import SearchMovie from "../movies/SearchMovie"
import SearchTv from "../tvPage/SearchTv"
import SearchGame from "../gamePage/SearchGame"

export default function SearchType() {
  const searchParams = useSearchParams()
  const renderContent = () => {
    switch (searchParams.get("type")) {
      case "manga":
        return <SearchManga />
      case "anime":
        return <SearchAnime />
      case "movie":
        return <SearchMovie />
      case "show":
        return <SearchTv />
      case "game":
        return <SearchGame />
    }
  }
  console.log(searchParams.get("type"), searchParams.get("q"))
  return <div className="size-full rounded-lg">{renderContent()}</div>
}
