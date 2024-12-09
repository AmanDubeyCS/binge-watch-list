import React from "react"

import { config } from "@/apiConfig"
import { AnimeVideos } from "@/components/animePage/animeHomePage/AnimeVideos"
import { AnimeStudios } from "@/components/animePage/animeHomePage/AnimeStudios"
import { BannerCarousel } from "@/components/animePage/animeHomePage/BannerCarousel"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { CurrentlyTrending } from "@/components/tvPage/tvHomePage/CurrentlyTrending"
import { Tv } from "lucide-react"

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
          <CurrentlyTrending
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
          <CurrentlyTrending
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
