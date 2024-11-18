import Image from "next/image"
import { Star, Calendar, Gamepad2, Tag, Monitor } from "lucide-react"
import { MainContent } from "./MainContent"
import { Game } from "@/types/game/singleGame"
import Link from "next/link"

export default function GameInfo({ gameData }: { gameData: Game }) {
  const labels = {
    yet: "Yet to be played",
    owned: "Owned by",
    beaten: "Beaten by",
    toplay: "To play",
    dropped: "Dropped by",
    playing: "Playing",
  }

  const pcPlatform = gameData.platforms.find(
    (platformData) => platformData.platform.name === "PC"
  )

  const formatRequirements = (requirements: string) => {
    return requirements?.split("\n").map((line, index) => (
      <div key={index}>
        {line}
        <br />
      </div>
    ))
  }
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5 p-10">
      <div className="flex gap-6">
        <div className="w-2/3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {gameData.name}
                </h1>
              </div>
              <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                ESRB: {gameData.esrb_rating?.name || "N/A"}
              </span>
            </div>
            <div className="mt-6">
              <Image
                src={gameData.background_image}
                alt={gameData.name}
                width={800}
                height={450}
                className="h-[450px] w-[950px] rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Ratings & Reviews
              </h2>
              <div className="mb-4 flex items-center">
                <span className="mr-2 text-4xl font-bold text-gray-900">
                  {gameData.rating * 2}
                </span>
                <div>
                  <div className="flex">
                    {Array.from({ length: Math.round(gameData.rating) }).map(
                      (_, star) => (
                        <Star
                          key={star}
                          className="fill-yellow-400 text-yellow-400"
                          size={20}
                        />
                      )
                    )}
                    {[1, 2, 3, 4, 5]
                      .slice(Math.round(gameData.rating), 5)
                      .map((star) => (
                        <Star
                          key={star}
                          className="text-yellow-400"
                          size={20}
                          fill="none"
                          strokeWidth={1.5}
                        />
                      ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {gameData.ratings_count} reviews
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {gameData.ratings.map((rating) => (
                  <div key={rating.title} className="flex items-center">
                    <span className="w-24 text-sm text-gray-600">
                      {rating.title}
                    </span>
                    <div className="mx-2 h-2 grow rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${rating.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {rating.percent.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Game Info
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Developer:</strong> {gameData.developers[0]?.name}
                </p>
                <p>
                  <strong>Publisher:</strong> {gameData.publishers[0]?.name}
                </p>
                <p>
                  <strong>Genre:</strong>{" "}
                  {gameData.genres.map((genre) => (
                    <span>{genre.name}, </span>
                  ))}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={gameData.website}
                    className="text-blue-500 hover:underline"
                  >
                    Official Website
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-4">
              <MainContent gameId={gameData.id}>
                <div className="rounded-lg">
                  <div className="rounded-md bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-4xl font-semibold text-gray-900">
                      About the Game
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{ __html: gameData.description }}
                    ></div>
                    {pcPlatform?.requirements.minimum && (
                      <div>
                        <h2 className="my-4 flex items-center text-xl font-semibold">
                          <Monitor className="mr-2" /> System Requirements
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 text-lg font-semibold">
                              Minimum Requirements
                            </h3>
                            <div className="rounded-lg bg-gray-100 p-4">
                              {formatRequirements(
                                pcPlatform.requirements.minimum
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-2 text-lg font-semibold">
                              Recommended Requirements
                            </h3>
                            <div className="rounded-lg bg-gray-100 p-4">
                              {formatRequirements(
                                pcPlatform.requirements.recommended
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex gap-8">
                    {gameData.added_by_status && (
                      <div className="w-1/2 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">
                          Player Stats
                        </h2>
                        <div className="grid grid-cols-2 text-gray-600">
                          {Object.entries(gameData.added_by_status).map(
                            ([key, value]) => (
                              <p key={key} className="flex">
                                <strong className="w-[135px]">
                                  {labels[key as keyof typeof labels]} :
                                </strong>{" "}
                                {value as number}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <div className="w-1/2 rounded-lg bg-white p-6 shadow-md">
                      <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        Release Info
                      </h2>
                      <div className="space-y-2 text-gray-600">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="mr-2" />
                            <strong>Release Date: </strong>{" "}
                            {gameData.released || "TBA"}
                          </div>
                          <div className="flex flex-wrap items-center">
                            <Gamepad2 className="mr-2" />
                            <strong>Platforms: </strong>{" "}
                            {gameData.platforms.map((platform, index) => (
                              <Link
                                href={`/games/discover?platforms=${platform.platform.id}`}
                                className="mr-1 underline"
                              >
                                {platform.platform.name}{" "}
                                {index < gameData.platforms.length - 1
                                  ? ","
                                  : ""}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 flex gap-2 text-xl font-semibold text-gray-900">
                      <Tag />
                      Tags
                    </h2>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        {gameData.tags.map((tag) => (
                          <p className="rounded-md bg-[#e9ecef] p-2 text-sm text-black">
                            {tag.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </MainContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
