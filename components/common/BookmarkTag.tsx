"use client"
import { DataStore, useDataStore } from "@/store/allDataStore"
import { Bookmark, CircleCheckBig, Clock, Eye, ThumbsDown } from "lucide-react"
import React from "react"

export default function BookmarkTag({ mangaID }: { mangaID: string }) {
  const { data } = useDataStore() as DataStore
  const status = data.filter((data: {id: string}) => data.id === mangaID)[0]?.readStatus
  const bookStatuses = {
    reading: { label: "Reading", icon: <Eye size={20} /> },
    planning: { label: "Plan to Read", icon: <Clock size={14} /> },
    completed: { label: "Completed", icon: <CircleCheckBig size={14} /> },
    dropped: { label: "Dropped", icon: <ThumbsDown size={14} /> },
  }
  return (
    <div className="flex gap-5">
      {/* <button className="rounded-full bg-[#161b22] p-2">
        <Heart className="size-5" />
      </button> */}
      <button className="rounded-full bg-[#161b22] p-2">
        {status ? (
          <div>{bookStatuses[status as keyof typeof bookStatuses]?.icon}</div>
        ) : (
          <Bookmark className="size-5" />
        )}
      </button>
    </div>
  )
}
