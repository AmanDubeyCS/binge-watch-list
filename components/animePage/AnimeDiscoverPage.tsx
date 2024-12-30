"use client"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, CircleX, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { ListOfAnimes } from "./ListOfAnimes"
import {
  certificationOptions,
  format,
  orderBy,
  statusOptions,
  years,
} from "./AnimeData"
interface Items {
  mal_id?: number | string
  name?: string
  provider_name?: string
  english_name?: string
  provider_id?: number
  certification?: string
}

interface DropdownProps {
  title: string
  placeholder?: string
  items: Items[]
  renderItem?: any
  selectedItems: any
  onSelect?: any
}

const DropdownMultiSelect = ({
  title,
  placeholder,
  items,
  renderItem,
  selectedItems,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <p className="py-2.5 text-[15px] font-semibold text-gray-600">{title}</p>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[38px] w-[160px] cursor-pointer items-center gap-2 rounded-full border border-blue-300 bg-white px-4 py-3 capitalize shadow-sm lg:w-[170px]"
      >
        {Array.isArray(selectedItems) ? (
          selectedItems.length > 0 ? (
            <>
              <p className="line-clamp-1 text-nowrap rounded-md bg-[rgb(221,230,238)] p-2 py-1 text-xs text-gray-600">
                {selectedItems.slice(0, 1).join(", ")}
              </p>
              {selectedItems.length > 1 && (
                <p className="line-clamp-1 text-nowrap rounded-md bg-[rgb(221,230,238)] p-2 py-1 text-xs text-gray-600">
                  +{selectedItems.length - 1}
                </p>
              )}
            </>
          ) : (
            <p className="text-[13px] text-gray-500">{placeholder}</p>
          )
        ) : selectedItems ? (
          <p className="line-clamp-1 text-nowrap rounded-md bg-[rgb(221,230,238)] p-2 py-1 text-xs text-gray-600">
            {selectedItems}
          </p>
        ) : (
          <p className="text-[13px] text-gray-500">{placeholder}</p>
        )}
        <ChevronDown className="ml-auto h-4 w-5 text-gray-800" />
      </div>
      {isOpen && (
        <div className={``}>
          <div
            className={cn(
              "hide-scrollbar absolute right-0 z-20 mt-2 max-h-[400px] min-w-[170px] origin-top-right overflow-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5",
              title === "Provider" && "flex w-[250px] flex-wrap gap-1.5 p-1"
            )}
          >
            {items.map((item, index) =>
              renderItem ? (
                renderItem(item, index)
              ) : (
                <button
                  key={index}
                  onClick={() => onSelect(item.mal_id)}
                  className="flex w-full items-center text-nowrap px-2.5 py-3 text-left text-sm font-semibold text-[#748899] hover:bg-gray-100"
                >
                  {item.name || item.provider_name || item.english_name}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function AnimeDiscoverPage({ animeGenres }: any) {
  const [sortBy, setSortBy] = useState("")
  const [genres, setGenres] = useState<number[]>([])
  const [demographics, setDemographics] = useState<number[]>([])
  const [producers, setProducers] = useState<number[]>([])
  const [certification, setCertification] = useState("")
  const [status, setStatus] = useState("")
  const [releaseYear, setReleaseYear] = useState("")
  const [type, setType] = useState("")
  const [showFilter, setShowFilter] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const currentParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  const genresList = animeGenres.slice(0, 18)
  const demographicsList = animeGenres.slice(-5)
  const updateStateFromObject = (params: Record<string, string>) => {
    Object.entries(params).forEach(([key, value]) => {
      switch (key) {
        case "order_by":
          setSortBy(value)
          break
        case "genres":
          setGenres(value.split(",").map(Number))
          break
        case "producers":
          setProducers(value.split(",").map(Number))
          break
        case "rating":
          setCertification(value)
          break
        case "type":
          setType(value)
          break
        case "status":
          setStatus(value)
          break
        case "start_date":
          setReleaseYear(value)
          break
        default:
          console.warn(`Unhandled key: ${key}`)
      }
    })
  }

  useEffect(() => {
    updateStateFromObject(currentParams)
  }, [searchParams, currentParams])

  const handleMultiSelect = <T extends string | number>(
    value: T,
    currentSelected: T[],
    setSelected: (_selected: T[]) => void
  ) => {
    setSelected(
      currentSelected.includes(value)
        ? currentSelected.filter((item) => item !== value)
        : [...currentSelected, value]
    )
  }

  const removeFilter = (type: string, value: string | number) => {
    switch (type) {
      case "sortBy":
        setSortBy("")
        break
      case "status":
        setStatus("")
        break
      case "genres":
        setGenres((prev) => prev.filter((g) => g !== value))
        break
      case "producers":
        setGenres((prev) => prev.filter((g) => g !== value))
        break
      case "demographics":
        setDemographics((prev) => prev.filter((g) => g !== value))
        break
      case "type":
        setType("")
        break
      case "certification":
        setCertification("")
        break
      case "releaseYear":
        setReleaseYear("")
        break
    }
  }

  const clearAllFilters = () => {
    setSortBy("")
    setGenres([])
    setDemographics([])
    setType("")
    setCertification("")
    setStatus("")
    setReleaseYear("")
    setProducers([])
    router.push(`/anime/discover`)
  }

  const handleSearch = () => {
    const params = new URLSearchParams({
      ...(sortBy && { order_by: sortBy }),
      ...(type && { type }),
      ...(status && { status }),
      ...(releaseYear && { start_date: releaseYear }),
      ...(certification && { rating: certification }),
      ...(genres.length > 0 && { genres: genres.join(",") }),
      ...(producers.length > 0 && { producers: producers.join(",") }),
    })

    router.push(`/anime/discover?${params.toString()}`)
  }

  const hasActiveFilters =
    sortBy ||
    status ||
    certification ||
    genres.length > 0 ||
    type ||
    producers.length > 0 ||
    demographics.length > 0 ||
    releaseYear

  return (
    <div className="mx-auto max-w-[1600px]">
      <div
        className={cn(
          "w-fit bg-gray-300 p-4 lg:hidden",
          !showFilter && "hidden"
        )}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Show filter
      </div>
      <div>
        <div className={cn("p-2 lg:p-6", showFilter && "hidden lg:block")}>
          <div className="flex justify-between px-8 py-4 lg:hidden">
            <p>Filters</p>
            <CircleX onClick={() => setShowFilter((prev) => !prev)} />
          </div>
          <div className="flex flex-wrap justify-center gap-4 rounded-md">
            <DropdownMultiSelect
              title="Genres"
              items={genresList}
              placeholder="Any"
              selectedItems={genres.map(
                (genre) =>
                  genresList.find((g: { mal_id: number }) => g.mal_id === genre)
                    ?.name
              )}
              onSelect={(item: number) => {
                handleMultiSelect(item, genres, setGenres)
              }}
            />

            <DropdownMultiSelect
              title="demographics"
              items={demographicsList}
              placeholder="Any"
              selectedItems={demographics.map(
                (genre) =>
                  demographicsList.find(
                    (g: { mal_id: number }) => g.mal_id === genre
                  )?.name
              )}
              onSelect={(item: number) => {
                handleMultiSelect(item, demographics, setDemographics)
              }}
            />

            <DropdownMultiSelect
              title="Year"
              items={years}
              placeholder="Any"
              selectedItems={years.find((o) => o.mal_id === releaseYear)?.name}
              onSelect={(item: string) => setReleaseYear(item)}
            />

            <DropdownMultiSelect
              title="Sort By"
              items={orderBy}
              placeholder="Any"
              selectedItems={orderBy.find((o) => o.mal_id === sortBy)?.name}
              onSelect={(item: string) => setSortBy(item)}
            />
            <DropdownMultiSelect
              title="Format"
              items={format}
              placeholder="Any"
              selectedItems={format.find((o) => o.mal_id === type)?.name}
              onSelect={(item: string) => setType(item)}
            />

            <DropdownMultiSelect
              title="Status"
              items={statusOptions}
              placeholder="Any"
              selectedItems={
                statusOptions.find((o) => o.mal_id === status)?.name
              }
              onSelect={(item: string) => setStatus(item)}
            />

            <DropdownMultiSelect
              title="Certification"
              items={certificationOptions}
              placeholder="Any"
              selectedItems={
                certificationOptions.find((o) => o.mal_id === certification)
                  ?.name
              }
              onSelect={(item: string) => setCertification(item)}
            />
          </div>

          {hasActiveFilters && (
            <div className="bg-secondary mt-4 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                {sortBy && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {orderBy.find((o) => o.mal_id === sortBy)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("sortBy", sortBy)}
                    />
                  </div>
                )}

                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {
                      animeGenres.find(
                        (g: { mal_id: number }) => g.mal_id === genre
                      )?.name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("genres", genre)}
                    />
                  </div>
                ))}

                {producers.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {
                      animeGenres.find(
                        (g: { mal_id: number }) => g.mal_id === genre
                      )?.name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("producers", genre)}
                    />
                  </div>
                ))}

                {demographics.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {
                      animeGenres.find(
                        (g: { mal_id: number }) => g.mal_id === genre
                      )?.name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("demographics", genre)}
                    />
                  </div>
                ))}
                {type && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {format.find((o) => o.mal_id === type)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("type", type)}
                    />
                  </div>
                )}
                {releaseYear && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {years.find((o) => o.mal_id === releaseYear)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("releaseYear", releaseYear)}
                    />
                  </div>
                )}

                {status && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {statusOptions.find((o) => o.mal_id === status)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("status", status)}
                    />
                  </div>
                )}

                {certification && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {
                      certificationOptions.find(
                        (o) => o.mal_id === certification
                      )?.name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() =>
                        removeFilter("certification", certification)
                      }
                    />
                  </div>
                )}

                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 rounded-md bg-gray-400 px-2 py-1 text-xs font-semibold text-white"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
          {hasActiveFilters && (
            <button
              onClick={handleSearch}
              className="mt-4 flex h-[40px] w-full items-center justify-center rounded-md bg-blue-600 font-bold text-white"
            >
              Search
            </button>
          )}
        </div>
      </div>
      <ListOfAnimes />
    </div>
  )
}
