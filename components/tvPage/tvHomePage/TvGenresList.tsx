"use client"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

interface Props {
  id: number
  name: string
}



export function TvGenresList({ categorys, genraImage }: { categorys: Props[], genraImage?: any }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (genresID: number) => {
    router.push(`${pathname}/genres/${genresID}`)
  }
  return (
    <section className="py-12 text-black">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold">Popular Categories</h2>
        <div className="overflow-x-scroll hide-scrollbar ">
          <div className="flex w-[2700px] flex-wrap gap-5">
            {categorys.map((genre) => (
              <div
                key={genre.id}
                onClick={() => handleClick(genre.id)}
                className="group relative h-[180px] w-[250px] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <img
                  src={genraImage[genre.id]}
                  alt={`${genre.name} genre`}
                  className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {genre.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
