import { useEffect, useId, useRef, useState } from 'react'
import { Button } from './ui'

/* ==================== Content ==================== */

const ctaNote = ''

// Optional: replace the illustration with your own image.
const proofImage = ''
const proofImageAlt =
  'Landing page ad turning into a new enquiry and a booked consultation'

const items = [
  {
    problem: {
      title: 'Unclear Offer',
      description: 'Visitors can’t tell what you offer within seconds.',
    },
    solution: {
      title: 'Make Your Offer Clear',
      description: 'A sharp headline and focused message explain it instantly.',
    },
  },
  {
    problem: {
      title: 'Generic Design',
      description: 'Nothing sets you apart from competitors.',
    },
    solution: {
      title: 'Stand Out With Custom Design',
      description: 'Layout, colors and type built around your brand.',
    },
  },
  {
    problem: {
      title: 'Too Many Distractions',
      description: 'Competing elements pull visitors away.',
    },
    solution: {
      title: 'Focus On One Next Step',
      description: 'One goal and one clear call to action.',
    },
  },
  {
    problem: {
      title: 'Difficult Mobile Experience',
      description: 'Small screens make reading and tapping hard.',
    },
    solution: {
      title: 'Make Mobile Effortless',
      description: 'Readable text, easy buttons and simple forms.',
    },
  },
  {
    problem: {
      title: 'Low Visitor Confidence',
      description: 'Visitors aren’t sure they can trust you.',
    },
    solution: {
      title: 'Build Trust Quickly',
      description: 'Real testimonials, credentials and helpful FAQs.',
    },
  },
]

const numberFormatter = new Intl.NumberFormat('en-US')

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
        'comparison-reveal',
        ready ? 'is-motion-ready' : '',
        visible ? 'is-visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function Icon({ type, className = '' }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {type === 'check' && <path d="m5 12 4 4L19 6" />}
      {type === 'arrow' && <path d="M5 12h14M13 6l6 6-6 6" />}
      {type === 'enquiry' && (
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      )}
    </svg>
  )
}

function Connector() {
  return (
    <div className="comparison-link" aria-hidden="true">
      <span className="comparison-link-arrow">
        <Icon type="arrow" />
      </span>
    </div>
  )
}

function RevenueButton({ intro = false }) {
  return (
    <Button
      className={`site-cta--revenue comparison-cta-button ${intro ? 'comparison-intro-button' : ''
        }`}
    >
      Yes! Let's Grow My Revenue
    </Button>
  )
}

