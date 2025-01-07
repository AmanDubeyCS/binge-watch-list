import React from "react"
import { genresList } from "./gamedata"
import Link from "next/link"

export function GameGenresList() {
  return (
    <section className="py-12">
      <div className="">
        <h2 className="mb-6 px-4 text-3xl font-bold">Popular Categories</h2>
        <div className="hide-scrollbar overflow-x-scroll px-4">
          <div
            style={{
              width: `${Math.round(genresList.results.length / 2) * 270}px`,
            }}
            className="flex flex-wrap gap-5 py-2"
          >
            {genresList.results.map((genre) => (
              <Link
                key={genre.id}
                href={`/games/discover?genres=${genre.slug}`}
                className="group relative h-[180px] w-[250px] cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <img
                  src={genre.image_background}
                  alt={`${genre.name} genre`}
                  className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-center text-2xl font-bold text-white">
                    {genre.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
