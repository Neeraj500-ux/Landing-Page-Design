import { ScanEye } from 'lucide-react'
import { Button } from './ui'

const points = [
  {
    text: 'Communicate your offer clearly.',
    icon: 'target',
    tone: 'peach',
  },
  {
    text: 'Custom pixel tracking to optimize your ads.',
    icon: 'scan-eye',
    tone: 'purple',
  },
  {
    text: 'Make enquiries and bookings simple.',
    icon: 'calendar',
    tone: 'gold',
  },
  {
    text: 'Build credibility with relevant proof.',
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
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
        <path d="M20 2v4m-2-2h4" />
      </>
    ),
    pause: <path d="M9 5v14M15 5v14" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
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
  const scan = name === 'scan-eye' ? ' premium-hero__tile--scan' : ''

  return (
    <span className={`premium-hero__tile premium-hero__tile--${tone}${scan}`}>
      <Icon name={name} />
    </span>
  )
}

const styles = `
  .premium-hero {
    --hero-ink: #2a1a40;
    --hero-body: #5f4d73;
    --hero-muted: #7a6a8c;
    --hero-violet: #7c3aed;
    --hero-violet-deep: #5b21b6;
    --hero-line: #e9defa;
    --hero-gutter: clamp(18px, 4.5vw, 36px);
    --hero-ease: cubic-bezier(.22, 1, .36, 1);
    --hero-block-gap: clamp(32px, 4vw, 44px);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: var(--hero-top-space, clamp(28px, 4vw, 56px)) 0 28px;
    overflow: hidden;
    overflow: clip;
    color: var(--hero-ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    background:
      radial-gradient(60% 46% at 100% 0%, #ece0ff 0%, transparent 70%),
      radial-gradient(45% 38% at 0% 10%, #fff0e6 0%, transparent 70%),
      radial-gradient(70% 38% at 82% 62%, #efe6ff 0%, transparent 72%),
      radial-gradient(50% 36% at 8% 78%, #f4edff 0%, transparent 75%),
      #ffffff;
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

  .premium-hero::after {
    content: "";
    position: absolute;
    top: -10%;
    right: -12%;
    z-index: -1;
    width: min(70vw, 760px);
    aspect-ratio: 1;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, #c9aefb55, transparent 68%);
    filter: blur(24px);
    animation: premiumHeroFloat 14s ease-in-out infinite alternate;
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
    word-break: normal;
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

  /* Main layout */
  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "head" "focus" "visual" "actions";
    gap: 0;
    justify-items: center;
    align-items: start;
  }

  .premium-hero__head {
    grid-area: head;
    width: 100%;
    max-width: 1080px;
    min-width: 0;
    margin-inline: auto;
    text-align: center;
  }

  .premium-hero__focus-slot {
    grid-area: focus;
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: 1040px;
    margin: clamp(22px, 2.6vw, 30px) auto 0;
    padding-inline: 0;
  }

  .premium-hero__visual-slot {
    grid-area: visual;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    max-width: 920px;
    margin: clamp(16px, 2vw, 24px) auto 0;
  }

  .premium-hero__actions-slot {
    grid-area: actions;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 920px;
    min-width: 0;
    margin: clamp(24px, 3vw, 32px) auto 0;
  }

  /* Eyebrow */
  .premium-hero__pill {
    display: flex;
    justify-content: center;
    min-width: 0;
  }

  .premium-hero .premium-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    max-width: 100%;
    padding: 10px 20px;
    border: 1px solid #ffffff40;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(120deg, #2a1a40, #5b3a86);
    box-shadow:
      inset 0 1px 0 #ffffff2e,
      0 14px 30px -16px #4c1d9599;
    font-size: clamp(11px, 1.2vw, 14px);
    font-weight: 650;
    line-height: 1.6;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__eyebrow > span { min-width: 0; }

  .premium-hero__eyebrow svg {
    width: 15px;
    height: 15px;
    color: #ffe0cc;
  }

  /* Smaller, balanced desktop heading */
  .premium-hero .premium-hero__title {
    width: 100%;
    max-width: 1000px;
    margin: clamp(22px, 2.6vw, 30px) auto 0;
    font-size: clamp(32px, 3.8vw, 48px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -.035em;
    word-spacing: .04em;
    text-align: center;
    text-wrap: balance;
    overflow-wrap: break-word;
    word-break: normal;
    hyphens: none;
  }

  .premium-hero__title-line {
    display: inline;
    max-width: 100%;
    white-space: normal;
  }

  .premium-hero__title-lead { color: var(--hero-ink); }

  .premium-hero__title-accent {
    padding-bottom: .09em;
    color: #7c3aed;
    background: linear-gradient(
      105deg, #5b21b6 5%, #8b5cf6 45%, #c05fc0 75%, #e58a5c 100%
    );
    background-size: 160% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: premiumHeroGradient 9s ease-in-out infinite alternate;
  }

  /* Exact copy, wide enough for two balanced desktop lines */
  .premium-hero .premium-hero__subtitle {
    width: 100%;
    max-width: 1020px;
    margin: clamp(16px, 2vw, 22px) auto 0;
    color: var(--hero-violet-deep);
    font-size: clamp(16px, 1.5vw, 19px);
    font-weight: 700;
    line-height: 1.65;
    letter-spacing: -.01em;
    text-align: center;
    text-wrap: balance;
  }

  /* CTA */
  .premium-hero__actions {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
  }

  .premium-hero .premium-hero__button {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: auto;
    max-width: 100%;
    min-width: min(340px, 100%);
    min-height: 58px;
    height: auto;
    padding: 15px 34px;
    overflow: hidden;
    border: 1px solid #ffffff66;
    border-radius: 18px;
    color: #fff;
    background: linear-gradient(135deg, #a06bf5 0%, #7c3aed 55%, #6d28d9);
    box-shadow:
      0 5px 0 -1px #5b21b6,
      0 22px 38px -16px #7c3aedb3,
      inset 0 1px 0 #ffffff59;
    font-family: inherit;
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -.01em;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    text-wrap: balance;
    white-space: normal;
    overflow-wrap: anywhere;
    cursor: pointer;
    transition:
      transform .3s var(--hero-ease),
      box-shadow .3s ease,
      filter .3s ease;
  }

  .premium-hero__button::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      110deg, transparent 30%, #ffffff3d 50%, transparent 70%
    );
    transform: translateX(-140%);
    animation: premiumHeroSheen 7s ease-in-out 2s infinite;
  }

  .premium-hero__button > span {
    min-width: 0;
    white-space: normal;
  }

  .premium-hero__button svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .premium-hero .premium-hero__button:active {
    transform: translateY(3px);
    box-shadow:
      0 2px 0 -1px #5b21b6,
      0 10px 20px -14px #7c3aed99;
  }

  /* Image */
  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 920px;
    min-width: 0;
    margin: 0 auto;
    padding: clamp(8px, 2.5%, 22px) 0;
  }

  .premium-hero__visual::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 12%;
    left: 8%;
    z-index: -2;
    border-radius: 50% 50% 0 0 / 46% 46% 0 0;
    background: linear-gradient(
      165deg, #e5d9fc 0%, #d8c6fa 38%, #e9defc66 72%, transparent 100%
    );
    -webkit-mask-image: linear-gradient(#000 55%, transparent 100%);
    mask-image: linear-gradient(#000 55%, transparent 100%);
    opacity: .85;
    pointer-events: none;
  }

  .premium-hero__visual::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 1%;
    left: 0;
    z-index: -1;
    height: 34%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center, #ffffff 0%, #ebe0fd 46%, transparent 72%
    );
    filter: blur(12px);
    pointer-events: none;
  }

  .premium-hero__orb {
    position: absolute;
    z-index: 1;
    aspect-ratio: 1;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(
      circle at 32% 28%,
      #ffffff 0%, #efe6fe 28%, #cdb6f6 68%, #b497ee 100%
    );
    box-shadow:
      inset -6px -8px 14px #8e63e04d,
      0 14px 26px -12px #7c3aed66;
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
    position: relative;
    width: 100%;
    min-width: 0;
    transition: transform .6s var(--hero-ease);
  }

  .premium-hero .premium-hero__image {
    display: block;
    position: static;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    object-fit: contain;
    object-position: center;
    transform: none;
    animation: premiumHeroDrift 9s ease-in-out infinite alternate;
    -webkit-mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent),
      linear-gradient(180deg, transparent, #000 6%, #000 93%, transparent);
    -webkit-mask-composite: source-in;
    mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent),
      linear-gradient(180deg, transparent, #000 6%, #000 93%, transparent);
    mask-composite: intersect;
  }

  /* Our Focus */
  .premium-hero__promise {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    align-items: stretch;
    width: 100%;
    min-width: 0;
    margin: 0;
    overflow: hidden;
    border: 1px solid #ffffffd0;
    border-radius: 18px;
    text-align: left;
    background: linear-gradient(110deg, #ffffffcc, #f8f2ffcc 65%, #fff0e6cc);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow:
      0 0 0 1px #eadff9,
      inset 0 1px 0 #fff,
      0 18px 36px -26px #5b21b685;
  }

  .premium-hero__promise-label {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 28px 14px 20px;
    color: #fff;
    background: linear-gradient(120deg, #2a1a40, #5b3a86);
    clip-path: polygon(0 0, 100% 0, calc(100% - 13px) 100%, 0 100%);
    font-size: 11.5px;
    font-weight: 750;
    line-height: 1.4;
    letter-spacing: .07em;
    text-align: left;
  }

  .premium-hero__label-text {
    width: auto;
    white-space: nowrap;
  }

  .premium-hero__focus-break { display: none; }

  .premium-hero__spark {
    display: grid;
    flex: 0 0 17px;
    place-items: center;
    width: 17px;
    height: 17px;
  }

  .premium-hero__spark svg {
    width: 17px;
    height: 17px;
    color: #ffe0cc;
    animation: premiumHeroTwinkle 5s ease-in-out infinite;
  }

  .premium-hero__promise-window {
    position: relative;
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    padding-block: 14px;
    margin-left: -10px;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
  }

  .premium-hero__track {
    display: flex;
    flex: 0 0 auto;
    width: max-content;
    animation: premiumHeroMarquee 48s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }

  /* Four identical groups keep the focus loop seamless. */
  .premium-hero__promise-window .premium-hero__track {
    animation-name: premiumHeroTicker;
    animation-duration: 18s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .premium-hero .premium-hero__promise-group,
  .premium-hero .premium-hero__marquee-group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 22px;
    margin: 0;
    padding: 0 22px 0 0;
    list-style: none;
  }

  .premium-hero__promise-group li {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 11px;
    color: var(--hero-body);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__focus-icon {
    display: inline-grid;
    flex: 0 0 30px;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #e5d6f8;
    border-radius: 9px;
    color: #8b5cf6;
    background: linear-gradient(145deg, #fff, #f0e6fc);
  }

  .premium-hero__promise-group svg {
    width: 19px;
    height: 19px;
    color: #8b5cf6;
  }

  /* Showcase */
  .premium-hero__showcase {
    width: 100%;
    min-width: 0;
    margin-top: clamp(30px, 3.6vw, 42px);
  }

  .premium-hero .premium-hero__section-title {
    max-width: 22em;
    margin: 0 auto;
    color: var(--hero-ink);
    font-size: clamp(22px, 3vw, 34px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -.03em;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__section-title::before {
    content: "";
    display: block;
    width: 44px;
    height: 4px;
    margin: 0 auto clamp(14px, 2.4vw, 20px);
    border-radius: 999px;
    background: linear-gradient(90deg, #8b5cf6, #e58a5c);
  }

  .premium-hero .premium-hero__intro {
    max-width: 780px;
    margin: clamp(16px, 2vw, 22px) auto 0;
    color: var(--hero-muted);
    font-size: clamp(14.5px, 1.5vw, 17px);
    font-weight: 400;
    line-height: 1.75;
    text-wrap: balance;
  }

  .premium-hero__intro strong {
    color: var(--hero-violet-deep);
    font-weight: 700;
  }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
    gap: 20px;
    width: 100%;
    max-width: 1024px;
    min-width: 0;
    margin: clamp(28px, 3.5vw, 40px) auto 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  .premium-hero__point {
    --card-tint: #f1e7ff;
    --card-edge: #e6d9f8;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 29px 20px 27px;
    border: 1px solid #ffffffd9;
    border-radius: clamp(18px, 2.2vw, 26px);
    background:
      radial-gradient(ellipse at 100% 0, var(--card-tint), transparent 72%),
      linear-gradient(145deg, #ffffffe6, #ffffff99);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow:
      0 0 0 1px var(--card-edge),
      inset 0 1px

```jsx
import { ScanEye } from 'lucide-react'
import { Button } from './ui'

