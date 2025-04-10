'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type MediaFile = {
  path: string;
  fullPath: string;
  filename: string;
};

export default function MediaManagerPage() {
  const [images, setImages] = useState<{ [key: string]: MediaFile[] }>({
    projects: [],
    services: [],
    hero: [],
    logo: []
  });
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('projects');
  const [isUploading, setIsUploading] = useState(false);

  const loadMediaFiles = async (category: string) => {
    try {
      const response = await fetch(`/api/media?category=${category}`);
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error(`Failed to load ${category} files:`, error);
      toast.error(`Failed to load ${category} files`);
      return [];
    }
  };

  useEffect(() => {
    const loadAllMedia = async () => {
      const [projects, services, hero, logo, videos] = await Promise.all([
        loadMediaFiles('projects'),
        loadMediaFiles('services'),
        loadMediaFiles('hero'),
        loadMediaFiles('logo'),
        loadMediaFiles('videos')
      ]);

      setImages({
        projects,
        services,
        hero,
        logo
      });
      setVideos(videos);
    };

    loadAllMedia();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        return {
          path: data.path,
          fullPath: data.fullPath,
          filename: file.name
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      
      setImages(prev => ({
        ...prev,
        [category]: [...prev[category], ...uploadedFiles]
      }));
      
      toast.success(`Images uploaded successfully to ${category} folder`);
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'videos');

        const response = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        return {
          path: data.path,
          fullPath: data.fullPath,
          filename: file.name
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setVideos(prev => [...prev, ...uploadedFiles]);
      toast.success('Videos uploaded successfully to videos folder');
    } catch (error) {
      toast.error('Failed to upload videos');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (file: MediaFile, category: string) => {
    try {
      const response = await fetch(`/api/media?path=${encodeURIComponent(file.path)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      if (category === 'videos') {
        setVideos(prev => prev.filter(v => v.path !== file.path));
      } else {
        setImages(prev => ({
          ...prev,
          [category]: prev[category].filter(i => i.path !== file.path)
        }));
      }
      toast.success(`File deleted successfully from ${category} folder`);
    } catch (error) {
      toast.error('Failed to delete file');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Media Manager</h1>
        
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <div className="space-y-8">
              <div className="grid gap-4">
                <Label>Select Category</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="projects">Projects</option>
                  <option value="services">Services</option>
                  <option value="hero">Hero</option>
                  <option value="logo">Logo</option>
                </select>
              </div>

              <div className="grid gap-4">
                <Label>Upload Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, selectedCategory)}
                  disabled={isUploading}
                />
                <p className="text-sm text-gray-500">Files will be uploaded to: public/images/{selectedCategory}/</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images[selectedCategory].map((file, index) => (
                  <Card key={index} className="p-4 relative group">
                    <img 
                      src={file.path} 
                      alt={file.filename}
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 truncate">{file.filename}</p>
                      <p className="text-xs text-gray-400 truncate">{file.fullPath}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(file, selectedCategory)}
                    >
                      Delete
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="space-y-8">
              <div className="grid gap-4">
                <Label>Upload Videos</Label>
                <Input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  disabled={isUploading}
                />
                <p className="text-sm text-gray-500">Files will be uploaded to: public/videos/</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((file, index) => (
                  <Card key={index} className="p-4 relative group">
                    <video 
                      src={file.path} 
                      controls
                      className="w-full rounded"
                    />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 truncate">{file.filename}</p>
                      <p className="text-xs text-gray-400 truncate">{file.fullPath}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(file, 'videos')}
                    >
                      Delete
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Media Guidelines</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Project Images: 400x300 pixels recommended (uploads to /images/projects/)</li>
            <li>Service Images: 800x600 pixels recommended (uploads to /images/services/)</li>
            <li>Hero Images: 1920x1080 pixels recommended (uploads to /images/hero/)</li>
            <li>Logo Images: 200x200 pixels recommended (uploads to /images/logo/)</li>
            <li>Videos: 720p or 1080p, max 10MB (uploads to /videos/)</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
} 