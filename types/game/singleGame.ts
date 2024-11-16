interface SystemRequirements {
  minimum: string
  recommended: string
}

interface Platform {
  platform: {
    id: number
    name: string
    slug: string
    image?: string
    year_start?: number
    year_end?: number
    games_count: number
    image_background: string
  }
  released_at: string
  requirements: SystemRequirements
}

interface Store {
  id: number
  url: string
  store: {
    id: number
    name: string
    slug: string
    domain: string
    games_count: number
    image_background: string
  }
}

interface Genre {
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

interface Reaction {
  [key: number]: number
}

interface MetacriticPlatform {
  metascore: number
  url: string
  platform: {
    platform: number
    name: string
    slug: string
  }
}

export interface Game {
  id: number
  slug: string
  name: string
  name_original: string
  description: string
  metacritic: number
  metacritic_platforms: MetacriticPlatform[]
  released: string
  updated: string
  background_image: string
  background_image_additional: string
  website: string
  rating: number
  rating_top: number
  ratings: Rating[]
  reactions: Reaction
  added: number
  added_by_status: {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  reviews_text_count: number
  ratings_count: number
  suggestions_count: number
  alternative_names: string[]
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: null | object
  reviews_count: number
  saturated_color: string
  dominant_color: string
  parent_platforms: Platform[]
  platforms: Platform[]
  stores: Store[]
  publishers: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }[]
  developers: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }[]
  esrb_rating: {
    id: number
    name: string
    slug: string
  }
  genres: Genre[]
  tags: Genre[]
}

//game DLC Types

interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

interface AddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

interface PlatformInfo {
  id: number
  name: string
  slug: string
  image: string | null
  year_start: number | null
  year_end: number | null
  games_count: number
  image_background: string
}

interface Store {
  id: number
  store: {
    id: number
    name: string
    slug: string
    domain: string
    games_count: number
    image_background: string
  }
}

interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Tag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

interface ShortScreenshot {
  id: number
  image: string
}

export interface GameDlc {
  id: number
  slug: string
  name: string
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: Rating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: AddedByStatus
  metacritic: number
  playtime: number
  suggestions_count: number
  updated: string
  user_game: any
  reviews_count: number
  saturated_color: string
  dominant_color: string
  platforms: {
    platform: PlatformInfo
    released_at: string
    requirements_en: any
    requirements_ru: any
  }[]
  parent_platforms: { platform: PlatformInfo }[]
  genres: Genre[]
  stores: Store[]
  clip: any
  tags: Tag[]
  esrb_rating: { id: number; name: string; slug: string }
  short_screenshots: ShortScreenshot[]
}
