import { motion } from "framer-motion"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
  activeTab: (_val: string) => void
  tabs: string[]
}

const ChipTabs = ({ activeTab, tabs }: Props) => {
  const [selected, setSelected] = useState(tabs[0])

  useEffect(() => {
    activeTab(selected)
  }, [selected, activeTab])
  return (
    <div className="flex size-full flex-wrap items-center gap-2 rounded-lg bg-[#F4F4F5] p-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  )
}

const Chip = ({
  text,
  selected,
  setSelected,
}: {
  text: string
  selected: boolean
  setSelected: Dispatch<SetStateAction<string>>
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected ? "text-black" : "text-[#71717A]"
      } relative h-full flex-1 rounded-md px-2.5 py-0.5 text-sm font-medium transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-white shadow-sm"
        ></motion.span>
      )}
    </button>
  )
}

export default ChipTabs
