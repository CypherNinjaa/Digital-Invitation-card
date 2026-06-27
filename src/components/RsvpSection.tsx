import { useState, useEffect, useCallback } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import confetti from 'canvas-confetti';

interface EventCheckboxProps {
  label: string;
  sublabel: string;
  checked: boolean;
  onChange: () => void;
}

/**
 * Custom checkbox component for events selection.
 * Styled exactly like the live site's t_ component.
 */
function EventCheckbox({ label, sublabel, checked, onChange }: EventCheckboxProps) {
  return (
    <label
      onClick={onChange}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem',
        border: `1px solid ${checked ? '#8a4f4c' : '#e2d7c8'}`,
        borderRadius: '0.8rem',
        cursor: 'pointer',
        background: checked ? 'rgba(138, 79, 76, 0.03)' : 'transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div>
        <span
          style={{
            display: 'block',
            color: checked ? '#8a4f4c' : '#2c1e16',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            transition: 'color 0.3s',
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              display: 'block',
              color: '#a08070',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              marginTop: '0.35rem',
              textTransform: 'uppercase',
            }}
          >
            {sublabel}
          </span>
        )}
      </div>

      <div
        style={{
          width: '1.5rem',
          height: '1.5rem',
          border: `2px solid ${checked ? '#8a4f4c' : '#dcd1c4'}`,
          borderRadius: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: checked ? '#8a4f4c' : 'transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {checked && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L4.5 8.5L13 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </label>
  );
}

interface iTunesResult {
  trackName: string;
  artistName: string;
  artworkUrl60?: string;
}

/**
 * RSVP component recreating the complete forms,
 * events multiselect, iTunes song query suggestions,
 * yay sound playback, and confetti animation.
 */
