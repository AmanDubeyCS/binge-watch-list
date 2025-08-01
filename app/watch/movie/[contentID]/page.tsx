"use client"

import { cn } from "@/lib/utils"
import { ArrowBigRight } from "lucide-react"
import { useState } from "react"

interface VideoServer {
  id: string
  name: string
  url: string
  status: "online" | "offline"
}

const videoServers: VideoServer[] = [
  {
    id: "server1",
    name: "VIDEASY",
    url: "https://player.videasy.net",
    status: "online",
  },
  {
    id: "server2",
    name: "VIDLINK",
    url: "https://vidlink.pro",
    status: "online",
  },
  {
    id: "server3",
    name: "VIDFAST",
    url: "https://vidfast.pro",
    status: "online",
  },
  {
    id: "server4",
    name: "VIDSRC-RIP",
    url: "https://vidsrc.rip/embed",
    status: "online",
  },
  {
    id: "server5",
    name: "VIDSRC-VIP",
    url: "https://vidsrc.vip/embed",
    status: "online",
  },
  {
    id: "server6",
    name: "EMBED",
    url: "https://embed.su/embed",
    status: "online",
  },
  {
    id: "server7",
    name: "VIDSRC-CC",
    url: "https://vidsrc.cc/v3/embed",
    status: "online",
  },
  {
    id: "server8",
    name: "VIDSRC-SU",
    url: "https://vidsrc.su",
    status: "online",
  },
  {
    id: "server9",
    name: "VIDSRC-IN",
    url: "https://vidsrc.in/embed",
    status: "online",
  },
  {
    id: "server10",
    name: "2EMBED",
    url: "https://www.2embed.cc/embed",
    status: "online",
  },
  {
    id: "server11",
    name: "VIDSRC-ICU",
    url: "https://vidsrc.icu/embed",
    status: "online",
  },
  {
    id: "server12",
    name: "SMASHY",
    url: "https://player.smashystream.com",
    status: "online",
  },
]

export default function Page({ params }: { params: { contentID: number } }) {
  const { contentID } = params

  const [selectedServer, setSelectedServer] = useState<VideoServer>(
    videoServers[0]
  )
  const [showAllServers, setShowAllServers] = useState(false)

  const handleServerChange = (server: VideoServer) => {
    if (server.status === "offline") return
    setSelectedServer(server)
  }

  const toggleServers = () => {
    setShowAllServers(!showAllServers)
  }

  const displayedServers = showAllServers ? videoServers : []

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col gap-3 px-2 pt-2">
        <div
          role="button"
          tabIndex={0}
          onClick={toggleServers}
          className="flex items-center gap-2"
        >
          <h3 className="text-xl font-bold">SERVERS</h3>
          <ArrowBigRight />
        </div>
        <div className="relative pb-2">
          <div className="grid grid-cols-3 gap-1">
            {displayedServers.map((server) => (
              <button
                key={server.id}
                onClick={() => handleServerChange(server)}
                className={cn(
                  "min-w-24 rounded-lg border bg-blue-300 px-4 py-2 text-black",
                  selectedServer.id === server.id && "bg-green-300"
                )}
              >
                {server.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Video Player */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <iframe
          src={`${selectedServer.url}/movie/${contentID}`}
          className="absolute left-0 top-0 size-full"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
