import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-wrap gap-10 px-8 pb-10">
      {Array.from({ length: 10 }).map((_) => (
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
                  <Skeleton key={i} className="h-6 w-16 rounded bg-gray-300" />
                ))}
                <Skeleton className="h-6 w-10 rounded bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    // <div className="mx-auto flex w-full max-w-[812px] flex-col items-start justify-center gap-10">
    //   <div className="my-[72px] flex flex-col items-center justify-start gap-12">
    //     <div className="flex flex-col items-center justify-start gap-2 self-stretch">
    //       <Skeleton className="h-14 w-full rounded-2xl md:max-w-screen-xs" />
    //       <Skeleton className="h-5 w-full rounded-2xl md:max-w-screen-xs" />
    //     </div>

    //     <div className="flex flex-col items-center justify-center gap-4 self-stretch">
    //       <Skeleton className="h-14 w-full rounded-full md:max-w-screen-sm" />

    //       <ul className="flex w-full flex-col flex-wrap items-center justify-start gap-4 self-stretch">
    //         {Array.from({ length: 4 }).map((_, index) => (
    //           <li
    //             key={index}
    //             className="w-[84%] max-w-screen-xs rounded-2xl border border-[#1e202614] px-4 py-1.5"
    //           >
    //             <Skeleton className="h-[18px] w-full" />
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     <div className="flex w-full flex-wrap items-center justify-center gap-4">
    //       {Array.from({ length: 12 }).map((_, index) => (
    //         <Skeleton
    //           key={index}
    //           className="h-[88px] w-[280px] rounded-[22px] sm:w-[260px]"
    //         />
    //       ))}
    //     </div>

    //     <div className="flex w-full items-center justify-center">
    //       <div className="flex flex-row items-center gap-3 rounded-full border border-[var(--neutrals-200)] bg-white bg-opacity-[0.12] p-2 pl-4">
    //         <Skeleton className="h-6 w-[194px]" />
    //         <Skeleton className="h-6 w-[94px]" />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="rounded-3 flex flex-col items-start justify-start gap-3 self-stretch">
    //     <Skeleton className="h-6 w-1/3" />

    //     <ul className="flex flex-wrap items-start justify-start gap-2 self-stretch">
    //       {Array.from({ length: 3 }).map((_, index) => (
    //         <Skeleton key={index} className="h-[88px] w-64 rounded-[22px]" />
    //       ))}
    //     </ul>
    //   </div>

    //   <div className="rounded-3 flex flex-col items-start justify-start gap-3 self-stretch">
    //     <Skeleton className="h-6 w-1/3" />

    //     <ul className="flex flex-wrap items-start justify-start gap-2 self-stretch">
    //       {Array.from({ length: 4 }).map((_, index) => (
    //         <Skeleton
    //           key={index}
    //           className="h-[88px] w-full max-w-[396px] rounded-[22px]"
    //         />
    //       ))}
    //     </ul>
    //   </div>

    //   <div className="flex w-full flex-col items-start justify-center gap-2">
    //     <Skeleton className="h-6 w-1/3" />

    //     <ul className="flex w-full flex-wrap items-center justify-start gap-2">
    //       {Array.from({ length: 3 }).map((_, index) => (
    //         <Skeleton
    //           key={index}
    //           className="h-[130px] w-[140px] rounded-[22px]"
    //         />
    //       ))}
    //     </ul>
    //   </div>

    //   <div className="flex w-full flex-col items-start justify-center gap-2">
    //     <Skeleton className="h-6 w-1/3" />

    //     <ul className="flex w-full flex-wrap items-center justify-start gap-2">
    //       {Array.from({ length: 3 }).map((_, index) => (
    //         <Skeleton
    //           key={index}
    //           className="h-[130px] w-[140px] rounded-[22px]"
    //         />
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  )
}

export default Loading
