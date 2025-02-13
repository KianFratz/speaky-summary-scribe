
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, SkipBack, SkipForward } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onResume,
  onStop,
  onSkipForward,
  onSkipBackward,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 animate-fade-in">
      <Button
        onClick={onSkipBackward}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105"
        disabled={!isPlaying && !isPaused}
      >
        <SkipBack className="h-6 w-6" />
      </Button>

      {!isPlaying || isPaused ? (
        <Button
          onClick={isPaused ? onResume : onPlay}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105"
        >
          <Play className="h-6 w-6" />
        </Button>
      ) : (
        <Button
          onClick={onPause}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105"
        >
          <Pause className="h-6 w-6" />
        </Button>
      )}
      
      <Button
        onClick={onStop}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105"
        disabled={!isPlaying && !isPaused}
      >
        <Square className="h-6 w-6" />
      </Button>

      <Button
        onClick={onSkipForward}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-105"
        disabled={!isPlaying && !isPaused}
      >
        <SkipForward className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default PlaybackControls;
