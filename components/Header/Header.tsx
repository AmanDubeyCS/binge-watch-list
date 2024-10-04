import Link from "next/link"
import React from "react"

export default function Header() {
  return (
    <div className="mx-auto flex px-10 h-[72px] max-w-[1600px] items-center justify-between text-black">
      <div>LOGO</div>
      <div className="flex gap-3">
        <Link
          href={"/"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal]"
        >
          Home
        </Link>
        <Link
          href={"/manga"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal]"
        >
          Manga
        </Link>
        <Link
          href={"/anime"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal]"
        >
          Anime
        </Link>
        <Link
          href={"/tv"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal]"
        >
          TV
        </Link>
        <Link
          href={"/movies"}
          className="text-neutrals-800 flex items-center justify-center gap-1 p-2 text-lg font-medium leading-[normal]"
        >
          Movies
        </Link>
      </div>
      <div>SEARCH</div>
    </div>
  )
}
