import { useEffect, useId, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from './ui'

/* ==========================================================
   Problems.jsx  (Tailwind utility classes)
   - Problem / solution block is now an EXACT copy of the
     "StructuredApproach" cards (Traditional vs AnalyzerView):
     MOBILE : red card on top, VS badge, green card below
     DESKTOP: red + green side by side, VS in the middle
   - Content of this page is unchanged (same headings + same 5 points).
   - Keyframes + font live in the <style> block at the bottom.
   ========================================================== */

/* ==================== Content ==================== */

const ctaNote = ''

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

/* left %, size px, duration s, delay s */
const PARTICLES = [
  [6, 6, 9, 0],
  [18, 4, 11, 2.5],
  [32, 7, 10, 1],
  [47, 5, 12, 3.5],
  [60, 6, 9.5, 0.5],
  [74, 4, 11, 2],
  [86, 7, 10.5, 4],
  [95, 5, 12, 1.5],
]

/* ==================== Shared Tailwind class strings ==================== */

const GRADIENT_TEXT =
  'bg-[linear-gradient(110deg,#6a359b,#9a5ad4_55%,#6a359b)] bg-clip-text text-transparent'

const PILL =
  'mb-3.5 flex w-fit max-w-full items-center justify-center gap-2.5 rounded-full border border-[#ddcdf0] ' +
  'bg-[linear-gradient(180deg,#ffffffe6,#f6effbc0)] px-[13px] py-[9px] text-[11px] font-[650] leading-[1.6] ' +
  'text-[#6b3b8c] shadow-[0_8px_24px_#68428a0d,inset_0_1px_0_#fff] [text-wrap:balance] ' +
  'md:px-[18px] md:py-2.5 md:text-xs'

const PILL_DOT =
  'h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(135deg,#a066d6,#7542a4)] shadow-[0_0_0_4px_#8750b814] max-[359px]:hidden'

/* ==================== Motion hooks ==================== */

function useReducedMotion() {
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

/* ==================== Comparison cards (exact StructuredApproach style) ==================== */

/* floating dots: green rises, red falls */
function Particles({ up, color }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map(([left, size, t, dl], i) => (
        <span
          key={i}
          className={`ptl ${up ? 'ptl-up' : 'ptl-down'}`}
          style={{ left: `${left}%`, width: size, height: size, background: color, '--t': `${t}s`, '--dl': `${dl}s` }}
        />
      ))}
    </div>
  )
}

