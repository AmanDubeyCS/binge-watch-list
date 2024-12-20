import { config } from "@/apiConfig"
import Overview from "@/components/animePage/Overview"
import { fetchFromJikan } from "@/util/fetchFromJikan"

export default async function AnimePage({
  params,
}: {
  params: { animeID: number }
}) {
  const animeID = params.animeID
  const animeData = await fetchFromJikan(config.getSingleAnime(animeID), 250)

  const animeInfo = await animeData.data

  return <Overview animeInfo={animeInfo} />
}
