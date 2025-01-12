"use client"
import { DataStore, useDataStore } from "@/store/allDataStore"
import { Plus } from "lucide-react"
import React from "react"
import {
  handleAnimeStatusChange,
  handleGameStatusChange,
  handleMangaStatusChange,
  handleMovieStatusChange,
  handleTvShowStatusChange,
} from "@/util/contentStatusChange"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  bookStatuses,
  gameStatuses,
  movieStatuses,
  tvStatuses,
} from "./ListContent"
import { useRouter } from "next/navigation"

interface ContentDetailsProps {
  id: number | string
  contentType: string
  name: string
  coverImage: string
  tag: string
  voteAverage: number
  voteCount: number
  numbers: number
  genre: string[]
  episodes: number
  platforms: any
  muID: string
}

export default function BookmarkTag({
  id,
  contentType,
  name,
  coverImage,
  tag,
  voteAverage,
  voteCount,
  numbers,
  genre,
  episodes,
  platforms,
  muID,
}: ContentDetailsProps) {
  const router = useRouter()
  const { data, upsertItem } = useDataStore() as DataStore
  const { data: session } = useSession()

  const status = data.find(
    (data: { id: string | number; status?: string }) =>
      String(data.id) === String(id)
  )

  const statusKey =
    status?.watchStatus || status?.readStatus || status?.gameStatus

  const statuses =
    contentType === "manga"
      ? bookStatuses
      : contentType === "movie"
        ? movieStatuses
        : contentType === "game"
          ? gameStatuses
          : tvStatuses

  const handleStatusChange = async (selectedStatus: string) => {
    if (!session?.user?.id) {
      router.push("/login")
      return
    }
    if (!session?.user?.id || !contentType) return

    const details = {
      name,
      coverImage,
      tag,
      voteAverage,
      voteCount,
      numbers,
      genre,
    }

    if (contentType === "manga") {
      upsertItem({ id: String(id), readStatus: selectedStatus, ...details })
    } else if (contentType === "game") {
      upsertItem({ id: Number(id), gameStatus: selectedStatus, ...details })
    } else {
      upsertItem({ id: Number(id), watchStatus: selectedStatus, ...details })
    }

    const handlers: Record<string, Function> = {
      movie: handleMovieStatusChange,
      tv: handleTvShowStatusChange,
      anime: handleAnimeStatusChange,
      game: handleGameStatusChange,
      manga: async () => {
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

    await handlers[contentType]?.(
      session.user.id,
      contentType === "manga" ? id : Number(id),
      selectedStatus,
      contentType === "anime"
        ? { ...details, episodes }
        : contentType === "game"
          ? { ...details, platforms }
          : details
    )
  }

  return (
    <div className="relative flex gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-full max-w-[480px] text-zinc-200 transition-colors duration-200 group-hover:text-white">
            {status && statusKey ? (
              <div
                className={cn(
                  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base text-black transition-colors hover:bg-gray-200 md:w-auto md:text-base",
                  statuses[statusKey as keyof typeof statuses]?.label ===
                    "Watching" ||
                    statuses[statusKey as keyof typeof statuses]?.label ===
                      "Playing" ||
                    statuses[statusKey as keyof typeof statuses]?.label ===
                      "Reading"
                    ? "bg-blue-100 text-blue-600"
                    : statuses[statusKey as keyof typeof statuses]?.label ===
                          "Plan to Watch" ||
                        statuses[statusKey as keyof typeof statuses]?.label ===
                          "Want to play" ||
                        statuses[statusKey as keyof typeof statuses]?.label ===
                          "Plan to Read"
                      ? "bg-yellow-100 text-yellow-600"
                      : statuses[statusKey as keyof typeof statuses]?.label ===
                            "Completed" ||
                          statuses[statusKey as keyof typeof statuses]
                            ?.label === "I've seen this"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                )}
              >
                {statuses[statusKey as keyof typeof statuses]?.icon}
                {statuses[statusKey as keyof typeof statuses]?.label}
              </div>
            ) : (
              <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm text-black transition-colors hover:bg-gray-200 md:w-auto md:text-base">
                <Plus className="size-5" />
                Add to Watchlist
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          align="start"
          className="z-50 grid grid-cols-2 gap-2 bg-white p-2 text-black"
        >
          {Object.entries(statuses).map(([key, { label, icon }]) => (
            <DropdownMenuItem
              key={key}
              onSelect={() => handleStatusChange(key)}
              className={cn(
                "flex cursor-pointer items-center rounded-md p-3 transition-colors duration-200 hover:opacity-80",
                label === "Watching" ||
                  label === "Playing" ||
                  label === "Reading"
                  ? "bg-blue-100 text-blue-600"
                  : label === "Plan to Watch" ||
                      label === "Want to play" ||
                      label === "Plan to Read"
                    ? "bg-yellow-100 text-yellow-600"
                    : label === "Completed" || label === "I've seen this"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
              )}
            >
              {icon}
              <span className="font-medium">{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
