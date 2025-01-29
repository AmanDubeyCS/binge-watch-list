"use client"
import { Calendar, MapPin, TrendingUp } from "lucide-react"
import React, { useState } from "react"
import { genreMap } from "./tvPage/tvHomePage/CurrentlyTrending"
import Card from "./common/Card"

interface ExternalIds {
  freebase_mid: string | null
  freebase_id: string | null
  imdb_id: string | null
  tvrage_id: string | null
  wikidata_id: string | null
  facebook_id: string | null
  instagram_id: string | null
  tiktok_id: string | null
  twitter_id: string | null
  youtube_id: string | null
}

interface Cast {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  first_air_date: string
  title: string
  name: string
  video: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order?: number
  media_type: "movie" | "tv"
  origin_country?: string[]
  episode_count?: number
}

interface CombinedCredits {
  cast: Cast[]
  crew: Cast[]
}

interface Person {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string | null
  known_for_department: string
  name: string
  place_of_birth: string | null
  popularity: number
  profile_path: string | null
  combined_credits: CombinedCredits
  external_ids: ExternalIds
}

export default function PersonPage({ actorData }: { actorData: Person }) {
  const [activeTab, setActiveTab] = useState<"cast" | "crew">("cast")
  const [showFullBio, setShowFullBio] = useState(false)

  const renderWorkItem = (work: Cast) => (
    <Card
      key={work.id}
      id={work.id}
      name={work.title || work.name}
      coverImage={`https://image.tmdb.org/t/p/w300/${work.poster_path}`}
      tag={work.release_date || work.first_air_date}
      voteAverage={work.vote_average}
      voteCount={work.vote_count}
      genre={work.genre_ids.map(
        (genres) => genreMap[genres as keyof typeof genreMap]
      )}
      numbers={work.popularity}
      mediaType="movie"
      status={[]}
    />
  )

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-md">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-[450px] w-full object-cover md:w-72"
              src={`https://image.tmdb.org/t/p/w500${actorData.profile_path}`}
              alt={actorData.name}
            />
          </div>
          <div className="p-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {actorData.name}
            </h1>
            <p className="mb-4 text-gray-600">
              {showFullBio
                ? actorData.biography
                : `${actorData.biography.slice(0, 1200)}...`}
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                {showFullBio ? "Show less" : "Read more"}
              </button>
            </p>
            {/* <div className="mt-4 flex space-x-4">
              {actorData.social_profiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label={`${actorData.name} on ${profile.platform}`}
                >
                  <profile.icon className="h-6 w-6" />
                </a>
              ))}
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-200 md:flex">
          <div className="shrink-0 bg-gray-50 p-5 md:w-[290px]">
            <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="mr-2 size-5 text-gray-500" />
                <span>Born: {actorData.birthday}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 size-5 text-gray-500" />
                <span>{actorData.place_of_birth}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="mr-2 size-5 text-gray-500" />
                <span>Popularity: {actorData.popularity.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="w-fit p-2 sm:p-8">
            <nav className="mb-6 flex space-x-4">
              <button
                onClick={() => setActiveTab("cast")}
                className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === "cast" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
              >
                Cast
              </button>
              <button
                onClick={() => setActiveTab("crew")}
                className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === "crew" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
              >
                Crew
              </button>
            </nav>

            <div className="space-y-4">
              <h2 className="mb-4 text-xl font-semibold">
                {activeTab === "cast" ? "Acting Roles" : "Behind the Scenes"}
              </h2>
              <div className="flex flex-wrap gap-2 space-y-4">
                {activeTab === "cast"
                  ? actorData.combined_credits.cast.map(renderWorkItem)
                  : actorData.combined_credits.crew.map(renderWorkItem)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
