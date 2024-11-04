import React from "react"
import { trendingTvFetch } from "@/quries/TMDB/TV/tvFetch"

import { CurrentlyTrending } from "@/components/tvPage/tvHomePage/CurrentlyTrending"
import { configTMDB } from "@/apiConfig"
import { TvProviders } from "@/components/tvPage/tvHomePage/TvProviders"
import { TvGenresList } from "@/components/tvPage/tvHomePage/TvGenresList"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"

export default async function MoviesPage() {
  const trendingTv = await trendingTvFetch()

  const [PopularTV, tvProviders, tvGenres] = await Promise.all([
    fetchFromTMDB(configTMDB.getTvPopular),
    fetchFromTMDB(configTMDB.getTvProviders),
    fetchFromTMDB(configTMDB.getTvGenres),
  ])

  const tvGenraList = {
    10759: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    16: "https://image.tmdb.org/t/p/w500/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
    35: "	https://image.tmdb.org/t/p/w500/9akij7PqZ1g6zl42DQQTtL9CTSb.jpg",
    80: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    99: "https://image.tmdb.org/t/p/w500/nkvdPFYo7o2IQWooJvA9UE0nvAp.jpg",
    18: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    10751: "https://image.tmdb.org/t/p/w500/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg",
    10762: "https://image.tmdb.org/t/p/w500/bCPbHgdMa3kUUQ4kja7h1RAhMj2.jpg",
    9648: "https://image.tmdb.org/t/p/w500/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
    10763: "https://image.tmdb.org/t/p/w500/djcEDl60FT9wMk6P2Rop69zUvd4.jpg",
    10764: "https://image.tmdb.org/t/p/w500/zRlu3idMmqfrtnw7h2qHaAGzxnw.jpg",
    10765: "https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    10766: "https://image.tmdb.org/t/p/w500/sgCcmsJ4aKAK8QwrbG6RLYxxFAj.jpg",
    10767: "https://image.tmdb.org/t/p/w500/pbpoLLp4kvnYVfnEGiEhagpJuVZ.jpg",
    10768: "https://image.tmdb.org/t/p/w500/uCr7Ov7Rpzx0c0EPqbPcoEruTYl.jpg",
    37: "https://image.tmdb.org/t/p/w500/vOYfRZ0NpUK5hG2CB2dJFnYJlGe.jpg",
  }

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
      {trendingTv && (
        <CurrentlyTrending tvData={trendingTv} title="Currently Trending" />
      )}
      {PopularTV && (
        <CurrentlyTrending tvData={PopularTV.results} title="Popular on TV" />
      )}
      {tvProviders && <TvProviders TvProviders={tvProviders.results} />}
      {tvGenres && (
        <TvGenresList categorys={tvGenres.genres} genraImage={tvGenraList} />
      )}
    </main>
  )
}
