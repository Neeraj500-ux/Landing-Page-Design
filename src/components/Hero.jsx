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
    --hero-ink: #302045;
    --hero-muted: #776684;
    --hero-purple: #793fca;
    --hero-gutter: clamp(16px, 4vw, 40px);
    --hero-ease: cubic-bezier(.22, 1, .36, 1);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: var(--hero-top-space, clamp(32px, 5vw, 68px)) 0 28px;
    overflow: hidden;
    color: var(--hero-ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;

    background:
      radial-gradient(ellipse at 5% 6%, #ffecdf 0%, transparent 38%),
      radial-gradient(ellipse at 94% 12%, #e9dbff 0%, transparent 44%),
      linear-gradient(180deg, #fcfaff 0%, #f7f2ff 58%, #fbf8ff 100%);
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
    background-image: radial-gradient(#9166be20 .8px, transparent .8px);
    background-size: 28px 28px;
    -webkit-mask-image: linear-gradient(#0008, transparent 55%);
    mask-image: linear-gradient(#0008, transparent 55%);
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
    animation: premiumHeroEnter .75s var(--hero-ease) both;
    animation-delay: var(--reveal-delay, 0ms);
  }

  /* Introductory pill */

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
    padding: 10px 17px;
    border: 1px solid #ffffff45;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(120deg, #302045, #65477b);
    box-shadow:
      inset 0 1px 0 #ffffff26,
      0 10px 24px -14px #63418099;
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
    color: #ffe8d8;
  }

  /* Balanced heading without rigid mobile line breaks */

  .premium-hero .premium-hero__title {
    max-width: 980px;
    margin: clamp(22px, 3vw, 32px) auto 0;
    font-size: clamp(30px, 5.15vw, 62px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.045em;
    text-align: center;
    text-wrap: balance;
  }

  .premium-hero__title-lead {
    display: block;
    color: var(--hero-ink);
  }

  .premium-hero__title-accent {
    display: block;
    max-width: 23ch;
    margin: .13em auto 0;
    padding-bottom: .09em;
    color: #824ac4;
    background: linear-gradient(
      105deg,
      #6d35b8 8%,
      #a55bbb 60%,
      #d68159 100%
    );
    background-size: 150% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: premiumHeroGradient 10s ease-in-out infinite alternate;
  }

  .premium-hero .premium-hero__subtitle {
    max-width: 650px;
    margin: clamp(16px, 2.4vw, 24px) auto 0;
    color: #65477b;
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 500;
    line-height: 1.7;
    letter-spacing: -.015em;
    text-wrap: balance;
  }

  /* Focus ticker */

  .premium-hero__promise {
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 920px;
    min-width: 0;
    margin: clamp(24px, 3vw, 34px) auto 0;
    overflow: hidden;
    border: 1px solid #e6d8f2;
    border-radius: 17px;
    background: linear-gradient(110deg, #fff, #faf6ff 65%, #ffecdf);
    box-shadow:
      inset 0 1px 0 #fff,
      0 12px 28px -23px #63418090;
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
    background: linear-gradient(120deg, #302045, #65477b);
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
    color: #ffe8d8;
    animation: premiumHeroTwinkle 5s ease-in-out infinite;
  }

  .premium-hero__promise-window {
    flex: 1 1 0%;
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
    width: max-content;
    animation: premiumHeroMarquee 48s linear infinite;
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
    color: #65477b;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__promise-group svg {
    width: 18px;
    height: 18px;
    color: #d67951;
  }

  /* Full image stays visible at its original aspect ratio */

  .premium-hero__visual {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 980px;
    min-width: 0;
    margin: clamp(24px, 3.2vw, 38px) auto 0;
  }

  .premium-hero__visual::before {
    content: "";
    position: absolute;
    inset: 12% 5% -5%;
    z-index: -1;
    border-radius: 40px;
    background: linear-gradient(110deg, #dcc4f6, #ffe3d1);
    filter: blur(32px);
    opacity: .65;
    pointer-events: none;
  }

  .premium-hero__image-wrap {
    --media-pad: clamp(5px, .75vw, 9px);
    --media-radius: clamp(18px, 3vw, 30px);

    position: relative;
    width: 100%;
    min-width: 0;
    padding: var(--media-pad);
    border: 1px solid #e7d9f2;
    border-radius: var(--media-radius);
    background: linear-gradient(145deg, #fff, #f6effc);
    box-shadow:
      0 0 0 4px #ffffff80,
      0 28px 65px -38px #63418085,
      inset 0 1px 0 #fff;
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
    border-radius: calc(var(--media-radius) - var(--media-pad));
    object-fit: contain;
    object-position: center;
    transform: none;
  }

  /* Existing Button component retains its click/link behavior */

  .premium-hero__actions {
    display: flex;
    justify-content: center;
    min-width: 0;
    margin: clamp(26px, 3.2vw, 36px) auto 0;
    padding-bottom: 6px;
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
    padding: 16px 24px;
    overflow: hidden;
    border: 1px solid #ffffff50;
    border-radius: 17px;
    color: #fff;
    background: linear-gradient(135deg, #9859de 0%, #793fca 55%, #7238bd);
    box-shadow:
      0 5px 0 -1px #582b97,
      0 17px 32px -16px #7941bcaa,
      inset 0 1px 0 #ffffff50;
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
      110deg, transparent 30%, #ffffff36 50%, transparent 70%
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
      0 2px 0 -1px #582b97,
      0 9px 20px -14px #7941bc99;
  }

  /* Supporting content */

  .premium-hero .premium-hero__intro {
    max-width: 740px;
    margin: clamp(24px, 3vw, 32px) auto 0;
    color: var(--hero-muted);
    font-size: clamp(15px, 1.6vw, 17px);
    font-weight: 400;
    line-height: 1.85;
    text-wrap: pretty;
  }

  .premium-hero__intro strong {
    color: #65477b;
    font-weight: 700;
  }

  /* Equal-height cards */

  .premium-hero .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: clamp(12px, 1.8vw, 20px);
    width: 100%;
    min-width: 0;
    margin: clamp(28px, 4vw, 44px) auto 0;
    padding: 0;
    list-style: none;
    text-align: left;
  }

  .premium-hero__point {
    --card-tint: #f3eafa;
    --card-edge: #e3d4ef;

    position: relative;
    min-width: 0;
    padding: clamp(18px, 2.3vw, 28px);
    border: 1px solid var(--card-edge);
    border-radius: clamp(20px, 2.2vw, 26px);
    background:
      radial-gradient(ellipse at 100% 0, var(--card-tint), transparent 72%),
      linear-gradient(145deg, #ffffffed, #ffffffa6);
    box-shadow:
      inset 0 1px 0 #fff,
      0 4px 0 -2px var(--card-edge),
      0 16px 30px -28px #63418088;
    transition:
      transform .35s var(--hero-ease),
      box-shadow .35s ease,
      border-color .35s ease;
  }

  .premium-hero__point--peach {
    --card-tint: #ffecdf;
    --card-edge: #eed8cb;
  }

  .premium-hero__point--gold {
    --card-tint: #fff3d3;
    --card-edge: #ecdfba;
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
    width: 25px;
    height: 25px;
    border: 1px solid #e6dced;
    border-radius: 50%;
    color: #887296;
    background: #ffffffaa;
    font-size: 10px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .premium-hero .premium-hero__point p {
    max-width: 24ch;
    margin: 21px 0 0;
    color: #543d66;
    font-size: clamp(14px, 1.5vw, 16px);
    font-weight: 600;
    line-height: 1.6;
    letter-spacing: -.015em;
    text-wrap: pretty;
  }

  .premium-hero__tile {
    --tile-bottom: #eee2fa;
    --tile-border: #dec7ef;
    --tile-base: #c7a7dd;
    --tile-ink: #8851ad;

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
      0 13px 20px -15px var(--tile-ink),
      inset 0 1px 0 #fff;
    transition: transform .35s var(--hero-ease);
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
    transition: transform .35s var(--hero-ease);
  }

  .premium-hero__tile--peach {
    --tile-bottom: #ffe8d8;
    --tile-border: #f0cdb9;
    --tile-base: #dcaf97;
    --tile-ink: #d67951;
  }

  .premium-hero__tile--gold {
    --tile-bottom: #fff0c5;
    --tile-border: #eed797;
    --tile-base: #d6bd75;
    --tile-ink: #ab8531;
  }

  /* Seamless service carousel */

  .premium-hero__carousel {
    width: 100%;
    max-width: 1180px;
    min-width: 0;
    margin: clamp(30px, 4vw, 46px) auto 0;
  }

  .premium-hero__marquee {
    min-width: 0;
    overflow: hidden;
    padding-block: 9px 13px;
    -webkit-mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
    );
    mask-image: linear-gradient(
      90deg, transparent, #000 5%, #000 95%, transparent
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
    padding: 9px 17px 9px 9px;
    border: 1px solid #e5d8f4;
    border-radius: 16px;
    color: #77528e;
    background: linear-gradient(145deg, #fff, #fffcff);
    box-shadow:
      0 3px 0 -1px #e6d7f1,
      inset 0 1px 0 #fff;
    font-size: 13px;
    font-weight: 550;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__service-icon {
    display: grid;
    flex: 0 0 34px;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid #ecd9cc;
    border-radius: 11px;
    color: #c78055;
    background: linear-gradient(145deg, #fff9f3, #ffeadc);
  }

  .premium-hero__service:nth-child(even) .premium-hero__service-icon {
    border-color: #e3d2f2;
    color: #9865bd;
    background: linear-gradient(145deg, #fcf8ff, #eee0fb);
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

  /* Animation controls */

  .premium-hero__motion-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    max-width: calc(100% - 32px);
    min-height: 44px;
    margin: 12px auto 0;
    padding: 10px 15px;
    border: 1px solid #e7dbf2;
    border-radius: 999px;
    color: #715b82;
    background: #ffffffb5;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    cursor: pointer;
    transition: background .25s ease, border-color .25s ease;
  }

  .premium-hero__motion-button svg {
    width: 14px;
    height: 14px;
  }

  .premium-hero .premium-hero__button:focus-visible,
  .premium-hero__motion-button:focus-visible,
  .premium-hero__promise-window:focus-visible,
  .premium-hero__marquee:focus-visible {
    outline: 3px solid #a577d9;
    outline-offset: 4px;
  }

  .premium-hero[data-paused="true"] .premium-hero__track,
  .premium-hero[data-paused="true"] .premium-hero__service-icon svg,
  .premium-hero[data-paused="true"] .premium-hero__spark svg,
  .premium-hero[data-paused="true"] .premium-hero__title-accent,
  .premium-hero[data-paused="true"] .premium-hero__button::after,
  .premium-hero__promise:focus-within .premium-hero__track,
  .premium-hero__marquee:focus-within .premium-hero__track {
    animation-play-state: paused;
  }

  /* Keyframes */

  @keyframes premiumHeroEnter {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes premiumHeroMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
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
    50% { transform: scale(1.1) rotate(12deg); }
  }

  @keyframes premiumHeroSheen {
    0%, 72% { transform: translateX(-140%); }
    100% { transform: translateX(140%); }
  }

  /* Tablet and desktop */

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

    .premium-hero .premium-hero__button {
      width: auto;
      min-width: 310px;
      padding-inline: 30px;
    }
  }

  @media (min-width: 960px) {
    .premium-hero .premium-hero__points {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .premium-hero__point {
      padding: 26px 22px;
    }
  }

  /* Phone typography and spacing */

  @media (max-width: 639px) {
    .premium-hero .premium-hero__title {
      max-width: 520px;
      font-size: clamp(30px, 7.6vw, 43px);
      line-height: 1.17;
      letter-spacing: -.04em;
    }

    .premium-hero__title-accent {
      max-width: 20ch;
      margin-top: .18em;
    }

    .premium-hero .premium-hero__subtitle {
      max-width: 38ch;
      font-size: clamp(15px, 3.9vw, 18px);
      line-height: 1.65;
    }

    .premium-hero__image-wrap {
      box-shadow:
        0 0 0 3px #ffffff75,
        0 20px 38px -27px #63418085,
        inset 0 1px 0 #fff;
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

  @media (hover: hover) and (pointer: fine) {
    .premium-hero__point:hover {
      transform: translateY(-4px);
      box-shadow:
        inset 0 1px 0 #fff,
        0 4px 0 -2px var(--card-edge),
        0 24px 35px -25px #63418080;
    }

    .premium-hero__point:hover .premium-hero__tile {
      transform: translateY(-2px);
    }

    .premium-hero__point:hover .premium-hero__tile svg {
      transform: rotate(-6deg) scale(1.06);
    }

    .premium-hero .premium-hero__button:hover {
      transform: translateY(-2px);
      filter: brightness(1.04);
      box-shadow:
        0 5px 0 -1px #582b97,
        0 23px 36px -17px #7941bcaa,
        inset 0 1px 0 #ffffff50;
    }

    .premium-hero__motion-button:hover {
      background: #fff;
      border-color: #cfb5e5;
    }

    .premium-hero__promise:hover .premium-hero__track,
    .premium-hero__marquee:hover .premium-hero__track {
      animation-play-state: paused;
    }
  }

  /* All content remains readable without motion */

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

    .premium-hero__promise {
      flex-direction: column;
    }

    .premium-hero__promise-label {
      justify-content: center;
      padding: 11px 16px;
      clip-path: none;
    }

    .premium-hero__label-text {
      width: auto;
    }

    .premium-hero__promise-window {
      flex: none;
      width: 100%;
    }

    .premium-hero__promise-window,
    .premium-hero__marquee {
      padding: 16px;
      -webkit-mask-image: none;
      mask-image: none;
    }

    .premium-hero__track {
      width: 100%;
      transform: none;
    }

    .premium-hero .premium-hero__promise-group,
    .premium-hero .premium-hero__marquee-group {
      flex: 1 1 auto;
      flex-wrap: wrap;
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
  const heroImage = `${
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
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
          >
            <span className="premium-hero__title-lead">
              You Bring the Expertise.
            </span>{' '}
            <span className="premium-hero__title-accent">
              We Build the Page That Turns Interest Into Enquiries.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="premium-hero__subtitle">
            Give your offer a landing page that helps visitors understand
            your value, trust your expertise and take the next step.
          </p>
        </Reveal>

        <Reveal delay={190}>
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
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    className="premium-hero__promise-group"
                    aria-hidden={copy === 1 ? true : undefined}
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

        <Reveal delay={240}>
          <div className="premium-hero__visual">
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

        <Reveal delay={290}>
          <div className="premium-hero__actions">
            <Button className="premium-hero__button">
              Book My One-to-One Call
            </Button>
          </div>
        </Reveal>

        <Reveal delay={340}>
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