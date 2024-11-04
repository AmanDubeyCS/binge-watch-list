import React from "react"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { configTMDB } from "@/apiConfig"

export default async function SinglePerson({ params }: any) {
  const personID = params.personID
  const personData = await fetchFromTMDB(configTMDB.getPersonDetails(personID))
  // console.log(personData)
  return <div></div>
}
