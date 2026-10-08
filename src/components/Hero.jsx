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

function IconTile({ name, tone = 'purple', small = false }) {
  return (
    <span
      className={[
        'premium-hero__tile',
        `premium-hero__tile--${tone}`,
        small ? 'premium-hero__tile--small' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon name={name} />
    </span>
  )
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <div
      className={className}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const styles = `
  /* Base */
  .premium-hero {
    --hero-ink: #302045;
    --hero-muted: #776684;
    --hero-purple: #793fca;
    --hero-gutter: clamp(16px, 4vw, 36px);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: var(--hero-top-space, 40px) 0 28px;
    color: var(--hero-ink);
    font-family: inherit;
    -webkit-text-size-adjust: 100%;

    background:
      radial-gradient(
        ellipse at 12% 14%,
        #e9dbff 0%,
        transparent 40%
      ),
      radial-gradient(
        ellipse at 93% 29%,
        #ffecdf 0%,
        transparent 37%
      ),
      linear-gradient(
        180deg,
        #fcfaff,
        #f7f2ff 56%,
        #fbf8ff
      );
  }

  .premium-hero,
  .premium-hero *,
  .premium-hero *::before,
  .premium-hero *::after {
    box-sizing: border-box;
  }

  .premium-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image:
      radial-gradient(#9166be22 .8px, transparent .8px);
    background-size: 25px 25px;
    mask-image: linear-gradient(#0009, transparent 65%);
    -webkit-mask-image:
      linear-gradient(#0009, transparent 65%);
  }

  .premium-hero .premium-hero__container {
    display: block;
    width: 100%;
    max-width: 1160px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: var(--hero-gutter);
    text-align: center;
  }

  .premium-hero .premium-hero__reveal {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    animation:
      premiumHeroEnter .7s cubic-bezier(.22,1,.36,1) both;
    animation-delay: var(--reveal-delay, 0ms);
  }

  .premium-hero h1,
  .premium-hero p {
    margin: 0;
  }

  .premium-hero h1,
  .premium-hero p,
  .premium-hero strong,
  .premium-hero small {
    overflow-wrap: anywhere;
  }

  .premium-hero svg {
    display: block;
    flex-shrink: 0;
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
    width: fit-content;
    max-width: 650px;
    min-width: 0;
    padding: 11px 17px;
    border: 1px solid #ffffff40;
    border-radius: 999px;
    color: #fff;
    background: linear-gradient(120deg, #302045, #65477b);
    box-shadow:
      inset 0 1px 0 #ffffff30,
      0 10px 24px #63418020;
    font-size: 12px;
    font-weight: 650;
    line-height: 1.6;
    text-align: center;
    white-space: normal;
    text-wrap: balance;
  }

  .premium-hero__eyebrow span {
    min-width: 0;
  }

  .premium-hero__eyebrow svg {
    width: 16px;
    height: 16px;
    color: #ffe8d8;
  }

  /* Heading */
  .premium-hero .premium-hero__title {
    max-width: 960px;
    margin: 24px auto 0;
    color: var(--hero-ink);
    font-size: clamp(28px, 7.4vw, 44px);
    font-weight: 800;
    line-height: 1.18;
    letter-spacing: -.035em;
    white-space: normal;
    text-wrap: balance;
  }

  .premium-hero__title span {
    display: block;
    margin-top: 8px;
    padding-bottom: .08em;
    color: #824ac4;
    background:
      linear-gradient(
        105deg,
        #6d35b8 10%,
        #a55bbb 58%,
        #d68159
      );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .premium-hero .premium-hero__subtitle {
    max-width: 760px;
    margin: 18px auto 0;
    color: #65477b;
    font-size: clamp(15px, 3.9vw, 18px);
    font-weight: 600;
    line-height: 1.65;
    text-wrap: pretty;
  }

  /* Benefits ticker */
  .premium-hero__promise {
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 940px;
    min-width: 0;
    margin: 22px auto 0;
    overflow: hidden;
    border: 1px solid #e6d8f2;
    border-radius: 16px;
    background:
      linear-gradient(135deg, #ffffffed, #faf6ff, #ffecdf);
    box-shadow:
      0 4px 0 #e9ddf5,
      0 16px 32px -20px #63418055;
  }

  .premium-hero__promise-label {
    display: flex;
    flex: 0 0 86px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 9px;
    color: #fff;
    background: linear-gradient(120deg, #302045, #65477b);
    font-size: 10px;
    font-weight: 750;
    line-height: 1.4;
    letter-spacing: .04em;
    text-align: left;
  }

  .premium-hero__promise-label svg {
    width: 14px;
    height: 14px;
    color: #ffe8d8;
  }

  .premium-hero__promise-window {
    flex: 1 1 0%;
    min-width: 0;
    overflow: hidden;
    padding-block: 14px;
    mask-image:
      linear-gradient(
        90deg,
        transparent,
        #000 5%,
        #000 95%,
        transparent
      );
    -webkit-mask-image:
      linear-gradient(
        90deg,
        transparent,
        #000 5%,
        #000 95%,
        transparent
      );
  }

  .premium-hero__track {
    display: flex;
    width: max-content;
    max-width: none;
    animation: premiumHeroMarquee 48s linear infinite;
  }

  .premium-hero__promise-group,
  .premium-hero__marquee-group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 18px;
    margin: 0;
    padding: 0 18px 0 0;
    list-style: none;
  }

  .premium-hero__promise-group li {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 10px;
    color: #65477b;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__promise-group svg {
    width: 18px;
    height: 18px;
    color: #d67951;
  }

  /* Image */
  .premium-hero__visual {
    width: min(100%, 980px);
    max-width: 980px;
    min-width: 0;
    margin: 24px auto 0;
  }

  .premium-hero__image-wrap {
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 5px;
    border: 1px solid #fff;
    border-radius: 22px;
    background: linear-gradient(145deg, #fff, #faf6ff);
    box-shadow:
      0 20px 42px -27px #63418065,
      inset 0 1px 0 #fff;
  }

  .premium-hero .premium-hero__image {
    position: static;
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: auto;
    max-height: none;
    margin: 0;
    border: 0;
    border-radius: 16px;
    object-fit: contain;
    object-position: center;
    transform: none;
  }

  /* Image labels */
  .premium-hero__chips {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
    width: 100%;
    max-width: 360px;
    margin: 18px auto 0;
  }

  .premium-hero__chip {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    min-width: 0;
    padding: 13px 16px;
    border: 1px solid #fff;
    border-radius: 17px;
    background: #ffffffe0;
    box-shadow: 0 12px 30px -22px #75519580;
    text-align: left;
  }

  .premium-hero__chip > div {
    min-width: 0;
  }

  .premium-hero__chip strong,
  .premium-hero__chip small {
    display: block;
    white-space: normal;
  }

  .premium-hero__chip strong {
    color: #624777;
    font-size: 13px;
    line-height: 1.45;
    font-weight: 700;
  }

  .premium-hero__chip small {
    margin-top: 4px;
    color: var(--hero-muted);
    font-size: 12px;
    line-height: 1.55;
  }

  /* CTA */
  .premium-hero__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    min-width: 0;
    margin: 24px auto 0;
    padding-bottom: 6px;
  }

  .premium-hero .premium-hero__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    width: 100%;
    max-width: 360px;
    min-width: 0;
    min-height: 54px;
    height: auto;
    padding: 15px 18px;
    border: 1px solid #ffffff40;
    border-radius: 17px;
    color: #fff;
    background: linear-gradient(135deg, #9859de, #7238bd);
    box-shadow:
      0 5px 0 -1px #582b97,
      0 16px 30px -13px #7941bc85,
      inset 0 1px 0 #ffffff40;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
    white-space: normal;
    text-align: center;
    text-decoration: none;
    overflow-wrap: anywhere;
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .premium-hero__button > span {
    min-width: 0;
    white-space: normal;
  }

  .premium-hero__button svg {
    width: 20px;
    height: 20px;
  }

  /* Introduction */
  .premium-hero .premium-hero__intro {
    max-width: 760px;
    margin: 26px auto 0;
    color: var(--hero-muted);
    font-size: 15px;
    line-height: 1.8;
    text-wrap: pretty;
  }

  .premium-hero__intro strong {
    color: #65477b;
    font-weight: 700;
  }

  /* Pastel icons */
  .premium-hero__tile {
    --tile-top: #fdfaff;
    --tile-bottom: #eee2fa;
    --tile-border: #dec7ef;
    --tile-base: #c7a7dd;
    --tile-ink: #8851ad;

    position: relative;
    display: inline-grid;
    flex: 0 0 auto;
    place-items: center;
    width: 48px;
    height: 48px;
    margin-bottom: 5px;
    border: 1px solid var(--tile-border);
    border-radius: 16px;
    color: var(--tile-ink);
    background:
      linear-gradient(
        145deg,
        var(--tile-top),
        var(--tile-bottom)
      );
    box-shadow:
      0 6px 0 -1px var(--tile-base),
      0 14px 20px -14px var(--tile-ink),
      inset 0 1px 0 #fff;
    transition: transform .3s ease;
  }

  .premium-hero__tile::before {
    content: '';
    position: absolute;
    inset: 3px;
    border: 1px solid #ffffff95;
    border-radius: inherit;
    pointer-events: none;
  }

  .premium-hero__tile svg {
    position: relative;
    width: 23px;
    height: 23px;
  }

  .premium-hero__tile--peach {
    --tile-top: #fffaf5;
    --tile-bottom: #ffe8d8;
    --tile-border: #f0cdb9;
    --tile-base: #dcaf97;
    --tile-ink: #d67951;
  }

  .premium-hero__tile--gold {
    --tile-top: #fffdf4;
    --tile-bottom: #fff0c5;
    --tile-border: #eed797;
    --tile-base: #d6bd75;
    --tile-ink: #b58d32;
  }

  .premium-hero__tile--small {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    box-shadow:
      0 4px 0 -1px var(--tile-base),
      inset 0 1px 0 #fff;
  }

  .premium-hero__tile--small svg {
    width: 18px;
    height: 18px;
  }

  /* Four benefit cards */
  .premium-hero__points {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    width: 100%;
    max-width: 1080px;
    margin: 28px auto 0;
    padding: 0;
    list-style: none;
  }

  .premium-hero__point {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 22px;
    border: 1px solid #e6d8f2;
    border-radius: 22px;
    background:
      radial-gradient(
        ellipse at 100% 0,
        #f0e5ff70,
        transparent 65%
      ),
      linear-gradient(145deg, #fffffff5, #fffcffe6);
    box-shadow:
      0 4px 0 -2px #e9ddf5,
      0 18px 34px -25px #79549b65,
      inset 0 1px 0 #fff;
    text-align: left;
    transition: transform .3s ease, box-shadow .3s ease;
  }

  .premium-hero__point-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    min-width: 0;
  }

  .premium-hero__point-number {
    display: grid;
    flex: 0 0 27px;
    place-items: center;
    width: 27px;
    height: 27px;
    border: 1px solid #eadff3;
    border-radius: 9px;
    color: #a48bb7;
    background: #faf6fd;
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }

  .premium-hero .premium-hero__point p {
    margin-top: 18px;
    color: #624d76;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.65;
    text-wrap: pretty;
  }

  /* Services carousel */
  .premium-hero__carousel {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    margin-top: 30px;
  }

  .premium-hero__marquee {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    padding-block: 20px 25px;
    border-block: 1px solid #e7dcef;
    background:
      linear-gradient(180deg, #ffffff85, #f5edfc85);
    mask-image:
      linear-gradient(
        90deg,
        transparent,
        #000 4%,
        #000 96%,
        transparent
      );
    -webkit-mask-image:
      linear-gradient(
        90deg,
        transparent,
        #000 4%,
        #000 96%,
        transparent
      );
  }

  .premium-hero__service {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 10px;
    padding: 9px 16px 9px 9px;
    border: 1px solid #e5d8f4;
    border-radius: 16px;
    color: #77528e;
    background: linear-gradient(145deg, #fff, #fffcff);
    box-shadow:
      0 4px 0 -2px #e6d7f1,
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

  .premium-hero__service:nth-child(even)
  .premium-hero__service-icon {
    border-color: #e3d2f2;
    color: #9865bd;
    background: linear-gradient(145deg, #fcf8ff, #eee0fb);
  }

  .premium-hero__service-icon svg {
    width: 18px;
    height: 18px;
    transform-box: view-box;
    transform-origin: center;
    animation: premiumHeroIconSpin 14s linear infinite;
  }

  .premium-hero__service:nth-child(even) svg {
    animation-direction: reverse;
  }

  .premium-hero[data-paused='true'] .premium-hero__track,
  .premium-hero[data-paused='true']
  .premium-hero__service-icon svg {
    animation-play-state: paused;
  }

  .premium-hero__motion-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    max-width: calc(100% - 32px);
    min-height: 44px;
    margin: 16px auto 0;
    padding: 10px 16px;
    border: 1px solid #e7dbf2;
    border-radius: 999px;
    color: #806a91;
    background: #ffffffb5;
    font-family: inherit;
    font-size: 12px;
    line-height: 1.5;
    cursor: pointer;
  }

  .premium-hero__motion-button svg {
    width: 15px;
    height: 15px;
  }

  .premium-hero__button:focus-visible,
  .premium-hero__motion-button:focus-visible {
    outline: 3px solid #a577d9;
    outline-offset: 5px;
  }

  /* Animations */
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

  /* Larger phones and small tablets */
  @media (min-width: 480px) {
    .premium-hero__chips {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      max-width: 520px;
    }

    .premium-hero__chip {
      padding: 14px 12px;
      gap: 10px;
    }

    .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .premium-hero__visual {
      max-width: 560px;
    }
  }

  /* Tablets */
  @media (min-width: 768px) {
    .premium-hero {
      padding-top: var(--hero-top-space, 56px);
      padding-bottom: 36px;
    }

    .premium-hero .premium-hero__title {
      font-size: clamp(44px, 5.2vw, 64px);
      margin-top: 30px;
    }

    .premium-hero .premium-hero__subtitle {
      font-size: clamp(20px, 2vw, 24px);
      margin-top: 22px;
    }

    .premium-hero__promise {
      margin-top: 26px;
    }

    .premium-hero__promise-label {
      flex-basis: auto;
      padding: 14px 22px;
      font-size: 12px;
      gap: 9px;
    }

    .premium-hero__promise-group li {
      font-size: 17px;
    }

    .premium-hero__visual {
      max-width: 860px;
      margin-top: 28px;
    }

    .premium-hero__image-wrap {
      padding: 7px;
      border-radius: 28px;
    }

    .premium-hero .premium-hero__image {
      border-radius: 20px;
    }

    .premium-hero .premium-hero__button {
      width: auto;
      max-width: 100%;
      padding: 16px 30px;
      font-size: 16px;
    }

    .premium-hero .premium-hero__intro {
      margin-top: 30px;
      font-size: 17px;
    }

    .premium-hero__points {
      gap: 18px;
      margin-top: 34px;
    }

    .premium-hero__point {
      padding: 25px;
    }

    .premium-hero__carousel {
      margin-top: 38px;
    }
  }

  /* Desktops */
  @media (min-width: 1024px) {
    .premium-hero {
      padding-top: var(--hero-top-space, 64px);
    }

    .premium-hero__visual {
      max-width: 980px;
    }

    .premium-hero__points {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  /* Small phones */
  @media (max-width: 359px) {
    .premium-hero {
      --hero-gutter: 14px;
      padding-top: var(--hero-top-space, 28px);
    }

    .premium-hero .premium-hero__eyebrow {
      padding: 10px 12px;
      font-size: 11px;
      border-radius: 22px;
    }

    .premium-hero .premium-hero__title {
      font-size: 27px;
    }

    .premium-hero__promise {
      flex-direction: column;
    }

    .premium-hero__promise-label {
      flex-basis: auto;
      padding: 9px 12px;
    }

    .premium-hero__promise-window {
      flex-basis: auto;
      width: 100%;
    }
  }

  /* Pointer hover */
  @media (hover: hover) and (pointer: fine) {
    .premium-hero__point:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 38px -23px #79549b80;
    }

    .premium-hero .premium-hero__button:hover {
      transform: translateY(-2px);
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
    .premium-hero *::after {
      animation: none !important;
      transition: none !important;
    }

    .premium-hero .premium-hero__reveal {
      opacity: 1;
      transform: none;
    }

    .premium-hero__promise {
      flex-direction: column;
    }

    .premium-hero__promise-label {
      flex-basis: auto;
      padding: 10px 16px;
    }

    .premium-hero__promise-window {
      flex-basis: auto;
      width: 100%;
    }

    .premium-hero__promise-window,
    .premium-hero__marquee {
      mask-image: none;
      -webkit-mask-image: none;
      padding: 16px;
    }

    .premium-hero__track {
      width: 100%;
      transform: none;
    }

    .premium-hero__promise-group,
    .premium-hero__marquee-group {
      width: 100%;
      min-width: 0;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      padding: 0;
    }

    .premium-hero__promise-group li,
    .premium-hero__service {
      min-width: 0;
      max-width: 100%;
      white-space: normal;
    }

    .premium-hero__promise-group li span,
    .premium-hero__service > span:last-child {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .premium-hero__promise-group[aria-hidden='true'],
    .premium-hero__marquee-group[aria-hidden='true'],
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
        <Reveal className="premium-hero__reveal">
          <div className="premium-hero__pill">
            <p className="premium-hero__eyebrow">
              <Icon name="sparkle" />
              <span>
                Landing Page Design &amp; Development for Coaches,
                Consultants &amp; Trainers
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="premium-hero__reveal">
          <h1
            id="premium-hero-title"
            className="premium-hero__title"
          >
            You Bring the Expertise.
            <span>
              We Build the Page That Turns Interest Into Enquiries.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160} className="premium-hero__reveal">
          <p className="premium-hero__subtitle">
            Give your offer a landing page that helps visitors understand
            your value, trust your expertise and take the next step.
          </p>
        </Reveal>

        <Reveal delay={180} className="premium-hero__reveal">
          <div className="premium-hero__promise">
            <div className="premium-hero__promise-label">
              <Icon name="sparkle" />
              <span>OUR FOCUS</span>
            </div>

            <div className="premium-hero__promise-window">
              <div className="premium-hero__track">
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    className="premium-hero__promise-group"
                    aria-label={
                      copy === 0 ? 'Landing page benefits' : undefined
                    }
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

        <Reveal delay={200} className="premium-hero__reveal">
          <div className="premium-hero__visual">
            <div className="premium-hero__image-wrap">
              <img
                src={heroImage}
                alt="Coaching landing page shown on desktop and mobile"
                className="premium-hero__image"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="premium-hero__chips">
            <div className="premium-hero__chip">
              <IconTile name="target" tone="peach" small />

              <div>
                <strong>Clearer message</strong>
                <small>Communicate your offer</small>
              </div>
            </div>

            <div className="premium-hero__chip">
              <IconTile name="calendar" tone="purple" small />

              <div>
                <strong>Simple next steps</strong>
                <small>Enquiries &amp; bookings</small>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240} className="premium-hero__reveal">
          <div className="premium-hero__actions">
            <Button className="premium-hero__button">
              Book My One-to-One Call
            </Button>
          </div>
        </Reveal>

        <Reveal delay={280} className="premium-hero__reveal">
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
                className="premium-hero__point"
              >
                <div className="premium-hero__point-top">
                  <IconTile
                    name={point.icon}
                    tone={point.tone}
                  />

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
        <div className="premium-hero__marquee">
          <div className="premium-hero__track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="premium-hero__marquee-group"
                aria-label={
                  copy === 0 ? 'Landing page services' : undefined
                }
                aria-hidden={copy === 1 ? true : undefined}
              >
                {services.map((service) => (
                  <li
                    key={`${copy}-${service.text}`}
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
          aria-label={
            motionPaused
              ? 'Resume hero animations'
              : 'Pause hero animations'
          }
        >
          <Icon name={motionPaused ? 'play' : 'pause'} />
          {motionPaused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>
    </section>
  )
}