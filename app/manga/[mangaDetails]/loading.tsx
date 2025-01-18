import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <>
      <section
        className="hidden md:block"
        style={{
          borderBottom: "1px solid var(--primaryColor)",
          backgroundPosition: "left calc((50vw - 170px) - 340px) top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="relative h-fit overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%)",
          }}
        >
          <div className="mx-auto flex h-full max-w-[1600px] px-10 py-8 text-white">
            {/* Poster Skeleton */}
            <Skeleton className="h-[450px] w-[300px] shrink-0 rounded-lg" />

            <div className="flex w-full flex-col gap-4 overflow-y-auto px-4">
              {/* Title Skeleton */}
              <Skeleton className="h-8 w-3/5" />

              {/* Metadata Skeleton */}
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Genres Skeleton */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-6 w-16 rounded-full" />
                ))}
              </div>

              {/* Ratings Skeleton */}
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-10 w-20 rounded-md" />
                ))}
              </div>

              {/* Overview Skeleton */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-4/5" />

              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-4 w-1/5" />

              {/* Action Button Skeleton */}
              <div className="flex gap-6">
                <Skeleton className="h-10 w-40 rounded-md" />
                <Skeleton className="h-10 w-40 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#1f1f34]/[0.6] bg-blend-multiply md:hidden">
        <div className="via-[#1f1f34]/84 to-[#1f1f34]/84 absolute inset-0 bg-gradient-to-r from-[#1f1f34]" />
        <div className="relative mx-auto flex max-w-[1600px] flex-col items-start px-4 py-8 text-white">
          <Skeleton className="mx-auto mb-6 h-[250px] w-[300px] max-w-[150px] rounded-lg object-cover shadow-lg" />
          <div className="mx-auto flex max-w-[450px] flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <Skeleton className="mb-2 h-8 w-48" />
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-16" />
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
            <div className="mb-4 flex flex-wrap justify-center gap-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-20" />
              ))}
            </div>
            <div className="w-full">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Loading
