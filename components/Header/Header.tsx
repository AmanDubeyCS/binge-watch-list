import Link from "next/link"
import React from "react"

export default function Header() {
  return (
    <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-10 text-black">
      <div>LOGO</div>
      <div className="flex gap-3">
        <Link
          href={"/home"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          Home
        </Link>
        <Link
          href={"/manga"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          Manga
        </Link>
        <Link
          href={"/anime"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          Anime
        </Link>
        <Link
          href={"/tv"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          TV Shows
        </Link>
        <Link
          href={"/movies"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          Movies
        </Link>
        <Link
          href={"/games"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          Games
        </Link>
        <Link
          href={"/books"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal] hover:text-orange-400"
        >
          Books
        </Link>
      </div>
      <div>SEARCH</div>
    </div>
  )
}
