import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IntroEnvelope } from './components/IntroEnvelope';
import { BirthdayHero } from './components/BirthdayHero';
import { BirthdayCountdown } from './components/BirthdayCountdown';
import { PhotoGallery } from './components/PhotoGallery';
import { WishesSky } from './components/WishesSky';
import { MysteryGifts } from './components/MysteryGifts';
import { BirthdayCake } from './components/BirthdayCake';
import { BirthdayLetter } from './components/BirthdayLetter';
import { FinalSurprise } from './components/FinalSurprise';
import { Navigation } from './components/Navigation';
import { MusicPlayer } from './components/MusicPlayer';
import { ParticleBackground } from './components/ParticleBackground';
import { soundEngine } from './utils/audioSynth';

export function App() {
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleTogglePlay = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundEngine.setSfxMuted(next);
      return next;
    });
  };

  const handleOpenSurprise = () => {
    setHasOpenedIntro(true);
    setIsMusicPlaying(true);
  };

  const handleReplay = () => {
    setHasOpenedIntro(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplore = () => {
    const countdownEl = document.querySelector('#countdown');
    if (countdownEl) {
      countdownEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToLetter = () => {
    const letterEl = document.querySelector('#letter');
    if (letterEl) {
      letterEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToGallery = () => {
    const galleryEl = document.querySelector('#gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-midnight-900 text-cream-50 font-sans selection:bg-blush-500 selection:text-white">
      {/* Background Star & Petal Particle Canvas */}
      <ParticleBackground intensity={hasOpenedIntro ? 'celebration' : 'ambient'} />

      {/* Secret Entrance Envelope */}
      <AnimatePresence>
        {!hasOpenedIntro && (
          <IntroEnvelope
            onOpenSurprise={handleOpenSurprise}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}
      </AnimatePresence>

      {/* Main Experience */}
      {hasOpenedIntro && (
        <main className="relative z-10 transition-opacity duration-1000">
          {/* Persistent Top Navigation */}
          <Navigation onReplay={handleReplay} />

          {/* Page 2: Grand Birthday Reveal Hero */}
          <BirthdayHero
            onExplore={handleExplore}
            onPlayMusic={handleTogglePlay}
            isMusicPlaying={isMusicPlaying}
          />

          {/* Section: Live Birthday Countdown (IST Timezone Aware) */}
          <BirthdayCountdown />

          {/* Page 3: Photo Gallery of Memories */}
          <PhotoGallery />

          {/* Page 4: A Sky Full of Wishes */}
          <WishesSky />

          {/* Page 5: Three Mystery Gifts */}
          <MysteryGifts onGoToLetter={handleGoToLetter} />

          {/* Page 6: Birthday Cake Experience */}
          <BirthdayCake />

          {/* Page 7: Personal Birthday Letter */}
          <BirthdayLetter />

          {/* Final Climax: The Last Surprise & Montage */}
          <FinalSurprise
            onReplay={handleReplay}
            onGoToGallery={handleGoToGallery}
          />

          {/* Floating Music Player */}
          <MusicPlayer
            isMusicPlaying={isMusicPlaying}
            onTogglePlay={handleTogglePlay}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        </main>
      )}
    </div>
  );
}

export default App;
