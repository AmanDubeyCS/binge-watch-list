import { useTvImages } from "@/queries/TMDB/TV/tvFetch"
import { useState } from "react"

interface MediaItem {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

// interface MediaData {
//   backdrops: MediaItem[]
//   logos: MediaItem[]
//   posters: MediaItem[]
// }

export function Pictures({ seriesId }: { seriesId: number }) {
  const { data } = useTvImages(seriesId)
  const [activeTab, setActiveTab] = useState("backdrops")

  const renderMediaItems = (items: MediaItem[]) => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items?.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              alt={`Media item ${index + 1}`}
              className="h-auto w-full object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">Votes: {item.vote_count}</p>
              <p className="text-sm text-gray-600">
                Rating: {item.vote_average.toFixed(1)}
              </p>
              {item.iso_639_1 && (
                <p className="text-sm text-gray-600">
                  Language: {item.iso_639_1.toUpperCase()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {["backdrops", "logos", "posters"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeTab === "backdrops" && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Backdrops</h2>
            {renderMediaItems(data?.backdrops)}
          </>
        )}
        {activeTab === "logos" && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Logos</h2>
            {renderMediaItems(data?.logos)}
          </>
        )}
        {activeTab === "posters" && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Posters</h2>
            {renderMediaItems(data?.posters)}
          </>
        )}
      </div>
    </div>
  )
}
