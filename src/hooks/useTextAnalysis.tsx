
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

    // Improved summarization
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    // Select key sentences based on length and position
    let summary = '';
    if (sentences.length > 0) {
      // Get the first sentence
      summary = sentences[0].trim();
      
      // If there are more sentences, add a middle sentence (if available)
      if (sentences.length > 2) {
        const middleIndex = Math.floor(sentences.length / 2);
        summary += '. ' + sentences[middleIndex].trim();
      }
      
      // Add the last sentence if it's different from the first and middle
      if (sentences.length > 1 && sentences[sentences.length - 1] !== sentences[0]) {
        summary += '. ' + sentences[sentences.length - 1].trim();
      }
      
      // Add ellipsis if we've shortened the text
      if (sentences.length > 3) {
        summary += '...';
      }
    }

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
