import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is /admin
 // if (path.startsWith("/admin")) {
    // In a real app, you would check for authentication here
    // For now, we'll just redirect to the home page
    // In a production app, you would implement proper authentication
  //  const url = request.nextUrl.clone()
   // url.pathname = "/"
   // return NextResponse.redirect(url)
  //}

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

