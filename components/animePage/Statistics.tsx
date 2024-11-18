import { useAnimeStatistics } from "@/queries/jikan/animefetch"
import { UseQueryResult } from "@tanstack/react-query"
import React from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface AnimeStats {
  watching: number
  completed: number
  on_hold: number
  dropped: number
  plan_to_watch: number
  total: number
  scores: Array<{
    score: number
    votes: number
    percentage: number
  }>
}

export default function Component({ animeID }: { animeID: number }) {
  const { data }: UseQueryResult<AnimeStats, Error> =
    useAnimeStatistics(animeID)

  if (!data) {
    return <div>no data</div>
  }
  return (
    <div className="container mx-auto space-y-8 p-4">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Anime Statistics
      </h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Watch Status</h3>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Count
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.entries(data).map(([key, value]) => {
                if (key !== "scores" && key !== "total") {
                  return (
                    <tr key={key}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium capitalize text-gray-900">
                        {key.replace("_", " ")}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        {value.toLocaleString()}
                      </td>
                    </tr>
                  )
                }
                return null
              })}
              <tr className="bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  Total
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {data.total.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">
          Score Distribution
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={data.scores}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="score" type="category" />
            {/* <Tooltip content={<CustomTooltip />} /> */}
            <Bar dataKey="votes" fill="#8884d8" />
            <Bar dataKey="percentage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
