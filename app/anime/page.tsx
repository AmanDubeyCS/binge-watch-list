import React from "react"

import { config } from "@/apiConfig"
import { AnimeVideos } from "@/components/animePage/animeHomePage/AnimeVideos"
// import { AnimeStudios } from "@/components/animePage/animeHomePage/AnimeStudios"
// import { BannerCarousel } from "@/components/animePage/animeHomePage/BannerCarousel"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { Tv } from "lucide-react"
import { ListCards } from "@/components/common/ListContent"
import { TvGenresList } from "@/components/tvPage/tvHomePage/TvGenresList"

const genresList = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Adventure",
  },
  {
    id: 5,
    name: "Avant Garde",
  },
  {
    id: 46,
    name: "Award Winning",
  },
  {
    id: 28,
    name: "Boys Love",
  },
  {
    id: 4,
    name: "Comedy",
  },
  {
    id: 8,
    name: "Drama",
  },
  {
    id: 10,
    name: "Fantasy",
  },
  {
    id: 26,
    name: "Girls Love",
  },
  {
    id: 47,
    name: "Gourmet",
  },
  {
    id: 14,
    name: "Horror",
  },
  {
    id: 7,
    name: "Mystery",
  },
  {
    id: 22,
    name: "Romance",
  },
  {
    id: 24,
    name: "Sci-Fi",
  },
  {
    id: 36,
    name: "Slice of Life",
  },
  {
    id: 30,
    name: "Sports",
  },
  {
    id: 37,
    name: "Supernatural",
  },
  {
    id: 41,
    name: "Suspense",
  },
]

const genresImage = {
  1: "https://image.tmdb.org/t/p/original/A6tMQAo6t6eRFCPhsrShmxZLqFB.jpg",
  2: "https://image.tmdb.org/t/p/original/96RT2A47UdzWlUfvIERFyBsLhL2.jpg",
  4: "https://image.tmdb.org/t/p/original/yUZCIdyiu5NKenp1Bw2Ullwuzgm.jpg",
  5: "https://image.tmdb.org/t/p/original/qtmlwuXj0VyJnCjnrvdpDjo15vI.jpg",
  7: "https://image.tmdb.org/t/p/original/bl5xIjSVaNd9L2udtnfCWKyCxn6.jpg",
  8: "https://image.tmdb.org/t/p/original/1LGbfTq0iR3XhMnDOviJz92sTdZ.jpg",
  10: "https://image.tmdb.org/t/p/original/4dzp7aZnBaIL1YFzErKUdo6XWUn.jpg",
  46: "https://image.tmdb.org/t/p/original/5lAMQMWpXMsirvtLLvW7cJgEPkU.jpg",
  28: "https://image.tmdb.org/t/p/original/e0R425jmKYUYqN0lZsvVqHHAu9z.jpg",
  26: "https://image.tmdb.org/t/p/original/pgL8Xt96BGxvZWSk1SxC1GGcMLm.jpg",
  47: "https://image.tmdb.org/t/p/original/xC5GyeIzLsSRizJE5LedGShNgBa.jpg",
  14: "https://image.tmdb.org/t/p/original/pA5uvnHok0QOFMBqNy3KVv6D16x.jpg",
  22: "https://image.tmdb.org/t/p/original/31VJnwcy3VOhoqETJEFIO58ZVfF.jpg",
  24: "https://image.tmdb.org/t/p/original/5hS2OIuZSKGkR8R5l3bY5zh04Ce.jpg",
  36: "https://image.tmdb.org/t/p/original/3f3mOaUWIUhO33wAV3JkeypDsEu.jpg",
  30: "https://image.tmdb.org/t/p/original/3Aj7j0xHXwGntChU1VaL9seBGIe.jpg",
  37: "https://image.tmdb.org/t/p/original/j0gsESaBzFmYVhnBTXzIE9PsgY8.jpg",
  41: "https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
}

export default async function Page() {
  const [
    // bannerAnime,
    trendingAnime,
    latestPromo,
    upcomingRes,
    // popularStudios,
  ] = await Promise.all([
    // fetchFromJikan(config.getBannerAnime, 0),
    fetchFromJikan(config.getAnimeList, 350),
    fetchFromJikan(config.getLatestpromos, 700),
    fetchFromJikan(config.getUpcomongAnimes, 1050),
    // fetchFromJikan(config.getPopularStudios, 1100),
  ])

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 pb-10">
      {/* {bannerAnime?.data?.length > 0 && (
          <BannerCarousel anime={bannerAnime.data} />
        )} */}
      {trendingAnime?.data?.length > 0 && (
        <ListCards
          animeData={trendingAnime.data}
          title="Currently Airing"
          titleIcon={<Tv className="mr-2" />}
        />
      )}
      {latestPromo?.data?.length > 0 && (
        <AnimeVideos animeVideos={latestPromo.data} />
      )}
      {/* {popularStudios?.data?.length > 0 && (
          <AnimeStudios studios={popularStudios.data} />
        )} */}
      {upcomingRes?.data?.length > 0 && (
        <ListCards
          animeData={upcomingRes.data}
          title="Upcoming"
          titleIcon={<Tv className="mr-2" />}
        />
      )}
      <TvGenresList categorys={genresList} genraImage={genresImage} />
    </main>
  )
}
