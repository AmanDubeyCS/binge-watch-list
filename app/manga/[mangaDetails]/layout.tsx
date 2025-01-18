import { ScrollToTop } from "@/components/ScorllTop"
import React, { ReactElement } from "react"

export default async function layout({ children }: { children: ReactElement }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  )
}
