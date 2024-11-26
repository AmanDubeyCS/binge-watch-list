"use client"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

interface DisplayPriorities {
  [countryCode: string]: number
}

interface ProviderData {
  display_priorities: DisplayPriorities
  display_priority: number
  logo_path: string
  provider_name: string
  provider_id: number
}

export function TvProviders({ TvProviders }: { TvProviders: ProviderData[] }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (providerID: number) => {
    if (pathname.includes("provider")) {
      router.push(`${providerID}`)
    } else {
      router.push(`${pathname}/discover?providers=${providerID}`)
    }
  }
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Tv providers
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {TvProviders &&
          TvProviders.slice(0, 20).map((provider) => (
            <div
              key={provider.provider_id}
              className="text-center"
              onClick={() => handleClick(provider.provider_id)}
            >
              <div className="mb-2 flex size-24 cursor-pointer items-center justify-center rounded-full bg-white shadow-md duration-300 hover:scale-105">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="size-16 object-contain duration-300 hover:scale-110"
                />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {provider.provider_name}
              </p>
            </div>
          ))}
      </div>
    </section>
  )
}
