import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, RotateCcw, Heart, Mic, MicOff } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const BirthdayCake: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const handleBlowCandles = () => {
    if (candlesBlown || isBlowing) return;
    setIsBlowing(true);
    soundEngine.playCandleBlow();

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);

      // Huge celebratory confetti and fireworks!
      if (!prefersReducedMotion) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fb7091', '#f43f6e', '#fef08a', '#c084fc', '#ffffff'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 60,
            origin: { x: 0.2, y: 0.6 },
            colors: ['#fb7091', '#fbcfe8', '#fef08a'],
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 60,
            origin: { x: 0.8, y: 0.6 },
            colors: ['#fb7091', '#fbcfe8', '#fef08a'],
          });
        }, 300);
      }
    }, 600);
  };

  const handleRelight = () => {
    soundEngine.playSparkle();
    setCandlesBlown(false);
  };

  // Optional Microphone blow detection
  const toggleMic = async () => {
    if (micActive) {
      // Turn off
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      setMicActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setMicActive(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;

        // If high breath noise detected
        if (avg > 45 && !candlesBlown) {
          handleBlowCandles();
          // Auto turn off mic after successful blow
          if (stream) stream.getTracks().forEach((t) => t.stop());
          setMicActive(false);
          return;
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };
      checkVolume();
    } catch {
      // Permission denied or mic unavailable
      setMicActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="cake" className="relative py-24 sm:py-32 px-4 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-500/10 border border-blush-400/25 text-blush-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blush-400" />
          <span>Birthday Wish Ritual</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 font-semibold mb-3 tracking-wide">
          Make a Wish, Popy! 🎂
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-pink-200/80 max-w-lg mx-auto mb-10 leading-relaxed">
          “Close your eyes, make a wish, and let the magic begin.”
        </p>

        {/* Revealed Birthday Wish Blessing Message */}
        <div className="min-h-[90px] flex items-center justify-center mb-8 px-4">
          <AnimatePresence mode="wait">
            {candlesBlown ? (
              <motion.div
                key="wish-revealed"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="glass-panel rounded-2xl p-6 sm:p-7 border border-pink-300/40 max-w-xl mx-auto box-glow"
              >
                <div className="inline-flex items-center gap-2 text-blush-400 mb-2 font-handwriting text-2xl font-bold">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
                  Your Wish Is Sent to the Stars!
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-cream-100 leading-relaxed">
                  “May this year bring you happiness, laughter, beautiful memories, and countless reasons to smile.”
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="wish-pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm sm:text-base text-pink-200/60 font-serif italic"
              >
                The candles are glowing brightly. Make your secret wish in your heart…
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* The Illustrated Interactive Birthday Cake */}
        <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-sm md:max-w-md mx-auto my-6 select-none flex flex-col items-center">
          {/* Subtle Ambient Cake Glow */}
          <div
            className={`absolute -inset-6 sm:-inset-10 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
              candlesBlown ? 'bg-purple-600/10 opacity-30' : 'bg-amber-400/20 opacity-80'
            }`}
          />

          {/* Candle Flames Row */}
          <div className="relative flex justify-center items-end gap-4 xs:gap-5 sm:gap-7 z-20 mb-[-6px]">
            {[1, 2, 3].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center">
                {/* Flame & Smoke */}
                <div className="h-8 xs:h-10 flex items-end justify-center relative">
                  {!candlesBlown ? (
                    <motion.div
                      animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 0.95, 1], y: [0, -1, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                      className="candle-flame w-3.5 xs:w-4 h-7 xs:h-8 rounded-full bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 shadow-[0_0_15px_#f59e0b]"
                    />
                  ) : (
                    /* Smoke wisps after blowing */
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -25, scale: 1.6 }}
                      transition={{ duration: 1.2 }}
                      className="w-2.5 h-6 rounded-full bg-white/40 blur-[1px]"
                    />
                  )}
                </div>

                {/* Candle Wick */}
                <div className="w-1 h-2.5 xs:h-3 bg-gray-700 rounded-t" />

                {/* Candle Body */}
                <div className="w-3.5 xs:w-4 sm:w-5 h-14 xs:h-16 sm:h-20 rounded-t-sm bg-gradient-to-r from-pink-200 via-white to-pink-300 border border-pink-300/40 shadow-md relative overflow-hidden">
                  {/* Spiral decorative stripes */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(244,63,110,0.4)_6px,rgba(244,63,110,0.4)_12px)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="relative z-10 w-40 xs:w-48 sm:w-56 h-12 xs:h-14 sm:h-16 rounded-t-2xl bg-gradient-to-r from-[#ffe4e9] via-[#ffffff] to-[#ffd1dc] border-t-2 border-x-2 border-pink-300/50 shadow-md flex items-start justify-center overflow-hidden">
            {/* Scalloped Frosting */}
            <div className="w-full flex justify-around mt-[-3px]">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 xs:w-7 h-3.5 xs:h-4 rounded-b-full bg-gradient-to-b from-white to-pink-100 shadow-sm border-b border-pink-300/30"
                />
              ))}
            </div>
            {/* Strawberry or cherry toppings */}
            <div className="absolute bottom-1.5 xs:bottom-2 flex gap-3 xs:gap-4 text-xs">
              <span>🍓</span>
              <span>✨</span>
              <span>🍓</span>
            </div>
          </div>

          {/* Cake Middle Tier */}
          <div className="relative z-10 w-52 xs:w-60 sm:w-72 h-14 xs:h-16 sm:h-20 rounded-t-xl bg-gradient-to-r from-[#fbcfe8] via-[#fff1f4] to-[#f9a8d4] border-t-2 border-x-2 border-pink-300/50 shadow-lg flex flex-col justify-between overflow-hidden">
            {/* Decorative Frosting Drops */}
            <div className="w-full flex justify-around mt-[-3px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 xs:w-7 h-4 xs:h-5 rounded-b-full bg-white shadow-sm border-b border-pink-300/30"
                />
              ))}
            </div>
            {/* Middle Ribbon line */}
            <div className="h-1.5 xs:h-2 w-full bg-rose-400/30 backdrop-blur-sm mb-1.5 xs:mb-2" />
          </div>

          {/* Cake Base Tier */}
          <div className="relative z-10 w-64 xs:w-72 sm:w-88 h-18 xs:h-20 sm:h-24 rounded-t-xl bg-gradient-to-r from-[#fda4af] via-[#fff5f7] to-[#fb7185] border-t-2 border-x-2 border-pink-300/60 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Base Frosting */}
            <div className="w-full flex justify-around mt-[-3px]">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 xs:w-7 h-4 xs:h-5 rounded-b-full bg-white shadow-sm border-b border-pink-300/30"
                />
              ))}
            </div>
            {/* Pearl piping row */}
            <div className="flex justify-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="w-2 xs:w-2.5 h-2 xs:h-2.5 rounded-full bg-white/90 shadow-sm" />
              ))}
            </div>
          </div>

          {/* Elegant Cake Platter / Stand */}
          <div className="relative z-10 w-72 xs:w-80 sm:w-96 h-4 xs:h-5 rounded-full bg-gradient-to-r from-gray-200 via-white to-gray-300 border border-gray-300/60 shadow-2xl flex items-center justify-center">
            <div className="w-40 xs:w-48 h-1 rounded-full bg-gray-400/30" />
          </div>
          <div className="w-28 xs:w-32 h-3.5 xs:h-4 rounded-b-xl bg-gradient-to-b from-gray-300 to-gray-400 shadow-lg" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-xs sm:max-w-none mx-auto w-full px-4">
          {!candlesBlown ? (
            <button
              onClick={handleBlowCandles}
              disabled={isBlowing}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blush-500 via-rose-500 to-purple-600 shadow-xl shadow-blush-500/25 hover:shadow-blush-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200 group-hover:translate-x-1 transition-transform" />
              <span>{isBlowing ? "Blowing Candles..." : "Blow Out Candles & Make a Wish"}</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-sm sm:text-base font-medium text-pink-100 glass-panel border border-pink-300/30 hover:bg-white/10 hover:border-pink-300/50 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <RotateCcw className="w-4 h-4 text-blush-400" />
              <span>Relight Candles & Wish Again</span>
            </button>
          )}

          {/* Optional Mic Blow Button */}
          <button
            onClick={toggleMic}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
              micActive
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200'
                : 'bg-white/5 border-pink-300/20 text-pink-200/70 hover:bg-white/10'
            }`}
            title="Optionally blow into your microphone"
          >
            {micActive ? <Mic className="w-4 h-4 text-emerald-300 animate-pulse" /> : <MicOff className="w-4 h-4" />}
            <span>{micActive ? "Listening (Blow now!)" : "Use Mic to Blow (Optional)"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
