import type { Metadata } from "next"
import AdminPanel from "@/components/admin-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Admin - Portfolio Website",
  description: "Admin panel for managing portfolio content",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Admin</h1>
          <Link href="/" className="text-[#FF5D3A] hover:underline">
            Back to Website
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to Your Portfolio Admin</CardTitle>
            <CardDescription>This is where you can manage the images on your portfolio website</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Use the Browser Storage option to quickly add images to your portfolio. These images will be stored in
              your browser and will appear on your website immediately.
            </p>
            <p className="text-gray-600 mt-2">
              For a more permanent solution, you can configure Vercel Blob Storage, but this requires additional setup.
            </p>
          </CardContent>
        </Card>

        <AdminPanel />
      </div>
    </div>
  )
}

