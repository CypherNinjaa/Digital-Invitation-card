import { useRef, useEffect, useCallback } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  shape: 'rose' | 'gold';
}

const COLORS = [
  '#e2b4b1',    // sage (rose pink)
  '#f7dcda',    // sage-light
  '#ba7a76',    // sage-dark (deeper pink)
  '#d4af37',    // gold
  '#e8ce73',    // gold-light
];

/**
 * Falling rose petals canvas animation.
 * Creates a fixed overlay canvas with animated falling petals
 * in rose pink and gold colors, creating a romantic atmosphere.
 */
export default function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);

  const createPetal = useCallback((): Petal => {
    const canvas = canvasRef.current;
    const w = canvas?.width || window.innerWidth;
    return {
      x: Math.random() * w,
      y: -20,
      size: 4 + Math.random() * 8,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.4 + Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.3 ? 'rose' : 'gold',
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize petals
    for (let i = 0; i < 25; i++) {
      const petal = createPetal();
      petal.y = Math.random() * canvas.height;
      petalsRef.current.push(petal);
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;
      ctx.fillStyle = petal.color;

      if (petal.shape === 'rose') {
        // Petal shape (ellipse)
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Gold leaf (smaller circle)
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size * 0.4, petal.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal, index) => {
        // Update position
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        // Recycle petals that fall off screen
        if (petal.y > canvas.height + 20) {
          petalsRef.current[index] = createPetal();
        }

        drawPetal(ctx, petal);
      });

      // Occasionally add new petals
      if (petalsRef.current.length < 35 && Math.random() > 0.95) {
        petalsRef.current.push(createPetal());
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [createPetal]);

  return (
    <canvas
      ref={canvasRef}
      id="petals-canvas"
      className="active"
    />
  );
}
