"use client"
import React, { useMemo } from "react"
import { Star } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { WatchlistRibbon } from "@/components/WatchlistRibbon"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { useSession } from "next-auth/react"
import { formatNumber } from "@/util/formatNumber"
import { ImageLoader } from "@/util/ImageLoader"
import { Icon } from "../icons"
import {
  handleAnimeStatusChange,
  handleGameStatusChange,
  handleMangaStatusChange,
  handleMovieStatusChange,
  handleTvShowStatusChange,
} from "@/util/contentStatusChange"
import { DataStore, useDataStore } from "@/store/allDataStore"
import { checkdata } from "@/util/fetchFromMangaUpdates"

const platformLogos = {
  pc: <Icon.windowsIcon className="size-4" />,
  playstation: <Icon.playstationIcon className="size-4" />,
  xbox: <Icon.xboxIcon className="size-4" />,
  ios: <Icon.appleIcon className="size-4" />,
  android: <Icon.androidIcon className="size-4" />,
  mac: <Icon.appleIcon className="size-4" />,
  linux: <Icon.linuxIcon className="size-4" />,
  nintendo: <Icon.nintendoIcon className="size-4" />,
  atari: <Icon.atariIcon className="size-4" />,
  "commodore-amiga": <Icon.commodoreIcon className="size-4" />,
  sega: <Icon.segaIcon className="size-4" />,
  "3do": <Icon.threeDoIcon className="size-4" />,
  "neo-geo": <Icon.nintendoIcon className="size-4" />,
  web: <Icon.webIcon className="size-4" />,
}

interface TVShowCardProps {
  id: number | string
  name: string
  coverImage: string
  tag: string
  voteAverage: number
  voteCount: number
  genre: any
  numbers: number
  mediaType: string
  episodes?: any
  showStatus?: any
  platforms?: any
  status?: any
  profileCardStatus?: any
  userId?: boolean
}

