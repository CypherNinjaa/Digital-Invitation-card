import { COUPLE, GOD_QUOTE, INTRO_TEXT } from '../constants/weddingData';

/**
 * Hero section - the main invitation card with Ganesha icon,
 * Sanskrit shloka, invitation text, and couple names.
 * Decorative gold corner borders frame the section.
 */
export default function HeroSection() {
  const handleScrollClick = () => {
    const nextSection = document.getElementById('countdown-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero">
      {/* Decorative corner borders */}
      <div className="hero-corner">
        <span />
      </div>

      <div className="hero-card">
        {/* Ganesha icon */}
        <img
          className="hero-icon"
          src="/assets/ganesha.png"
          alt="Lord Ganesha"
          onError={(e) => {
            // Fallback SVG if image not found
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml,' + encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="60" font-size="50" text-anchor="middle" fill="#8a4f4c">🙏</text></svg>'
            );
          }}
        />

        {/* Sanskrit shloka */}
        <p className="god-quote">{GOD_QUOTE}</p>

        {/* Invitation text */}
        <p className="intro-text">{INTRO_TEXT}</p>

        {/* Bride name */}
        <span className="couple-name shimmer">{COUPLE.bride.name}</span>

        {/* Ampersand separator */}
        <div className="amp-row">
          <div className="amp-line" />
          <span className="amp">&</span>
          <div className="amp-line" />
        </div>

        {/* Groom name */}
        <span className="couple-name shimmer">{COUPLE.groom.name}</span>

        {/* Parents */}
        <p className="parent-sub">
          {COUPLE.bride.parents} {COUPLE.groom.parents}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={handleScrollClick}>
        <span>SCROLL TO SEE MAGIC</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
