import { useRef, useEffect, useState, useCallback } from 'react';
import { SCRATCH_VALUES } from '../constants/weddingData';

interface ScratchCardProps {
  label: string;
  value: string;
  onComplete: () => void;
}

/**
 * Individual scratch card component.
 * Uses HTML Canvas to create a scratch-off overlay.
 * When ~50% is scratched, it auto-reveals the value.
 */
function ScratchCard({ label, value, onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isWiggling, setIsWiggling] = useState(true);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Draw scratch overlay (gold/cream gradient)
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#e8ce73');
    gradient.addColorStop(0.5, '#d4af37');
    gradient.addColorStop(1, '#e8ce73');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add shimmer text
    ctx.fillStyle = '#8a4f4c44';
    ctx.font = '12px "Tenor Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', rect.width / 2, rect.height / 2 + 4);
  }, [isRevealed]);

  const getPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw line from last position
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };

    // Check how much is scratched
    checkScratchProgress(canvas, ctx);
  }, []);

  const checkScratchProgress = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    if (transparent / total > 0.5) {
      setIsRevealed(true);
      onComplete();
    }
  }, [onComplete]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    setIsWiggling(false);
    const pos = getPosition(e);
    lastPos.current = pos;
    scratch(pos.x, pos.y);
  }, [getPosition, scratch]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  }, [getPosition, scratch]);

  const handleEnd = useCallback(() => {
    isDrawing.current = false;
  }, []);

  return (
    <div className="scratch-item">
      <span className="scratch-label">{label}</span>
      <div className={`scratch-card-wrapper ${isWiggling ? 'wiggling' : ''}`}>
        <span className="scratch-value">{value}</span>
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        )}
      </div>
    </div>
  );
}

interface ScratchSectionProps {
  onAllRevealed: () => void;
}

/**
 * Save the Date scratch card section.
 * Three scratch cards reveal MONTH, DAY, YEAR of the wedding.
 * Once all are scratched, it triggers loading remaining content.
 */
export default function ScratchSection({ onAllRevealed }: ScratchSectionProps) {
  const [, setRevealed] = useState({ month: false, day: false, year: false });
  const [hintVisible, setHintVisible] = useState(true);

  const handleCardComplete = useCallback((card: 'month' | 'day' | 'year') => {
    setRevealed(prev => {
      const next = { ...prev, [card]: true };
      if (next.month && next.day && next.year) {
        setTimeout(() => onAllRevealed(), 500);
      }
      return next;
    });
    setHintVisible(false);
  }, [onAllRevealed]);

  return (
    <section className="scratch-section" id="countdown-section">
      <span className="scratch-title-sub">THE DATE</span>
      <h2 className="scratch-title shimmer">Save the Date</h2>
      <p className="scratch-desc">Scratch below to reveal our wedding date</p>

      <div className="scratch-grid">
        <ScratchCard
          label="MONTH"
          value={SCRATCH_VALUES.month}
          onComplete={() => handleCardComplete('month')}
        />
        <ScratchCard
          label="DAY"
          value={SCRATCH_VALUES.day}
          onComplete={() => handleCardComplete('day')}
        />
        <ScratchCard
          label="YEAR"
          value={SCRATCH_VALUES.year}
          onComplete={() => handleCardComplete('year')}
        />
      </div>

      <p className={`scratch-hint ${!hintVisible ? 'hidden' : ''}`}>
        SCRATCH TO REVEAL
      </p>
    </section>
  );
}
