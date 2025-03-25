
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface OcrResultViewProps {
  text: string;
  isLoading?: boolean;
  className?: string;
}

const OcrResultView: React.FC<OcrResultViewProps> = ({ 
  text, 
  isLoading = false,
  className 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border p-6 shadow-soft",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Extracted Text</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            disabled={isLoading || !text}
            className={cn(
              "p-2 rounded-md transition-colors",
              isCopied 
                ? "bg-green-500/10 text-green-600" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {isCopied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3337 5.33331L6.00033 12.6666L2.66699 9.33331" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4.66669V3.00002C4 2.44774 4.44772 2.00002 5 2.00002H12C12.5523 2.00002 13 2.44774 13 3.00002V10C13 10.5523 12.5523 11 12 11H10.3333M4 4.66669H11C11.5523 4.66669 12 5.1144 12 5.66669V12.6667C12 13.219 11.5523 13.6667 11 13.6667H4C3.44772 13.6667 3 13.219 3 12.6667V5.66669C3 5.1144 3.44772 4.66669 4 4.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            disabled={isLoading || !text}
            className="p-2 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.33366 10.6667L13.3337 8.00004L9.33366 5.33337M6.66699 5.33337L2.66699 8.00004L6.66699 10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={text}
            readOnly
            className="w-full min-h-[200px] p-4 rounded-lg bg-secondary/50 border border-border text-foreground resize-y focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Text will appear here after processing..."
          />
        </div>
      )}
    </div>
  );
};

export default OcrResultView;
