import { useId } from 'react'
import { problems } from '../data'
import { Reveal } from './ui'

const solutionContent = {
  'your offer takes too long to understand': {
    title: 'Make Your Offer Clear At First Glance',
    description:
      'We write a clear headline, a focused value proposition and a concise introduction so visitors quickly understand what you offer, who it helps and why it matters.',
  },
  'the page looks generic': {
    title: 'Create A Design That Reflects Your Expertise',
    description:
      'We tailor the layout, typography, colors and visuals to your brand, giving your offer a distinctive, professional presentation.',
  },
  'there is too much competing for attention': {
    title: 'Guide Visitors Toward One Clear Next Step',
    description:
      'We remove distractions and build the page around one primary goal, using clear calls to action that make enquiring or booking easy.',
  },
  'the mobile experience feels difficult': {
    title: 'Make The Mobile Experience Effortless',
    description:
      'We use readable text, balanced spacing, easy-to-tap buttons and simple forms so visitors can comfortably browse and connect from their phones.',
  },
  'visitors don’t have enough confidence to act': {
    title: 'Build Trust Before Asking For Action',
    description:
      'We thoughtfully place genuine testimonials, relevant credentials, clear offer details and helpful FAQs so visitors feel informed and confident about taking the next step.',
  },
}

function capitalizeHeading(text) {
  return text.replace(
    /(^|[\s-])(\p{L})/gu,
    (_, separator, letter) => separator + letter.toUpperCase(),
  )
}

function StatusIcon({ solution = false }) {
  return (
    <span
      className={`comparison-status ${
        solution ? 'comparison-status--solution' : ''
      }`}
      aria-hidden="true"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {solution ? (
          <path d="m5 12 4 4L19 6" />
        ) : (
          <path d="m7 7 10 10M17 7 7 17" />
        )}
      </svg>
    </span>
  )
}

