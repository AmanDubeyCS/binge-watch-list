export interface Anime {
  mal_id: number
  url: string
  images: {
    jpg: ImageFormat
    webp: ImageFormat
  }
  trailer: {
    youtube_id: string
    url: string
    embed_url: string
    images: TrailerImages
  }
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
  broadcast: Broadcast
  producers: Producer[]
  licensors: Producer[]
  studios: Producer[]
  genres: Genre[]
  explicit_genres: any[]
  themes: Genre[]
  demographics: Genre[]
  relations: Relation[]
  theme: Theme
  external: ExternalLink[]
  streaming: Streaming[]
}

interface ImageFormat {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface TrailerImages {
  image_url: string
  small_image_url: string
  medium_image_url: string
  large_image_url: string
  maximum_image_url: string
}

interface Title {
  type: string
  title: string
}

interface Aired {
  from: string
  to: string
  prop: {
    from: DateDetails
    to: DateDetails
  }
  string: string
}

interface DateDetails {
  day: number
  month: number
  year: number
}

interface Broadcast {
  day: string
  time: string
  timezone: string
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

interface Relation {
  relation: string
  entry: RelatedEntry[]
}

interface RelatedEntry {
  mal_id: number
  type: string
  name: string
  url: string
}

interface Theme {
  openings: string[]
  endings: string[]
}

interface ExternalLink {
  name: string
  url: string
}

interface Streaming {
  name: string
  url: string
}
