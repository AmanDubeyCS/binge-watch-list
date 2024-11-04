"use client"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

export function TvProviders({ TvProviders }: any) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (providerID: number) => {
    if(pathname.includes("provider")){
      router.push(`${providerID}`)
    }
    else{
      router.push(`${pathname}/provider/${providerID}`)
    }
    
  }
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Tv providers
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {TvProviders &&
          TvProviders.slice(0, 20).map((provider: any) => (
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
