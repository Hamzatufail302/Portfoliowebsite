import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServiceCard from "@/components/service-card"
import SocialLinks from "@/components/social-links"
import ImageDisplay from "@/components/image-display"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TestimonialSlider from "@/components/testimonial-slider"
import ContactForm from "@/components/contact-form"
import RecentProjects from "@/components/recent-projects"
import SmoothScrollButton from "@/components/smooth-scroll-button"
import {
  AnimateInView,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "@/components/animations"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <Header />

      {/* Hero Section - Horizontally Centered */}
      <section className="container mx-auto px-4 py-12 md:py-20 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <AnimateInView variants={fadeInLeft}>
            <h2 className="text-xl font-medium mb-2 dark:text-gray-200">Hi!</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              I'M <span className="text-[#FF5D3A]">HAMZA</span>
              <br />
              GRAPHIC & MULTIMEDIA
              <br />
              DESIGNER
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
              My aim is to create better user interfaces, graphics and multimedia content in modern graphics, Lottie
              animations and web colors.
            </p>
            <div className="mt-8">
              <SmoothScrollButton targetId="contact" className="rounded-full px-8 py-6">
                HIRE ME
              </SmoothScrollButton>
            </div>
          </AnimateInView>

          <AnimateInView variants={fadeInRight}>
            <div className="relative flex justify-center">
              <div
                className="relative aspect-square flex items-center justify-center"
                style={{ maxWidth: "85%" }}
              >
                <ImageDisplay
                  section="hero"
                  fallbackSrc="/placeholder.svg?height=400&width=400"
                  alt="Designer workspace illustration"
                  width={400}
                  height={400}
                  className="object-contain mx-auto"
                  priority
                />
              </div>
            </div>
          </AnimateInView>
        </div>

        {/* Combined Contact & Social Card - Full width in mobile */}
        <AnimateInView variants={fadeInUp} delay={0.3}>
          <div className="mt-20 mb-8 md:max-w-5xl md:mx-auto">
            {/* Mobile version - full width with no margins */}
            <div className="md:hidden bg-[#F9F9F9] dark:bg-gray-900 py-8 -mx-4 px-4">
              <div className="grid gap-8">
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Check out me</p>
                  <SocialLinks alignment="center" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Contact me</p>
                  <div className="flex items-center gap-2 h-10">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#FF5D3A]" />
                    </div>
                    <span className="text-sm dark:text-gray-300">hamzatufail217@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop version - with card styling */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-full p-8 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Check out me</p>
                  <SocialLinks alignment="center" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Contact me</p>
                  <div className="flex items-center gap-2 h-10">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#FF5D3A]" />
                    </div>
                    <span className="text-sm dark:text-gray-300">hamzatufail217@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateInView>

        {/* Decorative elements */}
        <div className="absolute left-0 top-40 h-20 w-20 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
        <div className="absolute right-0 bottom-20 h-10 w-10 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
      </section>

      {/* About Section - Adjusted spacing and button */}
      <section id="about" className="container mx-auto px-4 -mt-4 pb-20 md:mt-0 md:pt-4 md:pb-28 relative">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 md:gap-16 items-center max-w-5xl mx-auto">
          <AnimateInView variants={fadeInLeft}>
            <div className="relative flex justify-center">
              <div className="relative w-[320px] h-[320px] sm:w-[350px] sm:h-[350px] md:h-[450px] md:w-[450px]">
                <ImageDisplay
                  section="about"
                  fallbackSrc="/placeholder-user.jpg"
                  alt="About Me"
                  width={450}
                  height={450}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
          </AnimateInView>

          <AnimateInView variants={fadeInRight}>
            <div className="text-[#FF5D3A] font-medium mb-1">ABOUT ME</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 dark:text-white">WHO I AM</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8 text-sm sm:text-base">
              I am a Graphic and Multimedia designer who loves creating pixel-perfect designs, unique user interfaces
              and producing Multimedia content. I have a passion for creating beautiful designs and I also take pride in
              providing exceptional customer service while delivering projects that exceed my clients' expectations
              every single time.
            </p>
            <div className="mt-6 md:mt-8">
              <SmoothScrollButton 
                targetId="contact" 
                className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
              >
                Contact
              </SmoothScrollButton>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Services Section - Centered with consistent width */}
      <section id="services" className="py-24 md:py-32 relative bg-[#F9F9F9] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimateInView>
            <div className="text-center mb-16 max-w-5xl mx-auto">
              <div className="text-[#FF5D3A] font-medium mb-2">SERVICES</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">WHAT I CAN DO</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                I have 4 years of experience in Designing graphics and User Interfaces for Web and mobile apps.
                Additionally, I create stunning multimedia content.
              </p>
            </div>
          </AnimateInView>

          <StaggerContainer className="grid md:grid-cols-3 gap-2 justify-center max-w-5xl mx-auto">
            <StaggerItem>
              <ServiceCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5D3A" strokeWidth="2">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Web/Mobile Design"
                description="UX/UI designs, pixel-perfect designs and unique user experiences that enhance user satisfaction."
                href="/services/web-and-mobile"
                steps={[
                  {
                    number: "01",
                    title: "Project Brief",
                    description: "Discuss your requirements and project goals"
                  },
                  {
                    number: "02",
                    title: "Design Process",
                    description: "Create wireframes and interactive prototypes"
                  },
                  {
                    number: "03",
                    title: "Final Delivery",
                    description: "Deliver polished designs ready for development"
                  }
                ]}
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5D3A" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Multimedia Content"
                description="Motion graphics, animations and premium video editing services for engaging content."
                href="/services/multimedia"
                steps={[
                  {
                    number: "01",
                    title: "Content Planning",
                    description: "Plan your multimedia content strategy"
                  },
                  {
                    number: "02",
                    title: "Production",
                    description: "Create high-quality multimedia content"
                  },
                  {
                    number: "03",
                    title: "Review & Delivery",
                    description: "Final review and content delivery"
                  }
                ]}
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5D3A" strokeWidth="2">
                    <path d="M15 8h.01M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m-6-4l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Graphic Design"
                description="Visual content that effectively communicates your brand message and identity."
                href="/services/graphic-design"
                steps={[
                  {
                    number: "01",
                    title: "Brand Analysis",
                    description: "Understand your brand and target audience"
                  },
                  {
                    number: "02",
                    title: "Design Creation",
                    description: "Create compelling visual designs"
                  },
                  {
                    number: "03",
                    title: "Refinement",
                    description: "Perfect the designs based on feedback"
                  }
                ]}
              />
            </StaggerItem>
          </StaggerContainer>

          <div className="flex justify-center mt-12"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-40 h-20 w-20 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
      </section>

      {/* Portfolio Section - Centered with consistent width */}
      <section id="projects" className="container mx-auto px-4 py-24 md:py-32 relative">
        <AnimateInView>
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="text-[#FF5D3A] font-medium mb-2">PORTFOLIO</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">RECENT PROJECTS</h2>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.2}>
          <div className="max-w-5xl mx-auto">
            {/* Add this component to replace the single row of projects */}
            <RecentProjects />
          </div>
        </AnimateInView>

        {/* Decorative elements */}
        <div className="absolute left-10 top-40 h-10 w-10 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
      </section>

      {/* Testimonials Section - Centered with consistent width */}
      <section className="py-24 md:py-32 relative bg-[#F9F9F9] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <AnimateInView variants={fadeInLeft}>
              <div className="pt-4">
                <div className="text-[#FF5D3A] font-medium mb-2">REVIEWS</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">WHAT CLIENT SAY</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting.
                </p>
                {/* Removed contact button */}
              </div>
            </AnimateInView>

            <AnimateInView variants={fadeInRight}>
              <TestimonialSlider />
            </AnimateInView>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-20 h-20 w-20 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
      </section>

      {/* Contact Section - Centered with consistent width */}
      <section id="contact" className="container mx-auto px-4 py-24 md:py-32 relative">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <AnimateInView variants={fadeInLeft}>
            <div className="pt-4">
              <div className="text-[#FF5D3A] font-medium mb-2">CONTACT ME</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">LET'S TALK</h2>
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

        {/* Decorative elements */}
        <div className="absolute left-0 bottom-20 h-20 w-20 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
        <div className="absolute right-0 top-40 h-10 w-10 bg-[#FFE8E3] dark:bg-gray-800 rounded-full -z-10"></div>
      </section>

      {/* Footer */}
      <AnimateInView>
        <Footer />
      </AnimateInView>
    </div>
  )
}

