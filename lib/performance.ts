export const checkNetworkConditions = () => {
  if (typeof window === 'undefined') return false

  // Check for Save-Data header
  if ('connection' in navigator) {
    const conn = (navigator as any).connection
    if (conn.saveData) return false
    
    // Check connection type
    if (['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return false
    
    // Check for slow connection
    if (conn.downlink < 1) return false
  }

  return true
}

export const optimizeResourceLoading = (url: string, type: 'image' | 'video' | 'script'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!checkNetworkConditions()) {
      reject(new Error('Poor network conditions'))
      return
    }

    const timeout = setTimeout(() => {
      reject(new Error('Resource loading timeout'))
    }, 10000)

    if (type === 'image') {
      const img = new Image()
      img.onload = () => {
        clearTimeout(timeout)
        resolve()
      }
      img.onerror = () => {
        clearTimeout(timeout)
        reject(new Error('Image loading failed'))
      }
      img.src = url
    } else if (type === 'video') {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        clearTimeout(timeout)
        resolve()
      }
      video.onerror = () => {
        clearTimeout(timeout)
        reject(new Error('Video loading failed'))
      }
      video.src = url
    } else if (type === 'script') {
      const script = document.createElement('script')
      script.onload = () => {
        clearTimeout(timeout)
        resolve()
      }
      script.onerror = () => {
        clearTimeout(timeout)
        reject(new Error('Script loading failed'))
      }
      script.src = url
    }
  })
}

export const measurePerformance = (metric: string) => {
  if (typeof window === 'undefined' || !window.performance) return

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = performance.getEntriesByType('paint')
  
  const metrics = {
    // Navigation timing
    pageLoad: navigation.loadEventEnd - navigation.startTime,
    domReady: navigation.domContentLoadedEventEnd - navigation.startTime,
    firstByte: navigation.responseStart - navigation.requestStart,
    
    // Paint timing
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
  }

  return metrics[metric as keyof typeof metrics] || 0
}

export const optimizeMemory = () => {
  if (typeof window === 'undefined') return

  // Clear image source on unmount
  const images = document.getElementsByTagName('img')
  for (let i = 0; i < images.length; i++) {
    if (!isElementInViewport(images[i])) {
      images[i].src = ''
    }
  }

  // Clear video source on unmount
  const videos = document.getElementsByTagName('video')
  for (let i = 0; i < videos.length; i++) {
    if (!isElementInViewport(videos[i])) {
      videos[i].src = ''
      videos[i].load()
    }
  }
}

const isElementInViewport = (el: Element) => {
  const rect = el.getBoundingClientRect()
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
} 