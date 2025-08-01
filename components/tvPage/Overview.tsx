import React from "react"

interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export function Overview({ trailer }: { trailer: Video[] }) {
  const trailerData = trailer.filter((trailer) =>
    trailer.name.includes("Trailer") || trailer.name.includes("Official")
  )

  return (
    <div className="space-y-6 text-black md:col-span-2">
      {trailer.length > 0 && (
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${trailerData[0]?.key}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video size-full rounded-lg"
            ></iframe>
          </div>
        </section>
      )}
    </div>
  )
}
