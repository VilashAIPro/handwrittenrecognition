
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelected(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl transition-all duration-300 overflow-hidden",
        isDragging ? "bg-primary/5 border-primary border-2" : "bg-muted border border-border",
        preview ? "aspect-auto min-h-[300px]" : "aspect-video",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInput}
      />
      
      {preview ? (
        <div className="relative w-full h-full">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(null);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-secondary flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L8.58579 11.4142C9.36684 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">Upload an image</h3>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
          <div className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, GIF
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