const styles = `
/* Section shell */
.landing-comparison {
  --comparison-ink: #25143f;
  --comparison-muted: #706382;
  --comparison-red: #b83e51;
  --comparison-green: #20734e;
  --comparison-purple: #7542a4;
  --comparison-gap: 36px;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  overflow: clip;
  width: 100%;
  max-width: 100%;
  padding: clamp(64px, 9vw, 128px) 0;
  color: var(--comparison-ink);
  background:
    radial-gradient(ellipse at 8% 8%, #eee3ffc0, transparent 42%),
    radial-gradient(ellipse at 94% 78%, #e9dcfb90, transparent 42%),
    linear-gradient(180deg, #fff, #fcfaff 60%, #f8f3ff);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}

.landing-comparison,
.landing-comparison *,
.landing-comparison *::before,
.landing-comparison *::after {
  box-sizing: border-box;
}

/* Ambient glow */
.landing-comparison::before,
.landing-comparison::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(70px);
  animation: comparison-float 16s ease-in-out infinite alternate;
}

.landing-comparison::before {
  top: -120px;
  left: -120px;
  width: 380px;
  height: 380px;
  background: #d9c2f8;
  opacity: .5;
}

.landing-comparison::after {
  bottom: -140px;
  right: -120px;
  width: 420px;
  height: 420px;
  background: #e6cdf5;
  opacity: .4;
  animation-delay: -8s;
}

@keyframes comparison-float {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(30px, 24px, 0) scale(1.08); }
}

.comparison-container {
  width: min(1200px, calc(100% - 48px));
  min-width: 0;
  margin-inline: auto;
}

/* Header */
.comparison-header {
  max-width: 820px;
  margin-inline: auto;
  text-align: center;
  animation: comparison-rise .9s cubic-bezier(.2, .7, .2, 1) both;
}

.comparison-eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 100%;
  margin-bottom: 24px;
  padding: 10px 18px;
  border: 1px solid #ddcdf0;
  border-radius: 999px;
  color: #6b3b8c;
  background: linear-gradient(180deg, #ffffffe6, #f6effbc0);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  box-shadow:
    0 8px 24px #68428a10,
    inset 0 1px 0 #fff,
    inset 0 -1px 0 #e6d8f4;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.6;
  letter-spacing: .01em;
  text-wrap: balance;
}

.comparison-eyebrow::before {
  content: "";
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #a066d6, #7542a4);
  box-shadow: 0 0 0 4px #8750b814;
  animation: comparison-pulse 2.8s ease-in-out infinite;
}

@keyframes comparison-pulse {
  50% { box-shadow: 0 0 0 8px #8750b800; }
}

.comparison-header h2 {
  margin: 0;
  font-size: clamp(30px, 4.4vw, 54px);
  font-weight: 760;
  line-height: 1.12;
  letter-spacing: -.045em;
  text-wrap: balance;
  overflow-wrap: break-word;
}

.comparison-header h2 span {
  background: linear-gradient(110deg, #6a359b, #9a5ad4 55%, #6a359b);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--comparison-purple);
  animation: comparison-shimmer 8s linear infinite;
}

@keyframes comparison-shimmer {
  to { background-position: 200% center; }
}

.comparison-header p {
  max-width: 700px;
  margin: 22px auto 0;
  color: var(--comparison-muted);
  font-size: clamp(15px, 1.3vw, 17.5px);
  line-height: 1.8;
  text-wrap: pretty;
}

@keyframes comparison-rise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: none; }
}

/* Board */
.comparison-board {
  position: relative;
  margin-top: clamp(36px, 5vw, 64px);
}

.comparison-column-headings,
.comparison-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--comparison-gap);
  min-width: 0;
}

.comparison-column-headings {
  margin-bottom: 20px;
}

/* Glass cells */
.comparison-cell {
  --cell-accent: var(--comparison-red);
  --cell-border: #efd6de;
  --cell-tint: #fff1f5;
  --cell-glow: #b83e5118;
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--cell-border);
  border-radius: 24px;
  background:
    radial-gradient(ellipse at 0% 0%, #ffffffd9, transparent 55%),
    linear-gradient(130deg, #fffffff0, var(--cell-tint));
  box-shadow:
    0 10px 30px #44226008,
    0 2px 6px #4422610a,
    inset 0 1px 0 #fff,
    inset 0 -1px 0 #ffffff80;
  backdrop-filter: blur(22px) saturate(1.5);
  -webkit-backdrop-filter: blur(22px) saturate(1.5);
}

.comparison-cell--solution {
  --cell-accent: var(--comparison-green);
  --cell-border: #cfe5da;
  --cell-tint: #eef9f2;
  --cell-glow: #20734e18;
}

.comparison-cell::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  opacity: .55;
  pointer-events: none;
  background: linear-gradient(
    90deg, transparent, var(--cell-accent), transparent
  );
  transition: opacity .4s ease;
}

.comparison-cell::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -60%;
  width: 40%;
  pointer-events: none;
  background: linear-gradient(100deg, transparent, #ffffffb0, transparent);
  transform: skewX(-18deg);
  opacity: 0;
}

.comparison-column-heading {
  padding: 28px 30px;
  border-radius: 26px;
}

.comparison-column-title {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.comparison-column-title h3 {
  margin: 0;
  font-size: clamp(19px, 1.85vw, 24px);
  font-weight: 750;
  line-height: 1.35;
  letter-spacing: -.035em;
  overflow-wrap: break-word;
  text-wrap: balance;
}

.comparison-column-heading p {
  margin: 12px 0 0 62px;
  color: var(--comparison-muted);
  font-size: 14px;
  line-height: 1.7;
}

/* List and connectors */
.comparison-list {
  display: grid;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
}

.comparison-pair {
  position: relative;
}

.comparison-pair::before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #e1d2f1;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237542a4' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 12h12M13 6l6 6-6 6'/%3E%3C/svg%3E") center/14px no-repeat,
    linear-gradient(180deg, #fff, #f4ecfb);
  box-shadow: 0 6px 14px #7542a41c, inset 0 1px 0 #fff;
  pointer-events: none;
}

.comparison-item {
  padding: 28px;
  transition:
    transform .45s cubic-bezier(.2, .7, .2, 1),
    background .35s ease,
    border-color .35s ease,
    box-shadow .45s ease;
}

.comparison-item-inner {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  min-width: 0;
}

/* Icons rotate inside their fixed containers */
.comparison-status {
  display: grid;
  place-items: center;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  margin-top: 2px;
  border: 1px solid #ffffffb8;
  border-radius: 14px;
  color: #fff;
  background:
    radial-gradient(circle at 25% 0%, #ffffff80, transparent 62%),
    linear-gradient(145deg, #e77593, #be3558);
  box-shadow:
    0 8px 16px #b83e5126,
    inset 0 1px 2px #ffffffb8,
    inset 0 -2px 4px #8d163b24;
  transition: box-shadow .4s ease, filter .4s ease;
}

.comparison-status--solution {
  background:
    radial-gradient(circle at 25% 0%, #ffffff80, transparent 62%),
    linear-gradient(145deg, #48b88c, #208356);
  box-shadow:
    0 8px 16px #20734e26,
    inset 0 1px 2px #ffffffb8,
    inset 0 -2px 4px #07533124;
}

.comparison-column-title .comparison-status {
  flex-basis: 46px;
  width: 46px;
  height: 46px;
  margin-top: 0;
  border-radius: 16px;
}

.comparison-status svg {
  display: block;
  width: 19px;
  height: 19px;
  transform-box: view-box;
  transform-origin: 50% 50%;
  animation: comparison-icon-turn 18s cubic-bezier(.45, 0, .25, 1) infinite;
}

.comparison-status--solution svg { animation-delay: -3s; }
.comparison-pair:nth-child(2n) .comparison-status svg { animation-delay: -6s; }
.comparison-pair:nth-child(3n) .comparison-status svg { animation-delay: -9s; }

@keyframes comparison-icon-turn {
  0%, 72% { transform: rotate(0deg); }
  92%, 100% { transform: rotate(360deg); }
}

/* Copy */
.comparison-copy {
  flex: 1;
  min-width: 0;
}

.comparison-mobile-label {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 10px;
  color: var(--cell-accent);
  font-size: 10.5px;
  font-weight: 750;
  line-height: 1.5;
  letter-spacing: .09em;
  text-transform: uppercase;
}

.comparison-number {
  display: inline-grid;
  place-items: center;
  min-width: 26px;
  height: 21px;
  padding: 0 5px;
  border: 1px solid var(--cell-border);
  border-radius: 7px;
  background: #ffffffc0;
  box-shadow: inset 0 1px 0 #fff;
  font-size: 10px;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}

.comparison-copy h3 {
  margin: 0;
  font-size: clamp(17px, 1.5vw, 20.5px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -.027em;
  overflow-wrap: break-word;
  text-wrap: balance;
  transition: color .3s ease;
}

.comparison-copy p {
  margin: 11px 0 0;
  color: var(--comparison-muted);
  font-size: 14.5px;
  line-height: 1.75;
  overflow-wrap: break-word;
  text-wrap: pretty;
}

/* Bottom CTA — centered layout matching the reference */
.comparison-cta {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  min-width: 0;
  width: 100%;
  margin-top: 36px;
  padding: clamp(40px, 5vw, 62px) clamp(20px, 4vw, 48px);
  border: 1px solid #e7d9ef;
  border-radius: 28px;
  background: linear-gradient(110deg, #ffffff 0%, #fdfaff 55%, #fbf6ff 100%);
  box-shadow:
    inset 0 1px 0 #ffffff,
    0 10px 30px #60327d04;
  text-align: center;
}

.comparison-cta h3 {
  width: 100%;
  max-width: 920px;
  margin: 0;
  color: #291b3c;
  font-size: clamp(23px, 2.65vw, 34px);
  font-weight: 780;
  line-height: 1.25;
  letter-spacing: -.04em;
  text-wrap: balance;
  overflow-wrap: break-word;
}

.comparison-cta-action {
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.landing-comparison .comparison-cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  max-width: 100%;
  min-height: 56px;
  padding: 16px 28px;
  border: 1px solid #9270a7;
  border-radius: 16px;
  color: #ffffff;
  background: linear-gradient(110deg, #663380 0%, #522b6b 55%, #412153 100%);
  box-shadow:
    0 5px 0 #3b204e,
    0 16px 30px #5c33772b,
    inset 0 1px 0 #ffffff30;
  font-family: inherit;
  font-size: 16px;
  font-weight: 750;
  line-height: 1.45;
  letter-spacing: -.015em;
  text-align: center;
  text-decoration: none;
  white-space: normal;
  text-wrap: balance;
  overflow-wrap: break-word;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform .25s ease,
    background .25s ease,
    box-shadow .25s ease;
}

.landing-comparison .comparison-cta-button:focus-visible {
  outline: 3px solid #7542a4;
  outline-offset: 8px;
}

.landing-comparison .comparison-cta-button:active {
  transform: translateY(3px);
  box-shadow:
    0 2px 0 #3b204e,
    0 8px 18px #5c337724,
    inset 0 1px 0 #ffffff30;
}

/* Hover */
@media (hover: hover) and (pointer: fine) {
  .comparison-item:hover {
    transform: translateY(-4px);
    background:
      radial-gradient(ellipse at 0% 0%, #fff, transparent 55%),
      linear-gradient(130deg, #fff, var(--cell-tint));
    border-color: var(--cell-accent);
    box-shadow:
      0 20px 44px var(--cell-glow),
      0 4px 10px #44226010,
      inset 0 1px 0 #fff;
  }

  .comparison-item:hover::before { opacity: 1; }
  .comparison-item:hover::after {
    animation: comparison-sheen 1.1s ease forwards;
  }

  .comparison-item:hover .comparison-copy h3 {
    color: var(--cell-accent);
  }

  .comparison-item:hover .comparison-status {
    filter: saturate(1.15);
    box-shadow:
      0 12px 22px var(--cell-glow),
      inset 0 1px 2px #ffffffb8;
  }

  .landing-comparison .comparison-cta-button:hover {
    transform: translateY(-2px);
    background: linear-gradient(110deg, #723c8e, #5d3178 55%, #4b2760);
    box-shadow:
      0 7px 0 #3b204e,
      0 20px 34px #5c337732,
      inset 0 1px 0 #ffffff40;
  }
}

@keyframes comparison-sheen {
  from { left: -60%; opacity: 1; }
  to { left: 130%; opacity: 0; }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .landing-comparison { --comparison-gap: 20px; }
  .comparison-pair::before { display: none; }

  .comparison-column-heading,
  .comparison-item {
    padding: 24px 22px;
  }

  .comparison-item-inner { gap: 14px; }
  .comparison-column-heading p { margin-left: 0; }

  .comparison-cta {
    gap: 28px;
    padding: 46px 30px;
  }

  .comparison-cta h3 {
    max-width: 680px;
    font-size: 30px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .landing-comparison { padding: 56px 0 104px; }
  .comparison-container { width: calc(100% - 32px); }

  .comparison-eyebrow {
    font-size: 11.5px;
    padding: 9px 14px;
    margin-bottom: 20px;
  }

  .comparison-header h2 {
    font-size: clamp(28px, 8vw, 38px);
    line-height: 1.15;
  }

  .comparison-header p {
    margin-top: 18px;
    font-size: 15px;
    line-height: 1.75;
  }

  .comparison-board { margin-top: 34px; }
  .comparison-column-headings { display: none; }
  .comparison-list { gap: 22px; }

  .comparison-pair {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    gap: 6px;
    padding: 10px;
    border: 1px solid #e8def0;
    border-radius: 28px;
    background: linear-gradient(160deg, #ffffffa0, #f6f0fc80);
    box-shadow: 0 12px 32px #57347b0a, inset 0 1px 0 #fff;
  }

  .comparison-pair > .comparison-item:first-child { order: 0; }
  .comparison-pair > .comparison-item:last-child { order: 2; }

  .comparison-pair::before {
    order: 1;
    position: relative;
    top: auto;
    left: auto;
    z-index: auto;
    justify-self: center;
    align-self: center;
    width: 32px;
    height: 32px;
    margin: 0;
    transform: rotate(90deg);
    background-size: 15px, auto;
  }

  .comparison-item {
    padding: 20px 18px;
    border-radius: 20px;
  }

  .comparison-item-inner {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    column-gap: 12px;
    align-items: center;
  }

  .comparison-copy { display: contents; }

  .comparison-status {
    grid-column: 1;
    grid-row: 1;
    flex-basis: auto;
    width: 36px;
    height: 36px;
    margin: 0;
    border-radius: 12px;
  }

  .comparison-status svg {
    width: 18px;
    height: 18px;
  }

  .comparison-mobile-label {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
    min-width: 0;
    font-size: 11px;
  }

  .comparison-copy h3 {
    grid-column: 1 / -1;
    grid-row: 2;
    margin: 16px 0 0;
    font-size: clamp(18px, 5vw, 20px);
    line-height: 1.38;
  }

  .comparison-copy p {
    grid-column: 1 / -1;
    grid-row: 3;
    margin: 10px 0 0;
    font-size: 14.5px;
    line-height: 1.75;
  }

  .comparison-cta {
    gap: 26px;
    padding: 38px 20px 42px;
    margin-top: 28px;
    border-radius: 24px;
  }

  .comparison-cta h3 {
    max-width: 480px;
    font-size: clamp(23px, 6.2vw, 29px);
    line-height: 1.3;
    letter-spacing: -.035em;
  }

  .landing-comparison .comparison-cta-button {
    width: min(100%, 350px);
    min-height: 56px;
    padding: 16px 18px;
    font-size: 15px;
    border-radius: 15px;
  }

  .landing-comparison::before {
    width: 260px;
    height: 260px;
  }

  .landing-comparison::after {
    width: 280px;
    height: 280px;
  }
}

/* Small phones */
@media (max-width: 359px) {
  .comparison-container { width: calc(100% - 24px); }

  .comparison-pair {
    padding: 7px;
    border-radius: 24px;
  }

  .comparison-item {
    padding: 18px 14px;
    border-radius: 18px;
  }

  .comparison-item-inner {
    grid-template-columns: 32px minmax(0, 1fr);
    column-gap: 10px;
  }

  .comparison-status {
    width: 32px;
    height: 32px;
    border-radius: 10px;
  }

  .comparison-status svg {
    width: 16px;
    height: 16px;
  }

  .comparison-copy h3 { font-size: 17px; }
  .comparison-copy p { font-size: 14px; }
  .comparison-eyebrow { letter-spacing: 0; }
  .comparison-eyebrow::before { display: none; }

  .comparison-cta {
    padding: 32px 16px 36px;
    gap: 24px;
    border-radius: 22px;
  }

  .comparison-cta h3 { font-size: 22px; }

  .landing-comparison .comparison-cta-button {
    padding: 15px 12px;
    font-size: 14px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .landing-comparison::before,
  .landing-comparison::after,
  .landing-comparison *,
  .landing-comparison *::before,
  .landing-comparison *::after {
    animation: none !important;
    transition: none !important;
  }

  .landing-comparison .comparison-reveal {
    opacity: 1 !important;
    transform: none !important;
  }

  .comparison-item:hover,
  .landing-comparison .comparison-cta-button:hover,
  .landing-comparison .comparison-cta-button:active {
    transform: none;
  }
}
`

