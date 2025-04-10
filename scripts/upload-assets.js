// This is a script to manually upload assets to your portfolio
// You would run this locally with Node.js

const fs = require("fs")
const path = require("path")

// Define the sections and their corresponding directories
const sections = {
  logo: "./assets/logo",
  hero: "./assets/hero",
  about: "./assets/about",
  projects: "./assets/projects",
  testimonials: "./assets/testimonials",
  services: "./assets/services",
}

// Function to convert an image to a data URL
function imageToDataURL(filePath) {
  const fileData = fs.readFileSync(filePath)
  const extension = path.extname(filePath).slice(1)
  const base64 = fileData.toString("base64")
  return `data:image/${extension};base64,${base64}`
}

// Function to process all images in a directory
function processDirectory(directory, section) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} does not exist. Skipping.`)
    return []
  }

  const files = fs.readdirSync(directory)
  const images = files.filter((file) => {
    const ext = path.extname(file).toLowerCase()
    return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)
  })

  return images.map((image) => {
    const filePath = path.join(directory, image)
    return imageToDataURL(filePath)
  })
}

// Process all sections and create a JSON file
async function processAllSections() {
  const portfolioImages = {}

  for (const [section, directory] of Object.entries(sections)) {
    console.log(`Processing ${section} images...`)
    portfolioImages[section] = processDirectory(directory, section)
    console.log(`Added ${portfolioImages[section].length} images to ${section}`)
  }

  // Save the result to a JSON file
  fs.writeFileSync("portfolio-images.json", JSON.stringify(portfolioImages, null, 2))
  console.log("Created portfolio-images.json")
  console.log(
    'To use these images, copy the content of this file and use it with localStorage.setItem("portfolioImages", JSON.stringify(content))',
  )
}

// Run the script
processAllSections().catch(console.error)

