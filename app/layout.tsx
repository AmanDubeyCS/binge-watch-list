import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { AppLayout, Providers, SessionProvider } from "@/components/Providers"
import Header from "@/components/Header/Header"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"
import { Toaster } from "sonner"
import { GoogleAnalytics } from "@/components/GoogleAnalytics "

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | My Binge List",
    default: "My Binge List - Track, Discover, and Share Your Watchlists",
  },
  description:
    "My Binge List - Your Ultimate Platform for Tracking, Discovering, and Sharing Movies, Anime, TV Shows, and Games. Create Personalized Watchlists, Track Progress, and Explore Ratings from Multiple Sources like TMDB, IMDb, and Trakt.",
  keywords: [
    "Movies",
    "TV Shows",
    "Anime",
    "Games",
    "Watchlist Tracker",
    "Binge Watching",
    "Streaming Guide",
    "Ratings and Reviews",
    "TMDB Alternative",
    "IMDb Alternative",
    "Trakt Alternative",
  ],
  applicationName: "My Binge List",
  metadataBase: new URL("https://mybingelist.fun/"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
      "en-US": "/",
    },
  },
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "My Binge List - Track, Discover, and Share Your Watchlists",
    url: "https://mybingelist.fun",
    siteName: "My Binge List",
    description:
      "My Binge List - Your Ultimate Platform for Tracking, Discovering, and Sharing Movies, Anime, TV Shows, and Games. Create Personalized Watchlists, Track Progress, and Explore Ratings from Multiple Sources like TMDB, IMDb, and Trakt.",
    images: {
      url: "https://res.cloudinary.com/djjm6uvso/image/upload/v1739367059/MBL-Logo_tatvnk.png",
      alt: "My Binge List Logo",
    },
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Binge List - Track, Discover, and Share Your Watchlists",
    description:
      "My Binge List - Your Ultimate Platform for Tracking, Discovering, and Sharing Movies, Anime, TV Shows, and Games. Create Personalized Watchlists, Track Progress, and Explore Ratings from Multiple Sources like TMDB, IMDb, and Trakt.",
    creator: "@BingeWatchList",
    images: {
      url: "https://res.cloudinary.com/djjm6uvso/image/upload/v1739367059/MBL-Logo_tatvnk.png",
      alt: "My Binge List Logo",
    },
  },
  category: "Entertainment",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 200,
    },
  },
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
              <div className="bg-gray-50">{children}</div>
              <Toaster
                toastOptions={{
                  classNames: {
                    error: "bg-red-100 text-red-400",
                    success: "text-green-500 bg-green-50",
                  },
                }}
              />
            </AppLayout>
          </Providers>
        </SessionProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
