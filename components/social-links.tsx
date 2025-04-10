import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

interface SocialLinksProps {
  alignment?: "center" | "left"
}

export default function SocialLinks({ alignment = "center" }: SocialLinksProps) {
  const alignmentClass = alignment === "left" ? "justify-start" : "justify-center"

  return (
    <div className={`flex items-center ${alignmentClass} gap-4`}>
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Github className="h-5 w-5 dark:text-gray-300" />
        </div>
      </Link>
      <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Twitter className="h-5 w-5 dark:text-gray-300" />
        </div>
      </Link>
      <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Linkedin className="h-5 w-5 dark:text-gray-300" />
        </div>
      </Link>
      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <Instagram className="h-5 w-5 dark:text-gray-300" />
        </div>
      </Link>
    </div>
  )
}

