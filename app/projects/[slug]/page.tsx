"use client"

import type React from "react"
import { notFound } from "next/navigation"
import ProjectContent from "./project-content"

// Define the project data type
type ProjectData = {
  title: string
  category: string
  description: string
  imageSection: string
  imageIndex: number
  images?: number[]
  isMultimedia?: boolean
  videoUrl?: string
  videoUrls?: string[]
  projectName?: string
  projectType?: string
  slug?: string
  image?: string
  imageCount?: number
}

// Sample project data - in a real app, this would come from a database or API
const projectsData: Record<string, ProjectData> = {
  // Web UI Projects
  "academic-stars": {
    title: "Academic Stars Website",
    category: "Web UI Design",
    description: "A modern educational website design for Academic Stars, featuring intuitive navigation and engaging content presentation.",
    projectType: "web-mobile/web-ui",
    projectName: "academic-stars",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7, 8],
    slug: "academic-stars"
  },
  "bloom": {
    title: "Bloom Website",
    category: "Web UI Design",
    description: "A vibrant and engaging website design for Bloom, showcasing their services and brand identity.",
    projectType: "web-mobile/web-ui",
    projectName: "bloom",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6]
  },
  "brandbridge": {
    title: "BrandBridge Website",
    category: "Web UI Design",
    description: "A professional website design for BrandBridge, emphasizing their branding expertise and portfolio.",
    projectType: "web-mobile/web-ui",
    projectName: "brandbridge",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3]
  },
  "comfort-corner": {
    title: "Comfort Corner Website",
    category: "Web UI Design",
    description: "An inviting website design for Comfort Corner, featuring their furniture collection and services.",
    projectType: "web-mobile/web-ui",
    projectName: "comfort-corner",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3]
  },
  "e-commerce-tech-nest": {
    title: "E-commerce Tech Nest",
    category: "Web UI Design",
    description: "A modern e-commerce website design for Tech Nest, with seamless shopping experience and product showcase.",
    projectType: "web-mobile/web-ui",
    projectName: "e-commerce-tech-nest",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3]
  },
  "learn-sphere": {
    title: "Learn Sphere Website",
    category: "Web UI Design",
    description: "An educational platform design for Learn Sphere, focusing on user engagement and content accessibility.",
    projectType: "web-mobile/web-ui",
    projectName: "learn-sphere",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3]
  },
  "marketit": {
    title: "MarketIT Website",
    category: "Web UI Design",
    description: "A dynamic website design for MarketIT, showcasing their marketing services and expertise.",
    projectType: "web-mobile/web-ui",
    projectName: "marketit",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3]
  },
  "shadow-nexus-gaming": {
    title: "Shadow Nexus Gaming",
    category: "Web UI Design",
    description: "An immersive gaming website design for Shadow Nexus, featuring their game portfolio and community.",
    projectType: "web-mobile/web-ui",
    projectName: "shadow-nexus-gaming",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  "upward": {
    title: "Upward Website",
    category: "Web UI Design",
    description: "A professional website design for Upward, highlighting their business growth solutions.",
    projectType: "web-mobile/web-ui",
    projectName: "upward",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7]
  },

  // Mobile UI Projects
  "blocksite": {
    title: "Blocksite App",
    category: "Mobile UI Design",
    description: "A productivity app design for Blocksite, helping users manage their digital distractions.",
    projectType: "web-mobile/mobile-ui",
    projectName: "blocksite",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7]
  },
  "call-announcer": {
    title: "Call Announcer",
    category: "Mobile UI Design",
    description: "A utility app design for Call Announcer, providing hands-free call notifications.",
    projectType: "web-mobile/mobile-ui",
    projectName: "call-announcer",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6]
  },
  "call-recorder": {
    title: "Call Recorder",
    category: "Mobile UI Design",
    description: "A professional call recording app design with intuitive controls and organization.",
    projectType: "web-mobile/mobile-ui",
    projectName: "call-recorder",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6]
  },
  "carteasy": {
    title: "CartEase",
    category: "Mobile UI Design",
    description: "A shopping list management app design that simplifies grocery shopping.",
    projectType: "web-mobile/mobile-ui",
    projectName: "carteasy",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7]
  },
  "meal-mate": {
    title: "Meal Mate",
    category: "Mobile UI Design",
    description: "A meal planning and recipe app design for healthy eating habits.",
    projectType: "web-mobile/mobile-ui",
    projectName: "meal-mate",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  "voice-changer": {
    title: "Voice Changer",
    category: "Mobile UI Design",
    description: "A fun voice modification app design with various audio effects.",
    projectType: "web-mobile/mobile-ui",
    projectName: "voice-changer",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7]
  },
  "fitness-app": {
    title: "Active Pulse",
    category: "Mobile UI Design",
    description:
      "A dynamic fitness application design with features for workout tracking, nutrition planning, and progress monitoring. Active Pulse focuses on motivation and ease of use to help users achieve their fitness goals.",
    projectType: "web-mobile/mobile-ui",
    projectName: "fitness-app",
    imageSection: "projects",
    imageIndex: 5,
    images: [5, 6, 7],
    imageCount: 3
  },

  // Animation Projects
  "bloom-animation": {
    title: "Bloom Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic motion graphics for Bloom, featuring smooth transitions and engaging animations.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "bloom-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042682/video_gzaxtn.mp4",
    slug: "bloom-animation"
  },
  "brand-bridge-animation": {
    title: "Brand Bridge",
    category: "Lottie Animation/Motion Graphics",
    description: "Creative animations for Brand Bridge, showcasing their branding process.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "brand-bridge",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042645/video_hj5h8c.mp4"
  },
  "cartease-animation": {
    title: "CartEase Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Engaging motion graphics for CartEase app, demonstrating key features and functionality.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "cartease",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042726/video.mp4"
  },
  "marwen-animation": {
    title: "Marwen Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Creative motion graphics for Marwen, bringing their story to life.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "marwen-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042561/video_oi9fgl.mp4"
  },
  "mobile-animation": {
    title: "ConnectNow",
    category: "Lottie Animation/Motion Graphics",
    description: "Motion graphics for ConnectNow app, showcasing smooth interface animations and transitions.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "mobile-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042649/video_l38n1n.mp4"
  },
  "shadow-nexus-animation": {
    title: "Shadow Nexus Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic gaming animations for Shadow Nexus, bringing game elements to life.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "shadow-nexus",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042631/video_fllslt.mp4"
  },
  "voice-changer-animation": {
    title: "Voice Changer Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Creative animations for the Voice Changer app, visualizing audio effects.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "voice-changer-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042633/video_ojk1zs.mp4"
  },
  "upward-animation": {
    title: "Upward Animation",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic motion graphics for Upward platform, showcasing smooth transitions and engaging animations.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "upward-animation",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042681/video_h2cmuk.mp4"
  },
  "fitness-app-animation": {
    title: "Active Pulse",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic motion graphics for Active Pulse fitness app, showcasing workout tracking and user interaction animations.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "fitness-app",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042656/video_wtgjfu.mp4"
  },
  "active-pulse-animation": {
    title: "Active Pulse",
    category: "Lottie Animation/Motion Graphics",
    description: "Dynamic motion graphics for Active Pulse fitness app, showcasing workout tracking and user interaction animations.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "active-pulse",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042656/video_wtgjfu.mp4"
  },
  "connectnow-animation": {
    title: "ConnectNow",
    category: "Lottie Animation/Motion Graphics",
    description: "Motion graphics for ConnectNow app, showcasing smooth interface animations and transitions that enhance user experience.",
    projectType: "multimedia/lottie-motion-graphic",
    projectName: "connectnow",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    videoUrl: "https://res.cloudinary.com/di3u607lk/video/upload/v1747042649/video_l38n1n.mp4"
  },
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

  // Video Editing Projects
  "fashion-city": {
    title: "Fashion City",
    category: "Video Editing",
    description: "A dynamic fashion promotional video showcasing the latest trends and styles.",
    projectType: "multimedia/video-editing",
    projectName: "fashion-city",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    slug: "fashion-city"
  },
  "gengez-khan": {
    title: "Gengez Khan",
    category: "Video Editing",
    description: "Professional video production highlighting the unique aspects of Gengez Khan brand.",
    projectType: "multimedia/video-editing",
    projectName: "gengez-khan",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    slug: "gengez-khan"
  },
  "iman-gadhi": {
    title: "Iman Gadhi",
    category: "Video Editing",
    description: "Engaging video content creation for Iman Gadhi's personal brand.",
    projectType: "multimedia/video-editing",
    projectName: "iman-gadhi",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    slug: "iman-gadhi"
  },
  "social-media-marketing-agency": {
    title: "Social Media Marketing Agency",
    category: "Video Editing",
    description: "Compelling video content for social media marketing campaigns.",
    projectType: "multimedia/video-editing",
    projectName: "social-media-marketing-agency",
    imageSection: "projects",
    imageIndex: 0,
    images: [0],
    imageCount: 1,
    isMultimedia: true,
    slug: "social-media-marketing-agency"
  },

  // Graphic Design - Branding Projects
  "crunch-brand": {
    title: "Crunch Brand Identity",
    category: "Branding",
    description: "A comprehensive brand identity design for Crunch, including logo, color palette, and brand guidelines.",
    projectType: "graphic-design/branding",
    projectName: "crunch-brand",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  "energizer-sustainable": {
    title: "Energizer Sustainable Solutions",
    category: "Branding",
    description: "Brand identity design for Energizer's sustainable product line, emphasizing eco-friendly values.",
    projectType: "graphic-design/branding",
    projectName: "energizer-sustainable",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  },
  "zenith-architecture": {
    title: "Zenith Architecture & Interiors",
    category: "Branding",
    description: "Sophisticated brand identity for Zenith Architecture, reflecting their modern design philosophy.",
    projectType: "graphic-design/branding",
    projectName: "zenith-architecture",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },

  // Graphic Design - Print Design Projects
  "crunch-brand-print": {
    title: "Crunch Brand Print Design",
    category: "Print Design",
    description: "Print collateral design for Crunch brand, including business cards, letterheads, and marketing materials.",
    projectType: "graphic-design/print",
    projectName: "crunch-brand",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2]
  },
  "energizer-sustainable-print": {
    title: "Energizer Sustainable Print Design",
    category: "Print Design",
    description: "Print design for Energizer's sustainable product line, featuring eco-friendly materials and designs.",
    projectType: "graphic-design/print",
    projectName: "energizer-sustainable",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2]
  },
  "zenith-architecture-print": {
    title: "Zenith Architecture Print Design",
    category: "Print Design",
    description: "Print materials for Zenith Architecture, showcasing their portfolio and services.",
    projectType: "graphic-design/print",
    projectName: "zenith-architecture",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 6]
  },

  // Graphic Design - Social Media Projects
  "leather-point": {
    title: "LeatherPoint Social Media",
    category: "Social Media Design",
    description: "Social media designs for LeatherPoint, showcasing their premium leather products and brand identity.",
    projectType: "graphic-design/social-media",
    projectName: "LeatherPoint",
    imageSection: "projects",
    imageIndex: 1,
    images: [1]
  },
  "gem-passion": {
    title: "GemPassion Social Media",
    category: "Social Media Design",
    description: "Elegant social media content for GemPassion jewelry brand, highlighting their unique collections.",
    projectType: "graphic-design/social-media",
    projectName: "GemPassion",
    imageSection: "projects",
    imageIndex: 1,
    images: [1]
  },
  "face-swap": {
    title: "Face Swap App Social Media",
    category: "Social Media Design",
    description: "Social media designs for Face Swap app, showcasing the app's features and fun transformations.",
    projectType: "graphic-design/social-media",
    projectName: "face-swap",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5]
  },
  "energizer-ads": {
    title: "Energizer Ads Campaign",
    category: "Social Media Design",
    description: "Social media campaign designs for Energizer, featuring engaging visuals and consistent branding.",
    projectType: "graphic-design/social-media",
    projectName: "energizer-ads",
    imageSection: "projects",
    imageIndex: 1,
    images: [1]
  },
  "zenith-social": {
    title: "Zenith Brand Social Media",
    category: "Social Media Design",
    description: "Social media content design for Zenith Architecture, highlighting their projects and expertise.",
    projectType: "graphic-design/social-media",
    projectName: "zenith-social",
    imageSection: "projects",
    imageIndex: 1,
    images: [1]
  },
  "jewelry-social": {
    title: "Jewelry Brand Social Media Post",
    category: "Social Media Design",
    description: "Elegant social media designs for a luxury jewelry brand, emphasizing product aesthetics.",
    projectType: "graphic-design/social-media",
    projectName: "jewelry-social",
    imageSection: "projects",
    imageIndex: 1,
    images: [1, 2, 3, 4, 5, 6]
  },

  // Motion Graphics Projects
  "logo-animation": {
    title: "Logo Animation Collection",
    category: "Motion Graphics",
    description: "A collection of dynamic logo animations showcasing various styles and techniques in motion design.",
    projectType: "multimedia/motion-graphics",
    projectName: "logo-animation",
    imageSection: "projects",
    imageIndex: 1,
    isMultimedia: true,
    slug: "logo-animation",
    image: "/videos/motion-graphics/logo-animation/image-1.png",
    videoUrls: [
      "/videos/motion-graphics/logo-animation/video-1.mp4",
      "/videos/motion-graphics/logo-animation/video-2.mp4",
      "/videos/motion-graphics/logo-animation/video-3.mp4"
    ]
  },
  "messaging-animation": {
    title: "Messaging Animation",
    category: "Motion Graphics",
    description: "A modern and engaging messaging app animation that brings user interactions to life.",
    projectType: "multimedia/motion-graphics",
    projectName: "messaging-animation",
    imageSection: "projects",
    imageIndex: 1,
    isMultimedia: true,
    slug: "messaging-animation",
    image: "/videos/motion-graphics/messaging-animation/image-1.png",
    videoUrl: "/videos/motion-graphics/messaging-animation/video-1.mp4"
  },
  "illustration-animation": {
    title: "Illustration Animation",
    category: "Motion Graphics",
    description: "Creative illustration animations that combine artistry with motion to tell compelling stories.",
    projectType: "multimedia/motion-graphics",
    projectName: "illustration-animation",
    imageSection: "projects",
    imageIndex: 1,
    isMultimedia: true,
    slug: "illustration-animation",
    image: "/videos/motion-graphics/illustration-animation/image-1.png",
    videoUrl: "/videos/motion-graphics/illustration-animation/video-1.mp4"
  },
  "onboarding-animation": {
    title: "Onboarding Animation",
    category: "Motion Graphics",
    description: "Smooth and informative onboarding animations that guide users through app features and functionality.",
    projectType: "multimedia/motion-graphics",
    projectName: "onboarding-animation",
    imageSection: "projects",
    imageIndex: 1,
    isMultimedia: true,
    slug: "onboarding-animation",
    image: "/videos/motion-graphics/onboarding-animation/image-1.png",
    videoUrl: "/videos/motion-graphics/onboarding-animation/video-1.mp4"
  }
}

interface PageProps {
  params: { slug: string }
}

// Handle params as async as required by Next.js 13+
export default async function Page({ params }: PageProps) {
  // Properly await the params.slug as required by Next.js
  const slug = await Promise.resolve(params.slug)
  const project = projectsData[slug]

  if (!project) {
    notFound()
  }

  // Ensure all required properties are present
  const projectWithDefaults = {
    ...project,
    slug,
    images: project.images || [],
    isMultimedia: project.isMultimedia || false,
    projectType: project.projectType || '',
    projectName: project.projectName || '',
    image: project.image || '',
    videoUrl: project.videoUrl || '',
    videoUrls: project.videoUrls || []
  }

  return <ProjectContent project={projectWithDefaults} />
}
