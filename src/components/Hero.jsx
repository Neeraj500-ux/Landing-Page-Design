import { ScanEye } from 'lucide-react'
import { Button } from './ui'

const focusLines = Array(4).fill(
  'Guaranteed Better Funnel Performance. More Value from Every Ad Spend.'
)

const points = [
  {
    text: ' Communicate Your Offer Clearly.',
    icon: 'target',
    tone: 'peach',
  },
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
    text: '- Build Credibility With Relevant Proof.',
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

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <div
      className={`premium-hero__reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
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
    /* Palette (from reference): ink + violet/indigo + soft lavender + warm amber CTA */
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
    padding: var(--hero-top-space, clamp(28px, 4vw, 56px)) 0 32px;
    color: var(--ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
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
    animation: premiumHeroEnter .8s var(--hero-ease) both;
    animation-delay: var(--reveal-delay, 0ms);
  }

  /* ---------- Stage: text left, image right ---------- */
  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(28px, 5vw, 44px);
    align-items: center;
  }

  .premium-hero__copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  /* Eyebrow pill: light lavender with purple dot (as in reference) */
  .premium-hero__pill {
    display: flex;
    justify-content: flex-start;
    max-width: 100%;
  }

  .premium-hero .premium-hero__eyebrow {
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

  /* Heading: dark lead + violet-to-indigo gradient accent */
  .premium-hero .premium-hero__title {
    margin: clamp(18px, 2.4vw, 26px) 0 0;
    font-size: clamp(32px, 4.3vw, 54px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -.045em;
    text-wrap: balance;
  }

  .premium-hero__title-lead {
    display: block;
    color: var(--ink);
  }

  .premium-hero__title-accent {
    display: inline;
    color: var(--violet);
    background: linear-gradient(100deg, #8b5cf6 0%, #7c3aed 40%, var(--indigo) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .premium-hero .premium-hero__subtitle {
    width: 100%;
    max-width: 560px;
    margin: clamp(14px, 1.8vw, 20px) 0 0;
    color: var(--muted);
    font-size: clamp(15px, 0.8vw + 12px, 18px);
    font-weight: 500;
    line-height: 1.65;
    letter-spacing: -.005em;
  }

  .premium-hero__focus-slot {
    width: 100%;
    min-width: 0;
    margin-top: clamp(20px, 2.6vw, 30px);
  }

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
  }

  .premium-hero__focus-marquee {
    min-width: 0;
    overflow: hidden;
    padding-block: clamp(9px, 1.1vw, 12px);
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
    font-size: clamp(13px, 0.6vw + 10.5px, 17px);
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

  /* ---------- Image card (image + dark gradient + button) ---------- */
  .premium-hero__media {
    position: relative;
    width: 100%;
    max-width: 560px;
    min-width: 0;
    margin-inline: auto;
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
  }

  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    padding: clamp(14px, 3vw, 26px) clamp(14px, 3vw, 26px) 0;
    background:
      radial-gradient(70% 60% at 80% 0%, #ffffff8c, transparent 70%),
      linear-gradient(165deg, #efe7ff, #ddccfb 60%, #cfb9f6);
  }

  .premium-hero__visual::after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 40%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(180deg, transparent, #1b123399 55%, var(--dark-1));
  }

  .premium-hero__orb {
    position: absolute;
    z-index: 1;
    aspect-ratio: 1;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle at 32% 28%, #fff, #efe6fe 28%, #cdb6f6 68%, #b497ee);
    box-shadow: inset -6px -8px 14px #8e63e04d;
    opacity: .72;
    animation: premiumHeroBob 8s ease-in-out infinite alternate;
  }

  .premium-hero__orb--a {
    left: 3%;
    bottom: 30%;
    width: clamp(24px, 8%, 48px);
  }

  .premium-hero__orb--b {
    top: 5%;
    right: 4%;
    width: clamp(20px, 6%, 38px);
    animation-delay: -3s;
  }

  .premium-hero__image-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    min-width: 0;
  }

  .premium-hero .premium-hero__image {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
    border: 0;
    object-fit: contain;
    animation: premiumHeroBob 9s ease-in-out infinite alternate;
  }

  .premium-hero__panel {
    position: relative;
    z-index: 3;
    margin-top: -1px;
    padding: clamp(6px, 1vw, 10px) clamp(18px, 3.2vw, 30px) clamp(20px, 3.2vw, 28px);
    background:
      radial-gradient(80% 90% at 100% 100%, #7c3aed4d, transparent 70%),
      linear-gradient(180deg, var(--dark-1), var(--dark-2));
  }

  .premium-hero__actions {
    display: flex;
    justify-content: center;
  }

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
    min-height: 58px;
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
    transition:
      transform .25s var(--hero-ease),
      box-shadow .25s var(--hero-ease),
      filter .25s var(--hero-ease);
  }

  .premium-hero .premium-hero__button.premium-hero__button::before {
    content: "";
    position: absolute;
    inset: 0 0 50% 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg, #ffffff40, #ffffff00);
  }

  .premium-hero .premium-hero__button.premium-hero__button:active {
    transform: translateY(4px);
    box-shadow:
      inset 0 1px 0 #fff8c4,
      inset 0 -2px 4px #f5b2144d,
      0 1px 0 0 #d18f0a,
      0 8px 16px -8px #f5b323a0;
  }

  /* ---------- Showcase: intro + points ---------- */
  .premium-hero__showcase {
    width: 100%;
    margin-top: clamp(52px, 7vw, 84px);
  }

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

  .premium-hero__intro-accent {
    color: var(--violet-deep);
  }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: clamp(28px, 4vw, 42px);
    text-align: left;
  }

  .premium-hero__point {
    --card-border: #e3d3ff;
    --card-tint: #f3eaff;
    --tile-color: #7c3aed;
    --tile-base: #bc9be9;

    position: relative;
    min-width: 0;
    height: 100%;
    padding: 26px 24px 28px;
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
    transition:
      transform .35s var(--hero-ease),
      box-shadow .35s var(--hero-ease);
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
    box-shadow:
      inset 0 1px 0 #fff,
      0 5px 0 -1px var(--tile-base),
      0 12px 20px -12px var(--tile-color);
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
  .premium-hero__carousel {
    width: 100%;
    min-width: 0;
    margin-top: clamp(32px, 4vw, 48px);
  }

  .premium-hero__marquee {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    padding-block: 18px;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  }

  .premium-hero__track {
    animation-duration: 46s;
  }

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

  .premium-hero__focus-marquee:focus-visible,
  .premium-hero__marquee:focus-visible,
  .premium-hero .premium-hero__button:focus-visible {
    outline: 3px solid #a98af0;
    outline-offset: 6px;
  }

  @keyframes premiumHeroEnter {
    from { opacity: 0; transform: translateY(18px); }
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

  @keyframes premiumHeroBob {
    from { transform: translateY(0); }
    to { transform: translateY(-6px); }
  }

  /* ============ Desktop: text left, image right ============ */
  @media (min-width: 1024px) {
    .premium-hero__stage {
      grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr);
      gap: clamp(40px, 5vw, 64px);
    }

    .premium-hero__media {
      max-width: 520px;
      margin-left: auto;
      margin-right: 0;
    }
  }

  /* ============ Tablet ============ */
  @media (max-width: 1023px) {
    .premium-hero .premium-hero__subtitle {
      max-width: 620px;
    }

    .premium-hero .premium-hero__intro {
      font-size: 32px;
      line-height: 40px;
    }

    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      max-width: 760px;
      margin-inline: auto;
    }
  }

  /* ============ Mobile ============ */
  @media (max-width: 767px) {
    .premium-hero {
      --focus-gap: 20px;
      --service-gap: 12px;
      padding-top: var(--hero-top-space, 24px);
    }

    /* Eyebrow stays on one line, font scales with the viewport */
    .premium-hero .premium-hero__eyebrow {
      gap: 8px;
      padding: 9px 14px;
      font-size: clamp(8px, calc((100vw - 76px) / 30), 13.5px);
      line-height: 1.5;
      white-space: nowrap;
      text-wrap: nowrap;
    }

    .premium-hero__eyebrow > span {
      display: block;
      min-width: 0;
      white-space: nowrap;
    }

    .premium-hero .premium-hero__title {
      margin-top: 18px;
      font-size: clamp(32px, 9vw, 46px);
      line-height: 1.12;
      letter-spacing: -.045em;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 100%;
      margin-top: 14px;
      line-height: 1.6;
    }

    .premium-hero__focus-marquee {
      padding-block: 9px;
    }

    .premium-hero__focus-item {
      font-size: clamp(12.5px, 3.5vw, 15px);
      line-height: 1.35;
    }

    .premium-hero__focus-item::after {
      flex-basis: 7px;
      width: 7px;
      height: 7px;
    }

    .premium-hero__promise {
      border-radius: 14px;
    }

    .premium-hero .premium-hero__button.premium-hero__button {
      min-height: 64px;
      padding: 18px 20px;
      border-radius: 18px;
      font-size: clamp(16.5px, 5vw, 20px);
      line-height: 1.3;
      letter-spacing: -.012em;
    }

    .premium-hero .premium-hero__intro {
      font-size: 26px;
      line-height: 34px;
      letter-spacing: -0.015em;
    }

    .premium-hero .premium-hero__points {
      gap: 14px;
    }

    .premium-hero__point {
      padding: 20px 16px 22px;
      border-radius: 22px;
    }

    .premium-hero__point-top {
      gap: 8px;
    }

    .premium-hero__tile {
      flex-basis: 46px;
      width: 46px;
      height: 46px;
      border-radius: 14px;
    }

    .premium-hero__tile svg {
      width: 23px;
      height: 23px;
    }

    .premium-hero__point-number {
      flex-basis: 32px;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      font-size: 13.5px;
    }

    .premium-hero .premium-hero__point p {
      margin-top: 18px;
      font-size: 15px;
      line-height: 1.6;
    }
  }

  /* ============ Small phones ============ */
  @media (max-width: 479px) {
    .premium-hero {
      --focus-gap: 16px;
    }

    .premium-hero .premium-hero__eyebrow {
      gap: 7px;
      padding: 9px 12px;
      font-size: clamp(8px, calc((100vw - 72px) / 30), 13px);
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(30px, 8.6vw, 38px);
    }

    .premium-hero__focus-item {
      font-size: clamp(12px, 3.6vw, 14px);
    }

    .premium-hero .premium-hero__points {
      gap: 12px;
    }

    .premium-hero__point {
      padding: 16px 14px 18px;
      border-radius: 20px;
    }

    .premium-hero__tile {
      flex-basis: 42px;
      width: 42px;
      height: 42px;
      border-radius: 13px;
    }

    .premium-hero__tile svg {
      width: 21px;
      height: 21px;
    }

    .premium-hero__point-number {
      flex-basis: 30px;
      width: 30px;
      height: 30px;
      border-radius: 9px;
      font-size: 13px;
    }

    .premium-hero .premium-hero__point p {
      margin-top: 16px;
      font-size: 13.5px;
      line-height: 1.55;
    }
  }

  /* ============ Very small phones ============ */
  @media (max-width: 359px) {
    .premium-hero {
      --focus-gap: 14px;
    }

    .premium-hero .premium-hero__eyebrow {
      gap: 6px;
      padding: 8px 10px;
      font-size: clamp(8px, calc((100vw - 70px) / 30), 12px);
    }

    .premium-hero .premium-hero__title {
      font-size: 28px;
    }

    .premium-hero__focus-item {
      font-size: 12px;
    }

    .premium-hero .premium-hero__points {
      gap: 10px;
    }

    .premium-hero__point {
      padding: 14px 12px 16px;
      border-radius: 18px;
    }

    .premium-hero__tile {
      flex-basis: 38px;
      width: 38px;
      height: 38px;
      border-radius: 12px;
    }

    .premium-hero__tile svg {
      width: 19px;
      height: 19px;
    }

    .premium-hero__point-number {
      flex-basis: 28px;
      width: 28px;
      height: 28px;
      font-size: 12.5px;
    }

    .premium-hero .premium-hero__point p {
      margin-top: 14px;
      font-size: 13px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .premium-hero__point:hover {
      transform: translateY(-5px);
      box-shadow:
        inset 0 1px 0 #fff,
        0 30px 44px -26px #5b21b68f;
    }

    .premium-hero__point:hover .premium-hero__tile svg {
      transform: rotate(-6deg) scale(1.08);
    }

    .premium-hero__card {
      transition: transform .45s var(--hero-ease);
    }

    .premium-hero__card:hover {
      transform: translateY(-4px);
    }

    .premium-hero .premium-hero__button.premium-hero__button:hover {
      transform: translateY(-3px);
      filter: brightness(1.04) saturate(1.05);
      box-shadow:
        inset 0 1px 0 #fff8c4,
        inset 0 -2px 4px #f5b2144d,
        0 8px 0 0 #d18f0a,
        0 24px 38px -12px #f5b323c0;
    }

    .premium-hero__promise:hover .premium-hero__focus-track,
    .premium-hero__marquee:hover .premium-hero__track {
      animation-play-state: paused;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .premium-hero *,
    .premium-hero *::before,
    .premium-hero *::after {
      animation: none !important;
      transition: none !important;
    }

    .premium-hero__reveal {
      opacity: 1;
      transform: none;
    }

    .premium-hero__focus-marquee,
    .premium-hero__marquee {
      padding: 12px var(--hero-gutter);
      -webkit-mask-image: none;
      mask-image: none;
    }

    .premium-hero__focus-track,
    .premium-hero__track {
      width: 100%;
      transform: none;
      will-change: auto;
    }

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
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent {
      font-size: 32px !important;
      line-height: 40px !important;
    }
  }

  @media (max-width: 767px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent {
      font-size: 26px !important;
      line-height: 34px !important;
      letter-spacing: -0.015em !important;
    }
  }

  @media (max-width: 479px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent {
      font-size: 23px !important;
      line-height: 31px !important;
    }
  }

  @media (max-width: 359px) {
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro,
    section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro .premium-hero__intro-accent {
      font-size: 21px !important;
      line-height: 28px !important;
    }
  }
`

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const heroImage = `${normalizedBase}images/Neeraj2.png`

  return (
    <section
      id="top"
      className="premium-hero"
      aria-labelledby="premium-hero-title"
    >
      <style>{styles}</style>

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

            <Reveal delay={70}>
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

            <Reveal delay={140}>
              <p className="premium-hero__subtitle">
                Stop Wasting Ad Spend on Low Conversion Pages.
                Invest in a High-Converting Automated Funnel.
              </p>
            </Reveal>

            <Reveal delay={200} className="premium-hero__focus-slot">
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
          <Reveal delay={240} className="premium-hero__media">
            <div className="premium-hero__card">
              <div className="premium-hero__visual">
                <span
                  className="premium-hero__orb premium-hero__orb--a"
                  aria-hidden="true"
                />
                <span
                  className="premium-hero__orb premium-hero__orb--b"
                  aria-hidden="true"
                />

                <figure className="premium-hero__image-wrap">
                  <img
                    src={heroImage}
                    alt="Coaching landing page shown on desktop and mobile"
                    className="premium-hero__image"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </figure>
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

        <Reveal delay={390} className="premium-hero__showcase">
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

      <div className="premium-hero__carousel">
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
      </div>
    </section>
  )
}