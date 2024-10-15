import { Play, Video } from "lucide-react"
import React from "react"

export function AnimeVideos({ animeVideos }: any) {
  // console.log(animeVideos)
  return (
    <section>
      <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900">
        <Video className="mr-2" />
        Anime Videos
      </h2>
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        <div className="flex w-fit space-x-4 p-4 pr-5">
          {animeVideos.map((video: any) => (
            <div className="w-[400px] duration-300 hover:scale-105">
              <div key={video.id} className="group relative aspect-video">
                <img
                  src={video.trailer.images.medium_image_url}
                  alt={video.title}
                  className="aspect-auto h-auto w-[480px] rounded-lg object-cover"
                />
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg transition-opacity duration-300 group-hover:bg-black group-hover:bg-opacity-50">
                  <Play className="size-12 text-white duration-300 group-hover:scale-125" />
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
