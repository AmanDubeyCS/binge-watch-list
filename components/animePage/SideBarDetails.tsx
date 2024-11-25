import { cn } from "@/lib/utils"
import { Anime } from "@/types/anime/singleAnime"
import { ImdbData } from "@/types/ImdbType"
import { Book, ExternalLink, Film, Info, Play, Tv } from "lucide-react"
import React from "react"

export default function SideBarDetails({
  animeInfo,
  imdbData,
}: {
  animeInfo: Anime
  imdbData: ImdbData
}) {
  function formatNumber(num: number | string) {
    const numericValue =
      typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num

    if (numericValue >= 1000) {
      return (numericValue / 1000).toFixed(1).replace(/\.0$/, "") + "k"
    }
    return numericValue?.toString()
  }

  const ratings = [
    {
      name: "IMDB",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg",
      votes: `${formatNumber(imdbData.imdbVotes) || "N/A"} votes`,
      bgColor: `bg-yellow-100`,
      rating:
        imdbData?.Ratings?.find(
          (r: { Source: string; Value: string }) =>
            r.Source === "Internet Movie Database"
        )?.Value.slice(0, 3) || "N/A",
    },
    {
      name: "MAL",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg",
      votes: `${formatNumber(animeInfo.scored_by)} votes`,
      bgColor: `bg-green-100`,
      rating: animeInfo.score ? animeInfo.score.toFixed(1) : "N/A",
    },
  ]

  return (
    <div className="w-[450px] space-y-6 text-black">
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Ratings</h2>

        <div className="grid grid-cols-2 gap-2">
          {ratings.map((rating, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "flex min-w-[120px] flex-col items-center gap-1 rounded-md border p-3",
                  rating.bgColor
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={rating.logo}
                    alt=""
                    style={{
                      width: "full",
                      height: "30px",
                    }}
                  />
                  <div className="text-[25px] font-bold">
                    {rating.rating}
                    <span className="text-base font-bold">
                      {rating.rating !== "N/A" && "/10"}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-zinc-500">{rating.votes}</div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">More Info</h2>
        <p className="flex items-center text-gray-700">
          <Tv className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Type:</span> {animeInfo.type}
        </p>
        <p className="flex items-center text-gray-700">
          <Film className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Episodes:</span>{" "}
          {animeInfo.episodes || "N/A"}
        </p>
        <p className="flex items-center text-gray-700">
          <Info className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Status:</span> {animeInfo.status}
        </p>
        <p className="flex items-center text-gray-700">
          <Book className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Source:</span> {animeInfo.source}
        </p>
        {/* <p className="flex items-center text-gray-700">
          <Tag className="mr-2 size-4 text-blue-500" />
          <span className="mr-1 font-semibold">Rating:</span>{" "}
          <span className="line-clamp-1">{animeInfo.rating}</span>
        </p> */}
      </section>
      {/* 
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Related Manga</h2>
            <div className="text-gray-700">
              <span className="font-semibold">Adaptation:</span>
              <a href="https://myanimelist.net/manga/131924/Tsue_to_Tsurugi_no_Wistoria" className="text-blue-500 hover:underline ml-2">
                Tsue to Tsurugi no Wistoria
              </a>
            </div>
          </section> */}

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">External Links</h2>
        <ul className="space-y-2">
          {animeInfo.external.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="flex items-center text-blue-500 hover:underline"
              >
                <ExternalLink className="mr-2 size-4" />
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {animeInfo.streaming.length > 0 && (
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Streaming Platforms</h2>
          <ul className="space-y-2">
            {animeInfo.streaming.map((platform, index) => (
              <li key={index}>
                <a
                  href={platform.url}
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <Play className="mr-2 size-4" />
                  {platform.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
