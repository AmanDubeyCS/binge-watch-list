// "use client"
// import { Tv } from "lucide-react"
// import React from "react"
// import Animecard from "./AnimeCard"
// import { AnimeData } from "@/types/anime/animeTypes"
// import TVShowCard from "@/components/tvPage/tvHomePage/TvShowCard"
// import { DataStore, useDataStore } from "@/store/allDataStore"

// export function CurrentlyAiring({
//   currentlyAiring,
// }: {
//   currentlyAiring: AnimeData[]
// }) {
//   const { data } = useDataStore() as DataStore;
//   const uniqueData = currentlyAiring.filter(
//     (item, index, self) =>
//       index === self.findIndex((t) => t.mal_id === item.mal_id)
//   )
//   return (
//     <section>
//       <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900">
//         <Tv className="mr-2" />
//         Currently Airing
//       </h2>
//       <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
//         <div
//           style={{ width: `${Math.round(uniqueData.length / 2) * 375}px` }}
//           className="flex flex-wrap gap-3 py-3 pr-5"
//         >
//           {uniqueData.map((anime) => (
//             <TVShowCard
//               key={anime.mal_id}
//               id={anime.mal_id}
//               name={anime.title_english || anime.title}
//               coverImage={anime.images.webp.image_url}
//               firstAirDate={anime.status}
//               voteAverage={anime.score}
//               voteCount={anime.scored_by}
//               genreIds={anime.genres}
//               popularity={anime.rank}
//               mediaType="anime"
//               statusData={data}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
