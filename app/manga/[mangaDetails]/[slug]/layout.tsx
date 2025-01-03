import { config } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import { fetchFromMangaDex } from "@/util/fetchFromTMDB"
import React, { ReactElement } from "react"

const links = [
  {
    name: "Overview",
    link: "/",
  },
  {
    name: "Reviews",
    link: "reviews",
  },
  {
    name: "Media",
    link: "media",
  },
]

export default async function layout({
  params,
  children,
}: {
  params: { mangaDetails: string; slug: number }
  children: ReactElement
}) {
  const mangaID = params.mangaDetails
  const slug = params.slug
  try {
    const manga = await fetchFromMangaDex(config.getSingleManga({ mangaID }))
    const statisticsResponse = await fetchFromMangaDex(
      config.getMangaStatistics({ mangaID })
    )
    const mangaInfo = await manga.data
    const statistics = await statisticsResponse

    const mangaId = Object.keys(statistics.statistics)[0]
    const image = mangaInfo.relationships.filter(
      (data: { type: string }) => data.type === "cover_art"
    )

    const platformReadOrBuy = [
      {
        id: mangaInfo.attributes.links.raw,
        name: "Official Raw",
        url: `${mangaInfo.attributes.links.raw}`,
      },
      {
        id: mangaInfo.attributes.links.engtl,
        name: "Official Engilsh",
        url: `${mangaInfo.attributes.links.engtl}`,
      },
      {
        id: mangaInfo.attributes.links.amz,
        name: "Amazon",
        url: `${mangaInfo.attributes.links.amz}`,
      },
      {
        id: mangaInfo.attributes.links.bw,
        name: "Book Walker",
        url: `https://bookwalker.jp/${mangaInfo.attributes.links.bw}`,
      },
      {
        id: mangaInfo.attributes.links.cdj,
        name: "CDJapan",
        url: `${mangaInfo.attributes.links.cdj}`,
      },
      {
        id: mangaInfo.attributes.links.ebj,
        name: "eBookJapan",
        url: `${mangaInfo.attributes.links.ebj}`,
      },
    ]

    return (
      <main>
        <ContentDetails
          id={mangaID}
          backdropPoster={`/api/mangaImage/${mangaID}/${image[0].attributes.fileName}`}
          poster={`/api/mangaImage/${mangaID}/${image[0].attributes.fileName}`}
          title={mangaInfo.attributes.title.en}
          date={mangaInfo.attributes.year}
          genres={mangaInfo.attributes.tags
            .filter(
              (tag: { attributes: { group: string } }) =>
                tag.attributes.group === "genre"
            )
            .map(
              (genra: { attributes: { name: { en: string } } }) =>
                genra.attributes.name.en
            )}
          rating={statistics.statistics[mangaId].rating.bayesian}
          voteCount={0}
          overview={mangaInfo.attributes.description.en}
          production={mangaInfo.relationships
            .filter((item: { type: string }) => item.type === "author")
            .map(
              (author: { attributes: { name: string } }) =>
                author.attributes.name
            )}
          producer={mangaInfo.relationships
            .filter((item: { type: string }) => item.type === "artist")
            .map(
              (artist: { attributes: { name: string } }) =>
                artist.attributes.name
            )}
          status={mangaInfo.attributes.status}
          readProviders={platformReadOrBuy}
          type="manga"
        />

        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
          }}
          className="pb-14"
        >
          <div className="mx-auto flex max-w-[1600px] gap-4 lg:p-10">
            <div className="flex w-full flex-col gap-4">
              <div className="">
                <NavLinks id={`${mangaID}/${slug}`} links={links} />
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error fetching manga data:", error)
    return <div>Error fetching manga data.</div>
  }
}
