import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  colors = ['#00f0ff', '#7b42ff', '#00ff88'],
  minSize = 2,
  maxSize = 6,
  minSpeed = 0.1,
  maxSpeed = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: minSize + Math.random() * (maxSize - minSize),
      speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.3 + Math.random() * 0.5
    }));

    // Create particle elements
    particlesRef.current.forEach((particle, index) => {
      const element = document.createElement('div');
      element.className = 'particle';
      element.style.width = `${particle.size}px`;
      element.style.height = `${particle.size}px`;
      element.style.left = `${particle.x}px`;
      element.style.top = `${particle.y}px`;
      element.style.opacity = particle.opacity.toString();
      element.style.backgroundColor = particle.color;
      element.style.boxShadow = `0 0 ${particle.size * 2}px ${particle.color}`;
      element.dataset.index = index.toString();
      container.appendChild(element);
    });

    // Animation function
    const animate = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Update particle positions
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x <= 0 || particle.x >= width) {
          particle.speedX *= -1;
        }
        
        if (particle.y <= 0 || particle.y >= height) {
          particle.speedY *= -1;
        }
        
        // Update DOM element
        const element = container.querySelector(`[data-index="${index}"]`) as HTMLElement;
        if (element) {
          element.style.left = `${particle.x}px`;
          element.style.top = `${particle.y}px`;
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed]);

  return (
    <div ref={containerRef} className="particles-container" />
  );
};

export default FloatingParticles;
