"use client"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/home" })}
      className="font=bold flex items-center justify-center gap-2 rounded bg-red-500 px-4 py-2 text-white"
    >
      <LogOut />
      Logout
    </button>
  )
}
