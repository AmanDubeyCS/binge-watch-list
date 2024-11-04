export const fetchFromTMDB = async (url: string) => {
  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  })
  return response.json()
}
