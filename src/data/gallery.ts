export interface PhotoMemory {
  id: string;
  src: string;
  title: string;
  caption: string;
  orientation: 'portrait' | 'landscape';
  rotation: string; // e.g. '-2deg', '3deg'
}

export const GALLERY_MEMORIES: PhotoMemory[] = [
  {
    id: "mem-1",
    src: "/images/popy-01.jpg",
    title: "A Radiant Smile",
    caption: "A bright smile that naturally brings warmth and joy to the room.",
    orientation: "portrait",
    rotation: "-2.5deg",
  },
  {
    id: "mem-2",
    src: "/images/popy-02.jpg",
    title: "Gentle Grace",
    caption: "Capturing a calm, beautiful moment worth treasuring.",
    orientation: "portrait",
    rotation: "3deg",
  },
  {
    id: "mem-3",
    src: "/images/popy-03.jpg",
    title: "Quiet Elegance",
    caption: "Some moments carry an effortless and timeless charm.",
    orientation: "portrait",
    rotation: "-1.8deg",
  },
  {
    id: "mem-4",
    src: "/images/popy-04.jpg",
    title: "Warm Expressions",
    caption: "Every photograph tells a silent story of genuine happiness.",
    orientation: "portrait",
    rotation: "2.2deg",
  },
  {
    id: "mem-5",
    src: "/images/popy-05.jpg",
    title: "Sweet Moments",
    caption: "Cherishing the simple, pretty memories that make life sweet.",
    orientation: "portrait",
    rotation: "-3deg",
  },
];
