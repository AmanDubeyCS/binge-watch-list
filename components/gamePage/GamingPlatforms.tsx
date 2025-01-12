"use client"
import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Icon } from "../icons"
import { platformData } from "./gamedata"
import Link from "next/link"

const platformLogos = {
  pc: <Icon.windowsIcon className="size-[64px] text-white" />,
  playstation: (
    <Icon.playstationIcon className="size-[64px] text-white" fill="white" />
  ),
  xbox: <Icon.xboxIcon className="size-[64px] text-white" fill="white" />,
  ios: <Icon.appleIcon className="size-[64px] text-white" />,
  android: <Icon.androidIcon className="size-[64px] text-white" />,
  mac: <Icon.appleIcon className="size-[64px] text-white" />,
  linux: <Icon.linuxIcon className="size-[64px] text-white" />,
  nintendo: <Icon.nintendoIcon className="size-[64px] text-white" />,
  atari: <Icon.atariIcon className="size-[64px] text-white" />,
  "commodore-amiga": <Icon.commodoreIcon className="size-[64px] text-white" />,
  sega: <Icon.segaIcon className="size-[64px] text-white" />,
  "3do": <Icon.threeDoIcon className="size-[64px] text-white" />,
  "neo-geo": <Icon.nintendoIcon className="size-[64px] text-white" />,
  web: <Icon.webIcon className="size-[64px] text-white" />,
}

export default function GamingPlatforms() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)

  return (
    <section>
      <h2 className="mb-6 px-4 text-3xl font-bold">Gaming Platforms</h2>
      <div className="hide-scrollbar flex gap-6 overflow-x-scroll px-4">
        {platformData.results.map((platform) =>
          platform.platforms.length > 1 ? (
            <div
              key={platform.id}
              className="aspect-square size-[225px] shrink-0 cursor-pointer overflow-hidden rounded-full transition-shadow duration-300 hover:shadow-lg"
              onClick={() => setOpenDialog(platform.id)}
            >
              <div className="h-full p-0">
                <div
                  className={`group relative flex h-full flex-col items-center justify-center gap-2 transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  <img
                    src={platform.platforms[0].image_background}
                    alt={platform.name}
                    className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-30"></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                    {platformLogos[platform.slug as keyof typeof platformLogos]}
                    <span className="text-2xl font-bold text-white">
                      {platform.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={platform.id}
              href={`/games/discover?platforms=${platform.platforms[0].id}`}
              className="aspect-square size-[225px] shrink-0 cursor-pointer overflow-hidden rounded-full transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="h-full p-0">
                <div
                  className={`group relative flex h-full flex-col items-center justify-center gap-2 transition-transform duration-300 ease-in-out hover:scale-105`}
                >
                  <img
                    src={platform.platforms[0].image_background}
                    alt={platform.name}
                    className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-30"></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                    {platformLogos[platform.slug as keyof typeof platformLogos]}
                    <span className="text-2xl font-bold text-white">
                      {platform.name}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>

      {platformData.results.map(
        (platform) =>
          platform.platforms.length > 1 && (
            <Dialog
              key={platform.id}
              open={openDialog === platform.id}
              onOpenChange={(isOpen) =>
                setOpenDialog(isOpen ? platform.id : null)
              }
            >
              <DialogContent className="w-fit max-w-[1200px] bg-white text-black">
                <DialogHeader>
                  <DialogTitle>{platform.name} Sub-platforms</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-4 py-4">
                  {platform.platforms.map((subPlatform) => (
                    <Link
                      href={`/games/discover?platforms=${subPlatform.id}`}
                      key={subPlatform.id}
                      className="flex flex-col items-center"
                    >
                      <div className="mb-2 flex size-[160px] items-center justify-center overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src={subPlatform.image_background}
                          alt={subPlatform.name}
                          width={160}
                          height={180}
                          className="size-full object-cover"
                        />
                      </div>
                      <span className="text-center text-sm font-medium">
                        {subPlatform.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )
      )}
    </section>
  )
}
