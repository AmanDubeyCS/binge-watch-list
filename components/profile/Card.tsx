"use client"
import React, { useState } from "react"
import {
  CircleCheckBig,
  Clock,
  Eye,
  Pencil,
  Save,
  Star,
  ThumbsDown,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { useSession } from "next-auth/react"
import { formatNumber } from "@/util/formatNumber"
import { ImageLoader } from "@/util/ImageLoader"
import { WatchlistRibbon } from "../WatchlistRibbon"
import { DataStore, useDataStore } from "@/store/allDataStore"

interface TVShowCardProps {
  id: number | string
  name: string
  coverImage: string
  firstAirDate: string
  voteAverage: number
  voteCount: number
  genreIds: any
  popularity: number
  mediaType: string
  status: string
  remarks: string
  progress: number | string
  episodes?: number
  showStatus?: string
}

export function Card({
  id,
  name,
  coverImage,
  firstAirDate,
  voteAverage,
  voteCount,
  genreIds,
  popularity,
  mediaType,
  status,
  remarks,
  progress,
  episodes,
  showStatus,
}: TVShowCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isEditing, setIsEditing] = useState(false)
  const [chapters, setChapters] = useState(progress)
  const [remark, setRemarks] = useState(remarks)
  const [season, setSeason] = useState(
    typeof progress === "string" ? progress.slice(1, 3) : ""
  )
  const [episode, setEpisode] = useState(
    typeof progress === "string" ? progress.slice(-2) : ""
  )

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
          tag: firstAirDate,
          voteAverage,
          voteCount,
          numbers: popularity,
          genre: genreIds,
          status: selectedStatus,
          progress:
            episodes && Number(chapters) >= Number(episodes)
              ? episodes
              : chapters,
          remark: remark || "",
        },
        { merge: true }
      )
      console.log("Status and details updated successfully!")
    } catch (error) {
      console.error("Error updating status and details:", error)
    }
  }

  const handleStatusChangeContent = async (selectedStatus: string) => {
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
          tag: firstAirDate,
          voteAverage,
          voteCount,
          numbers: popularity,
          genre: genreIds,
          status: selectedStatus,
          progress: `S${season.length < 2 ? `0${season}` : season}-E${episode.length < 2 ? `0${episode}` : episode}`,
          remark: remark || "",
        },
        { merge: true }
      )
      console.log("Status and details updated successfully!")
    } catch (error) {
      console.error("Error updating status and details:", error)
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

  const movieStatuses = {
    watching: { label: "Watching", icon: <Eye size={14} /> },
    planning: { label: "Plan to Watch", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  const bookStatuses = {
    reading: { label: "Reading", icon: <Eye size={14} /> },
    planning: { label: "Plan to Read", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      if (mediaType === "tv") {
        handleStatusChangeContent(status)
        setChapters(
          `S${season.length < 2 ? `0${season}` : season}-E${episode.length < 2 ? `0${episode}` : episode}`
        )
      } else if (mediaType === "manga" || mediaType === "book") {
        handleStatusChange(status)
      } else if (mediaType === "anime") {
        if (episodes && Number(chapters) >= Number(episodes)) {
          handleStatusChange("completed")
        } else {
          handleStatusChange(status)
        }
      }
      setIsEditing((prev) => !prev)
    } else {
      setIsEditing((prev) => !prev)
    }
  }

  // Handle input changes
  const handleChaptersChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChapters(e.target.value)
  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setRemarks(e.target.value)

  return (
    <div
      onClick={handleClick}
      className={`z-10 flex h-fit min-h-[245px] w-[360px] cursor-pointer items-center justify-start overflow-hidden rounded-md bg-white p-2 shadow-md duration-300 hover:scale-105`}
    >
      <div className="flex size-full gap-2">
        <div
          className={`relative w-[140px] shrink-0 overflow-hidden rounded-lg`}
        >
          {status && (
            <WatchlistRibbon
              onStatusChange={handleStatusChange}
              onRemoveData={handleRemoveData}
              currentStatus={status}
              statuses={mediaType === "manga" ? bookStatuses : movieStatuses}
            />
          )}
          <ImageLoader
            src={coverImage}
            alt=""
            fallback={
              <div
                className={`flex h-auto ${pathname === "/games" ? "w-full" : "w-[140px]"} items-center justify-center bg-white text-center text-black`}
              >
                <p>Image not available</p>
              </div>
            }
          />
        </div>
        <div className="flex w-full flex-1 flex-col">
          {/* {firstAirDate && (
            <div className="mb-2 w-fit rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
              {firstAirDate}
            </div>
          )} */}
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
          {/* <div className="mb-3 flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-700">
              {mediaType === "manga"
                ? "Follows:"
                : mediaType === "anime"
                  ? "Ranking:"
                  : "Popularity:"}
            </span>
            <span className="text-sm font-semibold text-gray-800">
              #{Math.round(popularity) || "N/A"}
            </span>
          </div> */}
          <div className="hide-scrollbar mb-2 flex w-full flex-nowrap gap-1.5 overflow-scroll p-1">
            {genreIds.slice(0, 2).map((genreId: any) => (
              <div
                key={genreId}
                className={cn(
                  "text-nowrap rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500"
                )}
              >
                {genreId || "Unknown"}
              </div>
            ))}
            {genreIds.length > 2 && (
              <p className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500">
                +{genreIds.length - 2}
              </p>
            )}
          </div>

          {mediaType !== "movie" && (
            <div
              className="group relative z-50 mt-auto flex flex-col gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation() // Prevent card click
                  toggleEditMode()
                }}
                className="absolute right-1 top-1 cursor-pointer duration-300 hover:scale-125"
              >
                {isEditing ? <Save size={16} /> : <Pencil size={16} />}
              </div>
              {mediaType !== "tv" ? (
                <p className="text-sm font-medium text-gray-700">
                  {mediaType === "manga" || mediaType === "book"
                    ? "Chapters:"
                    : "Episodes"}{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      value={chapters}
                      onChange={handleChaptersChange}
                      className="w-16 rounded border border-gray-300 p-1 text-sm"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-gray-800">
                      {mediaType === "anime" && episodes !== 0
                        ? `${chapters}/${episodes}`
                        : chapters}
                    </span>
                  )}
                </p>
              ) : (
                <div className="text-sm font-medium text-gray-700">
                  Episodes:{" "}
                  {isEditing ? (
                    <div className="flex items-center gap-3">
                      {/* Season Input */}
                      <div>
                        <label htmlFor="season">S</label>
                        <input
                          id="season"
                          type="text"
                          value={season}
                          onChange={(e) => setSeason(e.target.value)}
                          className="ml-1 w-10 rounded border border-gray-300 p-1 text-sm"
                        />
                      </div>
                      {/* Episode Input */}
                      <div>
                        <label htmlFor="episode">E</label>
                        <input
                          id="episode"
                          type="text"
                          value={episode}
                          onChange={(e) => setEpisode(e.target.value)}
                          className="ml-1 w-10 rounded border border-gray-300 p-1 text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-gray-800">
                      {chapters}
                    </span>
                  )}
                </div>
              )}

              {/* Editable Remarks */}
              <p className="text-sm font-medium text-gray-700">
                Remarks:{" "}
                {isEditing ? (
                  <textarea
                    value={remarks}
                    onChange={handleRemarksChange}
                    className="block w-full resize-none rounded border border-gray-300 p-1 text-sm"
                  />
                ) : (
                  <span className="block h-8 text-sm font-semibold text-gray-800">
                    {remarks}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
