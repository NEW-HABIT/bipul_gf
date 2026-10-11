import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react';
import { PhotoMemory } from '../data/gallery';

interface PhotoLightboxProps {
  photos: PhotoMemory[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activePhoto = currentIndex !== null ? photos[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(nextIndex);
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIndex);
  }, [currentIndex, photos.length, onNavigate]);

  // Slideshow timer
  useEffect(() => {
    if (!isPlayingSlideshow || currentIndex === null) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlayingSlideshow, currentIndex, handleNext]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingSlideshow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (currentIndex === null || !activePhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Controls Bar */}
        <div
          className="absolute top-4 sm:top-6 left-0 right-0 max-w-5xl mx-auto px-4 flex justify-between items-center z-20 pointer-events-none"
        >
          {/* Photo Counter */}
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/10 text-white/90 text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Action buttons */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlayingSlideshow((prev) => !prev);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-md border border-white/20 transition-all"
              title={isPlayingSlideshow ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlayingSlideshow ? <Pause className="w-4 h-4 text-pink-300" /> : <Play className="w-4 h-4 text-pink-300" />}
              <span className="hidden sm:inline">{isPlayingSlideshow ? "Pause" : "Slideshow"}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:rotate-90"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-1 xs:left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all z-20 active:scale-90"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-1 xs:right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all z-20 active:scale-90"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Center Polaroid Showcase */}
        <div
          className="relative max-w-lg max-h-[88vh] w-full flex flex-col items-center justify-center p-1 sm:p-2"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="polaroid-card w-full max-w-[340px] xs:max-w-sm sm:max-w-md bg-white rounded-xl shadow-2xl p-3 xs:p-4 sm:p-5 flex flex-col items-center"
          >
            {/* Image Frame with responsive max-height */}
            <div className="relative w-full max-h-[50vh] sm:max-h-[58vh] aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
              />
            </div>

            {/* Caption & Title */}
            <div className="w-full mt-3 sm:mt-4 text-center">
              <h3 className="font-handwriting text-xl xs:text-2xl sm:text-3xl text-gray-800 font-bold tracking-wide">
                {activePhoto.title}
              </h3>
              <p className="font-serif italic text-[11px] xs:text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 max-w-sm mx-auto">
                {activePhoto.caption}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
