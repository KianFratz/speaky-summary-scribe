
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [currentText, setCurrentText] = useState('');

  const speak = useCallback((text: string, startPosition = 0) => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter some text to read",
        variant: "destructive",
      });
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // If we're skipping, we'll start from a different position in the text
    const textToSpeak = text.slice(startPosition);
    const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
    
    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setCurrentText(text);
    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [toast]);

  const skipForward = useCallback(() => {
    if (currentText && isPlaying) {
      // Calculate new position (skip roughly 10 words forward)
      const words = currentText.split(' ');
      const currentPosition = Math.floor(words.length * 0.2); // Skip about 20% forward
      const newText = words.slice(currentPosition).join(' ');
      speak(newText);
    }
  }, [currentText, isPlaying, speak]);

  const skipBackward = useCallback(() => {
    if (currentText && isPlaying) {
      // Calculate new position (skip roughly 10 words backward)
      const words = currentText.split(' ');
      const currentPosition = Math.max(0, Math.floor(words.length * 0.2)); // Skip about 20% backward
      const newText = words.slice(-currentPosition).join(' ');
      speak(newText);
    }
  }, [currentText, isPlaying, speak]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  return {
    isPlaying,
    isPaused,
    speak,
    pause,
    resume,
    stop,
    skipForward,
    skipBackward,
  };
};
