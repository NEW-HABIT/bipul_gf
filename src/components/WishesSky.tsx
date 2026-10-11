import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Moon, X, Heart } from 'lucide-react';
import { SKY_WISHES, SkyWish } from '../data/wishes';
import { soundEngine } from '../utils/audioSynth';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const WishesSky: React.FC = () => {
  const [activeWish, setActiveWish] = useState<SkyWish | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleStarClick = (wish: SkyWish) => {
    soundEngine.playSparkle();
    setActiveWish(wish);
  };

  return (
    <section
      id="wishes"
      className="relative min-h-[90vh] py-24 sm:py-32 px-4 overflow-hidden bg-gradient-to-b from-[#0e0725] via-[#160a38] to-[#0a0518] z-10"
    >
      {/* Visual Ambient Nebula Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blush-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Glowing Moon */}
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [-5, 10, -5] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-12 right-6 sm:right-24 pointer-events-none select-none z-1"
      >
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-100 via-yellow-100 to-white shadow-[0_0_50px_rgba(254,240,138,0.4)] flex items-center justify-center opacity-90">
          <Moon className="w-12 h-12 sm:w-16 sm:h-16 text-amber-200/40 fill-amber-200/20" />
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md" />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blush-400" />
            <span>Midnight Constellation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 font-semibold mb-4 tracking-wide">
            If Wishes Were Stars…
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-pink-200/80 leading-relaxed">
            “Tap a star and discover a little wish made for you.”
          </p>
        </div>

        {/* Interactive Sky Canvas Box */}
        <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl border border-pink-400/20 bg-midnight-800/40 backdrop-blur-sm overflow-hidden box-glow-purple shadow-2xl">
          {/* Subtle Constellation Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="18%" y1="28%" x2="35%" y2="48%" stroke="#fbcfe8" strokeDasharray="4 6" strokeWidth="1" />
            <line x1="35%" y1="48%" x2="52%" y2="22%" stroke="#fbcfe8" strokeDasharray="4 6" strokeWidth="1" />
            <line x1="52%" y1="22%" x2="68%" y2="55%" stroke="#fbcfe8" strokeDasharray="4 6" strokeWidth="1" />
            <line x1="68%" y1="55%" x2="82%" y2="32%" stroke="#fbcfe8" strokeDasharray="4 6" strokeWidth="1" />
            <line x1="18%" y1="28%" x2="25%" y2="72%" stroke="#fbcfe8" strokeDasharray="4 6" strokeWidth="1" />
            <line x1="68%" y1="55%" x2="75%" y2="78%" stroke="#fbcfe8" strokeDasharray="4 6" strokeWidth="1" />
          </svg>

          {/* Scattered Wish Stars */}
          {SKY_WISHES.map((wish) => {
            const isSelected = activeWish?.id === wish.id;
            const sizeClass =
              wish.size === 'lg' ? 'w-10 h-10' : wish.size === 'md' ? 'w-8 h-8' : 'w-7 h-7';
            const iconSize = wish.size === 'lg' ? 'w-5 h-5' : wish.size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

            return (
              <motion.button
                key={wish.id}
                onClick={() => handleStarClick(wish)}
                aria-label={`Open wish: ${wish.title}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none`}
                style={{ left: `${wish.x}%`, top: `${wish.y}%` }}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: isSelected ? [1.2, 1.35, 1.2] : [1, 1.15, 1],
                        filter: isSelected
                          ? 'drop-shadow(0 0 16px #fb7091)'
                          : 'drop-shadow(0 0 8px rgba(254, 240, 138, 0.6))',
                      }
                }
                transition={{
                  repeat: Infinity,
                  duration: wish.size === 'lg' ? 2.5 : 3.5,
                  ease: 'easeInOut',
                }}
              >
                {/* Glowing Aura Ring */}
                <span
                  className={`absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity blur-md`}
                  style={{ backgroundColor: wish.color }}
                />

                {/* Star Icon Badge */}
                <div
                  className={`${sizeClass} rounded-full flex items-center justify-center relative z-10 border border-white/60 shadow-lg`}
                  style={{
                    backgroundColor: isSelected ? '#fb7091' : 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Star
                    className={`${iconSize} ${
                      isSelected ? 'text-white fill-white' : 'text-yellow-200 fill-yellow-200'
                    } transition-colors`}
                  />
                </div>

                {/* Tiny Floating Star Label on Hover */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[11px] font-medium tracking-wider bg-midnight-900/90 text-pink-200 border border-pink-300/20 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {wish.emoji} {wish.title}
                </span>
              </motion.button>
            );
          })}

          {/* Floating Wish Modal / Card */}
          <AnimatePresence>
            {activeWish && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-3 sm:bottom-8 max-w-md w-auto sm:w-full glass-panel rounded-2xl p-4 xs:p-5 sm:p-7 border border-pink-300/40 shadow-2xl box-glow z-30 max-h-[75vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">{activeWish.emoji}</span>
                    <h3 className="font-serif text-lg xs:text-xl sm:text-2xl text-pink-100 font-semibold">
                      {activeWish.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveWish(null)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-pink-200/70 hover:text-white transition-colors"
                    aria-label="Close wish card"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="font-serif italic text-sm xs:text-base sm:text-lg text-cream-100 leading-relaxed my-2 sm:my-3">
                  “{activeWish.message}”
                </p>

                <div className="flex items-center justify-between pt-2.5 border-t border-pink-300/15 text-[11px] xs:text-xs text-pink-200/60 font-light">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-blush-400 fill-blush-400" />
                    Wished from the heart
                  </span>
                  <span className="text-pink-300">Tap to close ✕</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Quick Wish Chips for Touch-Friendly Browsing */}
        <div className="flex sm:hidden flex-wrap justify-center gap-2 mt-4 px-2">
          {SKY_WISHES.map((w) => (
            <button
              key={w.id}
              onClick={() => handleStarClick(w)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeWish?.id === w.id
                  ? 'bg-blush-500 text-white border-blush-400'
                  : 'bg-white/5 text-pink-200/80 border-pink-300/20 hover:bg-white/10'
              }`}
            >
              {w.emoji} {w.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