export default function Problems() {
  const headingId = useId()

  return (
    <section className="landing-comparison" aria-labelledby={headingId}>
      <style>{styles}</style>

      <div className="comparison-container">
        <header className="comparison-header">
          <span className="comparison-eyebrow">
            Common Landing Page Problems &amp; Solutions
          </span>

          <h2 id={headingId}>
            Getting Clicks, But{' '}
            <span>Not Enough Enquiries?</span>
          </h2>

          <p>
            Your landing page is where visitors decide whether your offer is
            right for them. If the message is unclear or the next step feels
            difficult, interested people may leave before connecting with you.
          </p>
        </header>

        <div className="comparison-board">
          <div className="comparison-column-headings">
            <div className="comparison-cell comparison-column-heading">
              <div className="comparison-column-title">
                <StatusIcon />
                <h3>What Holds Visitors Back</h3>
              </div>
              <p>Common landing page problems.</p>
            </div>

            <div className="comparison-cell comparison-cell--solution comparison-column-heading">
              <div className="comparison-column-title">
                <StatusIcon solution />
                <h3>How We Improve The Experience</h3>
              </div>
              <p>A clearer path from interest to enquiry.</p>
            </div>
          </div>

          <ul className="comparison-list">
            {problems.map(([title, description, improvement], index) => {
              const solution = solutionContent[title.toLowerCase()] || {
                title: 'Create A Clearer Visitor Experience',
                description: improvement,
              }

              return (
                <li className="comparison-pair" key={title}>
                  <article className="comparison-cell comparison-item">
                    <Reveal
                      delay={Math.min(index * 50, 200)}
                      className="comparison-reveal"
                    >
                      <div className="comparison-item-inner">
                        <StatusIcon />

                        <div className="comparison-copy">
                          <span className="comparison-mobile-label">
                            <span className="comparison-number">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            The Problem
                          </span>

                          <h3>{capitalizeHeading(title)}</h3>
                          <p>{description}</p>
                        </div>
                      </div>
                    </Reveal>
                  </article>

                  <article className="comparison-cell comparison-cell--solution comparison-item">
                    <Reveal
                      delay={Math.min(index * 50 + 60, 260)}
                      className="comparison-reveal"
                    >
                      <div className="comparison-item-inner">
                        <StatusIcon solution />

                        <div className="comparison-copy">
                          <span className="comparison-mobile-label">
                            <span className="comparison-number">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            Our Solution
                          </span>

                          <h3>{solution.title}</h3>
                          <p>{solution.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="comparison-cta">
          <h3>Ready To Turn More Visits Into Conversations?</h3>

          <div className="comparison-cta-action">
            <a href="#contact" className="site-cta--revenue comparison-cta-button">
              Yes! Help Me Increase My Revenue
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}