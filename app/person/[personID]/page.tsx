import React from "react"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { configTMDB } from "@/apiConfig"
import PersonPage from "@/components/PersonPage"

export default async function SinglePerson({ params }: { params: { personID: number } }) {
  const personID = params.personID
  const personData = await fetchFromTMDB(configTMDB.getPersonDetails(personID))

  return (
    <div>
      <PersonPage actorData={personData} />
    </div>
  )
}
