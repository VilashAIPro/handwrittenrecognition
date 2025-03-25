
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileUpIcon, ImageIcon, RotateCcw } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  className?: string;
  isProcessing?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelected, 
  className,
  isProcessing = false 
}) => {
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

  const resetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
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
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground backdrop-blur-sm transition-colors"
                onClick={resetImage}
                disabled={isProcessing}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-secondary flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Upload an image</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Works with both handwritten and printed text
            </p>
            <div className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF
            </div>
          </div>
        )}
      </div>
      
      {preview && (
        <div className="flex justify-end">
          <Button 
            variant="default" 
            size="sm"
            disabled={isProcessing}
            onClick={triggerFileInput}
            className="flex items-center gap-2"
          >
            <FileUpIcon size={14} />
            Upload new image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
