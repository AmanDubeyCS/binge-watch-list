"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FilePenLine, Minus, NotepadText, Play, Plus, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import { SeasonEpisodeCounter } from "./SeasonEpisodeCounter"
import debounce from "lodash/debounce"
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
import { toast } from "sonner"

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
  progress: string | number
  episodes?: number
  showStatus?: string
  seasons?: any
  platforms?: any
  chapters?: number
  lastUpdated?: string
  video?: any
  overview?: string
  lastToAir?: string
  nextToAir?: string
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
  progress,
  episodes,
  seasons,
  platforms,
  chapters,
  lastUpdated,
  overview,
  video,
  lastToAir,
  nextToAir,
}: TVShowCardProps) {
  // State variables
  const { data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [contentProgress, setContentProgress] = useState<string | number>(
    progress
  )
  const [remarks, setRemarks] = useState(remark || "")
  const [tempValue, settempValue] = useState<string | number>()
  const [barProgress, setBarProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isDeleted, setIsDeleted] = useState(false)
  const [toWatch, setToWatch] = useState(0)
  const [showTrailer, setShowTrailer] = useState(false)
  const [showRemark, setShowRemark] = useState(false)
  const hasMounted = useRef(false)
  // Filter trailers from video
  const trailers = video?.filter((t: any) => t.type === "Trailer")
  const params = useParams()
  const router = useRouter()
  const isAccountUser = session?.user.id === params.userID
  const { removeFromWatchlist } = useDataStore() as DataStore

  // Define status list based on media type
  const statusList: Record<string, { label: string; icon: JSX.Element }> =
    useMemo(
      () =>
        mediaType === "movie"
          ? movieStatuses
          : mediaType === "manga"
            ? bookStatuses
            : mediaType === "game"
              ? gameStatuses
              : tvStatuses,
      [mediaType]
    )

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

    // Handle status change based on media type
    const statusHandlers: Record<string, Function> = {
      movie: handleMovieStatusChange,
      tv: handleTvShowStatusChange,
      anime: handleAnimeStatusChange,
      game: handleGameStatusChange,
      manga: handleMangaStatusChange,
    }

    const handler = statusHandlers[mediaType]

    if (handler) {
      await handler(
        session.user.id,
        mediaType === "manga" ? id : Number(id),
        currentStatus,
        {
          ...details,
          ...(mediaType === "tv" ||
          mediaType === "anime" ||
          mediaType === "manga"
            ? { progress: contentProgress }
            : {}),
          ...(mediaType === "game" ? { platforms } : {}),
        },
        remarks
      )
    } else {
      console.error("Invalid media type")
    }
  }

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (isEditing && tempValue !== undefined) {
      if (mediaType === "tv") {
        setContentProgress(String(tempValue))
      } else {
        setContentProgress(tempValue)
      }
    }
    setIsEditing((prev) => !prev)
  }, [isEditing, mediaType, tempValue])

  // Set progress data based on media type
  const setProgressData = useCallback(() => {
    if (mediaType === "anime" && episodes) {
      const progress = (Number(contentProgress) / episodes) * 100
      setBarProgress(progress)
      return
    } else if (
      mediaType === "manga" &&
      chapters &&
      Number(contentProgress) <= chapters
    ) {
      const progress = (Number(contentProgress) / chapters) * 100
      setBarProgress(progress)
      return
    }

    if (!progress || !seasons) return

    // Parse the progress string (e.g., "S01 E10")
    const match = String(contentProgress).match(/S(\d{2})\s*E(\d{2})/)
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
    setToWatch(totalEpisodes - watchedEpisodes)
    const progressPercentage = (watchedEpisodes / totalEpisodes) * 100
    setBarProgress(progressPercentage)
  }, [mediaType, episodes, seasons, contentProgress])

  const handleSingleUpdates = (e: React.MouseEvent, data: any) => {
    e.stopPropagation()

    if (mediaType === "tv") {
      setContentProgress(data)
    } else if (mediaType === "anime") {
      setContentProgress(data)
    } else if (mediaType === "manga") {
      setContentProgress(data)
    }
  }

  useEffect(() => {
    setProgressData()
  }, [contentProgress])

  const clearProgress = () => {
    setContentProgress(contentProgress)
    setContentProgress(contentProgress)
    setContentProgress(contentProgress)
    setRemarks(remark)
    setIsEditing(false)
  }

  const handleStatusChangeDebounced = useCallback(
    debounce(() => {
      handleStatusChange()
    }, 1000),
    [currentStatus, contentProgress]
  )

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    handleStatusChangeDebounced()

    return () => {
      handleStatusChangeDebounced.cancel()
    }
  }, [currentStatus, contentProgress])

  const handleRemoveData = () => {
    if (!session?.user?.id || !mediaType) return

    const docRef = doc(db, "users", session.user.id, mediaType, id.toString())
    deleteDoc(docRef)
      .then(() => {
        toast.success("Sucsess", {
          description: `${mediaType} ${name} deleted sucsessfully`,
        })
        removeFromWatchlist(id, mediaType)
        setIsDeleted(true)
      })
      .catch((error) => {
        toast.error("Error", {
          description: "Error removing content, please try again",
        })
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

  const parseEpisode = (episodeStr: string | number) => {
    const match = String(episodeStr).match(/S(\d+) E(\d+)/)
    if (!match) return { season: 1, episode: 1 }
    return { season: parseInt(match[1]), episode: parseInt(match[2]) }
  }

  const getNextEpisode = () => {
    const { season, episode } = parseEpisode(contentProgress)
    const currentSeason = seasons.find(
      (s: { season_number: number }) => s.season_number === season
    )
    const nextEpisode =
      episode < (currentSeason?.episode_count ?? 1) ? episode + 1 : 1
    const nextSeason = nextEpisode === 1 ? season + 1 : season

    const nextSeasonData = seasons.find(
      (s: { season_number: number }) => s.season_number === nextSeason
    )
    if (!nextSeasonData) return contentProgress

    return `S${String(nextSeason).padStart(2, "0")} E${String(nextEpisode).padStart(2, "0")}`
  }

  const getPreviousEpisode = () => {
    const { season, episode } = parseEpisode(contentProgress)
    if (episode > 1) {
      return `S${String(season).padStart(2, "0")} E${String(episode - 1).padStart(2, "0")}`
    }

    const prevSeason = seasons.find(
      (s: { season_number: number }) => s.season_number === season - 1
    )
    if (!prevSeason) return contentProgress

    return `S${String(prevSeason.season_number).padStart(2, "0")} E${String(prevSeason.episode_count).padStart(2, "0")}`
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
          if (!isEditing && !showTrailer && !showRemark) {
            handleClick()
          }
        }}
        className={`flex size-full min-h-[150px] min-w-[320px] shrink-0 cursor-pointer flex-col items-center justify-start overflow-hidden rounded-md bg-white shadow-md`}
      >
        <div className="group flex size-full gap-2">
          <div
            className={`relative w-[100px] shrink-0 overflow-hidden rounded-tl-lg`}
          >
            <div>
              {!isAccountUser ? (
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
                <div className="flex aspect-[2/3] size-full items-center justify-center bg-[rgba(181,181,181,0.3)]">
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
              {mediaType !== "movie" && (
                <p className="text-xs italic">
                  {" "}
                  status:
                  <span className="w-fit rounded-lg text-sm not-italic">
                    {" "}
                    {currentStatus}
                  </span>
                </p>
              )}
              {mediaType === "movie" && (
                <p className="mt-2 line-clamp-3 text-sm">{overview}</p>
              )}
            </div>

            <div>
              {(mediaType === "tv" ||
                mediaType === "anime" ||
                mediaType === "manga" ||
                mediaType === "movie") && (
                <div className="mx-auto mt-2 w-full max-w-md overflow-hidden bg-white">
                  <div className="">
                    <div className="flex items-center gap-2">
                      <div className="z-10 text-sm font-bold text-gray-800 lg:text-base">
                        {mediaType === "tv"
                          ? contentProgress
                          : mediaType === "manga"
                            ? `${contentProgress.toString().length < 2 ? `0${contentProgress}` : contentProgress}${chapters === undefined ? "" : `/${chapters}+`}`
                            : mediaType === "anime"
                              ? `E-${contentProgress?.toString().length < 2 ? `0${contentProgress}` : contentProgress}/${episodes}`
                              : ""}
                      </div>

                      {mediaType === "tv" && (
                        <>
                          <div className="size-[5px] rounded-full bg-slate-500"></div>
                          {toWatch !== 0 ? (
                            <p className="text-sm font-medium text-gray-600">
                              {toWatch} ep. left to watch
                            </p>
                          ) : (
                            <p className="text-sm font-medium text-gray-600">
                              Watched all Aired Ep.
                            </p>
                          )}
                        </>
                      )}
                      {mediaType === "anime" && episodes && (
                        <>
                          <div className="size-[5px] rounded-full bg-slate-500"></div>
                          {episodes - Number(contentProgress) !== 0 ? (
                            <p className="text-sm font-medium text-gray-600">
                              {episodes - Number(contentProgress)} ep. left to
                              watch
                            </p>
                          ) : (
                            <p className="text-sm font-medium text-gray-600">
                              Watched all Aired Ep.
                            </p>
                          )}
                        </>
                      )}
                      {mediaType === "manga" &&
                        chapters &&
                        Number(contentProgress) <= chapters && (
                          <>
                            <div className="size-[5px] rounded-full bg-slate-500"></div>
                            <p className="text-sm font-medium text-gray-600">
                              {chapters - Number(contentProgress)} ch. left to
                              read
                            </p>
                          </>
                        )}
                    </div>
                    {mediaType !== "movie" && (
                      <div className="flex w-full items-center gap-2">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-orange-400 transition-all duration-300 ease-in-out"
                            style={{ width: `${barProgress}%` }}
                          />
                        </div>
                        <p className="text-sm font-bold text-gray-800">
                          {Math.round(barProgress)}%
                        </p>
                      </div>
                    )}
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
                                  lastToAir={lastToAir ?? ""}
                                  initialValue={String(contentProgress)}
                                  setProgress={(progress: string) =>
                                    settempValue(progress)
                                  }
                                />
                              )}
                              {mediaType === "anime" && (
                                <div className="flex w-full flex-col justify-center gap-2">
                                  <label htmlFor="chapterInput">
                                    Enter Episode
                                  </label>
                                  <input
                                    id="episodeInput"
                                    type="number"
                                    value={tempValue}
                                    className="w-full border bg-white p-2"
                                    onChange={(e) =>
                                      settempValue(
                                        Number(e.target.value) >
                                          Number(episodes)
                                          ? episodes
                                          : Number(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                              )}
                              {mediaType === "manga" && (
                                <div className="flex w-full flex-col justify-center gap-2">
                                  <label htmlFor="chapterInput">
                                    Enter Chapters
                                  </label>
                                  <input
                                    id="chapterInput"
                                    type="number"
                                    value={tempValue}
                                    className="w-full border bg-white p-2"
                                    onChange={(e) =>
                                      settempValue(e.target.value)
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
                                className="w-full rounded-md border p-1"
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
        {(mediaType === "tv" ||
          mediaType === "anime" ||
          mediaType === "manga" ||
          mediaType === "movie") && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center justify-between p-1"
          >
            {mediaType === "manga" && (
              <div className="mr-2 flex flex-1 gap-2">
                {Number(contentProgress) > 0 && (
                  <div
                    onClick={(e) =>
                      handleSingleUpdates(e, Number(contentProgress) - 1)
                    }
                    className="flex w-full max-w-[120px] items-center justify-center gap-1 rounded-lg border p-1 text-[12px] font-semibold"
                  >
                    <Minus size={12} /> Ch. {Number(contentProgress) - 1}
                  </div>
                )}
                <div
                  onClick={(e) =>
                    handleSingleUpdates(e, Number(contentProgress) + 1)
                  }
                  className="flex w-full max-w-[150px] items-center justify-center gap-1 text-nowrap rounded-lg border p-1 text-[12px] font-semibold"
                >
                  <Plus size={12} /> Mark ch. {Number(contentProgress) + 1}
                </div>
              </div>
            )}
            {mediaType === "anime" && (
              <div className="mr-2 flex flex-1 gap-2">
                {Number(contentProgress) > 0 && (
                  <div
                    onClick={(e) =>
                      handleSingleUpdates(e, Number(contentProgress) - 1)
                    }
                    className="flex w-full max-w-[120px] items-center justify-center gap-1 rounded-lg border p-1 text-[12px] font-semibold"
                  >
                    <Minus size={12} /> Ep. {Number(contentProgress) - 1}
                  </div>
                )}
                {episodes !== contentProgress && (
                  <div
                    onClick={(e) =>
                      handleSingleUpdates(e, Number(contentProgress) + 1)
                    }
                    className="flex w-full max-w-[150px] items-center justify-center gap-1 text-nowrap rounded-lg border p-1 text-[12px] font-semibold"
                  >
                    <Plus size={12} /> Mark ep. {Number(contentProgress) + 1}
                  </div>
                )}
              </div>
            )}
            {mediaType === "tv" && (
              <div className="mr-2 flex flex-1 gap-2">
                {contentProgress !== "S01 E01" && (
                  <div
                    onClick={(e) =>
                      handleSingleUpdates(e, getPreviousEpisode())
                    }
                    className="flex w-full max-w-[120px] items-center justify-center gap-1 rounded-lg border p-1 text-[12px] font-semibold"
                  >
                    <Minus size={12} /> {getPreviousEpisode()}
                  </div>
                )}

                {toWatch !== 0 && contentProgress !== lastToAir ? (
                  <div
                    onClick={(e) => handleSingleUpdates(e, getNextEpisode())}
                    className="flex w-full max-w-[150px] items-center justify-center gap-1 text-nowrap rounded-lg border p-1 text-[12px] font-semibold"
                  >
                    <Plus size={12} /> Mark {getNextEpisode()}
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-xs font-semibold">
                    {nextToAir !== "undefined" && `to be Aired E${nextToAir}`}
                  </div>
                )}
              </div>
            )}
            {mediaType === "movie" && (
              <p className="flex w-full max-w-[150px] items-center justify-center gap-1 text-nowrap rounded-lg border p-1 text-[12px] font-semibold">
                {status}
              </p>
            )}

            <div className="ml-auto flex items-center gap-1">
              {mediaType !== "manga" && video && video.length > 0 && (
                <Dialog
                  open={showTrailer}
                  onOpenChange={() => setShowTrailer(false)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowTrailer(true)
                    }}
                  >
                    <Play />
                  </button>
                  <DialogContent className="aspect-video bg-white p-0 sm:max-w-[1200px]">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailers.length > 0 ? trailers[0].key : video[0].key}`}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="aspect-video size-full rounded-lg"
                    ></iframe>
                  </DialogContent>
                </Dialog>
              )}
              <Dialog
                open={showRemark}
                onOpenChange={() => setShowRemark(false)}
              >
                <button
                  disabled={remarks === ""}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowRemark(true)
                  }}
                  className="text-gray-600 disabled:text-gray-400"
                >
                  <NotepadText />
                </button>
                <DialogContent className="bg-white p-3">
                  <p className="text-xl text-gray-600">MEMO</p>
                  <p className="rounded-lg border p-2">{remarks}</p>
                </DialogContent>
              </Dialog>
              {isAccountUser && (
                <button
                  className="flex items-center justify-center gap-1 rounded-md p-1 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditing(true)
                  }}
                >
                  <FilePenLine />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
