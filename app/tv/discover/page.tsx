import { configTMDB } from "@/apiConfig"
import { MovieDiscoverPage } from "@/components/movies/MovieDiscoverPage"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React, { Suspense } from "react"

export default async function page() {
  const [tvProviders, tvGenres, languages, certifications] = await Promise.all([
    fetchFromTMDB(configTMDB.getTvProviders),
    fetchFromTMDB(configTMDB.getTvGenres),
    fetchFromTMDB(configTMDB.getMovieLanguagesList),
    fetchFromTMDB(configTMDB.getTvcertificationsList),
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDiscoverPage
        movieProviders={tvProviders.results}
        movieGenres={tvGenres.genres}
        movielanguages={languages}
        certifications={certifications.certifications}
      />
    </Suspense>
  )
}
