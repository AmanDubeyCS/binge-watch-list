"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Lottie from "lottie-react"
import notFound from "@/assets/404-error.json"

export default function NotFound() {
  const router = useRouter()

  return (
    <>
      <main className="h-screen overflow-hidden rounded-t-3xl md:rounded-tr-none">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative size-[300px]">
          <Lottie animationData={notFound} />
            <div className="absolute bottom-[5px] left-[63px] grid gap-[2px] text-center">
              <p className="max-w-[342px] text-2xl font-bold leading-[normal] text-neutrals-800">
                Page not Found
              </p>
              <p className="text-xs font-normal leading-[normal] text-neutrals-600">
                Something went wrong
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/home")}
            className="mt-2 h-[35px] rounded-[24px] bg-white px-4 py-2 text-base font-semibold leading-[normal] text-brand-primary shadow-[0_2px_12px_-2px_rgba(105,71,191,0.24)]"
          >
            Back to Home
          </button>
        </div>
      </main>
    </>
  )
}