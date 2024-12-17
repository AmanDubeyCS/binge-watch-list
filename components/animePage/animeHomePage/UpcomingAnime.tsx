// import { AnimeData } from "@/types/anime/animeTypes"
// import React from "react"
// import Animecard from "./AnimeCard"

// export function UpcomingAnime({
//   upcomingAnime,
// }: {
//   upcomingAnime: AnimeData[]
// }) {
//   const uniqueData = upcomingAnime.filter(
//     (item, index, self) => index === self.findIndex((t) => t.mal_id === item.mal_id)
//   );
//   return (
//     <section>
//       <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//         Upcoming Anime
//       </h2>
//       <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
//         <div
//           style={{ width: `${Math.round(uniqueData.length / 2) * 375}px` }}
//           className="flex flex-wrap gap-3 py-3 pr-5"
//         >
//           {uniqueData.map((anime) => (
//             <Animecard
//               key={anime.mal_id}
//               animeID={anime.mal_id}
//               title_en={anime.title_english || anime.title}
//               image={anime.images.webp.image_url}
//               rating={anime.score}
//               genres={anime.genres}
//               ranking={anime.rank}
//               scoredBy={anime.scored_by}
//               status={anime.status}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
