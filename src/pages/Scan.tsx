
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/ImageUpload';
import OcrResultView from '@/components/OcrResultView';
import { toast } from "@/components/ui/use-toast";

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  
  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would upload the image to an OCR service
      // and get the result back. For now, we'll simulate it:
      const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

• Item one with some details
• Item two with other information
• Item three with additional notes

For more information please contact us at example@textlens.com or visit our website www.textlens.com.`;
      
      setExtractedText(mockText);
      toast({
        title: "Text extracted successfully",
        description: "The image has been processed and text extracted.",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Processing failed",
        description: "Failed to extract text from image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-semibold mb-2">Extract Text</h1>
              <p className="text-muted-foreground mb-8">
                Upload an image to extract text using our advanced OCR technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in animation-delay-300">
                <h2 className="text-lg font-medium mb-4">Upload Image</h2>
                <ImageUpload onImageSelected={handleImageSelected} />
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Supported formats: JPG, PNG, GIF</p>
                  <p>Max file size: 5MB</p>
                </div>
              </div>
              
              <div className="animate-fade-in animation-delay-600">
                <h2 className="text-lg font-medium mb-4">Result</h2>
                <OcrResultView 
                  text={extractedText} 
                  isLoading={isProcessing} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Scan;
