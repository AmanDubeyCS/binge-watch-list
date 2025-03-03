"use client"
import { useState } from "react"
import { Film, Tv, Book, Gamepad } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link"

// Mock data for popular content
const popularMovies = [
  {
    id: 1,
    title: "The Batman",
    year: 2022,
    rating: 8.1,
    image: "https://image.tmdb.org/t/p/w300//q0bCG4NX32iIEsRFZqRtuvzNCyZ.jpg",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    year: 2022,
    rating: 8.4,
    image: "https://image.tmdb.org/t/p/w300//pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
  },
  {
    id: 3,
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w300//m5x8D0bZ3eKqIVWZ5y7TnZ2oTVg.jpg",
  },
  {
    id: 4,
    title: "Dune",
    year: 2021,
    rating: 8.0,
    image: "https://image.tmdb.org/t/p/w300//skPPVeHoTTVVSJlb0Ib5vrqiuA4.jpg",
  },
  {
    id: 5,
    title: "No Time to Die",
    year: 2021,
    rating: 7.3,
    image: "https://image.tmdb.org/t/p/w300//h0tunBO4tMjvKVVG7fXqHgwOr5C.jpg",
  },
  {
    id: 6,
    title: "Dune",
    year: 2021,
    rating: 8.0,
    image: "https://image.tmdb.org/t/p/w300//vP7Yd6couiAaw9jgMd5cjMRj3hQ.jpg",
  },
]

const popularShows = [
  {
    id: 1,
    title: "The Last of Us",
    year: 2023,
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
  },
  {
    id: 2,
    title: "Stranger Things",
    year: 2016,
    rating: 8.7,
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  },
  {
    id: 3,
    title: "Breaking Bad",
    year: 2008,
    rating: 9.5,
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  },
  {
    id: 4,
    title: "Game of Thrones",
    year: 2011,
    rating: 9.3,
    image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
  },
  {
    id: 5,
    title: "The Mandalorian",
    year: 2019,
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
  },
  {
    id: 6,
    title: "The Mandalorian",
    year: 2019,
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w300//31GlRQMiDunO8cl3NxTz34U64rf.jpg",
  },
  
]

const popularAnime = [
  {
    id: 1,
    title: "Attack on Titan",
    year: 2013,
    rating: 9.2,
    image: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
  },
  {
    id: 2,
    title: "Demon Slayer",
    year: 2019,
    rating: 8.9,
    image: "https://image.tmdb.org/t/p/w500/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    year: 2020,
    rating: 8.7,
    image: "https://image.tmdb.org/t/p/w500/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
  },
  {
    id: 4,
    title: "One Piece",
    year: 1999,
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w500/e3NBGiAifW9Xt8xD5tpARskjccO.jpg",
  },
  {
    id: 5,
    title: "My Hero Academia",
    year: 2016,
    rating: 8.5,
    image: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
  },
  {
    id: 6,
    title: "My Hero Academia",
    year: 2016,
    rating: 8.5,
    image: "https://image.tmdb.org/t/p/w500/aCGdpgNkgz66R1winFkTFsMAhlC.jpg",
  },
]

const popularManga = [
  {
    id: 1,
    title: "One Punch Man",
    year: 2012,
    rating: 8.9,
    image: "https://cdn.myanimelist.net/images/manga/3/80661.jpg",
  },
  {
    id: 2,
    title: "Chainsaw Man",
    year: 2018,
    rating: 9.0,
    image: "https://cdn.myanimelist.net/images/manga/3/216464.jpg",
  },
  {
    id: 3,
    title: "Berserk",
    year: 1989,
    rating: 9.4,
    image: "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
  },
  {
    id: 4,
    title: "Vagabond",
    year: 1998,
    rating: 9.2,
    image: "https://cdn.myanimelist.net/images/manga/1/259070.jpg",
  },
  {
    id: 5,
    title: "Vinland Saga",
    year: 2005,
    rating: 9.0,
    image: "https://cdn.myanimelist.net/images/manga/2/188925.jpg",
  },
  {
    id: 6,
    title: "Vinland Saga",
    year: 2005,
    rating: 9.0,
    image: "/api/mangaImage/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg",
  },
]

const popularGames = [
  {
    id: 1,
    title: "The Legend of Zelda: Tears of the Kingdom",
    year: 2023,
    rating: 9.5,
    image:
      "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
  },
  {
    id: 2,
    title: "Elden Ring",
    year: 2022,
    rating: 9.3,
    image:
      "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
  },
  {
    id: 3,
    title: "Baldur's Gate 3",
    year: 2023,
    rating: 9.6,
    image:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  },
  {
    id: 4,
    title: "God of War Ragnarök",
    year: 2022,
    rating: 9.2,
    image:
      "https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg",
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    year: 2018,
    rating: 9.7,
    image:
      "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
  },
  {
    id: 6,
    title: "Red Dead Redemption 2",
    year: 2018,
    rating: 9.7,
    image:
      "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
  },
]

export const ContentListings = () => {
  const [activeTab, setActiveTab] = useState("movies")

  return (
    <section className="bg-zinc-50 py-16" id="content">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Trending{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Content
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most popular content across all platforms in one place
          </p>
        </div>

        <Tabs
          defaultValue="movies"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="mx-auto mb-8 grid max-w-3xl grid-cols-5">
            <TabsTrigger value="movies" className="flex items-center gap-2">
              <Film className="size-4" />
              <span className="hidden sm:inline">Movies</span>
            </TabsTrigger>
            <TabsTrigger value="tv" className="flex items-center gap-2">
              <Tv className="size-4" />
              <span className="hidden sm:inline">TV Shows</span>
            </TabsTrigger>
            <TabsTrigger value="anime" className="flex items-center gap-2">
              <Tv className="size-4" />
              <span className="hidden sm:inline">Anime</span>
            </TabsTrigger>
            <TabsTrigger value="manga" className="flex items-center gap-2">
              <Book className="size-4" />
              <span className="hidden sm:inline">Manga</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad className="size-4" />
              <span className="hidden sm:inline">Games</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies" className="pt-4">
            <ContentGrid items={popularMovies} type="movies" />
          </TabsContent>

          <TabsContent value="tv" className="pt-4">
            <ContentGrid items={popularShows} type="shows" />
          </TabsContent>

          <TabsContent value="anime" className="pt-4">
            <ContentGrid items={popularAnime} type="anime" />
          </TabsContent>

          <TabsContent value="manga" className="pt-4">
            <ContentGrid items={popularManga} type="manga" />
          </TabsContent>

          <TabsContent value="games" className="pt-4">
            <ContentGrid items={popularGames} type="games" />
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/${activeTab}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Link>
        </div>
      </div>
    </section>
  )
}

interface ContentItemProps {
  id: number
  title: string
  year: number
  rating: number
  image: string
}
interface ContentItem {
  id: number
  title: string
  year: number
  rating: number
  image: string
  type: string
}

interface ContentGridProps {
  items: ContentItemProps[]
  type: string
}

const ContentGrid = ({ items, type }: ContentGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <ContentCard key={item.id} {...item} type={type} />
      ))}
    </div>
  )
}

const ContentCard = ({ title, image }: ContentItem) => {
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
