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

  // Multimedia Projects
  "motion-graphics": {
    title: "Motion Graphics",
    category: "Multimedia",
    description:
      "A series of motion graphics animations for a marketing campaign, including animated logos, transitions, and visual effects. These dynamic visuals enhance brand storytelling and create engaging content for digital platforms.",
    imageSection: "projects",
    imageIndex: 6,
    images: [6, 7, 8],
  },
  "video-editing": {
    title: "Video Editing",
    category: "Multimedia",
    description:
      "Professional video editing for a corporate promotional video, including color grading, transitions, and sound design. The editing enhances the narrative flow and creates a polished final product that effectively communicates the client's message.",
    imageSection: "projects",
    imageIndex: 7,
    images: [7, 8, 9],
  },
  "3d-animation": {
    title: "3D Animation",
    category: "Multimedia",
    description:
      "A 3D animation project for a product showcase, including modeling, texturing, animation, and rendering. The animation highlights the product's features and benefits in an engaging and visually stunning way.",
    imageSection: "projects",
    imageIndex: 8,
    images: [8, 9, 0],
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

  // Mobile App UI Projects
  "fitness-app": {
    title: "Fitness App",
    category: "Mobile UI Design",
    description:
      "A fitness app design with features for workout tracking, nutrition planning, and progress monitoring. The design focuses on motivation and ease of use to help users achieve their fitness goals.",
    imageSection: "projects",
    imageIndex: 5,
    images: [5, 6, 7],
  },
  "food-delivery-app": {
    title: "Food Delivery App",
    category: "Mobile UI Design",
    description:
      "A food delivery app design with features for restaurant browsing, menu exploration, order placement, and delivery tracking. The design prioritizes a seamless ordering experience.",
    imageSection: "projects",
    imageIndex: 6,
    images: [6, 7, 8],
  },
  "social-media-app": {
    title: "Social Media App",
    category: "Mobile UI Design",
    description:
      "A social media app design with features for content sharing, user interaction, and profile management. The design focuses on engagement and community building.",
    imageSection: "projects",
    imageIndex: 7,
    images: [7, 8, 9],
  },
  "travel-app": {
    title: "Travel App",
    category: "Mobile UI Design",
    description:
      "A travel app design with features for destination discovery, itinerary planning, and booking management. The design emphasizes inspiration and practical travel tools.",
    imageSection: "projects",
    imageIndex: 8,
    images: [8, 9, 0],
  },
  "e-commerce-app": {
    title: "E-commerce App",
    category: "Mobile UI Design",
    description:
      "A mobile e-commerce app design with features for product browsing, wishlist management, and secure checkout. The design focuses on a seamless shopping experience on mobile devices.",
    imageSection: "projects",
    imageIndex: 9,
    images: [9, 0, 1],
  },
  "music-player-app": {
    title: "Music Player App",
    category: "Mobile UI Design",
    description:
      "A music player app design with features for playlist management, music discovery, and audio playback. The design emphasizes intuitive controls and visual appeal.",
    imageSection: "projects",
    imageIndex: 0,
    images: [0, 1, 2],
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
  },
  "logo-animation": {
    title: "Logo Animation",
    category: "Animation",
    description:
      "A collection of logo animations that bring brand identities to life. These animations are designed for video intros, website headers, and social media content.",
    imageSection: "projects",
    imageIndex: 2,
    images: [2, 3, 4],
  },
  "character-animation": {
    title: "Character Animation",
    category: "Animation",
    description:
      "A series of character animations for storytelling and brand mascots. These animations bring personality and emotion to digital content and marketing campaigns.",
    imageSection: "projects",
    imageIndex: 3,
    images: [3, 4, 5],
  },

  // Video Editing Projects
  "corporate-video": {
    title: "Corporate Video",
    category: "Video Editing",
    description:
      "Professional video editing for corporate communications, including company profiles, product launches, and internal communications. The editing style is clean, professional, and aligned with brand guidelines.",
    imageSection: "projects",
    imageIndex: 4,
    images: [4, 5, 6],
  },
  "product-showcase": {
    title: "Product Showcase",
    category: "Video Editing",
    description:
      "Video editing for product demonstrations and showcases. The editing highlights product features and benefits with a focus on visual appeal and clear communication.",
    imageSection: "projects",
    imageIndex: 5,
    images: [5, 6, 7],
  },
  "event-highlights": {
    title: "Event Highlights",
    category: "Video Editing",
    description:
      "Video editing for event coverage and highlights. The editing captures the essence and key moments of events with a dynamic and engaging style.",
    imageSection: "projects",
    imageIndex: 6,
    images: [6, 7, 8],
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
  },
  "infographic-animation": {
    title: "Infographic Animation",
    category: "Motion Graphics",
    description:
      "Animated infographics that present data and information in a visually engaging way. The animations bring static information to life with movement and visual storytelling.",
    imageSection: "projects",
    imageIndex: 8,
    images: [8, 9, 0],
  },
  "ui-motion": {
    title: "UI Motion",
    category: "Motion Graphics",
    description:
      "Motion graphics for user interface animations and transitions. These animations enhance user experience and provide visual feedback for interactions.",
    imageSection: "projects",
    imageIndex: 9,
    images: [9, 0, 1],
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
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projectsData[slug as keyof typeof projectsData]

  if (!project) {
    notFound()
  }

  return <ProjectContent project={project} />
}
