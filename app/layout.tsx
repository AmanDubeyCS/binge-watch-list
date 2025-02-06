import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { AppLayout, Providers, SessionProvider } from "@/components/Providers"
import Header from "@/components/Header/Header"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Binge Watch List",
    default: "Binge Watch List - Track, Discover, and Share Your Watchlists",
  },
  description:
    "Binge Watch List - Your Ultimate Platform for Tracking, Discovering, and Sharing Movies, Anime, TV Shows, and Games. Create Personalized Watchlists, Track Progress, and Explore Ratings from Multiple Sources like TMDB, IMDb, and Trakt.",
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
  applicationName: "Binge Watch List",
  metadataBase: new URL("https://binge-watch-list-snowy.vercel.app/"),
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
    title: "Binge Watch List - Track, Discover, and Share Your Watchlists",
    url: "https://binge-watch-list-snowy.vercel.app/",
    siteName: "Binge Watch List",
    description:
      "Binge Watch List - Your Ultimate Platform for Tracking, Discovering, and Sharing Movies, Anime, TV Shows, and Games. Create Personalized Watchlists, Track Progress, and Explore Ratings from Multiple Sources like TMDB, IMDb, and Trakt.",
    images: {
      url: "https://res.cloudinary.com/djjm6uvso/image/upload/v1738600618/BWL_logo_yr3gt2.png",
      alt: "Binge Watch List Logo",
    },
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binge Watch List - Track, Discover, and Share Your Watchlists",
    description:
      "Binge Watch List - Your Ultimate Platform for Tracking, Discovering, and Sharing Movies, Anime, TV Shows, and Games. Create Personalized Watchlists, Track Progress, and Explore Ratings from Multiple Sources like TMDB, IMDb, and Trakt.",
    creator: "@BingeWatchList",
    images: {
      url: "https://res.cloudinary.com/djjm6uvso/image/upload/v1738600618/BWL_logo_yr3gt2.png",
      alt: "Binge Watch List Logo",
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
              {children}
            </AppLayout>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
