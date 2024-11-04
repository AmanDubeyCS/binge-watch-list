import React from "react"

import { config } from "@/apiConfig"
import { CurrentlyAiring } from "@/components/animePage/animeHomePage/CurrentlyAiring"
import { AnimeVideos } from "@/components/animePage/animeHomePage/AnimeVideos"
import { AnimeStudios } from "@/components/animePage/animeHomePage/AnimeStudios"
import { UpcomingAnime } from "@/components/animePage/animeHomePage/UpcomingAnime"
import { BannerCarousel } from "@/components/animePage/animeHomePage/BannerCarousel"
import { fetchFromJikan } from "@/util/fetchFromJikan"

export default async function Page() {
  try {
    const bannerAnime = await fetchFromJikan(config.getBannerAnime, 0)
    const trendingAnime = await fetchFromJikan(config.getAnimeList, 350)
    const latestPromo = await fetchFromJikan(config.getLatestpromos, 700)
    const upcomingRes = await fetchFromJikan(config.getUpcomongAnimes, 1050)
    const popularStudios = await fetchFromJikan(config.getPopularStudios, 1400)

    return (
      <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
        {bannerAnime?.data?.length > 0 && (
          <BannerCarousel anime={bannerAnime.data} />
        )}
        {trendingAnime?.data?.length > 0 && (
          <CurrentlyAiring currentlyAiring={trendingAnime.data} />
        )}
        {latestPromo?.data?.length > 0 && (
          <AnimeVideos animeVideos={latestPromo.data} />
        )}
        {popularStudios?.data?.length > 0 && (
          <AnimeStudios studios={popularStudios.data} />
        )}
        {upcomingRes?.data?.length > 0 && (
          <UpcomingAnime upcomingAnime={upcomingRes.data} />
        )}
      </main>
    )
  } catch (error) {
    console.error("Error fetching anime data:", error)
    return <div>Error loading anime content. Please try again later.</div>
  }
}
