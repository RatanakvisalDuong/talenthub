"use client"

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const [gradientAngle, setGradientAngle] = useState<number>(45);
  const [wavePosition, setWavePosition] = useState<number>(0);
  
  // Purple color palette matching the portfolio aesthetic
  const purpleColors = [
    '#6a1b9a', // Deep purple
    '#8e24aa', // Darker purple
    '#9c27b0', // Medium purple
    '#ab47bc', // Lighter purple
    '#5000ca', // Vibrant purple from the wave effect
    '#2c0b52', // Deep purple from the gradient
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles.current = [];
      // Match particle count to be similar to the portfolio example (around 30)
      const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 40000));
      
      for (let i = 0; i < particleCount; i++) {
        // Select a random color from our palette
        const randomColor = purpleColors[Math.floor(Math.random() * purpleColors.length)];
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1, // Match the size range in the portfolio (1-5)
          speedX: (Math.random() - 0.5) * 0.5,
          // Use slightly upward bias for speed to match the floating effect
          speedY: -Math.random() * 0.3 - 0.1, 
          opacity: Math.random() * 0.5 + 0.1, // Match the opacity range from portfolio
          color: randomColor
        });
      }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background similar to portfolio
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0c1e3e');
      gradient.addColorStop(0.5, '#1a3a6a');
      gradient.addColorStop(1, '#2c0b52');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.4; // Matching the opacity from portfolio
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      
      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Add slight sine wave movement to x position, similar to portfolio
        particle.x += particle.speedX + Math.sin(particle.y / 15) * 0.2;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        
        // Reset to bottom if it goes off the top (floating upward effect like portfolio)
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.opacity = Math.random() * 0.5 + 0.1;
        }
        
        // Draw particle with glow effect like portfolio
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Add glow effect
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        glow.addColorStop(0, particle.color);
        glow.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glow;
        ctx.globalAlpha = particle.opacity * 0.5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      });
      
      // Connect nearby particles with lines
      connectParticles(ctx);
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      const maxDistance = 120;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - (distance / maxDistance)) * 0.2; // Lower opacity for connections
            ctx.beginPath();
            ctx.strokeStyle = `rgba(140, 100, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Start animation
    animate();
    
    // Animate gradient angle like in portfolio
    const gradientInterval = setInterval(() => {
      setGradientAngle(prev => (prev + 0.2) % 360);
    }, 100);
    
    // Animate wave position like in portfolio
    const waveInterval = setInterval(() => {
      setWavePosition(prev => (prev + 1) % 100);
    }, 50);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      clearInterval(gradientInterval);
      clearInterval(waveInterval);
    };
  }, []);
  
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ pointerEvents: 'none' }}
      />
      
      <div 
        className="fixed inset-0 -z-20 opacity-40" 
        style={{
          background: `linear-gradient(${gradientAngle}deg, #0c1e3e, #1a3a6a, #2c0b52)`
        }}
      />
    </>
  );
}