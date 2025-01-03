import React, { useEffect, useState } from "react"

export function AnimeEpisodesCounter({
  progress,
  epiodes,
  setAniProgress,
}: any) {
  const [epProgress, setEpProgress] = useState(progress)
  const navigate = (direction: "increment" | "decrement") => {
    if (direction === "increment") {
      if (progress < epiodes) {
        setEpProgress(epProgress + 1)
      }
    } else {
      if (progress > 1) {
        setEpProgress(epProgress - 1)
      }
    }
  }

  useEffect(() => {
    setAniProgress(epProgress)
  }, [epProgress, setAniProgress])
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 space-x-2">
      <p className="w-24 text-center font-bold">{`${epProgress}/${epiodes}`}</p>
      <div className="flex w-full gap-3">
        <button
          onClick={() => navigate("decrement")}
          disabled={progress === 1}
          aria-label="Decrease episode"
          className="flex size-10 w-1/2 shrink-0 items-center justify-center rounded-md bg-gray-400 p-2 text-2xl disabled:bg-slate-100"
        >
          -
        </button>
        <button
          onClick={() => navigate("increment")}
          disabled={progress === epiodes}
          aria-label="Increase episode"
          className="flex size-10 w-1/2 shrink-0 items-center justify-center rounded-md bg-green-500 p-2 text-2xl disabled:bg-slate-100"
        >
          +
        </button>
      </div>
    </div>
  )
}
