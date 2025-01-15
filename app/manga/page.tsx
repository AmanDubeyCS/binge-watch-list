import React from "react"
import {
  fetchMangaList,
  fetchPopularManga,
  fetchTopManhua,
  fetchTopManhwa,
} from "@/queries/mangaDex/mangaFetch"
import { BookOpen } from "lucide-react"
import { ListCards } from "@/components/common/ListContent"

export default async function Page() {
  const [mangaList, topManhwa, topManhua, popularManga] = await Promise.all([
    fetchMangaList({ limit: 16, offset: 0, title: "" }),
    fetchTopManhwa({ limit: 16, offset: 0 }),
    fetchTopManhua(),
    fetchPopularManga(),
  ])

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 pb-10">
      {topManhwa && (
        <ListCards
          mangaData={topManhwa}
          title="Top Manhaw"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
      {topManhua && (
        <ListCards
          mangaData={topManhua}
          title="Top Manhua"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
      {popularManga && (
        <ListCards
          mangaData={popularManga}
          title="Popular Manga"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
      {mangaList && (
        <ListCards
          mangaData={mangaList}
          title="Random Pick"
          titleIcon={<BookOpen className="mr-2" />}
        />
      )}
    </main>
  )
}
