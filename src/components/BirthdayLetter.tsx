import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, FastForward, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const BirthdayLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]);
  const [currentParaIdx, setCurrentParaIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const letterRef = useRef<HTMLDivElement | null>(null);

  const fullParagraphs = BIRTHDAY_CONFIG.letter.paragraphs;

  // Envelope Open trigger
  const handleOpenLetter = () => {
    soundEngine.playChime();
    setIsOpen(true);

    if (prefersReducedMotion) {
      // Instant reveal for reduced motion
      setDisplayedParagraphs(fullParagraphs);
      setIsFinished(true);
      return;
    }

    setIsTyping(true);
    setDisplayedParagraphs(['']);
    setCurrentParaIdx(0);
    setCurrentCharIdx(0);
  };

  // Skip typing animation
  const handleSkipTyping = () => {
    setIsTyping(false);
    setDisplayedParagraphs(fullParagraphs);
    setIsFinished(true);
  };

  // Typewriter effect execution
  useEffect(() => {
    if (!isTyping || isFinished) return;

    if (currentParaIdx >= fullParagraphs.length) {
      setIsTyping(false);
      setIsFinished(true);
      return;
    }

    const targetText = fullParagraphs[currentParaIdx];

    if (currentCharIdx < targetText.length) {
      const timer = setTimeout(() => {
        // Soft audio tick every 4 characters
        if (currentCharIdx % 4 === 0) {
          soundEngine.playTypewriterTick();
        }

        setDisplayedParagraphs((prev) => {
          const next = [...prev];
          next[currentParaIdx] = targetText.slice(0, currentCharIdx + 1);
          return next;
        });
        setCurrentCharIdx((c) => c + 1);
      }, 25);

      return () => clearTimeout(timer);
    } else {
      // Paragraph complete, move to next after pause
      const pauseTimer = setTimeout(() => {
        setCurrentParaIdx((p) => p + 1);
        setCurrentCharIdx(0);
        setDisplayedParagraphs((prev) => [...prev, '']);
      }, 400);

      return () => clearTimeout(pauseTimer);
    }
  }, [isTyping, currentParaIdx, currentCharIdx, fullParagraphs, isFinished]);

  return (
    <section id="letter" className="relative py-24 sm:py-32 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-500/10 border border-blush-400/25 text-blush-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            <Mail className="w-3.5 h-3.5 text-blush-400" />
            <span>Personal Letter</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 font-semibold mb-3 tracking-wide">
            {BIRTHDAY_CONFIG.letter.heading}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-pink-200/80 leading-relaxed">
            “{BIRTHDAY_CONFIG.letter.subtitle}”
          </p>
        </div>

        {/* Envelope Container before opening */}
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-lg mx-auto"
          >
            <div
              onClick={handleOpenLetter}
              className="group relative cursor-pointer w-full max-w-md h-64 sm:h-72 rounded-3xl bg-gradient-to-br from-[#2a1744] via-[#1f1035] to-[#120824] border border-pink-400/30 p-8 shadow-2xl box-glow flex flex-col items-center justify-between hover:scale-105 transition-all duration-300"
            >
              {/* Envelope flap aesthetic */}
              <div
                className="absolute top-0 inset-x-0 h-28 bg-[#371d5b] border-b border-pink-300/30 rounded-t-3xl flex justify-center items-end pb-3"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Wax Heart Seal */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-blush-600 to-rose-400 border-2 border-pink-200 shadow-xl shadow-blush-500/50 flex items-center justify-center group-hover:scale-115 transition-transform">
                <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
              </div>

              {/* Envelope Label */}
              <div className="relative z-10 text-center">
                <h3 className="font-handwriting text-3xl sm:text-4xl text-pink-100 font-bold mb-1">
                  {BIRTHDAY_CONFIG.letter.envelopeLabel}
                </h3>
                <p className="text-xs uppercase tracking-widest text-pink-200/60 font-mono">
                  Click to Break Seal & Read
                </p>
              </div>

              {/* Button */}
              <div className="relative z-10 w-full pt-3 border-t border-pink-300/15">
                <span className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-blush-500/20 group-hover:bg-blush-500 text-pink-200 group-hover:text-white text-sm font-medium transition-colors">
                  <Sparkles className="w-4 h-4 text-pink-300" />
                  <span>Open Letter</span>
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Opened Cream Letter Card */
          <motion.div
            ref={letterRef}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="letter-paper rounded-3xl p-6 sm:p-12 md:p-16 max-w-2xl mx-auto shadow-2xl border border-pink-200/80 text-gray-800 relative overflow-hidden"
          >
            {/* Subtle corner floral decorations */}
            <div className="absolute top-4 left-4 text-pink-300/40 select-none">🌸</div>
            <div className="absolute top-4 right-4 text-pink-300/40 select-none">🌸</div>
            <div className="absolute bottom-4 right-4 text-pink-300/40 select-none">🌺</div>
            <div className="absolute bottom-4 left-4 text-pink-300/40 select-none">🌺</div>

            {/* Skip animation controls */}
            {isTyping && !isFinished && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleSkipTyping}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-medium transition-colors shadow-sm"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Read Full Letter</span>
                </button>
              </div>
            )}

            {/* Letter Salutation */}
            <div className="mb-6">
              <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold tracking-wide">
                {BIRTHDAY_CONFIG.letter.salutation}
              </h3>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-serif text-base sm:text-lg text-gray-700 leading-relaxed sm:leading-loose">
              {displayedParagraphs.map((para, idx) => (
                <p key={idx} className="relative">
                  {para}
                  {/* Blinking typewriter cursor at active paragraph end */}
                  {isTyping && idx === currentParaIdx && (
                    <span className="inline-block w-2 h-4 ml-1 bg-blush-500 animate-pulse align-middle" />
                  )}
                </p>
              ))}
            </div>

            {/* Sign-off & Closing */}
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-10 pt-6 border-t border-pink-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
              >
                <div className="whitespace-pre-line font-handwriting text-2xl sm:text-3xl text-rose-700 font-semibold leading-snug">
                  {BIRTHDAY_CONFIG.letter.signOff}
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-pink-400 font-medium">
                  <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-bounce" />
                  <span>Written with care</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
