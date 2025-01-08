'use client'

import cn from '@/common/helpers/UtilKit';
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa6';

const AudioControl = ({ className }) => {
  const audioRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play();
      audio.loop = true;
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset playback position
      }
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={cn('md:hidden', className)}>
      <div
        className="p-2 rounded-full border-primary border bg-white/50 backdrop-blur cursor-pointer"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <FaPause className="size-4 text-primary" />
        ) : (
          <FaPlay className="size-4 text-primary" />
        )}
      </div>

      <audio
        ref={audioRef}
        src="/assets/music.mp3" 
        preload="auto"
      />
    </div>
  );
};

export default AudioControl;
