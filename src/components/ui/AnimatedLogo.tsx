
import React, { useEffect, useRef } from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Size mapping
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 }
  };
  
  const { width, height } = dimensions[size];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // For high-resolution displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // Style settings
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    let animationFrameId: number;
    let hue = 0;
    
    const drawLogo = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Center of the canvas
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate size based on the canvas dimensions
      const baseSize = Math.min(width, height) * 0.4;
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.2)`;
      ctx.fill();
      
      // Draw inner shapes - a stylized "P" for "Parent Engagement"
      ctx.beginPath();
      
      // Draw a stylized "P" shape
      const pHeight = baseSize * 1.5;
      const pWidth = baseSize * 0.8;
      const pX = centerX - pWidth / 2;
      const pY = centerY - pHeight / 2;
      
      // Vertical line of P
      ctx.moveTo(pX, pY);
      ctx.lineTo(pX, pY + pHeight);
      
      // Curved part of P
      ctx.moveTo(pX, pY);
      ctx.lineTo(pX + pWidth, pY);
      ctx.lineTo(pX + pWidth, pY + pHeight * 0.5);
      ctx.lineTo(pX, pY + pHeight * 0.5);
      
      ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.9)`;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      
      // Animation
      hue = (hue + 0.5) % 360;
      animationFrameId = requestAnimationFrame(drawLogo);
    };
    
    drawLogo();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);
  
  return (
    <div className={`relative ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="animate-pulse-slow"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};

export default AnimatedLogo;
