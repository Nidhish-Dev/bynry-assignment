import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ParticleEffect = ({ trigger }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 200;

    const particles = [];
    const particleCount = 40;
    const color = "#00B7EB"; // Professional cyan

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 100,
        y: 100,
        radius: Math.random() * 4 + 1,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        alpha: 1,
        color: color,
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.012;
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(p.x - p.vx * 0.3, p.y - p.vy * 0.3, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 128).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });

      if (particles.some((p) => p.alpha > 0)) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [trigger]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: trigger ? 1 : 0, scale: trigger ? 1 : 0.5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
};

export default ParticleEffect;