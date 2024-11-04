import { Volume } from "@/types/manga/singleManga"
import { Book } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

export function MangaChapters({
  volumes,
  mangaId,
}: {
  volumes: Record<string, Volume>
  mangaId: string
}) {
  const router = useRouter()
  const handleChapter = (chapterID: any) => {
    router.push(`/manga/${mangaId}/${chapterID}`)
  }

  // console.log(volumes)
  return (
    <div className="flex-1 rounded-lg bg-white p-6 text-black shadow-md">
      {volumes && (
        <div className="flex flex-col gap-3">
          {Object.keys(volumes).map((volumeKey) => {
            const volume = volumes[volumeKey]
            return (
              <div key={volumeKey} className="flex flex-col gap-2">
                <h2 className="text-base font-bold">Volume {volume.volume}</h2>
                <ul className="flex flex-wrap gap-2">
                  {Object.keys(volume.chapters).map((chapterKey) => {
                    const chapter = volume.chapters[chapterKey]
                    return (
                      <li
                        key={chapter.id}
                        onClick={() => handleChapter(chapter.id)}
                        className="flex w-[170px] cursor-pointer gap-1 rounded-[4px] border border-gray-800 px-2 py-1 text-center text-[18px] leading-[normal] hover:bg-slate-500 hover:text-white"
                      >
                        <Book className="size-5 text-gray-600" />
                        Chapter {chapter.chapter}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
