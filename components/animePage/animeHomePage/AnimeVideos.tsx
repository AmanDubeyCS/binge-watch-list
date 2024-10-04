import { Play, Video } from "lucide-react"
import React from "react"

export function AnimeVideos({ animeVideos }: any) {
    // console.log(animeVideos)
  return (
    <section>
      <h2 className="mb-4 text-2xl flex items-center font-semibold text-gray-900">
        <Video className="mr-2" />
        Anime Videos
      </h2>
      <div className="w-full overflow-x-scroll whitespace-nowrap hide-scrollbar">
        <div className="flex w-fit space-x-4 p-4 pr-5">
          {animeVideos.map((video) => (
            <div className="w-[400px] hover:scale-105 duration-300">
              <div key={video.id} className="group relative aspect-video ">
                <img
                  src={video.trailer.images.medium_image_url}
                  alt={video.title}
                  className="h-auto w-[480px] rounded-lg object-cover aspect-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black rounded-lg cursor-pointer group-hover:bg-opacity-50 transition-opacity duration-300 ">
                  <Play className="h-12 w-12 text-white group-hover:scale-125 duration-300" />
                </div>
              </div>
              <h3 className="mt-2 text-wrap text-sm font-medium text-gray-900">
                {video.entry.title} ~{video.title}~
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
