"use client"
import { Calendar, Clock, Tv } from "lucide-react"
import React from "react"
import { formatDate } from "../AnimeInfoPage"
import { useRouter } from "next/navigation"

export function Crouselcard({
  animeID,
  title,
  type,
  duration,
  year,
  synopsis,
  image,
  index,
}: {
  animeID: number
  title: string
  type: string
  duration: string
  year: string
  synopsis: string
  image: string
  index: number
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`anime/${animeID}`)
  }
  return (
    <div
      onClick={handleClick}
      className="relative h-[500px] w-full min-w-[1550px] overflow-hidden rounded-lg bg-gray-900 text-white"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900 via-gray-900 to-transparent"></div>
      <div className="relative z-20 flex h-full flex-col justify-end p-8">
        <div className="mb-4 w-fit rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold hover:bg-pink-600">
          #{index + 1} Trending
        </div>
        <h1 className="mb-2 text-4xl font-bold leading-tight">{title}</h1>
        <div className="mb-4 flex items-center space-x-4">
          <span className="flex items-center">
            <Tv className="mr-1 size-4" /> {type}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 size-4" /> {duration}
          </span>
          <span className="flex items-center">
            <Calendar className="mr-1 size-4" /> {formatDate(year)}
          </span>
        </div>
        <p className="mb-6 line-clamp-5 max-w-2xl text-gray-300">{synopsis}</p>
        <div className="flex space-x-4">
          <button className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium hover:bg-pink-600">
            Watch Trailer
          </button>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
            Details
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900"></div>
        <img
          src={image}
          alt="Anime characters"
          className="size-full object-cover object-right"
        />
      </div>
    </div>
    // <div className="w-full max-w-3xl mx-auto overflow-hidden text-black shrink-0">
    //   <div className="md:flex">
    //     <div className="md:w-1/3 relative">
    //       <img
    //         src="https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
    //         alt="One Piece"
    //         className="w-full h-full object-cover"
    //       />
    //     </div>
    //     <div className="md:w-2/3 p-6">
    //       <div className="flex justify-between items-start mb-4">
    //         <h2 className="text-3xl font-bold text-primary">One Piece</h2>
    //         <div className="flex items-center">
    //           <Star className="w-5 h-5 text-yellow-400 mr-1" />
    //           <span className="font-semibold text-lg">8.72</span>
    //           <span className="text-sm text-muted-foreground ml-1">({1379203} users)</span>
    //         </div>
    //       </div>
    //       <div className="space-y-2 mb-4">
    //         <p className="text-sm text-muted-foreground flex items-center">
    //           <Calendar className="w-4 h-4 mr-2" /> Oct 20, 1999 to ?
    //         </p>
    //         <p className="text-sm text-muted-foreground flex items-center">
    //           <Clock className="w-4 h-4 mr-2" /> 24 min per ep
    //         </p>
    //         <p className="text-sm text-muted-foreground flex items-center">
    //           <Users className="w-4 h-4 mr-2" /> {2431778} members
    //         </p>
    //         <p className="text-sm text-muted-foreground flex items-center">
    //           <Heart className="w-4 h-4 mr-2" /> {227231} favorites
    //         </p>
    //       </div>
    //       <p className="text-sm mb-4 line-clamp-3">
    //         Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the King of the Pirates title that comes with it.
    //       </p>
    //       <div className="flex space-x-2">
    //         <button className="flex items-center">
    //           <Play className="w-4 h-4 mr-2" /> Watch Trailer
    //         </button>
    //         <button>More Info</button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="bg-gray-200 px-6 py-3">
    //     <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
    //       <span>Rank: #54</span>
    //       <span>Popularity: #19</span>
    //       <span>Studio: Toei Animation</span>
    //     </div>
    //   </div>
    // </div>
  )
}
