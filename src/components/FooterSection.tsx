import { FOOTER, INSTAGRAM_URL } from '../constants/weddingData';

/**
 * Footer section with closing message, regards, couple names,
 * Instagram DM button, and site credit.
 * Recreated with exact inline styles from the live site's bundle.
 */
export default function FooterSection() {
  return (
    <footer
      id="footer-section"
      style={{
        background: '#8a4f4c',
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        className="footer-msg"
        style={{
          color: '#f5ecd4',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '1.25rem',
          lineHeight: 1.6,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <span>
          {FOOTER.messageLine1}
          <br />
          <br />
        </span>
        <span>{FOOTER.messageLine2}</span>
      </div>

      <div style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <span
          style={{
            display: 'block',
            color: '#d4af37',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {FOOTER.regards}
        </span>
        <span
          style={{
            display: 'block',
            color: '#d4af37',
            fontFamily: 'var(--font-display)',
            fontSize: '4.5rem',
            lineHeight: 1.1,
            margin: '1.5rem 0',
          }}
        >
          {FOOTER.names}
        </span>
        <button
          className="intro-btn"
          onClick={() => window.open(INSTAGRAM_URL, '_blank')}
        >
          TO BUY, SIMPLY SEND US A DM
        </button>
      </div>

      <div
        className="footer-credit"
        style={{
          color: '#ffffff80',
          fontSize: '0.8rem',
          borderTop: '1px solid #ffffff1a',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.25rem',
        }}
      >
        Crafted with love by{' '}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#f5ecd4', textDecoration: 'underline' }}
        >
          Invifest by Aastha
        </a>
      </div>
    </footer>
  );
}
