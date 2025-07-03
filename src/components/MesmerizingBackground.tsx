import { useEffect, useRef } from 'react';

const MesmerizingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- MODIFIED: Moved scroll variables here ---
    let scrollVelocity = 0;
    let lastScrollTop = 0;
    let scrollContainer: HTMLElement | null = null;
    let listenerAttached = false; // Flag to ensure we only attach the listener once

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const colorPalettes = [
      ['#0F0F28', '#8A2BE2', '#4169E1', '#FF69B4'],
    ];
    const currentPalette = colorPalettes[0];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseY: number; // Store original Y to fight drift
      size: number;
      opacity: number;
      color: string;
      trail: Array<{ x: number; y: number; opacity: number }>;
    }

    const particles: Particle[] = [];
    const numParticles = 80;
    const maxParticleTrail = 10;

    for (let i = 0; i < numParticles; i++) {
      const yPos = Math.random() * canvas.height;
      particles.push({
        x: Math.random() * canvas.width,
        y: yPos,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        baseY: yPos, // Store the initial Y position
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: currentPalette[Math.floor(Math.random() * currentPalette.length)],
        trail: [],
      });
    }

    const handleScroll = (event: Event) => {
      const container = event.target as HTMLElement;
      const scrollTop = container.scrollTop;
      const delta = scrollTop - lastScrollTop;
      scrollVelocity = -delta * 0.3;
      lastScrollTop = scrollTop;
    };

    const animate = () => {
      // --- NEW: Robust listener attachment ---
      // On each frame, check if we need to find the container and attach the listener.
      if (!listenerAttached) {
        scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
          lastScrollTop = scrollContainer.scrollTop; // Initialize scroll position
          scrollContainer.addEventListener('scroll', handleScroll);
          listenerAttached = true; // Mark as attached so we don't do this again
        }
      }

      scrollVelocity *= 0.95; // Damping

      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.008;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, hexToRgba(currentPalette[0], 0.1 + Math.sin(time * 0.7) * 0.05));
      gradient.addColorStop(0.3, hexToRgba(currentPalette[1], 0.1 + Math.cos(time * 0.9) * 0.05));
      gradient.addColorStop(0.7, hexToRgba(currentPalette[2], 0.1 + Math.sin(time * 1.1) * 0.05));
      gradient.addColorStop(1, hexToRgba(currentPalette[3], 0.1 + Math.cos(time * 0.8) * 0.05));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const dynamicConnectionThreshold = 150 + Math.abs(scrollVelocity) * 15;

      particles.forEach((particle, index) => {
        particle.y += scrollVelocity; // Apply scroll parallax

        particle.x += particle.vx + Math.sin(time * 2 + index) * 0.05;
        particle.y += particle.vy + Math.cos(time * 2 + index) * 0.05;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > maxParticleTrail) {
          particle.trail.shift();
        }

        for (let i = 0; i < particle.trail.length; i++) {
            const trailSegment = particle.trail[i];
            const segmentOpacity = trailSegment.opacity * (i / maxParticleTrail);
            ctx.beginPath();
            ctx.arc(trailSegment.x, trailSegment.y, particle.size * (i / maxParticleTrail), 0, Math.PI * 2);
            ctx.fillStyle = hexToRgba(particle.color, segmentOpacity);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(particle.color, particle.opacity);
        ctx.fill();

        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < dynamicConnectionThreshold) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / dynamicConnectionThreshold)})`;
            ctx.lineWidth = 0.8 * (1 - distance / dynamicConnectionThreshold);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    function hexToRgba(hex: string, alpha: number) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    animate(); // Start the animation loop

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      // Now we need to check if the listener was ever attached before trying to remove it
      if (listenerAttached && scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MesmerizingBackground;