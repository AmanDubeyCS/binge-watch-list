"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Bookmark, Heart, Info, Star } from "lucide-react"
import { SideBarDetails } from "../tvPage/SidebarDetails"
import ChipTabs from "../ChipTabs"
import { Overview } from "../tvPage/Overview"
import { CastDetails } from "./CastDetails"
import { MovieCollection } from "./MovieCollection"
import { Reviews } from "./Reviews"
import { Recommendations } from "./Recommendations"
import { Pictures } from "./Pictures"

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}
interface Provider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface CountryStreamingInfo {
  link: string
  flatrate?: Provider[]
  buy?: Provider[]
  ads?: Provider[]
}

interface StreamingAvailability {
  [countryCode: string]: CountryStreamingInfo
}

interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null | {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  coverImage: string
  backdropImage: string
  external_ids: {
    imdb_id: string
    freebase_mid: string | null
    freebase_id: string | null
    tvdb_id: number | null
    tvrage_id: number | null
    wikidata_id: string
    facebook_id: string | null
    instagram_id: string | null
    twitter_id: string | null
  }
  videos: {
    results: any
  }
  "watch/providers": {
    results: StreamingAvailability
  }
}

export default function MovieInfoPage({
  movieInfo,
  movieId,
}: {
  movieInfo: MovieDetails
  movieId: number
}) {
  const [activeTab, setActiveTab] = useState("overview")
  const tabs = [
    "Overview",
    "Characters",
    "Collection",
    "Reviews",
    "Recommendations",
    "Media",
  ]
  // console.log(movieInfo)
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview trailer={movieInfo.videos.results} />
      case "Characters":
        return movieId && <CastDetails movieId={movieId} />
      case "Collection":
        return movieInfo.belongs_to_collection ? (
          <MovieCollection collectionId={movieInfo.belongs_to_collection.id} />
        ) : (
          <MovieCollection collectionId={null} />
        )
      case "Reviews":
        return movieId && <Reviews movieId={movieId} />
      case "Recommendations":
        return movieId && <Recommendations movieId={movieId} />
      case "Media":
        return movieId && <Pictures movieId={movieId} />
      default:
        return <Overview trailer={movieInfo.videos.results} />
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
          src={movieInfo.backdropImage}
          alt="image"
          width={1000}
          height={1000}
          priority={false}
          className="absolute -z-30 h-auto w-full pl-72"
        />
        <div className="mx-auto flex h-full max-w-[1600px] items-center px-10 py-8">
          <Image
            src={movieInfo.coverImage}
            alt="image"
            width={600}
            height={500}
            className="h-[450px] w-auto rounded-lg"
          />
          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <h1 className="text-3xl font-bold">
              {movieInfo.title} ({movieInfo.release_date.substring(0, 4)})
            </h1>
            <div className="flex items-center gap-2 text-base">
              <p className="rounded-md border border-white px-[4px]">
                {movieInfo.status}
              </p>
              <p>{movieInfo.release_date}</p>
              <div className="size-[4px] rounded-full bg-white"></div>
              <div className="flex flex-1 flex-wrap">
                {movieInfo.genres.map((genre: any, index: number) => (
                  <p key={genre.id}>
                    {genre.name}
                    {index < movieInfo.genres.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full px-3 py-1">
                <Star className="size-5 text-yellow-400" />
                <span className="text-lg font-bold">
                  {movieInfo.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-300">
                  ({movieInfo.vote_count} votes)
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
            <p className="line-clamp-6 text-gray-300">{movieInfo.overview}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Info className="size-4" /> Production
                </h3>
                <div className="flex flex-wrap text-gray-400">
                  {movieInfo.production_companies.map(
                    (productionCompanies: any, index: number) => (
                      <div key={productionCompanies.id}>
                        <p className="text-base font-medium">
                          {productionCompanies.name}
                          {index < movieInfo.production_companies.length - 1
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
            rating={movieInfo.vote_average}
            voteCount={movieInfo.vote_count}
            popularity={movieInfo.popularity}
            type={movieInfo.status}
            budget={movieInfo.budget}
            revenue={movieInfo.revenue}
            runTime={movieInfo.runtime}
            language={movieInfo.original_language}
            externalIds={movieInfo.external_ids}
            watchProvider={movieInfo["watch/providers"].results}
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
