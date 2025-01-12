"use client"
import React, { useEffect, useState } from "react"
import {
  CircleCheckBig,
  Clock,
  Eye,
  Gamepad2,
  Info,
  Pencil,
  ThumbsDown,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { SeasonEpisodeCounter } from "./SeasonEpisodeCounter"
import Card from "../common/Card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { AnimeEpisodesCounter } from "./AnimeEpisodesCounter"
import {
  handleAnimeStatusChange,
  handleGameStatusChange,
  handleMangaStatusChange,
  handleMovieStatusChange,
  handleTvShowStatusChange,
} from "@/util/contentStatusChange"
import { Dialog, DialogContent } from "../ui/dialog"
import { useParams } from "next/navigation"

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
  status: string
  remark: string
  showProgress: string
  episodes?: number
  showStatus?: string
  seasons?: any
  platforms?: any
  animeprogress?: any
  mangaProgress?: any
  chapters?: number
  lastUpdated?: string
}

export function ProfileCard({
  id,
  name,
  coverImage,
  tag,
  voteAverage,
  voteCount,
  genre,
  numbers,
  mediaType,
  status,
  remark,
  showProgress,
  episodes,
  seasons,
  platforms,
  animeprogress,
  mangaProgress,
  chapters,
  lastUpdated,
}: TVShowCardProps) {
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [manProgress, setManProgress] = useState(mangaProgress)
  const [remarks, setRemarks] = useState(remark || "")
  const [tvProgress, settvProgress] = useState(showProgress)
  const [aniProgress, setAniProgress] = useState(animeprogress)
  const [barProgress, setBarProgress] = useState(0)
  const params = useParams()
  const accoutUser = session?.user.id === params.userID

  const handleStatusChange = async () => {
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
          status,
          details,
          remarks
        )
        break
      case "tv":
        await handleTvShowStatusChange(
          session.user.id,
          Number(id),
          status,
          {
            ...details,
            tvProgress,
          },
          remarks
        )
        break
      case "anime":
        await handleAnimeStatusChange(
          session.user.id,
          Number(id),
          status,
          {
            ...details,
            aniProgress,
          },
          remarks
        )
        break
      case "game":
        await handleGameStatusChange(
          session.user.id,
          Number(id),
          status,
          {
            ...details,
            platforms,
          },
          remarks
        )
        break
      case "manga":
        await handleMangaStatusChange(
          session.user.id,
          id,
          status,
          {
            ...details,
            mgProgress: manProgress,
          },
          remarks
        )
        break
      default:
        console.error("Invalid media type")
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

  const gameStatuses = {
    playing: { label: "Playing", icon: <Gamepad2 size={14} /> },
    planning: { label: "Want to play", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }
  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      handleStatusChange()
      setIsEditing((prev) => !prev)
    } else {
      setIsEditing((prev) => !prev)
    }
  }

  const setProgressData = () => {
    if (mediaType === "anime" && episodes) {
      const progress = (aniProgress / episodes) * 100
      setBarProgress(progress)
      return
    } else if (mediaType === "manga" && chapters) {
      const progress = (manProgress / chapters) * 100
      setBarProgress(progress)
      return
    }

    if (!showProgress || !seasons) return

    // Parse the progress string (e.g., "S01 E10")
    const match = String(tvProgress).match(/S(\d{2})\s*E(\d{2})/)
    if (!match) return

    const currentSeason = parseInt(match[1], 10)
    const currentEpisode = parseInt(match[2], 10)

    // Calculate total episodes up to the current season
    let totalEpisodes = 0
    let watchedEpisodes = 0

    for (const season of seasons) {
      if (season.season_number < currentSeason) {
        totalEpisodes += season.episode_count
        watchedEpisodes += season.episode_count
      } else if (season.season_number === currentSeason) {
        totalEpisodes += season.episode_count
        watchedEpisodes += currentEpisode
      } else {
        totalEpisodes += season.episode_count
      }
    }

    // Calculate percentage
    const progressPercentage = (watchedEpisodes / totalEpisodes) * 100
    setBarProgress(progressPercentage)
  }

  useEffect(() => {
    setProgressData()
  }, [tvProgress, aniProgress, manProgress, setProgressData])

  const clearProgress = () => {
    setManProgress(mangaProgress)
    settvProgress(showProgress)
    setAniProgress(animeprogress)
    setRemarks(remark)
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border shadow-sm lg:relative lg:p-2">
      <Card
        key={id}
        id={id}
        name={name}
        coverImage={coverImage}
        tag={tag}
        voteAverage={voteAverage}
        voteCount={voteCount}
        genre={genre}
        numbers={numbers}
        mediaType={mediaType}
        status={
          mediaType === "manga"
            ? bookStatuses
            : mediaType === "game"
              ? gameStatuses
              : mediaType === "movie"
                ? movieStatuses
                : tvStatuses
        }
        platforms={platforms}
        profileCardStatus={status}
        userId={accoutUser}
      />
      {(mediaType === "tv" ||
        mediaType === "anime" ||
        mediaType === "manga") && (
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md">
          <div className="p-1">
            <div className="relative h-10 overflow-hidden rounded-lg bg-gray-200 lg:h-16">
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 bg-opacity-30 transition-all duration-300 ease-in-out"
                style={{ width: `${barProgress}%` }}
              />
              <div className="absolute left-0 top-0 flex size-full items-center justify-between px-1 sm:px-4">
                <div className="z-10 text-base font-bold text-gray-800 lg:text-xl">
                  {mediaType === "tv"
                    ? tvProgress
                    : mediaType === "manga"
                      ? `${manProgress.toString().length < 2 ? `0${manProgress}` : manProgress}${chapters === undefined ? "" : `/${chapters}+`}`
                      : `E-${aniProgress?.toString().length < 2 ? `0${aniProgress}` : aniProgress}/${episodes}`}
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-gray-600 transition-colors hover:text-gray-800">
                          <Info className="size-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="mr-36 max-w-[300px] bg-white">
                        <p>{remark || "Add memo to remember"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {accoutUser && (
                    <button
                      className="flex size-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-white hover:text-gray-800"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="size-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isEditing && (
            <Dialog open={isEditing} onOpenChange={() => clearProgress()}>
              <DialogContent className="w-fit max-w-[1200px] bg-white text-black">
                <div className="border-t bg-gray-50 p-4 lg:w-[360px]">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      {mediaType === "tv" && (
                        <SeasonEpisodeCounter
                          seasons={seasons}
                          initialValue={String(tvProgress)}
                          setProgress={(progress: string) =>
                            settvProgress(progress)
                          }
                        />
                      )}
                      {mediaType === "anime" && (
                        <AnimeEpisodesCounter
                          progress={aniProgress}
                          epiodes={episodes}
                          setAniProgress={(data: number) =>
                            setAniProgress(data)
                          }
                        />
                      )}
                      {mediaType === "manga" && (
                        <div className="flex w-full flex-col justify-center gap-2">
                          <label htmlFor="chapterInput">Enter Chpters</label>
                          <input
                            id="chapterInput"
                            type="number"
                            name=""
                            value={manProgress}
                            className="w-full border bg-white"
                            onChange={(e) => setManProgress(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="remarks"
                        className="text-md mb-1 block font-bold text-gray-700"
                      >
                        Remarks
                      </label>
                      <textarea
                        id="remarks"
                        value={remark}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="w-full rounded-md border"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleEditMode()}
                        className="rounded-lg bg-blue-400 px-5 py-2 font-bold text-white shadow-md transition-all duration-200 hover:scale-105"
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
      {mediaType === "manga" && lastUpdated && (
        <p className="rounded-md bg-blue-100 px-2 text-sm">
          Last Updated:{" "}
          {lastUpdated.match(/^[A-Za-z]+\s\d{1,2}[a-z]{2},\s\d{4}/)}
        </p>
      )}
    </div>
  )
}
