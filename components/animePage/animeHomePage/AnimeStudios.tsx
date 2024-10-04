import React from "react"

export function AnimeStudios({ studios }: any) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Anime Studios
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {studios &&
          studios.map((studio: any) => (
            <div key={studio.mal_id} className="text-center">
              <div className="mb-2 flex size-24 cursor-pointer items-center justify-center rounded-full bg-white shadow-md duration-300 hover:scale-105">
                <img
                  src={studio.images.jpg.image_url}
                  alt={studio.name}
                  className="size-16 object-contain duration-300 hover:scale-110"
                />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {studio.titles[0].title}
              </p>
            </div>
          ))}
      </div>
    </section>
  )
}
