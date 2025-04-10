"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ImageDisplay from "@/components/image-display"
import { AnimateInView, fadeInLeft, fadeInRight, fadeInUp } from "@/components/animations"
import ContactForm from "@/components/contact-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

type ProjectContentProps = {
  project: {
    title: string
    category: string
    description: string
    imageSection: string
    imageIndex: number
    images: number[]
  }
}

export default function ProjectContent({ project }: ProjectContentProps) {
  const searchParams = useSearchParams()
  const fromService = searchParams.get("from") === "service"

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Project Header */}
      <section className="container mx-auto px-4 py-8 md:py-20">
        <AnimateInView variants={fadeInLeft}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-[#FF5D3A] font-medium mb-3">{project.category}</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 dark:text-white">{project.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 md:mb-16">{project.description}</p>
          </div>
        </AnimateInView>

        {/* Main Project Image */}
        <AnimateInView variants={fadeInUp}>
          <div className="max-w-[1400px] mx-auto mb-8 md:mb-16">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <ImageDisplay
                section={project.imageSection}
                index={project.imageIndex}
                fallbackSrc={`/placeholder.svg?height=800&width=1200&text=${project.title}`}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </AnimateInView>

        {/* Project Details Images */}
        <div className="max-w-[1400px] mx-auto">
          <div className="grid gap-8 md:gap-16">
            {project.images.map((imageIndex, index) => (
              <AnimateInView key={index} variants={fadeInUp} delay={index * 0.1}>
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <ImageDisplay
                    section={project.imageSection}
                    index={imageIndex}
                    fallbackSrc={`/placeholder.svg?height=800&width=1200&text=Project+Detail+${index + 1}`}
                    alt={`${project.title} detail ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {!fromService && (
          <AnimateInView variants={fadeInUp} delay={0.4}>
            <div className="mt-12 md:mt-24 flex justify-center">
              <Link href="/#projects">
                <Button className="rounded-full px-8">Back to Projects</Button>
              </Link>
            </div>
          </AnimateInView>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">
          <AnimateInView variants={fadeInLeft}>
            <div className="pt-4">
              <div className="text-[#FF5D3A] font-medium mb-2">CONTACT ME</div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 dark:text-white">LET'S TALK</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Feel free to reach out if you're looking for a designer, have a question, or just want to connect. I'm
                currently available for freelance work and open to discussing new projects or opportunities.
              </p>
            </div>
          </AnimateInView>

          <AnimateInView variants={fadeInRight}>
            <ContactForm />
          </AnimateInView>
        </div>

        <div className="absolute left-0 bottom-20 h-20 w-20 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
        <div className="absolute right-0 top-40 h-10 w-10 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
      </section>

      <Footer />
    </div>
  )
} 