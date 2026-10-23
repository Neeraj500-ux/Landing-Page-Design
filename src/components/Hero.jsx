import { useCallback, useEffect, useRef, useState } from 'react'
import { ScanEye } from 'lucide-react'
import { Button } from './ui'

/* ==========================================================
   Hero.jsx  (100% Tailwind utility classes)
   - Same content, same colors, same video controls.
   - The dot icon in the top pill is removed.
   - Fluid text sizes that scale on every screen.
   - Heading scales with its own column width (cqw), so it
     always stays in 3 lines on tablet + desktop.
   - Only keyframes + the font import live in the small
     <style> block at the bottom of this file.
   - Arbitrary values only, so it works on Tailwind v3 and v4.
   ========================================================== */

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

/* ==================== Shared class strings ==================== */

// Violet gradient that slowly shifts (used on accent words)
const VIOLET_FLOW =
  'bg-[linear-gradient(110deg,#6d28d9,#9b5cf0,#6d28d9)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[heroSheen_5s_ease-in-out_infinite_alternate] motion-reduce:animate-none'

const MASK =
  '[mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]'

// Space between promise-marquee items (the run padding must equal the gap)
const FOCUS_GAP =
  'gap-4 min-[480px]:gap-5 md:gap-[clamp(22px,3vw,44px)]'
const FOCUS_RUN_GAP =
  'gap-4 pr-4 min-[480px]:gap-5 min-[480px]:pr-5 md:gap-[clamp(22px,3vw,44px)] md:pr-[clamp(22px,3vw,44px)]'

const SERVICE_RUN_GAP =
  'gap-2 pr-2 min-[480px]:gap-2.5 min-[480px]:pr-2.5 md:gap-3.5 md:pr-3.5'

// Yellow CTA (the "!" wins over your Button component's own styles)
const HERO_BTN =
  'site-cta--revenue !relative !isolate !inline-flex !min-h-[50px] !w-full !min-w-0 !max-w-full !items-center !justify-center !gap-2 !overflow-hidden !whitespace-normal !rounded-[13px] !border !border-[#f3b01f] ' +
  '!bg-[linear-gradient(180deg,#ffee82,#ffe04e_48%,#ffca30)] !px-3.5 !py-3 !text-center !text-[15px] !font-extrabold !leading-[1.35] !text-[#2e0c4d] !no-underline ' +
  '!shadow-[inset_0_1px_0_#fff8c4,inset_0_-2px_4px_#f5b2144d,0_4px_0_#d18f0a,0_14px_24px_-10px_#f5b323a0] ' +
  'min-[480px]:!text-base md:!min-h-[54px] md:!rounded-[14px] md:!px-[clamp(14px,4vw,30px)] md:!text-[clamp(15px,1.4vw,17px)] ' +
  'transition-[transform,box-shadow,filter] duration-200 [-webkit-tap-highlight-color:transparent] ' +
  'hover:!-translate-y-[3px] hover:!brightness-105 hover:!shadow-[inset_0_1px_0_#fff8c4,0_7px_0_#d18f0a,0_22px_36px_-12px_#f5b323c0] ' +
  'active:!translate-y-[2px] ' +
  'focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#a98af0] ' +
  'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-1/2 before:top-0 before:-z-10 before:bg-[linear-gradient(180deg,#ffffff40,transparent)] ' +
  'after:pointer-events-none after:absolute after:inset-y-0 after:-left-[45%] after:-z-10 after:w-[32%] after:animate-[heroShine_5.5s_ease-in-out_2s_infinite] after:bg-[linear-gradient(100deg,transparent,#ffffff99,transparent)] motion-reduce:after:hidden'

