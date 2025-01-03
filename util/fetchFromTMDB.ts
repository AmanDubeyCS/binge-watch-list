export const fetchFromTMDB = async (url: string) => {
  const response = await fetch(url, {
    next: { revalidate: 300 },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  })
  return response.json()
}

export const fetchFromMangaDex = async (url: string) => {
  const response = await fetch(url, {
    next: { revalidate: 300 },
  })
  return response.json()
}
