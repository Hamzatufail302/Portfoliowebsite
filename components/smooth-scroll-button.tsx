"use client"

import { Button } from "@/components/ui/button"

interface SmoothScrollButtonProps {
  targetId: string
  className?: string
  children: React.ReactNode
}

export default function SmoothScrollButton({ targetId, className, children }: SmoothScrollButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a href={`#${targetId}`} onClick={handleClick}>
      <Button className={className}>
        {children}
      </Button>
    </a>
  )
} 