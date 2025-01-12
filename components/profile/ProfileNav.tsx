"use client"
import React, { useState } from "react"
import { BookOpen, Tv, Film, Gamepad, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    name: "OVERVIEW",
    link: "/",
    logo: <User className="inline-block size-5 md:mr-2" />,
  },
  {
    name: "MOVIES",
    link: "movie",
    logo: <Film className="inline-block size-5 md:mr-2" />,
  },
  {
    name: "TV SHOWS",
    link: "tv",
    logo: <Tv className="inline-block size-5 md:mr-2" />,
  },
  {
    name: "ANIME",
    link: "anime",
    logo: <Tv className="inline-block size-5 md:mr-2" />,
  },
  {
    name: "MANGA",
    link: "manga",
    logo: <BookOpen className="inline-block size-5 md:mr-2" />,
  },
  {
    name: "GAMES",
    link: "game",
    logo: <Gamepad className="inline-block size-5 md:mr-2" />,
  },
]

const checkLink = (lastSegment: string) => {
  const activeLink = ["tv", "movie", "anime", "game", "manga"].includes(
    lastSegment
  )
  return activeLink ? lastSegment : "/"
}

export function ProfileNav({ userId }: { userId: string }) {
  const pathname = usePathname()
  const lastSegment = pathname.split("/").pop() || ""
  const [activeLink, setActiveLink] = useState(checkLink(lastSegment))
  return (
    <div className="py-8">
      <ul className="mx-auto flex max-w-[1600px] flex-wrap border-b border-gray-200">
        {links.map((link) => (
          <li key={link.name} className="-mb-px mr-1">
            <Link
              href={`/profile/${userId}/${link.link}`}
              onClick={() => setActiveLink(link.link)}
              className={`inline-block px-4 py-2 text-sm font-medium ${
                activeLink === link.link
                  ? "rounded-t border-x border-t border-gray-200 bg-white text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {link.logo}
              <span className="hidden md:inline">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
