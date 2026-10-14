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
    --hero-ink: #2a1a40;
    --hero-body: #5f4d73;
    --hero-heading-grey: #343434;
    --hero-violet: #7c3aed;
    --hero-violet-deep: #5b21b6;
    --hero-gutter: clamp(16px, 4vw, 36px);
    --hero-ease: cubic-bezier(.22, 1, .36, 1);
    --focus-gap: clamp(28px, 3.4vw, 46px);
    --service-gap: 14px;

    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    padding: var(--hero-top-space, clamp(28px, 4vw, 56px)) 0 32px;
    color: var(--hero-ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    background:
      radial-gradient(60% 46% at 100% 0%, #ece0ff, transparent 70%),
      radial-gradient(45% 38% at 0% 10%, #fff0e6, transparent 70%),
      radial-gradient(70% 38% at 82% 62%, #efe6ff, transparent 72%),
      radial-gradient(50% 36% at 8% 78%, #f4edff, transparent 75%),
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
    background-image: radial-gradient(#8b5cf61c 1px, transparent 1px);
    background-size: 30px 30px;
    -webkit-mask-image: linear-gradient(#000a, transparent 60%);
    mask-image: linear-gradient(#000a, transparent 60%);
  }

  .premium-hero .premium-hero__container {
    width: 100%;
    max-width: 1180px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: var(--hero-gutter);
    text-align: center;
  }

  .premium-hero h1,
  .premium-hero h2,
  .premium-hero p,
  .premium-hero ul,
  .premium-hero figure {
    margin: 0;
  }

  .premium-hero h1,
  .premium-hero h2,
  .premium-hero p {
    overflow-wrap: break-word;
  }

  .premium-hero svg {
    display: block;
    flex-shrink: 0;
  }

  .premium-hero__reveal {
    min-width: 0;
    max-width: 100%;
    animation: premiumHeroEnter .85s var(--hero-ease) both;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }

  .premium-hero__head {
    width: 100%;
    max-width: 1080px;
    min-width: 0;
  }

  .premium-hero__pill {
    display: flex;
    justify-content: center;
  }

  .premium-hero .premium-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    max-width: 100%;
    padding: 11px 22px;
    border: 1px solid #ffffff45;
    border-radius: 999px;
    color: #fff;
    background:
      linear-gradient(180deg, #ffffff24, transparent 55%),
      linear-gradient(120deg, #2a1a40, #5b3a86);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      inset 0 1px 0 #ffffff33,
      0 16px 34px -16px #4c1d95a6;
    font-size: clamp(12.5px, 1.25vw, 14.5px);
    font-weight: 650;
    line-height: 1.6;
    text-wrap: balance;
  }

  .premium-hero__eyebrow::before {
    content: "";
    flex: 0 0 7px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffe0cc, #e58a5c);
    animation: premiumHeroPulse 3s ease-in-out infinite;
  }

  .premium-hero .premium-hero__title {
    max-width: 1000px;
    margin: clamp(18px, 2.4vw, 28px) auto 0;
    font-size: clamp(30px, 4.9vw, 62px);
    font-weight: 800;
    line-height: 1.14;
    letter-spacing: -.04em;
    text-wrap: balance;
  }

  .premium-hero__title-lead {
    color: var(--hero-ink);
  }

  .premium-hero__title-accent {
    color: var(--hero-violet);
    background: linear-gradient(
      105deg, #5b21b6 5%, #8b5cf6 45%, #c05fc0 75%, #e58a5c
    );
    background-size: 160% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: premiumHeroGradient 9s ease-in-out infinite alternate;
  }

  /* ---------- Subtitle heading (refined) ----------
     Dark grey #343434, medium weight, controlled width,
     tighter spacing. One fluid clamp() scales 320px -> 1440px+. */
  .premium-hero .premium-hero__subtitle {
    width: 100%;
    max-width: 800px;
    margin: clamp(12px, 1.6vw, 18px) auto 0;
    padding-inline: 0;
    color: var(--hero-heading-grey);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: clamp(15px, 0.9vw + 11px, 19px);
    font-weight: 650;
    line-height: 1.6;
    letter-spacing: -.01em;
    text-wrap: balance;
  }

  .premium-hero__focus-slot {
    width: 100%;
    max-width: 1060px;
    min-width: 0;
    margin: clamp(18px, 2.4vw, 28px) auto 0;
  }

  .premium-hero__promise {
    min-width: 0;
    overflow: hidden;
    border: 1px solid #eadff9;
    border-radius: 20px;
    text-align: left;
    background: linear-gradient(
      110deg, #ffffffd0, #f8f2ffd0 62%, #fff0e6d0
    );
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    box-shadow:
      inset 0 1px 0 #fff,
      0 22px 44px -28px #5b21b68c;
  }

  .premium-hero__focus-marquee {
    min-width: 0;
    overflow: hidden;
    padding-block: 19px;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 4%, #000 96%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 4%, #000 96%, transparent
    );
  }

  .premium-hero__focus-track,
  .premium-hero__track {
    display: flex;
    align-items: center;
    width: max-content;
    gap: 0;
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
    list-style: none;
  }

  .premium-hero__focus-item {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--focus-gap);
    color: #33224a;
    font-size: clamp(15.5px, 1.45vw, 18.5px);
    font-weight: 700;
    line-height: 1.5;
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

  .premium-hero__visual-slot {
    width: 100%;
    max-width: 960px;
    min-width: 0;
    margin: clamp(18px, 2.6vw, 28px) auto 0;
  }

  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    padding: clamp(8px, 2.5%, 22px) 0;
  }

  .premium-hero__visual::before {
    content: "";
    position: absolute;
    inset: 0 0 12% 8%;
    z-index: -1;
    border-radius: 50% 50% 0 0 / 46% 46% 0 0;
    background: linear-gradient(
      165deg, #e5d9fc, #d8c6fa 38%, #e9defc66 72%, transparent
    );
    -webkit-mask-image: linear-gradient(#000 55%, transparent);
    mask-image: linear-gradient(#000 55%, transparent);
    pointer-events: none;
  }

  .premium-hero__orb {
    position: absolute;
    z-index: 1;
    aspect-ratio: 1;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(
      circle at 32% 28%, #fff, #efe6fe 28%, #cdb6f6 68%, #b497ee
    );
    box-shadow: inset -6px -8px 14px #8e63e04d;
    opacity: .72;
    animation: premiumHeroBob 8s ease-in-out infinite alternate;
  }

  .premium-hero__orb--a {
    left: 1%;
    bottom: 20%;
    width: clamp(26px, 8%, 56px);
  }

  .premium-hero__orb--b {
    top: 6%;
    right: 1%;
    width: clamp(22px, 6%, 44px);
    animation-delay: -3s;
  }

  .premium-hero__image-wrap {
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

  .premium-hero__actions-slot {
    width: 100%;
    margin-top: 26px;
  }

  .premium-hero__actions {
    display: flex;
    justify-content: center;
  }

  /* ---------- Amber Glow button ----------
     Yellow-amber gradient, dark purple bold text, glossy top highlight,
     darker amber 3D bottom edge and a soft warm glow. */
  .premium-hero .premium-hero__button.premium-hero__button {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    max-width: 100%;
    min-height: 58px;
    padding: 16px clamp(20px, 4vw, 34px);
    border: 1px solid #f3b01f;
    border-radius: 16px;
    color: #2e0c4d;
    background: linear-gradient(
      180deg, #ffee82 0%, #ffe04e 48%, #ffca30 100%
    );
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

  /* glossy top shine */
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

  .premium-hero__showcase {
    width: 100%;
    margin-top: clamp(48px, 6vw, 76px);
  }

  /* Intro heading — refined: smaller size, lighter weight (800 -> 700),
     Title Case kept, softer tracking and slightly roomier line-height
     so it supports the content below instead of overpowering it. */
  .premium-hero .premium-hero__intro {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0;
    color: #2b2045;
    font-family: "Bricolage Grotesque", sans-serif;
    font-style: normal;
    font-size: 36px;
    font-weight: 700;
    line-height: 45px;
    letter-spacing: -0.028em;
    font-optical-sizing: auto;
    font-synthesis: none;
    text-align: center;
    text-transform: none;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .premium-hero__intro-accent {
    color: #5b21b6;
  }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: clamp(28px, 4vw, 42px);
    padding: 0;
    list-style: none;
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
      radial-gradient(
        ellipse at 100% 0%, var(--card-tint), transparent 72%
      ),
      linear-gradient(150deg, #ffffffef, #ffffffc9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
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
    color: var(--hero-body);
    font-size: clamp(15px, 1.4vw, 17px);
    font-weight: 600;
    line-height: 1.65;
    text-align: left;
  }

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
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
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
    list-style: none;
  }

  .premium-hero__service {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border: 1px solid #e5d7f7;
    border-radius: 999px;
    color: #5f4d73;
    background: #ffffffc9;
    box-shadow: inset 0 1px 0 #fff, 0 10px 20px -16px #5b21b680;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__service-icon {
    color: var(--hero-violet);
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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes premiumHeroMarquee {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
  }

  @keyframes premiumHeroGradient {
    from { background-position: 0% 50%; }
    to { background-position: 100% 50%; }
  }

  @keyframes premiumHeroPulse {
    0%, 100% { box-shadow: 0 0 0 0 #ffe0cc80; }
    50% { box-shadow: 0 0 0 6px #ffe0cc00; }
  }

  @keyframes premiumHeroBob {
    from { transform: translateY(0); }
    to { transform: translateY(-7px); }
  }

  /* ============ Tablet ============ */
  @media (max-width: 1023px) {
    .premium-hero .premium-hero__subtitle {
      max-width: 660px;
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

    .premium-hero__visual-slot {
      max-width: 760px;
    }
  }

  /* ============ Mobile ============ */
  @media (max-width: 767px) {
    .premium-hero {
      --focus-gap: 26px;
      --service-gap: 12px;
      padding-top: var(--hero-top-space, 24px);
    }

    /* Eyebrow: always one line, size scales with the viewport.
       76px = gutters (32) + pill padding (28) + dot (7) + gap (8) + border (2) - safety */
    .premium-hero .premium-hero__eyebrow {
      gap: 8px;
      padding: 10px 14px;
      border-radius: 999px;
      font-size: clamp(8px, calc((100vw - 76px) / 30), 13.5px);
      line-height: 1.5;
      letter-spacing: 0;
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
      font-size: clamp(28px, 7vw, 46px);
      line-height: 1.2;
      letter-spacing: -.034em;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 100%;
      margin-top: 12px;
      line-height: 1.55;
      letter-spacing: -.005em;
    }

    .premium-hero__focus-slot {
      margin-top: 18px;
    }

    .premium-hero__focus-marquee {
      padding-block: 16px;
    }

    .premium-hero__focus-item {
      font-size: 15px;
    }

    .premium-hero__promise {
      border-radius: 18px;
    }

    .premium-hero__actions-slot {
      max-width: 620px;
      margin-top: 24px;
    }

    .premium-hero .premium-hero__button {
      width: 100%;
      min-width: 0;
      padding-inline: 20px;
    }

    .premium-hero .premium-hero__intro {
      font-size: 27px;
      line-height: 35px;
      letter-spacing: -.024em;
    }

    /* 2 x 2 grid on mobile */
    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
    .premium-hero .premium-hero__eyebrow {
      gap: 7px;
      padding: 9px 12px;
      font-size: clamp(8px, calc((100vw - 72px) / 30), 13px);
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(27px, 7.2vw, 33px);
    }

    .premium-hero .premium-hero__intro {
      font-size: 24px;
      line-height: 31px;
    }

    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .premium-hero__point {
      padding: 16px 14px 18px;
      border-radius: 20px;
    }

    .premium-hero__point-top {
      gap: 8px;
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
    .premium-hero .premium-hero__eyebrow {
      gap: 6px;
      padding: 8px 10px;
      font-size: clamp(8px, calc((100vw - 70px) / 30), 12px);
    }

    .premium-hero .premium-hero__intro {
      font-size: 21px;
      line-height: 28px;
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
      padding: 16px var(--hero-gutter);
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

  section#top.premium-hero h2#premium-hero-funnel-heading.premium-hero__intro {
    max-width: 920px !important;
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
          <div className="premium-hero__head">
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
                </span>{' '}
                <span className="premium-hero__title-accent">
                  More Leads &amp; Revenue
                </span>{' '}
                <span className="premium-hero__title-accent">
                  Without Increasing Ad Spend.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="premium-hero__subtitle">
                We Don’t Just Build Landing Pages. We Build Complete Funnels
                With High-Converting Pages, Automation, Custom Tracking, and
                Analytics.
              </p>
            </Reveal>
          </div>

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

          <Reveal delay={240} className="premium-hero__visual-slot">
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
          </Reveal>

          <Reveal delay={290} className="premium-hero__actions-slot">
            <div className="premium-hero__actions">
              <Button className="site-cta--revenue premium-hero__button">
                 Yes! Let's Grow My Revenue 
              </Button>
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