function CompareCard({ good, title, rows, order }) {
  return (
    <article
      className={`rv rv-up sheen relative grid overflow-hidden rounded-[28px] border-[3px] border-white transition-shadow duration-300 sm:rounded-[32px] ${
        good
          ? 'bg-gradient-to-br from-[#cdf2de] via-[#e4f8ed] to-[#f4fdf8] shadow-[0_18px_40px_-12px_rgba(22,163,74,.28)] hover:shadow-[0_24px_50px_-12px_rgba(22,163,74,.4)]'
          : 'bg-gradient-to-br from-[#fbd3da] via-[#fde5e9] to-[#fff5f6] shadow-[0_18px_40px_-12px_rgba(229,52,45,.25)] hover:shadow-[0_24px_50px_-12px_rgba(229,52,45,.38)] max-lg:pb-8'
      }`}
      style={{ '--i': order }}
    >
      <Particles up={good} color={good ? '#4fd18c' : '#f4909b'} />

      {/* header pill */}
      <header className={`relative z-10 col-span-full flex justify-center px-3 pt-5 sm:px-4 sm:pt-7 ${good ? 'max-lg:pt-11' : ''}`}>
        <div className="rv rv-zoom flex w-fit max-w-full items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-5 shadow-[0_8px_22px_rgba(0,0,0,.10)] sm:gap-3 sm:py-2.5 sm:pl-3 sm:pr-7">
          <span
            className={`${good ? 'glow-g bg-gradient-to-b from-[#2fd16b] to-[#12963f]' : 'glow-r bg-gradient-to-b from-[#ff5a52] to-[#d62a23]'} grid h-9 w-9 shrink-0 place-items-center rounded-full text-white sm:h-10 sm:w-10`}
          >
            {good ? <Check size={22} strokeWidth={4} /> : <X size={22} strokeWidth={3.6} className="wig" />}
          </span>
          <h3 className="text-[clamp(16px,4.4vw,26px)] font-extrabold leading-tight text-[#0a1f5c]">{title}</h3>
        </div>
      </header>

      {/* list */}
      <ul className="relative z-10 order-1 m-0 list-none space-y-2.5 px-4 py-5 sm:px-8 lg:py-8 lg:pl-8 lg:pr-8">
        {rows.map((t, i) => (
          <li key={t} className={`rv ${good ? 'rv-left' : 'rv-right'}`} style={{ '--i': i }}>
            <div className="row flex items-center gap-3 rounded-2xl border border-white/90 bg-white/65 px-3 py-2.5 text-[15.5px] font-medium leading-snug text-[#0a1f5c] backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] lg:text-[clamp(15px,1.3vw,17px)]">
              <span className="rv rv-pop shrink-0">
                <span
                  className={`${good ? 'glow-g bg-gradient-to-b from-[#2fd16b] to-[#12963f]' : 'glow-r bg-gradient-to-b from-[#ff6a62] to-[#df3029]'} grid h-7 w-7 place-items-center rounded-full text-white`}
                  style={{ animationDelay: `${i * 0.45}s` }}
                >
                  {good ? (
                    <Check size={16} strokeWidth={4.5} />
                  ) : (
                    <X size={15} strokeWidth={4.5} className="wig" style={{ animationDelay: `${i * 0.8}s` }} />
                  )}
                </span>
              </span>
              <span>{t}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

/* VS badge (outer = position, inner = animation) */
function VsBadge() {
  return (
    <div
      className="pointer-events-none z-30 mx-auto -my-[34px] lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
      aria-hidden="true"
    >
      <div className="rv rv-zoom relative" style={{ '--i': 5 }}>
        <span className="spin-slow absolute -inset-2.5 rounded-full border-2 border-dashed border-[#9a5ad4]/60" />
        <div className="ripple grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-[#a066d6] to-[#5a2a85] text-[24px] font-black text-white ring-[5px] ring-white sm:h-20 sm:w-20 sm:text-[30px] lg:h-[88px] lg:w-[88px] lg:text-[34px]">
          VS
        </div>
      </div>
    </div>
  )
}

/* ==================== Proof visual ==================== */

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

/* ==================== Complete component ==================== */

export default function Problems() {
  const headingId = useId()
  const reducedMotion = useReducedMotion()
  const proofRef = useRef(null)
  const proofVisible = useInViewOnce(proofRef, reducedMotion)
  const cmpRef = useRef(null)
  const cmpVisible = useInViewOnce(cmpRef, reducedMotion)

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

        {/* Mobile: red card, VS, green card. Desktop: side by side with VS in the middle. */}
        <div className="sa relative mt-8 md:mt-[clamp(36px,5vw,60px)]">
          {/* drifting background glows */}
          <div className="blob pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-[#ffb3bf]/40 blur-3xl" />
          <div className="blob pointer-events-none absolute -right-24 top-16 -z-10 h-80 w-80 rounded-full bg-[#7ee8b0]/40 blur-3xl" style={{ animationDelay: '-6s' }} />
          <div className="blob pointer-events-none absolute -top-16 left-1/3 -z-10 h-64 w-64 rounded-full bg-[#9db8ff]/40 blur-3xl" style={{ animationDelay: '-3s' }} />

          <div ref={cmpRef} className={cmpVisible ? 'is-in' : ''}>
            <div className="relative grid gap-y-4 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0">
              <CompareCard
                title="What Holds Visitors Back"
                rows={items.map((item) => item.problem.title)}
                order={3}
              />

              <VsBadge />

              <CompareCard
                good
                title="How We Fix It"
                rows={items.map((item) => item.solution.title)}
                order={4}
              />
            </div>
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

        {/* ============ Proof ============ */}
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
   Font import + keyframes (Tailwind can't declare these by itself). */

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

/* ---- comparison cards (copied from StructuredApproach) ---- */
.sa .rv{opacity:0}
.sa .is-in .rv-up{animation:sa-up .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*110ms)}
.sa .is-in .rv-left{animation:sa-left .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*120ms + 250ms)}
.sa .is-in .rv-right{animation:sa-right .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*120ms + 250ms)}
.sa .is-in .rv-pop{animation:sa-pop .55s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i,0)*120ms + 450ms)}
.sa .is-in .rv-zoom{animation:sa-zoom .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:.15s}

.sa .ripple{animation:sa-ripple 2.4s ease-out infinite}
.sa .blob{animation:sa-blob 14s ease-in-out infinite alternate}
.sa .spin-slow{animation:sa-spin 14s linear infinite}
.sa .row{animation:sa-scan 6s ease-in-out infinite;animation-delay:calc(var(--i,0)*1s + 1.8s)}
.sa .glow-g{animation:sa-glow-g 2.6s ease-out infinite}
.sa .glow-r{animation:sa-glow-r 2.6s ease-out infinite}
.sa .wig{transform-origin:50% 50%;animation:sa-wig 4.5s ease-in-out infinite}
.sa .ptl{position:absolute;border-radius:9999px;opacity:0;pointer-events:none;animation-duration:var(--t);animation-delay:var(--dl);animation-iteration-count:infinite;animation-timing-function:linear}
.sa .ptl-up{bottom:-14px;animation-name:sa-pup}
.sa .ptl-down{top:-14px;animation-name:sa-pdown}
.sa .sheen::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);transform:translateX(-130%);animation:sa-shine 7s ease-in-out infinite 2s}

