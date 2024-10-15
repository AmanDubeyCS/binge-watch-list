"use client"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  id: number
  name: string
}

export function TvGenresList({ categorys }: { categorys: Props[] }) {
  const router = useRouter()

  const handleClick = (genresID: number) => {
    router.push(`tv/genres/${genresID}`)
  }
  return (
    <section className="py-12 text-black">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categorys.map((category) => (
            <div key={category.id} onClick={() => handleClick(category.id)}>
              <div className="rounded-lg shadow-md transition-colors duration-300 hover:bg-slate-200">
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <ChevronRight className="size-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
