import { Play, Video } from "lucide-react"
import React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
interface EntryImage {
  jpg: {
    image_url: string
    small_image_url: string
    large_image_url: string
  }
  webp: {
    image_url: string
    small_image_url: string
    large_image_url: string
  }
}

interface Entry {
  mal_id: number
  url: string
  images: EntryImage
  title: string
}

interface TrailerImage {
  image_url: string
  small_image_url: string
  medium_image_url: string
  large_image_url: string
  maximum_image_url: string
}

interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
  images: TrailerImage
}

interface AnimeTrailer {
  title: string
  entry: Entry
  trailer: Trailer
}

export function AnimeVideos({ animeVideos }: { animeVideos: AnimeTrailer[] }) {
  // console.log(animeVideos[0].entry.images)
  return (
    <section>
      <h2 className="mb-4 flex items-center px-4 text-2xl font-semibold text-gray-900">
        <Video className="mr-2" />
        Anime Videos
      </h2>
      <div className="hide-scrollbar w-full overflow-x-scroll whitespace-nowrap px-4">
        <div className="flex w-fit space-x-4 p-4 pr-5">
          {animeVideos.map((video) => (
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-[300px] duration-300 hover:scale-105 md:w-[400px]">
                  <div
                    key={video.entry.mal_id}
                    className="group relative aspect-video"
                  >
                    <img
                      src={video.trailer.images.medium_image_url}
                      alt={video.entry.title}
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
              </DialogTrigger>
              <DialogContent className="bg-white p-0 sm:max-w-[1200px]">
                <h3 className="mt-2 text-wrap px-2 text-sm font-medium text-gray-900">
                  {video.entry.title} ~{video.title}~
                </h3>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.trailer.youtube_id}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
