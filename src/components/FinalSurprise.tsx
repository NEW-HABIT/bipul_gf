import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Image as ImageIcon, Sparkles, ArrowUp } from 'lucide-react';
import { GALLERY_MEMORIES } from '../data/gallery';
import { soundEngine } from '../utils/audioSynth';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface FinalSurpriseProps {
  onReplay: () => void;
  onGoToGallery: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onReplay, onGoToGallery }) => {
  const [fireworksFired, setFireworksFired] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleTriggerFireworks = () => {
    soundEngine.playSparkle();
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fb7091', '#f43f6e', '#fef08a', '#c084fc', '#ffffff'],
      });
    }
    setFireworksFired(true);
  };

  return (
    <footer className="relative pt-24 pb-16 px-4 overflow-hidden z-10 border-t border-pink-400/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blush-500/10 via-purple-600/10 to-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Intro Whisper */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif italic text-base sm:text-lg text-pink-200/70 mb-3"
        >
          “And before you go…”
        </motion.p>

        {/* Big Climax Birthday Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-handwriting text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-pink-200 text-glow font-bold mb-3 sm:mb-4 tracking-wide"
        >
          Happy Birthday, Popy! 💗
        </motion.h2>

        {/* Final Blessing */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif text-base xs:text-lg sm:text-2xl text-cream-100 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2 sm:px-4"
        >
          “May your world always be filled with love, laughter, happiness, and magic.”
        </motion.p>

        {/* Pulsing Climax Heart */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={handleTriggerFireworks}
          className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-blush-600 to-rose-400 flex items-center justify-center shadow-2xl shadow-blush-500/40 cursor-pointer mb-8 sm:mb-12 hover:box-glow active:scale-95 transition-all"
        >
          <Heart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-white fill-white animate-pulse" />
        </motion.div>

        {/* Mini Montage of Photos */}
        <div className="mb-8 sm:mb-12">
          <p className="text-[11px] xs:text-xs uppercase tracking-widest text-pink-200/50 mb-4 sm:mb-5 font-mono">
            Memories in this little universe
          </p>
          <div className="flex justify-center items-center gap-2 xs:gap-3 sm:gap-4 overflow-x-auto pb-3 max-w-lg mx-auto px-2">
            {GALLERY_MEMORIES.slice(0, 4).map((m) => (
              <div
                key={m.id}
                onClick={onGoToGallery}
                className="w-14 h-18 xs:w-16 xs:h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border border-pink-300/40 shadow-lg cursor-pointer hover:scale-110 active:scale-95 hover:border-blush-400 transition-all flex-shrink-0"
              >
                <img src={m.src} alt={m.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-md mx-auto mb-12 sm:mb-16 w-full">
          <button
            onClick={onReplay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-pink-300/25 text-pink-100 text-sm font-medium transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-blush-300" />
            <span>Replay Experience</span>
          </button>

          <button
            onClick={onGoToGallery}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blush-500/20 hover:bg-blush-500 border border-blush-400/40 text-pink-100 hover:text-white text-sm font-medium transition-all active:scale-95"
          >
            <ImageIcon className="w-4 h-4 text-blush-300" />
            <span>Revisit Photo Gallery</span>
          </button>
        </div>

        {/* Small Footer Signature */}
        <div className="pt-8 border-t border-pink-300/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-pink-200/50">
          <p>Made with care, just for Popy.</p>
          <p className="flex items-center gap-1.5">
            <span>A Little Universe</span>
            <span>•</span>
            <span>12 October 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
