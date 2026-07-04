"use client";

import React, { useEffect, useRef } from "react";

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // The spheres we want to draw
    const spheres = [
      { x: width * 0.2, y: height * 0.2, radius: width * 0.4, color: "rgba(100, 150, 255, 0.4)", vx: 0.5, vy: 0.3 },
      { x: width * 0.8, y: height * 0.8, radius: width * 0.5, color: "rgba(60, 80, 200, 0.3)", vx: -0.4, vy: -0.6 },
      { x: width * 0.5, y: height * 0.5, radius: width * 0.3, color: "rgba(0, 200, 255, 0.2)", vx: 0.6, vy: -0.4 }
    ];

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a blurry filter effect directly on canvas using radial gradients
      spheres.forEach(sphere => {
        sphere.x += sphere.vx;
        sphere.y += sphere.vy;
        
        // Bounce off walls
        if (sphere.x - sphere.radius > width || sphere.x + sphere.radius < 0) sphere.vx = -sphere.vx;
        if (sphere.y - sphere.radius > height || sphere.y + sphere.radius < 0) sphere.vy = -sphere.vy;

        const gradient = ctx.createRadialGradient(
          sphere.x, sphere.y, 0,
          sphere.x, sphere.y, sphere.radius
        );
        gradient.addColorStop(0, sphere.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ filter: 'blur(60px)' }}
      />
    </div>
  );
}
