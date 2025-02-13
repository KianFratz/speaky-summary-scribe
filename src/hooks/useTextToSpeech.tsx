
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter some text to read",
        variant: "destructive",
      });
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [toast]);

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
  };
};
