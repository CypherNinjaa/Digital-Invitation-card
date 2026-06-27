import { useEffect, useRef } from 'react';
import { STORY_PHOTOS } from '../constants/weddingData';

/**
 * Our Story section with polaroid cards that stack on top of each other
 * during scroll. Recreated with the exact scroll algorithm, brightness filters,
 * and inline styles from the live site's bundle.
 */
export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardAngles = [-2.5, 1.8, -1.5, 2.2];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.story-card-wrapper');

    const handleScroll = () => {
      cards.forEach((card, index) => {
        const el = card as HTMLElement;
        const rotateVal = cardAngles[index] || 0;

        if (index < cards.length - 1) {
          const nextCard = cards[index + 1] as HTMLElement;
          const nextTop = nextCard.getBoundingClientRect().top;
          const threshold = window.innerHeight * 0.22;

          if (nextTop <= threshold) {
            // Next card is fully stacked over this one
            el.style.transform = `scale(0.92) rotate(${rotateVal}deg)`;
            el.style.filter = 'brightness(0.5)';
            el.style.opacity = '1';
          } else if (nextTop < window.innerHeight) {
            // Transitioning state
            const diff = nextTop - threshold;
            const range = window.innerHeight - threshold;
            const progress = Math.max(0, Math.min(1, 1 - diff / range));
            const scale = 1 - 0.08 * progress;
            const brightness = 1 - 0.5 * progress;

            el.style.transform = `scale(${scale}) rotate(${rotateVal}deg)`;
            el.style.filter = `brightness(${brightness})`;
            el.style.opacity = '1';
          } else {
            // Next card hasn't reached the viewport stack trigger yet
            el.style.transform = `scale(1) rotate(${rotateVal}deg)`;
            el.style.filter = 'brightness(1)';
            el.style.opacity = '1';
          }
        } else {
          // Last card always stays at full size and brightness
          el.style.transform = `scale(1) rotate(${rotateVal}deg)`;
          el.style.filter = 'brightness(1)';
        }
      });
    };

    // Initialize positions
    cards.forEach((card, index) => {
      const el = card as HTMLElement;
      el.style.transform = `scale(1) rotate(${cardAngles[index] || 0}deg)`;
      el.style.filter = 'brightness(1)';
      el.style.opacity = '1';
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{ background: 'var(--cream)' }}>
      {/* Sticky Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '2vh 1rem 2vh',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'linear-gradient(var(--cream) 80%, transparent)',
        }}
      >
        <span
          className="scratch-title-sub"
          style={{ color: '#c9a270', display: 'block' }}
        >
          Our Story
        </span>
        <h2
          className="scratch-title"
          style={{ fontSize: '4.5rem', marginBottom: 0 }}
        >
          Forever Us
        </h2>
      </div>

      <div
        className="story-stack-container"
        ref={containerRef}
        style={{ paddingBottom: '5vh' }}
      >
        {STORY_PHOTOS.map((photo, index) => (
          <div
            className="story-card-wrapper"
            key={index}
            style={{ zIndex: index + 1 }}
          >
            <div className="story-polaroid">
              <img
                src={photo.src}
                alt={photo.cap}
                loading="lazy"
                decoding="async"
              />
              <div className="story-polaroid-caption">{photo.cap}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
