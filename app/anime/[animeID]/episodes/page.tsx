import { config } from "@/apiConfig"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { Calendar, Star } from "lucide-react"
import React from "react"

interface Episode {
  mal_id: number
  url: string
  title: string
  title_japanese: string
  title_romanji: string
  aired: string
  score: number
  filler: boolean
  recap: boolean
  forum_url: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/")
}

export default async function page({
  params,
}: {
  params: { animeID: number }
}) {
  const animeID = params.animeID
  const animeData = await fetchFromJikan(config.getAnimeEpisodes(animeID), 0)
  const episodes = await animeData.data
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {episodes &&
        episodes.map((episode: Episode, index: number) => (
          <div
            key={index}
            className="mx-auto w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <span className="text-3xl font-bold text-indigo-600">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-800 md:text-xl">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {episode.title_japanese}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="flex items-center">
                  <Calendar className="mr-2 size-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDate(episode.aired)}
                  </span>
                </div>
                <div className="flex items-center rounded-full bg-indigo-50 px-3 py-1">
                  <Star className="mr-2 size-5 text-yellow-400" />
                  <span className="text-sm font-medium text-indigo-600">
                    {episode.score * 2}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              {episode.filler ? (
                <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                  Filler
                </span>
              ) : (
                <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
                  Not Filler
                </span>
              )}

              <a
                href={episode.forum_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
              >
                Discuss Episode
              </a>
            </div>
          </div>
        ))}
    </div>
  )
}
