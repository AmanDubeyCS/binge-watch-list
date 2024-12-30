import React from "react"

import { configTMDB } from "@/apiConfig"
import { TvProviders } from "@/components/tvPage/tvHomePage/TvProviders"
import { TvGenresList } from "@/components/tvPage/tvHomePage/TvGenresList"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { Tv } from "lucide-react"
import { ListCards } from "@/components/common/ListContent"

export default async function MoviesPage() {
  const [trendingMovies, popularMovies, movieProviders, movieGenres] =
    await Promise.all([
      fetchFromTMDB(configTMDB.getMoviesList),
      fetchFromTMDB(configTMDB.getPopularMovie),
      fetchFromTMDB(configTMDB.getMovieProviders),
      fetchFromTMDB(configTMDB.getMovieGenres),
    ])

  const movieGenraImage = {
    28: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    12: "https://image.tmdb.org/t/p/w500/8I37NtDffNV7AZlDa7uDvvqhovU.jpg",
    16: "https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    35: "https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
    80: "https://image.tmdb.org/t/p/w500/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg",
    99: "https://image.tmdb.org/t/p/w500/snl9dddlnu2yKXXix2ua7G8UWoe.jpg",
    18: "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    10751: "https://image.tmdb.org/t/p/w500/nHf61UzkfFno5X1ofIhugCPus2R.jpg",
    14: "https://image.tmdb.org/t/p/w500/5DNRr2juXdwtvktwXxwuk9Usk8O.jpg",
    36: "https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg",
    27: "https://image.tmdb.org/t/p/w500/aePBN8ffLCHoUXp8lkA5P29CXdx.jpg",
    10402: "https://image.tmdb.org/t/p/w500/gbmkFWdtihe1VfydTDsieQ6VfGL.jpg",
    9648: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
    10749: "https://image.tmdb.org/t/p/w500/AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg",
    878: "https://image.tmdb.org/t/p/w500/bmemsraCG1kIthY74NjDnnLRT2Q.jpg",
    10770: "https://image.tmdb.org/t/p/w500/wRbjVBdDo5qHAEOVYoMWpM58FSA.jpg",
    53: "https://image.tmdb.org/t/p/w500/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg",
    10752: "https://image.tmdb.org/t/p/w500/h7Lcio0c9ohxPhSZg42eTlKIVVY.jpg",
    37: "https://image.tmdb.org/t/p/w500/nPJAo1NDfETSwoYl8CYE2DUBUk3.jpg",
  }

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-4 pb-10 md:px-8">
      {trendingMovies && (
        <ListCards
          movieData={trendingMovies.results}
          title="Currently Trending"
          titleIcon={<Tv className="mr-2" />}
        />
      )}
      {popularMovies && (
        <ListCards
          movieData={popularMovies.results}
          title="Popular on Movie"
          titleIcon={<Tv className="mr-2" />}
        />
      )}
      {movieProviders && <TvProviders TvProviders={movieProviders.results} />}
      {movieGenres && (
        <TvGenresList
          categorys={movieGenres.genres}
          genraImage={movieGenraImage}
        />
      )}
    </main>
  )
}
