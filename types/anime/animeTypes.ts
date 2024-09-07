interface ImageURLs {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface Images {
  jpg: ImageURLs
  webp: ImageURLs
}

interface Trailer {
  youtube_id: string
  url: string
  embed_url: string
}

interface Title {
  type: string
  title: string
}

interface AiredProp {
  day: number
  month: number
  year: number
}

interface Aired {
  from: string
  to: string
  prop: {
    from: AiredProp
    to: AiredProp
  }
  string: string
}

interface Producer {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface AnimeData {
  mal_id: number
  url: string
  images: Images
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: {
    day: string
    time: string
    timezone: string
    string: string
  }
  producers: Producer[]
  licensors: Producer[]
  studios: Producer[]
  genres: Genre[]
  explicit_genres: Genre[]
  themes: Genre[]
  demographics: Genre[]
}

interface PaginationItems {
  count: number
  total: number
  per_page: number
}

interface Pagination {
  last_visible_page: number
  has_next_page: boolean
  items: PaginationItems
}

export interface AnimeResponse {
  data: AnimeData[]
  pagination: Pagination
}