const points = [
  {
    text: 'Communicate your offer clearly.',
    icon: 'target',
    tone: 'peach',
  },
  {
    text: 'Custom pixel tracking to optimize your ads.',
    icon: 'scan-eye',
    tone: 'purple',
  },
  {
    text: 'Make enquiries and bookings simple.',
    icon: 'calendar',
    tone: 'gold',
  },
  {
    text: 'Build credibility with relevant proof.',
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
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
        <path d="M20 2v4m-2-2h4" />
      </>
    ),
    pause: <path d="M9 5v14M15 5v14" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
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
  const scan = name === 'scan-eye' ? ' premium-hero__tile--scan' : ''

  return (
    <span className={`premium-hero__tile premium-hero__tile--${tone}${scan}`}>
      <Icon name={name} />
    </span>
  )
}

const styles = `
  .premium-hero {
    --hero-ink: #2a1a40;
    --hero-body: #5f4d73;
    --hero-muted: #7a6a8c;
    --hero-violet: #7c3aed;
    --hero-violet-deep: #5b21b6;
    --hero-line: #e9defa;
    --hero-gutter: clamp(20px, 4vw, 36px);
    --hero-ease: cubic-bezier(.22, 1, .36, 1);
    --hero-block-gap: clamp(34px, 4vw, 48px);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: var(--hero-top-space, clamp(28px, 4vw, 56px)) 0 28px;
    overflow: hidden;
    overflow: clip;
    color: var(--hero-ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;

    background:
      radial-gradient(60% 46% at 100% 0%, #ece0ff 0%, transparent 70%),
      radial-gradient(45% 38% at 0% 10%, #fff0e6 0%, transparent 70%),
      radial-gradient(70% 38% at 82% 62%, #efe6ff 0%, transparent 72%),
      radial-gradient(50% 36% at 8% 78%, #f4edff 0%, transparent 75%),
      #ffffff;
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

  .premium-hero::after {
    content: "";
    position: absolute;
    top: -10%;
    right: -12%;
    z-index: -1;
    width: min(70vw, 760px);
    aspect-ratio: 1;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, #c9aefb55, transparent 68%);
    filter: blur(24px);
    animation: premiumHeroFloat 14s ease-in-out infinite alternate;
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
    word-break: normal;
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

  /* Main layout */
  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "head" "focus" "visual" "actions";
    gap: 0;
    justify-items: center;
    align-items: start;
  }

  .premium-hero__head {
    grid-area: head;
    width: 100%;
    max-width: 1080px;
    min-width: 0;
    margin-inline: auto;
    text-align: center;
  }

  .premium-hero__focus-slot {
    grid-area: focus;
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: 1040px;
    margin: 24px auto 0;
    padding-inline: 0;
  }

  .premium-hero__visual-slot {
    grid-area: visual;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 960px;
    min-width: 0;
    margin: 22px auto 0;
  }

  .premium-hero__actions-slot {
    grid-area: actions;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 960px;
    min-width: 0;
    margin: 28px auto 0;
  }

  /* Top pill */
  .premium-hero__pill {
    display: flex;
    justify-content: center;
    min-width: 0;
  }

  .premium-hero .premium-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    max-width: 100%;
    padding: 10px 20px;
    border: 1px solid #ffffff40;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(120deg, #2a1a40, #5b3a86);
    box-shadow:
      inset 0 1px 0 #ffffff2e,
      0 14px 30px -16px #4c1d9599;
    font-size: clamp(11px, 1.2vw, 14px);
    font-weight: 650;
    line-height: 1.6;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__eyebrow > span { min-width: 0; }

  .premium-hero__eyebrow svg {
    width: 15px;
    height: 15px;
    color: #ffe0cc;
  }

  /* Smaller, balanced desktop heading */
  .premium-hero .premium-hero__title {
    width: 100%;
    max-width: 1000px;
    margin: clamp(22px, 2.5vw, 30px) auto 0;
    font-size: clamp(34px, 3.8vw, 50px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -.035em;
    word-spacing: .04em;
    text-align: center;
    text-wrap: balance;
    overflow-wrap: break-word;
    word-break: normal;
    hyphens: none;
  }

  .premium-hero__title-line {
    display: inline;
    max-width: 100%;
    white-space: normal;
  }

  .premium-hero__title-lead { color: var(--hero-ink); }

  .premium-hero__title-accent {
    padding-bottom: .09em;
    color: #7c3aed;
    background: linear-gradient(
      105deg,
      #5b21b6 5%,
      #8b5cf6 45%,
      #c05fc0 75%,
      #e58a5c 100%
    );
    background-size: 160% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: premiumHeroGradient 9s ease-in-out infinite alternate;
  }

  /* Exact subheading, naturally balanced within a wider desktop measure */
  .premium-hero .premium-hero__subtitle {
    width: 100%;
    max-width: 1040px;
    margin: 20px auto 0;
    color: var(--hero-violet-deep);
    font-size: clamp(16px, 1.55vw, 19px);
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: -.01em;
    text-align: center;
    text-wrap: balance;
  }

  /* CTA */
  .premium-hero__actions {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
  }

  .premium-hero .premium-hero__button {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: auto;
    max-width: 100%;
    min-width: min(340px, 100%);
    min-height: 58px;
    height: auto;
    padding: 15px 34px;
    overflow: hidden;
    border: 1px solid #ffffff66;
    border-radius: 18px;
    color: #fff;
    background: linear-gradient(135deg, #a06bf5 0%, #7c3aed 55%, #6d28d9);
    box-shadow:
      0 5px 0 -1px #5b21b6,
      0 22px 38px -16px #7c3aedb3,
      inset 0 1px 0 #ffffff59;
    font-family: inherit;
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -.01em;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    text-wrap: balance;
    white-space: normal;
    overflow-wrap: anywhere;
    cursor: pointer;
    transition:
      transform .3s var(--hero-ease),
      box-shadow .3s ease,
      filter .3s ease;
  }

  .premium-hero__button::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      110deg, transparent 30%, #ffffff3d 50%, transparent 70%
    );
    transform: translateX(-140%);
    animation: premiumHeroSheen 7s ease-in-out 2s infinite;
  }

  .premium-hero__button > span {
    min-width: 0;
    white-space: normal;
  }

  .premium-hero__button svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .premium-hero .premium-hero__button:active {
    transform: translateY(3px);
    box-shadow:
      0 2px 0 -1px #5b21b6,
      0 10px 20px -14px #7c3aed99;
  }

  /* Hero image */
  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 960px;
    min-width: 0;
    margin: 0 auto;
    padding: clamp(8px, 2.5%, 22px) 0;
  }

  .premium-hero__visual::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 12%;
    left: 8%;
    z-index: -2;
    border-radius: 50% 50% 0 0 / 46% 46% 0 0;
    background: linear-gradient(
      165deg,
      #e5d9fc 0%,
      #d8c6fa 38%,
      #e9defc66 72%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(#000 55%, transparent 100%);
    mask-image: linear-gradient(#000 55%, transparent 100%);
    opacity: .85;
    pointer-events: none;
  }

  .premium-hero__visual::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 1%;
    left: 0;
    z-index: -1;
    height: 34%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center, #ffffff 0%, #ebe0fd 46%, transparent 72%
    );
    filter: blur(12px);
    pointer-events: none;
  }

  .premium-hero__orb {
    position: absolute;
    z-index: 1;
    aspect-ratio: 1;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(
      circle at 32% 28%,
      #ffffff 0%,
      #efe6fe 28%,
      #cdb6f6 68%,
      #b497ee 100%
    );
    box-shadow:
      inset -6px -8px 14px #8e63e04d,
      0 14px 26px -12px #7c3aed66;
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
    position: relative;
    width: 100%;
    min-width: 0;
    transition: transform .6s var(--hero-ease);
  }

  .premium-hero .premium-hero__image {
    display: block;
    position: static;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    object-fit: contain;
    object-position: center;
    transform: none;
    animation: premiumHeroDrift 9s ease-in-out infinite alternate;
    -webkit-mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent),
      linear-gradient(180deg, transparent, #000 6%, #000 93%, transparent);
    -webkit-mask-composite: source-in;
    mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent),
      linear-gradient(180deg, transparent, #000 6%, #000 93%, transparent);
    mask-composite: intersect;
  }

  /* Our Focus */
  .premium-hero__promise {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    align-items: stretch;
    width: 100%;
    min-width: 0;
    margin: 0;
    overflow: hidden;
    border: 1px solid #ffffffd0;
    border-radius: 18px;
    text-align: left;
    background: linear-gradient(110deg, #ffffffcc, #f8f2ffcc 65%, #fff0e6cc);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow:
      0 0 0 1px #eadff9,
      inset 0 1px 0 #fff,
      0 18px 36px -26px #5b21b685;
  }

  .premium-hero__promise-label {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 28px 14px 20px;
    color: #fff;
    background: linear-gradient(120deg, #2a1a40, #5b3a86);
    clip-path: polygon(0 0, 100% 0, calc(100% - 13px) 100%, 0 100%);
    font-size: 11px;
    font-weight: 750;
    line-height: 1.4;
    letter-spacing: .07em;
    text-align: left;
  }

  .premium-hero__label-text {
    width: auto;
    white-space: nowrap;
  }

  .premium-hero__focus-break { display: none; }

  .premium-hero__spark {
    display: grid;
    flex: 0 0 17px;
    place-items: center;
    width: 17px;
    height: 17px;
  }

  .premium-hero__spark svg {
    width: 17px;
    height: 17px;
    color: #ffe0cc;
    animation: premiumHeroTwinkle 5s ease-in-out infinite;
  }

  .premium-hero__promise-window {
    position: relative;
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    padding-block: 14px;
    margin-left: -10px;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
  }

  .premium-hero__track {
    display: flex;
    flex: 0 0 auto;
    width: max-content;
    animation: premiumHeroMarquee 48s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }

  .premium-hero__promise-window .premium-hero__track {
    animation-name: premiumHeroTicker;
    animation-duration: 18s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .premium-hero .premium-hero__promise-group,
  .premium-hero .premium-hero__marquee-group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 22px;
    margin: 0;
    padding: 0 22px 0 0;
    list-style: none;
  }

  .premium-hero__promise-group li {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 11px;
    color: var(--hero-body);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__focus-icon {
    display: inline-grid;
    flex: 0 0 30px;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #e5d6f8;
    border-radius: 9px;
    color: #8b5cf6;
    background: linear-gradient(145deg, #fff, #f0e6fc);
  }

  .premium-hero__promise-group svg {
    width: 19px;
    height: 19px;
    color: #8b5cf6;
  }

  /* Showcase */
  .premium-hero__showcase {
    width: 100%;
    min-width: 0;
    margin-top: 36px;
  }

  .premium-hero .premium-hero__section-title {
    max-width: 22em;
    margin: 0 auto;
    color: var(--hero-ink);
    font-size: clamp(22px, 5.6vw, 34px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -.03em;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__section-title::before {
    content: "";
    display: block;
    width: 44px;
    height: 4px;
    margin: 0 auto clamp(14px, 2.4vw, 20px);
    border-radius: 999px;
    background: linear-gradient(90deg, #8b5cf6, #e58a5c);
  }

  .premium-hero .premium-hero__intro {
    max-width: 780px;
    margin: clamp(17px, 2.4vw, 26px) auto 0;
    color: var(--hero-muted);
    font-size: clamp(14.5px, 3.9vw, 17px);
    font-weight: 400;
    line-height: 1.75;
    text-wrap: balance;
  }

  .premium-hero__intro strong {
    color: var(--hero-violet-deep);
    font-weight: 700;
  }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
    gap: 20px;
    width: 100%;
    max-width: 1024px;
    min-width: 0;
    margin: 34px auto 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  .premium-hero__point {
    --card-tint: #f1e7ff;
    --card-edge: #e6d9f8;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 29px 20px 27px;
    border: 1px solid #ffffffd9;
    border-radius: clamp(18px, 2.2vw, 26px);
    background:
      radial-gradient(ellipse at 100% 0, var(--card-tint), transparent 72%),
      linear-gradient(145deg, #ffffffe6, #ffffff99);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow:
      0 0 0 1px var(--card-edge),
      inset 0 1px 0 #fff,
      0 20px 34px -28px #5b21b680;
    transition: transform .4s var(--hero-ease), box-shadow .4s ease;
  }

  .premium-hero__point::before {
    content: "";
    position: absolute;
    top: 0;
    left: 22px;
    right: 22px;
    height: 2px;
    border-radius: 0 0 4px 4px;
    background: linear-gradient(
      90deg, transparent, var(--card-accent, #a98af0), transparent
    );
    opacity: .55;
    pointer-events: none;
    transition:
      opacity .4s ease,
      left .4s var(--hero-ease),
      right .4s var(--hero-ease);
  }

  .premium-hero__point--peach {
    --card-tint: #ffeadb;
    --card-edge: #f2dccf;
    --card-accent: #e5a07a;
  }

  .premium-hero__point--gold {
    --card-tint: #fff2cf;
    --card-edge: #efe2bd;
    --card-accent: #d6b457;
  }

  .premium-hero__point-top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 8px;
    min-width: 0;
    padding-inline: 24px;
  }

  .premium-hero__point-number {
    position: absolute;
    top: 14px;
    right: 14px;
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 24px;
    height: 24px;
    border: 1px solid #e8def0;
    border-radius: 50%;
    color: #8f7aa3;
    background: #ffffffb3;
    font-size: 10px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .premium-hero .premium-hero__point p {
    max-width: 24ch;
    margin: 23px auto 0;
    color: #3f2d57;
    font-size: clamp(13px, 3.4vw, 16px);
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -.015em;
    text-align: center;
    text-wrap: pretty;
  }

  .premium-hero__tile {
    --tile-bottom: #eee2fb;
    --tile-border: #dcc7f3;
    --tile-base: #c3a4e6;
    --tile-ink: #7c3aed;
    position: relative;
    display: inline-grid;
    flex: 0 0 auto;
    place-items: center;
    width: clamp(40px, 10vw, 52px);
    height: clamp(40px, 10vw, 52px);
    margin-bottom: 4px;
    border: 1px solid var(--tile-border);
    border-radius: 15px;
    color: var(--tile-ink);
    background: linear-gradient(145deg, #fff, var(--tile-bottom));
    box-shadow:
      0 5px 0 -1px var(--tile-base),
      0 14px 20px -15px var(--tile-ink),
      inset 0 1px 0 #fff;
    transition: transform .4s var(--hero-ease), box-shadow .4s ease;
  }

  .premium-hero__tile::before {
    content: "";
    position: absolute;
    inset: 3px;
    border: 1px solid #ffffffb0;
    border-radius: 11px;
    pointer-events: none;
  }

  .premium-hero__tile svg {
    width: 22px;
    height: 22px;
    transition: transform .4s var(--hero-ease), filter .4s ease;
  }

  .premium-hero__tile--peach {
    --tile-bottom: #ffe6d4;
    --tile-border: #f0cdb9;
    --tile-base: #dcaf97;
    --tile-ink: #d67951;
  }

  .premium-hero__tile--gold {
    --tile-bottom: #ffefc2;
    --tile-border: #eed797;
    --tile-base: #d6bd75;
    --tile-ink: #ab8531;
  }

  .premium-hero__tile--scan {
    --tile-bottom: #eadcfc;
    --tile-border: #d6bff3;
    --tile-base: #b99be3;
    --tile-ink: #7c3aed;
  }

  .premium-hero__tile--scan svg {
    width: 23px;
    height: 23px;
  }

  /* Services carousel */
  .premium-hero__carousel {
    width: 100%;
    max-width: none;
    min-width: 0;
    margin: var(--hero-block-gap) auto 0;
  }

  .premium-hero__marquee {
    min-width: 0;
    overflow: hidden;
    padding-block: 14px;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 6%, #000 94%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 6%, #000 94%, transparent
    );
  }

  .premium-hero__marquee .premium-hero__track { animation-duration: 28s; }

  .premium-hero .premium-hero__marquee-group {
    gap: 14px;
    padding-right: 14px;
  }

  .premium-hero__service {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 10px;
    padding: 9px 18px 9px 9px;
    border: 1px solid #ffffffd9;
    border-radius: 999px;
    color: #5f4380;
    background: linear-gradient(145deg, #ffffffe6, #fbf7ffcc);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow:
      0 0 0 1px #e8dcf8,
      0 10px 20px -16px #5b21b680,
      inset 0 1px 0 #fff;
    font-size: 13px;
    font-weight: 550;
    line-height: 1.5;
    white-space: nowrap;
    transition: transform .35s var(--hero-ease), box-shadow .35s ease;
  }

  .premium-hero__service-icon {
    display: grid;
    flex: 0 0 34px;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid #e3d2f6;
    border-radius: 50%;
    color: #7c3aed;
    background: linear-gradient(145deg, #fcf8ff, #eee0fc);
  }

  .premium-hero__service:nth-child(even) .premium-hero__service-icon {
    border-color: #f0d9c9;
    color: #d0764a;
    background: linear-gradient(145deg, #fffaf5, #ffeadc);
  }

  .premium-hero__service-icon svg {
    width: 18px;
    height: 18px;
    transform-origin: center;
    transform-box: view-box;
    animation: premiumHeroIconSpin 20s linear infinite;
  }

  .premium-hero__service:nth-child(even) svg {
    animation-direction: reverse;
  }

  .premium-hero .premium-hero__button:focus-visible,
  .premium-hero__promise-window:focus-visible,
  .premium-hero__marquee:focus-visible {
    outline: 3px solid #a98af0;
    outline-offset: 4px;
  }

  .premium-hero__promise:focus-within .premium-hero__track,
  .premium-hero__marquee:focus-within .premium-hero__track {
    animation-play-state: paused;
  }

  /* Animations */
  @keyframes premiumHeroEnter {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes premiumHeroMarquee {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
  }

  @keyframes premiumHeroTicker {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-25%, 0, 0); }
  }

  @keyframes premiumHeroIconSpin {
    to { transform: rotate(360deg); }
  }

  @keyframes premiumHeroGradient {
    from { background-position: 0% 50%; }
    to { background-position: 100% 50%; }
  }

  @keyframes premiumHeroTwinkle {
    0%, 100% { transform: scale(1) rotate(0); }
    50% { transform: scale(1.12) rotate(12deg); }
  }

  @keyframes premiumHeroSheen {
    0%, 72% { transform: translateX(-140%); }
    100% { transform: translateX(140%); }
  }

  @keyframes premiumHeroFloat {
    from { transform: translate3d(0, 0, 0) scale(1); }
    to { transform: translate3d(-24px, 28px, 0) scale(1.08); }
  }

  @keyframes premiumHeroBob {
    from { transform: translateY(0); }
    to { transform: translateY(-10px); }
  }

  @keyframes premiumHeroDrift {
    from { transform: translateY(0); }
    to { transform: translateY(-7px); }
  }

  /* Desktop */
  @media (min-width: 1024px) {
    .premium-hero .premium-hero__title {
      font-size: clamp(38px, 3.5vw, 48px);
      max-width: 1000px;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 1040px;
      font-size: clamp(17px, 1.4vw, 19px);
    }
  }

  @media (min-width: 1280px) {
    .premium-hero .premium-hero__title {
      font-size: clamp(44px, 3.4vw, 50px);
    }
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    .premium-hero {
      padding-top: var(--hero-top-space, 36px);
      padding-bottom: 32px;
    }

    .premium-hero .premium-hero__title {
      max-width: 820px;
      font-size: clamp(34px, 4.6vw, 44px);
      line-height: 1.2;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 760px;
      font-size: 17px;
      line-height: 1.6;
    }

    .premium-hero__focus-slot { margin-top: 22px; }
    .premium-hero__visual-slot { max-width: 720px; margin-top: 20px; }

    .premium-hero .premium-hero__points { gap: 14px; }

    .premium-hero__point { padding: 24px 10px 22px; }
    .premium-hero__point-top { padding-inline: 14px; }
    .premium-hero__point-number { top: 10px; right: 10px; }

    .premium-hero .premium-hero__point p {
      font-size: 13px;
      line-height: 1.55;
      margin-top: 18px;
    }

    .premium-hero__carousel { margin-top: 40px; }
  }

  /* Mobile: one shared gutter for the whole hero */
  @media (max-width: 767px) {
    .premium-hero {
      --hero-gutter: clamp(18px, 5vw, 24px);
      --hero-block-gap: 34px;
      padding-top: var(--hero-top-space, 28px);
    }

    .premium-hero .premium-hero__eyebrow {
      max-width: 560px;
      padding: 10px 16px;
      border-radius: 22px;
    }

    .premium-hero .premium-hero__title {
      max-width: 640px;
      font-size: clamp(28px, 6.7vw, 42px);
      line-height: 1.24;
      letter-spacing: -.03em;
      margin-top: 22px;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 640px;
      padding-inline: 0;
      margin-top: 18px;
      font-size: clamp(15px, 3.7vw, 18px);
      line-height: 1.6;
      text-wrap: pretty;
    }

    .premium-hero__focus-slot {
      margin-top: 22px;
      padding-inline: 0;
    }

    .premium-hero__focus-break { display: block; }

    .premium-hero__promise-label {
      gap: 8px;
      padding: 12px 23px 12px 13px;
      min-height: 56px;
      font-size: 11px;
    }

    .premium-hero__label-text {
      line-height: 1.3;
      white-space: normal;
    }

    .premium-hero__promise-window {
      padding-block: 12px;
      margin-left: -9px;
    }

    .premium-hero__promise-group li {
      gap: 9px;
      font-size: 14.5px;
      line-height: 1.5;
    }

    .premium-hero__focus-icon {
      flex-basis: 28px;
      width: 28px;
      height: 28px;
    }

    .premium-hero__promise-group svg {
      width: 18px;
      height: 18px;
    }

    .premium-hero__visual-slot {
      margin-top: 20px;
      max-width: 620px;
    }

    .premium-hero__actions-slot {
      margin-top: 24px;
      max-width: 620px;
    }

    .premium-hero .premium-hero__button {
      width: 100%;
      min-width: 0;
      padding-inline: 20px;
    }

    .premium-hero__showcase { margin-top: 34px; }

    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      max-width: 620px;
      margin-top: 28px;
    }

    .premium-hero__point { padding: 25px 16px; }
    .premium-hero__point-top { padding-inline: 18px; }
    .premium-hero .premium-hero__point p { margin-top: 20px; }

    .premium-hero__carousel {
      padding-inline: var(--hero-gutter);
    }

    .premium-hero__marquee { padding-block: 11px; }

    .premium-hero .premium-hero__marquee-group {
      gap: 10px;
      padding-right: 10px;
    }
  }

  @media (max-width: 479px) {
    .premium-hero { padding-bottom: 24px; }

    .premium-hero .premium-hero__eyebrow {
      font-size: 12px;
      gap: 9px;
      padding: 9px 14px;
      line-height: 1.65;
      border-radius: 20px;
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(25px, 6.7vw, 32px);
    }

    .premium-hero .premium-hero__intro {
      font-size: 14px;
      line-height: 1.8;
    }

    .premium-hero .premium-hero__points {
      gap: 13px;
      margin-top: 26px;
    }

    .premium-hero__point { padding: 22px 12px; }
    .premium-hero__point-top { padding-inline: 12px; }
    .premium-hero__point-number { top: 10px; right: 10px; }

    .premium-hero .premium-hero__point p {
      font-size: 13px;
      line-height: 1.6;
    }
  }

  @media (max-width: 359px) {
    .premium-hero { --hero-gutter: 18px; }

    .premium-hero .premium-hero__title {
      font-size: clamp(22px, 6.7vw, 25px);
    }

    .premium-hero .premium-hero__subtitle { font-size: 14px; }

    .premium-hero .premium-hero__eyebrow {
      gap: 7px;
      padding: 9px 12px;
    }

    .premium-hero .premium-hero__section-title { font-size: 21px; }
    .premium-hero .premium-hero__points { gap: 10px; }
    .premium-hero__point { padding-inline: 10px; }
    .premium-hero__point-top { padding-inline: 8px; }

    .premium-hero__point-number {
      width: 21px;
      height: 21px;
      font-size: 9px;
    }

    .premium-hero .premium-hero__point p { font-size: 12.5px; }

    .premium-hero__promise-label {
      gap: 7px;
      padding: 11px 20px 11px 11px;
      font-size: 10px;
    }

    .premium-hero__promise-group li { font-size: 14px; }
  }

  @media (max-width: 299px) {
    .premium-hero .premium-hero__points {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-height: 480px) and (orientation: landscape) {
    .premium-hero { padding-top: var(--hero-top-space, 18px); }

    .premium-hero .premium-hero__title {
      font-size: clamp(26px, 4.8vw, 34px);
    }
  }

  /* Hover effects */
  @media (hover: hover) and (pointer: fine) {
    .premium-hero__visual:hover .premium-hero__image-wrap {
      transform: translateY(-6px);
    }

    .premium-hero__point:hover {
      transform: translateY(-5px);
      box-shadow:
        0 0 0 1px #d9c4f3,
        inset 0 1px 0 #fff,
        0 28px 40px -26px #5b21b68c;
    }

    .premium-hero__point:hover::before {
      opacity: 1;
      left: 14px;
      right: 14px;
    }

    .premium-hero__point:hover .premium-hero__tile {
      transform: translateY(-2px);
    }

    .premium-hero__point:hover .premium-hero__tile svg {
      transform: rotate(-6deg) scale(1.08);
    }

    .premium-hero__point:hover .premium-hero__tile--scan {
      box-shadow:
        0 5px 0 -1px var(--tile-base),
        0 16px 24px -12px #7c3aedb3,
        0 0 0 4px #7c3aed14,
        inset 0 1px 0 #fff;
    }

    .premium-hero__point:hover .premium-hero__tile--scan svg {
      transform: scale(1.14);
      filter: drop-shadow(0 2px 5px #7c3aed66);
    }

    .premium-hero__service:hover {
      transform: translateY(-3px);
      box-shadow:
        0 0 0 1px #d6c2f2,
        0 16px 26px -16px #5b21b68c,
        inset 0 1px 0 #fff;
    }

    .premium-hero .premium-hero__button:hover {
      transform: translateY(-3px);
      filter: brightness(1.05);
      box-shadow:
        0 5px 0 -1px #5b21b6,
        0 28px 44px -18px #7c3aedc0,
        inset 0 1px 0 #ffffff59;
    }

    .premium-hero__promise:hover .premium-hero__track,
    .premium-hero__marquee:hover .premium-hero__track {
      animation-play-state: paused;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .premium-hero *,
    .premium-hero *::before,
    .premium-hero *::after,
    .premium-hero::after {
      animation: none !important;
      transition: none !important;
    }

    .premium-hero__reveal {
      opacity: 1;
      transform: none;
    }

    .premium-hero .premium-hero__promise {
      flex-direction: column;
    }

    .premium-hero .premium-hero__promise-label {
      justify-content: center;
      padding: 11px 16px;
      clip-path: none;
    }

    .premium-hero__focus-break { display: none; }

    .premium-hero .premium-hero__promise-window {
      flex: none;
      width: 100%;
      min-height: 0;
      margin-left: 0;
      padding: 16px;
      -webkit-mask-image: none;
      mask-image: none;
    }

    .premium-hero__marquee {
      padding: 16px;
      -webkit-mask-image: none;
      mask-image: none;
    }

    .premium-hero__track,
    .premium-hero .premium-hero__promise-window .premium-hero__track {
      width: 100%;
      transform: none;
    }

    .premium-hero .premium-hero__promise-group,
    .premium-hero .premium-hero__marquee-group {
      flex: 1 1 auto;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      min-width: 0;
      padding: 0;
    }

    .premium-hero__promise-group li,
    .premium-hero__service {
      flex-shrink: 1;
      min-width: 0;
      max-width: 100%;
      white-space: normal;
      text-align: left;
    }

    .premium-hero__promise-group li > span,
    .premium-hero__service > span:last-child {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .premium-hero__track > [aria-hidden="true"] {
      display: none;
    }
  }
`

