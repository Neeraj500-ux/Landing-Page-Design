import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Volume2, VolumeX, Play, Pause, ArrowUpRight } from "lucide-react";
import { Button } from "./ui";

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

/* Reveal animation matching Hero.jsx */
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
    if (!iframe) return undefined;

    let cancelled = false;
    const player = new Player(iframe);

    playerRef.current = player;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("ended", onEnded);

    player
      .ready()
      .then(() => player.setVolume(0))
      .then(() => {
        if (!cancelled) setPlayerReady(true);
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Vimeo player initialization failed:", error);
        }
      });

    return () => {
      cancelled = true;

      player.off("play", onPlay);
      player.off("pause", onPause);
      player.off("ended", onEnded);

      if (playerRef.current === player) {
        playerRef.current = null;
      }

      player.destroy().catch(() => {});
    };
  }, [video.id]);

  const toggleSound = async () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    const nextMuted = !isMuted;

    try {
      await player.setVolume(nextMuted ? 0 : 1);
      setIsMuted(nextMuted);
    } catch (error) {
      console.error("Unable to change Vimeo volume:", error);
    }
  };

  const togglePlay = async () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    try {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.play();
      }
    } catch (error) {
      console.error("Unable to control Vimeo playback:", error);
    }
  };

  return (
    <article
      className="video-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Vimeo video */}
      <div className="relative aspect-video overflow-hidden bg-slate-950">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${video.id}?autoplay=0&muted=1&title=0&byline=0&portrait=0&dnt=1`}
          title={video.headline}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />

        <div className="pointer-events-none absolute left-3 top-3 z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[9px] font-bold tracking-wider text-white backdrop-blur-md sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            GROWTH STORIES
          </span>
        </div>

        {/* Play / pause (moved here from the removed text area, same style) */}
        <button
          type="button"
          onClick={togglePlay}
          disabled={!playerReady}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-3 left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:scale-105 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
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
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
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
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <header>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-violet-700 sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
              BUILT FOR GROWTH
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
              Real Stories.
              <span className="mt-1 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                Real Growth. Real Results.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Discover how high-converting landing pages and complete funnel
              systems help businesses capture more leads, improve conversions,
              and grow revenue.
            </p>
          </header>
        </Reveal>

        {/* Video cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={120 + index * 150} className="h-full">
              <VideoCard video={video} index={index} />
            </Reveal>
          ))}
        </div>

        {/* CTA section */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-violet-50/70 p-6 sm:mt-16 sm:p-9 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-bold tracking-[0.16em] text-violet-600">
                  YOUR NEXT GROWTH CHAPTER
                </span>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Ready to turn your traffic into revenue?
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  Let&apos;s build a funnel that works harder for your business.
                </p>
              </div>

              {/* Same Button component and styling as Hero.jsx */}
              <Reveal delay={290} className="video-cta-actions-slot">
                <div className="video-cta-actions">
                  <Button className="site-cta--revenue premium-hero__button">
                    Yes! Let&apos;s Grow My Revenue
                    <ArrowUpRight
                      className="video-cta-arrow"
                      size={19}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        /* Reveal animation */
        .video-reveal {
          min-width: 0;
          max-width: 100%;
          animation: videoRevealEnter 0.85s cubic-bezier(.22, 1, .36, 1) both;
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
          animation: videoCardEnter 0.65s ease-out both;
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

        /* CTA layout */
        .video-cta-actions-slot {
          width: 100%;
          max-width: 620px;
          margin-top: 0;
        }

        .video-cta-actions {
          display: flex;
          justify-content: center;
        }

        /* Same amber-glow button design as Hero.jsx */
        .video-stories-section .premium-hero__button.premium-hero__button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          max-width: 100%;
          min-height: 58px;
          padding: 16px clamp(20px, 4vw, 34px);
          border: 1px solid #f3b01f;
          border-radius: 16px;
          color: #2e0c4d;
          background: linear-gradient(
            180deg,
            #ffee82 0%,
            #ffe04e 48%,
            #ffca30 100%
          );
          box-shadow:
            inset 0 1px 0 #fff8c4,
            inset 0 -2px 4px #f5b2144d,
            0 5px 0 0 #d18f0a,
            0 16px 28px -10px #f5b323a0;
          font-family: inherit;
          font-size: clamp(15px, 1.4vw, 17.5px);
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: -.01em;
          text-shadow: 0 1px 0 #ffffff80;
          white-space: normal;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition:
            transform .25s cubic-bezier(.22, 1, .36, 1),
            box-shadow .25s cubic-bezier(.22, 1, .36, 1),
            filter .25s cubic-bezier(.22, 1, .36, 1);
        }

        .video-stories-section .premium-hero__button.premium-hero__button::before {
          content: "";
          position: absolute;
          inset: 0 0 50% 0;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(180deg, #ffffff40, #ffffff00);
        }

        .video-stories-section .premium-hero__button.premium-hero__button:active {
          transform: translateY(4px);
          box-shadow:
            inset 0 1px 0 #fff8c4,
            inset 0 -2px 4px #f5b2144d,
            0 1px 0 0 #d18f0a,
            0 8px 16px -8px #f5b323a0;
        }

        .video-stories-section .video-cta-arrow {
          flex-shrink: 0;
          transition: transform .25s cubic-bezier(.22, 1, .36, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .video-stories-section .premium-hero__button.premium-hero__button:hover {
            transform: translateY(-3px);
            filter: brightness(1.04) saturate(1.05);
            box-shadow:
              inset 0 1px 0 #fff8c4,
              inset 0 -2px 4px #f5b2144d,
              0 8px 0 0 #d18f0a,
              0 24px 38px -12px #f5b323c0;
          }

          .video-stories-section .premium-hero__button:hover .video-cta-arrow {
            transform: translate(2px, -2px);
          }
        }

        .video-stories-section .premium-hero__button:focus-visible {
          outline: 3px solid #a98af0;
          outline-offset: 6px;
        }

        /* Match Hero.jsx mobile button sizing */
        @media (max-width: 767px) {
          .video-cta-actions-slot {
            width: 100%;
            max-width: 620px;
          }

          .video-stories-section .premium-hero__button.premium-hero__button {
            width: 100%;
            min-width: 0;
            min-height: 64px;
            padding: 18px 20px;
            border-radius: 18px;
            font-size: clamp(16.5px, 5vw, 20px);
            font-weight: 800;
            line-height: 1.3;
            letter-spacing: -.012em;
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
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}