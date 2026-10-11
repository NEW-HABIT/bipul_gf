import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, Heart, PartyPopper } from 'lucide-react';
import { useBirthdayCountdown } from '../hooks/useBirthdayCountdown';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const BirthdayCountdown: React.FC = () => {
  const { days, hours, minutes, seconds, isBirthday, istTimeString, istDateString } =
    useBirthdayCountdown();
  const prefersReducedMotion = useReducedMotion();
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    if (isBirthday && !celebrated) {
      setCelebrated(true);
      if (!prefersReducedMotion) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#fb7091', '#f43f6e', '#fef08a', '#c084fc', '#ffffff'],
        });
      }
    }
  }, [isBirthday, celebrated, prefersReducedMotion]);

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section id="countdown" className="relative py-16 sm:py-24 px-4 z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
          <Clock className="w-3.5 h-3.5 text-blush-400" />
          <span>Moments In Time</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 font-semibold mb-3 tracking-wide">
          {isBirthday ? "It's Popy's Birthday! 🎂" : "Counting Down to Your Day"}
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-pink-200/80 max-w-xl mx-auto mb-10">
          {isBirthday
            ? "The universe is celebrating you today. Happy Birthday, Popy! ✨"
            : "“Every second brings us closer to your special day.”"}
        </p>

        {/* Live IST Clock Indicator */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-midnight-800/80 border border-pink-400/20 text-xs sm:text-sm text-pink-200/70 mb-10 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>India Standard Time (IST):</span>
          <span className="font-mono text-pink-200 font-medium">{istTimeString}</span>
          <span className="text-pink-300/40">|</span>
          <span className="text-pink-200/70">{istDateString}</span>
        </div>

        {/* Countdown Cards or Celebration Display */}
        <AnimatePresence mode="wait">
          {isBirthday ? (
            <motion.div
              key="celebration"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-3xl p-8 sm:p-12 border border-pink-400/30 max-w-2xl mx-auto box-glow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-blush-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blush-500 to-rose-400 flex items-center justify-center shadow-lg shadow-blush-500/40 mb-6 animate-bounce">
                  <PartyPopper className="w-10 h-10 text-white" />
                </div>

                <h3 className="font-handwriting text-4xl sm:text-5xl text-pink-200 font-bold text-glow mb-4">
                  Today is the Day! 🎈
                </h3>

                <p className="font-serif text-lg sm:text-xl text-cream-100 max-w-lg mx-auto leading-relaxed mb-6">
                  The wait is over! Today we celebrate everything that makes you unique, radiant, and wonderful.
                </p>

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blush-500/20 text-blush-200 text-sm font-medium border border-blush-400/30">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>12 October 2026 — Officially Popy&apos;s Special Day!</span>
                  <Heart className="w-4 h-4 text-blush-400 fill-blush-400" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="countdown-cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
            >
              {timeUnits.map((unit, index) => (
                <div
                  key={unit.label}
                  className="group relative glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-pink-300/20 hover:border-pink-300/40 transition-all duration-300 hover:scale-105 hover:box-glow"
                >
                  {/* Subtle top indicator */}
                  <div className="absolute top-3 right-3 text-pink-300/20 group-hover:text-pink-300/60 transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>

                  {/* Animated Number */}
                  <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-blush-200 text-glow my-1 tracking-tight">
                    {String(unit.value).padStart(2, '0')}
                  </div>

                  {/* Unit Label */}
                  <div className="text-xs sm:text-sm font-medium uppercase tracking-widest text-pink-200/70 group-hover:text-pink-100 transition-colors">
                    {unit.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
