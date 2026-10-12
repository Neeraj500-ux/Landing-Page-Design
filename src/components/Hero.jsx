import { useState } from 'react'
import { Button } from './ui'

const points = [
  {
    text: 'Communicate your offer clearly.',
    icon: 'target',
    tone: 'peach',
  },
  {
    text: 'Build credibility with relevant proof.',
    icon: 'shield',
    tone: 'purple',
  },
  {
    text: 'Make enquiries and bookings simple.',
    icon: 'calendar',
    tone: 'gold',
  },
  {
    text: 'Deliver a polished experience across devices.',
    icon: 'devices',
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
  return (
    <span className={`premium-hero__tile premium-hero__tile--${tone}`}>
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
    --hero-gutter: clamp(18px, 4vw, 44px);
    --hero-ease: cubic-bezier(.22, 1, .36, 1);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: var(--hero-top-space, clamp(32px, 5vw, 72px)) 0 32px;
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

  /* Dotted texture + drifting violet glow */

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
    max-width: 1240px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: var(--hero-gutter);
    text-align: center;
  }

  .premium-hero h1,
  .premium-hero p,
  .premium-hero ul,
  .premium-hero figure {
    margin: 0;
  }

  .premium-hero h1,
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

  /* ---------- Stage (mobile / tablet: single column) ---------- */

  .premium-hero__stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "head"
      "visual"
      "actions"
      "focus";
    gap: clamp(22px, 4vw, 34px);
    align-items: start;
  }

  .premium-hero__head { grid-area: head; min-width: 0; }
  .premium-hero__visual-slot {
    grid-area: visual;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .premium-hero__actions-slot { grid-area: actions; }
  .premium-hero__focus-slot {
    grid-area: focus;
    display: flex;
    width: 100%;
    min-width: 0;
    max-width: 760px;
    margin-inline: auto;
  }

  /* Pill */

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
    padding: 10px 18px;
    border: 1px solid #ffffff40;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(120deg, #2a1a40, #5b3a86);
    box-shadow:
      inset 0 1px 0 #ffffff2e,
      0 14px 30px -16px #4c1d9599;
    font-size: clamp(11px, 2.8vw, 13px);
    font-weight: 650;
    line-height: 1.55;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__eyebrow > span {
    min-width: 0;
  }

  .premium-hero__eyebrow svg {
    width: 15px;
    height: 15px;
    color: #ffe0cc;
  }

  /* Heading: width capped in ch so lines break naturally */

  .premium-hero .premium-hero__title {
    max-width: none;
    margin: clamp(18px, 3vw, 26px) 0 0;
    font-size: clamp(32px, 8.4vw, 42px);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -.035em;
    word-spacing: .06em;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__title-lead {
    display: block;
    max-width: 15ch;
    margin-inline: auto;
    color: var(--hero-ink);
    line-height: 0.92;
  }

  .premium-hero__title-lead--second {
    max-width: 12ch;
    margin-top: 0.08em;
  }

  .premium-hero__title-accent {
    display: block;
    max-width: 19ch;
    margin: 0.1em auto 0;
    padding-bottom: .1em;
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
    line-height: 0.92;
  }

  .premium-hero__title-accent--second {
    max-width: 18ch;
    margin-top: 0.08em;
  }

  .premium-hero .premium-hero__subtitle {
    max-width: 46ch;
    margin: clamp(16px, 2.4vw, 22px) auto 0;
    color: var(--hero-body);
    font-size: clamp(16px, 2vw, 19px);
    font-weight: 450;
    line-height: 1.7;
    letter-spacing: -.01em;
    text-wrap: pretty;
  }

  /* CTA (existing Button component keeps its behavior) */

  .premium-hero__actions {
    display: flex;
    justify-content: center;
    min-width: 0;
  }

  .premium-hero .premium-hero__button {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: min(100%, 360px);
    max-width: 100%;
    min-width: 0;
    min-height: 58px;
    height: auto;
    padding: 16px 28px;
    overflow: hidden;
    border: 1px solid #ffffff55;
    border-radius: 18px;
    color: #fff;
    background: linear-gradient(135deg, #a06bf5 0%, #7c3aed 55%, #6d28d9);
    box-shadow:
      0 5px 0 -1px #5b21b6,
      0 20px 36px -16px #7c3aedb3,
      inset 0 1px 0 #ffffff59;
    font-family: inherit;
    font-size: clamp(14px, 3.7vw, 16px);
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: -.01em;
    text-align: center;
    text-decoration: none;
    text-transform: none;
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

  /* ---------- Hero image: no frame, blended into the page ---------- */

  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 720px;
    min-width: 0;
    margin: 0 auto;
    padding: clamp(10px, 3%, 26px) clamp(0px, 1%, 8px) clamp(14px, 4%, 30px);
  }

  /* Large violet arch behind the devices */
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

  /* Soft glow under the pedestal */
  .premium-hero__visual::after {
    content: "";
    position: absolute;
    right: -3%;
    bottom: 1%;
    left: -3%;
    z-index: -1;
    height: 34%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      #ffffff 0%,
      #ebe0fd 46%,
      transparent 72%
    );
    filter: blur(12px);
    pointer-events: none;
  }

  /* Glass orbs */
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
    left: -2%;
    bottom: 20%;
    width: clamp(30px, 8%, 60px);
  }

  .premium-hero__orb--b {
    top: 6%;
    right: -1%;
    width: clamp(24px, 6%, 46px);
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
    -webkit-mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent),
      linear-gradient(180deg, transparent, #000 6%, #000 93%, transparent);
    -webkit-mask-composite: source-in;
    mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent),
      linear-gradient(180deg, transparent, #000 6%, #000 93%, transparent);
    mask-composite: intersect;
  }

  /* ---------- Focus block: horizontal right-to-left carousel ---------- */

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
    gap: 8px;
    padding: 13px 27px 13px 16px;
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
    width: min-content;
  }

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
    padding-block: 16px;
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

  /*
    Seamless loop: the track holds 4 identical groups and moves exactly
    one group's width (-25%) per cycle, then restarts invisibly.
    Each group ends with padding equal to the gap, so spacing never changes.
  */
  .premium-hero__promise-window .premium-hero__track {
    animation-name: premiumHeroTicker;
    animation-duration: 36s;
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
    gap: 10px;
    color: var(--hero-body);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__promise-group svg {
    width: 18px;
    height: 18px;
    color: #8b5cf6;
  }

  /* ---------- Intro + cards ---------- */

  .premium-hero .premium-hero__intro {
    max-width: 760px;
    margin: clamp(30px, 4.5vw, 52px) auto 0;
    color: var(--hero-muted);
    font-size: clamp(15px, 1.6vw, 17px);
    font-weight: 400;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .premium-hero__intro strong {
    color: var(--hero-violet-deep);
    font-weight: 700;
  }

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: clamp(12px, 1.8vw, 20px);
    width: 100%;
    min-width: 0;
    margin: clamp(26px, 4vw, 40px) auto 0;
    padding: 0;
    list-style: none;
    text-align: left;
  }

  .premium-hero__point {
    --card-tint: #f1e7ff;
    --card-edge: #e6d9f8;

    position: relative;
    min-width: 0;
    padding: clamp(18px, 2.3vw, 28px);
    border: 1px solid #ffffffd9;
    border-radius: clamp(20px, 2.2vw, 26px);
    background:
      radial-gradient(ellipse at 100% 0, var(--card-tint), transparent 72%),
      linear-gradient(145deg, #ffffffe6, #ffffff99);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow:
      0 0 0 1px var(--card-edge),
      inset 0 1px 0 #fff,
      0 20px 34px -28px #5b21b680;
    transition:
      transform .4s var(--hero-ease),
      box-shadow .4s ease;
  }

  .premium-hero__point--peach {
    --card-tint: #ffeadb;
    --card-edge: #f2dccf;
  }

  .premium-hero__point--gold {
    --card-tint: #fff2cf;
    --card-edge: #efe2bd;
  }

  .premium-hero__point-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
  }

  .premium-hero__point-number {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 26px;
    height: 26px;
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
    margin: 20px 0 0;
    color: #3f2d57;
    font-size: clamp(14px, 1.5vw, 16px);
    font-weight: 600;
    line-height: 1.6;
    letter-spacing: -.015em;
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
    width: clamp(43px, 5vw, 52px);
    height: clamp(43px, 5vw, 52px);
    margin-bottom: 4px;
    border: 1px solid var(--tile-border);
    border-radius: 15px;
    color: var(--tile-ink);
    background: linear-gradient(145deg, #fff, var(--tile-bottom));
    box-shadow:
      0 5px 0 -1px var(--tile-base),
      0 14px 20px -15px var(--tile-ink),
      inset 0 1px 0 #fff;
    transition: transform .4s var(--hero-ease);
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
    width: 23px;
    height: 23px;
    transition: transform .4s var(--hero-ease);
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

  /* ---------- Service carousel ---------- */

  .premium-hero__carousel {
    width: 100%;
    max-width: 1240px;
    min-width: 0;
    margin: clamp(28px, 4vw, 44px) auto 0;
  }

  .premium-hero__marquee {
    min-width: 0;
    overflow: hidden;
    padding-block: 10px 14px;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 6%, #000 94%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 6%, #000 94%, transparent
    );
  }

  .premium-hero__marquee .premium-hero__track {
    animation-duration: 60s;
  }

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

  /* ---------- Motion toggle ---------- */

  .premium-hero__motion-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    max-width: calc(100% - 32px);
    min-height: 44px;
    margin: 12px auto 0;
    padding: 10px 16px;
    border: 1px solid #ffffffd0;
    border-radius: 999px;
    color: #66507a;
    background: #ffffffb8;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 0 1px #e8dcf6, 0 10px 20px -16px #5b21b680;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    cursor: pointer;
    transition: background .25s ease, box-shadow .25s ease;
  }

  .premium-hero__motion-button svg {
    width: 14px;
    height: 14px;
  }

  .premium-hero .premium-hero__button:focus-visible,
  .premium-hero__motion-button:focus-visible,
  .premium-hero__promise-window:focus-visible,
  .premium-hero__marquee:focus-visible {
    outline: 3px solid #a98af0;
    outline-offset: 4px;
  }

  .premium-hero[data-paused="true"] .premium-hero__track,
  .premium-hero[data-paused="true"] .premium-hero__service-icon svg,
  .premium-hero[data-paused="true"] .premium-hero__spark svg,
  .premium-hero[data-paused="true"] .premium-hero__title-accent,
  .premium-hero[data-paused="true"] .premium-hero__button::after,
  .premium-hero[data-paused="true"] .premium-hero__orb,
  .premium-hero[data-paused="true"]::after,
  .premium-hero__promise:focus-within .premium-hero__track,
  .premium-hero__marquee:focus-within .premium-hero__track {
    animation-play-state: paused;
  }

  /* ---------- Keyframes ---------- */

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

  /* ---------- Tablet ---------- */

  @media (min-width: 640px) {
    .premium-hero__label-text {
      width: auto;
      white-space: nowrap;
    }

    .premium-hero__promise-label {
      padding: 16px 34px 16px 21px;
      font-size: 11.5px;
    }

    .premium-hero__promise-group li {
      font-size: 15px;
    }

    .premium-hero .premium-hero__eyebrow {
      padding: 11px 20px;
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(40px, 6.2vw, 52px);
    }

    .premium-hero .premium-hero__button {
      width: auto;
      min-width: 320px;
      padding-inline: 32px;
    }
  }

  /* ---------- Desktop: copy left, image right, focus block spans both ---------- */

  @media (min-width: 960px) {
    .premium-hero__stage {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr);
      grid-template-areas:
        "head visual"
        "actions visual"
        "focus focus";
      grid-template-rows: auto minmax(0, 1fr) auto;
      column-gap: clamp(28px, 3.6vw, 56px);
      row-gap: 0;
      align-items: start;
    }

    .premium-hero__head {
      text-align: left;
    }

    .premium-hero__visual-slot {
      align-self: stretch;
    }

    .premium-hero__visual {
      max-width: 780px;
    }

    .premium-hero__pill,
    .premium-hero__actions {
      justify-content: flex-start;
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(34px, 3.6vw, 52px);
      text-align: left;
    }

    .premium-hero__title-lead,
    .premium-hero__title-accent {
      margin-left: 0;
      margin-right: 0;
    }

    .premium-hero__title-accent {
      margin-top: .12em;
    }

    .premium-hero .premium-hero__subtitle {
      margin-left: 0;
      margin-right: 0;
    }

    .premium-hero__actions-slot {
      margin-top: clamp(24px, 2.6vw, 32px);
    }

    /* Full-width block beneath both columns */

    .premium-hero__focus-slot {
      grid-column: 1 / -1;
      align-self: stretch;
      width: 100%;
      max-width: none;
      margin: clamp(26px, 3vw, 38px) 0 0;
    }

    .premium-hero__promise-window {
      padding-block: 20px;
    }

    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .premium-hero__point {
      padding: 26px 22px;
    }
  }

  /* ---------- Phone refinements ---------- */

  @media (max-width: 639px) {
    .premium-hero .premium-hero__subtitle {
      max-width: 38ch;
      font-size: clamp(15px, 3.9vw, 18px);
      line-height: 1.65;
    }

    .premium-hero__visual {
      max-width: 520px;
    }

    .premium-hero .premium-hero__intro {
      line-height: 1.8;
    }
  }

  @media (max-width: 359px) {
    .premium-hero {
      --hero-gutter: 14px;
    }

    .premium-hero .premium-hero__title {
      font-size: 28px;
    }

    .premium-hero .premium-hero__eyebrow {
      gap: 7px;
      padding: 9px 12px;
      border-radius: 20px;
    }

    .premium-hero__point {
      padding: 17px 13px;
    }

    .premium-hero__point-number {
      width: 21px;
      height: 21px;
      font-size: 9px;
    }

    .premium-hero .premium-hero__point p {
      font-size: 13px;
    }

    .premium-hero__promise-label {
      gap: 6px;
      padding-left: 11px;
      padding-right: 22px;
      font-size: 10px;
    }
  }

  @media (max-width: 299px) {
    .premium-hero .premium-hero__points {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  /* ---------- Hover effects (pointer devices only) ---------- */

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

    .premium-hero__point:hover .premium-hero__tile {
      transform: translateY(-2px);
    }

    .premium-hero__point:hover .premium-hero__tile svg {
      transform: rotate(-6deg) scale(1.08);
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

    .premium-hero__motion-button:hover {
      background: #fff;
      box-shadow: 0 0 0 1px #cfb5e9, 0 12px 22px -16px #5b21b68c;
    }

    .premium-hero__promise:hover .premium-hero__track,
    .premium-hero__marquee:hover .premium-hero__track {
      animation-play-state: paused;
    }
  }

  /* ---------- Reduced motion: everything stays readable ---------- */

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

    .premium-hero__label-text {
      width: auto;
    }

    .premium-hero .premium-hero__promise-window {
      flex: none;
      width: 100%;
      min-height: 0;
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

    .premium-hero__track > [aria-hidden="true"],
    .premium-hero__motion-button {
      display: none;
    }
  }
`

export default function Hero() {
  const [motionPaused, setMotionPaused] = useState(false)

  const baseUrl = import.meta.env.BASE_URL || '/'
  const heroImage = `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
    }images/Neeraj2.png`

  return (
    <section
      id="top"
      className="premium-hero"
      data-paused={motionPaused}
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
                    Landing Pages for Coaches, Consultants &amp; Trainers
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1
                id="premium-hero-title"
                className="premium-hero__title"
                style={{ fontSize: "clamp(20px, 4.2vw, 56px)", lineHeight: 1.15 }}
              >
                <span
                  className="premium-hero__title-lead"
                  style={{ display: "block", whiteSpace: "nowrap" }}
                >
                  You Bring the Expertise.
                </span>

                <span
                  className="premium-hero__title-accent"
                  style={{ display: "block", whiteSpace: "nowrap" }}
                >
                  We Build the Page
                </span>

                <span
                  className="premium-hero__title-accent"
                  style={{ display: "block", whiteSpace: "nowrap" }}
                >
                  That Turns Interest
                </span>

                <span
                  className="premium-hero__title-accent"
                  style={{ display: "block", whiteSpace: "nowrap" }}
                >
                  Into Enquiries.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="premium-hero__subtitle">
                Give your offer a landing page that helps visitors understand
                your value, trust your expertise and take the next step.
              </p>
            </Reveal>
          </div>

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
                Book My One-to-One Call
              </Button>
            </div>
          </Reveal>

          <Reveal delay={340} className="premium-hero__focus-slot">
            <div className="premium-hero__promise">
              <div className="premium-hero__promise-label">
                <span className="premium-hero__spark">
                  <Icon name="sparkle" />
                </span>
                <span className="premium-hero__label-text">
                  OUR FOCUS
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
                          <Icon name={point.icon} />
                          <span>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={390}>
          <p className="premium-hero__intro">
            At <strong>Your Brand Name</strong>, we create landing pages
            for coaches, consultants and trainers—combining clear content,
            thoughtful design and responsive development to turn visitors
            into enquiries.
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

        <button
          type="button"
          className="premium-hero__motion-button"
          onClick={() => setMotionPaused((paused) => !paused)}
          aria-pressed={motionPaused}
          aria-label="Pause hero animations"
        >
          <Icon name={motionPaused ? 'play' : 'pause'} />
          <span>
            {motionPaused ? 'Resume motion' : 'Pause motion'}
          </span>
        </button>
      </div>
    </section>
  )
}