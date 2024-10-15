import React from "react"

import { config } from "@/apiConfig"
import { CurrentlyAiring } from "@/components/animePage/animeHomePage/CurrentlyAiring"
import { AnimeVideos } from "@/components/animePage/animeHomePage/AnimeVideos"
import { AnimeStudios } from "@/components/animePage/animeHomePage/AnimeStudios"
import { UpcomingAnime } from "@/components/animePage/animeHomePage/UpcomingAnime"
import { BannerCarousel } from "@/components/animePage/animeHomePage/BannerCarousel"

export default async function Page() {
  try {
    // Fetch trending anime
    const trendingAnime = await fetch(config.getAnimeList, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    }).then((res) => res.json())

    // Fetch latest Promo videos of anime
    const latestPromo = await fetch(config.getLatestpromos, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    }).then((res) => res.json())

    // Fetch Upcoming anime
    const upcomingRes = await fetch(config.getUpcomongAnimes, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    }).then((res) => res.json())

    const popularStudios = await fetch(config.getPopularStudios, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    }).then((res) => res.json())

    const bannerAnime = await fetch(config.getBannerAnime, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    }).then((res) => res.json())

    return (
      <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
        {bannerAnime?.data?.length > 0 && <BannerCarousel anime={bannerAnime.data} />}
        {trendingAnime?.data?.length > 0 && (
          <CurrentlyAiring currentlyAiring={trendingAnime.data} />
        )}
        {latestPromo?.data?.length > 0 && <AnimeVideos animeVideos={latestPromo.data} />}
        {popularStudios?.data?.length > 0 && <AnimeStudios studios={popularStudios.data} />}
        {upcomingRes?.data?.length > 0 && <UpcomingAnime upcomingAnime={upcomingRes.data} />}
      </main>
    )
  } catch (error) {
    console.error('Error fetching anime data:', error)
    return <div>Error loading anime content. Please try again later.</div>
  }
}