export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const heroImage = `${
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  }images/Neeraj2.png`

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
                  <Icon name="sparkle" />
                  <span>
                    More Than Landing Pages. We Build Complete Funnels.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id="premium-hero-title"
                className="premium-hero__title"
              >
                <span className="premium-hero__title-line premium-hero__title-lead">
                  Imagine Generating More Leads,
                </span>{' '}
                <span className="premium-hero__title-line premium-hero__title-accent">
                  Converting More Customers &amp; Growing Revenue Without
                </span>{' '}
                <span className="premium-hero__title-line premium-hero__title-accent">
                  Increasing Your Advertising Budget.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="premium-hero__subtitle">
                We build complete funnel systems with high-converting landing pages, automation, custom tracking, and analytics to turn more clicks into customers.
              </p>
            </Reveal>
          </div>

          <Reveal delay={340} className="premium-hero__focus-slot">
            <div className="premium-hero__promise">
              <div className="premium-hero__promise-label">
                <span className="premium-hero__spark">
                  <Icon name="sparkle" />
                </span>

                <span className="premium-hero__label-text">
                  OUR
                  <br className="premium-hero__focus-break" />{' '}
                  FOCUS
                </span>
              </div>

              <div
                className="premium-hero__promise-window"
                tabIndex={0}
                role="region"
                aria-label="Landing page benefits"
              >
                <div className="premium-hero__track">
                  {[0, 1, 2, 3].map((copy) => (
                    <ul
                      key={copy}
                      className="premium-hero__promise-group"
                      aria-hidden={copy > 0 ? true : undefined}
                    >
                      {points.map((point) => (
                        <li key={point.text}>
                          <span
                            className="premium-hero__focus-icon"
                            aria-hidden="true"
                          >
                            <Icon name={point.icon} />
                          </span>
                          <span>{point.text}</span>
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
              <Button className="premium-hero__button">
                Yes! Help Me Increase My Revenue.
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={390} className="premium-hero__showcase">
          <h2 className="premium-hero__section-title">
            Guaranteed Better Funnel Performance. More Value from Every Ad Spend.
          </h2>

          <p className="premium-hero__intro">
            At <strong>Creative Crew</strong>, we simplify growth with a complete
            funnel system that works seamlessly.
          </p>

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
        </Reveal>
      </div>

      <div className="premium-hero__carousel">
        <div
          className="premium-hero__marquee"
          tabIndex={0}
          role="region"
          aria-label="Landing page services"
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