import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Volume2, VolumeX, Play, ArrowUpRight } from "lucide-react";

const videos = [
  {
    id: "1223302951",
    headline: "Turn More Clicks Into Customers",
    description:
      "Transform your traffic into qualified leads with landing pages designed to turn attention into action.",
    category: "CONVERSION STRATEGY",
    number: "01",
  },
  {
    id: "1223303000",
    headline: "Build Funnels That Convert",
    description:
      "Create a seamless customer journey that connects every touchpoint and helps turn visitors into customers.",
    category: "FUNNEL OPTIMIZATION",
    number: "02",
  },
  {
    id: "1223302814",
    headline: "Scale Your Revenue With Confidence",
    description:
      "Bring strategy, automation, and smarter customer experiences together to build sustainable growth.",
    category: "REVENUE GROWTH",
    number: "03",
  },
];

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
        if (!cancelled) console.error("Vimeo player initialization failed:", error);
      });

    return () => {
      cancelled = true;
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.off("ended", onEnded);
      if (playerRef.current === player) playerRef.current = null;
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
      if (isPlaying) await player.pause();
      else await player.play();
    } catch (error) {
      console.error("Unable to control Vimeo playback:", error);
    }
  };

  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
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

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold tracking-wider text-violet-600">
            {video.number}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-[9px] font-bold tracking-wider text-slate-500 sm:text-[10px]">
            {video.category}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-violet-700 sm:text-2xl">
          {video.headline}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
          {video.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-400">
            Video {video.number}
          </span>
          <button
            type="button"
            onClick={togglePlay}
            disabled={!playerReady}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-md transition hover:scale-105 hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPlaying ? (
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-4 w-1 rounded-sm bg-white" />
                <span className="h-4 w-1 rounded-sm bg-white" />
              </span>
            ) : (
              <Play size={17} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Video() {
  return (
    <section
      id="video-stories"
      className="relative overflow-hidden bg-white px-4 py-16 text-slate-900 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
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
            Discover how high-converting landing pages and complete funnel systems help businesses capture more leads, improve conversions, and grow revenue.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {videos.map((video, index) => (
            <div key={video.id} className="video-card-enter h-full" style={{ animationDelay: `${index * 120}ms` }}>
              <VideoCard video={video} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-violet-50/70 p-6 sm:mt-16 sm:p-9 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.16em] text-violet-600">YOUR NEXT GROWTH CHAPTER</span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Ready to turn your traffic into revenue?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Let&apos;s build a funnel that works harder for your business.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-yellow-200 via-yellow-300 to-amber-400 px-6 py-4 text-center text-sm font-extrabold text-purple-950 shadow-[0_5px_0_#d99a00,0_10px_24px_rgba(245,158,11,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_0_#d99a00,0_15px_28px_rgba(245,158,11,0.24)] active:translate-y-0 active:shadow-none sm:w-auto"
            >
              Yes! Let&apos;s Grow My Revenue
              <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .video-card-enter { animation: videoCardEnter 0.65s ease-out both; }
        @keyframes videoCardEnter {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .video-card-enter { animation: none; }
          .video-card-enter *, .video-card-enter *::before, .video-card-enter *::after { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}
