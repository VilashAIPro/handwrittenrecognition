
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow mt-16 flex items-center justify-center py-12 px-6">
        <div className="max-w-md text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary mb-8">
            <span className="text-5xl font-semibold">404</span>
          </div>
          <h1 className="text-3xl font-semibold mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Link 
            to="/"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-block"
          >
            Go back home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
