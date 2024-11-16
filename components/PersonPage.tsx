"use client"
import { Calendar, MapPin, TrendingUp } from "lucide-react"
import React, { useState } from "react"
import TVShowCard from "./tvPage/tvHomePage/TvShowCard"

interface Work {
  id: number
  title: string
  name: string
  character?: string
  job?: string
  release_date: string
  first_air_date: string
  vote_average: number
  media_type: string
  poster_path: string
  vote_count: number
  genre_ids: any
  popularity: number
}

export default function PersonPage({ actorData }: { actorData: any }) {
  const [activeTab, setActiveTab] = useState<"cast" | "crew">("cast")
  const [showFullBio, setShowFullBio] = useState(false)

  const renderWorkItem = (work: Work) => (
    <TVShowCard
      id={work.id}
      name={work.title || work.name}
      coverImage={`https://image.tmdb.org/t/p/w200${work.poster_path}`}
      firstAirDate={work.release_date || work.first_air_date}
      voteAverage={work.vote_average}
      voteCount={work.vote_count}
      genreIds={work.genre_ids}
      popularity={work.popularity}
      mediaType={work.media_type}
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
          <div className="w-[290px] shrink-0 bg-gray-50 p-5">
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

          <div className="w-fit p-8">
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
              <div className="flex flex-wrap gap-4 space-y-4">
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