export default function Card({
  id,
  name,
  coverImage,
  tag,
  voteAverage,
  voteCount,
  genre,
  numbers,
  mediaType,
  episodes,
  platforms,
  status,
  profileCardStatus,
  userId,
}: TVShowCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { data, upsertItem, removeFromWatchlist } = useDataStore() as DataStore

  // Extract the user ID from the URL
  const handleClick = () => {
    const routes: Record<string, string> = {
      movie: `/movies/${id}`,
      tv: `/tv/${id}`,
      anime: `/anime/${id}`,
      manga: `/manga/${id}`,
      game: `/games/${id}`,
    }

    router.push(routes[mediaType] || `${pathname}/${id}`, { scroll: false })
  }

  const watchStatus = useMemo(() => {
    if (profileCardStatus) return profileCardStatus
    const status = data?.find((item: { id: number | string }) => item.id === id)
    // console.log(status)
    return mediaType === "manga"
      ? status?.readStatus
      : mediaType === "game"
        ? status?.gameStatus
        : status?.watchStatus || null
  }, [data])

  // console.log(data)
  const handleStatusChange = async (selectedStatus: string) => {
    if (!session?.user?.id || !mediaType) return

    const details = {
      name,
      coverImage,
      tag,
      voteAverage,
      voteCount,
      numbers,
      genre,
    }

    if (mediaType === "manga") {
      upsertItem({ id, readStatus: selectedStatus, ...details })
    } else if (mediaType === "game") {
      upsertItem({ id, gameStatus: selectedStatus, ...details })
    } else {
      upsertItem({ id, watchStatus: selectedStatus, ...details })
    }

    const handlers: Record<string, Function> = {
      movie: handleMovieStatusChange,
      tv: handleTvShowStatusChange,
      anime: handleAnimeStatusChange,
      game: handleGameStatusChange,
      manga: async () => {
        const muId = await checkdata(String(id))
        const muID = typeof muId === "number" ? muId.toString() : undefined
        upsertItem({ ...details, id, selectedStatus, muID })
        return handleMangaStatusChange(
          session.user.id,
          id,
          selectedStatus,
          details,
          undefined,
          muID
        )
      },
    }

    await handlers[mediaType]?.(
      session.user.id,
      mediaType === "manga" ? id : Number(id),
      selectedStatus,
      mediaType === "anime"
        ? { ...details, episodes }
        : mediaType === "game"
          ? { ...details, platforms }
          : details
    )
  }
  const handleRemoveData = () => {
    if (!session?.user?.id || !mediaType) return

    const docRef = doc(db, "users", session.user.id, mediaType, id.toString())
    deleteDoc(docRef)
      .then(() => {
        console.log(`Document with ID ${id} deleted successfully!`)
        removeFromWatchlist(id, mediaType)
      })
      .catch((error) => {
        console.error("Error removing data:", error)
      })
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`hidden h-[245px] w-[360px] shrink-0 cursor-pointer items-center justify-start overflow-hidden rounded-md bg-white shadow-md duration-300 hover:scale-105 md:p-2 lg:flex`}
      >
        <div className="group flex h-full gap-2">
          <div
            className={`relative w-[140px] shrink-0 overflow-hidden rounded-lg`}
          >
            {pathname.includes("profile") ? (
              <div>
                {!userId ? (
                  <div
                    className="group absolute left-0 top-0 h-[34px] w-6 cursor-pointer"
                    role="button"
                    aria-label="Watchlist options"
                  >
                    <svg
                      width="24"
                      height="34"
                      viewBox="0 0 24 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 top-0"
                    >
                      <path
                        d="M24 0H0V32L12.2437 26.2926L24 31.7728V0Z"
                        className={`${
                          watchStatus
                            ? "fill-blue-600"
                            : "fill-zinc-700 group-hover:fill-zinc-600"
                        } transition-colors duration-200`}
                      />
                      <path
                        d="M24 31.7728V33.7728L12.2437 28.2926L0 34V32L12.2437 26.2926L24 31.7728Z"
                        className="fill-black/20"
                      />
                    </svg>
                    <div className="absolute right-1 top-1.5 text-zinc-200 transition-colors duration-200 group-hover:text-white">
                      {watchStatus ? (
                        status[watchStatus]?.icon
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ) : (
                  <WatchlistRibbon
                    onStatusChange={handleStatusChange}
                    currentStatus={watchStatus}
                    statuses={status}
                    onRemoveData={handleRemoveData}
                  />
                )}
              </div>
            ) : (
              <div className="opacity-0 group-hover:opacity-100">
                <WatchlistRibbon
                  onStatusChange={handleStatusChange}
                  currentStatus={watchStatus}
                  statuses={status}
                />
              </div>
            )}
            <ImageLoader
              src={coverImage}
              alt={name}
              fallback={
                <div
                  className={`flex h-auto w-[140px] items-center justify-center bg-white text-center text-black`}
                >
                  <p>Image not available</p>
                </div>
              }
            />
          </div>
          <div className="flex-1">
            {tag && mediaType !== "game" && (
              <div className="mb-2 w-fit rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
                {tag}
              </div>
            )}
            {mediaType === "game" && (
              <div className="mb-2 flex w-fit gap-2 rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
                {platforms?.map(
                  (item: { platform: { id: number; slug: string } }) => (
                    <div key={item.platform.id} className="platform-icon">
                      {
                        platformLogos[
                          item.platform.slug as keyof typeof platformLogos
                        ]
                      }
                    </div>
                  )
                )}
              </div>
            )}
            <h3 className="mb-2 line-clamp-2 text-wrap text-base font-semibold text-gray-800">
              {name}
            </h3>
            <div className="mb-2 flex items-center">
              <Star className="mr-1 size-5 fill-current text-yellow-500" />
              <span className="mr-2 text-lg font-semibold text-gray-800">
                {voteAverage > 0 ? voteAverage.toFixed(1) : "N/A"}
              </span>
              {mediaType !== "manga" && (
                <span className="text-sm text-gray-600">
                  ({voteCount > 0 ? formatNumber(voteCount) : "N/A"} votes)
                </span>
              )}
            </div>
            <div className="mb-3 flex items-center">
              <span className="mr-2 text-sm font-medium text-gray-700">
                {mediaType === "manga"
                  ? "Follows:"
                  : mediaType === "anime"
                    ? "Ranking:"
                    : "Popularity:"}
              </span>
              <span className="text-sm font-semibold text-gray-800">
                #{Math.round(numbers) || "N/A"}
              </span>
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {genre.slice(0, 3).map((genreId: any) => (
                <div
                  key={genreId}
                  className={cn(
                    "rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500"
                  )}
                >
                  {genreId || "Unknown"}
                </div>
              ))}
              {genre.length > 3 && (
                <p className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500">
                  +{genre.length - 3}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={handleClick}
        className={cn(
          "mx-auto block w-[165px] max-w-sm shrink-0 overflow-hidden rounded-xl lg:hidden",
          (pathname.includes("/discover") ||
            pathname.includes("/search") ||
            pathname.includes("/profile") ||
            pathname.includes("/recommendations")) &&
            "w-full"
        )}
      >
        <div className={`relative shrink-0 overflow-hidden`}>
          <WatchlistRibbon
            onStatusChange={handleStatusChange}
            currentStatus={watchStatus}
            statuses={status}
          />

          <ImageLoader
            src={coverImage}
            alt={name}
            className={cn(
              "h-[240px] w-[165px] rounded-xl object-cover",
              pathname.includes("/profile") && "rounded-b-none",
              (pathname.includes("/discover") ||
                pathname.includes("/search") ||
                pathname.includes("/profile") ||
                pathname.includes("/recommendations")) &&
                "aspect-[2/3] size-full"
            )}
            fallback={
              <div
                className={`flex h-auto w-[140px] items-center justify-center bg-white text-center text-black`}
              >
                <p>Image not available</p>
              </div>
            }
          />
        </div>
        <div className="px-2 py-4">
          <h2 className="mb-2 line-clamp-2 h-[48px] text-wrap text-base font-semibold">
            {name}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {mediaType === "movie" ||
              mediaType === "tv" ||
              mediaType === "game"
                ? tag.slice(0, 4)
                : tag}
            </span>
            <div className="flex items-center">
              <Star className="mr-1 size-4 text-yellow-400" />
              <span className="text-sm font-semibold">
                {voteAverage > 0 ? voteAverage.toFixed(1) : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
