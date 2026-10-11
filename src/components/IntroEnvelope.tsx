import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroEnvelopeProps {
  onOpenSurprise: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const IntroEnvelope: React.FC<IntroEnvelopeProps> = ({
  onOpenSurprise,
  isMuted,
  onToggleMute,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    if (!isMuted) {
      soundEngine.playChime();
      soundEngine.startAmbientSynthesizer();
    }

    // Trigger celebration hearts and sparkles
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fb7091', '#f43f6e', '#fbcfe8', '#fef08a', '#ffffff'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpenSurprise();
      }, 900);
    }, 700);
  };

  const handleSkip = () => {
    if (!isMuted) {
      soundEngine.startAmbientSynthesizer();
    }
    onOpenSurprise();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-[#0a0518] via-[#140c2e] to-[#0d0722] overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blush-500/10 blur-[90px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/15 blur-[100px] pointer-events-none" />

      {/* Top Controls: Sound Toggle & Skip Intro */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 flex justify-between items-center z-20">
        <button
          onClick={onToggleMute}
          className="flex items-center gap-1.5 xs:gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-pink-200/90 bg-white/10 border border-pink-300/25 hover:bg-white/15 transition-all backdrop-blur-md active:scale-95"
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400" /> : <Volume2 className="w-3.5 h-3.5 text-pink-300" />}
          <span className="text-[11px] xs:text-xs">{isMuted ? "Muted" : "Sound On"}</span>
        </button>

        <button
          onClick={handleSkip}
          className="text-xs sm:text-sm font-medium text-pink-200/70 hover:text-white transition-colors tracking-wide px-2 py-1"
        >
          Skip Intro →
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full px-2">
        {/* Soft greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-1.5 xs:gap-2 px-3.5 py-1 rounded-full bg-blush-500/10 border border-blush-400/25 text-blush-300 text-[11px] xs:text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-blush-300 animate-pulse" />
          A Secret For You
          <Sparkles className="w-3 h-3 text-blush-300 animate-pulse" />
        </motion.div>

        {/* Message */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-handwriting text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-pink-200 text-glow font-bold mb-2 tracking-wide leading-tight"
        >
          Hey Popy… 💌
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-serif italic text-sm xs:text-base sm:text-lg md:text-xl text-rose-100/90 font-light max-w-md mx-auto mb-6 sm:mb-10 px-2"
        >
          “Someone made a little world just for you.”
        </motion.p>

        {/* 3D Interactive Sealed Envelope */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="relative group cursor-pointer my-1 select-none max-w-full"
          onClick={handleOpen}
        >
          {/* Subtle outer halo */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blush-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:opacity-100 opacity-60 transition duration-700 pointer-events-none" />

          {/* Envelope Body */}
          <div className="relative w-[260px] xs:w-72 sm:w-80 h-44 sm:h-50 rounded-2xl bg-gradient-to-br from-[#2a1645] to-[#180a2b] border border-pink-300/30 shadow-2xl overflow-hidden flex flex-col justify-between p-4 transform transition-transform duration-500 group-hover:scale-105">
            {/* Triangular Top Flap Fold */}
            <motion.div
              animate={
                isOpening
                  ? { rotateX: 180, transformOrigin: 'top', y: -10 }
                  : { rotateX: 0 }
              }
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#3a1d5c] to-[#25103d] border-b border-pink-400/25 rounded-t-2xl flex justify-center items-end pb-2 shadow-md z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Envelope Interior Letter Peek */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -30, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-x-6 top-8 h-28 bg-cream-50 rounded-lg shadow-lg border border-pink-200 flex flex-col items-center justify-center p-2 z-5"
                >
                  <p className="font-handwriting text-blush-600 font-bold text-lg">For Dearest Popy</p>
                  <Heart className="w-5 h-5 text-blush-500 fill-blush-500 animate-bounce" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Heart Seal (Center) */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: isOpening ? [1, 1.4, 0] : [1, 1.15, 1],
                        opacity: isOpening ? [1, 1, 0] : 1,
                      }
                }
                transition={{
                  repeat: isOpening ? 0 : Infinity,
                  duration: isOpening ? 0.6 : 2.5,
                  ease: 'easeInOut',
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blush-600 to-rose-400 flex items-center justify-center shadow-lg shadow-blush-500/50 border-2 border-pink-200"
              >
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white drop-shadow" />
              </motion.div>
            </div>

            {/* Bottom Letter Label */}
            <div className="mt-auto text-center z-10">
              <span className="font-handwriting text-pink-200/90 text-sm tracking-wider">
                Tap to unseal with love
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8"
        >
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-medium text-white shadow-xl shadow-blush-500/25 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            {/* Button Gradient & Glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-blush-500 via-rose-500 to-purple-600 group-hover:from-blush-600 group-hover:to-purple-700 transition duration-300" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer-gradient animate-shimmer" />

            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-200 animate-spin-slow" />
              <span>{isOpening ? "Opening Magical World..." : "Open Your Surprise"}</span>
              <Heart className="w-4 h-4 text-pink-200 fill-pink-200 group-hover:scale-125 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Ambient hint */}
        <p className="text-xs text-pink-200/40 mt-4 tracking-wider">
          Best experienced with sound enabled ♫
        </p>
      </div>
    </motion.div>
  );
};
