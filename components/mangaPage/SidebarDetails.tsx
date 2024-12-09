import { Manga } from "@/types/manga/singleManga"
import { BarChart2, Book, Film, Info, Languages, Star, Tag } from "lucide-react"
import React from "react"
import { Icon } from "../icons"
import Link from "next/link"

interface Comments {
  threadId: number
  repliesCount: number
}

interface RatingDistribution {
  [score: string]: number // Keys are strings representing scores ('1' to '10'), values are counts.
}

interface Rating {
  average: number
  bayesian: number
  distribution: RatingDistribution
}

interface AnimeStatistics {
  comments: Comments
  rating: Rating
  follows: number
}

const LanguageMap = {
  ar: "Arabic",
  bg: "Bulgarian",
  bn: "Bengali",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  fa: "Persian",
  fi: "Finnish",
  fr: "French",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  ml: "Malayalam",
  mr: "Marathi",
  nb: "Norwegian Bokmål",
  nl: "Dutch",
  no: "Norwegian",
  pa: "Punjabi",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese",
  zh: "Chinese",
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

export function SidebarDetails({
  mangaInfo,
  statistics,
}: {
  mangaInfo: Manga
  statistics: AnimeStatistics
}) {
  const platformsTrack = [
    {
      id: mangaInfo.attributes.links.al,
      name: "AniList",
      url: `https://anilist.co/manga/${mangaInfo.attributes.links.al}`,
    },
    {
      id: mangaInfo.attributes.links.ap,
      name: "Anime-planet",
      url: `https://www.anime-planet.com/manga/${mangaInfo.attributes.links.ap}`,
    },
    {
      id: mangaInfo.attributes.links.kt,
      name: "Kitsu",
      url: `https://kitsu.app/manga/${mangaInfo.attributes.links.kt}`,
    },
    {
      id: mangaInfo.attributes.links.mu,
      name: "MangaUpdates",
      url: `https://www.mangaupdates.com/series.html?id=${mangaInfo.attributes.links.mu}`,
    },
    {
      id: mangaInfo.attributes.links.nu,
      name: "NovelUpdates",
      url: `https://www.novelupdates.com/series/${mangaInfo.attributes.links.nu}`,
    },
    {
      id: mangaInfo.attributes.links.mal,
      name: "MyAnimeList",
      url: `https://myanimelist.net/manga/${mangaInfo.attributes.links.mal}`,
    },
  ]

  const platformReadOrBuy = [
    {
      id: mangaInfo.attributes.links.raw,
      name: "Official Raw",
      url: `${mangaInfo.attributes.links.raw}`,
    },
    {
      id: mangaInfo.attributes.links.engtl,
      name: "Official Engilsh",
      url: `${mangaInfo.attributes.links.engtl}`,
    },
    {
      id: mangaInfo.attributes.links.amz,
      name: "Amazon",
      url: `${mangaInfo.attributes.links.amz}`,
    },
    {
      id: mangaInfo.attributes.links.bw,
      name: "Book Walker",
      url: `https://bookwalker.jp/${mangaInfo.attributes.links.bw}`,
    },
    {
      id: mangaInfo.attributes.links.cdj,
      name: "CDJapan",
      url: `${mangaInfo.attributes.links.cdj}`,
    },
    {
      id: mangaInfo.attributes.links.ebj,
      name: "eBookJapan",
      url: `${mangaInfo.attributes.links.ebj}`,
    },
  ]

  const maxCount = Math.max(
    ...Object.values(statistics.rating.distribution).map(Number)
  )

  return (
    <div className="w-[450px] space-y-6 text-black">
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Ratings</h2>
        <div className="mb-2 flex items-center">
          <Star className="mr-2 size-6 text-yellow-400" />
          <span className="text-3xl font-bold">
            {statistics.rating.bayesian.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600">Scored by {maxCount} users</p>
        <div className="mt-4">
          <p className="flex items-center text-gray-700">
            <BarChart2 className="mr-2 size-4 text-blue-500" />
            <span className="font-semibold">Popularity:</span> #
            {statistics.follows}
          </p>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">More Info</h2>
        <p className="flex items-center text-gray-700">
          <Book className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Type:</span> {mangaInfo.type}
        </p>
        <p className="flex items-center text-gray-700">
          <Info className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Status:</span>{" "}
          {mangaInfo.attributes.status}
        </p>
        <p className="flex items-center text-gray-700">
          <Tag className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Demographic:</span>{" "}
          <span className="line-clamp-1">
            {mangaInfo.attributes.publicationDemographic || "N/A"}
          </span>
        </p>
        <p className="flex items-center text-gray-700">
          <Film className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Content Rating:</span>{" "}
          {mangaInfo.attributes.contentRating || "N/A"}
        </p>

        <p className="flex items-center text-gray-700">
          <Languages className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Original Language:</span>{" "}
          {
            LanguageMap[
              mangaInfo.attributes.originalLanguage as keyof typeof LanguageMap
            ]
          }
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Read or Buy</h2>
        <ul className="flex flex-wrap gap-2">
          {platformReadOrBuy.map(
            (platform) =>
              platform.id && (
                <Link
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link flex items-center justify-center gap-1 rounded-md border border-gray-300 p-1"
                >
                  {platformLogos[platform.name as keyof typeof platformLogos]}
                  <span>{platform.name}</span>
                </Link>
              )
          )}
        </ul>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">External Links</h2>
        <ul className="flex flex-wrap gap-2">
          <Link
            href={`https://mangadex.org/title/${mangaInfo.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex items-center justify-center gap-1 rounded-md border border-gray-300 p-1"
          >
            {platformLogos["mangaDex" as keyof typeof platformLogos]}
            <span>MangaDex</span>
          </Link>
          {platformsTrack.map(
            (platform) =>
              platform.id && (
                <Link
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link flex items-center justify-center gap-1 rounded-md border border-gray-300 p-1"
                >
                  {platformLogos[platform.name as keyof typeof platformLogos]}
                  <span>{platform.name}</span>
                </Link>
              )
          )}
        </ul>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Alternative Titles</h2>
        <div className="flex flex-col gap-1">
          {mangaInfo.attributes.altTitles.map((title, index: number) => (
            <div key={index} className="flex flex-col">
              {Object.keys(title).map((langKey) => (
                <p
                  key={langKey}
                  className="border-b border-black px-2 py-1 text-base font-medium leading-[normal]"
                >
                  {title[langKey]}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
