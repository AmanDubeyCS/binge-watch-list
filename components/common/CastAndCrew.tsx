"use client"
import { ImageLoader } from "@/util/ImageLoader"
import Link from "next/link"
import React, { useState } from "react"
import { Icon } from "../icons"

type CrewMember = {
  id: number
  name: string
  department: string
  job: string
  profile_path: string
}
type cast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

type CastCrewData = {
  cast: cast[]
  crew: CrewMember[]
}

type CrewGroupedByDepartment = {
  [department: string]: CrewMember[]
}

export function CastAndCrew({ data }: { data: CastCrewData }) {
  const [activeTab, setActiveTab] = useState<"cast" | "crew">("cast")

  const groupByDepartment = (data: CrewMember[]) => {
    return data.reduce<CrewGroupedByDepartment>((acc, person) => {
      if (!acc[person.department]) {
        acc[person.department] = []
      }
      acc[person.department].push(person)
      return acc
    }, {})
  }

  const renderCrew = (crew: CrewMember[]) => {
    const data = groupByDepartment(crew)
    const entries = Object.entries(data)

    if (entries.length > 0) {
      return (
        <>
          {entries.map(([department, people]) => (
            <div key={department}>
              <h3 className="text-2xl font-bold">{department}</h3>
              <ul className="grid grid-cols-2 items-center justify-center gap-2 py-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {people.map((person) => (
                  <Link
                    key={person.id}
                    href={`/person/${person.id}`}
                    className="size-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
                  >
                    <div className="relative h-64">
                      <ImageLoader
                        src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
                        alt={person.name}
                        fallback={
                          <div className="flex aspect-[2/3] size-full items-center justify-center bg-[rgba(181,181,181,0.3)]">
                            <Icon.noPreview />
                          </div>
                        }
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="truncate text-lg font-bold text-indigo-700">
                        {person.name}
                      </h2>
                      <p className="mb-2 text-sm text-gray-500">
                        <span>As {person.job}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </>
      )
    }
    return null
  }

  const renderCastAndCrew = (character: cast) => (
    <Link
      key={character.id}
      href={`/person/${character.id}`}
      className="size-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
    >
      <div className="relative h-64">
        <ImageLoader
          src={`https://image.tmdb.org/t/p/w300/${character.profile_path}`}
          alt={character.name}
          fallback={
            <div className="flex aspect-[2/3] size-full items-center justify-center bg-[rgba(181,181,181,0.3)]">
              <Icon.noPreview />
            </div>
          }
          className="size-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="truncate text-lg font-bold text-indigo-700">
          {character.name}
        </h2>
        <p className="mb-2 text-sm text-gray-500">
          <span>As {character.character}</span>
        </p>
      </div>
    </Link>
  )
  return (
    <div className="w-fit p-2 sm:p-8">
      <nav className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab("cast")}
          className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === "cast" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
        >
          Cast
        </button>
        <button
          onClick={() => setActiveTab("crew")}
          className={`rounded-md px-3 py-2 text-sm font-medium ${activeTab === "crew" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"}`}
        >
          Crew
        </button>
      </nav>

      <div className="space-y-4">
        {activeTab === "cast" ? (
          <div className="grid grid-cols-2 items-center justify-center gap-2 px-2 py-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.cast.map(renderCastAndCrew)}
          </div>
        ) : (
          renderCrew(data.crew)
        )}
      </div>
    </div>
  )
}
