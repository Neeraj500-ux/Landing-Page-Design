import { useCallback, useEffect, useRef, useState } from 'react'
import { ScanEye } from 'lucide-react'
import { Button } from './ui'

/* ==========================================================
   Hero.jsx (100% Tailwind utility classes) - FULLY RESPONSIVE
   Breakpoints used:
     phone  : < 480px   (single column, tight spacing)
     phone+ : 480-767px (a bit more air)
     tablet : 768-1023px (centered single column, max-w 720)
     laptop : 1024-1279px (2 columns, side padding 40px)
     desktop: 1280px+   (2 columns, 1180px max width)
   ========================================================== */

// Change this if your Vimeo video is not 16:9 (e.g. '4 / 5' or '1 / 1').
// This is what removes the empty grey area above/below the video.
const VIDEO_RATIO = '16 / 9'

const focusLines = Array(4).fill(
  'Guaranteed Better Funnel Performance. More Value From Every Ad Spend.'
)

const points = [
  { text: 'Communicate Your Offer Clearly.', icon: 'target', tone: 'peach' },
  { text: 'Custom Pixel Tracking To Optimize Your Ads.', icon: 'scan-eye', tone: 'purple' },
  { text: 'Make Enquiries And Bookings Simple.', icon: 'calendar', tone: 'gold' },
  { text: 'Build Credibility With Relevant Proof.', icon: 'shield', tone: 'purple' },
]

const services = [
  { text: 'Offer And Audience Discovery', icon: 'target' },
  { text: 'Persuasive Content', icon: 'edit' },
  { text: 'Custom Visual Design', icon: 'layers' },
  { text: 'Responsive Development', icon: 'devices' },
  { text: 'Booking Integration', icon: 'calendar' },
  { text: 'Tracking And Launch Setup', icon: 'chart' },
  { text: 'Clear Calls To Action', icon: 'cursor' },
  { text: 'Mobile-First Layouts', icon: 'phone' },
]

/* ==================== Shared class strings ==================== */

const VIOLET_FLOW =
  'bg-[linear-gradient(110deg,#6d28d9,#9b5cf0,#6d28d9)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[heroSheen_5s_ease-in-out_infinite_alternate] motion-reduce:animate-none'

const MASK =
  '[mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)] motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]'

// Pause marquee only on real hover devices / keyboard focus (never on tap)
const MARQUEE_PAUSE =
  '[@media(hover:hover)]:group-hover:[animation-play-state:paused] [@media(hover:hover)]:group-focus-within:[animation-play-state:paused]'

const FOCUS_GAP = 'gap-4 min-[480px]:gap-5 md:gap-[clamp(22px,3vw,44px)]'
const FOCUS_RUN_GAP =
  'gap-4 pr-4 min-[480px]:gap-5 min-[480px]:pr-5 md:gap-[clamp(22px,3vw,44px)] md:pr-[clamp(22px,3vw,44px)]'

const SERVICE_RUN_GAP =
  'gap-2 pr-2 min-[480px]:gap-2.5 min-[480px]:pr-2.5 md:gap-3.5 md:pr-3.5 lg:gap-4 lg:pr-4'

