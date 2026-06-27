import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Volume/speaker SVG icons for the audio control button
 */
const VolumeOnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const VolumeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

/**
 * Floating audio control button (bottom-right).
 * Controls and syncs with the existing #bg-music audio player in the DOM.
 */
export default function AudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Find the existing audio element on mount
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      audioElRef.current = audio;
      setIsPlaying(!audio.paused);

      // Event listeners to keep button UI in sync with actual audio playback state
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.log('Audio playback blocked:', err));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <button id="audio-btn" onClick={toggleAudio} aria-label="Toggle music">
      {isPlaying ? <VolumeOnIcon /> : <VolumeOffIcon />}
    </button>
  );
}
