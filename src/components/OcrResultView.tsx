
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardIcon, CodeIcon, CheckIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface OcrResultViewProps {
  text: string;
  summary?: string;
  isLoading?: boolean;
  className?: string;
}

const OcrResultView: React.FC<OcrResultViewProps> = ({ 
  text, 
  summary = '',
  isLoading = false,
  className 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("text");
  
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded",
      description: `${filename} has been downloaded`,
    });
  };
  
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border p-6 shadow-soft",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Analysis Results</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(activeTab === "text" ? text : summary)}
            disabled={isLoading || (!text && activeTab === "text") || (!summary && activeTab === "summary")}
            className="h-9 px-3"
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4 mr-2" />
            ) : (
              <ClipboardIcon className="h-4 w-4 mr-2" />
            )}
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadAsText(
              activeTab === "text" ? text : summary,
              activeTab === "text" ? "extracted-text.txt" : "ai-summary.txt"
            )}
            disabled={isLoading || (!text && activeTab === "text") || (!summary && activeTab === "summary")}
            className="h-9 px-3"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>
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
        <Tabs 
          defaultValue="text" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="text">
              <CodeIcon className="h-4 w-4 mr-2" />
              Extracted Text
            </TabsTrigger>
            <TabsTrigger value="summary">
              <ClipboardIcon className="h-4 w-4 mr-2" />
              AI Summary
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="relative">
            <div className="min-h-[200px] p-4 rounded-lg bg-secondary/50 border border-border text-foreground whitespace-pre-wrap overflow-auto">
              {text ? text : "No text extracted. Try uploading a clearer image."}
            </div>
          </TabsContent>
          
          <TabsContent value="summary" className="relative">
            <div className="min-h-[200px] p-4 rounded-lg bg-secondary/50 border border-border text-foreground whitespace-pre-wrap overflow-auto">
              {summary ? summary : "No summary available. Try uploading a clearer image."}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default OcrResultView;
