import { ContentListings } from "@/components/landing/ContentListings"
import { FeatureSection } from "@/components/landing/FeatureSection"
import { FooterSection } from "@/components/landing/FooterSection"
import { HeroSection } from "@/components/landing/HeroSection"
import React from "react"

export default async function page() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-[1600px]">
        <HeroSection />
        <FeatureSection />
        <ContentListings />
        <FooterSection />
      </div>
    </div>
  )
}
