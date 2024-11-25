interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}
interface Provider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface CountryStreamingInfo {
  link: string
  flatrate?: Provider[]
  buy?: Provider[]
  ads?: Provider[]
}

interface StreamingAvailability {
  [countryCode: string]: CountryStreamingInfo
}

export interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null | {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  coverImage: string
  backdropImage: string
  external_ids: {
    imdb_id: string
    freebase_mid: string | null
    freebase_id: string | null
    tvdb_id: number | null
    tvrage_id: number | null
    wikidata_id: string | null
    facebook_id: string | null
    instagram_id: string | null
    twitter_id: string | null
  }
  videos: {
    results: any
  }
  "watch/providers": {
    results: StreamingAvailability
  }
}