@keyframes sa-up{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes sa-left{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}
@keyframes sa-right{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}
@keyframes sa-pop{0%{opacity:0;transform:scale(0)}70%{opacity:1;transform:scale(1.2)}100%{opacity:1;transform:scale(1)}}
@keyframes sa-zoom{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes sa-ripple{0%{box-shadow:0 0 0 0 rgba(117,66,164,.5)}100%{box-shadow:0 0 0 26px rgba(117,66,164,0)}}
@keyframes sa-blob{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,-30px) scale(1.15)}}
@keyframes sa-spin{to{transform:rotate(360deg)}}
@keyframes sa-scan{
  0%,24%,100%{background-color:rgba(255,255,255,.65);box-shadow:0 4px 14px -6px rgba(10,31,92,.18)}
  4%,15%{background-color:rgba(255,255,255,1);box-shadow:0 12px 26px -8px rgba(10,31,92,.32)}
}
@keyframes sa-glow-g{
  0%{box-shadow:0 3px 8px rgba(22,163,74,.45),0 0 0 0 rgba(34,197,94,.55)}
  70%,100%{box-shadow:0 3px 8px rgba(22,163,74,.45),0 0 0 10px rgba(34,197,94,0)}
}
@keyframes sa-glow-r{
  0%{box-shadow:0 3px 8px rgba(229,52,45,.4),0 0 0 0 rgba(239,68,82,.5)}
  70%,100%{box-shadow:0 3px 8px rgba(229,52,45,.4),0 0 0 10px rgba(239,68,82,0)}
}
@keyframes sa-wig{
  0%,86%,100%{transform:rotate(0)}
  89%{transform:rotate(-14deg)}
  92%{transform:rotate(14deg)}
  95%{transform:rotate(-7deg)}
}
@keyframes sa-pup{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:.75}100%{transform:translateY(-440px) scale(1.15);opacity:0}}
@keyframes sa-pdown{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:.7}100%{transform:translateY(440px) scale(1.15);opacity:0}}
@keyframes sa-shine{0%,60%{transform:translateX(-130%)}100%{transform:translateX(130%)}}

@media (prefers-reduced-motion:reduce){
  .sa *,.sa *::before,.sa *::after{animation:none!important}
  .sa .rv{opacity:1!important;transform:none!important}
}
`