// Colors for the four feature cards
const TONES = {
  purple: {
    card: 'border-[#e3d3ff] bg-[radial-gradient(ellipse_at_100%_0%,#f3eaff,transparent_72%),linear-gradient(150deg,#ffffffef,#ffffffc9)]',
    tile: 'border-[#e3d3ff] bg-[linear-gradient(145deg,#fff,#f3eaff)] text-[#7c3aed] shadow-[inset_0_1px_0_#fff,0_5px_0_-1px_#bc9be9,0_12px_20px_-12px_#7c3aed]',
    bar: 'bg-[linear-gradient(90deg,#7c3aed,transparent)]',
    number: 'border-[#e3d3ff]',
    ring: 'border-[#7c3aed]/50',
  },
  peach: {
    card: 'border-[#f3d1bd] bg-[radial-gradient(ellipse_at_100%_0%,#ffeadb,transparent_72%),linear-gradient(150deg,#ffffffef,#ffffffc9)]',
    tile: 'border-[#f3d1bd] bg-[linear-gradient(145deg,#fff,#ffeadb)] text-[#e58a5c] shadow-[inset_0_1px_0_#fff,0_5px_0_-1px_#e9b598,0_12px_20px_-12px_#e58a5c]',
    bar: 'bg-[linear-gradient(90deg,#e58a5c,transparent)]',
    number: 'border-[#f3d1bd]',
    ring: 'border-[#e58a5c]/50',
  },
  gold: {
    card: 'border-[#efddb0] bg-[radial-gradient(ellipse_at_100%_0%,#fff3cd,transparent_72%),linear-gradient(150deg,#ffffffef,#ffffffc9)]',
    tile: 'border-[#efddb0] bg-[linear-gradient(145deg,#fff,#fff3cd)] text-[#b88619] shadow-[inset_0_1px_0_#fff,0_5px_0_-1px_#dabc67,0_12px_20px_-12px_#b88619]',
    bar: 'bg-[linear-gradient(90deg,#b88619,transparent)]',
    number: 'border-[#efddb0]',
    ring: 'border-[#b88619]/50',
  },
}

/* ==================== Icons ==================== */

function Icon({ name, className = '' }) {
  if (name === 'scan-eye') {
    return (
      <ScanEye
        className={`block shrink-0 ${className}`}
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
      className={`block shrink-0 ${className}`}
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
      className="block h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5"
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

/* ==================== Reveal on scroll ==================== */

function Reveal({ as: Tag = 'div', children, delay = 0, className = '' }) {
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
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`min-w-0 max-w-full transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${seen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        } ${className}`}
    >
      {children}
    </Tag>
  )
}

/* ==================== Desktop mouse tilt ==================== */

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

  return { ref, onPointerMove, onPointerLeave }
}

/* ==================== Vimeo hero video ==================== */

const VIMEO_SRC =
  'https://player.vimeo.com/video/1234072596?autoplay=1&muted=1&loop=1&autopause=0&controls=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0'

const VIDEO_BTN =
  'pointer-events-auto inline-grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/25 bg-[rgba(20,17,31,.6)] p-0 text-white ' +
  '[-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)] [-webkit-tap-highlight-color:transparent] touch-manipulation ' +
  'transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-[#7c3aed] active:scale-95 ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] sm:h-10 sm:w-10'

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
      className="relative m-0 aspect-[16/9] w-full min-w-0 overflow-hidden bg-[#1b1233]"
    >
      <iframe
        ref={frameRef}
        className="block h-full w-full max-w-full border-0 bg-[#1b1233]"
        src={VIMEO_SRC}
        title="Creative Crew landing page preview"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="eager"
        onLoad={onLoad}
      />

      {/* Soft fade at the bottom so the controls stay readable */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-[linear-gradient(180deg,transparent,#14111f8c)]"
      />

      {/* Tap the video itself to play or pause */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute inset-0 z-[2] h-full w-full cursor-pointer border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0]"
      />

      <div className="pointer-events-none absolute inset-x-2 bottom-2 z-[3] flex items-center justify-between gap-2 md:inset-x-2.5 md:bottom-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={VIDEO_BTN}
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
            aria-pressed={!playing}
          >
            <ControlIcon name={playing ? 'pause' : 'play'} />
          </button>

          <button
            type="button"
            className={VIDEO_BTN}
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!muted}
          >
            <ControlIcon name={muted ? 'muted' : 'volume'} />
          </button>
        </div>

        <button
          type="button"
          className={VIDEO_BTN}
          onClick={goFullscreen}
          aria-label="Toggle fullscreen"
        >
          <ControlIcon name="expand" />
        </button>
      </div>
    </figure>
  )
}

