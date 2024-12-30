import React from "react"

import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { configTMDB } from "@/apiConfig"
import Image from "next/image"
import {
  CalendarIcon,
  DollarSignIcon,
  GlobeIcon,
  LanguagesIcon,
} from "lucide-react"
import { MovieDetails } from "@/types/movie/singleMovie"

export default async function SingleMoviePage({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  try {
    const movieInfo: MovieDetails = await fetchFromTMDB(
      configTMDB.getSingleMovie({ movieID })
    )

    return (
      <section>
        <div className="">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">Movie Details</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CalendarIcon className="mr-2 size-5" />
                  <span>
                    Release Date:{" "}
                    {new Date(movieInfo.release_date).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex items-center">
                  <DollarSignIcon className="mr-2 size-5" />
                  <span>Budget: ${movieInfo.budget.toLocaleString()}</span>
                </li>
                <li className="flex items-center">
                  <DollarSignIcon className="mr-2 size-5" />
                  <span>Revenue: ${movieInfo.revenue.toLocaleString()}</span>
                </li>
                <li className="flex items-center">
                  <GlobeIcon className="mr-2 size-5" />
                  <span>
                    Homepage:{" "}
                    <a
                      href={movieInfo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {movieInfo.homepage}
                    </a>
                  </span>
                </li>
                <li className="flex items-center">
                  <LanguagesIcon className="mr-2 size-5" />
                  <span>
                    Original Language:{" "}
                    {movieInfo.original_language.toUpperCase()}
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">
                Production Information
              </h2>
              <h3 className="mb-2 font-semibold">Production Companies:</h3>
              <ul className="mb-4 space-y-2">
                {movieInfo.production_companies.map((company) => (
                  <li key={company.id} className="flex items-center">
                    {company.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                        alt={company.name}
                        width={50}
                        height={25}
                        className="mr-2"
                      />
                    )}
                    <span>{company.name}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mb-2 font-semibold">Production Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {movieInfo.production_countries.map((country) => (
                  <span
                    key={country.iso_3166_1}
                    className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-800"
                  >
                    {country.name}
                  </span>
                ))}
              </div>
              <h3 className="mb-2 mt-4 font-semibold">Spoken Languages:</h3>
              <div className="flex flex-wrap gap-2">
                {movieInfo.spoken_languages.map((language) => (
                  <span
                    key={language.iso_639_1}
                    className="rounded-full border border-gray-300 px-2 py-1 text-sm text-gray-600"
                  >
                    {language.english_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
