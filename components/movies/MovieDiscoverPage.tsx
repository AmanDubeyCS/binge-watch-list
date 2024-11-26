"use client"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ListOfMovies } from "./ListOfMovies"

const sortByOptions = [
  {
    id: "popularity.asc",
    name: "Popularity Ascending",
  },
  {
    id: "popularity.desc",
    name: "Popularity Descending",
  },
  {
    id: "vote_average.asc",
    name: "Rating Ascending",
  },
  {
    id: "vote_average.desc",
    name: "Rating Descending",
  },
  {
    id: "primary_release_date.asc",
    name: "Release Date Ascending",
  },
  {
    id: "primary_release_date.desc",
    name: "Release Date Descending",
  },
  {
    id: "title.asc",
    name: "Title (A-Z)",
  },
  {
    id: "title.desc",
    name: "Title (Z-A)",
  },
]

const avalabilities = [
  {
    id: "Flatrate",
    name: "Stream",
  },
  {
    id: "free",
    name: "Free",
  },
  {
    id: "ads",
    name: "Ads",
  },
  {
    id: "rent",
    name: "Rent",
  },
  {
    id: "buy",
    name: "Buy",
  },
]

interface Items {
  id?: number | string
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
                  onClick={() => onSelect(item.id)}
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

interface DisplayPriorities {
  [countryCode: string]: number // Country codes as keys with numeric priorities
}

interface Provider {
  display_priorities: DisplayPriorities
  display_priority: number
  logo_path: string
  provider_name: string
  provider_id: number
}

interface genres {
  id: number
  name: string
}

interface Languages {
  english_name: string
  iso_639_1: string
  name: string
}

interface Certification {
  certification: string
  meaning: string
  order: number
}

interface CountryCertifications {
  [countryCode: string]: Certification[]
}

export function MovieDiscoverPage({
  movieProviders,
  movieGenres,
  movielanguages,
  certifications,
}: {
  movieProviders: Provider[]
  movieGenres: genres[]
  movielanguages: Languages[]
  certifications: CountryCertifications
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [genres, setGenres] = useState<number[]>([])
  const [providers, setProviders] = useState<number[]>([])
  const [language, setLanguage] = useState("")
  const [releaseFrom, setReleaseFrom] = useState("")
  const [releaseTo, setReleaseTo] = useState("")
  const [certification, setCertification] = useState<string[]>([])
  const [availabilities, setAvaliabilities] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const type = pathname.includes("tv") ? "tv" : "movies"

  const currentParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  const updateStateFromObject = (params: Record<string, string>) => {
    Object.entries(params).forEach(([key, value]) => {
      switch (key) {
        case "sortBy":
          setSortBy(value)
          break
        case "language":
          setLanguage(value)
          break
        case "genres":
          setGenres(value.split(",").map(Number))
          break
        case "providers":
          setProviders(value.split(",").map(Number))
          break
        case "availabilities":
          setAvaliabilities(value.split("|"))
          break
        case "releaseFrom":
          setReleaseFrom(value)
          break
        case "releaseTo":
          setReleaseTo(value)
          break
        case "certification":
          setCertification(value.split(","))
          break
        default:
          console.warn(`Unhandled key: ${key}`)
      }
    })
  }

  useEffect(() => {
    updateStateFromObject(currentParams)
  }, [searchParams, currentParams])

  const sortedProviders = [...movieProviders].sort(
    (a, b) => a.display_priority - b.display_priority
  )

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
      case "language":
        setLanguage("")
        break
      case "genres":
        setGenres((prev) => prev.filter((g) => g !== value))
        break
      case "providers":
        setProviders((prev) => prev.filter((p) => p !== value))
        break
      case "availabilities":
        setAvaliabilities((prev) => prev.filter((p) => p !== value))
        break
      case "release":
        setReleaseFrom("")
        setReleaseTo("")
        break
      case "certification":
        setCertification((prev) => prev.filter((g) => g !== value))
        break
    }
  }

  const clearAllFilters = () => {
    setSortBy("")
    setGenres([])
    setProviders([])
    setLanguage("")
    setCertification([])
    setAvaliabilities([])
    router.push(`/${type}/discover`)
  }

  const handleSearch = () => {
    const params = new URLSearchParams({
      ...(sortBy && { sortBy }),
      ...(language && { language }),
      ...(releaseFrom && { releaseFrom }),
      ...(releaseTo && { releaseTo }),
      ...(genres.length > 0 && { genres: genres.join(",") }),
      ...(providers.length > 0 && { providers: providers.join(",") }),
      ...(availabilities.length > 0 && {
        availabilities: availabilities.join("|"),
      }),
      ...(certification.length > 0 && {
        certification: certification.join(","),
      }),
    })

    router.push(`/${type}/discover?${params.toString()}`)
  }

