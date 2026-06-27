import { useState, useCallback, lazy, Suspense } from 'react';
import EntryGate from './components/EntryGate';
import HeroSection from './components/HeroSection';
import ScratchSection from './components/ScratchSection';
import PetalsCanvas from './components/PetalsCanvas';
import AudioButton from './components/AudioButton';
import FloatingCTA from './components/FloatingCTA';

// Lazy-loaded sections (revealed after scratch cards)
const CountdownSection = lazy(() => import('./components/CountdownSection'));
const StorySection = lazy(() => import('./components/StorySection'));
const VenueSection = lazy(() => import('./components/VenueSection'));
const EventsSection = lazy(() => import('./components/EventsSection'));
const RsvpSection = lazy(() => import('./components/RsvpSection'));
const FooterSection = lazy(() => import('./components/FooterSection'));

/**
 * Main application component.
 *
 * Flow:
 * 1. Entry Gate (envelope) → user clicks to enter
 * 2. Main content fades in (hero section visible)
 * 3. Scratch cards section - user scratches to reveal wedding date
 * 4. Once all scratched, remaining sections load (countdown, story, venue, events, RSVP, footer)
 * 5. Floating elements (petals, audio button, WhatsApp CTA) visible throughout
 */
export default function App() {
  const [showGate, setShowGate] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [sectionsUnlocked, setSectionsUnlocked] = useState(false);

  const handleEnter = useCallback(() => {
    // Hide the entry gate
    setShowGate(false);
    // Lock body scroll during transition
    document.body.classList.add('no-scroll');

    // Reveal main content with fade-in
    setTimeout(() => {
      setContentVisible(true);
      document.body.classList.remove('no-scroll');
    }, 500);
  }, []);

  const handleAllScratchRevealed = useCallback(() => {
    setSectionsUnlocked(true);
  }, []);

  return (
    <>
      {/* Entry Gate Overlay */}
      {showGate && <EntryGate onEnter={handleEnter} />}

      {/* Rose Petals Animation */}
      {contentVisible && <PetalsCanvas />}

      {/* Main Content */}
      <div id="main-content" className={contentVisible ? 'visible' : ''}>
        <HeroSection />
        <ScratchSection onAllRevealed={handleAllScratchRevealed} />

        {/* Sections unlocked after scratching all cards */}
        {sectionsUnlocked && (
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <div className="locked-content unlocked">
              <CountdownSection />
              <StorySection />
              <VenueSection />
              <EventsSection />
              <RsvpSection />
              <FooterSection />
            </div>
          </Suspense>
        )}
      </div>

      {/* Floating Elements */}
      {contentVisible && (
        <>
          <AudioButton />
          <FloatingCTA />
        </>
      )}
    </>
  );
}
