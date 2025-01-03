import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <>
    <section className="mx-auto flex flex-col max-w-[1600px] px-8 pb-10">
      <Skeleton className="mb-4 w-[240px] h-9 flex items-center text-2xl font-semibold bg-gray-300" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_) => (
          <div className="flex h-[245px] w-[360px] animate-pulse items-center justify-start overflow-hidden rounded-md bg-gray-200 p-2 shadow-md">
            <div className="flex h-full gap-2">
              {/* Skeleton for the image */}
              <Skeleton className="relative w-[140px] shrink-0 overflow-hidden rounded-lg bg-gray-300" />

              <div className="flex-1">
                {/* Skeleton for the tag */}
                <Skeleton className="mb-2 h-5 w-20 rounded-lg bg-gray-300" />

                {/* Skeleton for the title */}
                <Skeleton className="mb-2 h-6 w-3/4 rounded bg-gray-300" />
                <Skeleton className="mb-2 h-6 w-1/2 rounded bg-gray-300" />

                {/* Skeleton for the rating */}
                <div className="mb-2 flex items-center gap-2">
                  <Skeleton className="size-5 rounded-full bg-gray-300" />
                  <Skeleton className="h-5 w-10 rounded bg-gray-300" />
                  <Skeleton className="h-4 w-16 rounded bg-gray-300" />
                </div>

                {/* Skeleton for the popularity */}
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-4 w-20 rounded bg-gray-300" />
                  <Skeleton className="h-4 w-10 rounded bg-gray-300" />
                </div>

                {/* Skeleton for the genres */}
                <div className="mb-2 flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-6 w-16 rounded bg-gray-300"
                    />
                  ))}
                  <Skeleton className="h-6 w-10 rounded bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="mx-auto flex flex-col max-w-[1600px] px-8 pb-10">
      <Skeleton className="mb-4 w-[240px] h-9 flex items-center text-2xl font-semibold bg-gray-300" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_) => (
          <div className="flex h-[245px] w-[360px] animate-pulse items-center justify-start overflow-hidden rounded-md bg-gray-200 p-2 shadow-md">
            <div className="flex h-full gap-2">
              {/* Skeleton for the image */}
              <Skeleton className="relative w-[140px] shrink-0 overflow-hidden rounded-lg bg-gray-300" />

              <div className="flex-1">
                {/* Skeleton for the tag */}
                <Skeleton className="mb-2 h-5 w-20 rounded-lg bg-gray-300" />

                {/* Skeleton for the title */}
                <Skeleton className="mb-2 h-6 w-3/4 rounded bg-gray-300" />
                <Skeleton className="mb-2 h-6 w-1/2 rounded bg-gray-300" />

                {/* Skeleton for the rating */}
                <div className="mb-2 flex items-center gap-2">
                  <Skeleton className="size-5 rounded-full bg-gray-300" />
                  <Skeleton className="h-5 w-10 rounded bg-gray-300" />
                  <Skeleton className="h-4 w-16 rounded bg-gray-300" />
                </div>

                {/* Skeleton for the popularity */}
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-4 w-20 rounded bg-gray-300" />
                  <Skeleton className="h-4 w-10 rounded bg-gray-300" />
                </div>

                {/* Skeleton for the genres */}
                <div className="mb-2 flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-6 w-16 rounded bg-gray-300"
                    />
                  ))}
                  <Skeleton className="h-6 w-10 rounded bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Loading
