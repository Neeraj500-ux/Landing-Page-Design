import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Pause, Play, ScanEye, Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui'

const focusLines = Array(4).fill(
  'Guaranteed Better Funnel Performance. More Value from Every Ad Spend.'
)

const points = [
  { text: ' Communicate Your Offer Clearly.', icon: 'target', tone: 'peach' },
  { text: 'Custom Pixel Tracking To Optimize Your Ads.', icon: 'scan-eye', tone: 'purple' },
  { text: 'Make Enquiries And Bookings Simple.', icon: 'calendar', tone: 'gold' },
  { text: 'Build Credibility With Relevant Proof.', icon: 'shield', tone: 'purple' },
]

const services = [
  { text: 'Offer and audience discovery', icon: 'target' },
  { text: 'Persuasive content', icon: 'edit' },
  { text: 'Custom visual design', icon: 'layers' },
  { text: 'Responsive development', icon: 'devices' },
  { text: 'Booking integration', icon: 'calendar' },
  { text: 'Tracking and launch setup', icon: 'chart' },
  { text: 'Clear calls to action', icon: 'cursor' },
  { text: 'Mobile-first layouts', icon: 'phone' },
]

function Icon({ name, className = '' }) {
  if (name === 'scan-eye') {
    return (
      <ScanEye
        className={className}
        size={24}
        strokeWidth={1.7}
        aria-hidden="true"
        focusable="false"
      />
    )
  }

  const paths = {
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.3" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4m10-4v4M3 10h18m-13 5 2.5 2.5L16 12" />
      </>
    ),
    devices: (
      <>
        <rect x="2" y="4" width="14" height="11" rx="2" />
        <path d="M9 15v4m-4 0h8" />
        <rect x="17" y="9" width="5" height="12" rx="1.5" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
        <path d="m3 12 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
      </>
    ),
    edit: (
      <>
        <path d="m16 3 5 5-11 11-6 1 1-6L16 3Z" />
        <path d="m13 6 5 5M4 4H3v17h17v-1" />
      </>
    ),
    chart: (
      <>
        <path d="M4 3v17h17M8 15l4-5 4 2 5-7" />
        <path d="M17 5h4v4" />
      </>
    ),
    cursor: (
      <>
        <path d="m4 3 6 18 3-7 7-3L4 3Z" />
        <path d="m14 15 5 5" />
      </>
    ),
    phone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M10 5h4m-3 14h2" />
      </>
    ),
    sparkle: (
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
    ),
  }

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] || paths.sparkle}
    </svg>
  )
}

/* Reveals when scrolled into view (so below-the-fold sections animate when seen) */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`premium-hero__reveal ${seen ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Subtle mouse-only 3D tilt for the image card */
function useTilt() {
  const ref = useRef(null)

  const onPointerMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`)
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return { ref, onPointerMove, onPointerLeave }
}

/* Autoplaying muted hero video with play/pause + sound controls */
function HeroVideo({ src, poster }) {
  const videoRef = useRef(null)
  const wasPlaying = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ratio, setRatio] = useState(4 / 3)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return undefined

    v.muted = true
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) v.play().catch(() => {})

    if (typeof IntersectionObserver === 'undefined') return undefined

    /* Pause when off-screen, resume only if it was playing */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          wasPlaying.current = !v.paused
          v.pause()
        } else if (wasPlaying.current) {
          wasPlaying.current = false
          v.play().catch(() => {})
        }
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const onLoadedMetadata = (e) => {
    const { videoWidth: w, videoHeight: h } = e.currentTarget
    if (w && h) setRatio(Math.min(Math.max(w / h, 0.8), 1.78))
  }

  return (
    <>
      <figure
        className="premium-hero__image-wrap premium-hero__video-wrap"
        style={{ '--hero-video-ratio': ratio }}
      >
        <video
          ref={videoRef}
          className="premium-hero__video"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Coaching landing page preview video"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={onLoadedMetadata}
        />
      </figure>

      <div className="premium-hero__video-controls">
        <button
          type="button"
          className="premium-hero__video-btn"
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? (
            <Pause size={18} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={18} fill="currentColor" strokeWidth={0} />
          )}
        </button>

        <button
          type="button"
          className="premium-hero__video-btn"
          onClick={toggleSound}
          aria-label={muted ? 'Turn sound on' : 'Mute video'}
          aria-pressed={!muted}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </>
  )
}

