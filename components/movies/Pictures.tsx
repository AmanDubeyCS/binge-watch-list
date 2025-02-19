"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { toast } from "sonner"

interface MediaItem {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export function Pictures({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("backdrops")
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const { data: session } = useSession()

  const handleBannerUpdate = async (bannerURL: string) => {
    const userId = session?.user?.id
    if (!userId) return

    const userDocRef = doc(db, "users", userId)

    try {
      await updateDoc(userDocRef, {
        bannerImage: bannerURL,
      })
      console.log("sucsess")
      toast.success("Sucsess", { description: "Profile banner is updated" })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast("Failed")
    }
  }

  const renderMediaItems = (items: MediaItem[], type: string) => {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items?.map((item, index) => (
            <div
              key={index}
              onClick={() => setOpenDialog(item.file_path)}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                alt={`Media item ${index + 1}`}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
        <Dialog
          open={openDialog !== null}
          onOpenChange={() => setOpenDialog(null)}
        >
          <DialogContent
            className={cn(
              "w-fit gap-0 overflow-hidden p-0",
              type === "backdrops" && "w-full max-w-[1400px]"
            )}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${openDialog}`}
              alt={`Media item`}
              className="size-full"
            />
            {session?.user?.id && (
              <div
                onClick={() =>
                  handleBannerUpdate(
                    `https://image.tmdb.org/t/p/original${openDialog}`
                  )
                }
                className="cursor-pointer bg-blue-400 px-2 py-1 text-center font-medium text-white"
              >
                set as profile banner
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {["backdrops", "logos", "posters"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeTab === "backdrops" && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Backdrops</h2>
            {renderMediaItems(data?.backdrops, "backdrops")}
          </>
        )}
        {activeTab === "logos" && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Logos</h2>
            {renderMediaItems(data?.logos, "logos")}
          </>
        )}
        {activeTab === "posters" && (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Posters</h2>
            {renderMediaItems(data?.posters, "posters")}
          </>
        )}
      </div>
    </div>
  )
}
