import ImageDisplay from "@/components/image-display"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  imageSection: string
  imageIndex: number
  rating: number
}

export default function TestimonialCard({ quote, author, imageSection, imageIndex, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <span className="text-4xl font-serif text-[#FF5D3A]">&ldquo;</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-[#FF5D3A] text-[#FF5D3A]" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <ImageDisplay
            section={imageSection}
            index={imageIndex}
            fallbackSrc="/placeholder.svg?height=50&width=50"
            alt={author}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        </div>
        <span className="font-medium dark:text-white">{author}</span>
      </div>
    </div>
  )
}

