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
import { LayoutIcon, VideoIcon, PenToolIcon } from "lucide-react"

// Types for projects
interface ProjectBase {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

interface VideoProject extends ProjectBase {
  video: string;
  image?: string; // Make image optional for video projects
}

interface ImageProject extends ProjectBase {
  image: string;
  video?: never;
}

type Project = VideoProject | ImageProject;

interface ProjectCategory {
  id: number;
  title: string;
  category: string;
  items: Project[];
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Project data
const projects: ProjectCategory[] = [
  {
    id: 1,
    title: "UI/UX Designer",
    category: "web-mobile",
    items: [
      {
        id: 1,
        title: "Responsive Website",
        description: "Modern responsive website with seamless user experience",
        image: "/images/thumbnails/web-ui/responsive-website.png",
        technologies: ["Figma", "Adobe XD"],
        link: "/services/web-and-mobile#web-ui",
        featured: true
      },
      {
        id: 2,
        title: "Mobile App Design",
        description: "User-friendly mobile app interface",
        image: "/images/thumbnails/mobile-ui/mobile-app.png",
        technologies: ["Figma", "Sketch"],
        link: "/services/web-and-mobile#mobile-ui",
        featured: true
      }
    ]
  },
  {
    id: 2,
    title: "Motion Designer",
    category: "multimedia",
    items: [
      {
        id: 1,
        title: "Interface Animation",
        description: "Engaging interface animations for enhanced user experience",
        video: "/videos/thumbnails/interface-animation.mp4",
        technologies: ["After Effects", "Premiere Pro"],
        link: "/services/multimedia#animation",
        featured: true
      },
      {
        id: 2,
        title: "Motion Graphics",
        description: "Dynamic motion graphics for digital content",
        video: "/videos/thumbnails/motion-graphics.mp4",
        technologies: ["After Effects", "Premiere Pro"],
        link: "/services/multimedia#motion-graphics",
        featured: true
      },
      {
        id: 3,
        title: "Video Editing",
        description: "Professional video editing and post-production",
        video: "/videos/thumbnails/video-editing.mp4",
        technologies: ["Premiere Pro", "After Effects"],
        link: "/services/multimedia#video-editing",
        featured: true
      },
      {
        id: 4,
        title: "Lottie Animation",
        description: "Interactive Lottie animations for web and mobile apps",
        video: "/videos/thumbnails/lottie-animation.mp4",
        technologies: ["After Effects", "Bodymovin"],
        link: "/services/multimedia#animation",
        featured: true
      }
    ]
  },
  {
    id: 3,
    title: "Graphic Designer",
    category: "graphic-design",
    items: [
      {
        id: 1,
        title: "Brand Identity",
        description: "Complete brand identity package",
        image: "/images/thumbnails/graphic-design/brand-identity.png",
        technologies: ["Illustrator", "Photoshop"],
        link: "/services/graphic-design#graphic-1",
        featured: true
      },
      {
        id: 2,
        title: "Marketing Materials",
        description: "Print and digital marketing collateral",
        image: "/images/thumbnails/graphic-design/marketing-materials.png",
        technologies: ["Illustrator", "Photoshop"],
        link: "/services/graphic-design#graphic-2",
        featured: true
      }
    ]
  }
];

// Get featured projects and shuffle them
const getFeaturedProjects = (): Project[] => {
  const featured = projects.flatMap(category => 
    category.items.filter(project => project.featured)
  );
  return shuffleArray(featured).slice(0, 6);
};

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
              UI/UX & MULTIMEDIA
              <br />
              DESIGNER
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
              My aim is to create better user interfaces, multimedia content and modern graphics, Lottie
              animations and marketing materials.
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
                  fallbackSrc="/images/hero/image-1.png"
                  alt="Designer workspace illustration"
                  width={400}
                  height={400}
                  className="object-contain mx-auto"
                  priority
                  projectType="hero"
                  projectName="hero"
                  index={0}
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
                  fallbackSrc="/images/about/image-1.png"
                  alt="About Me"
                  width={450}
                  height={450}
                  className="object-contain w-full h-full"
                  priority
                  projectType="about"
                  projectName="about"
                  index={0}
                />
              </div>
            </div>
          </AnimateInView>

          <AnimateInView variants={fadeInRight}>
            <div className="text-[#FF5D3A] font-medium mb-1">ABOUT ME</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 dark:text-white">WHO I AM</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8 text-sm sm:text-base">
              I am a UI/UX and Multimedia designer who loves creating pixel-perfect designs, unique user interfaces
              and producing Multimedia content. I have a passion for bringing creative ideas to life and I also take pride in
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

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <StaggerContainer className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <StaggerItem>
              <div className="text-[#FF5D3A] font-medium mb-3">SERVICES</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 dark:text-white">WHAT I CAN DO</h2>
              <p className="text-gray-600 dark:text-gray-300">
                I have 4 years of experience in creating user interfaces and multimedia content. Additionally, I create stunning graphics.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <StaggerItem>
              <ServiceCard
                icon={<LayoutIcon className="w-8 h-8 text-[#FF5D3A]" />}
                title="Web/Mobile UI/UX"
                description="UI/UX designs, pixel perfect designs and unique user experiences that enhance user satisfaction."
                href="/services/web-and-mobile"
                buttonText="View Projects"
              />
            </StaggerItem>

            <StaggerItem>
              <ServiceCard
                icon={<VideoIcon className="w-8 h-8 text-[#FF5D3A]" />}
                title="Multimedia Content"
                description="Motion graphics, Lottie animations and premium video editing Services. I create engaging and dynamic visual content that captures attention and effectively communicates your message."
                href="/services/multimedia"
                buttonText="View Projects"
              />
            </StaggerItem>

            <StaggerItem>
              <ServiceCard
                icon={<PenToolIcon className="w-8 h-8 text-[#FF5D3A]" />}
                title="Graphic Design"
                description="Visual content that effectively communicates your brand message and identity."
                href="/services/graphic-design"
                buttonText="View Projects"
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured-projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Random Picks</h2>
            <p className="text-gray-600 dark:text-gray-400">A selection of randomly picked projects from my portfolio showcasing different aspects of my work</p>
          </div>
          
          <div className="max-w-[80%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFeaturedProjects().map((project, index) => (
                <a 
                  href={project.link}
                  key={`${project.title}-${index}`} 
                  className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative flex flex-col"
                >
                  <div className="relative h-52">
                    {project.video ? (
                      <video 
                        src={project.video}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        controls
                      />
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h4 className="text-xl font-semibold mb-3 group-hover:text-[#FF5D3A] transition-colors">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-5">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF5D3A] rounded-lg transition-colors pointer-events-none"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
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

