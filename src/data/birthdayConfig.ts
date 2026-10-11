export interface BirthdayConfig {
  person: {
    name: string;
    nickname: string;
    fullName?: string;
    birthdayDate: string; // YYYY-MM-DD
    targetTimeIST: string; // HH:mm:ss
    timezone: string;
  };
  letter: {
    heading: string;
    subtitle: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    envelopeLabel: string;
  };
  cake: {
    heading: string;
    subheading: string;
    wishMessage: string;
  };
  music: {
    filePath: string;
    songTitle: string;
    artist: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  person: {
    name: "Popy",
    nickname: "Popy",
    birthdayDate: "2026-10-12",
    targetTimeIST: "00:00:00",
    timezone: "Asia/Kolkata",
  },
  letter: {
    heading: "A Little Letter for You",
    subtitle: "Some things are better written from the heart.",
    salutation: "Dear Popy,",
    paragraphs: [
      "Happy Birthday! 💗",
      "Today is all about celebrating you and the wonderful person you are.",
      "I wanted to make something a little different for your special day, something you could open and explore, smile at, and perhaps remember for a long time.",
      "I hope the coming year brings you happiness, peace, exciting opportunities, beautiful surprises, and countless little moments that make life feel special.",
      "May your smile stay bright, your dreams keep growing, and your days be filled with people and experiences that make you happy.",
      "Enjoy every moment of your birthday. You deserve a beautiful day and an even more beautiful year ahead.",
      "Happy Birthday once again, Popy!"
    ],
    signOff: "With warm wishes,\nSomeone who wanted to make your day special. 💌",
    envelopeLabel: "For Popy 💗"
  },
  cake: {
    heading: "Make a Wish, Popy!",
    subheading: "Close your eyes, make a wish, and let the magic begin.",
    wishMessage: "May this year bring you happiness, laughter, beautiful memories, and countless reasons to smile. ✨🎂"
  },
  music: {
    filePath: "/audio/birthday-song.mp3",
    songTitle: "Birthday Melodies for Popy",
    artist: "A Little Universe OST"
  }
};
