import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import type { Metadata } from "next"
import { inter } from './fonts'
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "CreativeHamza",
  description: "A professional design portfolio by CreativeHamza",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} mx-0 sm:mx-2 md:mx-0`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'