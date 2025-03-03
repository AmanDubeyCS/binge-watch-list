import React, { useEffect, useState } from "react"

export const ContentGrid = ({ type }: any) => {
  const [items, setItems] = useState([])

  const fetchItems = () => {
    switch (type) {
    //   case "movies":
    //     return useTrendingMovieList()
    //   case "shows":
    //     return useTrendingShowsList()
    //   case "anime":
    //     return useTrendingAnimeList()
    //   case "manga":
    //     return useTrendingMangaList()
    //   case "games":
    //     return useTrendingGamesList()
      default:
        return { data: [] }
    }
  }

  const { data } = fetchItems()
  console.log(data)
  useEffect(() => {
    if (data) setItems(data)
  }, [data])

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {/* {items.map((item) => (
        <ContentCard key={item.id} {...item} type={type} />
      ))} */}
    </div>
  )
}

const ContentCard = ({ title, image }: any) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>
  )
}