function IconTile({ name, tone }) {
  return (
    <span
      className={`premium-hero__tile premium-hero__tile--${tone}`}
      aria-hidden="true"
    >
      <Icon name={name} />
    </span>
  )
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

  .premium-hero {
    --ink: #14111f;
    --ink-soft: #2a2140;
    --muted: #5b5870;
    --violet: #7c3aed;
    --violet-deep: #5b21b6;
    --indigo: #4f46e5;
    --lav-50: #f7f3ff;
    --lav-100: #efe7ff;
    --lav-200: #e0d2ff;
    --dark-1: #1b1233;
    --dark-2: #140d27;

    --hero-gutter: clamp(16px, 4vw, 36px);
    --hero-ease: cubic-bezier(.22, 1, .36, 1);
    --focus-gap: clamp(22px, 3vw, 44px);
    --service-gap: 14px;

    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    overflow-x: clip;
    padding: var(--hero-top-space, clamp(32px, 5vw, 72px)) 0 clamp(32px, 4vw, 48px);
    color: var(--ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    background:
      radial-gradient(55% 42% at 100% 0%, #efe6ff, transparent 70%),
      radial-gradient(40% 34% at 0% 8%, #f6f0ff, transparent 72%),
      radial-gradient(60% 36% at 85% 65%, #f3ecff, transparent 72%),
      #fff;
  }

  .premium-hero,
  .premium-hero *,
  .premium-hero *::before,
  .premium-hero *::after { box-sizing: border-box; }

  .premium-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image: radial-gradient(#7c3aed17 1px, transparent 1px);
    background-size: 30px 30px;
    -webkit-mask-image: linear-gradient(#000a, transparent 55%);
    mask-image: linear-gradient(#000a, transparent 55%);
  }

  /* Soft drifting color blooms (existing lavender / violet / peach tones) */
  .premium-hero__blob {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(70px);
    animation: premiumHeroDrift 16s ease-in-out infinite alternate;
  }
  .premium-hero__blob--a { top: 4%; right: -8%; width: min(46vw, 520px); aspect-ratio: 1; background: #7c3aed24; }
  .premium-hero__blob--b { top: 52%; left: -10%; width: min(40vw, 440px); aspect-ratio: 1; background: #ffeadb99; animation-delay: -6s; }

  .premium-hero .premium-hero__container {
    width: 100%;
    max-width: 1180px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: var(--hero-gutter);
  }

  .premium-hero h1,
  .premium-hero h2,
  .premium-hero p,
  .premium-hero ul,
  .premium-hero figure { margin: 0; overflow-wrap: break-word; }
  .premium-hero ul { padding: 0; list-style: none; }
  .premium-hero svg { display: block; flex-shrink: 0; }

  .premium-hero__reveal {
    min-width: 0;
    max-width: 100%;
    opacity: 0;
    transform: translateY(26px);
    transition:
      opacity .9s var(--hero-ease) var(--reveal-delay, 0ms),
      transform .9s var(--hero-ease) var(--reveal-delay, 0ms);
  }
  .premium-hero__reveal.is-in { opacity: 1; transform: none; }

  /* ---------- Stage ---------- */
  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(32px, 5vw, 48px);
    align-items: center;
  }

  .premium-hero__copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .premium-hero__pill { display: flex; justify-content: flex-start; max-width: 100%; }

  .premium-hero .premium-hero__eyebrow {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 11px;
    max-width: 100%;
    padding: 10px 20px;
    border: 1px solid var(--lav-200);
    border-radius: 999px;
    color: var(--ink-soft);
    background: linear-gradient(180deg, #f6f1ff, var(--lav-100));
    box-shadow: inset 0 1px 0 #fff, 0 10px 24px -16px #7c3aed80;
    font-size: clamp(12.5px, 1.2vw, 14px);
    font-weight: 600;
    line-height: 1.6;
    text-wrap: balance;
    transition: transform .35s var(--hero-ease), box-shadow .35s var(--hero-ease);
  }

  .premium-hero__eyebrow::before {
    content: "";
    flex: 0 0 9px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, var(--violet-deep));
    animation: premiumHeroPulse 3s ease-in-out infinite;
  }

  .premium-hero__eyebrow::after {
    content: "";
    position: absolute;
    inset: 0 auto 0 -40%;
    width: 36%;
    pointer-events: none;
    background: linear-gradient(100deg, transparent, #ffffffb3, transparent);
    transform: skewX(-20deg);
    animation: premiumHeroShine 6s ease-in-out 1.2s infinite;
  }

  .premium-hero .premium-hero__title {
    margin: clamp(20px, 2.6vw, 28px) 0 0;
    font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(34px, 4.3vw, 54px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -.035em;
    text-wrap: balance;
  }

  .premium-hero__title-lead { display: block; color: var(--ink); }

  .premium-hero__title-accent {
    display: inline;
    color: var(--violet);
    background: linear-gradient(100deg, #8b5cf6 0%, #7c3aed 30%, var(--indigo) 60%, #8b5cf6 100%);
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    animation: premiumHeroSheen 9s ease-in-out infinite alternate;
  }

  .premium-hero .premium-hero__subtitle {
    width: 100%;
    max-width: 540px;
    margin: clamp(16px, 2vw, 22px) 0 0;
    color: var(--muted);
    font-size: clamp(15.5px, 0.8vw + 12px, 18.5px);
    font-weight: 500;
    line-height: 1.7;
    letter-spacing: -.005em;
  }

  .premium-hero__focus-slot { width: 100%; min-width: 0; margin-top: clamp(24px, 3vw, 34px); }

  /* ---------- Promise bar ---------- */
  .premium-hero__promise {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--lav-200);
    border-radius: clamp(14px, 2vw, 20px);
    background: linear-gradient(110deg, #ffffffd9, #f7f2ffd9 65%, #fff4ecd9);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 #fff, 0 18px 36px -26px #5b21b68c;
    transition: box-shadow .4s var(--hero-ease), border-color .4s ease;
  }

  .premium-hero__focus-marquee {
    min-width: 0;
    overflow: hidden;
    padding-block: clamp(10px, 1.2vw, 13px);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  }

  .premium-hero__focus-track,
  .premium-hero__track {
    display: flex;
    align-items: center;
    width: max-content;
    direction: ltr;
    will-change: transform;
    animation: premiumHeroMarquee 52s linear infinite;
  }

  .premium-hero .premium-hero__focus-run {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--focus-gap);
    width: max-content;
    padding: 0 var(--focus-gap) 0 0;
  }

  .premium-hero__focus-item {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--focus-gap);
    color: var(--ink-soft);
    font-size: clamp(12.5px, 0.6vw + 10.5px, 17px);
    font-weight: 700;
    line-height: 1.4;
    white-space: nowrap;
  }

  .premium-hero__focus-item::after {
    content: "";
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: linear-gradient(135deg, #8b5cf6, #e58a5c);
    transform: rotate(45deg);
  }

  /* ---------- Image card ---------- */
  .premium-hero__media {
    position: relative;
    width: 100%;
    max-width: 600px;
    min-width: 0;
    margin-inline: auto;
  }

  .premium-hero__media::before {
    content: "";
    position: absolute;
    inset: 10% -6% -4%;
    z-index: -1;
    pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(closest-side, #7c3aed4d, transparent 75%);
    filter: blur(34px);
    animation: premiumHeroGlow 6s ease-in-out infinite alternate;
  }

  .premium-hero__card {
    position: relative;
    overflow: hidden;
    border-radius: clamp(22px, 3vw, 32px);
    background: var(--dark-1);
    box-shadow:
      0 2px 4px #14111f14,
      0 30px 60px -28px #5b21b6a6,
      0 50px 90px -50px #14111fb3;
    transform: perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px));
    transition: transform .35s ease-out, box-shadow .5s var(--hero-ease);
    will-change: transform;
  }

  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    padding: 0;
    background: var(--dark-1);
  }

  .premium-hero__image-wrap { position: relative; width: 100%; min-width: 0; overflow: hidden; }

  .premium-hero .premium-hero__image {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
    border: 0;
    transition: scale .8s var(--hero-ease);
  }

  .premium-hero__panel {
    position: relative;
    z-index: 3;
    margin-top: -1px;
    /* Equal visual gap above and below the button (+5px bottom covers the button's 3D lip) */
    --panel-gap: clamp(18px, 2.6vw, 24px);
    padding: var(--panel-gap) clamp(18px, 3.2vw, 30px) calc(var(--panel-gap) + 5px);
    background:
      radial-gradient(80% 90% at 100% 100%, #7c3aed4d, transparent 70%),
      linear-gradient(180deg, var(--dark-1), var(--dark-2));
  }

  .premium-hero__actions { display: flex; justify-content: center; }

  /* ---------- Hero video (full-bleed, no background behind it) ---------- */
  .premium-hero__video-wrap {
    aspect-ratio: var(--hero-video-ratio, 4 / 3);
    background: var(--dark-1);
  }

  .premium-hero .premium-hero__video {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    background: var(--dark-1);
    transition: scale .8s var(--hero-ease);
  }

  .premium-hero__video-controls {
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 14px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }

  .premium-hero__video-btn {
    pointer-events: auto;
    display: inline-grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid #ffffff40;
    border-radius: 50%;
    color: #fff;
    background: #14111f8c;
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow: 0 10px 20px -10px #14111fb3;
    cursor: pointer;
    transition: transform .25s var(--hero-ease), background .25s ease, border-color .25s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .premium-hero__video-btn:active { transform: scale(.93); }
  .premium-hero__video-btn:focus-visible { outline: 3px solid #a98af0; outline-offset: 3px; }

  /* ---------- Amber Glow button ---------- */
  .premium-hero .premium-hero__button.premium-hero__button {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    padding: 16px clamp(20px, 4vw, 34px);
    border: 1px solid #f3b01f;
    border-radius: 16px;
    color: #2e0c4d;
    background: linear-gradient(180deg, #ffee82 0%, #ffe04e 48%, #ffca30 100%);
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
    transition: transform .25s var(--hero-ease), box-shadow .25s var(--hero-ease), filter .25s var(--hero-ease);
  }

  .premium-hero .premium-hero__button.premium-hero__button::before {
    content: "";
    position: absolute;
    inset: 0 0 50% 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg, #ffffff40, #ffffff00);
  }

  .premium-hero .premium-hero__button.premium-hero__button::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -45%;
    width: 32%;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(100deg, transparent, #ffffff99, transparent);
    transform: skewX(-20deg);
    animation: premiumHeroShine 5.5s ease-in-out 2s infinite;
  }

  .premium-hero .premium-hero__button.premium-hero__button:active {
    transform: translateY(4px);
    box-shadow:
      inset 0 1px 0 #fff8c4,
      inset 0 -2px 4px #f5b2144d,
      0 1px 0 0 #d18f0a,
      0 8px 16px -8px #f5b323a0;
  }

  .premium-hero__button-arrow { transition: transform .25s var(--hero-ease); }

  /* ---------- Showcase ---------- */
  .premium-hero__showcase { width: 100%; margin-top: clamp(56px, 8vw, 96px); }

  .premium-hero .premium-hero__intro {
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
    color: var(--ink);
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 45px;
    letter-spacing: -0.02em;
    text-align: center;
    text-transform: none;
    text-wrap: balance;
  }

  .premium-hero__intro-accent { color: var(--violet-deep); }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: clamp(30px, 4.4vw, 48px);
    text-align: left;
  }

  .premium-hero__point {
    --card-border: #e3d3ff;
    --card-tint: #f3eaff;
    --tile-color: #7c3aed;
    --tile-base: #bc9be9;

    position: relative;
    overflow: hidden;
    min-width: 0;
    height: 100%;
    padding: 26px 24px 30px;
    border: 1px solid var(--card-border);
    border-radius: 28px;
    background:
      radial-gradient(ellipse at 100% 0%, var(--card-tint), transparent 72%),
      linear-gradient(150deg, #ffffffef, #ffffffc9);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    box-shadow:
      inset 0 1px 0 #fff,
      0 24px 38px -27px #5b21b680,
      0 5px 12px -7px #5b21b62b;
    transition: transform .4s var(--hero-ease), box-shadow .4s var(--hero-ease), border-color .4s ease;
  }

  .premium-hero__point::after {
    content: "";
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(90deg, var(--tile-color), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .5s var(--hero-ease);
  }

  .premium-hero__reveal.is-in .premium-hero__point {
    animation: premiumHeroEnter .8s var(--hero-ease) backwards;
    animation-delay: calc(var(--i, 0) * 100ms + 200ms);
  }

  .premium-hero__point--peach { --card-border: #f3d1bd; --card-tint: #ffeadb; --tile-color: #e58a5c; --tile-base: #e9b598; }
  .premium-hero__point--gold { --card-border: #efddb0; --card-tint: #fff3cd; --tile-color: #b88619; --tile-base: #dabc67; }

  .premium-hero__point-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    min-width: 0;
  }

  .premium-hero__tile {
    display: grid;
    flex: 0 0 54px;
    place-items: center;
    width: 54px;
    height: 54px;
    border: 1px solid var(--card-border);
    border-radius: 16px;
    color: var(--tile-color);
    background: linear-gradient(145deg, #fff, var(--card-tint));
    box-shadow: inset 0 1px 0 #fff, 0 5px 0 -1px var(--tile-base), 0 12px 20px -12px var(--tile-color);
  }

  .premium-hero__tile svg {
    width: 25px;
    height: 25px;
    transform-origin: center;
    transition: transform .45s var(--hero-ease);
  }

  .premium-hero__point-number {
    display: grid;
    flex: 0 0 38px;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--card-border);
    border-radius: 12px;
    color: #5b3291;
    background: #ffffffdc;
    box-shadow: inset 0 1px 0 #fff, 0 4px 10px #5b21b608;
    font-size: 15px;
    font-weight: 800;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -.025em;
  }

  .premium-hero .premium-hero__point p {
    margin-top: 24px;
    color: var(--muted);
    font-size: clamp(15px, 1.4vw, 17px);
    font-weight: 600;
    line-height: 1.65;
    text-align: left;
  }

  /* ---------- Services marquee ---------- */
  .premium-hero__carousel { width: 100%; min-width: 0; margin-top: clamp(32px, 4vw, 48px); }

  .premium-hero__marquee {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    padding-block: 18px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  }

  .premium-hero__track { animation-duration: 46s; }

  .premium-hero .premium-hero__marquee-group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--service-gap);
    width: max-content;
    padding: 0 var(--service-gap) 0 0;
  }

  .premium-hero__service {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border: 1px solid #e5d7f7;
    border-radius: 999px;
    color: var(--muted);
    background: #ffffffc9;
    box-shadow: inset 0 1px 0 #fff, 0 10px 20px -16px #5b21b680;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.5;
    white-space: nowrap;
    transition: transform .3s var(--hero-ease), border-color .3s ease, color .3s ease, box-shadow .3s ease;
  }

  .premium-hero__service-icon { color: var(--violet); }
  .premium-hero__service-icon svg { width: 19px; height: 19px; }

  .premium-hero__promise:focus-within .premium-hero__focus-track,
  .premium-hero__marquee:focus-within .premium-hero__track { animation-play-state: paused; }

  .premium-hero__focus-marquee:focus-visible,
  .premium-hero__marquee:focus-visible,
  .premium-hero .premium-hero__button:focus-visible { outline: 3px solid #a98af0; outline-offset: 6px; }

  /* ---------- Keyframes ---------- */
  @keyframes premiumHeroEnter { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes premiumHeroMarquee { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } }
  @keyframes premiumHeroPulse { 0%, 100% { box-shadow: 0 0 0 0 #7c3aed59; } 50% { box-shadow: 0 0 0 6px #7c3aed00; } }
  @keyframes premiumHeroBob { from { transform: translateY(0); } to { transform: translateY(-6px); } }
  @keyframes premiumHeroDrift { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(3%, 5%, 0) scale(1.1); } }
  @keyframes premiumHeroGlow { from { opacity: .65; } to { opacity: 1; } }
  @keyframes premiumHeroSheen { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
  @keyframes premiumHeroShine { 0%, 55% { transform: translateX(0) skewX(-20deg); } 100% { transform: translateX(520%) skewX(-20deg); } }

  /* ============ Desktop ============ */
  @media (min-width: 1024px) {
    .premium-hero__stage { grid-template-columns: minmax(0, .94fr) minmax(0, 1.06fr); gap: clamp(36px, 4vw, 60px); }
    .premium-hero__media { max-width: 600px; margin-left: auto; margin-right: 0; }
  }

  /* ============ Tablet ============ */
  @media (max-width: 1023px) {
    /* Center-aligned hero copy on tablet + mobile */
    .premium-hero__copy { align-items: center; text-align: center; }
    .premium-hero__copy > .premium-hero__reveal { width: 100%; }
    .premium-hero__pill { justify-content: center; }
    .premium-hero .premium-hero__title { text-align: center; }
    .premium-hero__title-accent { display: block; margin-top: .08em; text-wrap: balance; }
    .premium-hero .premium-hero__subtitle { max-width: 620px; margin-inline: auto; text-align: center; }
    .premium-hero .premium-hero__intro { font-size: 32px; line-height: 40px; }
    .premium-hero .premium-hero__points { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 760px; margin-inline: auto; }
    .premium-hero__media { max-width: 560px; }
  }

  /* ============ Mobile ============ */
  @media (max-width: 767px) {
    .premium-hero { --focus-gap: 20px; --service-gap: 12px; padding-top: var(--hero-top-space, 24px); }

    .premium-hero .premium-hero__eyebrow {
      gap: 8px;
      padding: 9px 14px;
      font-size: clamp(8px, calc((100vw - 76px) / 30), 13.5px);
      line-height: 1.5;
      white-space: nowrap;
      text-wrap: nowrap;
    }
    .premium-hero__eyebrow > span { display: block; min-width: 0; white-space: nowrap; }

    .premium-hero .premium-hero__title { margin-top: 20px; font-size: clamp(27px, 8vw, 44px); line-height: 1.1; letter-spacing: -.03em; text-wrap: balance; }
    .premium-hero .premium-hero__subtitle { max-width: 420px; margin-top: 16px; font-size: clamp(14.5px, 4vw, 16.5px); line-height: 1.65; text-wrap: balance; }
    .premium-hero__focus-slot { margin-top: 24px; }

    /* Promise bar: smooth scrolling carousel, tuned for phones */
    .premium-hero__promise { box-shadow: inset 0 1px 0 #fff, 0 16px 30px -22px #5b21b68c; }
    .premium-hero__focus-marquee {
      padding-block: 15px;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
    }
    .premium-hero__focus-track { animation-duration: 38s; }
    .premium-hero__focus-item { font-size: clamp(13px, 3.7vw, 15.5px); line-height: 1.4; letter-spacing: -.005em; }
    .premium-hero__focus-item::after { flex-basis: 7px; width: 7px; height: 7px; }
    .premium-hero__promise:active .premium-hero__focus-track,
    .premium-hero__marquee:active .premium-hero__track { animation-play-state: paused; }
    .premium-hero__stage { gap: 30px; }
    .premium-hero__card { box-shadow: 0 2px 4px #14111f14, 0 26px 50px -24px #5b21b6b3, 0 40px 70px -44px #14111fb3; }
    .premium-hero__promise { border-radius: 14px; }
    .premium-hero__media { max-width: 100%; }

    .premium-hero .premium-hero__button.premium-hero__button {
      min-height: 64px;
      padding: 18px 20px;
      border-radius: 18px;
      font-size: clamp(16.5px, 5vw, 20px);
      line-height: 1.3;
      letter-spacing: -.012em;
    }

    .premium-hero .premium-hero__intro { font-size: 26px; line-height: 34px; letter-spacing: -0.015em; }
    .premium-hero .premium-hero__points { gap: 14px; }
    .premium-hero__point { padding: 20px 16px 24px; border-radius: 22px; }
    .premium-hero__point::after { left: 16px; right: 16px; }
    .premium-hero__point-top { gap: 8px; }
    .premium-hero__tile { flex-basis: 46px; width: 46px; height: 46px; border-radius: 14px; }
    .premium-hero__tile svg { width: 23px; height: 23px; }
    .premium-hero__point-number { flex-basis: 32px; width: 32px; height: 32px; border-radius: 10px; font-size: 13.5px; }
    .premium-hero .premium-hero__point p { margin-top: 18px; font-size: clamp(13.5px, 3.6vw, 15px); line-height: 1.58; }
    .premium-hero__blob { filter: blur(54px); }
  }

  @media (max-width: 479px) {
    .premium-hero { --focus-gap: 16px; }
    .premium-hero .premium-hero__eyebrow { gap: 7px; padding: 9px 12px; font-size: clamp(8px, calc((100vw - 72px) / 30), 13px); }
    .premium-hero .premium-hero__points { gap: 12px; }
    .premium-hero__point { padding: 16px 14px 20px; border-radius: 20px; }
    .premium-hero__tile { flex-basis: 42px; width: 42px; height: 42px; border-radius: 13px; }
    .premium-hero__tile svg { width: 21px; height: 21px; }
    .premium-hero__point-number { flex-basis: 30px; width: 30px; height: 30px; border-radius: 9px; font-size: 13px; }
  }

  /* Very narrow phones: one card per row so text never cramps */
  @media (max-width: 389px) {
    .premium-hero .premium-hero__points { grid-template-columns: minmax(0, 1fr); }
    .premium-hero .premium-hero__point p { font-size: 14.5px; }
  }

  /* ============ Hover (mouse only) ============ */
  @media (hover: hover) and (pointer: fine) {
    .premium-hero__eyebrow:hover { transform: translateY(-2px); box-shadow: inset 0 1px 0 #fff, 0 14px 28px -14px #7c3aedb3; }
    .premium-hero__promise:hover { box-shadow: inset 0 1px 0 #fff, 0 22px 40px -24px #5b21b6b3; }

    .premium-hero__point:hover { transform: translateY(-6px); box-shadow: inset 0 1px 0 #fff, 0 32px 46px -26px #5b21b68f; }
    .premium-hero__point:hover::after { transform: scaleX(1); }
    .premium-hero__point:hover .premium-hero__tile svg { transform: rotate(-6deg) scale(1.1); }

    .premium-hero__service:hover { transform: translateY(-3px); border-color: #cdb6f6; color: var(--ink-soft); box-shadow: inset 0 1px 0 #fff, 0 14px 24px -14px #5b21b69e; }

    .premium-hero__card:hover { --lift: -6px; box-shadow: 0 2px 4px #14111f14, 0 40px 70px -28px #5b21b6c4, 0 60px 100px -50px #14111fb3; }
    .premium-hero__card:hover .premium-hero__video { scale: 1.03; }
    .premium-hero__video-btn:hover { background: var(--violet); border-color: transparent; transform: scale(1.07); }

    .premium-hero .premium-hero__button.premium-hero__button:hover {
      transform: translateY(-3px);
      filter: brightness(1.04) saturate(1.05);
      box-shadow:
        inset 0 1px 0 #fff8c4,
        inset 0 -2px 4px #f5b2144d,
        0 8px 0 0 #d18f0a,
        0 24px 38px -12px #f5b323c0;
    }
    .premium-hero__button:hover .premium-hero__button-arrow { transform: translate(2px, -2px); }

    .premium-hero__promise:hover .premium-hero__focus-track,
    .premium-hero__marquee:hover .premium-hero__track { animation-play-state: paused; }
  }

  /* ============ Reduced motion ============ */
  @media (prefers-reduced-motion: reduce) {
    .premium-hero *,
    .premium-hero *::before,
    .premium-hero *::after { animation: none !important; transition: none !important; }

    .premium-hero__reveal { opacity: 1; transform: none; }
    .premium-hero__card { transform: none; }

    .premium-hero__focus-marquee,
    .premium-hero__marquee { padding: 12px var(--hero-gutter); -webkit-mask-image: none; mask-image: none; }

    .premium-hero__focus-track,
    .premium-hero__track { width: 100%; transform: none; will-change: auto; }

    .premium-hero .premium-hero__focus-run,
    .premium-hero .premium-hero__marquee-group {
      flex: 1 1 auto;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      width: 100%;
      min-width: 0;
      padding: 0;
    }

    .premium-hero__focus-run > li:not(:first-child),
    .premium-hero__focus-track > [aria-hidden="true"],
    .premium-hero__track > [aria-hidden="true"] { display: none; }

    .premium-hero__focus-item,
    .premium-hero__service { flex: 0 1 auto; min-width: 0; max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
    .premium-hero__focus-item { text-align: center; }
    .premium-hero__focus-item::after { display: none; }
  }

  /* ===== Intro heading FINAL override (beats any global h2 / old CSS) ===== */
  section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
  section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent {
    font-family: "Bricolage Grotesque", sans-serif !important;
    font-size: 36px !important;
    font-weight: 600 !important;
    line-height: 45px !important;
    letter-spacing: -0.02em !important;
    text-transform: none !important;
  }
  @media (max-width: 1023px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent { font-size: 32px !important; line-height: 40px !important; }
  }
  @media (max-width: 767px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent { font-size: 26px !important; line-height: 34px !important; letter-spacing: -0.015em !important; }
  }
  @media (max-width: 479px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent { font-size: 23px !important; line-height: 31px !important; }
  }
  @media (max-width: 359px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent { font-size: 21px !important; line-height: 28px !important; }
  }
`

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const heroImage = `${normalizedBase}images/Neeraj2.png`
  const heroVideo = `${normalizedBase}videos/Neeraj.mp4`
  const tilt = useTilt()

  return (
    <section
      id="top"
      className="premium-hero"
      aria-labelledby="premium-hero-title"
    >
      <style>{styles}</style>

      <span className="premium-hero__blob premium-hero__blob--a" aria-hidden="true" />
      <span className="premium-hero__blob premium-hero__blob--b" aria-hidden="true" />

      <div className="premium-hero__container">
        <div className="premium-hero__stage">
          {/* ---------- Left: text ---------- */}
          <div className="premium-hero__copy">
            <Reveal>
              <div className="premium-hero__pill">
                <p className="premium-hero__eyebrow">
                  <span>
                    Dont just landing pages. We build complete funnels
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 id="premium-hero-title" className="premium-hero__title">
                <span className="premium-hero__title-lead">
                  Imagine Generating
                </span>
                <span className="premium-hero__title-accent">
                  More Leads &amp; Revenue Without Increasing Ad Spend.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="premium-hero__subtitle">
                Stop Wasting Ad Spend on Low Conversion Pages.
                Invest in a High-Converting Automated Funnel.
              </p>
            </Reveal>

            <Reveal delay={260} className="premium-hero__focus-slot">
              <div className="premium-hero__promise">
                <div
                  className="premium-hero__focus-marquee"
                  tabIndex={0}
                  role="region"
                  aria-label="Funnel performance promise. Focus to pause scrolling."
                >
                  <div className="premium-hero__focus-track">
                    {[0, 1].map((copy) => (
                      <ul
                        key={copy}
                        className="premium-hero__focus-run"
                        aria-hidden={copy === 1 ? true : undefined}
                      >
                        {focusLines.map((line, index) => (
                          <li
                            key={`${copy}-${index}`}
                            className="premium-hero__focus-item"
                            aria-hidden={
                              copy === 0 && index > 0 ? true : undefined
                            }
                          >
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Right: image + dark gradient + button ---------- */}
          <Reveal delay={200} className="premium-hero__media">
            <div className="premium-hero__card" {...tilt}>
              <div className="premium-hero__visual">
                <HeroVideo src={heroVideo} poster={heroImage} />
              </div>

              <div className="premium-hero__panel">
                <div className="premium-hero__actions">
                  <Button className="site-cta--revenue premium-hero__button">
                    Yes! Let's Grow My Revenue
                    <ArrowUpRight
                      className="premium-hero__button-arrow"
                      size={19}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="premium-hero__showcase">
          <section aria-labelledby="premium-hero-funnel-heading">
            <h2
              id="premium-hero-funnel-heading"
              className="premium-hero__intro"
            >
              At{' '}
              <span className="premium-hero__intro-accent">
                Creative Crew,
              </span>{' '}
              We Simplify Growth With A Complete Funnel System That Works
              Seamlessly.
            </h2>

            <ul className="premium-hero__points">
              {points.map((point, index) => (
                <li
                  key={point.text}
                  className={`premium-hero__point premium-hero__point--${point.tone}`}
                  style={{ '--i': index }}
                >
                  <div className="premium-hero__point-top">
                    <IconTile name={point.icon} tone={point.tone} />

                    <span
                      className="premium-hero__point-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p>{point.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      <Reveal className="premium-hero__carousel">
        <div
          className="premium-hero__marquee"
          tabIndex={0}
          role="region"
          aria-label="Landing page services. Focus to pause scrolling."
        >
          <div className="premium-hero__track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="premium-hero__marquee-group"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {services.map((service) => (
                  <li key={service.text} className="premium-hero__service">
                    <span className="premium-hero__service-icon">
                      <Icon name={service.icon} />
                    </span>
                    <span>{service.text}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}