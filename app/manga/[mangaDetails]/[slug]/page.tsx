import { ArrowDown, ArrowUp, Tag } from "lucide-react"
import React from "react"

interface MangaUpdatesData {
  categories: { category: string }[]
  category_recommendations: { series_name: string; series_url: string }[]
  rank: {
    position: { [key: string]: number }
    old_position: { [key: string]: number }
    lists: { [key: string]: number }
  }
}

export default async function page({ params }: { params: any }) {
  const muID = params.slug
  if (muID === "1") {
    return <div>no data</div>
  }
  const response = await fetch(`https://api.mangaupdates.com/v1/series/${muID}`)
  const MUData = (await response.json()) as MangaUpdatesData

  if (!MUData) {
    return
  }

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) return <ArrowUp className="text-green-500" />
    if (current > previous) return <ArrowDown className="text-red-500" />
    return null
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {MUData.categories.map((category) => (
              <div
                key={category.category}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-200 px-2 py-1 text-sm"
              >
                <Tag className="mr-1 size-3" />
                <span className="ml-1 text-xs font-bold">
                  {category.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div>
        <h3 className="mb-4 text-xl font-semibold">Recommendations</h3>
        <ul className="space-y-2">
          {MUData.category_recommendations.map((recommendation) => (
            <li
              key={recommendation.series_name}
              className="flex items-center justify-between"
            >
              <Link
                href={recommendation.series_url}
                className="text-blue-500 hover:underline"
              >
                {recommendation.series_name}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border shadow-lg">
          <div className="border-b p-4">
            <h3 className="text-lg">Current Position</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {Object.entries(MUData.rank.position).map(
                ([period, position]) => (
                  <li
                    key={period}
                    className="flex items-center justify-between"
                  >
                    <span className="capitalize">
                      {period.replace("_", " ")}
                    </span>
                    <div className="flex items-center">
                      {getRankChange(
                        position,
                        MUData.rank.old_position[period]
                      )}
                      <span className="mr-2 rounded-full bg-gray-100 px-3 py-1 font-semibold">
                        {position}
                      </span>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="rounded-lg border shadow-lg">
          <div className="border-b p-4">
            <h3 className="text-lg">Statistics</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {Object.entries(MUData.rank.lists).map(([list, count]) => (
                <li key={list} className="flex items-center justify-between">
                  <span className="capitalize">{list}:</span>
                  <span className="font-semibold">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
