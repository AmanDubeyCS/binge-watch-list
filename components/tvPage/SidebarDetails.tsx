import { BarChart2, Film, Info, Star, Tag, Tv, CircleDollarSign, Hourglass, Languages } from "lucide-react"
import React from "react"

const tmdbLanguageMap = {
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
  IMDB: "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg",
  TVDB: "https://www.thetvdb.com/images/attribution/logo2.png", // Example logo, adjust as needed
  Wikidata:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wikidata-logo-en.svg/1200px-Wikidata-logo-en.svg.png",
  Facebook:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  Instagram:
    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  Twitter:
    "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
}

interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface ExternalIds {
  imdb_id: string
  freebase_mid: string | null
  freebase_id: string | null
  tvdb_id: number | null
  tvrage_id: number | null
  wikidata_id: string
  facebook_id: string | null
  instagram_id: string | null
  twitter_id: string | null
}

interface Provider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface CountryStreamingInfo {
  link: string
  flatrate?: Provider[]
  buy?: Provider[]
  ads?: Provider[]
}

interface StreamingAvailability {
  [countryCode: string]: CountryStreamingInfo
}

interface Props {
  rating: number
  voteCount: number
  popularity: number
  type?: string
  numberOfSeasons?: number
  numberOfEpisodes?: number
  language?: string
  network?: Network[]
  externalIds: ExternalIds
  watchProvider: StreamingAvailability
  revenue?: number
  runTime?:  number
  budget?: number
}

export function SideBarDetails({
  rating,
  voteCount,
  popularity,
  type,
  numberOfSeasons,
  numberOfEpisodes,
  language,
  network,
  externalIds,
  watchProvider,
  revenue,
  runTime,
  budget

}: Props) {
  const platforms = [
    {
      id: externalIds.imdb_id,
      name: "IMDB",
      url: `https://www.imdb.com/title/${externalIds.imdb_id}`,
    },
    {
      id: externalIds.tvdb_id,
      name: "TVDB",
      url: `https://thetvdb.com/?id=${externalIds.tvdb_id}`,
    },
    {
      id: externalIds.wikidata_id,
      name: "Wikidata",
      url: `https://www.wikidata.org/wiki/${externalIds.wikidata_id}`,
    },
    {
      id: externalIds.facebook_id,
      name: "Facebook",
      url: `https://www.facebook.com/${externalIds.facebook_id}`,
    },
    {
      id: externalIds.instagram_id,
      name: "Instagram",
      url: `https://www.instagram.com/${externalIds.instagram_id}`,
    },
    {
      id: externalIds.twitter_id,
      name: "Twitter",
      url: `https://twitter.com/${externalIds.twitter_id}`,
    },
  ]
  function formatNumber(num: number) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' billion';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' million';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + ' thousand';
    }
    return num.toString();
  }
  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }
  return (
    <div className="w-[450px] space-y-6 text-black">
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Ratings</h2>
        <div className="mb-2 flex items-center">
          <Star className="mr-2 size-6 text-yellow-400" />
          <span className="text-3xl font-bold">
            {rating ? rating.toFixed(1) : "N/A"}
          </span>
        </div>
        <p className="text-gray-600">Scored by {voteCount} users</p>
        <div className="mt-4">
          <p className="flex items-center text-gray-700">
            <BarChart2 className="mr-2 size-4 text-blue-500" />
            <span className="font-semibold">Popularity:</span> #
            {Math.round(popularity)}
          </p>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">More Info</h2>
        <p className="flex items-center text-gray-700">
          <Tv className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Type:</span> {type}
        </p>
        {numberOfSeasons && (
          <p className="flex items-center text-gray-700">
          <Film className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Seasons:</span>{" "}
          {numberOfSeasons || "N/A"}
        </p>
        )}
        {budget && (
          <p className="flex items-center text-gray-700">
          <CircleDollarSign className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Budget:</span>{" "}
          ${formatNumber(budget) || "N/A"}
        </p>
        )}
        {revenue && (
          <p className="flex items-center text-gray-700">
          <CircleDollarSign className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Revenue:</span>{" "}
          ${formatNumber(revenue) || "N/A"}
        </p>
        )}
        {runTime && (
          <p className="flex items-center text-gray-700">
          <Hourglass className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Run time:</span>{" "}
          {convertMinutesToHoursAndMinutes(runTime) || "N/A"}
        </p>
        )}
        {numberOfEpisodes && (
          <p className="flex items-center text-gray-700">
          <Info className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Episodes:</span>{" "}
          {numberOfEpisodes}
        </p>
        )}
        <p className="flex items-center text-gray-700">
          <Languages className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Language:</span>{" "}
          {tmdbLanguageMap[language as keyof typeof tmdbLanguageMap]}
        </p>
        {network && network.length > 0 && (
          <p className="flex items-center text-gray-700">
          <Tag className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Network:</span>{" "}
          <span className="line-clamp-1">
            {network.map((network) => (
              <span key={network.id}>{network.name}</span>
            ))}
          </span>
        </p>
        )}
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">External Links</h2>
        <ul className="flex flex-wrap gap-4">
          {platforms.map(
            (platform) =>
              platform.id && (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link flex w-[75px] flex-col items-center justify-center"
                >
                  <img
                    src={
                      platformLogos[platform.name as keyof typeof platformLogos]
                    }
                    alt=""
                    style={{
                      width: "full",
                      height: "40px",
                    }}
                  />
                  <span>{platform.name}</span>
                </a>
              )
          )}
        </ul>
      </section>

      {watchProvider["IN"]?.flatrate?.length ? (
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Streaming Platforms</h2>
          <ul className="flex gap-4">
            {watchProvider["IN"]?.flatrate?.map((provider) => (
              <li
                key={provider.provider_id}
                className="flex items-center gap-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="size-[50px] rounded-xl border border-black"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <></>
      )}
      {watchProvider["IN"]?.buy?.length ? (
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Streaming Platforms</h2>
          <ul className="flex gap-4">
            {watchProvider["IN"]?.buy?.map((provider) => (
              <li
                key={provider.provider_id}
                className="flex items-center gap-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="size-[50px] rounded-xl border border-black"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <></>
      )}
    </div>
  )
}
