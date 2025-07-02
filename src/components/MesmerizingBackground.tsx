import { useEffect, useRef } from 'react';

const MesmerizingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    // Define color palettes
    const colorPalettes = [
      // Deep Ocean / Northern Lights
    //   ['#0A1931', '#185ADB', '#4EE5B6', '#FFC947'],
    //   // Sunset / Dusk
    //   ['#1A202C', '#DD6B20', '#ECC94B', '#F6AD55'],
      // Galactic / Nebula
      ['#0F0F28', '#8A2BE2', '#4169E1', '#FF69B4'],
      // Forest Glow
      ['#0F172A', '#16A085', '#2ECC71', '#FDCB6E'],
    ];

    // Select a random palette
    const currentPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    // Particle properties
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      trail: Array<{ x: number; y: number; opacity: number }>;
    }

    const particles: Particle[] = [];
    const numParticles = 80; // Increased particle count for more density
    const maxParticleTrail = 10; // Length of the particle trail

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8, // Slightly faster movement
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1, // Slightly smaller particles
        opacity: Math.random() * 0.6 + 0.2, // Higher base opacity for visibility
        color: currentPalette[Math.floor(Math.random() * currentPalette.length)], // Assign color from palette
        trail: [],
      });
    }

    const animate = () => {
      // Clear canvas with a very subtle fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.008; // Slower time increment for smoother wave transitions

      // Draw dynamic gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, hexToRgba(currentPalette[0], 0.1 + Math.sin(time * 0.7) * 0.05));
      gradient.addColorStop(0.3, hexToRgba(currentPalette[1], 0.1 + Math.cos(time * 0.9) * 0.05));
      gradient.addColorStop(0.7, hexToRgba(currentPalette[2], 0.1 + Math.sin(time * 1.1) * 0.05));
      gradient.addColorStop(1, hexToRgba(currentPalette[3], 0.1 + Math.cos(time * 0.8) * 0.05));

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position with slight directional change
        particle.x += particle.vx + Math.sin(time * 2 + index) * 0.05;
        particle.y += particle.vy + Math.cos(time * 2 + index) * 0.05;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > maxParticleTrail) {
          particle.trail.shift();
        }

        // Draw particle trail
        for (let i = 0; i < particle.trail.length; i++) {
          const trailSegment = particle.trail[i];
          const segmentOpacity = trailSegment.opacity * (i / maxParticleTrail);
          ctx.beginPath();
          ctx.arc(trailSegment.x, trailSegment.y, particle.size * (i / maxParticleTrail), 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(particle.color, segmentOpacity);
          ctx.fill();
        }

        // Draw current particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(particle.color, particle.opacity);
        ctx.fill();

        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const connectionThreshold = 150; // Increased connection distance
          if (distance < connectionThreshold) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            // Dynamic line opacity and thickness based on distance
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / connectionThreshold)})`;
            ctx.lineWidth = 0.8 * (1 - distance / connectionThreshold); // Thicker lines for closer particles
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    // Helper function to convert hex color to rgba
    function hexToRgba(hex: string, alpha: number) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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