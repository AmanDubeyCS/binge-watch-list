import { config } from "@/apiConfig"
import { ScrollToTop } from "@/components/ScorllTop"
import { fetchFromMangaDex } from "@/util/fetchFromTMDB"
import { Metadata } from "next"
import React, { ReactElement } from "react"

export async function generateMetadata({
  params,
}: {
  params: { mangaDetails: string }
}): Promise<Metadata> {
  try {
    const mangaID = params.mangaDetails
    const manga = await fetchFromMangaDex(config.getSingleManga({ mangaID }))
    const mangaInfo = await manga.data

    if (!mangaInfo) {
      return {
        title: "TV Show Not Found",
        description: "The TV show details could not be retrieved.",
      }
    }

    const image = mangaInfo.relationships.filter(
      (data: { type: string }) => data.type === "cover_art"
    )

    const extractedTitles = mangaInfo.attributes.altTitles.map(
      (obj: any) => Object.values(obj)[0]
    )
    const keyowrds = mangaInfo.attributes.tags.map(
      (tag: any) => tag.attributes.name.en
    )

    const description = mangaInfo.attributes.description.en
      .split("---")[0]
      .trim()

    return {
      title: `${mangaInfo.attributes.title.en} (${mangaInfo.attributes.year})`,
      description: description,
      keywords: [...extractedTitles, ...keyowrds],
      openGraph: {
        title: `${mangaInfo.attributes.title.en} (${mangaInfo.attributes.year})`,
        description: description,
        images: [
          {
            url: `/api/mangaImage/${mangaID}/${image[0].attributes.fileName}`,
            width: 1280,
            height: 720,
            alt: `${mangaInfo.attributes.title.en} Backdrop`,
          },
        ],
        type: "video.tv_show",
      },
      twitter: {
        card: "summary_large_image",
        title: `${mangaInfo.attributes.title.en} (${mangaInfo.attributes.year})`,
        description: description,
        images: [`/api/mangaImage/${mangaID}/${image[0].attributes.fileName}`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": 200,
        },
      },
    }
  } catch (error) {
    return {
      title: "My Binge List",
      description: "My Binge List - Track, Discover, and Share Your Watchlists"
    }
  }
}

export default async function layout({ children }: { children: ReactElement }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  )
}
