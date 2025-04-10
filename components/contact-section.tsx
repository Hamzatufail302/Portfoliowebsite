"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Show success message or redirect
    alert("Thank you for your message! We'll get back to you soon.")
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <div>
            <span className="text-[#FF5D3A] font-medium text-xl">CONTACT</span>
            <span className="font-medium text-xl"> ME</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827]">LET'S TALK</h2>

          {/* Decorative speech bubble */}
          <div className="relative mt-20 hidden md:block">
            <div className="w-32 h-32 border-2 border-[#FF5D3A] rounded-full absolute -left-10"></div>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <path
                d="M60 0C26.9 0 0 26.9 0 60C0 74.3 5.5 87.4 14.7 97.5C14.1 104.4 12.1 110.9 8.9 116.6C8.2 118 9.3 119.6 10.8 119.4C22.8 117.9 33.3 113.7 41.8 107.5C47.6 109.1 53.7 110 60 110C93.1 110 120 83.1 120 50C120 16.9 93.1 0 60 0Z"
                fill="#FF5D3A"
                fillOpacity="0.1"
              />
            </svg>
          </div>
        </div>

        <div className="relative">
          {/* Decorative dots */}
          <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-[#FF5D3A]"></div>
          <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-[#FF5D3A]"></div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="grid gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D3A]/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D3A]/50"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5D3A]/50"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="rounded-full border border-[#FF5D3A] text-[#FF5D3A] px-8 py-2 hover:bg-[#FF5D3A]/5 transition-colors"
                >
                  Submit
                </button>
                <Button className="rounded-full px-6">Get in touch</Button>
              </div>
            </div>
          </form>

          <div className="mt-8 text-gray-600">
            <p>Lorem ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

