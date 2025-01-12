import { useQuery } from "@tanstack/react-query"

const fetchData = async (type: string, query: string) => {
  const res = await fetch(`/api/search?type=${type}&q=${query}`)
  if (!res.ok) throw new Error("Failed to fetch data")
  return res.json()
}

export const useSearchData = (type: string, query: string) => {
  return useQuery({
    queryKey: ["search", type, query],
    queryFn: () => fetchData(type, query),
    enabled: !!query,
  })
}
