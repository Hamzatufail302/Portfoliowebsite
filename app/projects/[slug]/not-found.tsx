import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <Header />

      {/* Not Found Content */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[#FF5D3A] font-medium mb-2">Error 404</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-6">
              Sorry, the project you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8">
              <Link href="/#projects">
                <Button className="rounded-full px-8 py-3">Back to Projects</Button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div
              className="relative bg-[#FFF1EE] dark:bg-gray-800 rounded-full p-6 md:p-8 aspect-square flex items-center justify-center"
              style={{ maxWidth: "90%" }}
            >
              <Image
                src="/placeholder.svg?height=400&width=400&text=404+Illustration"
                alt="404 illustration"
                width={400}
                height={400}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

