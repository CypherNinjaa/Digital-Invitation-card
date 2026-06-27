import { useCountdown } from '../hooks/useCountdown';
import { WEDDING_DATE, COUNTDOWN_QUOTE, COUNTDOWN_TITLE } from '../constants/weddingData';

/**
 * Countdown timer section showing days, hours, minutes, seconds.
 * Recreated with exact inline styles and array mapping structure from the live site's bundle.
 */
export default function CountdownSection() {
  const timeLeft = useCountdown(WEDDING_DATE);

  const pad = (n: number) => String(n).padStart(2, '0');

  const dateStr = '07 · 01 · 2026';

  const units = [
    { val: pad(timeLeft.days), lbl: 'DAYS' },
    { val: pad(timeLeft.hours), lbl: 'HOURS' },
    { val: pad(timeLeft.minutes), lbl: 'MINS' }, // note: timeLeft has minutes/seconds but mapping uses MINS/SECS labels
    { val: pad(timeLeft.seconds), lbl: 'SECS' },
  ];

  return (
    <section id="countdown-section">
      <div className="cd-card">
        <p className="cd-quote">{COUNTDOWN_QUOTE}</p>
        <span
          className="cd-script"
          style={{ fontSize: '3rem', margin: '1rem 0' }}
        >
          {COUNTDOWN_TITLE}
        </span>
        <span
          className="cd-date"
          style={{ marginBottom: '2rem' }}
        >
          {dateStr}
        </span>

        <div className="cd-grid">
          {units.map(unit => (
            <div className="cd-unit" key={unit.lbl}>
              <span className="cd-num">{unit.val}</span>
              <span
                className="cd-lbl"
                style={{ fontSize: '0.65rem' }}
              >
                {unit.lbl}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
