const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchFromJikan = async (url: string, delayTime: number) => {
  await delay(delayTime)
  const response = await fetch(url, {
    next: { revalidate: 60 },
  })
  return response.json()
}
