
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-block mb-4 py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Intelligent Text Recognition
              </div>
              <h1 className="text-5xl font-semibold tracking-tight mb-6 text-balance">
                Transform Images into Editable Text
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Powerful OCR technology that extracts text from any image with precision and elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/scan" 
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Start Scanning
                </Link>
                <Link 
                  to="/login" 
                  className="px-8 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/70 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">Features</h2>
              <p className="text-muted-foreground">
                Our OCR technology offers a comprehensive suite of features designed for accuracy and ease of use.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft flex flex-col h-full animate-fade-in animation-delay-300">
                <div className="w-12 h-12 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Text Recognition</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Advanced OCR engine accurately extracts text from images, including handwritten notes.
                </p>
                <Link to="/scan" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors">
                  Learn more
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft flex flex-col h-full animate-fade-in animation-delay-600">
                <div className="w-12 h-12 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 14L21 3M10 14L13 21L16 16L21 13L10 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 13L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">AI-Powered Processing</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Machine learning algorithms enhance recognition accuracy for even challenging text.
                </p>
                <Link to="/scan" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors">
                  Learn more
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft flex flex-col h-full animate-fade-in animation-delay-900">
                <div className="w-12 h-12 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15M12 9V15M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Cloud Sync</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Access your scanned documents from any device with secure cloud storage.
                </p>
                <Link to="/signup" className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors">
                  Learn more
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
              <p className="text-muted-foreground">
                Extract text from images in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative animate-fade-in">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-lg">
                  1
                </div>
                <div className="bg-card rounded-2xl p-8 pt-12 border border-border shadow-soft h-full">
                  <h3 className="text-xl font-medium mb-3">Upload Image</h3>
                  <p className="text-muted-foreground">
                    Select and upload an image containing the text you want to extract.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative animate-fade-in animation-delay-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-lg">
                  2
                </div>
                <div className="bg-card rounded-2xl p-8 pt-12 border border-border shadow-soft h-full">
                  <h3 className="text-xl font-medium mb-3">Process</h3>
                  <p className="text-muted-foreground">
                    Our AI technology analyzes and extracts text from your image.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative animate-fade-in animation-delay-600">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-lg">
                  3
                </div>
                <div className="bg-card rounded-2xl p-8 pt-12 border border-border shadow-soft h-full">
                  <h3 className="text-xl font-medium mb-3">Copy or Export</h3>
                  <p className="text-muted-foreground">
                    Use the extracted text for your documents, emails, or notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-subtle from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-semibold mb-4">Ready to Extract Text?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Start using our OCR technology today and transform your images into editable text.
              </p>
              <Link
                to="/scan"
                className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-medium"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
