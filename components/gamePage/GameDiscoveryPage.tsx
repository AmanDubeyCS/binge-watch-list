"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { X, Check, ChevronDown, ChevronRight } from "lucide-react"
import { ListOfGames } from "./ListOfGames"
import { useRouter, useSearchParams } from "next/navigation"
import {
  genreOptions,
  orderOptions,
  platformOptions,
  storesOption,
  years,
} from "./gamedata"

interface Option {
  id: number
  name: string
  slug: string
  games_count: number
}

interface Platforms {
  id: number
  name: string
  slug: string
  platforms: Option[]
}

interface DropdownProps {
  title: string
  placeholder: string
  options: any
  selectedItems: (string | number)[] | string
  onSelect: (_value: string | number) => void
}

const DropdownMultiSelect = ({
  title,
  placeholder,
  options,
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
        className="flex h-[38px] w-[170px] cursor-pointer items-center gap-2 rounded-md border bg-white px-4 py-3 capitalize shadow-sm"
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
        <>
          {options[0].platforms ? (
            <div className="absolute right-0 z-20 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {options.map((platform: Platforms) => (
                  <div key={platform.id} className="group relative">
                    <p
                      className="z-10 flex justify-between gap-1 text-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        if (platform.platforms.length === 1) {
                          onSelect(platform.platforms[0].id)
                        }
                      }}
                      role="menuitem"
                    >
                      {platform.name}{" "}
                      {platform.platforms.length === 1 && (
                        <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#3DB4F2] px-1 text-xs font-semibold text-white">
                          {platform.platforms[0].games_count} Games
                        </span>
                      )}
                      {platform.platforms.length > 1 && (
                        <ChevronRight className="size-5" />
                      )}
                      {Array.isArray(selectedItems) &&
                        selectedItems.find(
                          (item) => item === platform.platforms[0].id
                        ) && <Check className="size-4" />}
                    </p>
                    {platform.platforms.length > 1 && (
                      <div className="absolute left-full top-0 w-fit rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-opacity duration-150 ease-in-out group-hover:z-50 group-hover:opacity-100">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                        >
                          {platform.platforms.map((subPlatform: Option) => (
                            <p
                              key={subPlatform.id}
                              onClick={() => onSelect(subPlatform.id)}
                              className="flex gap-2 text-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              {subPlatform.name}{" "}
                              <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#3DB4F2] px-1 text-xs font-semibold text-white">
                                {subPlatform.games_count} Games
                              </span>
                              {Array.isArray(selectedItems) &&
                                selectedItems.find(
                                  (item) => item === subPlatform.id
                                ) && <Check className="size-4" />}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="hide-scrollbar absolute right-0 z-20 mt-2 max-h-[400px] w-fit min-w-[170px] origin-top-right overflow-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              {options.map((option: Option) => (
                <p
                  key={option.slug}
                  className="flex cursor-pointer items-center justify-between gap-1 text-nowrap px-2.5 py-3 text-sm font-semibold text-[#748899] hover:bg-gray-100"
                  onClick={() => onSelect(option.slug)}
                >
                  {option.name}{" "}
                  {option.games_count && (
                    <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#3DB4F2] px-1 text-xs font-semibold text-white">
                      {option.games_count} Games
                    </span>
                  )}
                  {selectedItems.includes(option.slug) && (
                    <Check className="size-4" />
                  )}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default function GameDiscoverPage() {
  const [search, setSearchTerm] = useState("")
  const [order, setSelectedOrder] = useState("")
  const [genres, setSelectedGenres] = useState<string[]>([])
  const [platforms, setSelectedPlatforms] = useState<number[]>([])
  const [stores, setSelectedStore] = useState<number[]>([])
  const [release, setReleaseDates] = useState("")
  const router = useRouter()

  const searchParams = useSearchParams()

  const currentParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  const updateStateFromObject = (params: Record<string, string>) => {
    Object.entries(params).forEach(([key, value]) => {
      switch (key) {
        case "search":
          setSearchTerm(value)
          break
        case "order":
          setSelectedOrder(value)
          break
        case "genres":
          setSelectedGenres(value.split(","))
          break
        case "platforms":
          setSelectedPlatforms(value.split(",").map(Number))
          break
        case "release":
          setReleaseDates(value)
          break
        case "page":
          break
        default:
          console.warn(`Unhandled key: ${key}`)
      }
    })
  }

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
      case "search":
        setSearchTerm("")
        break
      case "order":
        setSelectedOrder("")
        break
      case "genre":
        setSelectedGenres((prev) => prev.filter((g) => g !== value))
        break
      case "platform":
        setSelectedPlatforms((prev) => prev.filter((p) => p !== value))
        break
      case "releaseDate":
        setReleaseDates("")
        break
      case "store":
        setSelectedStore((prev) => prev.filter((g) => g !== value))
        break
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedOrder("")
    setSelectedGenres([])
    setSelectedPlatforms([])
    setSelectedStore([])
    setReleaseDates("")
    router.push(`/games/discover`)
  }

  const handleSearch = () => {
    const params = new URLSearchParams({
      ...(search && { search }),
      ...(order && { order }),
      ...(genres.length > 0 && { genres: genres.join(",") }),
      ...(stores.length > 0 && { stores: stores.join(",") }),
      ...(platforms.length > 0 && { platforms: platforms.join(",") }),
      ...(release && { release }),
    })

    router.push(`/games/discover?${params.toString()}`)
  }

  const hasActiveFilters =
    search ||
    order ||
    stores.length > 0 ||
    genres.length > 0 ||
    platforms.length > 0 ||
    release.length > 0

  useEffect(() => {
    updateStateFromObject(currentParams)
  }, [searchParams, currentParams])

  // useEffect(() => {
  //   handleSearch();
  // }, [search, order, genres, platforms, release, stores]);
  return (
    <div className="mx-auto max-w-[1600px]">
      <div>
        <div className="p-6">
          <div className="flex justify-center gap-4 rounded-md bg-[rgb(237,241,245)] p-5">
            <div className="flex-1">
              <p className="py-2.5 text-[15px] font-semibold text-gray-600">
                Search
              </p>
              <input
                placeholder="God of war..."
                value={search}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-[40px] w-full rounded-md border p-2"
              />
            </div>

            <DropdownMultiSelect
              title="Order by"
              placeholder="Ex: Relevence"
              options={orderOptions}
              selectedItems={order}
              onSelect={(value: string | number) =>
                setSelectedOrder(value as string)
              }
            />

            <DropdownMultiSelect
              title="Genres"
              placeholder="Ex: Action,Indie"
              options={genreOptions}
              selectedItems={genres}
              onSelect={(value: string | number) =>
                handleMultiSelect(value as string, genres, setSelectedGenres)
              }
            />

            <DropdownMultiSelect
              title="Year"
              placeholder="Ex: 2022"
              options={years}
              selectedItems={release}
              onSelect={(value: string | number) =>
                setReleaseDates(value as string)
              }
            />

            <DropdownMultiSelect
              title="Platform"
              placeholder="Ex: PC,XBox"
              options={platformOptions}
              selectedItems={platforms}
              onSelect={(value: string | number) =>
                handleMultiSelect(
                  value as number,
                  platforms,
                  setSelectedPlatforms
                )
              }
            />

            <DropdownMultiSelect
              title="Stores"
              placeholder="Ex: Steam,GOG"
              options={storesOption}
              selectedItems={stores}
              onSelect={(value: string | number) =>
                handleMultiSelect(
                  storesOption.find((val) => val.slug === value)?.id as number,
                  stores,
                  setSelectedStore
                )
              }
            />

            <button
              onClick={handleSearch}
              className="mt-[42px] flex h-[40px] w-[200px] items-center justify-center rounded-md bg-blue-600 font-bold text-white"
            >
              Search
            </button>
          </div>

          {hasActiveFilters && (
            <div className="bg-secondary mt-4 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                {search && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {search}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("search", "")}
                    />
                  </div>
                )}
                {order && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {orderOptions.find((o) => o.slug === order)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("order", order)}
                    />
                  </div>
                )}
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {genreOptions.find((g) => g.slug === genre)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("genre", genre)}
                    />
                  </div>
                ))}
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {
                      platformOptions
                        .flatMap((p) => p.platforms)
                        .find((subP) => subP.id === platform)?.name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("platform", platform)}
                    />
                  </div>
                ))}
                {release && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {years.find((c) => c.slug === release)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("releaseDate", release)}
                    />
                  </div>
                )}

                {stores.map((store) => (
                  <div
                    key={store}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {storesOption.find((g) => g.id === store)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("store", store)}
                    />
                  </div>
                ))}

                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 rounded-md bg-gray-400 px-2 py-1 text-xs font-semibold text-white"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ListOfGames />
    </div>
  )
}
