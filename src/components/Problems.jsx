import { useEffect, useId, useRef, useState } from 'react'
import { Button } from './ui'

/* ==========================================================
   Problems.jsx  (100% Tailwind utility classes)
   - Only the Google font import, keyframes and .font-display
     live in the tiny <style> block at the bottom of this file.
   - Both section headings now have a same-colour underline
     (red heading = red line, green heading = green line).
   - Mobile titles are fluid and stay on ONE line
     (e.g. "Complete Funnel Tracking System").
   ========================================================== */

/* ==================== Content ==================== */

const ctaNote = ''

// Optional: replace the illustration with your own image.
const proofImage = ''
const proofImageAlt =
  'Landing page ad turning into a new enquiry and a booked consultation'

const items = [
  {
    problem: { title: 'Generic Landing Page Design' },
    solution: { title: 'Conversion-Focused Design' },
  },
  {
    problem: { title: 'No Proper Tracking Setup' },
    solution: { title: 'Pixel & Conversion Tracking' },
  },
  {
    problem: { title: 'No Automated Follow-Ups' },
    solution: { title: 'Automated Lead Follow-Ups' },
  },
  {
    problem: { title: 'Unclear Messaging & Offer' },
    solution: { title: 'Clear Messaging That Converts' },
  },
  {
    problem: { title: 'No Structured Funnel System' },
    solution: { title: 'Complete Funnel Tracking System' },
  },
]

const numberFormatter = new Intl.NumberFormat('en-US')

/* ==================== Shared Tailwind class strings ==================== */

// Purple gradient text
const GRADIENT_TEXT =
  'bg-[linear-gradient(110deg,#6a359b,#9a5ad4_55%,#6a359b)] bg-clip-text text-transparent'

// Pill label (same look for both sections, same gap under it)
const PILL =
  'mb-3.5 flex w-fit max-w-full items-center justify-center gap-2.5 rounded-full border border-[#ddcdf0] ' +
  'bg-[linear-gradient(180deg,#ffffffe6,#f6effbc0)] px-[13px] py-[9px] text-[11px] font-[650] leading-[1.6] ' +
  'text-[#6b3b8c] shadow-[0_8px_24px_#68428a0d,inset_0_1px_0_#fff] [text-wrap:balance] ' +
  'md:px-[18px] md:py-2.5 md:text-xs'

const PILL_DOT =
  'h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(135deg,#a066d6,#7542a4)] shadow-[0_0_0_4px_#8750b814] max-[359px]:hidden'

/* ==================== Motion hooks ==================== */

function useReducedMotion() {
  // Null prevents animations from starting before the preference is known.
  const [reducedMotion, setReducedMotion] = useState(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)

    update()

    if (media.addEventListener) {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }

    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  return reducedMotion
}

function useInViewOnce(ref, reducedMotion) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible || reducedMotion === null) return

    const element = ref.current
    if (!element) return

    if (reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, visible, reducedMotion])

  return visible
}