const HERO_BTN =
  'site-cta--revenue !relative !isolate !inline-flex !min-h-[52px] !w-full !min-w-0 !max-w-full !items-center !justify-center !gap-2 !overflow-hidden !whitespace-normal !rounded-[13px] !border !border-[#f3b01f] ' +
  '!bg-[linear-gradient(180deg,#ffee82,#ffe04e_48%,#ffca30)] !px-3.5 !py-3 !text-center !text-[15px] !font-extrabold !leading-[1.35] !text-[#2e0c4d] !no-underline ' +
  '!shadow-[inset_0_1px_0_#fff8c4,inset_0_-2px_4px_#f5b2144d,0_4px_0_#d18f0a,0_14px_24px_-10px_#f5b323a0] ' +
  'min-[480px]:!text-base md:!min-h-[54px] md:!rounded-[14px] md:!px-[clamp(14px,4vw,30px)] md:!text-[clamp(15px,1.4vw,17px)] ' +
  'transition-[transform,box-shadow,filter] duration-200 [-webkit-tap-highlight-color:transparent] touch-manipulation ' +
  '[@media(hover:hover)]:hover:!-translate-y-[3px] [@media(hover:hover)]:hover:!brightness-105 [@media(hover:hover)]:hover:!shadow-[inset_0_1px_0_#fff8c4,0_7px_0_#d18f0a,0_22px_36px_-12px_#f5b323c0] ' +
  'active:!translate-y-[2px] ' +
  'focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#a98af0] ' +
  'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-1/2 before:top-0 before:-z-10 before:bg-[linear-gradient(180deg,#ffffff40,transparent)] ' +
  'after:pointer-events-none after:absolute after:inset-y-0 after:-left-[45%] after:-z-10 after:w-[32%] after:animate-[heroShine_5.5s_ease-in-out_2s_infinite] after:bg-[linear-gradient(100deg,transparent,#ffffff99,transparent)] motion-reduce:after:hidden'

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
    sparkle: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />,
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
      className="block h-5 w-5 shrink-0"
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
      { threshold: 0.05, rootMargin: '0px 0px -2% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`min-w-0 max-w-full transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        seen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
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

// 44px touch target on phones/tablets, 40px on laptops
const VIDEO_BTN =
  'pointer-events-auto inline-grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/25 bg-[rgba(20,17,31,.6)] p-0 text-white ' +
  '[-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)] [-webkit-tap-highlight-color:transparent] touch-manipulation ' +
  'transition-[transform,background-color] duration-200 [@media(hover:hover)]:hover:scale-105 [@media(hover:hover)]:hover:bg-[#7c3aed] active:scale-95 active:bg-[#7c3aed] ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] lg:h-10 lg:w-10'

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
    const target = frameRef.current || wrapRef.current

    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen()
        else document.webkitExitFullscreen?.()
        return
      }

      if (target?.requestFullscreen) target.requestFullscreen()
      else if (target?.webkitRequestFullscreen) target.webkitRequestFullscreen()
      else post('requestFullscreen') // iOS Safari fallback
    } catch {
      /* Fullscreen is not available on this device */
    }
  }

  return (
    <figure
      ref={wrapRef}
      style={{ aspectRatio: VIDEO_RATIO }}
      className="relative m-0 w-full min-w-0 overflow-hidden bg-[#1b1233]"
    >
      <iframe
        ref={frameRef}
        className="absolute inset-0 block h-full w-full max-w-full border-0 bg-[#1b1233]"
        src={VIMEO_SRC}
        title="Creative Crew Landing Page Preview"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="eager"
        onLoad={onLoad}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-[linear-gradient(180deg,transparent,#14111f8c)]"
      />

      {/* Tap the video itself to play or pause */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause Video' : 'Play Video'}
        className="absolute inset-0 z-[2] h-full w-full cursor-pointer touch-manipulation border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0]"
      />

      <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 z-[3] flex items-center justify-between gap-2 min-[480px]:inset-x-2 min-[480px]:bottom-2 md:inset-x-3 md:bottom-3">
        <div className="flex items-center gap-1.5 min-[480px]:gap-2">
          <button
            type="button"
            className={VIDEO_BTN}
            onClick={togglePlay}
            aria-label={playing ? 'Pause Video' : 'Play Video'}
            aria-pressed={!playing}
          >
            <ControlIcon name={playing ? 'pause' : 'play'} />
          </button>

          <button
            type="button"
            className={VIDEO_BTN}
            onClick={toggleMute}
            aria-label={muted ? 'Unmute Video' : 'Mute Video'}
            aria-pressed={!muted}
          >
            <ControlIcon name={muted ? 'muted' : 'volume'} />
          </button>
        </div>

        <button
          type="button"
          className={VIDEO_BTN}
          onClick={goFullscreen}
          aria-label="Toggle Fullscreen"
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
        className={`group relative h-full min-w-0 overflow-hidden rounded-2xl border px-3 pb-[18px] pt-3.5 shadow-[inset_0_1px_0_#fff,0_24px_38px_-27px_rgba(91,33,182,.5),0_5px_12px_-7px_rgba(91,33,182,.17)] [-webkit-backdrop-filter:blur(20px)] [backdrop-filter:blur(20px)] transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] [@media(hover:hover)]:hover:-translate-y-[5px] [@media(hover:hover)]:hover:shadow-[inset_0_1px_0_#fff,0_32px_46px_-26px_rgba(91,33,182,.56),0_5px_12px_-7px_rgba(91,33,182,.17)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[480px]:rounded-[18px] min-[480px]:px-3.5 min-[480px]:pb-5 min-[480px]:pt-4 md:px-5 md:pb-6 md:pt-5 lg:rounded-[22px] lg:px-4 lg:pb-7 lg:pt-5 xl:rounded-[26px] xl:px-6 xl:pb-[30px] xl:pt-[26px] ${tone.card}`}
      >
        <div className="flex w-full min-w-0 items-center justify-between gap-1.5 md:items-start md:gap-3">
          <span
            className="relative inline-flex animate-[heroBob_4.5s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationDelay: `${index * 0.4}s` }}
            aria-hidden="true"
          >
            <span
              className={`pointer-events-none absolute inset-0 rounded-xl border opacity-0 [@media(hover:hover)]:group-hover:animate-[heroRing_1.5s_ease-out_infinite] motion-reduce:hidden md:rounded-2xl ${tone.ring}`}
            />
            <span
              className={`relative grid h-9 w-9 flex-none place-items-center rounded-xl border min-[480px]:h-10 min-[480px]:w-10 md:h-[54px] md:w-[54px] md:rounded-2xl lg:h-12 lg:w-12 xl:h-[54px] xl:w-[54px] ${tone.tile}`}
            >
              <Icon
                name={point.icon}
                className="h-[19px] w-[19px] origin-center transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] [@media(hover:hover)]:group-hover:-rotate-6 [@media(hover:hover)]:group-hover:scale-110 min-[480px]:h-5 min-[480px]:w-5 md:h-[25px] md:w-[25px]"
              />
            </span>
          </span>

          <span
            className={`grid h-7 w-7 flex-none place-items-center rounded-[9px] border bg-white/85 text-xs font-extrabold leading-none tabular-nums text-[#5b3291] shadow-[inset_0_1px_0_#fff,0_4px_10px_rgba(91,33,182,.03)] md:h-[38px] md:w-[38px] md:rounded-xl md:text-[15px] lg:h-9 lg:w-9 xl:h-[38px] xl:w-[38px] ${tone.number}`}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="m-0 mt-3.5 text-[13px] font-semibold leading-[1.55] text-[#5b5870] [overflow-wrap:break-word] min-[480px]:text-sm md:mt-6 md:text-[clamp(15px,1.4vw,17px)] md:leading-[1.65] lg:mt-5 lg:text-[15px] xl:mt-6 xl:text-[17px]">
          {point.text}
        </p>

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-3.5 bottom-0 h-[3px] origin-left scale-x-[.3] rounded-t-[3px] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:scale-x-[.14] [@media(hover:hover)]:group-hover:scale-x-100 motion-reduce:transition-none md:inset-x-5 lg:inset-x-4 xl:inset-x-6 ${tone.bar}`}
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
      className="relative isolate w-full min-w-0 max-w-full overflow-x-clip bg-[radial-gradient(55%_42%_at_100%_0%,#efe6ff,transparent_70%),radial-gradient(40%_34%_at_0%_8%,#f6f0ff,transparent_72%),radial-gradient(60%_36%_at_85%_65%,#f3ecff,transparent_72%),#fff] pb-[max(28px,env(safe-area-inset-bottom))] pt-[var(--hero-top-space,20px)] font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[#14111f] antialiased [-webkit-text-size-adjust:100%] [text-size-adjust:100%] md:pb-[clamp(28px,4vw,48px)] md:pt-[var(--hero-top-space,clamp(28px,5vw,72px))]"
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
        className="pointer-events-none absolute right-[-8%] top-[4%] -z-10 aspect-square w-[min(46vw,520px)] animate-[heroDrift_16s_ease-in-out_infinite_alternate] rounded-full bg-[#7c3aed24] blur-[48px] motion-reduce:animate-none md:blur-[70px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[52%] -z-10 aspect-square w-[min(40vw,440px)] animate-[heroDrift_16s_ease-in-out_-6s_infinite_alternate] rounded-full bg-[#ffeadb99] blur-[48px] motion-reduce:animate-none md:blur-[70px]"
      />

      {/* Side padding: phone 16 / 480+ 20 / tablet 32 / laptop 40 / desktop 0 (max-w centers it) */}
      <div className="mx-auto w-full min-w-0 max-w-[1180px] px-4 min-[480px]:px-5 md:px-8 lg:px-10 min-[1260px]:px-0">
        {/* ================= HERO STAGE ================= */}
        <div className="mx-auto grid max-w-[720px] grid-cols-1 items-center gap-5 min-[480px]:gap-[22px] md:gap-[clamp(24px,5vw,40px)] lg:max-w-none lg:grid-cols-[minmax(0,.94fr)_minmax(0,1.06fr)] lg:gap-[clamp(28px,3.5vw,60px)]">
          {/* ---------- Copy ---------- */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            <Reveal className="w-full">
              <p className="relative m-0 w-full overflow-hidden rounded-[22px] border border-[#e0d2ff] bg-[linear-gradient(180deg,#f6f1ff,#efe7ff)] px-3.5 py-2.5 text-center text-[clamp(13.5px,3.9vw,17px)] font-semibold leading-[1.5] text-[#2a2140] shadow-[inset_0_1px_0_#fff,0_10px_24px_-16px_rgba(124,58,237,.5)] [overflow-wrap:break-word] [text-wrap:balance] after:pointer-events-none after:absolute after:inset-y-0 after:-left-[40%] after:w-[36%] after:animate-[heroShine_6s_ease-in-out_1.2s_infinite] after:bg-[linear-gradient(100deg,transparent,#ffffffb3,transparent)] motion-reduce:after:hidden min-[480px]:rounded-[26px] min-[480px]:px-4 min-[480px]:py-3 min-[480px]:leading-[1.55] md:px-5 md:py-3.5 md:text-[clamp(16px,1.65vw,21px)] lg:text-left lg:text-[clamp(15px,1.45vw,19px)]">
                We Don’t Just Build Landing Pages.
                <br />
                We Build Complete Automated Funnels.
              </p>
            </Reveal>

            {/* Title: container = column width, so the heading scales with it */}
            <Reveal delay={90} className="w-full [container-type:inline-size]">
              <h1
                id="premium-hero-title"
                className="font-display m-0 mt-4 w-full text-center text-[clamp(17px,7.1cqw,41px)] font-extrabold capitalize leading-[1.1] tracking-[-0.04em] text-[#14111f] md:mt-[clamp(16px,2.4vw,26px)] md:text-[clamp(30px,7.7cqw,64px)] md:leading-[1.08] md:tracking-[-0.035em] lg:text-left"
              >
                {/* Tablet + laptop + desktop */}
                <span className="block max-md:hidden">
                  <span className="block whitespace-nowrap">
                    Generate More <span className={VIOLET_FLOW}>Leads &amp;</span>
                  </span>
                  <span className="block whitespace-nowrap">
                    <span className={VIOLET_FLOW}>Revenue</span> Without
                  </span>
                  <span className="block w-full whitespace-nowrap tracking-[-0.04em]">
                    Spending More <span className={VIOLET_FLOW}>Ad Spend</span>
                  </span>
                </span>

                {/* Phones */}
                <span className="flex flex-col items-center gap-0.5 whitespace-nowrap md:hidden">
                  <span className="block w-full whitespace-nowrap text-center leading-[1.1] tracking-[-0.045em]">
                    Generate More <span className={VIOLET_FLOW}>Leads</span>
                  </span>
                  <span className="block w-full whitespace-nowrap text-center leading-[1.1] tracking-[-0.045em]">
                    <span className={VIOLET_FLOW}>&amp; Revenue</span> Without
                  </span>
                  <span className="block w-full whitespace-nowrap text-center leading-[1.1] tracking-[-0.045em]">
                    Spending More <span className={VIOLET_FLOW}>Ad Spend</span>
                  </span>
                </span>
              </h1>
            </Reveal>

            {/* Subtitle */}
            <Reveal delay={180} className="w-full">
              <p className="m-0 mx-auto mt-3.5 w-full px-1 text-center text-[clamp(14.5px,4.1vw,17px)] font-bold leading-[1.45] text-[#2b2938] [overflow-wrap:break-word] [text-wrap:pretty] min-[480px]:max-w-[520px] min-[480px]:px-2 min-[480px]:text-[clamp(16px,.8vw+13.5px,20px)] min-[480px]:leading-[1.55] md:mt-[clamp(14px,2vw,20px)] md:max-w-[620px] md:leading-[1.6] lg:mx-0 lg:max-w-[540px] lg:px-0 lg:text-left lg:text-[clamp(16px,1.2vw,19px)]">
                Stop Spending On Low-Converting Pages. Build A High-Converting Automated
                Funnel That Helps You Reduce CPL And Increase ROI. From The Day 1
              </p>
            </Reveal>

            {/* Promise marquee */}
            <Reveal delay={260} className="mt-5 w-full md:mt-[clamp(20px,3vw,32px)]">
              <div className="min-w-0 overflow-hidden rounded-[14px] border border-[#e0d2ff] bg-[linear-gradient(110deg,#ffffffd9,#f7f2ffd9_65%,#fff4ecd9)] shadow-[inset_0_1px_0_#fff,0_18px_36px_-26px_rgba(91,33,182,.55)] [-webkit-backdrop-filter:blur(18px)] [backdrop-filter:blur(18px)] transition-shadow duration-300 [@media(hover:hover)]:hover:shadow-[inset_0_1px_0_#fff,0_22px_40px_-24px_rgba(91,33,182,.7)] md:rounded-[18px]">
                <div
                  className={`group w-full min-w-0 overflow-hidden py-3 outline-none md:py-3.5 ${MASK}`}
                  tabIndex={0}
                  role="region"
                  aria-label="Funnel Performance Promise. Focus To Pause Scrolling."
                >
                  <div
                    className={`flex w-max animate-[heroMarquee_30s_linear_infinite] items-center will-change-transform ${MARQUEE_PAUSE} motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center md:animate-[heroMarquee_52s_linear_infinite]`}
                  >
                    {[0, 1].map((copy) => (
                      <ul
                        key={copy}
                        className={`m-0 flex w-max flex-none list-none items-center p-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${FOCUS_RUN_GAP} ${
                          copy === 1 ? 'motion-reduce:hidden' : ''
                        }`}
                        aria-hidden={copy === 1 ? true : undefined}
                      >
                        {focusLines.map((line, index) => (
                          <li
                            key={`${copy}-${index}`}
                            className={`inline-flex flex-none items-center whitespace-nowrap text-[clamp(13px,3.7vw,15px)] font-bold leading-[1.45] text-[#2a2140] motion-reduce:whitespace-normal motion-reduce:text-center md:text-[clamp(14px,.6vw+10px,17px)] ${FOCUS_GAP} ${
                              index > 0 ? 'motion-reduce:hidden' : ''
                            }`}
                            aria-hidden={copy === 0 && index > 0 ? true : undefined}
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
            className="relative mx-auto w-full max-w-full md:max-w-[640px] lg:ml-auto lg:mr-0 lg:max-w-[600px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[4%] -z-10 inset-x-[-4%] top-[10%] animate-[heroGlow_6s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(closest-side,#7c3aed4d,transparent_75%)] blur-[26px] motion-reduce:animate-none md:inset-x-[-6%] md:blur-[34px]"
            />

            <div
              ref={tilt.ref}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
              className="relative w-full min-w-0 overflow-hidden rounded-[18px] bg-[#1b1233] shadow-[0_20px_40px_-24px_rgba(91,33,182,.65)] transition-[transform,box-shadow] duration-[350ms] ease-out md:rounded-[clamp(18px,3vw,28px)] md:shadow-[0_2px_4px_#14111f14,0_30px_60px_-28px_#5b21b6a6,0_50px_90px_-50px_#14111fb3] lg:will-change-transform lg:[transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateY(var(--lift,0px))] lg:hover:[--lift:-5px] lg:hover:shadow-[0_2px_4px_#14111f14,0_40px_70px_-28px_#5b21b6c4,0_50px_90px_-50px_#14111fb3] lg:motion-reduce:[transform:none]"
            >
              <div className="relative isolate w-full min-w-0 bg-[#1b1233]">
                <HeroVideo />
              </div>

              <div className="relative z-[3] -mt-px bg-[radial-gradient(80%_90%_at_100%_100%,#7c3aed4d,transparent_70%),linear-gradient(180deg,#1b1233,#140d27)] px-2.5 pb-3 pt-2.5 min-[480px]:px-3 md:px-[clamp(12px,2.4vw,18px)] md:pb-[clamp(14px,2.2vw,18px)] md:pt-[clamp(12px,2vw,16px)]">
                <div className="flex w-full justify-center">
                  <Button className={HERO_BTN}>Yes! Let's Grow My Revenue</Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ================= FUNNEL FEATURES ================= */}
        <Reveal className="mt-10 w-full md:mt-[clamp(44px,8vw,96px)]">
          <section aria-labelledby="premium-hero-funnel-heading">
            <h2
              id="premium-hero-funnel-heading"
              className="font-display m-0 mx-auto w-full max-w-[920px] text-center text-[clamp(20px,4.6vw+5px,36px)] font-semibold normal-case leading-[1.3] tracking-[-0.02em] text-[#14111f] [overflow-wrap:break-word] [text-wrap:balance]"
            >
              At <span className="font-bold text-[#5b21b6]">Creative Crew,</span> We
              Simplify Growth With A Complete Funnel System That Works Seamlessly.
            </h2>

            <ul className="m-0 mx-auto mt-5 grid w-full list-none grid-cols-1 gap-2.5 p-0 text-left min-[340px]:grid-cols-2 min-[480px]:mt-6 min-[480px]:gap-3 md:mt-[30px] md:max-w-[760px] md:gap-5 lg:mt-[clamp(26px,4.4vw,48px)] lg:max-w-none lg:grid-cols-4 lg:gap-4 xl:gap-5">
              {points.map((point, index) => (
                <PointCard key={point.text} point={point} index={index} />
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      {/* ================= SERVICES MARQUEE (full width) ================= */}
      <Reveal className="mt-5 w-full md:mt-[clamp(24px,4vw,48px)]">
        <div
          className={`group w-full min-w-0 overflow-hidden py-3 outline-none md:py-[18px] ${MASK}`}
          tabIndex={0}
          role="region"
          aria-label="Landing Page Services. Focus To Pause Scrolling."
        >
          <div
            className={`flex w-max animate-[heroMarquee_32s_linear_infinite] items-center will-change-transform ${MARQUEE_PAUSE} motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center md:animate-[heroMarquee_46s_linear_infinite]`}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className={`m-0 flex w-max flex-none list-none items-center p-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3 motion-reduce:p-0 ${SERVICE_RUN_GAP} ${
                  copy === 1 ? 'motion-reduce:hidden' : ''
                }`}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {services.map((service) => (
                  <li
                    key={service.text}
                    className="inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-full border border-[#e5d7f7] bg-white/85 px-3 py-2 text-[12.5px] font-[650] leading-normal text-[#5b5870] shadow-[inset_0_1px_0_#fff,0_10px_20px_-16px_rgba(91,33,182,.5)] transition-[transform,border-color] duration-300 [@media(hover:hover)]:hover:-translate-y-[3px] [@media(hover:hover)]:hover:border-[#cdb6f6] motion-reduce:whitespace-normal motion-reduce:transition-none min-[480px]:px-3.5 min-[480px]:py-[9px] min-[480px]:text-[13px] md:gap-2.5 md:px-[18px] md:py-3 md:text-sm"
                  >
                    <span className="text-[#7c3aed]">
                      <Icon
                        name={service.icon}
                        className="h-4 w-4 min-[480px]:h-[18px] min-[480px]:w-[18px] md:h-[19px] md:w-[19px]"
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