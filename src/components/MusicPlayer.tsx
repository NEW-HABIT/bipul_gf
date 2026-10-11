import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Volume1, Sparkles } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

interface MusicPlayerProps {
  isMusicPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isMusicPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
}) => {
  const [volume, setVolume] = useState(0.7);
  const [audioError, setAudioError] = useState(false);
  const [usingSynthesizer, setUsingSynthesizer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync volume with sound engine
  useEffect(() => {
    soundEngine.setVolume(isMuted ? 0 : volume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Audio Play/Pause handling
  useEffect(() => {
    const audio = audioRef.current;

    if (isMusicPlaying) {
      if (audio && !audioError) {
        audio
          .play()
          .then(() => {
            setUsingSynthesizer(false);
          })
          .catch(() => {
            // Audio file missing or failed to decode -> Fallback seamlessly to Web Audio synthesizer!
            setAudioError(true);
            setUsingSynthesizer(true);
            soundEngine.startAmbientSynthesizer();
          });
      } else {
        // Fallback directly
        setUsingSynthesizer(true);
        soundEngine.startAmbientSynthesizer();
      }
    } else {
      if (audio) {
        audio.pause();
      }
      soundEngine.stopAmbientSynthesizer();
    }
  }, [isMusicPlaying, audioError]);

  // Track progress if native audio is playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleError = () => {
      setAudioError(true);
      if (isMusicPlaying) {
        setUsingSynthesizer(true);
        soundEngine.startAmbientSynthesizer();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
    };
  }, [isMusicPlaying]);

  return (
    <div className="fixed bottom-3.5 right-3 sm:bottom-5 sm:right-6 z-40 select-none max-w-[calc(100vw-24px)]">
      {/* Hidden Audio Element pointing to local asset */}
      <audio
        ref={audioRef}
        src={BIRTHDAY_CONFIG.music.filePath}
        preload="auto"
        loop
      />

      <motion.div
        layout
        className="glass-panel rounded-full p-1.5 sm:p-2.5 border border-pink-300/30 shadow-2xl flex items-center gap-1.5 sm:gap-3 box-glow backdrop-blur-lg"
      >
        {/* Play / Pause Main Button */}
        <button
          onClick={onTogglePlay}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-blush-500 to-rose-500 hover:from-blush-600 hover:to-rose-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
          aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
          )}
        </button>

        {/* Visualizer & Song Info (Click to expand controls) */}
        <div
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 sm:gap-3 cursor-pointer pr-1"
        >
          {/* Animated EQ Bars */}
          <div className="flex items-end gap-0.5 h-4 sm:h-5 w-4 sm:w-5 justify-center">
            {[0.4, 0.9, 0.6, 0.8].map((factor, i) => (
              <span
                key={i}
                className="w-0.5 sm:w-1 bg-blush-400 rounded-full transition-all duration-300"
                style={{
                  height: isMusicPlaying ? `${Math.max(20, factor * 100)}%` : '20%',
                  animation: isMusicPlaying ? `pulse 1.${i + 2}s infinite ease-in-out` : 'none',
                }}
              />
            ))}
          </div>

          {/* Song Title Text */}
          <div className="text-left max-w-[100px] xs:max-w-[130px] sm:max-w-[170px] truncate">
            <p className="text-[11px] sm:text-xs font-medium text-pink-100 truncate">
              {usingSynthesizer ? "Music Box Melody" : BIRTHDAY_CONFIG.music.songTitle}
            </p>
            <p className="text-[9px] sm:text-[10px] text-pink-300/60 truncate">
              {isMusicPlaying ? "Playing Magic ♫" : "Tap for Magic ♫"}
            </p>
          </div>
        </div>

        {/* Expandable Controls: Volume Slider & SFX Mute */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 pl-2 border-l border-pink-300/20"
          >
            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                if (isMuted) onToggleMute();
                setVolume(parseFloat(e.target.value));
              }}
              className="w-16 sm:w-20 accent-blush-500 h-1.5 rounded-lg cursor-pointer"
              aria-label="Volume level"
            />

            {/* Mute toggle button */}
            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-full hover:bg-white/10 text-pink-200"
              aria-label={isMuted ? "Unmute all sounds" : "Mute all sounds"}
              title={isMuted ? "Unmute all sounds" : "Mute all sounds"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-pink-400" />
              ) : volume > 0.5 ? (
                <Volume2 className="w-4 h-4 text-pink-300" />
              ) : (
                <Volume1 className="w-4 h-4 text-pink-300" />
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
