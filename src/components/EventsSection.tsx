import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENTS } from '../constants/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface EventBlockProps {
  event: typeof EVENTS[0];
}

/**
 * Individual event block with scroll-trigger animation,
 * details card, dress code colors, and get directions button.
 * Recreated to match the live site's layout, classes, and interactions.
 */
function EventBlock({ event }: EventBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (blockRef.current) {
        gsap.from(blockRef.current, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top 85%',
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="event-block" ref={blockRef}>
      {/* Event Invitation Frame */}
      <div className="event-invite-frame">
        <img
          className="event-invite-bg"
          src={event.bg}
          alt=""
          loading="lazy"
        />
        <div className="event-invite-overlay">
          <div className="event-invite-stack">
            <h3 className={`event-invite-title ${event.dark ? 'dark-text' : ''}`}>
              {event.title}
            </h3>
            <div className={`event-date-row ${event.dark ? 'dark-text' : ''}`}>
              <span>{event.date.day}</span>
              <span className="event-date-bar">|</span>
              <span className="event-date-num">{event.date.num}</span>
              <span className="event-date-bar">|</span>
              <span>{event.date.monthYear}</span>
            </div>
            <div className={`event-invite-time ${event.dark ? 'dark-text' : ''}`}>
              {event.time}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Card */}
      <div className="evt-details">
        <p className="evt-tagline">"{event.tagline}"</p>

        {event.dresscode && (
          <div className="evt-dresscode">
            <span className="evt-dresscode-lbl">Dress code</span>
            <div className="evt-dresscode-dots">
              {event.dresscode.colors.map((color, i) => (
                <span
                  key={i}
                  className="evt-dresscode-dot"
                  style={{ background: color }}
                />
              ))}
            </div>
            <span className="evt-dresscode-names">{event.dresscode.names}</span>
            <span className="evt-dresscode-note">{event.dresscode.note}</span>
          </div>
        )}

        <span className="evt-venue-name">{event.venue}</span>

        <button
          className="evt-dir-btn"
          onClick={() => window.open(event.mapUrl, '_blank')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          GET DIRECTIONS
        </button>
      </div>
    </div>
  );
}

/**
 * Festivities section holding all wedding event blocks.
 */
export default function EventsSection() {
  return (
    <section id="events-section">
      <span
        className="scratch-title-sub"
        style={{ color: '#c9a270', letterSpacing: '0.3em', textTransform: 'uppercase' }}
      >
        THE CELEBRATIONS UNFOLD
      </span>
      <h2
        className="scratch-title"
        style={{ fontSize: '4.5rem', marginBottom: '0' }}
      >
        Festivities
      </h2>

      <div className="events-grid" style={{ marginTop: '3.5rem' }}>
        {EVENTS.map(event => (
          <EventBlock key={event.title} event={event} />
        ))}
      </div>
    </section>
  );
}
