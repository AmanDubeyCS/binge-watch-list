import React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface WatchlistRibbonProps {
  onStatusChange: (_status: string) => void
  onRemoveData?: () => void
  currentStatus: string | null
  statuses: {
    [key: string]: {
      label: string
      icon: React.ReactNode
    }
  }
}

export const WatchlistRibbon: React.FC<WatchlistRibbonProps> = ({
  onStatusChange,
  onRemoveData,
  currentStatus,
  statuses,
}) => {
  const handleStatusChange = (status: string) => {
    onStatusChange(status)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="group absolute left-0 top-0 h-[34px] w-6 cursor-pointer"
          role="button"
          aria-label="Watchlist options"
        >
          <svg
            width="24"
            height="34"
            viewBox="0 0 24 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 top-0"
          >
            <path
              d="M24 0H0V32L12.2437 26.2926L24 31.7728V0Z"
              className={`${
                currentStatus
                  ? "fill-blue-600"
                  : "fill-zinc-700 group-hover:fill-zinc-600"
              } transition-colors duration-200`}
            />
            <path
              d="M24 31.7728V33.7728L12.2437 28.2926L0 34V32L12.2437 26.2926L24 31.7728Z"
              className="fill-black/20"
            />
          </svg>
          <div className="absolute right-1 top-1.5 text-zinc-200 transition-colors duration-200 group-hover:text-white">
            {currentStatus ? (
              statuses[currentStatus]?.icon
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        align="start"
        className="z-50 grid w-[340px] grid-cols-2 gap-2 bg-white p-2 text-black"
      >
        {Object.entries(statuses).map(([key, { label, icon }]) => (
          <DropdownMenuItem
            key={key}
            onSelect={() => handleStatusChange(key)}
            className={cn(
              "flex cursor-pointer items-center rounded-md p-3 transition-colors duration-200 hover:opacity-80",
              label === "Watching" || label === "Playing" || label === "Reading"
                ? "bg-blue-100 text-blue-600"
                : label === "Plan to Watch" ||
                    label === "Want to play" ||
                    label === "Plan to Read"
                  ? "bg-yellow-100 text-yellow-600"
                  : label === "Completed" || label === "I've seen this"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
            )}
          >
            {icon}
            <span className="font-medium">{label}</span>
          </DropdownMenuItem>
        ))}
        {onRemoveData && (
          <DropdownMenuItem
            onSelect={onRemoveData}
            className="col-span-2 flex cursor-pointer items-center justify-center rounded-md bg-red-400 p-3 text-red-900 transition-colors duration-200 hover:opacity-80"
          >
            <Trash2 size={14} />
            <span className="ml-1 text-[15px]">Remove</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
