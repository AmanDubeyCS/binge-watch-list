import React from "react"
import Image from "next/image"

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

interface MovieDetails {
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
}

export default function MovieInfoPage({
  movieInfo,
}: {
  movieInfo: MovieDetails
}) {
  return (
    <div>
      <Image src={movieInfo.coverImage} alt="image" width={200} height={200} />
      {/* <Image src={movieInfo.backdropImage} alt='image' width={700} height={200} className='w-[700px] h-[200px]'/> */}
      <p>{movieInfo.title}</p>
    </div>
  )
}
