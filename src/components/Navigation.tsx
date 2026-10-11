import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, ArrowUp, Sparkles } from 'lucide-react';

interface NavigationProps {
  onReplay: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onReplay }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Countdown', href: '#countdown' },
    { label: 'Memories', href: '#gallery' },
    { label: 'Wish Stars', href: '#wishes' },
    { label: 'Surprises', href: '#gifts' },
    { label: 'Birthday Cake', href: '#cake' },
    { label: 'Letter', href: '#letter' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Floating Glass Navigation Bar */}
      <nav
        className={`fixed top-4 left-0 right-0 max-w-5xl mx-auto px-4 z-40 transition-all duration-300 ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-95'
        }`}
      >
        <div className="glass-panel rounded-full px-3.5 py-2 sm:px-5 sm:py-3 border border-pink-300/25 flex items-center justify-between backdrop-blur-xl shadow-xl shadow-black/20">
          {/* Logo / Brandmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center gap-1.5 xs:gap-2 group cursor-pointer"
          >
            <span className="font-handwriting text-xl xs:text-2xl sm:text-3xl font-bold text-pink-200 group-hover:text-blush-400 transition-colors">
              Popy
            </span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blush-500 fill-blush-500 group-hover:scale-125 transition-transform" />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-xs font-medium uppercase tracking-wider text-pink-200/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Replay & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onReplay}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-pink-200 bg-white/5 hover:bg-white/10 border border-pink-300/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blush-400" />
              <span>Intro</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 md:hidden rounded-full text-pink-200 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 xs:top-20 inset-x-3 xs:inset-x-4 max-w-sm mx-auto glass-panel rounded-2xl p-4 border border-pink-300/30 shadow-2xl z-40 md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-4 py-2 rounded-lg text-sm text-pink-100 hover:bg-white/10 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-pink-300/20 flex justify-between items-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplay();
                  }}
                  className="px-3 py-1.5 text-xs text-blush-300 font-medium hover:underline"
                >
                  Replay Opening Intro
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToTop();
                  }}
                  className="px-3 py-1.5 text-xs text-pink-200 font-medium bg-white/5 rounded-full"
                >
                  Top ↑
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top floating pill (positioned cleanly above music player on mobile) */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 sm:bottom-20 right-3.5 sm:right-6 p-2 sm:p-2.5 rounded-full glass-panel border border-pink-300/25 text-pink-200 hover:text-white shadow-lg transition-all hover:scale-110 active:scale-90 z-30"
          aria-label="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </>
  );
};