export default function RsvpSection() {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [songSearch, setSongSearch] = useState('');
  const [songResults, setSongResults] = useState<iTunesResult[]>([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(
    new Set(['Sangeet Night', 'After Party', 'Carnival', 'Shera Bandi', 'Reception', 'Phere'])
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Debounced iTunes API search for song autocomplete
  useEffect(() => {
    if (!songSearch || songSearch.length < 2) {
      setSongResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setIsLoadingSongs(true);
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(songSearch)}&entity=song&limit=6`)
        .then(res => res.json())
        .then(data => {
          setSongResults(data.results || []);
          setIsDropdownOpen(true);
          setIsLoadingSongs(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingSongs(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [songSearch]);

  const handleEventChange = useCallback((eventName: string) => {
    setSelectedEvents(prev => {
      const next = new Set(prev);
      if (next.has(eventName)) {
        next.delete(eventName);
      } else {
        next.add(eventName);
      }
      return next;
    });
  }, []);

  const handleSelectSong = useCallback((track: string, artist: string) => {
    setSongSearch(`${track} - ${artist}`);
    setIsDropdownOpen(false);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Play success audio
      const audio = new Audio('https://invifest-demo.vercel.app/assets/kids-saying-yay-sound-effect.mp3');
      audio.volume = 0.6;
      audio.play().catch(err => console.log('Audio blocked:', err));

      // Trigger confetti animation for 3 seconds
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#c9a270', '#8a4f4c', '#ffffff'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#c9a270', '#8a4f4c', '#ffffff'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 1500);
  }, []);

  if (isSuccess) {
    return (
      <section
        id="rsvp-section"
        style={{
          padding: '8rem 1.5rem',
          background: 'var(--cream)',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#8a4f4c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <svg
            width="40"
            height="30"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L4.5 8.5L13 1"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 20,
                strokeDashoffset: 0,
                animation: 'drawCheck 0.5s ease 0.3s backwards',
              }}
            />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.5rem',
            color: '#8a4f4c',
            marginBottom: '1rem',
            animation: 'fadeInUp 0.6s ease 0.2s backwards',
          }}
        >
          Thank You!
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#4a3d36',
            fontSize: '1.2rem',
            maxWidth: '400px',
            margin: '0 auto',
            lineHeight: 1.6,
            animation: 'fadeInUp 0.6s ease 0.4s backwards',
          }}
        >
          Your RSVP has been beautifully received. We can't wait to celebrate with you!
        </p>
      </section>
    );
  }

  return (
    <section id="rsvp-section" style={{ padding: '5rem 1.5rem', background: 'var(--cream)', textAlign: 'center' }}>
      <span
        className="scratch-title-sub"
        style={{ color: '#c9a270', letterSpacing: '0.3em', textTransform: 'uppercase' }}
      >
        Join the Celebration
      </span>
      <h2 className="scratch-title" style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>
        RSVP
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          color: '#4a3d36',
          fontSize: '1.1rem',
          maxWidth: '400px',
          margin: '0 auto 3rem',
          lineHeight: 1.6,
        }}
      >
        Kindly let us know if you can make it — your presence will make this celebration whole.
      </p>

      <form onSubmit={handleSubmit} className="rsvp-form" style={{ maxWidth: '460px', margin: '0 auto', textAlign: 'left' }}>
        {/* Your Details */}
        <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            Your details
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a4f4c', marginBottom: '0.5rem', fontWeight: 600 }}>
              Your name
            </label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem 0',
                border: 'none',
                borderBottom: '1px solid #dcd1c4',
                background: 'transparent',
                fontSize: '1.1rem',
                color: '#333',
                outline: 'none',
                fontFamily: 'var(--font-serif)',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#8a4f4c', marginBottom: '0.5rem', fontWeight: 600 }}>
              Phone number
            </label>
            <div className="custom-phone-input">
              <PhoneInput
                international
                defaultCountry="IN"
                value={phone}
                onChange={val => setPhone(val || '')}
                placeholder="+91 00000 00000"
                style={{ fontFamily: 'var(--font-serif)' }}
              />
            </div>
          </div>
        </div>

        {/* Attending Radio Options */}
        <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            Will you join us?
          </p>

          <label
            onClick={() => setAttending('yes')}
            className="btn-micro"
            style={{
              display: 'block',
              background: attending === 'yes' ? '#8a4f4c' : '#ffffff',
              color: attending === 'yes' ? 'white' : '#8a4f4c',
              border: '1px solid #8a4f4c',
              borderRadius: '2rem',
              padding: '1rem',
              textAlign: 'center',
              marginBottom: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <input
              type="radio"
              name="attending"
              value="yes"
              style={{ display: 'none' }}
              checked={attending === 'yes'}
              readOnly
            />
            Joyfully accept 🎉
          </label>

          <label
            onClick={() => setAttending('no')}
            className="btn-micro"
            style={{
              display: 'block',
              background: attending === 'no' ? '#8a4f4c' : '#ffffff',
              color: attending === 'no' ? 'white' : '#8a4f4c',
              border: `1px solid ${attending === 'no' ? '#8a4f4c' : '#e2d7c8'}`,
              borderRadius: '2rem',
              padding: '1rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <input
              type="radio"
              name="attending"
              value="no"
              style={{ display: 'none' }}
              checked={attending === 'no'}
              readOnly
            />
            Regrettably decline
          </label>
        </div>

        {/* Dynamic section if attending */}
        {attending === 'yes' && (
          <>
            {/* Party Size */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left', animation: 'fadeIn 0.5s ease forwards' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                Party size
              </p>
              <select
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #dcd1c4',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  fontSize: '1.1rem',
                  color: '#333',
                  outline: 'none',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                <option value="1">1 (Just me)</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
              </select>
            </div>

            {/* Events selection */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left', animation: 'fadeIn 0.5s ease forwards' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                Events you'll attend
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Sangeet Night', date: 'JUNE 30 · 7:00 PM' },
                  { name: 'After Party', date: 'JUNE 30 · 11:00 PM' },
                  { name: 'Carnival', date: 'JULY 01 · 11:00 AM' },
                  { name: 'Shera Bandi', date: 'JULY 01 · 6:00 PM' },
                  { name: 'Reception', date: 'JULY 01 · 7:00 PM' },
                  { name: 'Phere', date: 'JULY 01 · 9:00 PM' },
                ].map(evt => (
                  <EventCheckbox
                    key={evt.name}
                    label={evt.name}
                    sublabel={evt.date}
                    checked={selectedEvents.has(evt.name)}
                    onChange={() => handleEventChange(evt.name)}
                  />
                ))}
              </div>
            </div>

            {/* iTunes Song Autocomplete */}
            <div
              className="evt-details"
              style={{
                marginBottom: '1.5rem',
                padding: '2rem',
                textAlign: 'left',
                animation: 'fadeIn 0.5s ease forwards',
                position: 'relative',
                zIndex: 20,
              }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                A song for the dance floor
              </p>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={songSearch}
                  onChange={e => {
                    setSongSearch(e.target.value);
                    if (e.target.value === '') setIsDropdownOpen(false);
                  }}
                  onFocus={() => songResults.length > 0 && setIsDropdownOpen(true)}
                  placeholder="e.g. Kala Chashma"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0',
                    border: 'none',
                    borderBottom: '1px solid #dcd1c4',
                    background: 'transparent',
                    fontSize: '1.1rem',
                    color: '#333',
                    outline: 'none',
                    fontFamily: 'var(--font-serif)',
                  }}
                />
                {isLoadingSongs && (
                  <div style={{ position: 'absolute', right: 0, top: '0.5rem' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #e2d7c8',
                        borderTop: '2px solid #8a4f4c',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  </div>
                )}
              </div>

              {isDropdownOpen && songResults.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    marginTop: '0.5rem',
                    border: '1px solid #e2d7c8',
                    overflow: 'hidden',
                  }}
                >
                  {songResults.map((song, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectSong(song.trackName, song.artistName)}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fcf8f2')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                      style={{
                        padding: '1rem',
                        borderBottom: i < songResults.length - 1 ? '1px solid #f5ebd9' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'background 0.2s',
                      }}
                    >
                      {song.artworkUrl60 && (
                        <img
                          src={song.artworkUrl60}
                          alt=""
                          style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                        />
                      )}
                      <div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#333', fontSize: '0.95rem' }}>
                          {song.trackName}
                        </div>
                        <div style={{ fontFamily: 'var(--font-sans)', color: '#888', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                          {song.artistName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dietary preferences */}
            <div className="evt-details" style={{ marginBottom: '1.5rem', padding: '2rem', textAlign: 'left', animation: 'fadeIn 0.5s ease forwards' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                🍽️ Dietary preferences
              </p>
              <select
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #dcd1c4',
                  borderRadius: '0.8rem',
                  background: 'transparent',
                  fontSize: '1.1rem',
                  color: '#333',
                  outline: 'none',
                  fontFamily: 'var(--font-serif)',
                  cursor: 'pointer',
                }}
              >
                <option value="none">No specific preferences</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="jain">Jain Food</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marriage Advice */}
            <div className="evt-details" style={{ marginBottom: '2.5rem', padding: '2rem', textAlign: 'left', animation: 'fadeIn 0.5s ease forwards' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#8a4f4c', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                Marriage advice for us
              </p>
              <textarea
                placeholder="Share something sweet, funny, or wise..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '1rem',
                  border: '1px solid #dcd1c4',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  fontSize: '1.1rem',
                  color: '#333',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'var(--font-serif)',
                }}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn-micro"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '1.2rem',
            background: '#8a4f4c',
            color: 'white',
            border: 'none',
            borderRadius: '2rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: isSubmitting ? 'wait' : 'pointer',
            boxShadow: '0 4px 15px rgba(138, 79, 76, 0.3)',
            transition: 'all 0.3s',
            opacity: isSubmitting ? 0.8 : 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {isSubmitting ? (
            <>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              Sending...
            </>
          ) : (
            'Send RSVP'
          )}
        </button>
      </form>
    </section>
  );
}
