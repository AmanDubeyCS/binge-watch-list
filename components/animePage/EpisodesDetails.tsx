import React from "react"
import { useEpisodeDetails } from "@/queries/jikan/animefetch"
import { Calendar, Star } from "lucide-react"

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

export function EpisodesDetails({ animeID }: { animeID: number }) {
  const { data } = useEpisodeDetails(animeID)

  if (data && data.length === 0) {
    return (
      <div className="flex w-full justify-center text-[24px] text-black">
        N/A
      </div>
    )
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

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {data &&
        data.map((episode: Episode, index: number) => (
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
                  <h3 className="mb-1 text-xl font-semibold text-gray-800">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {episode.title_japanese}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Calendar className="mr-2 size-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDate(episode.aired)}
                  </span>
                </div>
                <div className="flex items-center rounded-full bg-indigo-50 px-3 py-1">
                  <Star className="mr-2 size-5 text-yellow-400" />
                  <span className="text-sm font-medium text-indigo-600">
                    {episode.score}
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
