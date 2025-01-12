"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SearchType from "@/components/common/SearchType"

const searchOptions = [
  { value: "show", label: "Show" },
  { value: "movie", label: "Movie" },
  { value: "anime", label: "Anime" },
  { value: "manga", label: "Manga" },
  { value: "game", label: "Game" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchType, setSearchType] = useState("show")
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    setQuery(searchParams.get("q") || "")
    setSearchType(searchParams.get("type") || "show")
  }, [searchParams])

  useEffect(() => {
    if (query.length > 0) {
      router.push(`/search?type=${searchType}&q=${query}`)
    } else if (query.length === 0) {
      router.push(`/search?type=${searchType}`)
    }
  }, [query, searchType, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <form className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-6 flex flex-wrap justify-center gap-4">
                {searchOptions.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center"
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="searchType"
                      value={option.value}
                      checked={searchType === option.value}
                      onChange={() => setSearchType(option.value)}
                    />
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        searchType === option.value
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } cursor-pointer transition-colors`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder={`Search for ${searchType}...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="grow rounded-md border border-gray-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <SearchType />
    </div>
  )
}
