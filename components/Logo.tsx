import { cn } from "@/lib/utils"
import React from "react"

export function Logo({ classname }: { classname?: string }) {
  return (
    <span
      className={cn(
        "relative flex h-8 w-fit items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr from-primary to-accent px-1 text-lg",
        classname
      )}
    >
      <span className="absolute inset-px rounded-[7px] bg-white"></span>
      <span className="relative bg-gradient-to-br from-primary to-accent bg-clip-text font-bold text-transparent">
        MBL
      </span>
    </span>
  )
}
