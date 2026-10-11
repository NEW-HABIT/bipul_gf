import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ParticleBackgroundProps {
  intensity?: 'ambient' | 'celebration';
  interactiveCursor?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  intensity = 'ambient',
  interactiveCursor = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const starCount = prefersReducedMotion ? 20 : isMobile ? 45 : 90;
    const heartCount = prefersReducedMotion ? 4 : isMobile ? 8 : 16;
    const petalCount = prefersReducedMotion ? 3 : isMobile ? 6 : 12;

    // Stars
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    // Floating Hearts
    const hearts = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height * 0.2,
      size: Math.random() * 9 + 6,
      speedY: Math.random() * 0.6 + 0.25,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayDist: Math.random() * 25 + 10,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.15,
      color: Math.random() > 0.5 ? 'rgba(251, 112, 145, ' : 'rgba(244, 63, 110, ',
    }));

    // Falling Petals
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    // Mouse trails
    const mouseTrails: { x: number; y: number; size: number; alpha: number; color: string }[] = [];
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactiveCursor || prefersReducedMotion || isMobile) return;
      if (Math.random() < 0.4) {
        mouseTrails.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          alpha: 0.8,
          color: Math.random() > 0.5 ? '#fb7091' : '#fef08a',
        });
      }
    };
    if (interactiveCursor) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      context.fillStyle = color + alpha + ')';
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      context.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.25);
      context.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      context.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.fillStyle = `rgba(254, 205, 215, ${alpha})`;
      context.ellipse(0, 0, size * 1.2, size * 0.6, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render stars
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.opacity += star.twinkleSpeed * star.direction;
          if (star.opacity > 0.95) {
            star.opacity = 0.95;
            star.direction = -1;
          } else if (star.opacity < 0.2) {
            star.opacity = 0.2;
            star.direction = 1;
          }
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render floating hearts
      for (const heart of hearts) {
        if (!prefersReducedMotion) {
          heart.y -= heart.speedY * (intensity === 'celebration' ? 1.6 : 1);
          heart.phase += heart.swaySpeed;
          const currentX = heart.x + Math.sin(heart.phase) * heart.swayDist;
          if (heart.y < -30) {
            heart.y = height + 30;
            heart.x = Math.random() * width;
          }
          drawHeart(ctx, currentX, heart.y, heart.size, heart.color, heart.opacity);
        } else {
          drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.opacity);
        }
      }

      // Render falling rose petals
      for (const petal of petals) {
        if (!prefersReducedMotion) {
          petal.y += petal.speedY;
          petal.x += petal.speedX + Math.sin(tick * 0.01) * 0.3;
          petal.rotation += petal.rotSpeed;
          if (petal.y > height + 20) {
            petal.y = -20;
            petal.x = Math.random() * width;
          }
          drawPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.opacity);
        } else {
          drawPetal(ctx, petal.x, petal.y, petal.size, petal.rotation, petal.opacity);
        }
      }

      // Mouse stardust trails
      for (let i = mouseTrails.length - 1; i >= 0; i--) {
        const trail = mouseTrails[i];
        trail.alpha -= 0.025;
        trail.size += 0.1;
        if (trail.alpha <= 0) {
          mouseTrails.splice(i, 1);
          continue;
        }
        ctx.fillStyle = trail.color;
        ctx.globalAlpha = trail.alpha;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactiveCursor) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [intensity, interactiveCursor, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