/* ==================== Feature card ==================== */

function PointCard({ point, index }) {
  const tone = TONES[point.tone]

  return (
    <Reveal as="li" delay={index * 100} className="h-full">
      <div
        className={`group relative h-full min-w-0 overflow-hidden rounded-2xl border px-3 pb-[18px] pt-3.5 shadow-[inset_0_1px_0_#fff,0_24px_38px_-27px_rgba(91,33,182,.5),0_5px_12px_-7px_rgba(91,33,182,.17)] [-webkit-backdrop-filter:blur(20px)] [backdrop-filter:blur(20px)] transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[5px] hover:shadow-[inset_0_1px_0_#fff,0_32px_46px_-26px_rgba(91,33,182,.56),0_5px_12px_-7px_rgba(91,33,182,.17)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[480px]:rounded-[18px] min-[480px]:px-3.5 min-[480px]:pb-5 min-[480px]:pt-4 md:px-5 md:pb-6 md:pt-5 lg:rounded-[26px] lg:px-6 lg:pb-[30px] lg:pt-[26px] ${tone.card}`}
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-1.5 md:items-start md:gap-3">
          {/* Idle bob on the wrapper, hover effects on the tile */}
          <span
            className="relative inline-flex animate-[heroBob_4.5s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationDelay: `${index * 0.4}s` }}
            aria-hidden="true"
          >
            <span
              className={`pointer-events-none absolute inset-0 rounded-xl border opacity-0 group-hover:animate-[heroRing_1.5s_ease-out_infinite] motion-reduce:hidden md:rounded-2xl ${tone.ring}`}
            />
            <span
              className={`relative grid h-9 w-9 flex-none place-items-center rounded-xl border min-[480px]:h-10 min-[480px]:w-10 md:h-[54px] md:w-[54px] md:rounded-2xl ${tone.tile}`}
            >
              <Icon
                name={point.icon}
                className="h-[19px] w-[19px] origin-center transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-6 group-hover:scale-110 min-[480px]:h-5 min-[480px]:w-5 md:h-[25px] md:w-[25px]"
              />
            </span>
          </span>

          <span
            className={`grid h-7 w-7 flex-none place-items-center rounded-[9px] border bg-white/85 text-xs font-extrabold leading-none tabular-nums text-[#5b3291] shadow-[inset_0_1px_0_#fff,0_4px_10px_rgba(91,33,182,.03)] md:h-[38px] md:w-[38px] md:rounded-xl md:text-[15px] ${tone.number}`}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="m-0 mt-3.5 text-[13px] font-semibold leading-[1.55] text-[#5b5870] [overflow-wrap:break-word] min-[480px]:text-sm md:mt-6 md:text-[clamp(15px,1.4vw,17px)] md:leading-[1.65]">
          {point.text}
        </p>

        {/* Accent bar grows on hover */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-3.5 bottom-0 h-[3px] origin-left scale-x-[.14] rounded-t-[3px] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 motion-reduce:transition-none md:inset-x-5 lg:inset-x-6 ${tone.bar}`}
        />
      </div>
    </Reveal>
  )
}

/* ==================== Main component ==================== */

export default function Hero() {
  const tilt = useTilt()

  return (
    <section
      id="top"
      className="relative isolate w-full min-w-0 max-w-full overflow-x-clip bg-[radial-gradient(55%_42%_at_100%_0%,#efe6ff,transparent_70%),radial-gradient(40%_34%_at_0%_8%,#f6f0ff,transparent_72%),radial-gradient(60%_36%_at_85%_65%,#f3ecff,transparent_72%),#fff] pb-7 pt-[var(--hero-top-space,20px)] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[#14111f] antialiased md:pb-[clamp(28px,4vw,48px)] md:pt-[var(--hero-top-space,clamp(28px,5vw,72px))]"
      aria-labelledby="premium-hero-title"
    >
      <style>{keyframes}</style>

      {/* Dotted texture + drifting blobs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(#7c3aed17_1px,transparent_1px)] [background-size:30px_30px] [mask-image:linear-gradient(#000a,transparent_55%)] [-webkit-mask-image:linear-gradient(#000a,transparent_55%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[4%] -z-10 aspect-square w-[min(46vw,520px)] animate-[heroDrift_16s_ease-in-out_infinite_alternate] rounded-full bg-[#7c3aed24] blur-[70px] motion-reduce:animate-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[52%] -z-10 aspect-square w-[min(40vw,440px)] animate-[heroDrift_16s_ease-in-out_-6s_infinite_alternate] rounded-full bg-[#ffeadb99] blur-[70px] motion-reduce:animate-none"
      />

      <div className="mx-auto w-full min-w-0 max-w-[1180px] px-3 min-[360px]:px-3.5 min-[480px]:px-4 md:px-[clamp(16px,4vw,36px)]">
        {/* ================= HERO STAGE ================= */}
        <div className="grid grid-cols-1 items-center gap-5 min-[480px]:gap-[22px] md:gap-[clamp(24px,5vw,48px)] lg:grid-cols-[minmax(0,.94fr)_minmax(0,1.06fr)] lg:gap-[clamp(36px,4vw,60px)]">
          {/* ---------- Copy ---------- */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Pill (no dot icon) */}
            <Reveal className="w-full">
              <p className="relative m-0 w-full overflow-hidden rounded-[26px] border border-[#e0d2ff] bg-[linear-gradient(180deg,#f6f1ff,#efe7ff)] px-4 py-3 text-center text-[clamp(14px,4vw,17px)] font-semibold leading-[1.55] text-[#2a2140] shadow-[inset_0_1px_0_#fff,0_10px_24px_-16px_rgba(124,58,237,.5)] [text-wrap:balance] after:pointer-events-none after:absolute after:inset-y-0 after:-left-[40%] after:w-[36%] after:animate-[heroShine_6s_ease-in-out_1.2s_infinite] after:bg-[linear-gradient(100deg,transparent,#ffffffb3,transparent)] motion-reduce:after:hidden md:px-5 md:py-3.5 md:text-[clamp(16px,1.65vw,21px)] lg:text-left">
                We Don’t Just Build Landing Pages; We Build Complete Automated Funnels.
              </p>
            </Reveal>

            {/* Title (container = column width, so the heading scales with it) */}
            <Reveal delay={90} className="w-full [container-type:inline-size]">
              <h1
                id="premium-hero-title"
                className="font-display m-0 mt-4 w-full text-center text-[clamp(24px,7.4vw,41px)] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#14111f] md:mt-[clamp(16px,2.4vw,26px)] md:text-[clamp(33px,9cqw,64px)] md:tracking-[-0.035em] lg:text-left"
              >
                {/* Desktop + tablet: three lines */}
                <span className="block max-md:hidden">
                  <span className="block whitespace-nowrap">
                    Generate More Leads &amp;
                  </span>

                  <span className="block whitespace-nowrap">
                    <span className={VIOLET_FLOW}>Revenue</span> Without
                  </span>

                  <span className="block w-full whitespace-nowrap tracking-[-0.04em]">
                    Spending More Ad Spend
                  </span>
                </span>

                {/* Phones: three lines that always fit */}
                <span
                  className="flex flex-col items-center gap-0.5 whitespace-nowrap md:hidden"
                  aria-hidden="true"
                >
                  <span className="block w-full whitespace-nowrap text-center leading-[1.08] tracking-[-0.05em]">
                    Generate More Leads &amp;
                  </span>
                  <span className="block w-full whitespace-nowrap text-center leading-[1.08] tracking-[-0.05em]">
                    <span className={VIOLET_FLOW}>Revenue</span> Without
                  </span>
                  <span className="block w-full whitespace-nowrap text-center leading-[1.08] tracking-[-0.05em]">
                    Spending More Ad Spend
                  </span>
                </span>
              </h1>
            </Reveal>

            {/* Subtitle */}
            <Reveal delay={180} className="w-full">
              <p className="m-0 mx-auto mt-3 w-full max-w-[480px] text-[clamp(14.5px,.8vw+12px,18.5px)] font-medium leading-[1.65] text-[#5b5870] [text-wrap:pretty] md:mt-[clamp(14px,2vw,20px)] md:max-w-[620px] lg:mx-0 lg:max-w-[540px]">
                Stop Wasting Ad Spend on Low Conversion Pages. Invest in a
                High-Converting Automated Funnel.
              </p>
            </Reveal>

            {/* Promise marquee */}
            <Reveal delay={260} className="mt-[18px] w-full md:mt-[clamp(20px,3vw,32px)]">
              <div className="min-w-0 overflow-hidden rounded-[14px] border border-[#e0d2ff] bg-[linear-gradient(110deg,#ffffffd9,#f7f2ffd9_65%,#fff4ecd9)] shadow-[inset_0_1px_0_#fff,0_18px_36px_-26px_rgba(91,33,182,.55)] [-webkit-backdrop-filter:blur(18px)] [backdrop-filter:blur(18px)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_#fff,0_22px_40px_-24px_rgba(91,33,182,.7)] md:rounded-[18px]">
                <div
                  className={`group w-full min-w-0 overflow-hidden py-3 outline-none md:py-3.5 ${MASK}`}
                  tabIndex={0}
                  role="region"
                  aria-label="Funnel performance promise. Focus to pause scrolling."
                >
                  <div className="flex w-max animate-[heroMarquee_38s_linear_infinite] items-center will-change-transform group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center md:animate-[heroMarquee_52s_linear_infinite]">
                    {[0, 1].map((copy) => (
                      <ul
                        key={copy}
                        className={`m-0 flex w-max flex-none list-none items-center p-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${FOCUS_RUN_GAP} ${copy === 1 ? 'motion-reduce:hidden' : ''
                          }`}
                        aria-hidden={copy === 1 ? true : undefined}
                      >
                        {focusLines.map((line, index) => (
                          <li
                            key={`${copy}-${index}`}
                            className={`inline-flex flex-none items-center whitespace-nowrap text-[clamp(13px,3.7vw,15px)] font-bold leading-[1.45] text-[#2a2140] motion-reduce:whitespace-normal motion-reduce:text-center md:text-[clamp(14px,.6vw+10px,17px)] ${FOCUS_GAP} ${index > 0 ? 'motion-reduce:hidden' : ''
                              }`}
                            aria-hidden={
                              copy === 0 && index > 0 ? true : undefined
                            }
                          >
                            <span>{line}</span>
                            <span
                              aria-hidden="true"
                              className="h-[7px] w-[7px] flex-none rotate-45 rounded-sm bg-[linear-gradient(135deg,#8b5cf6,#e58a5c)] motion-reduce:hidden md:h-2 md:w-2"
                            />
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- Video + CTA ---------- */}
          <Reveal
            delay={200}
            className="relative mx-auto w-full max-w-full md:max-w-[560px] lg:ml-auto lg:mr-0 lg:max-w-[600px]"
          >
            {/* Violet glow behind the card */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[4%] -z-10 inset-x-[-6%] top-[10%] animate-[heroGlow_6s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(closest-side,#7c3aed4d,transparent_75%)] blur-[34px] motion-reduce:animate-none"
            />

            <div
              ref={tilt.ref}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
              className="relative w-full min-w-0 overflow-hidden rounded-[18px] bg-[#1b1233] shadow-[0_20px_40px_-24px_rgba(91,33,182,.65)] transition-[transform,box-shadow] duration-[350ms] ease-out md:rounded-[clamp(18px,3vw,28px)] md:shadow-[0_2px_4px_#14111f14,0_30px_60px_-28px_#5b21b6a6,0_50px_90px_-50px_#14111fb3] md:will-change-transform md:[transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(var(--lift,0px))] md:hover:[--lift:-5px] md:hover:shadow-[0_2px_4px_#14111f14,0_40px_70px_-28px_#5b21b6c4,0_50px_90px_-50px_#14111fb3] md:motion-reduce:[transform:none]"
            >
              <div className="relative isolate w-full min-w-0 bg-[#1b1233]">
                <HeroVideo />
              </div>

              <div className="relative z-[3] -mt-px bg-[radial-gradient(80%_90%_at_100%_100%,#7c3aed4d,transparent_70%),linear-gradient(180deg,#1b1233,#140d27)] px-2.5 pb-3 pt-2.5 min-[360px]:px-2.5 md:px-[clamp(12px,2.4vw,18px)] md:pb-[clamp(14px,2.2vw,18px)] md:pt-[clamp(12px,2vw,16px)]">
                <div className="flex w-full justify-center">
                  <Button className={HERO_BTN}>Yes! Let's Grow My Revenue</Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ================= FUNNEL FEATURES ================= */}
        <Reveal className="mt-11 w-full md:mt-[clamp(44px,8vw,96px)]">
          <section aria-labelledby="premium-hero-funnel-heading">
            <h2
              id="premium-hero-funnel-heading"
              className="font-display m-0 mx-auto w-full max-w-[920px] text-center text-[clamp(22px,4.6vw+6px,36px)] font-semibold normal-case leading-[1.3] tracking-[-0.02em] text-[#14111f] [text-wrap:balance]"
            >
              At{' '}
              <span className="font-bold text-[#5b21b6]">Creative Crew,</span>{' '}
              We Simplify Growth With A Complete Funnel System That Works
              Seamlessly.
            </h2>

            <ul className="m-0 mx-auto mt-6 grid w-full list-none grid-cols-1 gap-2.5 p-0 text-left min-[360px]:grid-cols-2 min-[480px]:gap-3 md:mt-[30px] md:max-w-[760px] md:gap-5 lg:mt-[clamp(26px,4.4vw,48px)] lg:max-w-none lg:grid-cols-4">
              {points.map((point, index) => (
                <PointCard key={point.text} point={point} index={index} />
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      {/* ================= SERVICES MARQUEE (full width) ================= */}
      <Reveal className="mt-[22px] w-full md:mt-[clamp(24px,4vw,48px)]">
        <div
          className={`group w-full min-w-0 overflow-hidden py-3 outline-none md:py-[18px] ${MASK}`}
          tabIndex={0}
          role="region"
          aria-label="Landing page services. Focus to pause scrolling."
        >
          <div className="flex w-max animate-[heroMarquee_40s_linear_infinite] items-center will-change-transform group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center md:animate-[heroMarquee_46s_linear_infinite]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className={`m-0 flex w-max flex-none list-none items-center p-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3 motion-reduce:p-0 ${SERVICE_RUN_GAP} ${copy === 1 ? 'motion-reduce:hidden' : ''
                  }`}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {services.map((service) => (
                  <li
                    key={service.text}
                    className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border border-[#e5d7f7] bg-white/85 px-3.5 py-[9px] text-[13px] font-[650] leading-normal text-[#5b5870] shadow-[inset_0_1px_0_#fff,0_10px_20px_-16px_rgba(91,33,182,.5)] transition-[transform,border-color] duration-300 hover:-translate-y-[3px] hover:border-[#cdb6f6] motion-reduce:whitespace-normal motion-reduce:transition-none md:gap-2.5 md:px-[18px] md:py-3 md:text-sm"
                  >
                    <span className="text-[#7c3aed]">
                      <Icon
                        name={service.icon}
                        className="h-[18px] w-[18px] md:h-[19px] md:w-[19px]"
                      />
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

/* ==================== Font + keyframes (only non-utility CSS) ==================== */

const keyframes = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

.font-display {
  font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif;
}

@keyframes heroMarquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

@keyframes heroDrift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(3%, 5%, 0) scale(1.1); }
}

@keyframes heroGlow {
  from { opacity: .65; }
  to { opacity: 1; }
}

@keyframes heroSheen {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

@keyframes heroShine {
  0%, 55% { transform: translateX(0) skewX(-20deg); }
  100% { transform: translateX(520%) skewX(-20deg); }
}

@keyframes heroBob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
}

@keyframes heroRing {
  0% { opacity: .7; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.5); }
}
`
