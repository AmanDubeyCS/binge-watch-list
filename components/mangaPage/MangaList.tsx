// "use client"

// import React from "react"
// import { useRouter } from "next/navigation"
// import { MangaItem } from "@/types/manga/mangaTypes"

// import MangaCard from "./MangaCard"
// import TVShowCard from "../tvPage/tvHomePage/TvShowCard"

// export function MangaList({
//   mangaList,
//   title,
// }: {
//   mangaList: MangaItem[]
//   title: string
// }) {
//   const router = useRouter()

//   const handleClick = (mangaID: string) => {
//     router.push(`manga/${mangaID}`)
//   }

//   // console.log(mangaList[1])

//   return (
//     <section>
//       <div>
//         <h2 className="mb-6 text-3xl font-bold">{title}</h2>
//         <div className="hide-scrollbar overflow-x-scroll">
//           <div className="flex w-[3100px] flex-wrap gap-3 p-1.5">
//             {mangaList.map((manga: MangaItem) => {
//               const image = manga.relationships.filter(
//                 (data) => data.type === "cover_art"
//               )
//               return (
//                 <div onClick={() => handleClick(manga.id)} key={manga.id}>
//                   <TVShowCard
//                     key={manga.id}
//                     id={manga.id}
//                     name={
//                       manga.attributes?.title.en ||
//                       manga.attributes?.title.ja ||
//                       manga.attributes?.title["ja-ro"]
//                     }
//                     coverImage={`https://mangadex.org/covers/${manga.id}/${image[0].attributes.fileName}`}
//                     firstAirDate={manga.attributes.status}
//                     voteAverage={manga.rating.rating.average}
//                     voteCount={0}
//                     genreIds={manga.attributes.tags
//                       .filter((item) => item.attributes.group === "genre")
//                       .map((item) => item.attributes.name.en)}
//                     popularity={manga.rating.follows}
//                     mediaType="manga"
//                     statusData={[]}
//                   />
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
