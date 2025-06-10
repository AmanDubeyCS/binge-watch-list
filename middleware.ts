import { NextRequest, NextResponse } from "next/server"

const SEARCH_ENGINE_IPS = {
  google: ["66.249.", "64.68.", "72.14.", "74.125.", "216.239."],
  bing: ["157.55.", "207.46.", "131.253.", "40.77."],
  yandex: ["5.255.", "87.250.", "93.158."],
}

const BROWSER_HEADERS = [
  "accept-language",
  "sec-ch-ua",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
  "sec-fetch-dest",
  "sec-fetch-mode",
  "sec-fetch-site",
  "sec-fetch-user",
]

const botKeywords = [
  "bot",
  "crawl",
  "slurp",
  "spider",
  "whatsapp",
  "telegrambot",
  "slackbot",
  "viber",
  "discordbot",
  "skypeuripreview",
  "google-site-verification",
  "google-read-aloud",
  "google-producer",
  "feedfetcher",
  "google",
  "bing",
  "perplexity",
  "openai",
  "googlebot",
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "baiduspider",
]

export function middleware(req: NextRequest) {
  const fullUrl = req.nextUrl.toString()
  const userAgent = req.headers.get("user-agent") || ""
  const ip = req.ip || req.headers.get("x-forwarded-for") || ""

  const isBotByUserAgent = botKeywords.some((keyword) =>
    userAgent.toLowerCase().includes(keyword)
  )

  const isBotByIP = Object.values(SEARCH_ENGINE_IPS).some((ranges) =>
    ranges.some((range) => ip.startsWith(range))
  )

  const hasBrowserHeaders = BROWSER_HEADERS.some((header) =>
    req.headers.has(header)
  )

  const isBot = isBotByUserAgent || (isBotByIP && !hasBrowserHeaders)

  if (isBot) {
    return new NextResponse("Forbidden - Bot traffic blocked", { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*",
}
