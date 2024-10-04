import { Anime } from "@/types/anime/singleAnime"
import {
  Award,
  BarChart2,
  Book,
  ExternalLink,
  Film,
  Info,
  Play,
  Star,
  Tag,
  Tv,
} from "lucide-react"
import React from "react"

export default function SideBarDetails({ animeInfo }: { animeInfo: Anime }) {
  return (
    <div className="w-[450px] space-y-6 text-black">
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Ratings</h2>
        <div className="mb-2 flex items-center">
          <Star className="mr-2 size-6 text-yellow-400" />
          <span className="text-3xl font-bold">
            {animeInfo.score ? animeInfo.score : "N/A"}
          </span>
        </div>
        <p className="text-gray-600">Scored by {animeInfo.scored_by} users</p>
        <div className="mt-4">
          <p className="flex items-center text-gray-700">
            <Award className="mr-2 size-4 text-blue-500" />
            <span className="font-semibold">Ranked:</span> #{animeInfo.rank}
          </p>
          <p className="flex items-center text-gray-700">
            <BarChart2 className="mr-2 size-4 text-blue-500" />
            <span className="font-semibold">Popularity:</span> #
            {animeInfo.popularity}
          </p>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">More Info</h2>
        <p className="flex items-center text-gray-700">
          <Tv className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Type:</span> {animeInfo.type}
        </p>
        <p className="flex items-center text-gray-700">
          <Film className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Episodes:</span>{" "}
          {animeInfo.episodes || "N/A"}
        </p>
        <p className="flex items-center text-gray-700">
          <Info className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Status:</span> {animeInfo.status}
        </p>
        <p className="flex items-center text-gray-700">
          <Book className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Source:</span> {animeInfo.source}
        </p>
        <p className="flex items-center text-gray-700">
          <Tag className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold ">Rating:</span> <span className="line-clamp-1">{animeInfo.rating}</span>
        </p>
      </section>
      {/* 
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Related Manga</h2>
            <div className="text-gray-700">
              <span className="font-semibold">Adaptation:</span>
              <a href="https://myanimelist.net/manga/131924/Tsue_to_Tsurugi_no_Wistoria" className="text-blue-500 hover:underline ml-2">
                Tsue to Tsurugi no Wistoria
              </a>
            </div>
          </section> */}

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">External Links</h2>
        <ul className="space-y-2">
          {animeInfo.external.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="flex items-center text-blue-500 hover:underline"
              >
                <ExternalLink className="mr-2 size-4" />
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {animeInfo.streaming.length > 0 && (
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Streaming Platforms</h2>
          <ul className="space-y-2">
            {animeInfo.streaming.map((platform, index) => (
              <li key={index}>
                <a
                  href={platform.url}
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <Play className="mr-2 size-4" />
                  {platform.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
