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
import { Logo } from "../Logo"

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
        "bg-gray-50 p-2 text-black md:px-10 md:py-0",
        pathname === "/" && " ", pathname.includes("/watch") && "hidden"
      )}
    >
      <div className="mx-auto flex h-[40px] w-full max-w-[1600px] items-center justify-between md:h-[72px]">
        <Link href={"/"}>
          <Logo classname="h-10 text-[22px] md:h-12 md:text-[26px]" />
        </Link>
        <div className={cn("fixed bottom-0 left-0 z-50 flex w-full bg-white p-2 md:relative md:flex md:max-w-[500px] md:bg-transparent", pathname.includes("/watch") && "hidden")}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => setActiveLink(link.link)}
              className={cn(
                "text-neutrals-800 flex flex-1 flex-col items-center justify-center gap-2 text-[11px] font-medium leading-[normal] hover:text-accent md:text-[15px]",
                activeLink === link.link && "text-primary"
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
              "text-neutrals-800 flex flex-1 flex-col items-center justify-center gap-2 text-[11px] font-medium leading-[normal] hover:text-accent md:hidden md:text-[15px]",
              activeLink === `/profile/${session?.user?.id}` && "text-primary"
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
              "text-neutrals-800 flex flex-col items-center justify-center gap-2 text-[15px] font-medium leading-[normal] hover:text-accent",
              activeLink === `/search` && "text-primary"
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
              "text-neutrals-800 hidden flex-col items-center justify-center gap-2 text-[15px] font-medium leading-[normal] hover:text-accent md:flex",
              activeLink === `/profile/${session?.user?.id}` && "text-primary"
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
