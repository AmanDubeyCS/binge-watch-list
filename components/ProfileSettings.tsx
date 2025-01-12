"use client"
import React from "react"
import LogoutButton from "./auth/LogoutButton"
import { EditProfileDialog } from "./profile/EditProfile"
import { useSession } from "next-auth/react"

export function ProfileSettings({ serializedData, userId }: any) {
  const { data: session } = useSession()

  if (session?.user.id !== userId) {
    return
  }
  return (
    <div className="flex gap-4 sm:flex-col">
      <LogoutButton />
      <EditProfileDialog initialData={serializedData} />
    </div>
  )
}
