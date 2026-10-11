import { useState, useEffect } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
  isPastBirthday: boolean;
  istTimeString: string;
  istDateString: string;
  totalMillisecondsLeft: number;
}

/**
 * Target date: 12 October 2026 at 00:00:00 in Asia/Kolkata (IST = UTC + 5:30)
 * In UTC, this is 2026-10-11T18:30:00.000Z
 */
export const BIRTHDAY_TARGET_UTC_MS = Date.UTC(2026, 9, 11, 18, 30, 0); // Month 9 is October (0-indexed)

export function useBirthdayCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>(() => calculateTimeLeft());

  function calculateTimeLeft(): CountdownState {
    const now = new Date();
    const nowMs = now.getTime();
    const diff = BIRTHDAY_TARGET_UTC_MS - nowMs;

    // Time in India (IST)
    const istDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const istTimeString = istDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const istDateString = istDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const isBirthdayOrLater = diff <= 0;

    if (isBirthdayOrLater) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isBirthday: true,
        isPastBirthday: true,
        istTimeString,
        istDateString,
        totalMillisecondsLeft: 0,
      };
    }

    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isBirthday: false,
      isPastBirthday: false,
      istTimeString,
      istDateString,
      totalMillisecondsLeft: diff,
    };
  }

  useEffect(() => {
    // Initial call
    setCountdown(calculateTimeLeft());

    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return countdown;
}
