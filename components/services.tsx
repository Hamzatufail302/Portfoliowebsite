import { motion } from "framer-motion"
import ServiceCard from "@/components/service-card"
import { AnimateInView, fadeInUp } from "@/components/animations"

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5D3A" strokeWidth="2">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Web and Mobile Design",
    description: "Create stunning user interfaces for web and mobile applications",
    href: "/services/web-and-mobile",
    steps: [
      {
        number: "01",
        title: "Register your account",
        description: "Create an account to access our design services and discuss your project"
      },
      {
        number: "02",
        title: "Select your preferences",
        description: "Choose your design preferences, style, and project requirements"
      },
      {
        number: "03",
        title: "Project Discussion",
        description: "Detailed discussion about your project needs and objectives"
      }
    ]
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5D3A" strokeWidth="2">
        <path d="M15 8h.01M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m-6-4l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Graphic Design",
    description: "Professional graphic design services for your brand identity",
    href: "/services/graphic-design",
    steps: [
      {
        number: "01",
        title: "Brand Analysis",
        description: "Understanding your brand values and target audience"
      },
      {
        number: "02",
        title: "Design Concepts",
        description: "Creating multiple design concepts for your selection"
      },
      {
        number: "03",
        title: "Final Delivery",
        description: "Refining and delivering the final design assets"
      }
    ]
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5D3A" strokeWidth="2">
        <path d="M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Multimedia Content",
    description: "Engaging multimedia content creation and animation services",
    href: "/services/multimedia",
    steps: [
      {
        number: "01",
        title: "Content Planning",
        description: "Planning your multimedia content strategy and requirements"
      },
      {
        number: "02",
        title: "Content Creation",
        description: "Creating high-quality multimedia content for your needs"
      },
      {
        number: "03",
        title: "Review & Delivery",
        description: "Final review and delivery of your multimedia content"
      }
    ]
  }
]

export default function Services() {
  return (
    <section id="services" className="container mx-auto px-4 py-16 md:py-24">
      {/* Section Header */}
      <AnimateInView>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[#FF5D3A] font-medium mb-3">SERVICES</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">What I Do</h2>
          <p className="text-gray-600 dark:text-gray-300">
            I offer comprehensive design solutions across web, mobile, and multimedia platforms. Each service is tailored to
            meet your specific needs and objectives.
          </p>
        </div>
      </AnimateInView>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <AnimateInView key={index} variants={fadeInUp} delay={index * 0.1}>
            <ServiceCard {...service} />
          </AnimateInView>
        ))}
      </div>
    </section>
  )
} 