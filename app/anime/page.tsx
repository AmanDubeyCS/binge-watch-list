import React from "react"

import { config } from "@/apiConfig"
import { AnimeVideos } from "@/components/animePage/animeHomePage/AnimeVideos"
import { AnimeStudios } from "@/components/animePage/animeHomePage/AnimeStudios"
import { BannerCarousel } from "@/components/animePage/animeHomePage/BannerCarousel"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { Tv } from "lucide-react"
import { ListCards } from "@/components/common/ListContent"

export default async function Page() {
  try {
    const [
      bannerAnime,
      trendingAnime,
      latestPromo,
      upcomingRes,
      popularStudios,
    ] = await Promise.all([
      fetchFromJikan(config.getBannerAnime, 0),
      fetchFromJikan(config.getAnimeList, 350),
      fetchFromJikan(config.getLatestpromos, 700),
      fetchFromJikan(config.getUpcomongAnimes, 1050),
      fetchFromJikan(config.getPopularStudios, 1100),
    ])

    return (
      <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
        {bannerAnime?.data?.length > 0 && (
          <BannerCarousel anime={bannerAnime.data} />
        )}
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
        {popularStudios?.data?.length > 0 && (
          <AnimeStudios studios={popularStudios.data} />
        )}
        {upcomingRes?.data?.length > 0 && (
          <ListCards
            animeData={upcomingRes.data}
            title="Upcoming"
            titleIcon={<Tv className="mr-2" />}
          />
        )}
      </main>
    )
  } catch (error) {
    console.error("Error fetching anime data:", error)
    return <div>Error loading anime content. Please try again later.</div>
  }
}
