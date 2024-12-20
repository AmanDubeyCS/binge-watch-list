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
  const [currentVideo, setCurrentVideo] = useState(
    trailers.length > 0 ? trailers[0] : others[0]
  )

  if (videos.length < 1) {
    return
  }
  return (
    <div className="space-y-4 p-4">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo.key}`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video size-full rounded-lg"
        ></iframe>
      </div>
      <div className="hide-scrollbar flex space-x-4 overflow-scroll">
        {trailers.map((video) => (
          <div
            key={video.key}
            className="min-w-[250px] cursor-pointer"
            onClick={() => setCurrentVideo(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
              className="h-[200px] w-[250px] rounded-md object-cover"
            />
          </div>
        ))}
        {others.map((video) => (
          <div
            key={video.key}
            className="min-w-[250px] cursor-pointer"
            onClick={() => setCurrentVideo(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
              className="h-[200px] w-[250px] rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
