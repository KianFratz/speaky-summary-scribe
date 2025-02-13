
import { useState, useCallback } from 'react';

export const useTextAnalysis = () => {
  const [analysis, setAnalysis] = useState({
    wordCount: 0,
    characterCount: 0,
    readingTime: 0,
    summary: '',
  });

  const analyzeText = useCallback((text: string) => {
    // Basic analysis
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const characterCount = text.length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed of 200 words per minute

    // Simple summarization (first few sentences)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const summary = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '');

    setAnalysis({
      wordCount,
      characterCount,
      readingTime,
      summary,
    });
  }, []);

  return {
    analysis,
    analyzeText,
  };
};