function useCounter(start, reducedMotion, target = 2000, duration = 2200) {
  const [value, setValue] = useState(1)
  const finished = useRef(false)

  useEffect(() => {
    if (!start || reducedMotion === null || finished.current) return

    if (reducedMotion) {
      finished.current = true
      setValue(target)
      return
    }

    let frameId
    let startedAt = null

    const tick = (timestamp) => {
      if (startedAt === null) startedAt = timestamp

      const progress = Math.min((timestamp - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      // Reserve the exact final value for the completion frame.
      const next =
        progress === 1
          ? target
          : Math.min(target - 1, Math.floor(1 + (target - 1) * eased))

      setValue((previous) => (previous === next ? previous : next))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        finished.current = true
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [start, reducedMotion, target, duration])

  return {
    value,
    complete: value === target,
  }
}

/* ==================== Small components ==================== */

function Reveal({
  children,
  reducedMotion,
  className = '',
  delay = 0,
  as: Tag = 'div',
  style,
  ...props
}) {
  const ref = useRef(null)
  const visible = useInViewOnce(ref, reducedMotion)
  const ready = reducedMotion !== null && !reducedMotion

  return (
    <Tag
      {...props}
      ref={ref}
      className={[
        'min-w-0',
        ready
          ? 'transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]'
          : '',
        ready && !visible ? 'translate-y-[22px] opacity-0' : 'translate-y-0 opacity-100',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...style, transitionDelay: ready ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}

function Icon({ type, className = 'h-6 w-6', strokeWidth = 2.2 }) {
  return (
    <svg
      className={`block shrink-0 ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {type === 'check' && <path d="m5 12 4 4L19 6" />}
      {type === 'cross' && <path d="M6 6l12 12M18 6 6 18" />}
      {type === 'arrow' && <path d="M5 12h14M13 6l6 6-6 6" />}
      {type === 'enquiry' && (
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      )}
    </svg>
  )
}

/* ---------- Liquid glass status icon ----------
   type="cross" -> red glass tile with a cut (X)
   type="check" -> green glass tile with a right (tick)
   Smaller on phones so the title gets more room.
   Every class is written out in full so Tailwind can see it. */

const GLASS_TONES = {
  cross: {
    glass:
      'bg-[linear-gradient(145deg,rgba(255,255,255,.9),rgba(255,255,255,.3)_45%,rgba(240,84,110,.5))] ' +
      'text-[#d12f4a] ' +
      'shadow-[inset_0_2px_0_rgba(255,255,255,1),inset_0_-8px_12px_-6px_rgba(240,84,110,.55),inset_0_0_0_1px_rgba(255,255,255,.45)]',
  },
  check: {
    glass:
      'bg-[linear-gradient(145deg,rgba(255,255,255,.9),rgba(255,255,255,.3)_45%,rgba(34,192,122,.5))] ' +
      'text-[#13804f] ' +
      'shadow-[inset_0_2px_0_rgba(255,255,255,1),inset_0_-8px_12px_-6px_rgba(34,192,122,.55),inset_0_0_0_1px_rgba(255,255,255,.45)]',
  },
}

function StatusIcon({ type }) {
  const tone = GLASS_TONES[type]

  return (
    <span
      aria-hidden="true"
      className={`relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/90 backdrop-blur-xl backdrop-saturate-200 transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none min-[400px]:h-9 min-[400px]:w-9 min-[400px]:rounded-[11px] sm:h-11 sm:w-11 sm:rounded-[14px] lg:h-12 lg:w-12 lg:rounded-2xl ${tone.glass}`}
    >
      {/* Top gloss */}
      <span className="pointer-events-none absolute left-1 right-1 top-[3px] h-1/2 rounded-b-[50%] rounded-t-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,0))] lg:left-1.5 lg:right-1.5 lg:rounded-t-[12px]" />
      {/* Tiny specular highlight */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 h-1 w-2 -rotate-[30deg] rounded-full bg-white/90 lg:left-2 lg:top-2 lg:h-1.5 lg:w-2.5" />

      <Icon
        type={type}
        strokeWidth={3.2}
        className="relative z-10 h-4 w-4 min-[400px]:h-[18px] min-[400px]:w-[18px] sm:h-5 sm:w-5 lg:h-6 lg:w-6"
      />
    </span>
  )
}

function Connector() {
  return (
    <div className="hidden place-items-center md:grid" aria-hidden="true">
      <span className="grid h-[34px] w-[34px] animate-[linkNudge_2.8s_ease-in-out_infinite] place-items-center rounded-full border border-[#ddcdf0] bg-white/85 text-[#7542a4] shadow-[0_5px_14px_#7542a410] motion-reduce:animate-none">
        <Icon type="arrow" className="h-4 w-4" />
      </span>
    </div>
  )
}

function RevenueButton({ intro = false }) {
  return (
    <Button
      className={`site-cta--revenue comparison-cta-button ${intro ? 'comparison-intro-button' : ''
        } max-md:w-full max-md:max-w-[420px]`}
    >
      Yes! Let's Grow My Revenue
    </Button>
  )
}

/* ---------- Column heading with same-colour underline ---------- */

const HEADING_TONES = {
  problem: {
    text: 'text-[#b83e51]',
    line: 'bg-[linear-gradient(90deg,#b83e51,#f0546e_60%,#f7b6c2)]',
  },
  solution: {
    text: 'text-[#20734e]',
    line: 'bg-[linear-gradient(90deg,#20734e,#22c07a_60%,#a9e3c8)]',
  },
}

function ColumnHeading({ kind, children }) {
  const tone = HEADING_TONES[kind]

  return (
    <h3
      className={`inline-block text-[23px] font-bold leading-[1.35] tracking-[-0.025em] md:text-[clamp(22px,2.1vw,27px)] ${tone.text}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`mt-1.5 block h-[3px] w-full rounded-full ${tone.line}`}
      />
    </h3>
  )
}

function ProofVisual({ playing }) {
  const play = playing
    ? '[animation-play-state:running]'
    : '[animation-play-state:paused]'

  if (proofImage) {
    return (
      <img
        className="block aspect-[4/3] h-auto w-full rounded-[17px] object-cover shadow-[0_14px_32px_#30204516] md:rounded-[20px]"
        src={proofImage}
        alt={proofImageAlt}
        width="640"
        height="480"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div className="flex min-w-0 flex-nowrap items-center justify-center gap-[clamp(8px,2.5vw,14px)] md:flex-wrap md:gap-7 lg:gap-6">
      {/* Phone */}
      <div
        className={`relative w-[48%] min-w-0 max-w-full basis-[48%] animate-[phoneFloat_7s_ease-in-out_infinite] rounded-[23px] border-4 border-[#302045] bg-white px-2 pb-[11px] pt-6 shadow-[0_18px_28px_#3020451c] motion-reduce:animate-none md:w-[202px] md:flex-none md:basis-[202px] md:rounded-[30px] md:border-[6px] md:px-3 md:pb-4 md:pt-[27px] ${play}`}
      >
        <div
          className="absolute left-1/2 top-0 h-3 w-[76px] -translate-x-1/2 rounded-b-[10px] bg-[#302045]"
          aria-hidden="true"
        />

        <div
          className="mb-3 grid grid-cols-[25px_minmax(0,1fr)] items-center gap-x-2 gap-y-[3px]"
          aria-hidden="true"
        >
          <span className="row-span-2 h-[25px] w-[25px] rounded-full bg-[linear-gradient(135deg,#9a5ad4,#e1c9f5)]" />
          <span className="block h-1.5 w-[76%] rounded-full bg-[#e8dff0]" />
          <span className="text-[8px] text-[#6c607e]">Sponsored</span>
        </div>

        <div
          className="relative aspect-[1.12] overflow-hidden rounded-[13px] bg-[linear-gradient(145deg,#eee2fa,#d9c2ed)]"
          aria-hidden="true"
        >
          <img
            src="/imge/Neeraj10.png"
            alt=""
            loading="lazy"
            className="block h-full w-full object-cover"
          />
        </div>

        <div className="grid gap-2 py-[15px]" aria-hidden="true">
          <span className="block h-1.5 w-[90%] rounded-full bg-[#bfa4d6]" />
          <span className="block h-1.5 w-full rounded-full bg-[#e8dff0]" />
          <span className="block h-1.5 w-[64%] rounded-full bg-[#e8dff0]" />
        </div>

        {/* Same Button as the other CTAs, so it opens the same form popup */}
        <Button className="site-cta--revenue !relative !m-0 !flex !min-h-0 !w-full !min-w-0 !items-center !justify-center !gap-2 !rounded-[9px] !border !border-[#f3b01f] !bg-[linear-gradient(180deg,#ffee82,#ffe04e_48%,#ffca30)] !p-2.5 !text-[10px] !font-extrabold !leading-[1.4] !text-[#2e0c4d] !shadow-[inset_0_1px_0_#fff8c4,0_3px_0_0_#d18f0a,0_8px_12px_-6px_#f5b323a0] active:!translate-y-0.5">
          <span>Learn More</span>
        </Button>
      </div>

      {/* Notes */}
      <div
        className="min-w-0 flex-1 basis-0 md:max-w-[300px] md:basis-[190px]"
        aria-hidden="true"
      >
        <div
          className={`flex animate-[noteFloat_8s_ease-in-out_infinite] items-start gap-2 rounded-[14px] border border-[#e4d8f3] bg-white/95 px-[9px] py-[11px] shadow-[0_10px_24px_#7542a410,inset_0_1px_0_#fff] motion-reduce:animate-none md:gap-3 md:rounded-[18px] md:px-3.5 md:py-[17px] ${play}`}
        >
          <span className="grid h-[27px] w-[27px] shrink-0 animate-[iconBob_5.2s_ease-in-out_infinite] place-items-center rounded-[10px] border border-[#e0cfee] bg-[linear-gradient(145deg,#fff,#f0e4fa)] text-[#7542a4] motion-reduce:animate-none md:h-8 md:w-8 md:rounded-[13px]">
            <Icon type="enquiry" className="h-[15px] w-[15px] md:h-[17px] md:w-[17px]" />
          </span>

          <div className="min-w-0">
            <strong className="block text-[10px] leading-[1.45] md:text-xs">New Enquiry</strong>
            <p className="mt-1.5 text-[9.5px] leading-[1.55] text-[#6c607e] md:text-[11px] md:leading-[1.65]">
              “Hi, Could You Share Pricing And Availability?”
            </p>
          </div>
        </div>

        <span className="ml-[21px] block h-4 w-px bg-[linear-gradient(#b99bd4,#b4d8c3)] md:ml-[30px] md:h-[22px]" />

        <div
          className={`flex animate-[noteFloat_8s_ease-in-out_infinite] items-start gap-2 rounded-[14px] border border-[#cfe5da] bg-[linear-gradient(140deg,#fff,#eef9f2)] px-[9px] py-[11px] shadow-[0_10px_24px_#7542a410,inset_0_1px_0_#fff] [animation-delay:-3s] motion-reduce:animate-none md:gap-3 md:rounded-[18px] md:px-3.5 md:py-[17px] ${play}`}
        >
          <span className="grid h-[27px] w-[27px] shrink-0 animate-[iconBob_5.2s_ease-in-out_infinite] place-items-center rounded-[10px] border border-[#cfe5da] bg-[#e7f5ec] text-[#20734e] motion-reduce:animate-none md:h-8 md:w-8 md:rounded-[13px]">
            <Icon type="check" className="h-[15px] w-[15px] md:h-[17px] md:w-[17px]" />
          </span>

          <div className="min-w-0">
            <strong className="block text-[10px] leading-[1.45] md:text-xs">Booking Confirmed</strong>
            <p className="mt-1.5 text-[9.5px] leading-[1.55] text-[#6c607e] md:text-[11px] md:leading-[1.65]">
              Your Team Continues The Conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==================== Problem / solution cards ==================== */

const CARD_TONES = {
  problem: {
    card:
      'border-[#efd6de] bg-[linear-gradient(130deg,#fffffff0,#fff1f5)] hover:border-[#e6c3cd] max-md:[order:var(--op)]',
    title: 'text-[#b83e51]',
    number: 'border-[#efd6de] text-[#b83e51]',
  },
  solution: {
    card:
      'border-[#cfe5da] bg-[linear-gradient(130deg,#fffffff0,#eef9f2)] hover:border-[#b7dbc8] max-md:[order:var(--os)]',
    title: 'text-[#20734e]',
    number: 'border-[#cfe5da] text-[#20734e]',
  },
}

function PairCard({ kind, number, title, delay, motionProps }) {
  const tone = CARD_TONES[kind]

  return (
    <article
      className={`group relative flex min-h-[58px] min-w-0 items-center rounded-[18px] border px-2.5 py-3 shadow-[0_1px_2px_#4422600a,0_12px_30px_#44226009,inset_0_1px_0_#fff] min-[400px]:min-h-[62px] min-[400px]:px-3.5 transition duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:shadow-[0_18px_36px_#44226014,inset_0_1px_0_#fff] active:scale-[.985] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:min-h-[76px] md:rounded-3xl md:px-[18px] md:py-3.5 md:active:scale-100 lg:min-h-[84px] lg:px-[24px] ${tone.card}`}
    >
      {/* Number badge: vertically centred on the card, smaller on phones */}
      <span
        className={`absolute right-2 top-1/2 grid h-6 min-w-[28px] -translate-y-1/2 place-items-center rounded-lg border bg-white/85 px-1 text-[10.5px] font-bold tabular-nums tracking-[0.02em] shadow-[0_3px_8px_#4422600a] md:right-4 md:h-7 md:min-w-[38px] md:rounded-[9px] md:px-[7px] md:text-[12.5px] lg:right-5 ${tone.number}`}
      >
        {number}
      </span>

      <Reveal {...motionProps} delay={delay} className="w-full">
        {/* Icon on the left, title on the right, both centred on the same line */}
        <div className="flex items-center gap-2 min-[400px]:gap-2.5 lg:gap-4">
          <StatusIcon type={kind === 'problem' ? 'cross' : 'check'} />

          <div className="min-w-0 flex-1 pr-8 md:pr-12 lg:pr-14">
            {/* Phone: fluid font 12.5px to 16.5px, no balance wrap so it stays on one line.
                md+: original sizing with balanced wrap. */}
            <h3
              className={`text-[clamp(12.5px,3.7vw,16.5px)] font-bold leading-[1.3] tracking-[-0.03em] md:text-[clamp(17px,1.9vw,21px)] md:tracking-[-0.028em] md:[text-wrap:balance] ${tone.title}`}
            >
              {title}
            </h3>
          </div>
        </div>
      </Reveal>
    </article>
  )
}

/* ==================== Complete component ==================== */

export default function Problems() {
  const headingId = useId()
  const reducedMotion = useReducedMotion()
  const proofRef = useRef(null)
  const proofVisible = useInViewOnce(proofRef, reducedMotion)

  const { value, complete } = useCounter(proofVisible, reducedMotion)

  const motionProps = { reducedMotion }

  return (
    <section
      className="relative isolate w-full min-w-0 max-w-full overflow-x-clip bg-[radial-gradient(ellipse_at_6%_6%,#eee3ffc0,transparent_42%),radial-gradient(ellipse_at_96%_82%,#e9dcfb90,transparent_42%),linear-gradient(180deg,#fff,#fcfaff_60%,#f8f3ff)] py-14 font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[#302045] antialiased md:py-[clamp(64px,8vw,116px)]"
      aria-labelledby={headingId}
    >
      <style>{styles}</style>

      {/* Soft corner glows */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 aspect-square w-[min(30vw,360px)] rounded-full bg-[radial-gradient(circle,#d9c2f860,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 aspect-square w-[min(30vw,360px)] rounded-full bg-[radial-gradient(circle,#d9c2f860,transparent_70%)]" />

      <div className="mx-auto w-[calc(100%_-_24px)] min-w-0 max-w-[1200px] min-[360px]:w-[calc(100%_-_32px)] md:w-[calc(100%_-_48px)]">
        {/* ============ Intro ============ */}
        <div className="mb-14 grid items-center gap-[26px] md:mb-[clamp(64px,8vw,100px)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)] lg:gap-[clamp(32px,5vw,72px)]">
          <Reveal
            {...motionProps}
            className="mx-auto w-full max-w-[720px] max-md:text-center lg:mx-0 lg:max-w-none"
          >
            <p className={`${PILL} max-md:mx-auto`}>
              <span className={PILL_DOT} />
              More Value From Every Click
            </p>

            <h2 className="font-display text-[clamp(28px,8vw,36px)] font-extrabold leading-[1.16] tracking-[-0.032em] [text-wrap:balance] max-md:mx-auto max-md:max-w-[17em] md:text-[clamp(32px,5vw,44px)] lg:text-[clamp(30px,4vw,48px)] lg:tracking-[-0.035em]">
              You’re Getting Clicks.{' '}
              <span className={GRADIENT_TEXT}>
                But Are They Turning Into Customers?
              </span>
            </h2>
          </Reveal>

          <Reveal
            {...motionProps}
            delay={80}
            className="mx-auto w-full max-w-[720px] lg:mx-0 lg:max-w-none"
          >
            {/* Card: slightly tighter side padding on phones so the heading gets more room */}
            <div className="relative rounded-3xl border border-[#e4d8f3] bg-[linear-gradient(150deg,#ffffffee,#f8f2fdd0)] px-4 py-5 shadow-[0_18px_48px_#5b21b611,inset_0_1px_0_#fff] backdrop-blur-[22px] transition duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none min-[400px]:px-5 min-[400px]:py-6 md:rounded-[28px] md:p-[clamp(26px,3vw,40px)] md:hover:-translate-y-1 md:hover:border-[#ccb0e2] md:hover:shadow-[0_24px_52px_#5b21b619,inset_0_1px_0_#fff]">
              <p className="w-full font-display text-[clamp(17px,5.3vw,22px)] font-bold leading-[1.4] tracking-[-0.02em] [text-wrap:pretty] md:text-[clamp(19px,1.9vw,23px)] md:leading-[1.4] md:[text-wrap:balance]">
                Unclear Offers And Distracting Pages Stop Interested Visitors
                From Taking The Next Step.
              </p>

              <p className="relative mt-4 pt-4 text-[15px] leading-[1.7] text-[#6c607e] [text-wrap:pretty] md:mt-[18px] md:pt-[18px] md:text-[clamp(15px,1.3vw,16.5px)] md:leading-[1.75]">
                <span className="absolute left-0 top-0 h-[3px] w-11 rounded-full bg-[linear-gradient(90deg,#ffca30,#ffe04e)]" />
                <span className="px-0.5 font-extrabold text-[#7542a4] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-[linear-gradient(transparent_62%,#ffe04e8c_62%)]">
                  Let’s Fix That.
                </span>{' '}
                At <strong className="font-bold text-[#302045]">Creative Crew</strong>, We Build Complete Growth
                Systems With High-Converting Landing Pages, Custom Tracking,
                Smart Automations, And Analytics—All Designed To Convert More
                Leads Into Clients And Generate More Revenue For Your Business.
              </p>

              <ul className="mt-5 grid list-none grid-cols-1 gap-2.5 p-0 min-[360px]:grid-cols-2 md:mt-[22px] md:gap-3">
                {[
                  ['2,000+', 'Landing Pages Created'],
                  ['1,000+', 'Professionals Grew Revenue'],
                ].map(([figure, label]) => (
                  <li
                    key={label}
                    className="flex min-w-0 flex-col gap-1 rounded-2xl border border-[#e4d8f3] bg-[linear-gradient(145deg,#fff,#f6eefb)] px-3 py-3 shadow-[0_8px_20px_#7542a40d,inset_0_1px_0_#fff] md:rounded-[18px] md:px-4 md:py-3.5"
                  >
                    <strong
                      className={`font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.03em] tabular-nums md:text-[clamp(24px,2.4vw,30px)] ${GRADIENT_TEXT}`}
                    >
                      {figure}
                    </strong>
                    <span className="text-xs font-semibold leading-[1.4] text-[#6c607e] md:text-[12.5px]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pb-[5px] max-md:flex max-md:justify-center md:mt-7">
                <RevenueButton intro />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ============ Problems and solutions ============ */}
        <Reveal
          {...motionProps}
          as="header"
          className="mx-auto max-w-[860px] text-center"
        >
          <span className={`${PILL} mx-auto`}>
            <span className={PILL_DOT} />
            Common Landing Page Problems &amp; Solutions
          </span>

          <h2
            id={headingId}
            className="font-display text-[clamp(27px,7vw,36px)] font-extrabold leading-[1.16] tracking-[-0.035em] [text-wrap:balance] md:text-[clamp(29px,3.9vw,42px)]"
          >
            Getting Clicks, But{' '}
            <span className={GRADIENT_TEXT}>Not Enough Enquiries?</span>
          </h2>
        </Reveal>

        <div className="mt-8 md:mt-[clamp(36px,5vw,60px)]">
          {/* Mobile: one column, all problems first then all solutions (via order). */}
          <div className="grid grid-cols-1 gap-y-3 md:grid-cols-[minmax(0,1fr)_46px_minmax(0,1fr)] md:gap-y-4 lg:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] lg:gap-y-[18px]">
            <Reveal
              {...motionProps}
              className="relative min-w-0 px-4 py-4 text-left md:mb-1 md:px-[18px] md:py-[22px] lg:px-[26px] lg:py-5"
            >
              <ColumnHeading kind="problem">What Holds Visitors Back</ColumnHeading>
            </Reveal>

            <div className="hidden md:block" aria-hidden="true" />

            <Reveal
              {...motionProps}
              delay={60}
              className="relative min-w-0 px-4 py-4 text-left max-md:order-[500] max-md:mt-5 md:mb-1 md:px-[18px] md:py-[22px] lg:px-[26px] lg:py-5"
            >
              <ColumnHeading kind="solution">How We Fix It</ColumnHeading>
            </Reveal>

            {items.map(({ problem, solution }, index) => {
              const number = String(index + 1).padStart(2, '0')

              return (
                <div
                  className="contents"
                  key={problem.title}
                  style={{ '--op': index + 1, '--os': index + 501 }}
                >
                  <PairCard
                    kind="problem"
                    number={number}
                    title={problem.title}
                    delay={Math.min(index * 35, 140)}
                    motionProps={motionProps}
                  />

                  <Connector />

                  <PairCard
                    kind="solution"
                    number={number}
                    title={solution.title}
                    delay={Math.min(index * 35 + 60, 200)}
                    motionProps={motionProps}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* ============ CTA ============ */}
        <Reveal {...motionProps}>
          <div className="mt-10 grid justify-items-center gap-[25px] rounded-3xl border border-[#e2d1ef] bg-[radial-gradient(ellipse_at_50%_0%,#eadcf875,transparent_70%),linear-gradient(150deg,#fff,#f6eefbe8)] px-5 pb-10 pt-9 text-center shadow-[0_18px_44px_#7542a40b,inset_0_1px_0_#fff] min-[360px]:px-5 md:mt-[clamp(40px,5vw,60px)] md:gap-7 md:rounded-[28px] md:px-7 md:py-[clamp(36px,5vw,58px)]">
            <h3 className="font-display max-w-[760px] text-[clamp(24px,6.5vw,30px)] font-extrabold leading-[1.22] tracking-[-0.035em] [text-wrap:balance] md:text-[clamp(25px,3.3vw,38px)]">
              Ready To Turn More Visits Into Conversations?
            </h3>

            <div className="flex w-full justify-center pb-[5px]">
              <RevenueButton />
            </div>

            {ctaNote ? (
              <p className="-mt-2.5 text-[13px] leading-[1.6] text-[#6c607e]">
                {ctaNote}
              </p>
            ) : null}
          </div>
        </Reveal>

        {/* ============ Proof (counter starts when this enters the viewport) ============ */}
        <div
          ref={proofRef}
          className="mt-[54px] grid items-center gap-[34px] md:mt-[clamp(60px,8vw,100px)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.03fr)] lg:gap-[clamp(32px,5vw,68px)]"
        >
          <Reveal
            {...motionProps}
            className="mx-auto w-full max-w-[720px] lg:mx-0 lg:max-w-none"
          >
            <div className="relative rounded-3xl border border-[#e1d2ef] bg-[radial-gradient(ellipse_at_20%_12%,#ffffffec,transparent_65%),linear-gradient(145deg,#f4eafd,#ece0f8)] px-3.5 py-5 shadow-[0_22px_50px_#7542a416,inset_0_1px_0_#fff] transition duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none md:rounded-[30px] md:p-[clamp(22px,3vw,34px)] md:hover:-translate-y-1 md:hover:shadow-[0_28px_55px_#7542a41c,inset_0_1px_0_#fff]">
              <ProofVisual playing={proofVisible} />
            </div>
          </Reveal>

          <Reveal
            {...motionProps}
            delay={80}
            className="mx-auto w-full max-w-[720px] lg:mx-0 lg:max-w-none"
          >
            <div className="mb-5 flex flex-col items-start gap-[9px] md:mb-[23px]">
              <span
                className="inline-grid whitespace-nowrap font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[clamp(58px,16vw,72px)] font-extrabold leading-[1.12] tracking-[-0.05em] tabular-nums md:text-[clamp(52px,5.5vw,76px)]"
                role="img"
                aria-label="More Than 2,000"
              >
                {/* Invisible final value fixes the width so the counter never jitters. */}
                <span
                  className="pointer-events-none invisible [grid-area:1/1]"
                  aria-hidden="true"
                >
                  2,000+
                </span>

                <span
                  className={`justify-self-end [grid-area:1/1] ${GRADIENT_TEXT}`}
                  aria-hidden="true"
                >
                  {numberFormatter.format(value)}
                  {complete ? '+' : ''}
                </span>
              </span>

              <span className="text-[11px] font-bold uppercase leading-[1.6] tracking-[.08em] text-[#6b3b8c] min-[360px]:tracking-[.12em]">
                Landing Pages Built
              </span>
            </div>

            <h2 className="font-display text-[clamp(28px,7.2vw,36px)] font-extrabold leading-[1.2] tracking-[-0.035em] [text-wrap:balance] md:text-[clamp(28px,3vw,38px)]">
              Built To Turn{' '}
              <span className={GRADIENT_TEXT}>Clicks Into Customers.</span>
            </h2>

            <p className="mt-[18px] text-base leading-[1.8] text-[#6c607e] [text-wrap:pretty] md:text-[15.5px]">
              At <strong className="text-[#302045]">Creative Crew</strong>, We
              Combine Landing Pages, Automation And Tracking To Create A
              Clearer Path From Interest To Enquiry.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ==================== The only non-utility CSS ====================
   Tailwind can't import fonts or declare keyframes by itself, so those
   live here. If your tailwind config already has these animations
   you can delete the keyframes. */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap');

.font-display {
  font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif;
}

@keyframes phoneFloat {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -5px, 0); }
}

@keyframes noteFloat {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
}

@keyframes iconBob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
}

@keyframes linkNudge {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 3px, 0); }
}
`