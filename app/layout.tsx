import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { AppLayout, Providers, SessionProvider } from "@/components/Providers"
import Header from "@/components/Header/Header"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Binge Watch List",
  description: "Binge Watch List",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <AppLayout>
              <Header />
              {children}
            </AppLayout>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
