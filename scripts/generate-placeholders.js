const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const videos = [
  {
    name: 'product-animation',
    text: 'Product Animation Demo',
    duration: 5
  },
  {
    name: 'logo-animation',
    text: 'Logo Animation Demo',
    duration: 5
  },
  {
    name: 'character-animation',
    text: 'Character Animation Demo',
    duration: 5
  },
  {
    name: 'commercial-edit',
    text: 'Commercial Video Demo',
    duration: 5
  },
  {
    name: 'social-media-edit',
    text: 'Social Media Demo',
    duration: 5
  },
  {
    name: 'promotional-edit',
    text: 'Promotional Video Demo',
    duration: 5
  },
  {
    name: 'explainer-motion',
    text: 'Explainer Video Demo',
    duration: 5
  },
  {
    name: 'infographic-motion',
    text: 'Infographic Animation Demo',
    duration: 5
  },
  {
    name: 'title-motion',
    text: 'Title Animation Demo',
    duration: 5
  }
];

const outputDir = path.join(__dirname, '../public/videos/projects');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate each video
videos.forEach(video => {
  const outputPath = path.join(outputDir, `${video.name}.mp4`);
  
  // FFmpeg command to generate a video with text
  const command = `ffmpeg -f lavfi -i color=c=black:s=1280x720:d=${video.duration} -vf "drawtext=text='${video.text}':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=(h-text_h)/2:fontfile=/Windows/Fonts/arial.ttf" -c:v libx264 -t ${video.duration} "${outputPath}"`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating ${video.name}:`, error);
      return;
    }
    console.log(`Generated ${video.name}`);
  });
}); 