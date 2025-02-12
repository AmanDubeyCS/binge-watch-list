import { config } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import { ReviewCard } from "@/components/mangaPage/ReviewCard"
import { checkdata } from "@/util/fetchFromMangaUpdates"
import { fetchFromMangaDex } from "@/util/fetchFromTMDB"
import { ArrowDown, ArrowUp, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Avatar {
  id: number
  url: string
  height: number
  width: number
}

interface Time {
  timestamp: number
  as_rfc3339: string
  as_string: string
}

interface UserInfo {
  user_id: number
  username: string
  url: string
  avatar: Avatar
  time_joined: Time
  forum_title: string | null
  folding_at_home: boolean
  stats: {
    forum_posts: number
    added_authors: number
    added_groups: number
    added_publishers: number
    added_releases: number
    added_series: number
  }
  user_group: string
  user_group_name: string
}

interface Author {
  user_info: UserInfo
  name: string | null
}

interface TimeAddedUpdated {
  timestamp: number
  as_rfc3339: string
  as_string: string
}

interface Admin {
  moderated: boolean
  reported: boolean
}

interface Record {
  id: number
  series_id: number
  subject: string
  content: string
  author: Author
  useful: number
  time_added: TimeAddedUpdated
  time_updated: TimeAddedUpdated | null
  admin: Admin
}

interface Metadata {
  author_series_rating: number
  current_user_useful_rating: number | null
}

interface Review {
  record: Record
  metadata: Metadata
}

interface ReviewData {
  total_hits: number
  page: number
  per_page: number
  results: Review[]
}

interface MangaUpdatesData {
  bayesian_rating: number
  categories: { category: string }[]
  category_recommendations: { series_name: string; series_url: string }[]
  latest_chapter: number
  status: string
  description: string
  rank: {
    position: { [key: string]: number }
    old_position: { [key: string]: number }
    lists: { [key: string]: number }
  }
}

export default async function page({
  params,
}: {
  params: { mangaDetails: string }
}) {
  const mangaID = params.mangaDetails
  const ID = await checkdata(mangaID)

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

  let MUData
  let review

  if (ID) {
    const response = await fetch(`https://api.mangaupdates.com/v1/series/${ID}`)
    MUData = (await response.json()) as MangaUpdatesData

    const responseReview = await fetch(
      `https://api.mangaupdates.com/v1/series/${ID}/comments/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "",
          page: 1,
          limit: 10,
        }),
      }
    )
    review = (await responseReview.json()) as ReviewData
  }

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) return <ArrowUp className="text-green-500" />
    if (current > previous) return <ArrowDown className="text-red-500" />
    return null
  }
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
        muRating={MUData?.bayesian_rating}
        voteCount={0}
        overview={mangaInfo.attributes.description.en}
        production={mangaInfo.relationships
          .filter((item: { type: string }) => item.type === "author")
          .map(
            (author: { attributes: { name: string } }) => author.attributes.name
          )}
        producer={mangaInfo.relationships
          .filter((item: { type: string }) => item.type === "artist")
          .map(
            (artist: { attributes: { name: string } }) => artist.attributes.name
          )}
        status={mangaInfo.attributes.status}
        readProviders={platformReadOrBuy}
        type="manga"
        contentType="manga"
        muID={String(ID)}
        chapters={MUData?.latest_chapter}
        numbers={statistics.statistics[mangaId].follows}
      />

      {MUData && (
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
          }}
          className="pb-14"
        >
          <div className="mx-auto flex max-w-[1600px] gap-4 lg:p-10">
            <div className="flex w-full flex-col gap-4">
              <div className="p-4">
                <div className="flex flex-col gap-10">
                  <div className="rounded-lg border p-4 shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold">Status</h3>
                    <ReactMarkdown>{MUData.status}</ReactMarkdown>
                  </div>
                  <div className="rounded-lg border p-4 shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold">Description</h3>
                    <ReactMarkdown>{MUData.description}</ReactMarkdown>
                  </div>

                  <div className="space-y-8">
                    <div className="rounded-lg border p-4 shadow-lg">
                      <h3 className="mb-4 text-xl font-semibold">Tags</h3>
                      <div className="flex h-[90px] flex-wrap gap-2 overflow-hidden">
                        {MUData.categories.map((category) => (
                          <div
                            key={category.category}
                            className="flex cursor-pointer items-center justify-center rounded-full bg-gray-200 px-2 py-1 text-sm"
                          >
                            <Tag className="mr-1 size-3" />
                            <span className="ml-1 text-xs font-bold">
                              {category.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg border shadow-lg">
                      <div className="border-b p-4">
                        <h3 className="text-lg">Current Position</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {Object.entries(MUData.rank.position).map(
                            ([period, position]) => (
                              <li
                                key={period}
                                className="flex items-center justify-between"
                              >
                                <span className="capitalize">
                                  {period.replace("_", " ")}
                                </span>
                                <div className="flex items-center">
                                  {getRankChange(
                                    position,
                                    MUData.rank.old_position[period]
                                  )}
                                  <span className="mr-2 rounded-full bg-gray-100 px-3 py-1 font-semibold">
                                    {position}
                                  </span>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="rounded-lg border shadow-lg">
                      <div className="border-b p-4">
                        <h3 className="text-lg">Statistics</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {Object.entries(MUData.rank.lists).map(
                            ([list, count]) => (
                              <li
                                key={list}
                                className="flex items-center justify-between"
                              >
                                <span className="capitalize">{list}:</span>
                                <span className="font-semibold">{count}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {review && (
                  <div className="flex flex-col gap-4 py-6">
                    <h2 className="text-[26px] font-bold">Reviews</h2>
                    <div>
                      {review.results.map((review) => (
                        <ReviewCard key={review.record.id} review={review} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
