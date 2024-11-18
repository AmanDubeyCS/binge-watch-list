import React from "react"

import { MangaList } from "@/components/mangaPage/MangaList"
import {
  fetchMangaList,
  fetchPopularManga,
  fetchTopManhua,
  fetchTopManhwa,
} from "@/queries/mangaDex/mangaFetch"

export default async function Page() {
  const mangaList = await fetchMangaList({ limit: 16, offset: 0, title: "" })
  const topManhwa = await fetchTopManhwa({ limit: 16, offset: 0 })
  const topManhua = await fetchTopManhua()
  const popularManga = await fetchPopularManga()

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-5 px-8 pb-10">
      {topManhwa && <MangaList mangaList={topManhwa} title="Top Manhaw" />}
      {topManhua && <MangaList mangaList={topManhua} title="Top Manhua" />}
      {popularManga && (
        <MangaList mangaList={popularManga} title="Popular Manga" />
      )}
      {mangaList && <MangaList mangaList={mangaList} title="Random Pick" />}
    </main>
  )
}
