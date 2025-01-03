import { configOMDB } from "@/apiConfig"

function isWithinOneMonth(dateString: string) {
  // Parse the input date (in YYYY-MM-DD format)
  const givenDate = new Date(dateString)

  // Get the current date
  const currentDate = new Date()

  // Calculate the date exactly one month before the current date
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(currentDate.getMonth() - 1)

  // Check if the given date is within the range
  return givenDate >= oneMonthAgo && givenDate <= currentDate
}

export const getIMDBData = async (imdbId: string, release: string) => {
  try {
    // Check if release date is within one month
    if (isWithinOneMonth(release)) {
      const simklResponse = await fetch(
        `https://api.simkl.com/tv/${imdbId}?extended=full&client_id=d64097101e7b3d427bba0abacf353b935f0cf848e711913660f816a4aa6ca588`
      )

      if (!simklResponse.ok) {
        console.error(`Simkl API Error: ${simklResponse.statusText}`)
        throw new Error(`Failed to fetch Simkl data: ${simklResponse.status}`)
      }

      return await simklResponse.json()
    } else {
      const imdbResponse = await fetch(configOMDB.getOmdbData(imdbId))

      if (!imdbResponse.ok) {
        console.error(`OMDb API Error: ${imdbResponse.statusText}`)
        throw new Error(`Failed to fetch OMDb data: ${imdbResponse.status}`)
      }

      return await imdbResponse.json()
    }
  } catch (error) {
    console.error("Error fetching IMDb data:", error)
    return null // Return null or handle the error as needed
  }
}
