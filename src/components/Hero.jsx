import { useCallback, useEffect, useRef, useState } from 'react'
import { ScanEye } from 'lucide-react'
import { Button } from './ui'

const focusLines = Array(4).fill(
  'Guaranteed Better Funnel Performance. More Value from Every Ad Spend.'
)

const points = [
  { text: 'Communicate Your Offer Clearly.', icon: 'target', tone: 'peach' },
  {
    text: 'Custom Pixel Tracking To Optimize Your Ads.',
    icon: 'scan-eye',
    tone: 'purple',
  },
  {
    text: 'Make Enquiries And Bookings Simple.',
    icon: 'calendar',
    tone: 'gold',
  },
  {
    text: 'Build Credibility With Relevant Proof.',
    icon: 'shield',
    tone: 'purple',
  },
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

/* Small icons used by the video controls */
function ControlIcon({ name }) {
  const shapes = {
    play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />,
    pause: (
      <>
        <rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
        <rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
      </>
    ),
    volume: (
      <>
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
      </>
    ),
    muted: (
      <>
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" />
        <path d="m16 9.5 5 5m0-5-5 5" />
      </>
    ),
    expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  )
}

/* Reveal elements when they enter the viewport */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current

    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
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

/* Desktop mouse tilt; no tilt on touchscreens */
function useTilt() {
  const ref = useRef(null)

  const onPointerMove = (event) => {
    const el = ref.current

    if (!el || event.pointerType !== 'mouse') return

    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    el.style.setProperty('--rx', `${-y * 4}deg`)
    el.style.setProperty('--ry', `${x * 5}deg`)
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return

    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return {
    ref,
    onPointerMove,
    onPointerLeave,
  }
}

/* Vimeo hero video with custom play, sound and fullscreen controls */
const VIMEO_SRC =
  'https://player.vimeo.com/video/1234072596?autoplay=1&muted=1&loop=1&autopause=0&controls=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0'

function HeroVideo() {
  const wrapRef = useRef(null)
  const frameRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const post = useCallback((method, value) => {
    const win = frameRef.current?.contentWindow
    if (!win) return
    win.postMessage(
      JSON.stringify(value === undefined ? { method } : { method, value }),
      '*'
    )
  }, [])

  /* Keep the button state in sync with the player */
  useEffect(() => {
    const onMessage = (event) => {
      if (!String(event.origin).includes('vimeo.com')) return

      let data = event.data
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }

      if (data?.event === 'play') setPlaying(true)
      if (data?.event === 'pause') setPlaying(false)
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const onLoad = () => {
    post('addEventListener', 'play')
    post('addEventListener', 'pause')
  }

  const togglePlay = () => {
    post(playing ? 'pause' : 'play')
    setPlaying(!playing)
  }

  const toggleMute = () => {
    post('setVolume', muted ? 1 : 0)
    setMuted(!muted)
  }

  const goFullscreen = () => {
    const frame = frameRef.current
    const wrap = wrapRef.current
    const target = frame || wrap

    try {
      if (document.fullscreenElement) {
        document.exitFullscreen?.()
      } else if (target?.requestFullscreen) {
        target.requestFullscreen()
      } else if (target?.webkitRequestFullscreen) {
        target.webkitRequestFullscreen()
      }
    } catch {
      /* Fullscreen is not available on this device */
    }
  }

  return (
    <figure
      ref={wrapRef}
      className="premium-hero__image-wrap premium-hero__video-wrap"
      style={{ '--hero-video-ratio': '16 / 9' }}
    >
      <iframe
        ref={frameRef}
        className="premium-hero__video premium-hero__vimeo"
        src={VIMEO_SRC}
        title="Creative Crew landing page preview"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="eager"
        onLoad={onLoad}
      />

      {/* Tap the video itself to play or pause */}
      <button
        type="button"
        className="premium-hero__video-toggle"
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
      />

      <div className="premium-hero__video-controls">
        <div className="premium-hero__video-group">
          <button
            type="button"
            className="premium-hero__video-btn"
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
            aria-pressed={!playing}
          >
            <ControlIcon name={playing ? 'pause' : 'play'} />
          </button>

          <button
            type="button"
            className="premium-hero__video-btn"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!muted}
          >
            <ControlIcon name={muted ? 'muted' : 'volume'} />
          </button>
        </div>

        <button
          type="button"
          className="premium-hero__video-btn"
          onClick={goFullscreen}
          aria-label="Toggle fullscreen"
        >
          <ControlIcon name="expand" />
        </button>
      </div>
    </figure>
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
    max-width: 100%;
    min-width: 0;
    overflow-x: clip;
    padding: var(--hero-top-space, clamp(28px, 5vw, 72px)) 0 clamp(28px, 4vw, 48px);
    color: var(--ink);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background:
      radial-gradient(55% 42% at 100% 0%, #efe6ff, transparent 70%),
      radial-gradient(40% 34% at 0% 8%, #f6f0ff, transparent 72%),
      radial-gradient(60% 36% at 85% 65%, #f3ecff, transparent 72%),
      #fff;
  }

  .premium-hero,
  .premium-hero *,
  .premium-hero *::before,
  .premium-hero *::after {
    box-sizing: border-box;
  }

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

  .premium-hero__blob {
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(70px);
    animation: premiumHeroDrift 16s ease-in-out infinite alternate;
  }

  .premium-hero__blob--a {
    top: 4%;
    right: -8%;
    width: min(46vw, 520px);
    aspect-ratio: 1;
    background: #7c3aed24;
  }

  .premium-hero__blob--b {
    top: 52%;
    left: -10%;
    width: min(40vw, 440px);
    aspect-ratio: 1;
    background: #ffeadb99;
    animation-delay: -6s;
  }

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
  .premium-hero figure {
    margin: 0;
    overflow-wrap: break-word;
  }

  .premium-hero ul {
    padding: 0;
    list-style: none;
  }

  .premium-hero svg {
    display: block;
    flex-shrink: 0;
  }

  .premium-hero__reveal {
    min-width: 0;
    max-width: 100%;
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity .8s var(--hero-ease) var(--reveal-delay, 0ms),
      transform .8s var(--hero-ease) var(--reveal-delay, 0ms);
  }

  .premium-hero__reveal.is-in {
    opacity: 1;
    transform: none;
  }

  /* Main hero layout */

  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(24px, 5vw, 48px);
    align-items: center;
  }

  .premium-hero__copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .premium-hero__pill {
    display: flex;
    justify-content: flex-start;
    max-width: 100%;
    min-width: 0;
  }

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
    font-size: clamp(12px, 1.2vw, 14px);
    font-weight: 600;
    line-height: 1.6;
    text-wrap: pretty;
    width: 100%;
    box-sizing: border-box;
  }

  .premium-hero .premium-hero__eyebrow span {
    display: block;
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    text-align: left;
  }

  .premium-hero .premium-hero__eyebrow::before {
    content: "";
    flex: 0 0 9px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, var(--violet-deep));
    animation: premiumHeroPulse 3s ease-in-out infinite;
  }

  .premium-hero .premium-hero__eyebrow::after {
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
    margin-top: clamp(16px, 2.4vw, 26px);
    font-family: "Bricolage Grotesque", Inter, sans-serif;
    font-size: clamp(34px, 4.3vw, 54px);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -.035em;
    text-wrap: balance;
  }

  .premium-hero__title-lead {
    display: block;
    color: var(--ink);
  }

  .premium-hero__title-accent {
    display: inline;
    color: var(--violet);
    background: linear-gradient(100deg, #8b5cf6, #7c3aed 30%, var(--indigo) 60%, #8b5cf6);
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
    margin-top: clamp(14px, 2vw, 20px);
    color: var(--muted);
    font-size: clamp(15px, .8vw + 12px, 18.5px);
    font-weight: 500;
    line-height: 1.65;
  }

  .premium-hero__focus-slot {
    width: 100%;
    min-width: 0;
    margin-top: clamp(20px, 3vw, 32px);
  }

  /* Promise marquee */

  .premium-hero__promise {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--lav-200);
    border-radius: 18px;
    background: linear-gradient(110deg, #ffffffd9, #f7f2ffd9 65%, #fff4ecd9);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    box-shadow: inset 0 1px 0 #fff, 0 18px 36px -26px #5b21b68c;
  }

  .premium-hero__focus-marquee,
  .premium-hero__marquee {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    padding-block: 14px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
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

  .premium-hero .premium-hero__focus-run,
  .premium-hero .premium-hero__marquee-group {
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
    font-size: clamp(13px, .6vw + 10px, 17px);
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

  /* Video card */

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
    width: 100%;
    min-width: 0;
    overflow: hidden;
    border-radius: clamp(18px, 3vw, 28px);
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
    width: 100%;
    min-width: 0;
    padding: 0;
    background: var(--dark-1);
  }

  .premium-hero__image-wrap {
    position: relative;
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .premium-hero__video-wrap {
    aspect-ratio: var(--hero-video-ratio, 16 / 9);
    background: var(--dark-1);
  }

  .premium-hero__video-wrap::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    z-index: 1;
    height: 38%;
    pointer-events: none;
    background: linear-gradient(180deg, transparent, #14111f8c);
  }

  .premium-hero .premium-hero__video {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    border: 0;
    background: var(--dark-1);
  }

  /* Tap area over the video (play / pause) */

  .premium-hero__video-toggle {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .premium-hero__video-controls {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    pointer-events: none;
  }

  .premium-hero__video-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .premium-hero__video-btn {
    pointer-events: auto;
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid #ffffff40;
    border-radius: 50%;
    color: #fff;
    background: #14111f99;
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    cursor: pointer;
    transition: transform .25s ease, background .25s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .premium-hero__video-btn:active {
    transform: scale(.94);
  }

  .premium-hero__video-btn:focus-visible,
  .premium-hero__video-toggle:focus-visible,
  .premium-hero .premium-hero__button:focus-visible {
    outline: 3px solid #a98af0;
    outline-offset: 3px;
  }

  /* CTA panel */

  .premium-hero__panel {
    position: relative;
    z-index: 3;
    margin-top: -1px;
    padding: clamp(12px, 2vw, 16px) clamp(12px, 2.4vw, 18px) clamp(14px, 2.2vw, 18px);
    background:
      radial-gradient(80% 90% at 100% 100%, #7c3aed4d, transparent 70%),
      linear-gradient(180deg, var(--dark-1), var(--dark-2));
  }

  .premium-hero__actions {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .premium-hero .premium-hero__button.premium-hero__button {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 54px;
    padding: 13px clamp(14px, 4vw, 30px);
    border: 1px solid #f3b01f;
    border-radius: 14px;
    color: #2e0c4d;
    background: linear-gradient(180deg, #ffee82, #ffe04e 48%, #ffca30);
    box-shadow:
      inset 0 1px 0 #fff8c4,
      inset 0 -2px 4px #f5b2144d,
      0 4px 0 #d18f0a,
      0 14px 24px -10px #f5b323a0;
    font-family: inherit;
    font-size: clamp(15px, 1.4vw, 17px);
    font-weight: 800;
    line-height: 1.35;
    text-align: center;
    text-decoration: none;
    white-space: normal;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .premium-hero .premium-hero__button::before {
    content: "";
    position: absolute;
    inset: 0 0 50%;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg, #ffffff40, transparent);
  }

  .premium-hero .premium-hero__button::after {
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

  .premium-hero__button-arrow {
    flex-shrink: 0;
    transition: transform .25s var(--hero-ease);
  }

  /* Funnel feature section */

  .premium-hero__showcase {
    width: 100%;
    min-width: 0;
    margin-top: clamp(44px, 8vw, 96px);
  }

  .premium-hero .premium-hero__intro {
    width: 100%;
    max-width: 920px;
    margin-inline: auto;
    color: var(--ink);
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -.02em;
    text-align: center;
    text-transform: none;
    text-wrap: balance;
  }

  .premium-hero__intro-accent {
    color: var(--violet-deep);
  }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: clamp(26px, 4.4vw, 48px);
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
    border-radius: 26px;
    background:
      radial-gradient(ellipse at 100% 0%, var(--card-tint), transparent 72%),
      linear-gradient(150deg, #ffffffef, #ffffffc9);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    box-shadow:
      inset 0 1px 0 #fff,
      0 24px 38px -27px #5b21b680,
      0 5px 12px -7px #5b21b62b;
    transition: transform .4s var(--hero-ease), box-shadow .4s ease;
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

  .premium-hero__point--peach {
    --card-border: #f3d1bd;
    --card-tint: #ffeadb;
    --tile-color: #e58a5c;
    --tile-base: #e9b598;
  }

  .premium-hero__point--gold {
    --card-border: #efddb0;
    --card-tint: #fff3cd;
    --tile-color: #b88619;
    --tile-base: #dabc67;
  }

  .premium-hero__point-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
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
  }

  .premium-hero .premium-hero__point p {
    margin-top: 24px;
    color: var(--muted);
    font-size: clamp(15px, 1.4vw, 17px);
    font-weight: 600;
    line-height: 1.65;
    overflow-wrap: break-word;
  }

  /* Services marquee */

  .premium-hero__carousel {
    width: 100%;
    min-width: 0;
    margin-top: clamp(24px, 4vw, 48px);
  }

  .premium-hero__marquee {
    padding-block: 18px;
  }

  .premium-hero__track {
    animation-duration: 46s;
  }

  .premium-hero .premium-hero__marquee-group {
    gap: var(--service-gap);
    padding-right: var(--service-gap);
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
    background: #ffffffd9;
    box-shadow: inset 0 1px 0 #fff, 0 10px 20px -16px #5b21b680;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__service-icon {
    color: var(--violet);
  }

  .premium-hero__service-icon svg {
    width: 19px;
    height: 19px;
  }

  .premium-hero__promise:focus-within .premium-hero__focus-track,
  .premium-hero__marquee:focus-within .premium-hero__track {
    animation-play-state: paused;
  }

  /* Animation keyframes */

  @keyframes premiumHeroEnter {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes premiumHeroMarquee {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
  }

  @keyframes premiumHeroPulse {
    0%, 100% { box-shadow: 0 0 0 0 #7c3aed59; }
    50% { box-shadow: 0 0 0 6px #7c3aed00; }
  }

  @keyframes premiumHeroDrift {
    from { transform: translate3d(0, 0, 0) scale(1); }
    to { transform: translate3d(3%, 5%, 0) scale(1.1); }
  }

  @keyframes premiumHeroGlow {
    from { opacity: .65; }
    to { opacity: 1; }
  }

  @keyframes premiumHeroSheen {
    from { background-position: 0% 50%; }
    to { background-position: 100% 50%; }
  }

  @keyframes premiumHeroShine {
    0%, 55% { transform: translateX(0) skewX(-20deg); }
    100% { transform: translateX(520%) skewX(-20deg); }
  }

  /* Desktop */

  @media (min-width: 1024px) {
    .premium-hero__stage {
      grid-template-columns: minmax(0, .94fr) minmax(0, 1.06fr);
      gap: clamp(36px, 4vw, 60px);
    }

    .premium-hero__media {
      max-width: 600px;
      margin-left: auto;
      margin-right: 0;
    }
  }

  /* Tablet */

  @media (max-width: 1023px) {
    .premium-hero__copy {
      align-items: center;
      text-align: center;
    }

    .premium-hero__copy > .premium-hero__reveal {
      width: 100%;
    }

    .premium-hero__pill {
      justify-content: center;
    }

    .premium-hero .premium-hero__title {
      text-align: center;
    }

    .premium-hero__title-accent {
      display: block;
      margin-top: .08em;
      text-wrap: balance;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 620px;
      margin-inline: auto;
      text-align: center;
    }

    .premium-hero .premium-hero__intro {
      font-size: 32px;
      line-height: 1.3;
    }

    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      max-width: 760px;
      margin-inline: auto;
      margin-top: 30px;
    }

    .premium-hero__media {
      max-width: 560px;
    }
  }

  /* Mobile */

  @media (max-width: 767px) {
    .premium-hero {
      --hero-gutter: 16px;
      --focus-gap: 20px;
      --service-gap: 10px;
      padding-top: var(--hero-top-space, 20px);
      padding-bottom: 28px;
    }

    .premium-hero__stage {
      gap: 22px;
    }

    .premium-hero .premium-hero__eyebrow {
      gap: 8px;
      padding: 8px 14px;
      font-size: 12px;
      line-height: 1.5;
      white-space: normal;
      text-align: left;
    }

    .premium-hero .premium-hero__title {
      margin-top: 16px;
      font-size: clamp(28px, 7.7vw, 40px);
      line-height: 1.12;
      letter-spacing: -.035em;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 480px;
      margin-top: 12px;
      font-size: 15px;
      line-height: 1.65;
      text-wrap: pretty;
    }

    .premium-hero__focus-slot {
      margin-top: 18px;
    }

    .premium-hero__promise {
      border-radius: 14px;
    }

    .premium-hero__focus-marquee {
      padding-block: 12px;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
    }

    .premium-hero__focus-track {
      animation-duration: 38s;
    }

    .premium-hero__focus-item {
      font-size: clamp(13px, 3.7vw, 15px);
      line-height: 1.45;
    }

    .premium-hero__focus-item::after {
      flex-basis: 7px;
      width: 7px;
      height: 7px;
    }

    .premium-hero__media {
      width: 100%;
      max-width: 100%;
    }

    .premium-hero__card {
      border-radius: 18px;
      transform: none;
      box-shadow: 0 20px 40px -24px #5b21b6a6;
    }

    .premium-hero__video-controls {
      left: 8px;
      right: 8px;
      bottom: 8px;
    }

    .premium-hero__video-btn {
      width: 38px;
      height: 38px;
    }

    .premium-hero__panel {
      padding: 10px 10px 12px;
    }

    .premium-hero .premium-hero__button.premium-hero__button {
      min-height: 50px;
      padding: 12px 14px;
      gap: 8px;
      border-radius: 13px;
      font-size: clamp(15px, 4.2vw, 16.5px);
      line-height: 1.35;
    }

    .premium-hero__showcase {
      margin-top: 44px;
    }

    .premium-hero .premium-hero__intro {
      padding-inline: 0;
      font-size: clamp(24px, 6.4vw, 30px);
      line-height: 1.3;
      letter-spacing: -.02em;
    }

    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 24px;
    }

    .premium-hero__point {
      padding: 16px 14px 20px;
      border-radius: 18px;
    }

    .premium-hero__point::after {
      left: 14px;
      right: 14px;
    }

    .premium-hero__point-top {
      align-items: center;
      gap: 6px;
    }

    .premium-hero__tile {
      flex-basis: 40px;
      width: 40px;
      height: 40px;
      border-radius: 12px;
    }

    .premium-hero__tile svg {
      width: 20px;
      height: 20px;
    }

    .premium-hero__point-number {
      flex-basis: 28px;
      width: 28px;
      height: 28px;
      border-radius: 9px;
      font-size: 12px;
    }

    .premium-hero .premium-hero__point p {
      margin-top: 14px;
      font-size: clamp(13px, 3.6vw, 14.5px);
      line-height: 1.55;
    }

    .premium-hero__carousel {
      margin-top: 22px;
    }

    .premium-hero__marquee {
      padding-block: 12px;
    }

    .premium-hero__track {
      animation-duration: 40s;
    }

    .premium-hero__service {
      gap: 8px;
      padding: 9px 14px;
      font-size: 13px;
    }

    .premium-hero__service-icon svg {
      width: 18px;
      height: 18px;
    }
  }

  /* Small phones */

  @media (max-width: 479px) {
    .premium-hero {
      --hero-gutter: 14px;
      --focus-gap: 16px;
      --service-gap: 8px;
    }

    .premium-hero .premium-hero__eyebrow {
      gap: 7px;
      padding: 8px 12px;
      font-size: 11.5px;
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(26px, 7.8vw, 34px);
    }

    .premium-hero .premium-hero__subtitle {
      font-size: 14.5px;
    }

    .premium-hero__stage {
      gap: 20px;
    }

    .premium-hero .premium-hero__button.premium-hero__button {
      font-size: 15px;
    }

    .premium-hero .premium-hero__intro {
      font-size: 23px;
      line-height: 1.32;
    }

    .premium-hero .premium-hero__points {
      gap: 10px;
    }

    .premium-hero__point {
      padding: 14px 12px 18px;
      border-radius: 16px;
    }

    .premium-hero__point::after {
      left: 12px;
      right: 12px;
    }

    .premium-hero__point-top {
      gap: 5px;
    }

    .premium-hero__tile {
      flex-basis: 36px;
      width: 36px;
      height: 36px;
    }

    .premium-hero__tile svg {
      width: 19px;
      height: 19px;
    }

    .premium-hero__point-number {
      flex-basis: 26px;
      width: 26px;
      height: 26px;
      font-size: 11px;
    }

    .premium-hero .premium-hero__point p {
      margin-top: 12px;
      font-size: 13px;
      line-height: 1.5;
    }

    .premium-hero__video-btn {
      width: 36px;
      height: 36px;
    }

    .premium-hero__video-btn svg {
      width: 18px;
      height: 18px;
    }
  }

  /* Extra narrow phones */

  @media (max-width: 359px) {
    .premium-hero {
      --hero-gutter: 12px;
      --focus-gap: 14px;
    }

    .premium-hero .premium-hero__title {
      font-size: 25px;
    }

    .premium-hero .premium-hero__intro {
      font-size: 21px;
    }

    .premium-hero .premium-hero__points {
      grid-template-columns: minmax(0, 1fr);
      gap: 10px;
    }

    .premium-hero__point {
      padding: 16px;
    }

    .premium-hero .premium-hero__point p {
      font-size: 14px;
    }

    .premium-hero__panel {
      padding-inline: 8px;
    }

    .premium-hero .premium-hero__button.premium-hero__button {
      font-size: 14px;
    }
  }

  /* Hover effects only on mouse devices */

  @media (hover: hover) and (pointer: fine) {
    .premium-hero__eyebrow {
      transition: transform .3s ease, box-shadow .3s ease;
    }

    .premium-hero__eyebrow:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px -14px #7c3aedb3;
    }

    .premium-hero__promise:hover {
      box-shadow: 0 22px 40px -24px #5b21b6b3;
    }

    .premium-hero__point:hover {
      transform: translateY(-5px);
      box-shadow: 0 32px 46px -26px #5b21b68f;
    }

    .premium-hero__point:hover::after {
      transform: scaleX(1);
    }

    .premium-hero__point:hover .premium-hero__tile svg {
      transform: rotate(-6deg) scale(1.08);
    }

    .premium-hero__card:hover {
      --lift: -5px;
      box-shadow: 0 40px 70px -28px #5b21b6c4;
    }

    .premium-hero__video-btn:hover {
      background: var(--violet);
      transform: scale(1.06);
    }

    .premium-hero .premium-hero__button.premium-hero__button {
      transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
    }

    .premium-hero .premium-hero__button.premium-hero__button:hover {
      transform: translateY(-3px);
      filter: brightness(1.04) saturate(1.05);
      box-shadow: 0 7px 0 #d18f0a, 0 22px 36px -12px #f5b323c0;
    }

    .premium-hero__button:hover .premium-hero__button-arrow {
      transform: translate(2px, -2px);
    }

    .premium-hero__service {
      transition: transform .3s ease, border-color .3s ease;
    }

    .premium-hero__service:hover {
      transform: translateY(-3px);
      border-color: #cdb6f6;
    }

    .premium-hero__promise:hover .premium-hero__focus-track,
    .premium-hero__marquee:hover .premium-hero__track {
      animation-play-state: paused;
    }
  }

  /* Reduced-motion accessibility */

  @media (prefers-reduced-motion: reduce) {
    .premium-hero *,
    .premium-hero *::before,
    .premium-hero *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }

    .premium-hero__reveal {
      opacity: 1;
      transform: none;
    }

    .premium-hero__card {
      transform: none;
    }

    .premium-hero__focus-marquee,
    .premium-hero__marquee {
      padding-inline: var(--hero-gutter);
      -webkit-mask-image: none;
      mask-image: none;
    }

    .premium-hero__focus-track,
    .premium-hero__track {
      width: 100%;
      transform: none;
      flex-wrap: wrap;
      justify-content: center;
      white-space: normal;
    }

    .premium-hero .premium-hero__focus-run,
    .premium-hero .premium-hero__marquee-group {
      flex: 1 1 auto;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      width: 100%;
      min-width: 0;
      padding: 0;
    }

    .premium-hero__focus-run > li:not(:first-child),
    .premium-hero__focus-track > [aria-hidden="true"],
    .premium-hero__track > [aria-hidden="true"] {
      display: none;
    }

    .premium-hero__focus-item,
    .premium-hero__service {
      flex: 0 1 auto;
      min-width: 0;
      max-width: 100%;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .premium-hero__focus-item {
      text-align: center;
    }

    .premium-hero__focus-item::after {
      display: none;
    }
  }
`

export default function Hero() {
  const tilt = useTilt()

  return (
    <section
      id="top"
      className="premium-hero"
      aria-labelledby="premium-hero-title"
    >
      <style>{styles}</style>

      <span
        className="premium-hero__blob premium-hero__blob--a"
        aria-hidden="true"
      />

      <span
        className="premium-hero__blob premium-hero__blob--b"
        aria-hidden="true"
      />

      <div className="premium-hero__container">
        <div className="premium-hero__stage">
          {/* Hero content */}

          <div className="premium-hero__copy">

            <Reveal className="w-full">
              <div className="premium-hero__pill w-full">
                <p className="premium-hero__eyebrow !m-0 !w-full flex-1 text-left">
                  <span className="block w-full flex-1 text-left">
                    We Don&rsquo;t Just Build Landing Pages; We Build Complete Automated Funnels.
                  </span>
                </p>
              </div>
            </Reveal>


            <Reveal delay={90}>
              <h1
                id="premium-hero-title"
                className="premium-hero__title"
              >
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

          {/* Hero video and CTA */}

          <Reveal delay={200} className="premium-hero__media">
            <div
              className="premium-hero__card"
              ref={tilt.ref}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
            >
              <div className="premium-hero__visual">
                <HeroVideo />
              </div>

              <div className="premium-hero__panel">
                <div className="premium-hero__actions">
                  <Button className="site-cta--revenue premium-hero__button">
                    Yes! Let's Grow My Revenue
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Funnel features */}

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

      {/* Services marquee */}

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
                  <li
                    key={service.text}
                    className="premium-hero__service"
                  >
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