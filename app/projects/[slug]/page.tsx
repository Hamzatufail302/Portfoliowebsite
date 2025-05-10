import type React from "react"
import { notFound } from "next/navigation"
import ProjectContent from "./project-content"

// Sample project data - in a real app, this would come from a database or API
const projectsData = {
  "mobile-app-design": {
    title: "Mobile App Design",
    category: "UI/UX Design",
    description:
      "Explore a curated selection of mobile and app UI design projects, showcasing intuitive interfaces and user-centred designs. Each project reflects a commitment to creating seamless and engaging digital experiences tailored to user needs.",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
  },
  "e-commerce-landing-page": {
    title: "Fashion E-commerce Landing Page",
    category: "Web Design",
    description:
      "A modern and elegant landing page design for a fashion e-commerce website. The design focuses on showcasing products while providing an intuitive shopping experience for customers, with attention to detail and brand consistency throughout the user journey.",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3],
  },
  "dashboard-ui": {
    title: "Dashboard UI",
    category: "UI/UX Design",
    description:
      "A comprehensive dashboard UI design for a data analytics platform. The design focuses on data visualization and user-friendly controls, making complex information accessible and actionable for users of all technical levels.",
    imageSection: "projects",
    imageIndex: 2,
    images: [2, 3, 4],
  },

  // Branding Projects
  "restaurant-branding": {
    title: "Restaurant Branding",
    category: "Branding",
    description:
      "A complete branding package for a modern restaurant, including logo design, color palette, typography, and brand guidelines. The branding reflects the restaurant's unique culinary identity and creates a memorable visual experience for customers.",
    imageSection: "projects",
    imageIndex: 3,
    images: [3, 4, 5],
  },
  "tech-startup-branding": {
    title: "Tech Startup Branding",
    category: "Branding",
    description:
      "A modern and innovative branding solution for a tech startup, including logo design, visual identity, and brand guidelines. The branding communicates the company's forward-thinking approach and positions them as leaders in their industry.",
    imageSection: "projects",
    imageIndex: 4,
    images: [4, 5, 6],
  },
  "fashion-brand-identity": {
    title: "Fashion Brand Identity",
    category: "Branding",
    description:
      "A sophisticated brand identity for a fashion label, including logo design, typography, color palette, and brand guidelines. The identity captures the essence of the brand's aesthetic and appeals to their target audience with a timeless yet contemporary approach.",
    imageSection: "projects",
    imageIndex: 5,
    images: [5, 6, 7],
  },

  // Graphic Design - Print Projects
  "crunch-brand-print": {
    title: "Crunch Brand Print Design",
    category: "Print Design",
    description: "Print design materials for Crunch Brand, including business cards, brochures, and marketing collateral. The designs maintain brand consistency while delivering impactful messaging.",
    projectType: "graphic-design/print",
    projectName: "crunch-brand",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1],
    imageCount: 2,
    isMultimedia: false
  },
  "energizer-sustainable-print": {
    title: "Energizer Sustainable Print Design",
    category: "Print Design",
    description: "Print design collection for Energizer Sustainable Solutions, featuring eco-friendly materials and sustainable design practices in marketing collateral.",
    projectType: "graphic-design/print",
    projectName: "energizer-sustainable",
    imageSection: "projects",
    imageIndex: 2,
    images: [2, 3],
    imageCount: 2,
    isMultimedia: false
  },
  "zenith-architecture-print": {
    title: "Zenith Architecture Print Design",
    category: "Print Design",
    description: "Print design materials for Zenith Architecture, showcasing architectural projects through high-quality brochures and presentation materials.",
    projectType: "graphic-design/print",
    projectName: "zenith-architecture",
    imageSection: "projects",
    imageIndex: 4,
    images: [4, 5],
    imageCount: 2,
    isMultimedia: false
  },

  // Multimedia Projects - Animations
  "bloom-animation": {
    title: "Bloom Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Engaging Lottie animation for the Bloom website, featuring smooth transitions and interactive elements that enhance user experience.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "bloom-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/bloom-animation/video.mp4"
  },
  "brand-bridge-animation": {
    title: "Brand Bridge",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic motion graphics for Brand Bridge, showcasing brand elements through fluid animations and creative transitions.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "brand-bridge",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/brand-bridge/video.mp4"
  },
  "fitness-app-animation": {
    title: "Fitness App Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Interactive Lottie animations for a fitness application, bringing workout instructions and achievements to life.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "fitness-app-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/fitness-app/video.mp4"
  },
  "cartease-animation": {
    title: "CartEase Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Smooth and engaging animations for the CartEase e-commerce platform, enhancing the shopping experience.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "cartease",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/cartease/video.mp4"
  },
  "marwen-animation": {
    title: "Marwen Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Creative motion graphics for Marwen, combining artistic elements with fluid animations.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "marwen-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/Marwen/video.mp4"
  },
  "mobile-animation": {
    title: "Mobile UI Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Micro-interactions and UI animations for mobile applications, enhancing user engagement and feedback.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "mobile-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/mobile-animation/video.mp4"
  },
  "upward-animation": {
    title: "Upward Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Motion graphics for the Upward platform, featuring animated data visualizations and UI elements.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "upward-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/upward/video.mp4"
  },
  "shadow-nexus-animation": {
    title: "Shadow Nexus Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic gaming animations for Shadow Nexus, bringing game elements and interactions to life.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "shadow-nexus",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/shadow-nexus/video.mp4"
  },
  "voice-changer-animation": {
    title: "Voice Changer Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Creative animations for the Voice Changer app, visualizing audio transformations and effects.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "voice-changer-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "/videos/projects/voice-changer/video.mp4"
  },

  // Video Editing Projects
  "corporate-video": {
    title: "Corporate Overview Video",
    category: "Video Editing",
    description: "Professional corporate video showcasing company culture, values, and achievements through compelling storytelling.",
    projectType: "multimedia/video-editing",
    projectName: "corporate-video",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true
  },
  "product-video": {
    title: "Product Launch Video",
    category: "Video Editing",
    description: "Dynamic product launch video highlighting features and benefits through professional editing and visual effects.",
    projectType: "multimedia/video-editing",
    projectName: "product-video",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true
  },

  // Web UI Projects
  "e-commerce-website": {
    title: "E-commerce Website",
    category: "Web UI Design",
    description:
      "A complete e-commerce website design with a focus on user experience and conversion optimization. The design includes product listings, product details, cart, checkout, and user account pages.",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
  },
  "portfolio-website": {
    title: "Portfolio Website",
    category: "Web UI Design",
    description:
      "A clean and modern portfolio website design for creative professionals. The design showcases projects in an elegant grid layout with smooth transitions and intuitive navigation.",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3],
  },
  "landing-page": {
    title: "Landing Page",
    category: "Web UI Design",
    description:
      "A high-converting landing page design for a product or service. The design focuses on clear messaging, compelling visuals, and strategic call-to-action placement to maximize conversions.",
    imageSection: "projects",
    imageIndex: 2,
    images: [2, 3, 4],
  },
  "blog-platform": {
    title: "Blog Platform",
    category: "Web UI Design",
    description:
      "A modern blog platform design with a focus on readability and content discovery. The design includes article layouts, category pages, and a responsive reading experience.",
    imageSection: "projects",
    imageIndex: 3,
    images: [3, 4, 5],
  },
  "admin-panel": {
    title: "Admin Panel",
    category: "Web UI Design",
    description:
      "A comprehensive admin panel design for a web application. The design includes dashboards, data tables, forms, and settings pages with a focus on usability and efficiency.",
    imageSection: "projects",
    imageIndex: 4,
    images: [4, 5, 6],
  },
  "academic-stars": {
    title: "Academic Stars Website",
    category: "Web UI Design",
    description: "A modern educational website design for Academic Stars, featuring an intuitive interface for students and educators.",
    projectType: "web-mobile/web-ui",
    projectName: "academic-stars",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6, 7],
    imageCount: 8,
    isMultimedia: false
  },
  "bloom": {
    title: "Bloom Website",
    category: "Web UI Design",
    description: "A vibrant and engaging website design for Bloom, showcasing their services with a modern and clean interface.",
    projectType: "web-mobile/web-ui",
    projectName: "bloom",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5],
    imageCount: 6,
    isMultimedia: false
  },
  "brandbridge": {
    title: "BrandBridge Website",
    category: "Web UI Design",
    description: "A professional website design for BrandBridge, focusing on brand storytelling and client engagement.",
    projectType: "web-mobile/web-ui",
    projectName: "brandbridge",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
    imageCount: 3,
    isMultimedia: false
  },
  "comfort-corner": {
    title: "Comfort Corner Website",
    category: "Web UI Design",
    description: "An inviting e-commerce website design for Comfort Corner, offering a seamless shopping experience.",
    projectType: "web-mobile/web-ui",
    projectName: "comfort-corner",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
    imageCount: 3,
    isMultimedia: false
  },
  "e-commerce-tech-nest": {
    title: "E-commerce Tech Nest",
    category: "Web UI Design",
    description: "A cutting-edge e-commerce platform design for Tech Nest, featuring a modern and user-friendly interface.",
    projectType: "web-mobile/web-ui",
    projectName: "e-commerce-tech-nest",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
    imageCount: 3,
    isMultimedia: false
  },
  "learn-sphere": {
    title: "Learn Sphere Website",
    category: "Web UI Design",
    description: "An educational platform design for Learn Sphere, creating an engaging learning environment.",
    projectType: "web-mobile/web-ui",
    projectName: "learn-sphere",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
    imageCount: 3,
    isMultimedia: false
  },
  "marketit": {
    title: "MarketIT Website",
    category: "Web UI Design",
    description: "A dynamic marketing agency website design for MarketIT, highlighting their services and portfolio.",
    projectType: "web-mobile/web-ui",
    projectName: "marketit",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
    imageCount: 3,
    isMultimedia: false
  },
  "shadow-nexus-gaming": {
    title: "Shadow Nexus Gaming",
    category: "Web UI Design",
    description: "An immersive gaming website design for Shadow Nexus, creating an engaging platform for gamers.",
    projectType: "web-mobile/web-ui",
    projectName: "shadow-nexus-gaming",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4],
    imageCount: 5,
    isMultimedia: false
  },
  "upward": {
    title: "Upward Website",
    category: "Web UI Design",
    description: "A professional business website design for Upward, showcasing their growth solutions.",
    projectType: "web-mobile/web-ui",
    projectName: "upward",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4],
    imageCount: 5,
    isMultimedia: false
  },

  // Mobile App UI Projects
  "blocksite": {
    title: "Blocksite App",
    category: "Mobile UI Design",
    description: "A comprehensive mobile app design for blocking unwanted content and managing screen time effectively.",
    projectType: "web-mobile/mobile-ui",
    projectName: "blocksite",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6],
    imageCount: 7,
    isMultimedia: false
  },
  "call-announcer": {
    title: "Call Announcer",
    category: "Mobile UI Design",
    description: "An intuitive mobile app design for call announcement features with customizable voice options.",
    projectType: "web-mobile/mobile-ui",
    projectName: "call-announcer",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5],
    imageCount: 6,
    isMultimedia: false
  },
  "call-recorder": {
    title: "Call Recorder",
    category: "Mobile UI Design",
    description: "A user-friendly call recording app design with intuitive controls and organized recording management.",
    projectType: "web-mobile/mobile-ui",
    projectName: "call-recorder",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5],
    imageCount: 6,
    isMultimedia: false
  },
  "carteasy": {
    title: "CartEase",
    category: "Mobile UI Design",
    description: "A modern e-commerce mobile app design focused on simplifying the shopping experience.",
    projectType: "web-mobile/mobile-ui",
    projectName: "carteasy",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6],
    imageCount: 7,
    isMultimedia: false
  },
  "meal-mate": {
    title: "Meal Mate",
    category: "Mobile UI Design",
    description: "A meal planning and recipe discovery app design with a focus on healthy eating habits.",
    projectType: "web-mobile/mobile-ui",
    projectName: "meal-mate",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    imageCount: 9,
    isMultimedia: false
  },
  "voice-changer": {
    title: "Voice Changer",
    category: "Mobile UI Design",
    description: "An entertaining voice modification app design with various sound effects and easy-to-use controls.",
    projectType: "web-mobile/mobile-ui",
    projectName: "voice-changer",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6],
    imageCount: 7,
    isMultimedia: false
  },

  // Animation Projects
  "product-animation": {
    title: "Product Animation",
    category: "Animation",
    description:
      "A series of product animations that showcase features and benefits in an engaging and visually appealing way. These animations are designed for marketing materials and product demonstrations.",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3],
    isMultimedia: true
  },
  "logo-animation": {
    title: "Logo Animation",
    category: "Animation",
    description:
      "A collection of logo animations that bring brand identities to life. These animations are designed for video intros, website headers, and social media content.",
    imageSection: "projects",
    imageIndex: 2,
    images: [2, 3, 4],
    isMultimedia: true
  },
  "character-animation": {
    title: "Character Animation",
    category: "Animation",
    description:
      "A series of character animations for storytelling and brand mascots. These animations bring personality and emotion to digital content and marketing campaigns.",
    imageSection: "projects",
    imageIndex: 3,
    images: [3, 4, 5],
    isMultimedia: true
  },

  // Video Editing Projects
  "product-showcase": {
    title: "Product Showcase",
    category: "Video Editing",
    description:
      "Video editing for product demonstrations and showcases. The editing highlights product features and benefits with a focus on visual appeal and clear communication.",
    imageSection: "projects",
    imageIndex: 5,
    images: [5, 6, 7],
    isMultimedia: true
  },
  "event-highlights": {
    title: "Event Highlights",
    category: "Video Editing",
    description:
      "Video editing for event coverage and highlights. The editing captures the essence and key moments of events with a dynamic and engaging style.",
    imageSection: "projects",
    imageIndex: 6,
    images: [6, 7, 8],
    isMultimedia: true
  },

  // Motion Graphics Projects
  "explainer-video": {
    title: "Explainer Video",
    category: "Motion Graphics",
    description:
      "Motion graphics for explainer videos that communicate complex concepts in a simple and engaging way. The style is clean, modern, and focused on clear communication.",
    imageSection: "projects",
    imageIndex: 7,
    images: [7, 8, 9],
    isMultimedia: true
  },
  "infographic-animation": {
    title: "Infographic Animation",
    category: "Motion Graphics",
    description:
      "Animated infographics that present data and information in a visually engaging way. The animations bring static information to life with movement and visual storytelling.",
    imageSection: "projects",
    imageIndex: 8,
    images: [8, 9, 0],
    isMultimedia: true
  },
  "ui-motion": {
    title: "UI Motion",
    category: "Motion Graphics",
    description:
      "Motion graphics for user interface animations and transitions. These animations enhance user experience and provide visual feedback for interactions.",
    imageSection: "projects",
    imageIndex: 9,
    images: [9, 0, 1],
    isMultimedia: true
  },

  // Social Media Projects
  "instagram-posts": {
    title: "Instagram Posts",
    category: "Social Media",
    description:
      "Graphic design for Instagram posts that capture attention and drive engagement. The designs are visually appealing and optimized for the Instagram feed.",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
  },
  "facebook-ads": {
    title: "Facebook Ads",
    category: "Social Media",
    description:
      "Graphic design for Facebook ads that drive clicks and conversions. The designs are attention-grabbing and aligned with marketing objectives.",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3],
  },
  "twitter-graphics": {
    title: "Twitter Graphics",
    category: "Social Media",
    description:
      "Graphic design for Twitter posts and headers that enhance brand presence. The designs are optimized for Twitter's format and audience.",
    imageSection: "projects",
    imageIndex: 2,
    images: [2, 3, 4],
  },
  "energizer-ads": {
    title: "Energizer Ads Campaign",
    category: "Social Media Design",
    description: "A dynamic social media advertising campaign for Energizer, showcasing sustainable energy solutions.",
    projectType: "graphic-design/social-media",
    projectName: "energizer-ads",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: false
  },
  "face-swap": {
    title: "Face Swap App SS Design",
    category: "Social Media Design",
    description: "Social media design and promotional materials for an innovative face swap application.",
    projectType: "graphic-design/social-media",
    projectName: "face-swap",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4],
    imageCount: 5,
    isMultimedia: false
  },
  "jewelry-social": {
    title: "Jewelry Brand Social Media Post",
    category: "Social Media Design",
    description: "Elegant social media content design for a luxury jewelry brand, showcasing exquisite pieces with sophisticated visual aesthetics.",
    projectType: "graphic-design/social-media",
    projectName: "jewelry-social",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: false
  },
  "zenith-social": {
    title: "Zenith Brand Social Media",
    category: "Social Media Design",
    description: "Engaging social media content design for Zenith Architecture, featuring modern and professional aesthetics.",
    projectType: "graphic-design/social-media",
    projectName: "zenith-social",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: false
  },

  // Print Design Projects
  "business-cards": {
    title: "Business Cards",
    category: "Print Design",
    description:
      "Business card designs that make a lasting impression. The designs are professional, memorable, and aligned with brand identity.",
    imageSection: "projects",
    imageIndex: 3,
    images: [3, 4, 5],
  },
  brochures: {
    title: "Brochures",
    category: "Print Design",
    description:
      "Brochure designs that effectively communicate information and promote products or services. The layouts are clean, organized, and visually appealing.",
    imageSection: "projects",
    imageIndex: 4,
    images: [4, 5, 6],
  },
  posters: {
    title: "Posters",
    category: "Print Design",
    description:
      "Poster designs that capture attention and communicate messages effectively. The designs are bold, visually striking, and optimized for their intended viewing context.",
    imageSection: "projects",
    imageIndex: 5,
    images: [5, 6, 7],
  },
  "energizer-sustainable": {
    title: "Energizer Sustainable",
    category: "Branding",
    description: "A comprehensive branding project for Energizer Sustainable, focusing on eco-friendly energy solutions.",
    projectType: "graphic-design/branding",
    projectName: "energizer-sustainable",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    imageCount: 13,
    isMultimedia: false
  },
  "zenith-architecture": {
    title: "Zenith Architecture",
    category: "Branding",
    description: "A sophisticated branding design for Zenith Architecture, reflecting modern architectural aesthetics.",
    projectType: "graphic-design/branding",
    projectName: "zenith-architecture",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    imageCount: 10,
    isMultimedia: false
  },
  "crunch-brand": {
    title: "Crunch Brand",
    category: "Branding",
    description: "A dynamic and energetic branding project for Crunch, emphasizing fitness and wellness.",
    projectType: "graphic-design/branding",
    projectName: "crunch-brand",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    imageCount: 12,
    isMultimedia: false
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projectsData[slug as keyof typeof projectsData]

  if (!project) {
    notFound()
  }

  return <ProjectContent project={project} />
}
