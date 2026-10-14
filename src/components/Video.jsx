
import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  ArrowUpRight,
} from "lucide-react";

const videos = [
  {
    id: "1223302951",
    headline: "Turn More Clicks Into Customers",
    description:
      "Transform your traffic into qualified leads with landing pages designed to turn attention into action.",
    category: "CONVERSION STRATEGY",
    accent: "from-violet-500 via-fuchsia-500 to-pink-400",
    number: "01",
  },
  {
    id: "1223303000",
    headline: "Build Funnels That Convert",
    description:
      "Create a seamless customer journey that connects every touchpoint and helps turn visitors into customers.",
    category: "FUNNEL OPTIMIZATION",
    accent: "from-cyan-400 via-blue-500 to-violet-500",
    number: "02",
  },
  {
    id: "1223302814",
    headline: "Scale Your Revenue With Confidence",
    description:
      "Bring strategy, automation, and smarter customer experiences together to build sustainable growth.",
    category: "REVENUE GROWTH",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    number: "03",
  },
];

export default function Video() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const activeVideo = videos[activeIndex];

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    let cancelled = false;
    const player = new Player(iframe);

    playerRef.current = player;
    setPlayerReady(false);
    setIsPlaying(false);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("ended", onEnded);

    player
      .ready()
      .then(() => {
        if (cancelled) return;
        return player.setVolume(isMuted ? 0 : 1);
      })
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
  }, [activeIndex]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    player.setVolume(isMuted ? 0 : 1).catch((error) => {
      console.error("Unable to update Vimeo volume:", error);
    });
  }, [isMuted, playerReady]);

  const selectVideo = (index) => {
    if (index === activeIndex) return;

    setIsMuted(true);
    setActiveIndex(index);
  };

  const changeVideo = (direction) => {
    selectVideo(
      (activeIndex + direction + videos.length) % videos.length
    );
  };

  const toggleSound = async () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    const nextMuted = !isMuted;

    try {
      await player.setVolume(nextMuted ? 0 : 1);
      setIsMuted(nextMuted);
    } catch (error) {
      console.error("Unable to toggle Vimeo sound:", error);
    }
  };

  const playVideo = async () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;

    try {
      await player.play();
    } catch (error) {
      console.error("Unable to play Vimeo video:", error);
    }
  };

  return (
    <section
      id="video-stories"
      className="relative isolate overflow-hidden bg-white py-16 text-slate-900 sm:py-20 lg:py-28"
    >
      {/* Soft background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-32 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-bold tracking-[0.16em] text-violet-700 sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
            BUILT FOR GROWTH
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
            Real Stories.
            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
              Real Growth. Real Results.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg">
            Discover how high-converting landing pages and complete funnel
            systems help businesses capture more leads, improve conversions,
            and grow revenue.
          </p>
        </header>

        {/* Slider */}
        <div className="relative mx-auto max-w-5xl">
          {/* Previous arrow */}
          <button
            type="button"
            onClick={() => changeVideo(-1)}
            aria-label="Previous video"
            className="absolute left-2 top-[34%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-slate-800 shadow-lg backdrop-blur transition duration-300 hover:scale-110 hover:bg-violet-600 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 sm:-left-5 sm:h-12 sm:w-12 lg:-left-7"
          >
            <ChevronLeft size={23} />
          </button>

          {/* Active slide */}
          <article
            key={activeVideo.id}
            className="animate-[videoEnter_0.5s_ease-out_both]"
          >
            {/* Animated gradient border */}
            <div
              className={`rounded-[25px] bg-gradient-to-r ${activeVideo.accent} p-[2px] shadow-[0_20px_70px_-28px_rgba(76,29,149,0.3)] sm:rounded-[30px]`}
            >
              <div className="overflow-hidden rounded-[23px] bg-white sm:rounded-[28px]">
                {/* Landscape video */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <iframe
                    key={activeVideo.id}
                    ref={iframeRef}
                    src={`https://player.vimeo.com/video/${activeVideo.id}?autoplay=0&muted=1&title=0&byline=0&portrait=0&dnt=1`}
                    title={activeVideo.headline}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Top label */}
                  <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-5 sm:top-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[9px] font-bold tracking-[0.15em] text-white shadow-lg backdrop-blur-md sm:text-xs">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      GROWTH STORIES
                    </span>
                  </div>

                  {/* Sound control */}
                  <button
                    type="button"
                    onClick={toggleSound}
                    disabled={!playerReady}
                    aria-label={isMuted ? "Enable video sound" : "Mute video"}
                    aria-pressed={!isMuted}
                    className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60 sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    {isMuted ? (
                      <VolumeX size={17} />
                    ) : (
                      <Volume2 size={17} />
                    )}
                    <span>{isMuted ? "Sound Off" : "Sound On"}</span>
                  </button>
                </div>

                {/* Bottom content */}
                <div className="relative bg-white px-5 py-6 sm:px-8 sm:py-8 md:px-10">
                  <div
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${activeVideo.accent}`}
                  />

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="text-xs font-extrabold tracking-[0.18em] text-violet-600">
                          VIDEO {activeVideo.number}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold tracking-[0.13em] text-slate-500 sm:text-xs">
                          {activeVideo.category}
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
                        {activeVideo.headline}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {activeVideo.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={playVideo}
                      disabled={!playerReady}
                      aria-label={isPlaying ? "Video is playing" : "Play video"}
                      className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-full bg-slate-950 text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14 sm:self-center"
                    >
                      {isPlaying ? (
                        <span className="flex gap-1">
                          <span className="h-4 w-1 rounded bg-white" />
                          <span className="h-4 w-1 rounded bg-white" />
                        </span>
                      ) : (
                        <Play size={19} fill="currentColor" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Next arrow */}
          <button
            type="button"
            onClick={() => changeVideo(1)}
            aria-label="Next video"
            className="absolute right-2 top-[34%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-slate-800 shadow-lg backdrop-blur transition duration-300 hover:scale-110 hover:bg-violet-600 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-300 sm:-right-5 sm:h-12 sm:w-12 lg:-right-7"
          >
            <ChevronRight size={23} />
          </button>
        </div>

        {/* Pagination */}
        <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between px-1 sm:mt-8">
          <div className="flex items-center gap-2.5">
            {videos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                onClick={() => selectVideo(index)}
                aria-label={`Show video ${index + 1}: ${video.headline}`}
                aria-pressed={activeIndex === index}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                  activeIndex === index
                    ? "w-9 bg-violet-600"
                    : "w-2 bg-slate-300 hover:bg-violet-300"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold tracking-[0.15em] text-slate-500 sm:text-sm">
            <span className="text-slate-950">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-slate-300">/</span>
            {String(videos.length).padStart(2, "0")}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-violet-50/70 p-6 shadow-sm sm:mt-16 sm:p-9 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.18em] text-violet-600">
                YOUR NEXT GROWTH CHAPTER
              </span>

              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                Ready to turn your traffic into revenue?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Let&apos;s build a funnel that works harder for your business.
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-yellow-200 via-yellow-300 to-amber-400 px-6 py-4 text-center text-sm font-extrabold text-purple-950 shadow-[0_7px_0_#d99a00,0_12px_25px_rgba(245,158,11,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_9px_0_#d99a00,0_18px_30px_rgba(245,158,11,0.25)] active:translate-y-1 active:shadow-none sm:w-auto sm:min-w-64"
            >
              Yes! Let&apos;s Grow My Revenue
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Local animation; no CSS file required */}
      <style>{`
        @keyframes videoEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          article {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
