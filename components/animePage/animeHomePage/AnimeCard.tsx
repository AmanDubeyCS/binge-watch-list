// "use client"
// import React, { useState } from "react"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { Star } from "lucide-react"
// import { Genre } from "@/types/anime/singleAnime"

// interface Props {
//   image: string
//   rating: number
//   title_en: string
//   title?: string
//   animeID: number
//   genres: Genre[]
//   ranking: number
//   scoredBy: number
//   status: string
// }

// export default function Animecard({
//   image,
//   rating,
//   title_en,
//   title,
//   animeID,
//   genres,
//   ranking,
//   scoredBy,
//   status,
// }: Props) {
//   const router = useRouter()

//   const handleClick = () => {
//     router.push(`/anime/${animeID}`)
//   }
//   return (
//     <div
//       onClick={handleClick}
//       className="flex w-[360px] cursor-pointer items-center justify-start overflow-hidden bg-white p-2 shadow-md duration-300 hover:scale-105"
//     >
//       <div className="flex gap-2">
//         <div className="relative w-[140px] shrink-0 overflow-hidden rounded-lg">
//           <ImageLoader
//             src={image}
//             alt=""
//             fallback={
//               <div className="flex h-auto w-[140px] items-center justify-center bg-white text-center text-black">
//                 <p>Image not available</p>
//               </div>
//             }
//           />
//         </div>
//         <div className="flex-1">
//           <div className="mb-2 w-fit rounded-lg border border-blue-700 px-2 py-1 text-sm font-medium uppercase text-black">
//             {status}
//           </div>
//           <h3 className="mb-2 line-clamp-2 text-wrap text-base font-semibold text-gray-800">
//             {title_en || title}
//           </h3>
//           {rating && (
//             <div className="mb-2 flex items-center">
//               <Star className="mr-1 size-5 fill-current text-yellow-500" />
//               <span className="mr-2 text-lg font-semibold text-gray-800">
//                 {rating || "N/A"}
//               </span>
//               <span className="text-sm text-gray-600">({scoredBy} users)</span>
//             </div>
//           )}
//           <div className="mb-3 flex items-center">
//             <span className="mr-2 text-sm font-medium text-gray-700">
//               Ranking:
//             </span>
//             <span className="text-sm font-semibold text-gray-800">
//               #{ranking || "N/A"}
//             </span>
//           </div>
//           <div className="mb-2 flex flex-wrap gap-1.5">
//             {genres.slice(0, 2).map((genra) => (
//               <p
//                 key={genra.mal_id}
//                 className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500"
//               >
//                 {genra.name}
//               </p>
//             ))}

//             {genres.length > 2 && (
//               <p className="rounded-lg border bg-gray-100 p-1 text-xs text-black duration-300 hover:scale-110 hover:border-gray-500">
//                 +{genres.length - 2}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// interface ImageLoaderProps {
//   src: string
//   alt: string
//   fallback?: JSX.Element
// }

// export const ImageLoader: React.FC<ImageLoaderProps> = ({
//   src,
//   alt,
//   fallback,
// }) => {
//   const [isLoaded, setIsLoaded] = useState(true)

//   const handleError = () => {
//     setIsLoaded(false)
//   }

//   return isLoaded ? (
//     <Image
//       src={src}
//       alt={alt}
//       onError={handleError}
//       width={300}
//       height={400}
//       className="h-[200px] w-[140px] shrink-0"
//     />
//   ) : (
//     fallback || null
//   )
// }
