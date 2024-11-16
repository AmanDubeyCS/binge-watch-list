import { useBuyGames } from "@/queries/RAWG/gameFetch"
import Link from "next/link"
import { Icon } from "../icons"

const storeInfo: {
  [key: number]: { name: string; color: string; logo: React.ReactNode }
} = {
  1: {
    name: "Steam",
    color: "bg-[#1b2838] hover:bg-[#2a475e]",
    logo: <Icon.steamIcon />,
  },
  2: {
    name: "Microsoft Store",
    color: "bg-[#00a4ef] hover:bg-[#0078d4]",
    logo: <Icon.microsoftStoreIcon />,
  },
  3: {
    name: "PlayStation Store",
    color: "bg-[#003791] hover:bg-[#0055a0]",
    logo: <Icon.PSStoreIcon />,
  },
  4: {
    name: "App Store",
    color: "bg-[#0070c9] hover:bg-[#0058a0]",
    logo: <Icon.appleStoreIcon />,
  },
  5: {
    name: "GOG",
    color: "bg-[#86198f] hover:bg-[#a21caf]",
    logo: <Icon.gogIcon />,
  },
  6: {
    name: "Nintendo Store",
    color: "bg-red-600 hover:bg-red-400",
    logo: <Icon.nitendoStoreIcon />,
  },
  7: {
    name: "Xbox Marketplace",
    color: "bg-[#107c10] hover:bg-[#0e6a0e]",
    logo: <Icon.xboxMarketplaceIcon />,
  },
  8: {
    name: "Google Play",
    color: "bg-[#414141] hover:bg-[#313131]",
    logo: <Icon.googlePlayLogo />,
  },
  9: {
    name: "itch.io",
    color: "bg-[#414141] hover:bg-[#313131]",
    logo: <Icon.itchIoLogo />,
  },
  11: {
    name: "Epic Games",
    color: "bg-[#414141] hover:bg-[#313131]",
    logo: <Icon.epicGamesLogo />,
  },
}

interface GameStoreLink {
  id: number
  game_id: number
  store_id: number
  url: string
}

export function WhereToBuy({ gameId }: { gameId: number }) {
  const { data } = useBuyGames(gameId)

  return (
    <div className="container mx-auto rounded-md bg-white px-4 py-8 text-black">
      <h1 className="mb-6 text-2xl font-bold">BUY from below stores</h1>
      {data && data.results && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.results.map((item: GameStoreLink) => {
            const store = storeInfo[item.store_id]
            return (
              <button
                key={item.id}
                className={`w-full rounded-md text-left text-white ${store.color}`}
              >
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center">
                    {store.logo && <span className="mr-3">{store.logo}</span>}
                    <span>{store.name}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
