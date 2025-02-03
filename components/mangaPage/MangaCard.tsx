import { useRouter } from "next/navigation"
import React from "react"
import { MangaTag } from "@/types/manga/mangaTypes"

interface MangaCardProps {
  coverImage: string
  publication: string
  title: string
  genresData: MangaTag[]
  rating: number
  follows: number
}

export default function MangaCard({
  coverImage,
  publication,
  title,
  genresData,
  rating,
  follows,
}: MangaCardProps) {
  const router = useRouter()

  const handleClick = (mangaID: any) => {
    router.push(`manga/${mangaID}`)
  }

  const genresList = genresData
    .filter((item) => item.attributes.group === "genre")
    .map((item) => item.attributes.name.en)

  return (
    <>
      <blockquote
        className="tiktok-embed"
        cite="https://www.tiktok.com/@satpreptutor/video/7447942659622112554"
        data-video-id="7447942659622112554"
        style={{ maxWidth: "605px;", minWidth: "325px;" }}
      >
        {" "}
        <section>
          {" "}
          <a
            target="_blank"
            title="@satpreptutor"
            href="https://www.tiktok.com/@satpreptutor?refer=embed"
            rel="noreferrer"
          >
            @satpreptutor
          </a>{" "}
          I love this product so much! If you are taking an AP, IB, or SAT exam
          in the near future, @ZuAI is the way to go! I’m a huge fan!{" "}
          <a
            title="satprep"
            target="_blank"
            href="https://www.tiktok.com/tag/satprep?refer=embed"
            rel="noreferrer"
          >
            #satprep
          </a>{" "}
          <a
            title="sattutor"
            target="_blank"
            href="https://www.tiktok.com/tag/sattutor?refer=embed"
            rel="noreferrer"
          >
            #sattutor
          </a>{" "}
          <a
            title="apexams"
            target="_blank"
            href="https://www.tiktok.com/tag/apexams?refer=embed"
            rel="noreferrer"
          >
            #apexams
          </a>{" "}
          <a
            title="ibexams"
            target="_blank"
            href="https://www.tiktok.com/tag/ibexams?refer=embed"
            rel="noreferrer"
          >
            #ibexams
          </a>{" "}
          <a
            title="ai"
            target="_blank"
            href="https://www.tiktok.com/tag/ai?refer=embed"
            rel="noreferrer"
          >
            #ai
          </a>{" "}
          <a
            target="_blank"
            title="♬ original sound - IG + YT @satpreptutor"
            href="https://www.tiktok.com/music/original-sound-7447942649144757034?refer=embed"
            rel="noreferrer"
          >
            ♬ original sound - IG + YT @satpreptutor
          </a>{" "}
        </section>{" "}
      </blockquote>{" "}
      <script async src="https://www.tiktok.com/embed.js"></script>
    </>
  )
}
