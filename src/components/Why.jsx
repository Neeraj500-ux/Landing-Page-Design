import { useEffect, useRef, useState } from 'react'
import { why } from '../data'
import { Container } from './ui'

/* ==========================================================
   Why.jsx  (100% Tailwind utility classes)
   - Same colors, same content as before.
   - Only keyframes live in the small <style> block at the
     bottom (Tailwind cannot declare keyframes by itself).
   - Arbitrary values only, so it works on Tailwind v3 and v4.
   ========================================================== */

/* ---------------------------------------------------------------
   ICONS
---------------------------------------------------------------- */
const iconSet = [
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.3" />
  </>,
  <>
    <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
  </>,
  <>
    <path d="m4 3 6 18 3-7 7-3L4 3Z" />
    <path d="m14 15 5 5" />
  </>,
  <>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M10 5h4m-3 14h2" />
  </>,
  <>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
    <path d="M9 11h6M9 14h3" />
  </>,
  <>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </>,
]

function WhyIcon({ index }) {
  return (
    <svg
      className="block h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-rotate-[8deg] group-hover:scale-110 min-[360px]:h-6 min-[360px]:w-6"
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
      {iconSet[index % iconSet.length]}
    </svg>
  )
}

/* ---------------------------------------------------------------
   SHARED CLASS STRINGS
---------------------------------------------------------------- */

// Moving purple -> orange gradient used on text and thin bars
const FLOW_GRADIENT =
  'bg-[linear-gradient(120deg,#6D35C9,#FF8A3D,#6D35C9)] bg-[length:200%_100%] animate-[gradientShift_5s_ease-in-out_infinite_alternate] motion-reduce:animate-none'

const GRADIENT_TEXT = `${FLOW_GRADIENT} bg-clip-text text-transparent`

const EASE = 'ease-[cubic-bezier(.2,.7,.2,1)]'

/* ---------------------------------------------------------------
   REVEAL ON SCROLL (fade + lift + de-blur, once)
---------------------------------------------------------------- */
function useInViewOnce(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [ref, visible, threshold])

  return visible
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const ref = useRef(null)
  const visible = useInViewOnce(ref)

  return (
    <Tag
      {...props}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transition-[opacity,transform,filter] duration-[900ms]',
        EASE,
        'motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none',
        visible
          ? 'translate-y-0 scale-100 opacity-100 blur-0'
          : 'translate-y-7 scale-[.97] opacity-0 blur-[6px]',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}

/* ---------------------------------------------------------------
   ANIMATED COUNTER
---------------------------------------------------------------- */
function Counter({ value, suffix = '', duration = 1800 }) {
  const counterRef = useRef(null)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      element.textContent = `${value}${suffix}`
      return
    }

    let frameId
    let observer
    let started = false

    const startCounter = () => {
      if (started) return
      started = true

      const startTime = performance.now()

      const animate = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.round(easedProgress * value)

        element.textContent = `${currentValue}${suffix}`

        if (progress < 1) {
          frameId = requestAnimationFrame(animate)
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    if (typeof IntersectionObserver === 'undefined') {
      startCounter()
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startCounter()
            observer.disconnect()
          }
        },
        { threshold: 0.3 },
      )

      observer.observe(element)
    }

    return () => {
      observer?.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [value, suffix, duration])

  return (
    <span
      ref={counterRef}
      aria-label={`${value}${suffix}`}
      className={`block whitespace-nowrap text-[40px] font-extrabold leading-none tracking-[-0.04em] tabular-nums min-[360px]:text-[clamp(44px,6.5vw,68px)] ${GRADIENT_TEXT}`}
    >
      0{suffix}
    </span>
  )
}

