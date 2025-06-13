"use client";

import { useState } from 'react';
import Image from 'next/image';
import { IoCloudUploadOutline, IoTrashOutline } from 'react-icons/io5';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  index?: number;
}

export default function ImageUpload({ value, onChange, label = 'Image', index = 0 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file.name);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Upload error:', errorData);
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Upload successful, received URL:', data.url);
      onChange(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getDisplayUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('/api/files/')) {
      return `https://${process.env.NEXT_PUBLIC_DOMAIN}${url}`;
    }
    return url;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        {label}
      </label>
      <div className="relative w-24 h-24 border border-zinc-800 rounded-lg overflow-hidden bg-black">
        {value ? (
          <>
            <Image
              src={getDisplayUrl(value)}
              alt="Upload preview"
              fill
              sizes="(max-width: 96px) 100vw, 96px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-600/80 backdrop-blur-sm"
            >
              <IoTrashOutline className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 border border-zinc-800">
            <IoCloudUploadOutline className="w-8 h-8 text-zinc-600" />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id={`image-upload-${label}-${index}`}
      />
      <label
        htmlFor={`image-upload-${label}-${index}`}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 cursor-pointer inline-block transition-all duration-300 shadow-lg shadow-blue-500/20"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </label>
    </div>
  );
}