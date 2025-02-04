"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

const checkLink = (lastSegment: string) => {
  const activeLink = [
    "review",
    "media",
    "character",
    "episodes",
    "recommendations",
    "collection",
    "season",
  ].includes(lastSegment)
  return activeLink ? lastSegment : "/"
}
export default function NavLinks({
  id,
  links,
  collectionId,
}: {
  id: number | string
  links: { name: string; link: string }[]
  collectionId?: number
}) {
  const pathname = usePathname()
  const lastSegment = pathname.split("/").pop() || ""
  const [selected, setSelected] = useState(checkLink(lastSegment))
  const linkTo = pathname.includes("movie")
    ? "movies"
    : pathname.includes("tv")
      ? "tv"
      : pathname.includes("manga")
        ? "manga"
        : "anime"

  return (
    <div className="w-full">
      <ul className="hide-scrollbar mt-4 flex w-full max-w-[1600px] overflow-scroll border-b border-gray-200">
        {links.map((link) => (
          <li key={link.name} className="-mb-px mr-1">
            <Link
              href={
                link.name === "Collection"
                  ? `/${linkTo}/${id}/${link.link}/${collectionId}`
                  : `/${linkTo}/${id}/${link.link}`
              }
              onClick={() => setSelected(link.link)}
              className={`inline-block px-4 py-2 text-sm font-medium ${
                selected === link.link || selected === id
                  ? "rounded-t border-x border-t border-gray-200 bg-white text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="inline">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
