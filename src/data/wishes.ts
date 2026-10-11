export interface SkyWish {
  id: string;
  x: number; // percentage from left (5% - 95%)
  y: number; // percentage from top (10% - 85%)
  size: 'sm' | 'md' | 'lg';
  color: string;
  title: string;
  message: string;
  emoji: string;
}

export const SKY_WISHES: SkyWish[] = [
  {
    id: "wish-1",
    x: 18,
    y: 28,
    size: "lg",
    color: "#fbcfe8", // soft pink
    title: "Happiness",
    message: "I hope your days are filled with happiness, light, and everything that makes your heart feel full.",
    emoji: "🌸",
  },
  {
    id: "wish-2",
    x: 35,
    y: 48,
    size: "md",
    color: "#fef08a", // soft gold
    title: "Reasons to Smile",
    message: "May you always have countless reasons to smile, even on ordinary, quiet afternoons.",
    emoji: "✨",
  },
  {
    id: "wish-3",
    x: 52,
    y: 22,
    size: "lg",
    color: "#e9d5ff", // soft lilac
    title: "New Beginnings",
    message: "May this new chapter bring you beautiful opportunities, exciting journeys, and sweet discoveries.",
    emoji: "🌟",
  },
  {
    id: "wish-4",
    x: 68,
    y: 55,
    size: "md",
    color: "#fed7aa", // soft peach
    title: "Wonderful Moments",
    message: "You deserve wonderful moments, today and every single day of this coming year.",
    emoji: "💫",
  },
  {
    id: "wish-5",
    x: 82,
    y: 32,
    size: "lg",
    color: "#fbcfe8", // blush
    title: "Uniquely Special",
    message: "Never forget how special and appreciated you truly are to those around you.",
    emoji: "💖",
  },
  {
    id: "wish-6",
    x: 25,
    y: 72,
    size: "sm",
    color: "#bae6fd", // soft sky
    title: "Peace & Serenity",
    message: "May peaceful thoughts and quiet contentment wrap around you whenever you need them.",
    emoji: "🕊️",
  },
  {
    id: "wish-7",
    x: 75,
    y: 78,
    size: "sm",
    color: "#fecdd3", // rose
    title: "Dreams Coming True",
    message: "May every wish you whisper in secret take root and blossom beautifully.",
    emoji: "🌙",
  },
];
