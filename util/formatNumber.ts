export function formatNumber(num: number | string) {
  const numericValue =
    typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num

  if (numericValue >= 1000) {
    return (numericValue / 1000).toFixed(1).replace(/\.0$/, "") + "k"
  }
  return numericValue?.toString()
}