/* ---------------------------------------------------------------
   BACKDROP
---------------------------------------------------------------- */
function WhyBackdrop() {
  const dots = Array.from({ length: 16 })

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Floating color orbs */}
      <span className="absolute -left-40 -top-[140px] h-[min(520px,80vw)] w-[min(520px,80vw)] animate-[orbFloat_10s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,#9B5CF0_0%,transparent_70%)] opacity-[.55] blur-[90px] will-change-transform motion-reduce:animate-none" />
      <span className="absolute right-[-200px] top-[30%] h-[min(560px,85vw)] w-[min(560px,85vw)] animate-[orbFloatB_13s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,#FF8A3D_0%,transparent_70%)] opacity-[.45] blur-[90px] will-change-transform motion-reduce:animate-none" />
      <span className="absolute bottom-[-160px] left-[30%] h-[min(440px,75vw)] w-[min(440px,75vw)] animate-[orbFloat_10s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,#6D35C9_0%,transparent_70%)] opacity-40 blur-[90px] will-change-transform motion-reduce:animate-none" />

      {/* Slowly drifting grid */}
      <span className="absolute inset-0 animate-[gridDrift_24s_linear_infinite] opacity-50 [background-image:linear-gradient(rgba(109,53,201,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(109,53,201,.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_40%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_40%,transparent_80%)] motion-reduce:animate-none" />

      {/* Rising sparkles */}
      <div className="absolute inset-0 motion-reduce:hidden">
        {dots.map((_, i) => (
          <span
            key={i}
            className={`absolute h-1 w-1 animate-[dotFloat_8s_linear_infinite] rounded-full opacity-0 ${
              i % 3 === 0
                ? 'bg-[#FF8A3D] shadow-[0_0_8px_2px_rgba(255,138,61,.5)]'
                : 'bg-[#9B5CF0] shadow-[0_0_8px_2px_rgba(155,92,240,.5)]'
            }`}
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 61) % 100}%`,
              animationDelay: `${(i % 6) * 1.05}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   ONE CARD
---------------------------------------------------------------- */
function WhyCard({ index, title, desc }) {
  const warm = index % 2 === 1

  // Cursor-follow spotlight
  const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      onPointerMove={spotlight}
      /* Outer shell = the 1px gradient border. Inner layers sit on top. */
      className="group relative isolate h-full overflow-hidden rounded-[clamp(1.25rem,2vw,1.75rem)] bg-[linear-gradient(135deg,rgba(255,255,255,.95),rgba(109,53,201,.18)_45%,rgba(255,138,61,.25))] shadow-[0_1px_2px_rgba(48,32,69,.05),0_14px_30px_-18px_rgba(109,53,201,.35),0_32px_60px_-38px_rgba(48,32,69,.35)] transition-[transform,box-shadow] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(48,32,69,.05),0_24px_44px_-18px_rgba(109,53,201,.45),0_44px_76px_-42px_rgba(48,32,69,.42)] active:scale-[.985] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
    >
      {/* Spinning light that glows around the border on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 animate-[wySpin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#9B5CF0_70deg,#FF8A3D_130deg,transparent_200deg)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
      />

      {/* Glass surface */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-px z-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,.96),rgba(250,246,255,.88))] [backdrop-filter:blur(16px)_saturate(160%)] [-webkit-backdrop-filter:blur(16px)_saturate(160%)]"
      />

      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-px z-[1] rounded-[inherit] bg-[radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,0%),rgba(155,92,240,.16),rgba(255,138,61,.06)_55%,transparent_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Shine sweep (plays once each time you hover) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-1/4 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent)] opacity-0 group-hover:animate-[shine_1.1s_ease-out] motion-reduce:hidden"
      />

      {/* Top highlight line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] right-[10%] top-px z-[3] h-px bg-[linear-gradient(90deg,transparent,#fff,transparent)]"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col px-[1.1rem] pb-6 pt-[1.1rem] min-[360px]:px-[clamp(1.25rem,2vw,1.75rem)] min-[360px]:pt-[clamp(1.25rem,2vw,1.75rem)] min-[360px]:pb-[clamp(1.75rem,2.4vw,2.25rem)]">
        {/* Icon + number on one line */}
        <div className="flex items-center justify-between gap-3">
          {/* Idle bob lives on the wrapper, hover effects on the tile inside */}
          <span
            className="relative inline-flex animate-[tileBob_4.5s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            {/* Pulse ring on hover */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-[14px] border opacity-0 group-hover:animate-[ringPulse_1.5s_ease-out_infinite] motion-reduce:hidden min-[360px]:rounded-2xl ${
                warm ? 'border-[#FF8A3D]/60' : 'border-[#9B5CF0]/60'
              }`}
            />

            <span
              className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border shadow-[0_8px_16px_-10px_rgba(109,53,201,.55),inset_0_1px_0_#fff] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-0.5 min-[360px]:h-[3.25rem] min-[360px]:w-[3.25rem] min-[360px]:rounded-2xl ${
                warm
                  ? 'border-[rgba(255,138,61,.28)] bg-[linear-gradient(145deg,#fff,#FFE8D8)] text-[#E36F2C]'
                  : 'border-[rgba(109,53,201,.18)] bg-[linear-gradient(145deg,#fff,#EFE4FB)] text-[#6D35C9]'
              }`}
            >
              {/* inner hairline */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[3px] rounded-[11px] border border-white/80"
              />
              <WhyIcon index={index} />
            </span>
          </span>

          <span
            aria-hidden="true"
            className="grid h-7 min-w-8 shrink-0 place-items-center rounded-full border border-[rgba(109,53,201,.12)] bg-white/70 px-[.55rem] text-[.7rem] font-bold tabular-nums tracking-[.06em] text-[rgba(48,32,69,.55)] shadow-[inset_0_1px_0_#fff] transition-colors duration-300 group-hover:text-[#6D35C9]"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-[clamp(18px,2vw,22px)] text-[clamp(1.05rem,1.6vw,1.25rem)] font-bold leading-[1.35] tracking-[-0.015em] text-[#26103d] [overflow-wrap:break-word] [text-wrap:balance] transition-colors duration-300 group-hover:text-[#4a1f93]">
          {title}
        </h3>

        <p className="mt-2.5 text-[clamp(.9rem,1.3vw,1rem)] leading-[1.7] text-[rgba(48,32,69,.68)] [overflow-wrap:break-word] [text-wrap:pretty]">
          {desc}
        </p>
      </div>

      {/* Accent bar that grows on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-6 right-6 z-[4] h-[3px] origin-left scale-x-[.16] rounded-t-[3px] bg-[linear-gradient(90deg,#6D35C9,#FF8A3D)] transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none"
      />
    </div>
  )
}

/* ---------------------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------------------- */
export default function Why() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(155,92,240,.12),transparent_70%),linear-gradient(180deg,#ffffff_0%,#faf7ff_50%,#f3ecfa_100%)] py-[clamp(56px,7vw,110px)] font-[Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[#26103d] antialiased"
      aria-label="Why choose Creative Crew"
    >
      <style>{keyframes}</style>

      <WhyBackdrop />

      <Container>
        {/* ================= HEADER ================= */}
        <div className="relative z-10 mb-[clamp(32px,4.5vw,56px)] grid grid-cols-1 items-end gap-[clamp(28px,3.5vw,40px)] min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] min-[900px]:gap-[clamp(40px,6vw,80px)]">
          {/* LEFT: HEADING */}
          <div className="flex min-w-0 flex-col items-start text-left">
            <Reveal className="mb-4 inline-flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`inline-block h-0.5 w-7 shrink-0 rounded-full ${FLOW_GRADIENT}`}
              />
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[.14em] text-[#6D35C9]">
                Why it works
              </span>
            </Reveal>

            <Reveal delay={80} as="div" className="min-w-0">
              <h2 className="m-0 max-w-[15ch] text-[26px] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#26103d] [overflow-wrap:break-word] [text-wrap:balance] min-[360px]:text-[clamp(30px,4.6vw,52px)]">
                Why{' '}
                <span className={GRADIENT_TEXT}>Creative Crew?</span>
              </h2>
            </Reveal>

            <Reveal delay={160} className="min-w-0">
              <p className="mt-[clamp(14px,1.8vw,20px)] max-w-[42ch] text-[clamp(15px,1.5vw,18px)] font-normal leading-[1.65] tracking-[-0.005em] text-[rgba(48,32,69,.68)] [overflow-wrap:break-word] [text-wrap:pretty]">
                Your Expertise Deserves a Page That Explains It Well.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <span
                aria-hidden="true"
                className={`mt-[clamp(20px,2.4vw,28px)] block h-1 w-14 rounded-full ${FLOW_GRADIENT}`}
              />
            </Reveal>
          </div>

          {/* RIGHT: ANIMATED STATISTICS */}
          <div
            aria-label="Our approach"
            className="grid min-w-0 grid-cols-2 items-start gap-[clamp(16px,4vw,32px)] min-[900px]:flex min-[900px]:flex-wrap min-[900px]:items-end min-[900px]:justify-end min-[900px]:gap-[clamp(24px,3.4vw,48px)]"
          >
            <Reveal delay={120} className="relative flex min-w-0 flex-col gap-2 pl-2.5 min-[360px]:pl-3.5 md:gap-3 md:pl-5">
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-[linear-gradient(180deg,#6D35C9,#FF8A3D)] opacity-60"
              />
              <Counter value={6} duration={1600} />
              <span className="text-[13px] font-semibold leading-[1.4] tracking-[-0.01em] text-[rgba(48,32,69,.72)] min-[360px]:text-[clamp(14px,1.5vw,18px)]">
                Reasons to
                <br />
                build it right
              </span>
            </Reveal>

            <Reveal delay={220} className="relative flex min-w-0 flex-col gap-2 pl-2.5 min-[360px]:pl-3.5 md:gap-3 md:pl-5">
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-[linear-gradient(180deg,#6D35C9,#FF8A3D)] opacity-60"
              />
              <Counter value={100} suffix="%" duration={2000} />
              <span className="text-[13px] font-semibold leading-[1.4] tracking-[-0.01em] text-[rgba(48,32,69,.72)] min-[360px]:text-[clamp(14px,1.5vw,18px)]">
                Focused on
                <br />
                your goal
              </span>
            </Reveal>
          </div>
        </div>

        {/* ================= WHY CHOOSE US CARDS ================= */}
        <ul className="relative z-10 m-0 grid list-none grid-cols-1 gap-[clamp(14px,1.8vw,22px)] p-0 min-[640px]:grid-cols-2 min-[1080px]:grid-cols-3">
          {why.map(([title, desc], i) => (
            <Reveal
              as="li"
              key={title}
              delay={(i % 3) * 90}
              className="min-w-0"
            >
              <WhyCard index={i} title={title} desc={desc} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------
   KEYFRAMES (the only non-utility CSS)
---------------------------------------------------------------- */
const keyframes = `
@keyframes wySpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes orbFloat {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -18px, 0); }
}

@keyframes orbFloatB {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-14px, 16px, 0); }
}

@keyframes dotFloat {
  0% { opacity: 0; transform: translateY(0) scale(.6); }
  20% { opacity: .85; }
  80% { opacity: .5; }
  100% { opacity: 0; transform: translateY(-140px) scale(1); }
}

@keyframes gridDrift {
  from { background-position: 0 0; }
  to { background-position: 56px 56px; }
}

@keyframes gradientShift {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

@keyframes shine {
  0% { opacity: 1; transform: translateX(-120%) skewX(-14deg); }
  100% { opacity: 1; transform: translateX(520%) skewX(-14deg); }
}

@keyframes ringPulse {
  0% { opacity: .7; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.55); }
}

@keyframes tileBob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
}
`