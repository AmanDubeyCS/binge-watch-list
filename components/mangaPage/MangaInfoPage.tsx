'use client'
import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function MangaInfoPage({ mangaInfo, chapters, statistics }: any) {
  const router = useRouter()
  const image = mangaInfo.relationships.filter(
    (data: any) => data.type === "cover_art"
  )
  const mangaId = Object.keys(statistics.statistics)[0]
  const ratingData = statistics.statistics[mangaId]?.rating
  const volumes = chapters.volumes

  const handleChapter = (chapterID: any) => {
    router.push(`/manga/${mangaId}/${chapterID}`)
  }
  
  return (
    <div className="flex flex-col gap-4">
      {image && (
        <Image
          src={`https://mangadex.org/covers/${mangaInfo.id}/${image[0].attributes.fileName}`}
          alt="image"
          width={100}
          height={100}
        />
      )}
      <p>{mangaInfo.attributes.title.en}</p>
      <p>{mangaInfo.attributes.description.en}</p>
      <div>
        {mangaInfo.attributes.tags?.map((tag: any) => (
          <p key={tag.id}>{tag.attributes.name.en}</p>
        ))}
      </div>
      <p>{ratingData.bayesian.toFixed(2) || "N/A"}</p>
      {true && (
        <ul>
          {Object.entries(ratingData.distribution).map(([score, count]) => (
            <li key={score}>
              {String(score)} stars: {String(count)} votes
            </li>
          ))}
        </ul>
      )}
      {volumes && (
        <div>
          {Object.keys(volumes).map((volumeKey) => {
            const volume = volumes[volumeKey]
            return (
              <div key={volumeKey}>
                <h2>Volume {volume.volume}</h2>
                <ul>
                  {Object.keys(volume.chapters).map((chapterKey) => {
                    const chapter = volume.chapters[chapterKey]
                    return (
                      <li
                        key={chapter.id}
                        onClick={() => handleChapter(chapter.id)}
                      >
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
