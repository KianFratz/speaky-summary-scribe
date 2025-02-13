
import { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import PlaybackControls from '@/components/PlaybackControls';
import TextAnalysis from '@/components/TextAnalysis';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useTextAnalysis } from '@/hooks/useTextAnalysis';
import { Card } from "@/components/ui/card";

const Index = () => {
  const [text, setText] = useState('');
  const { isPlaying, isPaused, speak, pause, resume, stop, skipForward, skipBackward } = useTextToSpeech();
  const { analysis, analyzeText } = useTextAnalysis();

  useEffect(() => {
    analyzeText(text);
  }, [text, analyzeText]);

  const handlePlay = () => {
    speak(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Text to Speech</h1>
          <p className="text-gray-500">Convert your text to speech and analyze its content</p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="space-y-6">
            <TextInput value={text} onChange={setText} />
            
            <PlaybackControls
              isPlaying={isPlaying}
              isPaused={isPaused}
              onPlay={handlePlay}
              onPause={pause}
              onResume={resume}
              onStop={stop}
              onSkipForward={skipForward}
              onSkipBackward={skipBackward}
            />

            {text && <TextAnalysis {...analysis} />}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
