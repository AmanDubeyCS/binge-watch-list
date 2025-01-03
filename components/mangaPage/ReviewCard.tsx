"use client"
import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useState } from "react"

export function ReviewCard(review: any) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="mb-4 rounded-lg border shadow-md">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="size-10 rounded-full bg-gray-300">
              <img
                className="size-full rounded-full object-cover"
                src={review.review.record.author.user_info.avatar.url}
                alt={review.review.record.author.user_info.username}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {review.review.record.author.user_info.username}
              </h3>
              {/* <p className="text-sm text-muted-foreground">
                  Joined {formatDate(review.record.author.user_info.time_joined.timestamp)}
                </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">
          {review.review.record.subject}
        </h3>
        <p
          className={`text-muted-foreground ${isExpanded ? "" : "line-clamp-3"}`}
        >
          {review.review.record.content}
        </p>
        {review.review.record.content?.length > 300 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center justify-center p-0 text-blue-600"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 size-4" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="ml-1 size-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
