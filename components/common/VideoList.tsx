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
        <div className="flex flex-col gap-4 p-2 lg:flex-row lg:p-10">
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.key}`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video size-full rounded-lg"
          ></iframe>

          <div className="hide-scrollbar flex max-h-[640px] max-w-[1200px] justify-center gap-4 overflow-scroll lg:flex-col">
            {trailers.map((video) => (
              <div
                key={video.key}
                className="shrink-0 cursor-pointer"
                onClick={() => setCurrentVideo(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                  alt={video.name}
                  className="h-auto w-[120px] rounded-md object-cover md:w-[180px] lg:w-auto"
                />
              </div>
            ))}
            {others.map((video) => (
              <div
                key={video.key}
                className="shrink-0 cursor-pointer"
                onClick={() => setCurrentVideo(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                  alt={video.name}
                  className="h-auto w-[120px] rounded-md object-cover md:w-[180px] lg:w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
