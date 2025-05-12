import { Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

interface SocialLinksProps {
  alignment?: "center" | "left"
}

export default function SocialLinks({ alignment = "center" }: SocialLinksProps) {
  const alignmentClass = alignment === "left" ? "justify-start" : "justify-center"

  return (
    <div className={`flex items-center ${alignmentClass} gap-4`}>
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
      <Link href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <svg className="h-5 w-5 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zM1.333 12c0-.09.008-.178.013-.266 3.891-.042 7.299-.471 10.246-1.334.267.575.526 1.156.776 1.74-3.264 1.09-6.055 3.221-8.313 6.398-1.695-1.666-2.722-3.961-2.722-6.538zm4.131 8.142c2.038-2.951 4.558-4.927 7.586-5.931 1.01 2.634 1.807 5.347 2.398 8.139-1.097.463-2.307.722-3.582.722-2.439 0-4.676-.887-6.402-2.359zm8.959 1.799c-.561-2.684-1.315-5.285-2.265-7.809 1.928-.309 4.016-.273 6.273.119-.479 3.075-1.944 5.75-4.008 7.69z"/>
          </svg>
        </div>
      </Link>
      <Link href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <svg className="h-5 w-5 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
          </svg>
        </div>
      </Link>
    </div>
  )
}

