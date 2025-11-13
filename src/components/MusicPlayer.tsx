import { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 md:bottom-8 md:right-8 w-auto">
      <div className="glass-card rounded-full md:rounded-full p-3 md:p-3 shadow-lg">
        <audio ref={audioRef} loop>
          <source src="/music/Matheus & Kauan - Ser Humano Ou Anjo [wilY_GMUWJo].mp3" type="audio/mpeg" />
        </audio>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="rounded-full hover:bg-primary/20"
          >
            {isPlaying ? (
              <Pause size={20} className="text-primary" />
            ) : (
              <Play size={20} className="text-primary" />
            )}
          </Button>
          <Volume2 size={16} className="text-primary/60 hidden md:block" />
        </div>
      </div>
    </div>
  );
}