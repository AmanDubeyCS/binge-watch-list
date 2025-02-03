"use client"
import Image from "next/image"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useSession } from "next-auth/react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { Check } from "lucide-react"

const imageList = [
  "https://res.cloudinary.com/djjm6uvso/image/upload/v1738590219/openart-image_pLsjWAGF_1736699976498_raw_y8ciyz.jpg",
  "https://res.cloudinary.com/djjm6uvso/image/upload/v1738590212/openart-image_Zj1sp8kR_1736699812752_raw_zdxhuj.jpg",
  "https://res.cloudinary.com/djjm6uvso/image/upload/v1738590212/openart-image_PAum6z6V_1736699742731_raw_jyuuhk.jpg",
  "https://res.cloudinary.com/djjm6uvso/image/upload/v1738590212/openart-image_5SGquoNb_1736699893988_raw_n7knpu.jpg",
  "https://res.cloudinary.com/djjm6uvso/image/upload/v1738590212/openart-image_WMqmjvbY_1736699921669_raw_fnctuk.jpg",
  "https://res.cloudinary.com/djjm6uvso/image/upload/v1738590210/openart-image_03-oy1WG_1736699953811_raw_ld7zv8.jpg",
]

export function ProfileImage({ image, userID }: any) {
  const [userImage, setUserImage] = useState(image)
  const { data: session } = useSession()

  const handleImageUpdate = async (isOpen: boolean) => {
    const userId = session?.user?.id
    if (!userId || isOpen || userImage === image) return

    const userDocRef = doc(db, "users", userId)

    try {
      await updateDoc(userDocRef, {
        profileImage: userImage,
      })
      console.log("sucesss")
    } catch (error) {
      setUserImage(image)
      console.error("Error updating profile:", error)
      alert("Failed to update profile.")
    }
  }

  return (
    <>
      {userID === session?.user?.id ? (
        <Dialog onOpenChange={handleImageUpdate}>
          <DialogTrigger>
            <div className="relative size-32 overflow-hidden rounded-full border-4 border-white md:size-40">
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <Image
                src={userImage}
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] bg-white">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {imageList.map((src, index) => (
                <div
                  key={index}
                  onClick={() => setUserImage(imageList[index])}
                  className="bg-muted relative mx-auto size-[100px] overflow-hidden rounded-full xs:size-[200px]"
                >
                  {userImage === src && (
                    <div className="absolute left-[50%] top-[50%] z-10 flex items-center justify-center rounded-full bg-blue-400 p-2">
                      <Check className="text-white" />
                    </div>
                  )}
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-200 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="relative size-32 overflow-hidden rounded-full border-4 border-white md:size-40">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <Image
            src={userImage}
            alt="Profile Picture"
            fill
            className="object-cover"
          />
        </div>
      )}
    </>
  )
}
