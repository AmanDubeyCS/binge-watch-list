"use client"
import { useState } from "react"
import { Star, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import React from "react"

interface Review {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string | null
    rating: number | null
  }
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export function Reviews({ data }: { data: any }) {
  const [reviews, setReviews] = useState<Review[]>(data)
  const [sortBy, setSortBy] = useState("newest")
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set())

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      case "oldest":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      case "highest":
        return (b.author_details.rating || 0) - (a.author_details.rating || 0)
      case "lowest":
        return (a.author_details.rating || 0) - (b.author_details.rating || 0)
      default:
        return 0
    }
  })

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="px-4 py-8 text-black">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg">{reviews.length} reviews</p>
        <select
          className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center">
                <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-gray-200">
                  {review.author_details.avatar_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                      alt={review.author}
                      className="size-10 rounded-full"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">
                      {review.author[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{review.author}</h2>
                  <p className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 size-4" />
                    {formatDate(review.created_at)}
                  </p>
                </div>
              </div>
              {review.author_details.rating && (
                <div className="flex items-center rounded bg-yellow-100 px-2 py-1">
                  <Star className="mr-1 size-5 text-yellow-400" />
                  <span className="font-bold">
                    {review.author_details.rating}/10
                  </span>
                </div>
              )}
            </div>
            <p
              className={`text-gray-700 ${expandedReviews.has(review.id) ? "" : "line-clamp-3"}`}
            >
              {review.content}
            </p>
            {review.content.length > 300 && (
              <button
                className="mt-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                onClick={() => toggleExpand(review.id)}
              >
                {expandedReviews.has(review.id) ? (
                  <>
                    <ChevronUp className="mr-1 inline size-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 inline size-4" />
                    Read More
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
