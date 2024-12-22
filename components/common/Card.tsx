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
  mediaType?: string
  statusData?: any
  episodes?: any
  showStatus?: any
  platforms?: any
  status?: any
  profileCardStatus?: any
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
  statusData,
  episodes,
  platforms,
  status,
  profileCardStatus,
}: TVShowCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (mediaType === "movie") {
      router.push(`/movies/${id}`)
    } else if (mediaType === "tv") {
      router.push(`/tv/${id}`)
    } else if (mediaType === "anime") {
      router.push(`/anime/${id}`)
    } else if (mediaType === "manga") {
      router.push(`/manga/${id}`)
    } else if (mediaType === "game") {
      router.push(`/games/${id}`)
    } else {
      router.push(`${pathname}/${id}`)
    }
  }

  const watchStatus = useMemo(() => {
    if (profileCardStatus) return profileCardStatus
    else {
      return (
        statusData.find((item: { id: number | string }) => item.id === id)
          ?.status || null
      )
    }
  }, [statusData, id, profileCardStatus])

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

    switch (mediaType) {
      case "movie":
        await handleMovieStatusChange(
          session.user.id,
          Number(id),
          selectedStatus,
          details
        )
        break
      case "tv":
        await handleTvShowStatusChange(
          session.user.id,
          Number(id),
          selectedStatus,
          details
        )
        break
      case "anime":
        await handleAnimeStatusChange(
          session.user.id,
          Number(id),
          selectedStatus,
          { ...details, episodes }
        )
        break
      case "game":
        await handleGameStatusChange(
          session.user.id,
          Number(id),
          selectedStatus,
          { ...details, platforms }
        )
        break
      case "manga":
        await handleMangaStatusChange(
          session.user.id,
          id,
          selectedStatus,
          details
        )
        break
      default:
        console.error("Invalid media type")
    }
  }

  const handleRemoveData = () => {
    if (!session?.user?.id || !mediaType) return

    const docRef = doc(db, "users", session.user.id, mediaType, id.toString())

    deleteDoc(docRef)
      .then(() => {
        console.log(`Document with ID ${id} deleted successfully!`)
        ;(useDataStore.getState() as DataStore).removeFromWatchlist(
          id,
          mediaType
        )
      })
      .catch((error) => {
        console.error("Error removing data:", error)
      })
  }

  return (
    <div
      onClick={handleClick}
      className={`flex w-[150px] h-[220px] md:h-[245px] md:w-[360px] cursor-pointer items-center justify-start overflow-hidden rounded-md bg-white md:p-2 shadow-md duration-300 hover:scale-105`}
    >
      <div className="group flex h-full gap-2">
        <div
          className={`relative w-[150px] md:w-[140px] shrink-0 overflow-hidden rounded-lg`}
        >
          {!pathname.includes("profile") ? (
            <div className="opacity-0 group-hover:opacity-100">
              <WatchlistRibbon
                onStatusChange={handleStatusChange}
                currentStatus={watchStatus}
                statuses={status}
              />
            </div>
          ) : (
            <WatchlistRibbon
              onStatusChange={handleStatusChange}
              currentStatus={watchStatus}
              statuses={status}
              onRemoveData={handleRemoveData}
            />
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
        <div className="flex-1 hidden md:block">
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
  )
}
