"use client"
import Link from "next/link"
import React, { useState } from "react"
import {
  BookText,
  Cat,
  CircleUserRound,
  Clapperboard,
  Gamepad2,
  House,
  Search,
  Tv,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import logo from "@/assets/BWL logo.png"
import Image from "next/image"

const links = [
  {
    name: "HOME",
    link: "/home",
    logo: <House width={41} />,
  },
  {
    name: "MANGA",
    link: "/manga",
    logo: <BookText width={41} />,
  },
  {
    name: "ANIME",
    link: "/anime",
    logo: <Cat width={41} />,
  },
  {
    name: "SHOWS",
    link: "/tv",
    logo: <Tv width={41} />,
  },
  {
    name: "MOVIES",
    link: "/movies",
    logo: <Clapperboard width={41} />,
  },
  {
    name: "GAMES",
    link: "/games",
    logo: <Gamepad2 width={41} />,
  },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [activeLink, setActiveLink] = useState(pathname)
  return (
    <div
      className={cn(
        "border-b p-2 text-black md:px-10",
        pathname === "/" && "bg-neutral-900 md:text-white"
      )}
    >
      <div className="mx-auto flex h-[40px] w-full max-w-[1600px] items-center justify-between md:h-[72px]">
        <div>
          <Image
            src={logo}
            alt="logo"
            className="h-[30px] w-auto md:h-[50px]"
          />
        </div>
        <div className="fixed bottom-0 left-0 z-50 flex w-full bg-white p-2 md:relative md:flex md:max-w-[600px] md:bg-transparent">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => setActiveLink(link.link)}
              className={cn(
                "text-neutrals-800 flex flex-1 flex-col items-center justify-center gap-2 text-[11px] font-medium leading-[normal] hover:text-orange-400 md:text-[15px]",
                activeLink === link.link && "text-orange-600"
              )}
            >
              {link.logo}
              {link.name}
            </Link>
          ))}

          <Link
            href={
              session?.user?.id ? `/profile/${session?.user?.id}` : `/login`
            }
            onClick={() => setActiveLink(`/profile/${session?.user?.id}`)}
            className={cn(
              "text-neutrals-800 flex flex-1 flex-col items-center justify-center gap-2 text-[11px] font-medium leading-[normal] hover:text-orange-400 md:hidden md:text-[15px]",
              activeLink === `/profile/${session?.user?.id}` &&
                "text-orange-400"
            )}
          >
            <CircleUserRound width={41} />
            PROFILE
          </Link>
        </div>

        <div className="flex gap-3">
          <Link
            href={"/search"}
            onClick={() => setActiveLink("/search")}
            className={cn(
              "text-neutrals-800 flex flex-col items-center justify-center gap-2 px-3 text-[15px] font-medium leading-[normal] hover:text-orange-400",
              activeLink === `/search` && "text-orange-400"
            )}
          >
            <Search width={41} />
            <span className="hidden md:flex">SEARCH</span>
          </Link>
          <Link
            href={
              session?.user?.id ? `/profile/${session?.user?.id}` : `/login`
            }
            onClick={() => setActiveLink(`/profile/${session?.user?.id}`)}
            className={cn(
              "text-neutrals-800 hidden flex-col items-center justify-center gap-2 px-3 text-[15px] font-medium leading-[normal] hover:text-orange-400 md:flex",
              activeLink === `/profile/${session?.user?.id}` &&
                "text-orange-400"
            )}
          >
            <CircleUserRound width={41} />
            PROFILE
          </Link>
        </div>
      </div>
    </div>
  )
}
