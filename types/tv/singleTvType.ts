interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

interface Episode {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string | null
}

interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  vote_average: number
}

interface WatchProvider {
  link: string
  flatrate: {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
  }[]
}

export interface Show {
  adult: boolean
  backdrop_path: string
  created_by: {
    id: number
    credit_id: string
    name: string
    original_name: string
    gender: number
    profile_path: string
  }[]
  episode_run_time: number[]
  first_air_date: string
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Episode
  name: string
  next_episode_to_air: Episode
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  seasons: Season[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  external_ids: {
    imdb_id: string | null
    freebase_mid: string | null
    freebase_id: string | null
    tvdb_id: number | null
    tvrage_id: string | null
    wikidata_id: string | null
    facebook_id: string | null
    instagram_id: string | null
    twitter_id: string | null
  }
  videos: {
    results: Video[]
  }
  "watch/providers": {
    results: Record<string, WatchProvider>
  }
  coverImage: string
  backdropImage: string
}
