import Link from "next/link"

export default function Home() {
  return (
    <div className="flex justify-center gap-3">
      <Link href={"/manga"}>Manga</Link>
      <Link href={"/anime"}>Anime</Link>
      <Link href={"/tv"}>TV</Link>
      <Link href={"/movies"}>Movies</Link>
    </div>
  )
}
