import { configTMDB } from "@/apiConfig"
import { MovieDiscoverPage } from "@/components/movies/MovieDiscoverPage"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React, { Suspense } from "react"

export default async function page() {
  const [movieProviders, movieGenres, languages, certifications] =
    await Promise.all([
      fetchFromTMDB(configTMDB.getMovieProviders),
      fetchFromTMDB(configTMDB.getMovieGenres),
      fetchFromTMDB(configTMDB.getMovieLanguagesList),
      fetchFromTMDB(configTMDB.getMoviecertificationsList),
    ])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDiscoverPage
        movieProviders={movieProviders.results}
        movieGenres={movieGenres.genres}
        movielanguages={languages}
        certifications={certifications.certifications}
      />
    </Suspense>
  )
}
