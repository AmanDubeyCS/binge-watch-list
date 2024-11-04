"use client"
import React from "react"
import { Award, Film, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface KnownFor {
  title: string
  media_type: string
}

interface Person {
  id: number
  name: string
  gender: number
  known_for_department: string
  popularity: number
  profile_path: string | null
  known_for: KnownFor[]
}

export const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  const router = useRouter()

  const handleClick = (personId: number) => {
    router.push(`person/${personId}`)
  }
  return (
    <div
      onClick={() => handleClick(person.id)}
      className="flex max-w-md cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="w-1/3 bg-gray-200">
        {person.profile_path ? (
          <img
            className="size-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
          />
        ) : (
          <img
            className="size-full object-cover"
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
          />
        )}
      </div>
      <div className="w-2/3 p-4">
        <h2 className="mb-2 truncate text-xl font-semibold text-gray-800">
          {person.name}
        </h2>
        <p className="mb-2 text-sm text-gray-600">
          {person.known_for_department}
        </p>
        <div className="mb-2 flex items-center gap-1">
          <h3 className="flex items-center text-sm font-semibold text-gray-700">
            <Star className="mr-1 size-4 text-yellow-400" />
            Popularity:
          </h3>

          <span className="text-sm text-gray-700">
            {person.popularity.toFixed(1)}
          </span>
        </div>
        <div className="mb-2 flex items-center gap-1">
          <h3 className="flex items-center text-sm font-semibold text-gray-700">
            <Film className="mr-1 size-4 text-gray-400" />
            Gender:
          </h3>

          <span className="text-sm text-gray-700">
            {person.gender === 1
              ? "Female"
              : person.gender === 2
                ? "Male"
                : "Other"}
          </span>
        </div>
        <div className="mt-2">
          <h3 className="mb-1 flex items-center text-sm font-semibold text-gray-700">
            <Award className="mr-1 size-4 text-indigo-400" />
            Known For:
          </h3>
          <ul className="text-sm text-gray-600">
            {person.known_for.slice(0, 2).map((work, index) => (
              <li key={index} className="truncate">
                {work.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
