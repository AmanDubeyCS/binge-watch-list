import { useGameAdditions } from "@/queries/RAWG/gameFetch"
import React, { useState } from "react"
import { Calendar, Star, Tag, Gamepad, Info } from "lucide-react"
import { GameDlc } from "@/types/game/singleGame"

export function GameDLC({ gameId }: { gameId: number }) {
  const { data: dlcData } = useGameAdditions(gameId)
  const [activeTab, setActiveTab] = useState("details")
  const [selectedScreenshot, setSelectedScreenshot] = useState(
    (dlcData && dlcData.short_screenshots && dlcData.short_screenshots[0]) || ""
  )

  return (
    <div>
      {dlcData && dlcData.results.length > 0 && (
        <div>
          {dlcData.results.map((dlcData: GameDlc) => (
            <div key={dlcData.id} className="bg-gray-100 px-4 py-8 text-black">
              <div className="overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="relative h-96">
                  <img
                    src={dlcData.background_image}
                    alt={dlcData.name}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h1 className="mb-2 text-4xl font-bold text-white">
                      {dlcData.name}
                    </h1>
                    <div className="flex items-center text-white">
                      <Star className="mr-1 size-5 text-yellow-400" />
                      <span className="mr-4">
                        {dlcData.rating} ({dlcData.ratings_count} ratings)
                      </span>
                      <Calendar className="mr-1 size-5" />
                      <span>Released: {dlcData.released}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex">
                    <button
                      className={`mr-4 pb-2 ${activeTab === "details" ? "border-b-2 border-blue-500" : ""}`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </button>
                    <button
                      className={`pb-2 ${activeTab === "screenshots" ? "border-b-2 border-blue-500" : ""}`}
                      onClick={() => setActiveTab("screenshots")}
                    >
                      Screenshots
                    </button>
                  </div>

                  {activeTab === "details" && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h2 className="mb-2 flex items-center text-xl font-semibold">
                          <Gamepad className="mr-2" /> Platforms
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {dlcData.platforms?.map((platform) => (
                            <span
                              key={platform.platform.slug}
                              className="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                            >
                              {platform.platform.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="mb-2 flex items-center text-xl font-semibold">
                          <Tag className="mr-2" /> Genres
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {dlcData.genres?.map((genre) => (
                            <span
                              key={genre.slug}
                              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="mb-2 flex items-center text-xl font-semibold">
                          <Info className="mr-2" /> ESRB Rating
                        </h2>
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                          {dlcData.esrb_rating?.name || "N/A"}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTab === "screenshots" && (
                    <div>
                      <div className="mb-4">
                        <img
                          src={selectedScreenshot.image}
                          alt="Selected screenshot"
                          className="h-96 w-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {dlcData?.short_screenshots?.map((screenshot) => (
                          <img
                            key={screenshot.id}
                            src={screenshot.image}
                            alt={`Screenshot ${screenshot.id}`}
                            className={`cursor-pointer rounded-lg transition-all ${selectedScreenshot.id === screenshot.id ? "ring-4 ring-blue-500" : "hover:opacity-75"}`}
                            onClick={() => setSelectedScreenshot(screenshot)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
