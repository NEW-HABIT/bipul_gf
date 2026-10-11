import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { GALLERY_MEMORIES, PhotoMemory } from '../data/gallery';
import { PhotoLightbox } from './PhotoLightbox';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="gallery" className="relative py-20 sm:py-28 px-4 z-10">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blush-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-500/10 border border-blush-400/25 text-blush-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
            <Camera className="w-3.5 h-3.5 text-blush-400" />
            <span>Memory Keepsakes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rose-100 font-semibold mb-4 tracking-wide">
            Little Moments, Beautiful Memories
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-pink-200/80 leading-relaxed">
            “Some moments deserve to stay a little longer.”
          </p>
        </div>

        {/* Gallery Grid / Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 sm:gap-y-14 justify-items-center">
          {GALLERY_MEMORIES.map((photo, index) => {
            // Apply slight random-feel rotations
            const rotationStyle = prefersReducedMotion ? 'rotate-0' : '';
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group cursor-pointer w-full max-w-sm ${rotationStyle}`}
                style={!prefersReducedMotion ? { transform: `rotate(${photo.rotation})` } : {}}
                onClick={() => setSelectedPhotoIndex(index)}
              >
                {/* Polaroid Frame */}
                <div className="polaroid-card rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-0 group-hover:shadow-2xl group-hover:shadow-blush-500/20">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-100">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Heart */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30">
                        <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300" />
                        <span>Tap to view</span>
                      </span>
                    </div>
                  </div>

                  {/* Polaroid Label Area */}
                  <div className="pt-4 px-2 text-center">
                    <h3 className="font-handwriting text-2xl text-gray-800 font-bold group-hover:text-blush-600 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="font-serif italic text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery Footer Note */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-pink-200/50 italic">
            <Sparkles className="w-3.5 h-3.5 text-blush-300" />
            <span>Click any photograph to explore in full view</span>
            <Sparkles className="w-3.5 h-3.5 text-blush-300" />
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={GALLERY_MEMORIES}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(index) => setSelectedPhotoIndex(index)}
      />
    </section>
  );
};
