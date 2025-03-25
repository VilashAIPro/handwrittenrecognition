
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/Providers';

interface HistoryItem {
  id: string;
  imageUrl: string;
  extractedText: string;
  date: string;
  title: string;
}

const History = () => {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for the demo
      const mockHistory: HistoryItem[] = [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1544391412-76d3e68e838d',
          extractedText: 'Meeting notes from July 15th. Project timeline discussed.',
          date: '2023-07-15T14:30:00Z',
          title: 'Meeting Notes'
        },
        {
          id: '2',
          imageUrl: 'https://images.unsplash.com/photo-1543769657-fcb7780e96dd',
          extractedText: 'Shopping list: milk, eggs, bread, apples, coffee',
          date: '2023-07-10T09:15:00Z',
          title: 'Shopping List'
        },
        {
          id: '3',
          imageUrl: 'https://images.unsplash.com/photo-1606836591695-4d58a73eba1e',
          extractedText: 'Phone: (555) 123-4567\nEmail: john.doe@example.com',
          date: '2023-07-05T16:45:00Z',
          title: 'Contact Info'
        }
      ];
      
      setHistory(mockHistory);
      setIsLoading(false);
    };
    
    if (isAuthenticated) {
      fetchHistory();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow mt-16 py-12 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <svg 
              className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 16V8C16 6.89543 15.1046 6 14 6H10C8.89543 6 8 6.89543 8 8V16M3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-2xl font-medium mb-2">Sign in to view history</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your scan history and saved documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-2 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/70 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold mb-2">History</h1>
                <p className="text-muted-foreground">
                  View and manage your previously scanned documents.
                </p>
              </div>
              <Link
                to="/scan"
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                New Scan
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-6 h-32"></div>
                ))}
              </div>
            ) : history.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-medium transition-shadow animate-fade-in"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-40 h-32 md:h-auto bg-secondary relative overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {item.extractedText}
                        </p>
                        <div className="mt-auto flex justify-between items-center">
                          <Link 
                            to={`/history/${item.id}`}
                            className="text-primary text-sm hover:text-primary/80 transition-colors"
                          >
                            View details
                          </Link>
                          <div className="flex space-x-2">
                            <button className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4.66669V3.00002C4 2.44774 4.44772 2.00002 5 2.00002H12C12.5523 2.00002 13 2.44774 13 3.00002V10C13 10.5523 12.5523 11 12 11H10.3333M4 4.66669H11C11.5523 4.66669 12 5.1144 12 5.66669V12.6667C12 13.219 11.5523 13.6667 11 13.6667H4C3.44772 13.6667 3 13.219 3 12.6667V5.66669C3 5.1144 3.44772 4.66669 4 4.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <button className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3337 6.00004V14M2.66699 6.00004V14M2.66699 6.00004C2.66699 6.00004 3.33366 5.33337 8.00033 5.33337C12.667 5.33337 13.3337 6.00004 13.3337 6.00004M2.66699 6.00004L4.00033 2.66671H12.0003L13.3337 6.00004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg 
                  className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-xl font-medium mb-2">No documents yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start scanning documents to build your history.
                </p>
                <Link
                  to="/scan"
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-block"
                >
                  Scan Document
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
