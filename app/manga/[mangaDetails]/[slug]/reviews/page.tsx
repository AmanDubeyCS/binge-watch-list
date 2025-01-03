import { ReviewCard } from "@/components/mangaPage/ReviewCard"
import React from "react"

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

export default async function page({ params }: { params: any }) {
  const muID = params.slug
  if (muID === "1") {
    return <div>no data</div>
  }
  const response = await fetch(
    `https://api.mangaupdates.com/v1/series/${muID}/comments/search`,
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
  const review = (await response.json()) as ReviewData

  if (!review) {
    return
  }
  return (
    <div>
      {review.results.map((review) => (
        <ReviewCard key={review.record.id} review={review} />
      ))}
    </div>
  )
}
