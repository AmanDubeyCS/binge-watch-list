import Link from "next/link"
import React from "react"

interface Title {
  type: string;
  title: string;
}

interface Image {
  jpg: {
    image_url: string;
  };
}

interface Producer {
  mal_id: number;
  url: string;
  titles: Title[];
  images: Image;
  favorites: number;
  established: string; 
  about: string;
  count: number;
}


export function AnimeStudios({ studios }: {studios: Producer[]}) {

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Anime Studios
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {studios &&
          studios.map((studio) => (
            <Link
              href={`/anime/discover?producers=${studio.mal_id}`}
              key={studio.mal_id}
              className="text-center"
            >
              <div className="mb-2 flex size-24 cursor-pointer items-center justify-center rounded-full bg-white shadow-md duration-300 hover:scale-105">
                <img
                  src={studio.images.jpg.image_url}
                  alt={studio.titles[0].title}
                  className="size-16 object-contain duration-300 hover:scale-110"
                />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {studio.titles[0].title}
              </p>
            </Link>
          ))}
      </div>
    </section>
  )
}
