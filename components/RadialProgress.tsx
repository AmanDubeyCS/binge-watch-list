import React from "react"

export default function RadialProgress({
  percentage,
  color,
}: {
  percentage: number
  color?: string
}) {
  const strokeDasharray = 282 // Circumference of the circle (2 * Math.PI * 45)
  const strokeDashoffset =
    strokeDasharray - (strokeDasharray * percentage) / 100

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#343a40" // bg-white
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color || `#3CC28A`} // green
          strokeWidth="10"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
    </div>
  )
}
