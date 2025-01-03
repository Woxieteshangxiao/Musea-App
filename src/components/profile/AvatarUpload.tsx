import React, { useRef, useState } from 'react';
import { Image } from 'lucide-react';

interface AvatarUploadProps {
  currentUrl?: string;
  onFileSelect: (file: File) => void;
}

export default function AvatarUpload({ currentUrl, onFileSelect }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="space-y-2">
      {previewUrl && (
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
          <img 
            src={previewUrl} 
            alt="Avatar preview" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <Image className="w-5 h-5" />
        {previewUrl ? 'Change avatar' : 'Upload avatar'}
      </button>
    </div>
  );
}