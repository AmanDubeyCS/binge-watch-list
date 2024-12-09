import React from "react"
import {
  fetchMangaList,
  fetchPopularManga,
  fetchTopManhua,
  fetchTopManhwa,
} from "@/queries/mangaDex/mangaFetch"
import { CurrentlyTrending } from "@/components/tvPage/tvHomePage/CurrentlyTrending"
import { BookOpen } from "lucide-react"

export default async function Page() {
  const mangaList = await fetchMangaList({ limit: 16, offset: 0, title: "" })
  const topManhwa = await fetchTopManhwa({ limit: 16, offset: 0 })
  const topManhua = await fetchTopManhua()
  const popularManga = await fetchPopularManga()

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-5 px-8 pb-10">
      {topManhwa && (
        <CurrentlyTrending
          mangaData={topManhwa}
          title="Top Manhaw"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
      {topManhua && (
        <CurrentlyTrending
          mangaData={topManhua}
          title="Top Manhua"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
      {popularManga && (
        <CurrentlyTrending
          mangaData={popularManga}
          title="Popular Manga"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
      {mangaList && (
        <CurrentlyTrending
          mangaData={mangaList}
          title="Random Pick"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
    </main>
  )
}
