"use client"

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            refetchInterval: 1000 * 60 * 5,
            staleTime: 1000 * 60 * 5,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  )
}

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useDataStore, DataStore } from "@/store/allDataStore"
import { db } from "@/app/firebaseConfig"

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const { fetchData } = useDataStore() as DataStore

  useEffect(() => {
    if (session?.user?.id) {
      fetchData(db, session.user.id)
    }
  }, [session?.user?.id, fetchData])
  return <div>{children}</div>
}

export { SessionProvider, Providers, AppLayout }
