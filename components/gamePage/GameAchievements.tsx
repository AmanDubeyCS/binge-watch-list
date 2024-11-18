import React from "react"
import Image from "next/image"
import { Trophy } from "lucide-react"
import { useGameAchivements } from "@/queries/RAWG/gameFetch"

interface Achievement {
  id: number
  name: string
  description: string
  image: string
  percent: string
}

export function GameAchievements({ gameId }: { gameId: number }) {
  const { data } = useGameAchivements(gameId)
  return (
    <div className="container mx-auto rounded-md bg-white px-4 py-8 text-black">
      {data && data.results && (
        <>
          <h1 className="mb-6 flex items-center justify-center text-3xl font-bold">
            <Trophy className="mr-2" />
            Achievements
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.results.map((achievement: Achievement) => (
              <div
                key={achievement.id}
                className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md"
              >
                <Image
                  src={achievement.image}
                  alt={achievement.name}
                  width={64}
                  height={64}
                  className="mb-2 size-[100px] rounded-md"
                />
                <h2 className="mb-1 text-lg font-semibold">
                  {achievement.name}
                </h2>
                <p className="mb-2 text-sm text-gray-600">
                  {achievement.description}
                </p>
                <div className="mt-auto">
                  <span className="text-xs text-gray-500">Achieved at</span>
                  <p className="text-lg font-bold text-blue-600">
                    {achievement.percent}%
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-md">
              <h2 className="mb-1 text-[54px] font-medium text-gray-500">
                +{data.count - 10} More
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
