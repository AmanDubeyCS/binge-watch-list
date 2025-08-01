import React from "react"
import { Info, Star } from "lucide-react"
import { ImdbData } from "@/types/ImdbType"
import { formatNumber } from "@/util/formatNumber"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Icon } from "../icons"
import BookmarkTag from "./BookmarkTag"
import { ImageLoader } from "@/util/ImageLoader"
import { OverviewText } from "./OverviewText"

interface ContentDetailsProps {
  id: number | string
  backdropPoster: string
  poster: string
  title: string
  date: string
  genres: any[]
  rating: number
  voteCount: number
  overview: string
  production: any[]
  producer?: string[]
  imdbData?: ImdbData
  type?: string
  status?: string
  esbrrating?: any
  seasons?: number
  episodes?: number
  runTime?: number
  budget?: number
  revenue?: number
  watchProvider?: any
  imdbRating?: any
  imdbVotes?: any
  muRating?: number
  contentType?: string
  readProviders?: any
  numbers?: number
  platforms?: any
  muID?: string
  chapters?: number
  tmdbID?: number
}

function formatAmount(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " billion"
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " million"
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " thousand"
  }
  return num.toString()
}
function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}min`
}

const platformLogos = {
  AniList: <Icon.aniListIcon />,
  "Anime-planet": <Icon.animePlanetIcon />,
  Kitsu: <Icon.kitsuicon />,
  MangaUpdates: <Icon.mangaUpdatesIcon />,
  NovelUpdates: <Icon.novalUpdatesIcon />,
  MyAnimeList: <Icon.myAnimeList />,
  mangaDex: <Icon.mangaDexIcon />,
  "Book Walker": <Icon.bookWalkerIcon />,
  Amazon: <Icon.amazonIcon />,
  CDJapan: <Icon.CDJapan />,
  eBookJapan: <Icon.eBookJapanIcon />,
  "Official Raw": "",
  "Official Engilsh": "",
}

export function ContentDetails({
  id,
  backdropPoster,
  poster,
  title,
  date,
  genres,
  rating,
  voteCount,
  overview,
  production,
  producer,
  imdbData,
  type,
  status,
  esbrrating,
  seasons,
  episodes,
  runTime,
  budget,
  revenue,
  watchProvider,
  imdbRating,
  imdbVotes,
  muRating,
  contentType,
  readProviders,
  numbers,
  platforms,
  muID,
  chapters,
  tmdbID,
}: ContentDetailsProps) {
  const ratings = [
    {
      name: "IMDB",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg",
      votes: `${formatNumber(imdbVotes || 0)}`,
      bgColor: `bg-yellow-100`,
      rating: imdbRating || "N/A",
    },
    {
      name:
        contentType === "anime"
          ? "MALDB"
          : contentType === "manga"
            ? "MDex"
            : "TMDB",
      logo:
        contentType === "anime"
          ? "https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg"
          : contentType === "manga"
            ? "https://upload.wikimedia.org/wikipedia/pt/a/ac/MangaDex_logo.svg"
            : "https://upload.wikimedia.org/wikipedia/commons/8/89/Tmdb.new.logo.svg",
      votes: `${formatNumber(voteCount)}`,
      bgColor:
        contentType === "anime"
          ? `bg-green-100`
          : contentType === "manga"
            ? `bg-orange-200`
            : `bg-green-100`,
      rating: rating ? rating.toFixed(1).slice(0, 3) : "N/A",
    },
    {
      name: "MDex",
      logo: <Icon.mangaUpdatesIcon />,
      votes: `${formatNumber(0)}`,
      bgColor: `bg-white`,
      rating: muRating || "N/A",
    },
    {
      name: "RottenTomatoes",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg",
      votes: "Fresh",
      bgColor: `bg-red-100`,
      rating:
        imdbData?.Ratings?.find(
          (r: { Source: string; Value: string }) =>
            r.Source === "Rotten Tomatoes"
        )?.Value || "N/A",
    },
    {
      name: "Metacritic",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg",
      votes: "",
      bgColor: `bg-gray-200`,
      rating:
        imdbData?.Ratings?.find(
          (r: { Source: string; Value: string }) => r.Source === "Metacritic"
        )?.Value.slice(0, 2) || "N/A",
    },
  ]

  return (
    <>
      <section
        className="hidden md:block"
        style={{
          borderBottom: "1px solid var(--primaryColor)",
          backgroundPosition: "left calc((50vw - 170px) - 340px) top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backdropPoster})`,
        }}
      >
        <div
          className="relative h-fit overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%)",
          }}
        >
          <div className="mx-auto flex h-full max-w-[1600px] px-10 py-8 text-white">
            <div className="h-[450px] min-w-[300px]">
              <ImageLoader
                src={poster}
                alt={title}
                fallback={
                  <div className="flex aspect-[2/3] size-full items-center justify-center rounded-xl bg-[rgba(181,181,181,0.3)]">
                    <Icon.noPreview />
                  </div>
                }
                className="size-auto max-w-[300px] rounded-lg md:h-full md:min-w-[300px]"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto px-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
                <div className="flex flex-wrap items-center gap-1 text-xs text-gray-400 md:gap-2 md:text-sm">
                  <span>
                    {type && type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                  <span>•</span>
                  <span>{date}</span>

                  {imdbData && esbrrating && status && (
                    <>
                      <span>•</span>
                      <span>
                        {imdbData?.Rated ||
                          imdbData?.certification ||
                          status ||
                          esbrrating}
                      </span>
                    </>
                  )}
                  {episodes && (
                    <>
                      <span>•</span>
                      <span>{episodes} Episodes</span>
                    </>
                  )}

                  {seasons && (
                    <>
                      <span>•</span>
                      <span>{seasons} Seasons</span>
                    </>
                  )}
                  {runTime && (
                    <>
                      <span>•</span>
                      <span>{convertMinutesToHoursAndMinutes(runTime)}</span>
                    </>
                  )}
                  {(budget || 0) > 0 && (
                    <>
                      <span>•</span>
                      <span>Budget {formatAmount(budget || 0)}</span>
                    </>
                  )}
                  {(revenue || 0) > 0 && (
                    <>
                      <span>•</span>
                      <span>Revenue {formatAmount(revenue || 0)}</span>
                    </>
                  )}
                  {chapters && (
                    <>
                      <span>•</span>
                      <span>Chapters {chapters}</span>
                    </>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-800 px-2 py-0.5 text-xs md:px-3 md:py-1 md:text-base"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {contentType === "game" ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full px-3 py-1">
                    <Star className="size-5 text-yellow-400" />
                    <span className="text-lg font-bold">
                      {rating?.toFixed(1)}
                    </span>
                    {voteCount !== 0 && (
                      <span className="text-sm text-gray-300">
                        ({voteCount} votes)
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex shrink-0 flex-wrap gap-2 text-black">
                  {ratings.map((rating, index) => {
                    if (rating.rating !== "N/A") {
                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center gap-1 rounded-md border p-3",
                            rating.bgColor
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {typeof rating.logo === "string" ? (
                              <img
                                src={rating.logo}
                                alt=""
                                style={{
                                  width: "full",
                                  height: "20px",
                                }}
                              />
                            ) : (
                              rating.logo
                            )}
                            <div className="text-[20px] font-bold">
                              {rating.rating}
                              <span className="text-base font-bold">
                                {rating.name.includes("DB") ||
                                rating.name.includes("MDex")
                                  ? "/10"
                                  : rating.name === "Metacritic" &&
                                      rating.rating !== "N/A"
                                    ? "/100"
                                    : ""}
                              </span>
                              <div className="text-xs text-zinc-500">
                                {rating.votes !== "0" &&
                                  `(${rating.votes} votes)`}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              )}

              <OverviewText overview={overview} classname="text-base" />
              <div className="hidden grid-cols-1 gap-4 md:grid">
                {imdbData?.Director && imdbData?.Director !== "N/A" && (
                  <div className="flex gap-2">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Info className="size-4" /> Director
                    </h3>
                    <div className="flex flex-wrap text-gray-400">
                      <p className="text-base font-medium">
                        {imdbData.Director}
                      </p>
                    </div>
                  </div>
                )}
                {imdbData?.Writer && imdbData?.Writer !== "N/A" && (
                  <div className="flex gap-2">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Info className="size-4" /> Writer
                    </h3>
                    <div className="flex flex-wrap text-gray-400">
                      <p className="text-base font-medium">{imdbData.Writer}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Info className="size-4" />{" "}
                    {type === "manga"
                      ? "Artist"
                      : type === "game"
                        ? "Developers"
                        : "Production"}
                  </h3>
                  <div className="flex flex-wrap text-gray-400">
                    {production.map((productionCompanies, index: number) => (
                      <div key={index}>
                        <p className="text-base font-medium">
                          {productionCompanies}
                          {index < production.length - 1 ? "," : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {producer && (
                  <div className="flex gap-2">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Info className="size-4" /> Producers
                    </h3>
                    <div className="flex flex-wrap text-gray-400">
                      {producer.map((producer, index) => (
                        <div key={index}>
                          <p className="text-base font-medium">{producer},</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <BookmarkTag
                  id={id}
                  contentType={contentType || ""}
                  name={title}
                  coverImage={poster}
                  tag={date}
                  voteAverage={rating}
                  voteCount={voteCount}
                  numbers={numbers || 0}
                  genre={genres}
                  episodes={episodes || 0}
                  platforms={platforms}
                  muID={muID || ""}
                />

                {(contentType == "movie" || contentType == "tv") && (
                  <Link
                    href={
                      contentType === "movie"
                        ? `/watch/${contentType}/${id}`
                        : `/watch/${contentType}/${id}/1/1`
                    }
                    className="flex w-[200px] items-center justify-center rounded-lg bg-blue-400 px-6 py-3 text-base text-white"
                  >
                    Watch Now
                  </Link>
                )}
                {contentType == "anime" && tmdbID && (
                  <Link
                    href={`/watch/tv/${tmdbID}/1/1`}
                    className="flex w-[200px] items-center justify-center rounded-lg bg-blue-400 px-6 py-3 text-base text-white"
                  >
                    Watch Now
                  </Link>
                )}

                {/* {watchProvider && watchProvider["IN"] && (
                  <button className="flex h-fit w-[200px] items-center justify-start gap-2 rounded-lg bg-gray-800 p-1 pr-6">
                    <div className="min-w-[45px]">
                      <img
                        src={`https://image.tmdb.org/t/p/original${watchProvider["IN"]?.flatrate[0]?.logo_path}`}
                        alt={watchProvider["IN"]?.flatrate[0]?.provider_name}
                        className="size-[45px] rounded-md"
                      />
                    </div>
                    <div className="flex flex-wrap items-center text-center">
                      <span>
                        <h4 className="text-sm font-normal text-opacity-80">
                          Now Streaming
                        </h4>
                        <h3 className="font-bold">Watch Now</h3>
                      </span>
                    </div>
                  </button>
                )} */}
                {readProviders &&
                  readProviders.map(
                    (platform: any) =>
                      platform.id && (
                        <Link
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-black p-2"
                        >
                          {
                            platformLogos[
                              platform.name as keyof typeof platformLogos
                            ]
                          }
                          <span>{platform.name}</span>
                        </Link>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative bg-[#1f1f34]/[0.6] bg-blend-multiply md:hidden"
        style={{
          backgroundImage: `url(${backdropPoster})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="via-[#1f1f34]/84 to-[#1f1f34]/84 absolute inset-0 bg-gradient-to-r from-[#1f1f34]" />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start px-4 py-8 text-white">
          <ImageLoader
            src={poster}
            alt={title}
            fallback={
              <div className="flex aspect-[2/3] size-full items-center justify-center rounded-xl bg-[rgba(181,181,181,0.3)]">
                <Icon.noPreview />
              </div>
            }
            className="mx-auto mb-6 h-auto w-full max-w-[150px] rounded-lg object-cover shadow-lg"
          />
          <div className="mx-auto flex max-w-[450px] flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <h1 className="mb-2 text-center text-3xl font-bold md:text-4xl">
                {title}
              </h1>
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 md:gap-4 md:text-sm">
                <span>
                  {type && type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <span>•</span>
                <span>{date}</span>
                {imdbData && esbrrating && status && (
                  <>
                    <span>•</span>
                    <span>
                      {imdbData?.Rated ||
                        imdbData?.certification ||
                        status ||
                        esbrrating}
                    </span>
                  </>
                )}
                {episodes && (
                  <>
                    <span>•</span>
                    <span>{episodes} Episodes</span>
                  </>
                )}

                {seasons && (
                  <>
                    <span>•</span>
                    <span>{seasons} Seasons</span>
                  </>
                )}
                {runTime && (
                  <>
                    <span>•</span>
                    <span>{convertMinutesToHoursAndMinutes(runTime)}</span>
                  </>
                )}
                {(budget || 0) > 0 && (
                  <>
                    <span>•</span>
                    <span>Budget {formatAmount(budget || 0)}</span>
                  </>
                )}
                {(revenue || 0) > 0 && (
                  <>
                    <span>•</span>
                    <span>Revenue {formatAmount(revenue || 0)}</span>
                  </>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-800 px-2 py-0.5 text-xs md:px-3 md:py-1 md:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            {contentType === "game" ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-slate-700 px-3 py-1">
                  <Star className="size-5 text-yellow-400" />
                  <span className="text-lg font-bold">
                    {rating?.toFixed(1)}
                  </span>
                  {voteCount !== 0 && (
                    <span className="text-sm text-gray-300">
                      ({voteCount} votes)
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-4 flex shrink-0 flex-wrap justify-center gap-4">
                {ratings.map((rating, index) => {
                  if (rating.rating !== "N/A") {
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center gap-1"
                          // rating.bgColor
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {typeof rating.logo === "string" ? (
                            <img
                              src={rating.logo}
                              alt={rating.name}
                              style={{
                                width: "full",
                                height: "20px",
                              }}
                            />
                          ) : (
                            rating.logo
                          )}
                          <div className="text-[14px] font-bold">
                            {rating.rating}
                            <span className="text-[14px] font-bold">
                              {rating.name.includes("DB")
                                ? "/10"
                                : rating.name === "Metacritic" &&
                                    rating.rating !== "N/A"
                                  ? "/100"
                                  : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            )}

            <div className="flex w-full gap-4">
              <div className="w-full">
                <BookmarkTag
                  id={id}
                  contentType={contentType || ""}
                  name={title}
                  coverImage={poster}
                  tag={date}
                  voteAverage={rating}
                  voteCount={voteCount}
                  numbers={numbers || 0}
                  genre={genres}
                  episodes={episodes || 0}
                  platforms={platforms}
                  muID={muID || ""}
                />
              </div>
              {(contentType == "movie" || contentType == "tv") && (
                <Link
                  href={
                    contentType === "movie"
                      ? `/watch/${contentType}/${id}`
                      : `/watch/${contentType}/${id}/1/1`
                  }
                  className="flex w-[200px] items-center justify-center rounded-lg bg-blue-400 px-6 py-3 text-base text-white"
                >
                  Watch Now
                </Link>
              )}
              {contentType == "anime" && tmdbID && (
                <Link
                  href={`/watch/tv/${tmdbID}/1/1`}
                  className="flex w-[200px] items-center justify-center rounded-lg bg-blue-400 px-6 py-3 text-base text-white"
                >
                  Watch Now
                </Link>
              )}
            </div>

            <div className="mt-4">
              {contentType !== "manga" && <OverviewText overview={overview} />}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