function ProofVisual() {
  if (proofImage) {
    return (
      <img
        className="comparison-proof-photo"
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
    <div className="comparison-proof-stage">
      <div className="comparison-proof-phone">
        <div className="comparison-proof-phone-notch" aria-hidden="true" />

        <div className="comparison-proof-ad-head" aria-hidden="true">
          <span className="comparison-proof-avatar" />
          <span className="comparison-proof-bar comparison-proof-bar--head" />
          <span className="comparison-proof-sponsored">Sponsored</span>
        </div>

        <div className="comparison-proof-ad-image" aria-hidden="true">
          <img src="/imge/Neeraj10.png" alt="" loading="lazy" />
        </div>

        <div className="comparison-proof-ad-lines" aria-hidden="true">
          <span className="comparison-proof-bar comparison-proof-bar--strong" />
          <span className="comparison-proof-bar" />
          <span className="comparison-proof-bar comparison-proof-bar--short" />
        </div>

        {/* Same Button as the other CTAs, so it opens the same form popup */}
        <Button className="site-cta--revenue comparison-proof-ad-button">
          <span>Learn more</span>

        </Button>
      </div>

      <div className="comparison-proof-notes" aria-hidden="true">
        <div className="comparison-proof-note">
          <span className="comparison-proof-note-icon">
            <Icon type="enquiry" />
          </span>

          <div>
            <strong>New enquiry</strong>
            <p>“Hi, could you share pricing and availability?”</p>
          </div>
        </div>

        <span className="comparison-proof-note-link" />

        <div className="comparison-proof-note comparison-proof-note--done">
          <span className="comparison-proof-note-icon">
            <Icon type="check" />
          </span>

          <div>
            <strong>Booking confirmed</strong>
            <p>Your team continues the conversation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==================== Styles ==================== */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap');

.landing-comparison {
  --c-ink: #302045;
  --c-muted: #6c607e;
  --c-red: #b83e51;
  --c-green: #20734e;
  --c-purple: #7542a4;

  /* Gap between a pill label and the heading under it.
     One value, used by BOTH sections, on desktop AND mobile. */
  --c-eyebrow-gap: 14px;

  /* Amber Glow button look (same as the Hero.jsx button) */
  --btn-text: #2e0c4d;
  --btn-bg: linear-gradient(180deg, #ffee82 0%, #ffe04e 48%, #ffca30 100%);
  --btn-border: #f3b01f;
  --btn-shadow:
    inset 0 1px 0 #fff8c4,
    inset 0 -2px 4px #f5b2144d,
    0 5px 0 0 #d18f0a,
    0 16px 28px -10px #f5b323a0;
  --btn-shadow-active:
    inset 0 1px 0 #fff8c4,
    inset 0 -2px 4px #f5b2144d,
    0 1px 0 0 #d18f0a,
    0 8px 16px -8px #f5b323a0;
  --btn-shadow-hover:
    inset 0 1px 0 #fff8c4,
    inset 0 -2px 4px #f5b2144d,
    0 8px 0 0 #d18f0a,
    0 24px 38px -12px #f5b323c0;

  --c-ease: cubic-bezier(.22, 1, .36, 1);
  --c-ease-spring: cubic-bezier(.34, 1.56, .64, 1);
  position: relative;
  isolation: isolate;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: clip;
  padding: clamp(64px, 8vw, 116px) 0;
  color: var(--c-ink);
  background:
    radial-gradient(ellipse at 6% 6%, #eee3ffc0, transparent 42%),
    radial-gradient(ellipse at 96% 82%, #e9dcfb90, transparent 42%),
    linear-gradient(180deg, #fff, #fcfaff 60%, #f8f3ff);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.landing-comparison,
.landing-comparison *,
.landing-comparison *::before,
.landing-comparison *::after {
  box-sizing: border-box;
}

.landing-comparison h2,
.landing-comparison h3,
.landing-comparison p {
  overflow-wrap: anywhere;
  margin-block: 0;
}

.landing-comparison svg {
  display: block;
  flex-shrink: 0;
  max-width: 100%;
}

.landing-comparison img {
  display: block;
  max-width: 100%;
  height: auto;
}

.landing-comparison::before,
.landing-comparison::after {
  content: "";
  position: absolute;
  z-index: -1;
  width: min(30vw, 360px);
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, #d9c2f860, transparent 70%);
}

.landing-comparison::before { top: 0; left: 0; }
.landing-comparison::after { bottom: 0; right: 0; }

.comparison-container {
  width: min(1200px, calc(100% - 48px));
  min-width: 0;
  margin-inline: auto;
}

/* ---------- Entrances ---------- */

.comparison-reveal {
  min-width: 0;
}

.comparison-reveal.is-motion-ready:not(.is-visible) {
  opacity: 0;
  transform: translate3d(0, 22px, 0);
}

.comparison-reveal.is-motion-ready {
  transition:
    opacity 800ms var(--c-ease) var(--reveal-delay, 0ms),
    transform 800ms var(--c-ease) var(--reveal-delay, 0ms);
}

.comparison-reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* ---------- Intro ---------- */

.comparison-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.04fr);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
  margin-bottom: clamp(64px, 8vw, 100px);
}

.comparison-intro-left,
.comparison-intro-right,
.comparison-proof-left,
.comparison-proof-right {
  min-width: 0;
}

/* Same pill look as .comparison-eyebrow */
.comparison-intro-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 22px;
  padding: 10px 18px;
  border: 1px solid #ddcdf0;
  border-radius: 999px;
  color: #6b3b8c;
  background: linear-gradient(180deg, #ffffffe6, #f6effbc0);
  box-shadow: 0 8px 24px #68428a0d, inset 0 1px 0 #fff;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.6;
  text-wrap: balance;
}

.comparison-intro-eyebrow::before,
.comparison-eyebrow::before {
  content: "";
  flex: 0 0 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a066d6, #7542a4);
  box-shadow: 0 0 0 4px #8750b814;
}

.comparison-intro h2,
.comparison-header h2,
.comparison-proof-title,
.comparison-cta h3 {
  margin: 0;
  font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui,
    -apple-system, "Segoe UI", sans-serif;
  font-weight: 800;
  letter-spacing: -.035em;
  text-wrap: balance;
}

.comparison-intro h2 {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.16;
}

.comparison-intro h2 span,
.comparison-header h2 span,
.comparison-proof-title span,
.comparison-proof-number {
  color: var(--c-purple);
  background: linear-gradient(110deg, #6a359b, #9a5ad4 55%, #6a359b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.comparison-intro-card {
  position: relative;
  padding: clamp(26px, 3vw, 40px);
  border: 1px solid #e4d8f3;
  border-radius: 28px;
  background: linear-gradient(150deg, #ffffffee, #f8f2fdd0);
  box-shadow: 0 18px 48px #5b21b611, inset 0 1px 0 #fff;
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  transition:
    transform 450ms var(--c-ease),
    box-shadow 450ms ease,
    border-color 350ms ease;
}

.comparison-intro-lead {
  margin: 0;
  color: var(--c-ink);
  font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui,
    -apple-system, "Segoe UI", sans-serif;
  font-size: clamp(19px, 1.9vw, 23px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -.02em;
  text-wrap: balance;
}

.comparison-intro-body {
  position: relative;
  margin: 18px 0 0;
  padding-top: 18px;
  color: var(--c-muted);
  font-size: clamp(15px, 1.3vw, 16.5px);
  line-height: 1.75;
  text-wrap: pretty;
}

/* Soft divider between the lead and the body copy */
.comparison-intro-body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 44px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ffca30, #ffe04e);
}

.comparison-intro-card strong { color: var(--c-ink); font-weight: 750; }

/* "Let's Fix That." gets a purple tone with an amber marker underline */
.comparison-intro-fix {
  color: var(--c-purple);
  font-weight: 800;
  background: linear-gradient(transparent 62%, #ffe04e8c 62%);
  padding-inline: 2px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

/* Stats */
.comparison-intro-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.comparison-intro-stats li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid #e4d8f3;
  border-radius: 18px;
  background: linear-gradient(145deg, #fff, #f6eefb);
  box-shadow: 0 8px 20px #7542a40d, inset 0 1px 0 #fff;
}

.comparison-intro-stats strong {
  font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(24px, 2.4vw, 30px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -.03em;
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--c-purple);
  background: linear-gradient(110deg, #6a359b, #9a5ad4 55%, #6a359b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.comparison-intro-stats span {
  color: var(--c-muted);
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.4;
}

.comparison-intro-action { margin-top: 28px; padding-bottom: 5px; }

/* ---------- Header ---------- */

.comparison-header {
  max-width: 860px;
  margin-inline: auto;
  text-align: center;
}

.comparison-eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 100%;
  margin-bottom: 22px;
  padding: 10px 18px;
  border: 1px solid #ddcdf0;
  border-radius: 999px;
  color: #6b3b8c;
  background: linear-gradient(180deg, #ffffffe6, #f6effbc0);
  box-shadow: 0 8px 24px #68428a0d, inset 0 1px 0 #fff;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.6;
  text-wrap: balance;
}

.comparison-header h2 {
  font-size: clamp(30px, 4.2vw, 46px);
  line-height: 1.16;
}

.comparison-header p {
  max-width: 560px;
  margin: 20px auto 0;
  color: var(--c-muted);
  font-size: clamp(15px, 1.3vw, 17px);
  line-height: 1.8;
  text-wrap: pretty;
}

.comparison-board { margin-top: clamp(36px, 5vw, 60px); }

/* ---------- Board ---------- */

.comparison-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
  align-items: stretch;
  row-gap: 20px;
}

.comparison-pair { display: contents; }

/* Red (problem) cells use these colors by default. */
.comparison-cell {
  --cell-accent: #b83e51;
  --cell-text: #9a4757;
  --cell-border: #efd6de;
  --cell-tint: #fff1f5;
  --cell-hover: #e6c3cd;
  position: relative;
  min-width: 0;
  border: 1px solid var(--cell-border);
  border-radius: 24px;
  background: linear-gradient(130deg, #fffffff0, var(--cell-tint));
  box-shadow: 0 1px 2px #4422600a, 0 12px 30px #44226009, inset 0 1px 0 #fff;
}

/* Green (solution) cells: same shade family, green instead of red. */
.comparison-cell--solution {
  --cell-accent: #20734e;
  --cell-text: #3b6f56;
  --cell-border: #cfe5da;
  --cell-tint: #eef9f2;
  --cell-hover: #b7dbc8;
}

.comparison-group-heading {
  padding: 20px 26px;
  margin-bottom: 4px;
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.comparison-group-title {
  display: flex;
  align-items: center;
  min-width: 0;
}

.comparison-group-title h3 {
  margin: 0;
  color: var(--cell-accent);
  font-size: clamp(19px, 1.8vw, 23px);
  font-weight: 750;
  line-height: 1.35;
  letter-spacing: -.025em;
}

.comparison-item {
  padding: 26px;
  transition:
    transform 420ms var(--c-ease),
    box-shadow 420ms ease,
    border-color 350ms ease;
}

.comparison-item-inner {
  display: flex;
  align-items: flex-start;
  min-width: 0;
}

.comparison-copy {
  flex: 1;
  min-width: 0;
  padding-right: 44px;
}

.comparison-number {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  min-width: 38px;
  height: 28px;
  padding-inline: 7px;
  border: 1px solid var(--cell-border);
  border-radius: 9px;
  color: var(--cell-accent);
  background: #ffffffd9;
  box-shadow: 0 3px 8px #4422600a;
  font-size: 12.5px;
  font-weight: 750;
  letter-spacing: .02em;
  font-variant-numeric: tabular-nums;
}

.comparison-copy h3 {
  margin: 0;
  color: var(--cell-accent);
  font-size: clamp(18px, 1.6vw, 21px);
  font-weight: 750;
  line-height: 1.32;
  letter-spacing: -.028em;
  text-wrap: balance;
}

.comparison-copy p {
  margin: 8px 0 0;
  color: var(--cell-text);
  font-size: 14.5px;
  line-height: 1.7;
  text-wrap: pretty;
}

.comparison-link {
  display: grid;
  place-items: center;
}

.comparison-link-arrow {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid #ddcdf0;
  border-radius: 50%;
  color: var(--c-purple);
  background: #ffffffd9;
  box-shadow: 0 5px 14px #7542a410;
  animation: comparison-link-nudge 2.8s ease-in-out infinite;
}

.comparison-link-arrow svg { width: 16px; height: 16px; }

/* ---------- CTA ---------- */

.comparison-cta {
  display: grid;
  justify-items: center;
  gap: 28px;
  margin-top: clamp(40px, 5vw, 60px);
  padding: clamp(36px, 5vw, 58px) 28px;
  border: 1px solid #e2d1ef;
  border-radius: 28px;
  text-align: center;
  background:
    radial-gradient(ellipse at 50% 0%, #eadcf875, transparent 70%),
    linear-gradient(150deg, #fff, #f6eefbe8);
  box-shadow: 0 18px 44px #7542a40b, inset 0 1px 0 #fff;
}

.comparison-cta h3 {
  max-width: 760px;
  font-size: clamp(25px, 3.3vw, 38px);
  line-height: 1.22;
}

.comparison-cta-action {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

.comparison-cta-note {
  margin: -10px 0 0;
  color: var(--c-muted);
  font-size: 13px;
  line-height: 1.6;
}

/* ---------- Proof ---------- */

.comparison-proof {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.03fr);
  align-items: center;
  gap: clamp(32px, 5vw, 68px);
  margin-top: clamp(60px, 8vw, 100px);
}

.comparison-proof-visual {
  position: relative;
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid #e1d2ef;
  border-radius: 30px;
  background:
    radial-gradient(ellipse at 20% 12%, #ffffffec, transparent 65%),
    linear-gradient(145deg, #f4eafd, #ece0f8);
  box-shadow: 0 22px 50px #7542a416, inset 0 1px 0 #fff;
  transition:
    transform 550ms var(--c-ease),
    box-shadow 550ms ease;
}

.comparison-proof-photo {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 14px 32px #30204516;
}

.comparison-proof-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  min-width: 0;
}

.comparison-proof-phone {
  position: relative;
  flex: 0 1 202px;
  width: 202px;
  max-width: 100%;
  min-width: 0;
  padding: 27px 12px 16px;
  border: 6px solid #302045;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 18px 28px #3020451c;
  animation: comparison-phone-float 7s ease-in-out infinite;
  animation-play-state: paused;
}

.comparison-proof-phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  width: 76px;
  height: 12px;
  border-radius: 0 0 10px 10px;
  background: #302045;
  transform: translateX(-50%);
}

.comparison-proof-ad-head {
  display: grid;
  grid-template-columns: 25px minmax(0, 1fr);
  align-items: center;
  gap: 3px 8px;
  margin-bottom: 12px;
}

.comparison-proof-avatar {
  grid-row: span 2;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9a5ad4, #e1c9f5);
}

.comparison-proof-bar {
  display: block;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: #e8dff0;
}

.comparison-proof-bar--head { width: 76%; }
.comparison-proof-sponsored { font-size: 8px; color: #6c607e; }

.comparison-proof-ad-image {
  position: relative;
  aspect-ratio: 1.12;
  overflow: hidden;
  border-radius: 13px;
  background: linear-gradient(145deg, #eee2fa, #d9c2ed);
}

.comparison-proof-ad-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comparison-proof-blob {
  position: absolute;
  border-radius: 25px;
  box-shadow: inset 0 1px 0 #ffffff70;
}

.comparison-proof-blob--a {
  width: 65%;
  height: 54%;
  top: 18%;
  left: 10%;
  background: linear-gradient(140deg, #fff, #f0e6fa);
  transform: rotate(-13deg);
}

.comparison-proof-blob--b {
  width: 45%;
  height: 50%;
  bottom: 10%;
  right: 6%;
  background: linear-gradient(140deg, #a46bd6, #7542a4);
  transform: rotate(13deg);
}

.comparison-proof-blob--c {
  width: 27%;
  height: 29%;
  top: 13%;
  right: 8%;
  border-radius: 50%;
  background: #ffffffa0;
}

.comparison-proof-ad-lines {
  display: grid;
  gap: 8px;
  padding-block: 15px;
}

.comparison-proof-bar--strong { width: 90%; background: #bfa4d6; }
.comparison-proof-bar--short { width: 64%; }

/* Phone mock "Learn more" button: same amber look, scaled down */
.landing-comparison .comparison-proof-ad-button.comparison-proof-ad-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 10px;
  border: 1px solid var(--btn-border);
  border-radius: 9px;
  color: var(--btn-text);
  background: var(--btn-bg);
  box-shadow:
    inset 0 1px 0 #fff8c4,
    0 3px 0 0 #d18f0a,
    0 8px 12px -6px #f5b323a0;
  font-family: inherit;
  font-size: 10px;
  font-weight: 800;
  line-height: 1.4;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.landing-comparison .comparison-proof-ad-button.comparison-proof-ad-button svg {
  width: 13px;
  height: 13px;
}

.landing-comparison .comparison-proof-ad-button.comparison-proof-ad-button:active {
  transform: translateY(2px);
  box-shadow:
    inset 0 1px 0 #fff8c4,
    0 1px 0 0 #d18f0a,
    0 4px 8px -6px #f5b323a0;
}

.landing-comparison .comparison-proof-ad-button.comparison-proof-ad-button:focus-visible {
  outline: 3px solid #a98af0;
  outline-offset: 3px;
}

.comparison-proof-notes {
  flex: 1 1 190px;
  min-width: 0;
  max-width: 300px;
}

.comparison-proof-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 17px 14px;
  border: 1px solid #e4d8f3;
  border-radius: 18px;
  background: #fffffff2;
  box-shadow: 0 10px 24px #7542a410, inset 0 1px 0 #fff;
  animation: comparison-note-float 8s ease-in-out infinite;
  animation-play-state: paused;
}

.comparison-proof-note--done {
  border-color: #cfe5da;
  background: linear-gradient(140deg, #fff, #eef9f2);
  animation-delay: -3s;
}

.comparison-proof-note > div { min-width: 0; }

.comparison-proof-note-icon {
  display: grid;
  place-items: center;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border: 1px solid #e0cfee;
  border-radius: 13px;
  color: var(--c-purple);
  background: linear-gradient(145deg, #fff, #f0e4fa);
  will-change: transform;
  animation: comparison-icon-bob 5.2s ease-in-out infinite;
}

.comparison-proof-note-icon svg { width: 17px; height: 17px; }

.comparison-proof-note--done .comparison-proof-note-icon {
  color: var(--c-green);
  border-color: #cfe5da;
  background: #e7f5ec;
}

.comparison-proof-note strong {
  display: block;
  font-size: 12px;
  line-height: 1.45;
}

.comparison-proof-note p {
  margin: 6px 0 0;
  color: var(--c-muted);
  font-size: 11px;
  line-height: 1.65;
}

.comparison-proof-note-link {
  display: block;
  width: 1px;
  height: 22px;
  margin-left: 30px;
  background: linear-gradient(#b99bd4, #b4d8c3);
}

.comparison-proof.is-proof-visible .comparison-proof-phone,
.comparison-proof.is-proof-visible .comparison-proof-note {
  animation-play-state: running;
}

@keyframes comparison-phone-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -5px, 0); }
}

@keyframes comparison-note-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
}

@keyframes comparison-icon-bob {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -3px, 0); }
}

@keyframes comparison-link-nudge {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 3px, 0); }
}

.comparison-proof-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  margin-bottom: 23px;
}

/* Invisible final value fixes the width so the counter never jitters. */

.comparison-proof-counter {
  display: inline-grid;
  white-space: nowrap;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(52px, 5.5vw, 76px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -.05em;
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum";
}

.comparison-proof-counter > span {
  grid-area: 1 / 1;
}

.comparison-proof-counter-reserve {
  visibility: hidden;
  pointer-events: none;
}

.comparison-proof-number {
  justify-self: end;
}

.comparison-proof-stat-label {
  color: #6b3b8c;
  font-size: 11px;
  font-weight: 750;
  line-height: 1.6;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.comparison-proof-title {
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.2;
}

.comparison-proof-lead {
  margin: 18px 0 0;
  color: var(--c-muted);
  font-size: 15.5px;
  line-height: 1.8;
  text-wrap: pretty;
}

.comparison-proof-lead strong { color: var(--c-ink); }

.comparison-proof-tagline {
  display: flex;
  flex-wrap: wrap;
  gap: 9px 18px;
  margin: 23px 0 0;
  padding: 0;
  list-style: none;
}

.comparison-proof-tagline li {
  color: #6b3b8c;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.6;
}

/* ---------- Hover (only on devices with accurate hover input) ---------- */

@media (hover: hover) and (pointer: fine) {
  .comparison-intro-card:hover {
    transform: translate3d(0, -4px, 0);
    border-color: #ccb0e2;
    box-shadow: 0 24px 52px #5b21b619, inset 0 1px 0 #fff;
  }

  .comparison-item:hover {
    transform: translate3d(0, -3px, 0);
    border-color: var(--cell-hover);
    box-shadow: 0 18px 36px #44226014, inset 0 1px 0 #fff;
  }

  .comparison-proof-visual:hover {
    transform: translate3d(0, -4px, 0);
    box-shadow: 0 28px 55px #7542a41c, inset 0 1px 0 #fff;
  }
}

/* Touch feedback instead of hover on phones and tablets */

@media (hover: none) {
  .comparison-item:active {
    transform: scale(.985);
  }
}

/* ---------- Tablet ---------- */

@media (max-width: 1023px) {
  .comparison-intro,
  .comparison-proof {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }

  .comparison-intro-left,
  .comparison-intro-right,
  .comparison-proof-left,
  .comparison-proof-right {
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
  }

  .comparison-intro h2 { font-size: clamp(32px, 5vw, 44px); }

  .comparison-grid {
    grid-template-columns: minmax(0, 1fr) 46px minmax(0, 1fr);
    row-gap: 18px;
  }

  .comparison-group-heading,
  .comparison-item { padding: 22px 18px; }

  .comparison-proof-stage { gap: 28px; }
  .comparison-proof-notes { max-width: 300px; }
}

/* ---------- Mobile ---------- */

@media (max-width: 767px) {
  .landing-comparison { padding: 56px 0 72px; }
  .comparison-container { width: calc(100% - 32px); }

  .comparison-intro {
    gap: 26px;
    margin-bottom: 54px;
  }

  /* Intro heading block: centered on mobile */
  .comparison-intro-left { text-align: center; }

  .comparison-intro-eyebrow {
    margin: 0 auto 20px;
    padding: 9px 13px;
    font-size: 11px;
  }

  .comparison-intro h2 {
    max-width: 17em;
    margin-inline: auto;
    font-size: clamp(28px, 8vw, 36px);
    line-height: 1.16;
    letter-spacing: -.032em;
  }

  .comparison-header h2 {
    font-size: clamp(28px, 7.6vw, 38px);
    line-height: 1.18;
  }

  .comparison-intro-card {
    padding: 24px 20px;
    border-radius: 24px;
  }

  .comparison-intro-lead { font-size: 19px; line-height: 1.38; }
  .comparison-intro-body {
    margin-top: 16px;
    padding-top: 16px;
    font-size: 15px;
    line-height: 1.7;
  }

  .comparison-intro-stats { gap: 10px; margin-top: 20px; }
  .comparison-intro-stats li { padding: 12px 12px; border-radius: 16px; }
  .comparison-intro-stats strong { font-size: 24px; }
  .comparison-intro-stats span { font-size: 12px; }

  .comparison-intro-action {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  .landing-comparison a.comparison-intro-button,
  .comparison-cta-action a.comparison-cta-button {
    width: 100%;
    max-width: 420px;
  }

  .comparison-eyebrow {
    padding: 9px 13px;
    font-size: 11px;
    margin-bottom: 20px;
  }

  .comparison-header p { font-size: 15px; }
  .comparison-board { margin-top: 32px; }

  /* Single column: all problems first, then all solutions. */

  .comparison-grid {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 14px;
  }

  .comparison-group-heading--problem { order: 0; }

  .comparison-pair > .comparison-item:not(.comparison-cell--solution) {
    order: calc(var(--i) + 1);
  }

  .comparison-group-heading--solution {
    order: 500;
    margin-top: 22px;
  }

  .comparison-pair > .comparison-cell--solution {
    order: calc(var(--i) + 501);
  }

  .comparison-spacer,
  .comparison-link { display: none; }

  .comparison-group-heading {
    margin-bottom: 0;
    padding: 16px;
    text-align: left;
    border-radius: 22px;
  }

  .comparison-group-title h3 { font-size: 20px; }

  .comparison-item {
    padding: 20px 16px;
    border-radius: 22px;
  }

  .comparison-number { top: 12px; right: 12px; }
  .comparison-copy { padding-right: 38px; }
  .comparison-copy h3 { font-size: 17.5px; }
  .comparison-copy p { font-size: 14.5px; line-height: 1.6; }

  .comparison-cta {
    gap: 25px;
    padding: 36px 20px 40px;
    border-radius: 24px;
  }

  .comparison-cta h3 { font-size: clamp(24px, 6.5vw, 30px); }

  .comparison-proof { margin-top: 54px; gap: 34px; }

  .comparison-proof-visual {
    padding: 20px 14px;
    border-radius: 24px;
  }

  .comparison-proof-photo { border-radius: 17px; }
  .landing-comparison .comparison-proof-ad-button.comparison-proof-ad-button {
    justify-content: center;
  }

  .landing-comparison .comparison-proof-ad-button.comparison-proof-ad-button svg {
    position: absolute;
    right: 10px;
  }

  .comparison-proof-stage {
    flex-wrap: nowrap;
    gap: clamp(8px, 2.5vw, 14px);
  }

  .comparison-proof-phone {
    flex: 0 1 48%;
    width: 48%;
    padding: 24px 8px 11px;
    border-width: 4px;
    border-radius: 23px;
  }

  .comparison-proof-notes {
    flex: 1 1 0;
    max-width: none;
  }

  .comparison-proof-note {
    gap: 8px;
    padding: 11px 9px;
    border-radius: 14px;
  }

  .comparison-proof-note-icon {
    flex-basis: 27px;
    width: 27px;
    height: 27px;
    border-radius: 10px;
  }

  .comparison-proof-note-icon svg { width: 15px; height: 15px; }
  .comparison-proof-note strong { font-size: 10px; }
  .comparison-proof-note p { font-size: 9.5px; line-height: 1.55; }
  .comparison-proof-note-link { height: 16px; margin-left: 21px; }

  .comparison-proof-stat { margin-bottom: 20px; }
  .comparison-proof-counter { font-size: clamp(58px, 16vw, 72px); }
  .comparison-proof-title { font-size: clamp(28px, 7.2vw, 36px); }
  .comparison-proof-lead { font-size: 16px; }

  .comparison-proof-tagline {
    gap: 5px 8px;
    margin-top: 34px;
    padding: 18px 16px;
    border: 1px solid #e5d9f1;
    border-radius: 22px;
    background: linear-gradient(140deg, #fffffff2, #f8f2fbd9);
  }

  .comparison-proof-tagline li {
    color: var(--c-muted);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.8;
  }
}

/* ---------- Very small phones ---------- */

@media (max-width: 359px) {
  .comparison-container { width: calc(100% - 24px); }

  .comparison-intro h2,
  .comparison-header h2 { font-size: 26px; }

  .comparison-intro-card { padding: 22px 16px; }
  .comparison-intro-lead { font-size: 18px; }
  .comparison-intro-body { font-size: 14.5px; }
  .comparison-intro-stats { grid-template-columns: minmax(0, 1fr); }
  .comparison-item { padding: 18px 14px; }

  .comparison-group-title h3 { font-size: 18px; }
  .comparison-copy { padding-right: 34px; }
  .comparison-copy h3 { font-size: 16.5px; }
  .comparison-eyebrow::before,
  .comparison-intro-eyebrow::before { display: none; }
  .comparison-cta { padding: 32px 16px 36px; }
  .comparison-proof-stat-label { letter-spacing: .08em; }
}

/* ---------- Reduced motion: no transforms, animations or hover movement ---------- */

@media (prefers-reduced-motion: reduce) {
  .landing-comparison *,
  .landing-comparison *::before,
  .landing-comparison *::after {
    animation: none !important;
    transition: none !important;
  }

  .comparison-reveal,
  .comparison-reveal.is-motion-ready:not(.is-visible) {
    opacity: 1 !important;
    transform: none !important;
  }

  .comparison-intro-card:hover,
  .comparison-item:hover,
  .comparison-proof-visual:hover,
  .landing-comparison a.comparison-cta-button:hover,
  .landing-comparison a.comparison-cta-button:active,
  .comparison-item:active {
    transform: none !important;
  }
}

/* ---------- Mobile heading block: header text centered ---------- */

@media (max-width: 767px) {
  .landing-comparison .comparison-header {
    text-align: center;
    margin-inline: auto;
    padding-inline: 0;
  }

  .landing-comparison .comparison-header p {
    margin: 24px auto 0;
    line-height: 1.8;
  }
}

/* ==========================================================
   SAME PILL -> HEADING GAP IN BOTH SECTIONS (desktop + mobile)

   Section 1: "More Value From Every Click"  -> "You're Getting Clicks..."
   Section 2: "Common Landing Page Problems" -> "Getting Clicks, But Not..."

   Both pills now use the same display, padding and margin, and both
   headings use the same line-height and zero margin, so the gap is
   identical. Change the gap in ONE place: --c-eyebrow-gap (top of CSS).
   Keep this block at the very end of the stylesheet.
   ========================================================== */

.landing-comparison .comparison-intro-eyebrow,
.landing-comparison .comparison-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  margin-block: 0 var(--c-eyebrow-gap);
  padding: 10px 18px;
}

/* Header pill sits in the centered header, so center it as a block. */
.landing-comparison .comparison-eyebrow {
  margin-inline: auto;
}

.landing-comparison .comparison-intro h2,
.landing-comparison .comparison-header h2 {
  margin: 0;
  line-height: 1.16;
}

/* Keep the intro heading centered on mobile (margin: 0 above would reset it) */
@media (max-width: 767px) {
  .landing-comparison .comparison-intro-eyebrow,
  .landing-comparison .comparison-eyebrow {
    padding: 9px 13px;
  }

  .landing-comparison .comparison-intro-eyebrow {
    margin-inline: auto;
  }

  .landing-comparison .comparison-intro h2 {
    margin-inline: auto;
  }
}
`

/* ==================== Complete component ==================== */

export default function Problems() {
  const headingId = useId()
  const reducedMotion = useReducedMotion()
  const proofRef = useRef(null)
  const proofVisible = useInViewOnce(proofRef, reducedMotion)

  const { value, complete } = useCounter(proofVisible, reducedMotion)

  const motionProps = { reducedMotion }

  return (
    <section className="landing-comparison" aria-labelledby={headingId}>
      <style>{styles}</style>

      <div className="comparison-container">
        {/* Intro */}
        <div className="comparison-intro">
          <Reveal {...motionProps} className="comparison-intro-left">
            <p className="comparison-intro-eyebrow">
              More Value From Every Click
            </p>

            <h2>
              You’re Getting Clicks.{' '}
              <span>But Are They Turning Into Customers?</span>
            </h2>
          </Reveal>

          <Reveal
            {...motionProps}
            delay={80}
            className="comparison-intro-right"
          >
            <div className="comparison-intro-card">
              <p className="comparison-intro-lead">
                Unclear offers and distracting pages stop interested visitors
                from taking the next step.
              </p>

              <p className="comparison-intro-body">
                <span className="comparison-intro-fix">Let’s Fix That.</span>{' '}
                At <strong>Creative Crew</strong>, we build complete growth
                systems with high-converting landing pages, custom tracking,
                smart automations, and analytics—all designed to convert more
                leads into clients and generate more revenue for your business.
              </p>

              <ul className="comparison-intro-stats">
                <li>
                  <strong>2,000+</strong>
                  <span>Landing pages created</span>
                </li>
                <li>
                  <strong>1,000+</strong>
                  <span>Professionals grew revenue</span>
                </li>
              </ul>

              <div className="comparison-intro-action">
                <RevenueButton intro />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Problems and solutions */}
        <Reveal {...motionProps} as="header" className="comparison-header">
          <span className="comparison-eyebrow">
            Common Landing Page Problems &amp; Solutions
          </span>

          <h2 id={headingId}>
            Getting Clicks, But <span>Not Enough Enquiries?</span>
          </h2>

          <p>
            Visitors decide in seconds. If your message is unclear or the next
            step is hard, they leave.
          </p>
        </Reveal>

        <div className="comparison-board">
          <div className="comparison-grid">
            <Reveal
              {...motionProps}
              className="comparison-cell comparison-group-heading comparison-group-heading--problem"
            >
              <div className="comparison-group-title">
                <h3>What Holds Visitors Back</h3>
              </div>
            </Reveal>

            <div className="comparison-spacer" aria-hidden="true" />

            <Reveal
              {...motionProps}
              delay={60}
              className="comparison-cell comparison-cell--solution comparison-group-heading comparison-group-heading--solution"
            >
              <div className="comparison-group-title">
                <h3>How We Fix It</h3>
              </div>
            </Reveal>

            {items.map(({ problem, solution }, index) => {
              const number = String(index + 1).padStart(2, '0')

              return (
                <div
                  className="comparison-pair"
                  key={problem.title}
                  style={{ '--i': index }}
                >
                  <article className="comparison-cell comparison-item">
                    <span className="comparison-number">{number}</span>

                    <Reveal
                      {...motionProps}
                      delay={Math.min(index * 35, 140)}
                    >
                      <div className="comparison-item-inner">
                        <div className="comparison-copy">
                          <h3>{problem.title}</h3>
                          <p>{problem.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  </article>

                  <Connector />

                  <article className="comparison-cell comparison-cell--solution comparison-item">
                    <span className="comparison-number">{number}</span>

                    <Reveal
                      {...motionProps}
                      delay={Math.min(index * 35 + 60, 200)}
                    >
                      <div className="comparison-item-inner">
                        <div className="comparison-copy">
                          <h3>{solution.title}</h3>
                          <p>{solution.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  </article>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <Reveal {...motionProps}>
          <div className="comparison-cta">
            <h3>Ready To Turn More Visits Into Conversations?</h3>

            <div className="comparison-cta-action">
              <RevenueButton />
            </div>

            {ctaNote ? <p className="comparison-cta-note">{ctaNote}</p> : null}
          </div>
        </Reveal>

        {/* Counter starts when this proof section enters the viewport. */}
        <div
          ref={proofRef}
          className={`comparison-proof ${proofVisible ? 'is-proof-visible' : ''
            }`}
        >
          <Reveal {...motionProps} className="comparison-proof-left">
            <div className="comparison-proof-visual">
              <ProofVisual />
            </div>
          </Reveal>

          <Reveal
            {...motionProps}
            delay={80}
            className="comparison-proof-right"
          >
            <div className="comparison-proof-stat">
              <span
                className="comparison-proof-counter"
                role="img"
                aria-label="More than 2,000"
              >
                <span
                  className="comparison-proof-counter-reserve"
                  aria-hidden="true"
                >
                  2,000+
                </span>

                <span className="comparison-proof-number" aria-hidden="true">
                  {numberFormatter.format(value)}
                  {complete ? '+' : ''}
                </span>
              </span>

              <span className="comparison-proof-stat-label">
                Landing Pages Built
              </span>
            </div>

            <h2 className="comparison-proof-title">
              Built To Turn <span>Clicks Into Customers.</span>
            </h2>

            <p className="comparison-proof-lead">
              At <strong>Creative Crew</strong>, we combine landing pages,
              automation and tracking to create a clearer path from interest to
              enquiry.
            </p>

          </Reveal>
        </div>
      </div>
    </section>
  )
}