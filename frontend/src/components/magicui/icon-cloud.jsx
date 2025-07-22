

"use client";
import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images }) {
  const canvasRef = useRef(null);
  const [iconPositions, setIconPositions] = useState([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(null);
  const animationFrameRef = useRef();
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef([]);
  const imagesLoadedRef = useRef([]);

  // Load high-quality image icons
  useEffect(() => {
    if (!icons && !images) return;

    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      const canvasSize = 100;
      offscreen.width = canvasSize;
      offscreen.height = canvasSize;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        offCtx.imageSmoothingEnabled = true;
        offCtx.imageSmoothingQuality = "high";

        if (images) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = item;

          img.onload = () => {
            offCtx.clearRect(0, 0, canvasSize, canvasSize);
            offCtx.save();
            offCtx.beginPath();
            offCtx.arc(canvasSize / 2, canvasSize / 2, 40, 0, Math.PI * 2);
            offCtx.closePath();
            offCtx.clip();
            // size
            offCtx.drawImage(img, 15, 15, 70, 70);
            offCtx.restore();
            imagesLoadedRef.current[index] = true;
          };
        } else {
          offCtx.scale(0.5, 0.5);
          const svgString = renderToString(item);
          const img = new Image();
          img.src = "data:image/svg+xml;base64," + btoa(svgString);
          img.onload = () => {
            offCtx.clearRect(0, 0, canvasSize, canvasSize);
            offCtx.drawImage(img, 0, 0);
            imagesLoadedRef.current[index] = true;
          };
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Position icons on a sphere with animated intro
  useEffect(() => {
    const items = icons || images || [];
    const numIcons = items.length || 20;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const finalIcons = [];

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      // size
      finalIcons.push({ x: x * 600, y: y * 500, z: z * 400, scale: 2, opacity: 1, id: i });
    }

    const duration = 6000;
    const start = performance.now();

    const animateIntro = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      const animatedIcons = finalIcons.map((icon) => ({
        x: icon.x * eased,
        y: icon.y * eased,
        z: icon.z * eased,
        scale: 2 - eased,
        opacity: eased,
        id: icon.id,
      }));

      setIconPositions(animatedIcons);
      if (progress < 1) requestAnimationFrame(animateIntro);
    };

    requestAnimationFrame(animateIntro);
  }, [icons, images]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));

        const duration = Math.min(2000, Math.max(800, distance * 1000));
        setTargetRotation({ x: targetX, y: targetY, startX: currentX, startY: currentY, distance, startTime: performance.now(), duration });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = 1500 * ratio;
    canvas.height = 770 * ratio;
    canvas.style.width = '1500px';
    canvas.style.height = '770px';
    ctx.scale(ratio, ratio);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (2 * ratio);
      const centerY = canvas.height / (2 * ratio);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const speed = 0.003 + (Math.sqrt(dx * dx + dy * dy) / Math.sqrt(centerX * centerX + centerY * centerY)) * 0.001;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
          y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) setTargetRotation(null);
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        };
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 200) / 250;
        const opacity = Math.max(0.4, Math.min(1, (rotatedZ + 20) / 200));

        ctx.save();
        ctx.translate(centerX + rotatedX, centerY + rotatedY);
        // size
        ctx.scale(scale * 0.8, scale * 0.8);
        ctx.globalAlpha = opacity;

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(iconCanvasesRef.current[index], -25, -25, 50, 50);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation]);

  return (
    <canvas
      ref={canvasRef}
      width={1500}
      height={770}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg"
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  );
}

