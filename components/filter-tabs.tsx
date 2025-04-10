"use client"

import { useState } from "react"

interface FilterCategory {
  id: string
  name: string
}

interface FilterTabsProps {
  categories: FilterCategory[]
}

export default function FilterTabs({ categories }: FilterTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.id ? "bg-[#FF5D3A] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

