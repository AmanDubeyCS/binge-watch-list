export function mergeData(api1: any[], api2: any[]) {
  return api1.map((item1) => {
    const matchingItem = api2.find((item2) => item2.id === item1.id)
    return {
      ...item1, // Spread API 1 data
      ...matchingItem, // Override/add data from API 2
      id: item1.id, // Ensure the id stays consistent
    }
  })
}

export function mergeAnimeData(api1: any[], api2: any[]) {
  return api1.map((item1) => {
    const matchingItem = api2.find((item2) => item2.mal_id === item1.mal_id)
    return {
      ...item1, // Spread API 1 data
      ...matchingItem, // Override/add data from API 2
      id: item1.mal_id, // Ensure the id stays consistent
    }
  })
}