  const hasActiveFilters =
    sortBy ||
    language ||
    certification.length > 0 ||
    genres.length > 0 ||
    providers.length > 0 ||
    releaseFrom ||
    releaseTo ||
    availabilities.length > 0
  return (
    <div className="mx-auto max-w-[1600px]">
      <div>
        <div className="p-6">
          <div className="flex justify-center gap-4 rounded-md bg-[rgb(237,241,245)] p-5">
            <DropdownMultiSelect
              title="Where To Watch"
              items={sortedProviders}
              selectedItems={providers.map(
                (provider) =>
                  sortedProviders.find((p) => p.provider_id === provider)
                    ?.provider_name
              )}
              renderItem={(provider: Provider) => (
                <button
                  key={provider.provider_id}
                  onClick={() =>
                    handleMultiSelect(
                      provider.provider_id,
                      providers,
                      setProviders
                    )
                  }
                  className="flex w-full items-center rounded-md border p-1 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="mr-2 size-12 rounded-md"
                  />
                  {provider.provider_name}
                </button>
              )}
            />

            <DropdownMultiSelect
              title="Genres"
              items={movieGenres}
              selectedItems={genres.map(
                (genre) => movieGenres.find((g) => g.id === genre)?.name
              )}
              onSelect={(item: number) => {
                handleMultiSelect(item, genres, setGenres)
              }}
            />

            <DropdownMultiSelect
              title="Sort By"
              items={sortByOptions}
              selectedItems={sortByOptions.find((o) => o.id === sortBy)?.name}
              onSelect={(item: string) => setSortBy(item)}
            />

            <DropdownMultiSelect
              title="Original Language"
              items={movielanguages}
              selectedItems={
                movielanguages.find((o) => o.iso_639_1 === language)
                  ?.english_name
              }
              renderItem={(language: Languages) => (
                <button
                  key={language.iso_639_1}
                  onClick={() => setLanguage(language.iso_639_1)}
                  className="flex w-full justify-between px-2.5 py-3 text-sm font-semibold text-[#748899] hover:bg-gray-100"
                >
                  {language.english_name}{" "}
                  {language.name && <span>({language.name})</span>}
                </button>
              )}
            />

            <DropdownMultiSelect
              title="Certification"
              items={certifications["IN"]}
              selectedItems={certification}
              renderItem={(certifications: Certification) => (
                <button
                  key={certifications.certification}
                  onClick={() =>
                    handleMultiSelect(
                      certifications.certification,
                      certification,
                      setCertification
                    )
                  }
                  className="flex w-full justify-between px-2.5 py-3 text-sm font-semibold text-[#748899] hover:bg-gray-100"
                >
                  {certifications.certification}{" "}
                </button>
              )}
            />

            <div className="relative">
              <p className="py-2.5 text-[15px] font-semibold text-gray-600">
                Release
              </p>
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-[38px] w-[170px] cursor-pointer items-center gap-2 rounded-md border bg-white px-4 py-3 capitalize shadow-sm"
              >
                <p className="text-[13px] text-gray-500">Any</p>

                <ChevronDown className="ml-auto h-4 w-5 text-gray-800" />
              </div>
              {isOpen && (
                <div className="hide-scrollbar absolute right-0 z-20 mt-2 max-h-[400px] w-fit min-w-[170px] origin-top-right gap-1.5 overflow-scroll rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div>
                    <p className="flex w-full cursor-pointer items-center justify-between gap-1 text-nowrap px-2.5 py-3 text-sm font-semibold text-[#748899] hover:bg-gray-100">
                      From
                    </p>{" "}
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => setReleaseFrom(e.target.value)}
                    />
                    <p className="flex w-full cursor-pointer items-center justify-between gap-1 text-nowrap px-2.5 py-3 text-sm font-semibold text-[#748899] hover:bg-gray-100">
                      to
                    </p>{" "}
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => setReleaseTo(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <DropdownMultiSelect
              title="Availabilities"
              items={avalabilities}
              selectedItems={availabilities}
              onSelect={(item: string) =>
                handleMultiSelect(item, availabilities, setAvaliabilities)
              }
            />

            {/* <div className="relative">
              <p className="py-2.5 text-[15px] font-semibold text-gray-600">
                keywords
              </p>
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-[38px] w-[170px] cursor-pointer items-center gap-2 rounded-md border bg-white px-4 py-3 capitalize shadow-sm"
              >
                <p className="text-[13px] text-gray-500">Any</p>

                <ChevronDown className="ml-auto h-4 w-5 text-gray-800" />
              </div>
              {isOpen && (
                <div className="hide-scrollbar absolute right-0 z-20 mt-2 max-h-[400px] w-fit min-w-[170px] origin-top-right gap-1.5 overflow-scroll rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <input type="text" name="" id="" />
                </div>
              )}
            </div> */}

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
                {sortBy && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {sortByOptions.find((o) => o.id === sortBy)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("sortBy", sortBy)}
                    />
                  </div>
                )}
                {language && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {
                      movielanguages.find((o) => o.iso_639_1 === language)
                        ?.english_name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("language", language)}
                    />
                  </div>
                )}
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {movieGenres.find((g) => g.id === genre)?.name}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("genres", genre)}
                    />
                  </div>
                ))}
                {providers.map((provider) => (
                  <div
                    key={provider}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {
                      sortedProviders.find((p) => p.provider_id === provider)
                        ?.provider_name
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("providers", provider)}
                    />
                  </div>
                ))}
                {certification.map((certification) => (
                  <div
                    key={certification}
                    className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white"
                  >
                    {
                      certifications["IN"].find(
                        (g) => g.certification === certification
                      )?.certification
                    }
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() =>
                        removeFilter("certification", certification)
                      }
                    />
                  </div>
                ))}
                {releaseFrom && releaseTo && (
                  <div className="flex items-center gap-1 rounded-md bg-[#3DB4F2] px-2 py-1 text-xs font-semibold text-white">
                    {`${releaseFrom} - ${releaseTo}`}
                    <X
                      className="ml-1 size-3 cursor-pointer"
                      onClick={() => removeFilter("release", releaseFrom)}
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
        </div>
      </div>
      <ListOfMovies />
    </div>
  )
}
