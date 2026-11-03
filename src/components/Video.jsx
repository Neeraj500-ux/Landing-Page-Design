import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const videos = [
  {
    id: "1223302951",
    headline: "Turn More Clicks Into Customers",
  },
  {
    id: "1223303000",
    headline: "Build Funnels That Convert",
  },
  {
    id: "1223302814",
    headline: "Scale Your Revenue With Confidence",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <div
      className={`video-reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function VideoCard({ video, index }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    const player = new Player(iframe);

    playerRef.current = player;

    const onPlay = () => {
      if (!cancelled) setIsPlaying(true);
    };

    const onPause = () => {
      if (!cancelled) setIsPlaying(false);
    };

    const onEnded = () => {
      if (!cancelled) setIsPlaying(false);
    };

    const onVolumeChange = ({ volume }) => {
      if (!cancelled) setIsMuted(volume === 0);
    };

    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("ended", onEnded);
    player.on("volumechange", onVolumeChange);

    const initializePlayer = async () => {
      try {
        await player.ready();
        await player.setMuted(true);

        if (!cancelled) {
          setIsMuted(true);
          setPlayerReady(true);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Vimeo initialization failed:", error);
        }
      }
    };

    initializePlayer();

    return () => {
      cancelled = true;

      player.off("play", onPlay);
      player.off("pause", onPause);
      player.off("ended", onEnded);
      player.off("volumechange", onVolumeChange);

      if (playerRef.current === player) {
        playerRef.current = null;
      }

      player.destroy().catch(() => {});
    };
  }, [video.id]);

  const togglePlay = async () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    try {
      const paused = await player.getPaused();

      if (paused) {
        await player.play();
      } else {
        await player.pause();
      }
    } catch (error) {
      console.error("Vimeo playback failed:", error);
    }
  };

  const toggleSound = async () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    try {
      const muted = await player.getMuted();
      await player.setMuted(!muted);
      setIsMuted(!muted);
    } catch (error) {
      console.error("Vimeo sound control failed:", error);
    }
  };

  return (
    <article
      className="video-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${video.id}?autoplay=0&muted=1&title=0&byline=0&portrait=0&playsinline=1&dnt=1`}
          title={video.headline}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />

        <div className="pointer-events-none absolute left-3 top-3 z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[9px] font-bold tracking-wider text-white backdrop-blur-md sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            GROWTH STORIES
          </span>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          disabled={!playerReady}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-3 left-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition hover:scale-105 hover:bg-violet-600 disabled:cursor-wait disabled:opacity-60"
        >
          {isPlaying ? (
            <Pause size={17} fill="currentColor" />
          ) : (
            <Play size={17} fill="currentColor" />
          )}
        </button>

        <button
          type="button"
          onClick={toggleSound}
          disabled={!playerReady}
          aria-label={isMuted ? "Enable video sound" : "Mute video"}
          aria-pressed={!isMuted}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-violet-600 disabled:cursor-wait disabled:opacity-60"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span>{isMuted ? "Sound Off" : "Sound On"}</span>
        </button>
      </div>
    </article>
  );
}

export default function Video() {
  return (
    <section
      id="video-stories"
      className="video-stories-section relative overflow-hidden bg-white px-4 py-16 text-slate-900 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <header>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
              Real Stories.
              <span className="mt-1 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                Real Growth. Real Results.
              </span>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {videos.map((video, index) => (
            <Reveal
              key={video.id}
              delay={120 + index * 150}
              className="h-full"
            >
              <VideoCard video={video} index={index} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .video-reveal {
          min-width: 0;
          max-width: 100%;
          animation: videoRevealEnter .85s cubic-bezier(.22,1,.36,1) both;
          animation-delay: var(--reveal-delay, 0ms);
        }

        @keyframes videoRevealEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .video-card {
          animation: videoCardEnter .65s ease-out both;
        }

        @keyframes videoCardEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 767px) {
          .video-stories-section {
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        @media (max-width: 380px) {
          .video-stories-section .video-card button span {
            font-size: 11px;
          }

          .video-stories-section .video-card button {
            gap: 6px;
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .video-reveal,
          .video-card {
            animation: none !important;
          }

          .video-stories-section *,
          .video-stories-section *::before,
          .video-stories-section *::after {
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </section>
  );
}