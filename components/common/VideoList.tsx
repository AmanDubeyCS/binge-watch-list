"use client"
import React, { useState } from "react"

interface Video {
  name: string
  key: string
  type: string
  published_at: string
}

export default function VideoList({ videos }: { videos: Video[] }) {
  const trailers = videos.filter((t) => t.type === "Trailer")
  const others = videos.filter((t) => t.type !== "Trailer")
  const [showVideos, setShowVideos] = useState(true)
  const [currentVideo, setCurrentVideo] = useState(
    trailers.length > 0 ? trailers[0] : others[0]
  )

  if (videos.length < 1) {
    return
  }
  return (
    <>
      {!showVideos && (
        <div
          onClick={() => setShowVideos((prev) => !prev)}
          className="h-10 bg-green-400"
        >
          videos
        </div>
      )}
      {showVideos && (
        <div className="flex flex-col gap-4 p-2">
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.key}`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-[16/9] size-full rounded-lg"
          ></iframe>

          {videos.length > 1 && (
            <div className="hide-scrollbar flex justify-start gap-4 overflow-x-auto">
              {trailers.map((video) => (
                <div
                  key={video.key}
                  onClick={() => setCurrentVideo(video)}
                  className="w-36 shrink-0 cursor-pointer md:w-64"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    className="h-20 w-full rounded-md object-cover md:h-36"
                  />
                  <p className="mt-2 truncate text-sm font-medium">
                    {video.name}
                  </p>
                </div>
              ))}
              {others.map((video) => (
                <div
                  key={video.key}
                  onClick={() => setCurrentVideo(video)}
                  className="w-36 shrink-0 cursor-pointer md:w-64"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    className="h-20 w-full rounded-md object-cover md:h-36"
                  />
                  <p className="mt-2 truncate text-sm font-medium">
                    {video.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
