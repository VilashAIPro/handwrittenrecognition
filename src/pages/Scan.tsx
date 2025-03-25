
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ImageUpload from '@/components/ImageUpload';
import OcrResultView from '@/components/OcrResultView';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Scan = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      setExtractedText('');
      setSummary('');
      setError(null);
      
      const formData = new FormData();
      formData.append('image', file);
      
      // Call the Supabase Edge Function for OCR and summarization
      const { data, error } = await supabase.functions.invoke('ocr-with-summary', {
        body: formData,
      });
      
      if (error) {
        throw new Error(`Error calling OCR function: ${error.message}`);
      }
      
      setExtractedText(data.extractedText || '');
      setSummary(data.summary || '');
      
      toast({
        title: "Processing complete",
        description: "The image has been analyzed and text extracted.",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again with a clearer image.');
      
      toast({
        title: "Processing failed",
        description: "Failed to extract text from image. Please try again.",
        variant: "destructive",
      });
      
      // Set fallback data for development/testing purposes
      if (process.env.NODE_ENV === 'development') {
        setExtractedText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

• Item one with some details
• Item two with other information
• Item three with additional notes

For more information please contact us at example@textlens.com or visit our website www.textlens.com.`);
        
        setSummary("This document contains a contact information section with three bullet points listing various items with their details. The document includes contact information for TextLens company via email and website.");
      }
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
            <div className="animate-fade-in mb-8">
              <h1 className="text-3xl font-semibold mb-2">Extract & Analyze Text</h1>
              <p className="text-muted-foreground">
                Upload an image to extract text and generate an AI summary using our advanced OCR technology.
                Works with both handwritten and printed text.
              </p>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in animation-delay-300">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                    <CardDescription>
                      Upload a clear image containing text you want to extract
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ImageUpload 
                      onImageSelected={handleImageSelected}
                      isProcessing={isProcessing}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Supported formats: JPG, PNG, GIF</p>
                      <p>Max file size: 5MB</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-fade-in animation-delay-600">
                <OcrResultView 
                  text={extractedText} 
                  summary={summary}
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
