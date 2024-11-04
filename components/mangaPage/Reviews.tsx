import { Comments } from "@/types/manga/singleManga"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import React from "react"

export function Reviews({ reviews }: { reviews: Comments }) {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="px-6 py-8">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
              Thread
            </h1>
            {/* <div className="mb-6 flex items-center">
              <Star className="mr-1 h-5 w-5 text-yellow-400" />
              <Star className="mr-1 h-5 w-5 text-yellow-400" />
              <Star className="mr-1 h-5 w-5 text-yellow-400" />
              <Star className="mr-1 h-5 w-5 text-yellow-400" />
              <Star className="mr-2 h-5 w-5 text-gray-300" />
              <span className="text-sm text-gray-600">(4.0 average)</span>
            </div> */}
            <p className="mb-8 text-lg text-gray-600">
              Join the discussion and share your thoughts! There are currently{" "}
              <span className="font-semibold text-indigo-600">
                {reviews.repliesCount} replies
              </span>{" "}
              in this thread.
            </p>
            {/* <div className="mb-6 flex flex-col items-start justify-between rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center">
              <div className="mb-4 flex items-center sm:mb-0">
                <Eye className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">1,234 views</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div> */}
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <span className="mb-4 text-sm text-gray-500 sm:mb-0">
                Thread ID: {reviews.threadId}
              </span>
              <Link
                href={`https://forums.mangadex.org/threads/${reviews.threadId}`}
                target="_blank"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <MessageCircle className="mr-2 size-5" />
                View Full Thread
              </Link>
            </div>
          </div>
          <div className="bg-indigo-50 px-6 py-4">
            <p className="text-sm text-indigo-600">
              💡 Tip: Be respectful and constructive in your comments to foster
              a positive community discussion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
