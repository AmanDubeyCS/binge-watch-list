"use client"
import { useRouter } from "next/navigation"
import Lottie from "lottie-react"
import Error from "@/assets/Error-lottie.json"

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const router = useRouter()

  return (
    <main className="h-[calc(100lvh-60px)] overflow-hidden rounded-t-3xl md:rounded-tr-none">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="px-12 py-7">
          <Lottie animationData={Error} />
        </div>
        {error ? (
          <p className="font-mont text-neutrals-800 max-w-[342px] text-center text-2xl font-bold leading-[normal]">
            {error.message}
          </p>
        ) : (
          <>
            <p className="text-neutrals-800 max-w-[342px] text-2xl font-bold leading-[normal]">
              Oops!
            </p>
            <p className="text-neutrals-600 text-xs font-normal leading-[normal]">
              Something went wrong
            </p>
          </>
        )}

        <button
          onClick={() => router.back()}
          className="text-brand-primary mt-2 h-[35px] rounded-[24px] bg-white px-4 py-2 text-base font-semibold leading-[normal] shadow-[0_2px_12px_-2px_rgba(105,71,191,0.24)]"
        >
          Go Back
        </button>
      </div>
    </main>
  )
}
