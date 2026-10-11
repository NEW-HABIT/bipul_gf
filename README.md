# 💗 POPY — A Little Universe Made Just For You

A premium, romantic, cinematic, and interactive birthday surprise website crafted especially for **Popy** celebrating her birthday on **12 October 2026**.

Designed to feel like an interactive digital gift, a memory keepsake, and a magical universe combined into one.

---

## ✨ Features & Interactive Pages

1. **Page 1: The Secret Entrance**
   - Full-screen opening with floating hearts, twinkling stars, and rose petals.
   - Interactive 3D sealed envelope with a glowing heart wax seal.
   - Cinematic unsealing animation, sound chimes, and confetti burst into the main experience.
   - Audio toggle and skip-intro options. Respects reduced-motion preferences.

2. **Page 2: The Grand Birthday Reveal**
   - Elegant handwritten typography: *"Happy Birthday, Popy! 💗"*.
   - Floating pastel balloons, drifting rose petals, and celebration fireworks.
   - Quick action buttons to smoothly explore the journey or start the birthday soundtrack.

3. **Live Birthday Countdown (IST Timezone Aware)**
   - Accurate timezone calculation targeting **12 October 2026 at 00:00:00 Asia/Kolkata (IST)**.
   - Live Indian Standard Time (IST) clock indicator.
   - 4 glassmorphism cards with glowing countdown digits.
   - Automatically stops at zero and reveals a special celebration greeting. Never shows negative numbers!

4. **Page 3: Little Moments, Beautiful Memories (Photo Gallery)**
   - Polaroid cards with subtle tilts, paper shadows, and washi-tape decorations.
   - Integrated with Popy's photos (`public/images/popy-01.jpg` through `popy-05.jpg`).
   - Full-screen Lightbox with next/previous navigation, swipe gesture support, and automatic slideshow mode.

5. **Page 4: If Wishes Were Stars… (Midnight Sky)**
   - Interactive midnight star constellation with glowing moon and soft nebula.
   - Clickable twinkling stars that unveil floating wish cards with heartfelt birthday blessings.

6. **Page 5: A Few Little Surprises for You (Three Mystery Gifts)**
   - 3 distinct 3D gift boxes with personalized surprises:
     - **Gift 1:** *A Little Compliment*
     - **Gift 2:** *A Cherished Memory* (Framed photograph keepsake)
     - **Gift 3:** *Something Special* (Direct portal to the personal letter)

7. **Page 6: The Birthday Cake Experience**
   - Illustrated layered cake with frosting scallops, cherry toppings, and 3 glowing candles.
   - Flickering flame animations with soft ambient illumination.
   - Interactive *"Blow Out Candles & Make a Wish"* button (with gentle whoosh sound effect and confetti celebration).
   - Revealed blessing: *"May this year bring you happiness, laughter, beautiful memories, and countless reasons to smile."*
   - Optional microphone blow detection (never required). Replay/relight button.

8. **Page 7: A Little Letter for You**
   - Cream-colored textured letter card with handwritten calligraphy styling.
   - Wax-sealed envelope that breaks open on tap.
   - Typewriter animation with soft tick audio and a skip button to read immediately.

9. **Final Surprise & Replay**
   - Climax blessing and fireworks celebration.
   - Mini photo montage recap.
   - Replay experience and revisit photo gallery buttons.
   - Subtle footer: *"Made with care, just for Popy."*

10. **Floating Music Player & Sound Engine**
    - Plays `/audio/birthday-song.mp3` or seamlessly falls back to a built-in Web Audio API music-box lullaby so music never fails!
    - Animated EQ bars, volume slider, and sound effect mute toggle.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS** (Custom romantic palette: Blush pink, rose gold, midnight purple, cream)
- **Framer Motion** for smooth transitions and gesture interactions
- **Canvas-Confetti** & **Canvas 2D API** for stars, floating hearts, and petals
- **Web Audio API** for interactive chimes, typewriter clicks, wind whooshes, and music synthesis
- **Lucide React** for icons

---

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎨 Personalization & Customization

All personal details are organized in centralized files for effortless customization:

### 1. Photos
- Photos are stored in [`public/images/`](file:///c:/Users/barsh/Desktop/bipul/public/images/):
  - `popy-01.jpg`
  - `popy-02.jpg`
  - `popy-03.jpg`
  - `popy-04.jpg`
  - `popy-05.jpg`
- To change captions or add photos, edit [`src/data/gallery.ts`](file:///c:/Users/barsh/Desktop/bipul/src/data/gallery.ts).

### 2. Music
- Place any `.mp3` file at [`public/audio/birthday-song.mp3`](file:///c:/Users/barsh/Desktop/bipul/public/audio/).
- If no MP3 is provided, the website automatically plays the built-in music box melody so it is never silent!

### 3. Letter Text & Configuration
- Edit [`src/data/birthdayConfig.ts`](file:///c:/Users/barsh/Desktop/bipul/src/data/birthdayConfig.ts) to adjust:
  - Popy's name or birthday target time
  - The personal letter paragraphs & sign-off
  - Birthday cake wish messages

### 4. Star Wishes
- Edit [`src/data/wishes.ts`](file:///c:/Users/barsh/Desktop/bipul/src/data/wishes.ts) to add or customize sky wishes.

---

## 🌐 Deploying to Vercel or Netlify

### Deploying to Vercel (Recommended):
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Happy Birthday Popy"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New"** → **"Project"** and select your repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**. Within 30 seconds, you will receive a shareable HTTPS link to send to Popy!

### Deploying to Netlify:
1. Go to [netlify.com](https://netlify.com) and log in.
2. Click **"Add new site"** → **"Import an existing project"** → Choose GitHub.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy"**.
