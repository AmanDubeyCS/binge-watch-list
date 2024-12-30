import { checkdata } from "@/util/fetchFromMangaUpdates"
import { redirect } from "next/navigation"

export default async function page({
  params,
}: {
  params: { mangaDetails: string }
}) {
  const mangaID = params.mangaDetails
  const ID = await checkdata(mangaID)
  if (ID) {
    redirect(`/manga/${mangaID}/${ID}`)
  } else {
    redirect(`/manga/${mangaID}/1`)
  }
}
