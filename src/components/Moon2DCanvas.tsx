import React, { useRef, useEffect } from 'react';
import fullMoonPhoto from '../assets/images/full_moon_photo_1790147195704.jpg';

interface Moon2DCanvasProps {
  cycleDay: number; // 0 to 29.53
  size?: number; // pixel width & height
  showFeatureLabels?: boolean;
}

export const Moon2DCanvas: React.FC<Moon2DCanvasProps> = ({
  cycleDay,
  size = 240,
  showFeatureLabels = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const moonImageRef = useRef<HTMLImageElement | null>(null);

  // Preload real moon image
  useEffect(() => {
    const img = new Image();
    img.src = fullMoonPhoto;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      moonImageRef.current = img;
      renderCanvas();
    };
  }, []);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = size;
    const height = size;
    const radius = size * 0.46;
    const centerX = width / 2;
    const centerY = height / 2;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Calculate normalized phase angle: 0 (New Moon) to 2PI
    const phaseFraction = (cycleDay % 29.53059) / 29.53059;
    const phaseAngle = phaseFraction * 2 * Math.PI;

    // 1. Draw outer space glow around the moon
    const spaceGlow = ctx.createRadialGradient(
      centerX, centerY, radius * 0.8,
      centerX, centerY, radius * 1.25
    );
    const illumination = (1 - Math.cos(phaseAngle)) / 2;
    spaceGlow.addColorStop(0, `rgba(210, 230, 255, ${0.12 * illumination})`);
    spaceGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = spaceGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Moon Base (Clipped to circular disc)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // Fill background with dark lunar surface in case image is loading
    ctx.fillStyle = '#1c1e24';
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    if (moonImageRef.current && moonImageRef.current.complete) {
      // Draw high resolution authentic moon photo
      ctx.drawImage(
        moonImageRef.current,
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );
    } else {
      // Procedural craters fallback
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(centerX - radius * 0.3, centerY - radius * 0.2, radius * 0.28, 0, Math.PI * 2);
      ctx.arc(centerX + radius * 0.2, centerY + radius * 0.1, radius * 0.22, 0, Math.PI * 2);
      ctx.arc(centerX - radius * 0.1, centerY + radius * 0.35, radius * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Dynamic Terminator Shadow Mask
    // We draw the shadow overlay using composite operations
    // Waxing: Right side lit, left side enters/leaves shadow
    // Waning: Left side lit, right side enters/leaves shadow
    const isWaxing = phaseFraction <= 0.5;

    // Generate shadow mask path
    ctx.save();
    ctx.beginPath();

    if (isWaxing) {
      // Left side is always in shadow for waxing
      ctx.arc(centerX, centerY, radius, Math.PI * 0.5, Math.PI * 1.5, false);

      // The terminator connects top (PI * 1.5) to bottom (PI * 0.5)
      // Horizontal scale of the ellipse terminator:
      // at phase = 0 (New Moon): cos = 1 -> bulge right to +R (entire disc covered)
      // at phase = 0.25 (Half): cos = 0 -> straight line down center
      // at phase = 0.5 (Full): cos = -1 -> bulge left to -R (no shadow)
      const termX = Math.cos(phaseAngle);
      ctx.ellipse(
        centerX,
        centerY,
        Math.abs(termX) * radius,
        radius,
        0,
        Math.PI * 1.5,
        Math.PI * 0.5,
        termX < 0 // counterclockwise when waxing gibbous
      );
    } else {
      // Right side is in shadow for waning
      ctx.arc(centerX, centerY, radius, Math.PI * 1.5, Math.PI * 0.5, false);

      // Terminator connects bottom (PI * 0.5) to top (PI * 1.5)
      const termX = Math.cos(phaseAngle);
      ctx.ellipse(
        centerX,
        centerY,
        Math.abs(termX) * radius,
        radius,
        0,
        Math.PI * 0.5,
        Math.PI * 1.5,
        termX > 0 // counterclockwise when waning gibbous
      );
    }

    ctx.closePath();

    // Fill the shadowed area with realistic night sky & subtle Earthshine
    // Earthshine is faint reflection from Earth onto dark side of moon
    ctx.fillStyle = 'rgba(7, 10, 19, 0.94)';
    ctx.fill();

    // Soft gradient along terminator for natural diffusion
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.stroke();

    ctx.restore(); // end shadow mask

    // 4. Subtle atmospheric / limb rim highlighting on the lit edge
    const rimGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.94,
      centerX, centerY, radius
    );
    rimGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    rimGradient.addColorStop(1, `rgba(255, 255, 255, ${0.15 * illumination})`);
    ctx.fillStyle = rimGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // 5. Optional Educational Feature Labels
    if (showFeatureLabels && illumination > 0.3) {
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 4;

      // Sea of Tranquility (શાંતિનો સમુદ્ર - જ્યાં માનવી પહેલીવાર ઉતર્યો)
      ctx.fillText('શાંતિનો સમુદ્ર 📍', centerX + radius * 0.05, centerY - radius * 0.08);

      // Tycho crater with bright rays (ટાઈકો ક્રેટર)
      if (illumination > 0.7) {
        ctx.fillText('ટાઈકો ખાડો 💥', centerX - radius * 0.15, centerY + radius * 0.7);
      }
    }

    ctx.restore(); // end clip

    // 6. Outer subtle ring border for clarity in dark space
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  };

  useEffect(() => {
    renderCanvas();
  }, [cycleDay, size, showFeatureLabels]);

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="drop-shadow-2xl rounded-full"
      />
    </div>
  );
};
