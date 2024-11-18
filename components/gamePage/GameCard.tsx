"use client"
import { Star, Calendar } from "lucide-react"
import { Icon } from "../icons"
import { useRouter } from "next/navigation"

interface Platform {
  id: number
  name: string
  slug: string
}

interface PlatformData {
  platform: Platform
}

interface Category {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Tags {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

interface CardProps {
  id: number
  title: string
  image: string
  platforms: PlatformData[]
  genres: Category[]
  release: string
  tags: Tags[]
  rating: number
  grade: Rating[]
}

export function GameCard({
  id,
  title,
  image,
  platforms,
  genres,
  release,
  tags,
  rating,
  grade,
}: CardProps) {
  const router = useRouter()
  const tag = tags.filter(
    (tag) =>
      tag.id !== 40847 &&
      tag.id !== 40836 &&
      tag.id !== 42 &&
      tag.id !== 31 &&
      tag.id !== 40849 &&
      tag.language === "eng"
  )
  const highestRating = grade?.reduce(
    (max, rating) => (rating.percent > max.percent ? rating : max),
    { percent: 0, title: "" } // Initial value
  )

  //   console.log(highestRating);
  const gradeColor = (grade: string) => {
    switch (grade) {
      case "exceptional":
        return "#429321"
        break
      case "recommended":
        return "#4354b9"
        break
      case "meh":
        return "#fad961"
        break
      case "skip":
        return "#ff5764"
        break
      default:
        return null
    }
  }

  const platformLogos = {
    pc: <Icon.windowsIcon className="size-4" />,
    playstation: <Icon.playstationIcon className="size-4" />,
    xbox: <Icon.xboxIcon className="size-4" />,
    ios: <Icon.appleIcon className="size-4" />,
    android: <Icon.androidIcon className="size-4" />,
    mac: <Icon.appleIcon className="size-4" />,
    linux: <Icon.linuxIcon className="size-4" />,
    nintendo: <Icon.nintendoIcon className="size-4" />,
    atari: <Icon.atariIcon className="size-4" />,
    "commodore-amiga": <Icon.commodoreIcon className="size-4" />,
    sega: <Icon.segaIcon className="size-4" />,
    "3do": <Icon.threeDoIcon className="size-4" />,
    "neo-geo": <Icon.nintendoIcon className="size-4" />,
    web: <Icon.webIcon className="size-4" />,
  }

  const handleClick = (gameId: number) => {
    router.push(`/games/${gameId}`)
  }
  return (
    <div
      onClick={() => handleClick(id)}
      className="w-full cursor-pointer overflow-hidden rounded-lg border bg-white text-black shadow-sm"
    >
      {/* Game Cover Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img src={image} alt={image} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="space-y-2 p-3 text-black">
        {/* Platforms and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {platforms?.map((item) => (
              <div key={item.platform.id} className="platform-icon">
                {
                  platformLogos[
                    item.platform.slug as keyof typeof platformLogos
                  ]
                }
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>

        {/* Game Name and Highest Rating Badge */}
        <div className="flex h-[45px] items-center gap-2">
          <h2 className="text-wrap text-lg font-bold leading-tight">
            {title}{" "}
            <span
              style={{ background: `${gradeColor(highestRating.title)}` }}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-white"
            >
              {highestRating.title}
            </span>
          </h2>
        </div>

        {/* Release Date and Genres */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="mr-1 size-3" />
            <span>{release}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genres) => (
              <span
                key={genres.id}
                className="rounded-full border border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                {genres.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="line-clamp-1 flex flex-wrap gap-1 pt-2">
          {tag.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
