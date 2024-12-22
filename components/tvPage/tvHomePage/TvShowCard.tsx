"use client"
import React, { useMemo } from "react"
import { CircleCheckBig, Clock, Eye, Star, ThumbsDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { WatchlistRibbon } from "@/components/WatchlistRibbon"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { useSession } from "next-auth/react"
import { formatNumber } from "@/util/formatNumber"
import { ImageLoader } from "@/util/ImageLoader"

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
  statusData: any
  episodes?: any
  showStatus?: any
}

export default function TVShowCard({
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
  showStatus,
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
    } else {
      router.push(`${pathname}/${id}`)
    }
  }

  const watchStatus = useMemo(() => {
    return (
      statusData.find((item: { id: number | string }) => item.id === id)
        ?.status || null
    )
  }, [statusData, id])

  const handleStatusChange = async (selectedStatus: string) => {
    if (!session?.user?.id || !mediaType) return
    // setWatchStatus(selectedStatus)
    try {
      const docRef = doc(db, "users", session.user.id, mediaType, id.toString())
      await setDoc(
        docRef,
        {
          id: id,
          name,
          coverImage,
          tag,
          voteAverage,
          voteCount,
          numbers,
          genre,
          progress: mediaType === "tv" ? "S01-E01" : 0,
          remarks: "",
          status: selectedStatus,
          episodeCount: episodes || 0,
          showStatus: showStatus || "",
        },
        { merge: true }
      )
      console.log("Status and details updated successfully!")
    } catch (error) {
      console.error("Error updating status and details:", error)
    }
  }

  const tvStatuses = {
    watching: { label: "Watching", icon: <Eye size={14} /> },
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  const movieStatuses = {
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    completed: { label: "I've seen this", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  const bookStatuses = {
    reading: { label: "Reading", icon: <Eye size={14} /> },
    planning: { label: "Plan to Read", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  return (
    <div
      onClick={handleClick}
      className={`shrink-0 flex h-[245px] w-[360px] cursor-pointer items-center justify-start overflow-hidden rounded-md bg-white p-2 shadow-md duration-300 hover:scale-105`}
    >
      <div className="group flex h-full gap-2">
        <div
          className={`relative w-[140px] shrink-0 overflow-hidden rounded-lg group-hover:rounded-tl-none`}
        >
          {!pathname.includes("profile") && (
            <div className="opacity-0 group-hover:opacity-100">
              <WatchlistRibbon
                onStatusChange={handleStatusChange}
                currentStatus={watchStatus}
                statuses={
                  mediaType === "manga"
                    ? bookStatuses
                    : mediaType === "movie"
                      ? movieStatuses
                      : tvStatuses
                }
              />
            </div>
          )}
          <ImageLoader
            src={coverImage}
            alt=""
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
          {tag && (
            <div className="mb-2 w-fit rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
              {tag}
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
