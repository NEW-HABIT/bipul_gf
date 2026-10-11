import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, ArrowRight, RotateCcw, X, Image as ImageIcon } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MysteryGiftsProps {
  onGoToLetter: () => void;
}

export const MysteryGifts: React.FC<MysteryGiftsProps> = ({ onGoToLetter }) => {
  const [openedGift, setOpenedGift] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleOpenGift = (giftNumber: number) => {
    soundEngine.playGiftPop();
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fb7091', '#fbcfe8', '#fef08a', '#c084fc'],
      });
    }
    setOpenedGift(giftNumber);
  };

  const giftsConfig = [
    {
      id: 1,
      title: "Gift One",
      label: "A Little Compliment",
      ribbonColor: "bg-rose-500",
      boxGradient: "from-blush-600/30 to-pink-500/20",
      accentBorder: "border-pink-400/40",
      glowColor: "rgba(251, 112, 145, 0.4)",
    },
    {
      id: 2,
      title: "Gift Two",
      label: "A Cherished Memory",
      ribbonColor: "bg-purple-500",
      boxGradient: "from-purple-600/30 to-indigo-500/20",
      accentBorder: "border-purple-400/40",
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
      id: 3,
      title: "Gift Three",
      label: "Something Special",
      ribbonColor: "bg-amber-500",
      boxGradient: "from-amber-600/30 to-rose-500/20",
      accentBorder: "border-amber-400/40",
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
  ];

  return (
    <section id="gifts" className="relative py-24 sm:py-32 px-4 z-10">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-500/10 border border-blush-400/25 text-blush-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
          <Gift className="w-3.5 h-3.5 text-blush-400" />
          <span>Surprises Await</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 font-semibold mb-4 tracking-wide">
          A Few Little Surprises for You 🎁
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-pink-200/80 max-w-xl mx-auto mb-16">
          “Tap on any mystery box below to unveil a secret keepsake crafted for you.”
        </p>

        {/* 3 Gift Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto">
          {giftsConfig.map((gift) => {
            const isOpened = openedGift === gift.id;

            return (
              <div
                key={gift.id}
                className="flex flex-col items-center"
              >
                {/* Gift Box Container */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleOpenGift(gift.id)}
                  className={`group relative cursor-pointer w-full max-w-xs h-72 sm:h-80 rounded-3xl p-6 glass-panel border ${gift.accentBorder} flex flex-col items-center justify-between transition-all duration-300 overflow-hidden`}
                  style={{
                    boxShadow: `0 10px 30px -10px ${gift.glowColor}`,
                  }}
                >
                  {/* Subtle Shimmer background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${gift.boxGradient} opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Ribbon cross decoration */}
                  <div className="absolute inset-y-0 w-8 bg-white/10 backdrop-blur-sm pointer-events-none" />
                  <div className="absolute inset-x-0 h-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm pointer-events-none" />

                  {/* Top ribbon bow icon */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                    <Gift className="w-8 h-8 text-pink-200 group-hover:text-white transition-colors" />
                  </div>

                  {/* Center gift text */}
                  <div className="relative z-10 text-center my-auto">
                    <span className="text-xs font-mono uppercase tracking-widest text-pink-200/60 block mb-1">
                      {gift.title}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-pink-100 font-semibold mb-2 group-hover:text-white transition-colors">
                      {gift.label}
                    </h3>
                  </div>

                  {/* Bottom Tap Callout */}
                  <div className="relative z-10 w-full pt-3 border-t border-white/15">
                    <span className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-white/10 text-xs sm:text-sm font-medium text-pink-200 group-hover:bg-blush-500 group-hover:text-white transition-all">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isOpened ? "View Again" : "Tap to Open"}</span>
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gift Content Modal */}
      <AnimatePresence>
        {openedGift !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setOpenedGift(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full glass-panel rounded-3xl p-5 xs:p-6 sm:p-8 border border-pink-300/40 shadow-2xl box-glow max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpenedGift(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white transition-colors"
                aria-label="Close Surprise Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gift 1 Content */}
              {openedGift === 1 && (
                <div className="text-center pt-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blush-500/20 border border-blush-400/30 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-blush-400 fill-blush-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] xs:text-xs uppercase tracking-widest text-pink-200/60 font-mono">
                    Surprise No. 1
                  </span>
                  <h3 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-pink-200 font-bold mb-3 sm:mb-4">
                    A Little Compliment
                  </h3>
                  <p className="font-serif italic text-base xs:text-lg sm:text-xl text-cream-100 leading-relaxed max-w-md mx-auto mb-6">
                    “Your smile has this gentle, effortless way of brightening every room it enters. Never change the kindness, warmth, and grace you bring to the world.”
                  </p>
                  <button
                    onClick={() => setOpenedGift(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-blush-500 text-white text-sm font-medium hover:bg-blush-600 transition-colors shadow-lg active:scale-95"
                  >
                    <span>Keep in my heart 💗</span>
                  </button>
                </div>
              )}

              {/* Gift 2 Content */}
              {openedGift === 2 && (
                <div className="text-center pt-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-purple-300" />
                  </div>
                  <span className="text-[11px] xs:text-xs uppercase tracking-widest text-pink-200/60 font-mono">
                    Surprise No. 2
                  </span>
                  <h3 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-pink-200 font-bold mb-3 sm:mb-4">
                    A Treasured Moment
                  </h3>

                  {/* Polaroid Frame of Photo */}
                  <div className="polaroid-card max-w-[210px] xs:max-w-[240px] sm:max-w-xs mx-auto mb-3 sm:mb-4 rounded-xl shadow-xl p-2.5 sm:p-4">
                    <div className="aspect-[4/5] rounded overflow-hidden bg-gray-100">
                      <img
                        src="/images/popy-01.jpg"
                        alt="A treasured moment of Popy"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <p className="font-handwriting text-lg sm:text-xl text-gray-800 font-bold mt-2">
                      Always Radiant ✨
                    </p>
                  </div>

                  <p className="font-serif italic text-xs sm:text-sm text-pink-100/90 mb-4 sm:mb-5">
                    “A beautiful photograph of a wonderful soul.”
                  </p>

                  <button
                    onClick={() => setOpenedGift(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors shadow-lg active:scale-95"
                  >
                    <span>Close Keepsake</span>
                  </button>
                </div>
              )}

              {/* Gift 3 Content */}
              {openedGift === 3 && (
                <div className="text-center pt-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 animate-spin-slow" />
                  </div>
                  <span className="text-[11px] xs:text-xs uppercase tracking-widest text-pink-200/60 font-mono">
                    Surprise No. 3
                  </span>
                  <h3 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-pink-200 font-bold mb-3 sm:mb-4">
                    Something From The Heart
                  </h3>
                  <p className="font-serif italic text-base xs:text-lg sm:text-xl text-cream-100 leading-relaxed max-w-md mx-auto mb-5 sm:mb-6">
                    “Some feelings and warm wishes are meant to be cherished gently in words written just for you.”
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                    <button
                      onClick={() => {
                        setOpenedGift(null);
                        onGoToLetter();
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blush-500 to-rose-600 text-white text-sm font-semibold hover:shadow-lg active:scale-95 transition-all"
                    >
                      <span>Read Birthday Letter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setOpenedGift(null)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-pink-200 text-sm font-medium transition-colors"
                    >
                      Close for now
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
