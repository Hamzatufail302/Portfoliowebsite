import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const MEDIA_DIRECTORIES = {
  projects: 'public/images/projects',
  services: 'public/images/services',
  hero: 'public/images/hero',
  logo: 'public/images/logo',
  videos: 'public/videos'
};

// Ensure directories exist
Object.values(MEDIA_DIRECTORIES).forEach(dir => {
  if (!existsSync(dir)) {
    mkdir(dir, { recursive: true });
  }
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as keyof typeof MEDIA_DIRECTORIES;

    if (!file || !category) {
      return NextResponse.json({ error: 'File and category are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a clean filename
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
    const filePath = join(process.cwd(), MEDIA_DIRECTORIES[category], fileName);
    
    await writeFile(filePath, buffer);
    
    const relativePath = `/${MEDIA_DIRECTORIES[category]}/${fileName}`.replace('public/', '');
    return NextResponse.json({ 
      path: relativePath,
      category: category,
      fullPath: MEDIA_DIRECTORIES[category] + '/' + fileName
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as keyof typeof MEDIA_DIRECTORIES;

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const directory = join(process.cwd(), MEDIA_DIRECTORIES[category]);
    if (!existsSync(directory)) {
      return NextResponse.json({ files: [] });
    }

    const files = await readdir(directory);
    const paths = files
      .filter(file => {
        const ext = file.toLowerCase();
        if (category === 'videos') {
          return ext.endsWith('.mp4') || ext.endsWith('.webm') || ext.endsWith('.mov');
        }
        return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.webp');
      })
      .map(file => ({
        path: `/${MEDIA_DIRECTORIES[category]}/${file}`.replace('public/', ''),
        fullPath: `${MEDIA_DIRECTORIES[category]}/${file}`,
        filename: file
      }));

    return NextResponse.json({ files: paths });
  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    const fullPath = join(process.cwd(), 'public', filePath);
    await unlink(fullPath);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
} 