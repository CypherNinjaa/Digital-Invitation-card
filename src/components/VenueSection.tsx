import { VENUE } from '../constants/weddingData';

/**
 * Venue section showing the wedding location with a decorative card.
 * Includes venue name, address with line breaks, and a "View on Maps" button.
 */
export default function VenueSection() {
  return (
    <section id="venue-section">
      <span className="sec-label">Where</span>
      <h2 className="sec-heading">The Venue</h2>

      <div className="venue-card">
        <div
          className="venue-img-wrap"
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '2.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={VENUE.imageUrl}
            alt="Venue"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            decoding="async"
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(138, 79, 76, 0.4), transparent)',
            }}
          />
        </div>

        <div className="venue-info">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>✦</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: 'var(--sage-deep)',
              marginBottom: '0.8rem',
              lineHeight: 1.3,
              fontWeight: 400,
            }}
          >
            Rajalakshmi Kalyana
            <br />
            Mandapam
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: '#a08070',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '1.8rem',
            }}
          >
            {VENUE.address1}
            <br />
            {VENUE.address2}
            <br />
            {VENUE.address3}
          </p>

          <button
            className="venue-btn"
            style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => window.open(VENUE.mapUrl, '_blank')}
          >
            <svg
              width="18"
              height="18"
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
            VIEW ON MAPS
          </button>
        </div>
      </div>
    </section>
  );
}
