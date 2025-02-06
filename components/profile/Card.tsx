"use client"
import { useEffect, useState } from "react"
import { Pencil, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import { SeasonEpisodeCounter } from "./SeasonEpisodeCounter"

import { AnimeEpisodesCounter } from "./AnimeEpisodesCounter"
import {
  handleAnimeStatusChange,
  handleGameStatusChange,
  handleMangaStatusChange,
  handleMovieStatusChange,
  handleTvShowStatusChange,
} from "@/util/contentStatusChange"
import { Dialog, DialogContent } from "../ui/dialog"
import { useParams, useRouter } from "next/navigation"
import { ImageLoader } from "@/util/ImageLoader"
import { Icon } from "../icons"
import { cn } from "@/lib/utils"
import { WatchlistRibbon } from "../WatchlistRibbon"
import {
  bookStatuses,
  gameStatuses,
  movieStatuses,
  tvStatuses,
} from "../common/ListContent"
import { db } from "@/app/firebaseConfig"
import { doc, deleteDoc } from "firebase/firestore"
import { useDataStore, DataStore } from "@/store/allDataStore"

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
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isDeleted, setIsDeleted] = useState(false)
  const params = useParams()
  const router = useRouter()
  const accoutUser = session?.user.id === params.userID
  const { removeFromWatchlist } = useDataStore() as DataStore
  const statusList: Record<string, { label: string; icon: JSX.Element }> =
    mediaType === "movie"
      ? movieStatuses
      : mediaType === "manga"
        ? bookStatuses
        : mediaType === "game"
          ? gameStatuses
          : tvStatuses

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
          currentStatus,
          details,
          remarks
        )
        break
      case "tv":
        await handleTvShowStatusChange(
          session.user.id,
          Number(id),
          currentStatus,
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
          currentStatus,
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
          currentStatus,
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
          currentStatus,
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
    const filteredSeasons = seasons.filter(
      (season: { season_number: number }) => season.season_number !== 0
    )
    for (const season of filteredSeasons) {
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

  useEffect(() => {
    handleStatusChange()
  }, [currentStatus])

  const handleRemoveData = () => {
    if (!session?.user?.id || !mediaType) return

    const docRef = doc(db, "users", session.user.id, mediaType, id.toString())
    deleteDoc(docRef)
      .then(() => {
        console.log(`Document with ID ${id} deleted successfully!`)
        removeFromWatchlist(id, mediaType)
        setIsDeleted(true)
      })
      .catch((error) => {
        console.error("Error removing data:", error)
      })
  }

  const handleClick = () => {
    const routes: Record<string, string> = {
      movie: `/movies/${id}`,
      tv: `/tv/${id}`,
      anime: `/anime/${id}`,
      manga: `/manga/${id}`,
      game: `/games/${id}`,
    }

    router.push(routes[mediaType] || `${mediaType}/${id}`, { scroll: false })
  }
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl lg:relative",
        isDeleted && "blur-sm"
      )}
    >
      <div
        onClick={() => {
          if (!isEditing) {
            handleClick()
          }
        }}
        className={`flex size-full min-h-[150px] min-w-[320px] shrink-0 cursor-pointer items-center justify-start overflow-hidden rounded-md bg-white shadow-md`}
      >
        <div className="group flex size-full gap-2">
          <div
            className={`relative w-[100px] shrink-0 overflow-hidden rounded-lg rounded-r-none`}
          >
            <div>
              {!accoutUser ? (
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
                        currentStatus
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
                    {currentStatus ? (
                      statusList[currentStatus as keyof typeof statusList]?.icon
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
                  onStatusChange={(status) => setCurrentStatus(status)}
                  currentStatus={currentStatus}
                  statuses={statusList}
                  onRemoveData={handleRemoveData}
                />
              )}
            </div>
            <ImageLoader
              src={coverImage}
              alt={name}
              fallback={
                <div className="flex aspect-[2/3] size-full items-center justify-center rounded-xl bg-[rgba(181,181,181,0.3)]">
                  <Icon.noPreview />
                </div>
              }
            />
          </div>
          <div className="flex w-full flex-col justify-between p-2">
            <div className="flex w-full flex-col justify-between">
              <div className="flex justify-between">
                <h3 className="line-clamp-2 text-wrap text-base font-semibold text-gray-800">
                  {name}
                </h3>
                <div className="flex items-center">
                  <Star className="mr-1 size-3 fill-current text-yellow-500" />
                  <span className="mr-2 text-sm font-semibold text-gray-800">
                    {voteAverage > 0 ? voteAverage.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>
              <div className="mb-1 flex flex-wrap items-center">
                {genre.slice(0, 3).map((genreId: any) => (
                  <div
                    key={genreId}
                    className={cn(
                      "rounded-lg pr-1 text-xs text-blue-400 underline duration-300"
                    )}
                  >
                    {genreId || "Unknown"}
                  </div>
                ))}
                {genre.length > 3 && (
                  <p className="rounded-lg p-1 text-xs text-black duration-300">
                    +{genre.length - 3}
                  </p>
                )}
              </div>
              <p className="text-xs italic">
                {" "}
                status:
                <span className="w-fit rounded-lg text-sm not-italic">
                  {" "}
                  {currentStatus}
                </span>
              </p>
            </div>

            <div>
              {(mediaType === "tv" ||
                mediaType === "anime" ||
                mediaType === "manga") && (
                <div className="mx-auto mt-2 w-full max-w-md overflow-hidden bg-white">
                  <div className="">
                    <div className="w-full">
                      <div className="w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-orange-400 transition-all duration-300 ease-in-out"
                          style={{ width: `${barProgress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="z-10 text-sm font-bold text-gray-800 lg:text-base">
                        {mediaType === "tv"
                          ? tvProgress
                          : mediaType === "manga"
                            ? `${manProgress.toString().length < 2 ? `0${manProgress}` : manProgress}${chapters === undefined ? "" : `/${chapters}+`}`
                            : `E-${aniProgress?.toString().length < 2 ? `0${aniProgress}` : aniProgress}/${episodes}`}
                      </div>
                      <p className="text-sm font-bold text-gray-800">
                        {Math.round(barProgress)}%
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {accoutUser ? (
                        <div className="rounded-lg">
                          <p className="line-clamp-2 text-xs font-medium">
                            {remarks || "Add memo to remember"}
                          </p>
                        </div>
                      ) : (
                        remarks !== "" && (
                          <span className="line-clamp-2 text-xs font-medium">
                            {remarks}
                          </span>
                        )
                      )}
                      {accoutUser && (
                        <button
                          className="flex items-center justify-center gap-1 rounded-md p-1 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsEditing(true)
                          }}
                        >
                          <Pencil className="size-3" /> Edit
                        </button>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <Dialog
                      open={isEditing}
                      onOpenChange={() => clearProgress()}
                    >
                      <DialogContent className="w-fit max-w-[1200px] bg-white p-0 text-black">
                        <div className="w-[300px] border-t bg-gray-50 p-4 lg:w-[360px]">
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
                                  <label htmlFor="chapterInput">
                                    Enter Chpters
                                  </label>
                                  <input
                                    id="chapterInput"
                                    type="number"
                                    name=""
                                    value={manProgress}
                                    className="w-full border bg-white"
                                    onChange={(e) =>
                                      setManProgress(e.target.value)
                                    }
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="remarks"
                                className="text-md mb-1 block font-bold text-gray-700"
                              >
                                Memo
                              </label>
                              <textarea
                                id="remarks"
                                value={remarks}
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
            </div>
          </div>
        </div>
      </div>
      {/* <Card
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
      /> */}
      {/* {(mediaType === "tv" ||
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
              <DialogContent className="w-fit max-w-[1200px] bg-white text-black p-0">
                <div className="border-t bg-gray-50 p-4 w-[300px] lg:w-[360px]">
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
      )} */}
      {/* {mediaType === "manga" && lastUpdated && (
        <p className="rounded-md bg-blue-100 px-2 text-sm">
          Last Updated:{" "}
          {lastUpdated.match(/^[A-Za-z]+\s\d{1,2}[a-z]{2},\s\d{4}/)}
        </p>
      )} */}
    </div>
  )
}
