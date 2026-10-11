import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Music, ChevronDown, Heart, Cake } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BirthdayHeroProps {
  onExplore: () => void;
  onPlayMusic: () => void;
  isMusicPlaying: boolean;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({
  onExplore,
  onPlayMusic,
  isMusicPlaying,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    // Initial firework & confetti burst when entering hero
    const timer = setTimeout(() => {
      setHasRevealed(true);
      if (!prefersReducedMotion) {
        // Double celebration burst
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#fb7091', '#f43f6e', '#fbcfe8', '#fef08a', '#c084fc'],
        });
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#fb7091', '#f43f6e', '#fbcfe8', '#fef08a', '#c084fc'],
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const popyLetters = "Popy".split("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Decorative Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Balloon 1 */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [-10, -35, -10], x: [0, 15, 0], rotate: [-2, 4, -2] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute top-16 left-6 sm:left-16 w-16 h-20 sm:w-20 sm:h-24 rounded-full bg-gradient-to-tr from-blush-500/30 to-pink-300/40 border border-pink-300/30 backdrop-blur-sm shadow-xl flex items-center justify-center"
        >
          <div className="w-1.5 h-10 bg-pink-200/40 absolute -bottom-10 rounded-full" />
        </motion.div>

        {/* Balloon 2 */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [-15, -45, -15], x: [0, -12, 0], rotate: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut', delay: 1 }}
          className="absolute top-24 right-8 sm:right-20 w-14 h-18 sm:w-22 sm:h-26 rounded-full bg-gradient-to-tr from-purple-500/25 to-pink-400/35 border border-purple-300/30 backdrop-blur-sm shadow-xl flex items-center justify-center"
        >
          <div className="w-1.5 h-12 bg-pink-200/40 absolute -bottom-12 rounded-full" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-1.5 xs:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full glass-panel border border-pink-300/25 text-pink-200 text-xs sm:text-base font-medium tracking-widest uppercase mb-4 sm:mb-6 shadow-lg shadow-blush-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blush-400 animate-spin-slow" />
          <span>12 October 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-ping" />
          <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blush-400" />
        </motion.div>

        {/* Greeting Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-xl xs:text-2xl sm:text-3xl md:text-4xl text-rose-100 font-light tracking-wide mb-1 sm:mb-2"
        >
          Happy Birthday,
        </motion.h2>

        {/* Big Handwritten Name with Letter Stagger & Shimmer */}
        <div className="relative my-1 sm:my-4 flex items-center justify-center max-w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center font-handwriting text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-blush-300 to-rose-200 text-glow drop-shadow-2xl"
          >
            {popyLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 35, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.5 + index * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block transform hover:scale-110 hover:-rotate-3 transition-transform cursor-default"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5, type: 'spring' }}
              className="inline-block ml-2 xs:ml-3 sm:ml-4 text-blush-400 text-3xl xs:text-4xl sm:text-6xl"
            >
              💗
            </motion.span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-serif italic text-base xs:text-lg sm:text-2xl md:text-3xl text-pink-100/90 font-light max-w-2xl mx-auto mt-2 sm:mt-4 mb-8 sm:mb-10 leading-relaxed px-2 sm:px-4"
        >
          “A little universe, made just for you.”
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto px-4 max-w-xs sm:max-w-none mx-auto"
        >
          <button
            onClick={onExplore}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blush-500 via-rose-500 to-purple-600 shadow-xl shadow-blush-500/25 hover:shadow-blush-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Your Surprise</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={onPlayMusic}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium text-pink-100 glass-panel border border-pink-300/30 hover:bg-white/10 hover:border-pink-300/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Music className={`w-4 h-4 text-blush-300 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
            <span>{isMusicPlaying ? 'Playing Birthday Magic ♫' : 'Play Birthday Magic ♫'}</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        onClick={onExplore}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-pink-200/60 hover:text-pink-100 transition-colors z-10"
      >
        <span className="text-xs uppercase tracking-widest font-light">Scroll to explore</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-blush-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};
