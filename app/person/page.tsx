import React from "react"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { configTMDB } from "@/apiConfig"
import { PersonCard } from "@/components/PersonCard"

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

export default async function PersoneData({}) {
  const personList = await fetchFromTMDB(configTMDB.getPopularPersons)
  return (
    <div>
      {personList && (
        <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Popular People
            </h1>
            <div className="flex flex-wrap justify-center gap-2">
              {personList.results.map((person: Person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
