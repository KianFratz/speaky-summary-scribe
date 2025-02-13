
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TextAnalysisProps {
  wordCount: number;
  characterCount: number;
  readingTime: number;
  summary: string;
}

const TextAnalysis: React.FC<TextAnalysisProps> = ({
  wordCount,
  characterCount,
  readingTime,
  summary,
}) => {
  return (
    <Card className="p-6 space-y-4 animate-fade-in">
      <div className="flex flex-wrap gap-3">
        <Badge variant="secondary" className="text-sm">
          Words: {wordCount}
        </Badge>
        <Badge variant="secondary" className="text-sm">
          Characters: {characterCount}
        </Badge>
        <Badge variant="secondary" className="text-sm">
          Reading time: {readingTime} min
        </Badge>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Summary</h3>
        <ScrollArea className="h-24 rounded-md border p-4">
          <p className="text-sm text-gray-600">{summary || "No summary available."}</p>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default TextAnalysis;
