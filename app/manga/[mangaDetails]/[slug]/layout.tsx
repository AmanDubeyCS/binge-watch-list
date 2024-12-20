import { config } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import { SidebarDetails } from "@/components/mangaPage/SidebarDetails"
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

    return (
      <main>
        <ContentDetails
          id={mangaID}
          backdropPoster={`https://mangadex.org/covers/${mangaInfo.id}/${image[0]?.attributes?.fileName}`}
          poster={`https://mangadex.org/covers/${mangaInfo.id}/${image[0]?.attributes?.fileName}`}
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
          type="manga"
        />

        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
          }}
          className=""
        >
          <div className="mx-auto flex max-w-[1600px] gap-4 p-10">
            <SidebarDetails
              mangaInfo={mangaInfo}
              statistics={statistics.statistics[mangaId]}
            />
            <div className="flex w-full max-w-[1290px] flex-col gap-4">
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
    // console.error("Error fetching manga data:", error)
    // return <div>Error fetching manga data.</div>
  }
}
