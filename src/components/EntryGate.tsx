import { useState, useRef } from 'react';
import gsap from 'gsap';

interface EntryGateProps {
  onEnter: () => void;
}

/**
 * Entry gate component featuring a video portal opening animation.
 * Displays a cover image envelope.
 * Clicking plays the transition video, starts background music,
 * and triggers a white flash transition using GSAP before revealing the main site.
 */
export default function EntryGate({ onEnter }: EntryGateProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggeredEnd = useRef(false);

  const handleStart = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Play background music
    const bgMusic = document.getElementById('bg-music') as HTMLAudioElement;
    if (bgMusic) {
      bgMusic.play().catch(err => console.log('Audio playback blocked:', err));
    }

    // Play transition video
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error('Video playback failed, falling back directly', err);
          handleFallback();
        });
      }
    }
  };

  const handleFallback = () => {
    if (hasTriggeredEnd.current) return;
    hasTriggeredEnd.current = true;
    onEnter();
    if (containerRef.current) {
      containerRef.current.style.display = 'none';
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || hasTriggeredEnd.current) return;

    // Trigger transition 1 second before the video ends
    if (video.duration > 0 && video.duration - video.currentTime <= 1) {
      hasTriggeredEnd.current = true;

      // Create white flash overlay
      const flash = document.createElement('div');
      flash.className = 'bright-flash';
      document.body.appendChild(flash);

      // Animate white flash in
      gsap.to(flash, {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        onComplete: () => {
          onEnter();
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          // Animate white flash out and clean up
          gsap.to(flash, {
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => flash.remove()
          });
        }
      });
    }
  };

  return (
    <div
      className="video-intro"
      ref={containerRef}
      onClick={handleStart}
      style={{ backgroundColor: '#000' }}
    >
      <video
        ref={videoRef}
        src="https://invifest-demo.vercel.app/assets/create_a_portal_video_like_thi.mp4"
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        style={{ opacity: isPlaying ? 1 : 0, transition: 'opacity 0.5s' }}
      />
      {!isPlaying && (
        <img
          src="https://i.ibb.co/Z1Fcmczq/frame-001.jpg"
          alt="Intro Cover"
          style={{
            position: 'absolute',
            inset: 0,
            width: 100 + '%',
            height: 100 + '%',
            objectFit: 'cover',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
}
