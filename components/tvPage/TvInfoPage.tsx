"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Bookmark, Heart, Info, Star } from "lucide-react"
import ChipTabs from "../ChipTabs"
import { SideBarDetails } from "./SidebarDetails"
import { Overview } from "./Overview"
import { CharacterDetails } from "./CharacterDetails"
import { EpisodesDetails } from "./EpisodesDetails"
import { Recommendations } from "./Recommendations"
import { Reviews } from "./Reviews"
import { Pictures } from "./Pictures"

export function TvInfoPage({ tvInfo, tvID }: any) {
  const tabs = [
    "Overview",
    "Characters",
    "Seasons",
    "Reviews",
    "Recommendations",
    "Media",
  ]
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview trailer={tvInfo.videos.results} />
      case "Characters":
        return tvID && <CharacterDetails seriesId={tvID} />
      case "Seasons":
        return (
          tvInfo && <EpisodesDetails seasons={tvInfo.seasons} seriesId={tvID} />
        )
      case "Reviews":
        return tvInfo && <Reviews seriesId={tvID} />
      case "Recommendations":
        return tvInfo && <Recommendations seriesId={tvID} />
      case "Media":
        return tvInfo && <Pictures seriesId={tvID} />
      default:
        return <Overview trailer={tvInfo.videos.results} />
    }
  }

  return (
    <section>
      <div
        className="relative h-fit overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%)",
        }}
      >
        <Image
          src={tvInfo.backdropImage}
          alt="image"
          width={1000}
          height={1000}
          priority={false}
          className="absolute -z-30 h-auto w-full pl-72"
        />
        <div className="mx-auto flex h-full max-w-[1600px] items-center px-10 py-8">
          <Image
            src={tvInfo.coverImage}
            alt="image"
            width={600}
            height={500}
            className="h-[450px] w-auto rounded-lg"
          />
          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <h1 className="text-3xl font-bold">
              {tvInfo.name} ({tvInfo.first_air_date.substring(0, 4)})
            </h1>
            <div className="flex items-center gap-2 text-base">
              <p className="rounded-md border border-white px-[4px]">
                {tvInfo.in_production ? "Currently Airing" : tvInfo.status}
              </p>
              <p>{tvInfo.first_air_date}</p>
              <div className="size-[4px] rounded-full bg-white"></div>
              <div className="flex flex-1 flex-wrap">
                {tvInfo.genres.map((genre: any, index: number) => (
                  <p key={genre.id}>
                    {genre.name}
                    {index < tvInfo.genres.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full px-3 py-1">
                <Star className="size-5 text-yellow-400" />
                <span className="text-lg font-bold">
                  {tvInfo.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-300">
                  ({tvInfo.vote_count} votes)
                </span>
              </div>
              <button className="rounded-full bg-[#161b22] p-2">
                <Heart className="size-5" />
              </button>
              <button className="rounded-full bg-[#161b22] p-2">
                <Bookmark className="size-5" />
              </button>
            </div>
            <p className="text-[22px] font-bold text-white">Overview</p>
            <p className="line-clamp-6 text-gray-300">{tvInfo.overview}</p>
            <div className="grid grid-cols-2 gap-4">
              {tvInfo.created_by.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Info className="size-4" /> Creator
                  </h3>
                  <div className="flex flex-wrap text-gray-400">
                    {tvInfo.created_by.map((createdBy: any, index: number) => (
                      <div key={createdBy.id}>
                        <p className="font-mediu text-base">
                          {createdBy.name}
                          {index < tvInfo.created_by.length - 1 ? "," : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Production
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  {tvInfo.production_companies.map(
                    (productionCompanies: any, index: number) => (
                      <div key={productionCompanies.id}>
                        <p className="text-base font-medium">
                          {productionCompanies.name}
                          {index < tvInfo.production_companies.length - 1
                            ? ","
                            : ""}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
        }}
        className=""
      >
        <div className="mx-auto flex max-w-[1600px] gap-4 p-10">
          <SideBarDetails
            rating={tvInfo.vote_average}
            voteCount={tvInfo.vote_count}
            popularity={tvInfo.popularity}
            type={tvInfo.type}
            numberOfSeasons={tvInfo.number_of_seasons}
            numberOfEpisodes={tvInfo.number_of_episodes}
            language={tvInfo.original_language}
            network={tvInfo.networks}
            externalIds={tvInfo.external_ids}
            watchProvider={tvInfo["watch/providers"].results}
          />
          <div className="flex w-full flex-col gap-4">
            <div className="h-[50px] rounded-lg border">
              <ChipTabs
                activeTab={(val: string) => setActiveTab(val)}
                tabs={tabs}
              />
            </div>
            <div className="size-full rounded-lg">{renderContent()}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
