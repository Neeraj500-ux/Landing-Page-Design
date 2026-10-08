import { useState } from 'react'
import { Button, Container, Pill, Reveal } from './ui'

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

const styles = `
  .premium-hero {
    --hero-ink: #302045;
    --hero-muted: #776684;
    --hero-purple: #793fca;
    --phone-float-distance: -8px;

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 116px 0 34px;
    overflow: hidden;
    color: var(--hero-ink);
    background:
      radial-gradient(
        ellipse at 12% 14%, #e9dbff 0%, transparent 40%
      ),
      radial-gradient(
        ellipse at 93% 29%, #ffecdf 0%, transparent 37%
      ),
      linear-gradient(
        180deg, #fcfaff 0%, #f7f2ff 56%, #fbf8ff 100%
      );
  }

  .premium-hero,
  .premium-hero *,
  .premium-hero::before,
  .premium-hero::after,
  .premium-hero *::before,
  .premium-hero *::after {
    box-sizing: border-box;
  }

  .premium-hero::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(#9166be22 .8px, transparent .8px);
    background-size: 25px 25px;
    -webkit-mask-image: linear-gradient(#0009, transparent 65%);
    mask-image: linear-gradient(#0009, transparent 65%);
  }

  .premium-hero .premium-hero__container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 40px);
    text-align: center;
  }

  .premium-hero__reveal {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .premium-hero__pill {
    display: flex;
    justify-content: center;
    min-width: 0;
  }

  .premium-hero__pill > * {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    max-width: min(100%, 720px);
    padding: 10px 17px;
    border: 1px solid #ded0ef;
    border-radius: 999px;
    color: #705087;
    background: #ffffffd9;
    box-shadow:
      0 6px 20px -12px #7446a540,
      inset 0 1px 0 #fff;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.6;
    white-space: normal;
    text-wrap: balance;
  }

  .premium-hero__pill span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .premium-hero__pill svg {
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    color: var(--hero-purple);
  }

  .premium-hero__title {
    max-width: 1000px;
    margin: 26px auto 0;
    color: var(--hero-ink);
    font-size: clamp(35px, 5.1vw, 68px);
    font-weight: 750;
    line-height: 1.12;
    letter-spacing: -.052em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .premium-hero__title span {
    display: block;
    margin-top: 7px;
    padding-bottom: .06em;
    color: #824ac4;
    background:
      linear-gradient(
        105deg, #6d35b8 10%, #a55bbb 58%, #d68159 100%
      );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .premium-hero__subtitle {
    max-width: 650px;
    margin: 21px auto 0;
    color: var(--hero-muted);
    font-size: clamp(16px, 1.5vw, 18px);
    line-height: 1.85;
    text-wrap: pretty;
  }

  /*
    Equal side columns keep the main image on the page center.
    The phone occupies only the right column.
  */

  .premium-hero__visual {
    display: grid;
    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 640px)
      minmax(0, 1fr);
    align-items: center;
    column-gap: clamp(14px, 2vw, 24px);
    width: 100%;
    max-width: 980px;
    min-width: 0;
    margin: 30px auto 0;
    padding: 12px 0 24px;
  }

  .premium-hero__image-wrap {
    position: relative;
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 7px;
    border: 1px solid #e5d6ef;
    border-radius: 28px;
    background: linear-gradient(145deg, #ffffff, #faf6ff);
    box-shadow:
      0 22px 48px -28px #63418055,
      0 5px 15px -10px #63418025,
      inset 0 1px 0 #ffffff;
  }

  .premium-hero .premium-hero__image {
    position: static;
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    max-height: none;
    margin: 0;
    border: 0;
    border-radius: 21px;
    object-fit: contain;
    object-position: center;
  }

  .premium-hero__phone-wrap {
    position: relative;
    grid-column: 3;
    grid-row: 1;
    align-self: center;
    justify-self: start;
    width: 100%;
    max-width: 108px;
    min-width: 0;
    margin: 0;
    padding: 12px 0 18px;
  }

  .premium-hero .premium-hero__phone {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
    border: 3px solid #fff;
    border-radius: 17px;
    background: #fff;
    object-fit: contain;
    box-shadow:
      0 12px 24px -13px #55377455,
      0 0 0 1px #d9c4ed70;
    animation: premiumHeroPhoneFloat 6s ease-in-out infinite;
  }

  .premium-hero__phone-wrap::after {
    content: "";
    position: absolute;
    right: 10%;
    bottom: 0;
    left: 10%;
    height: 9px;
    border-radius: 50%;
    background: #65408130;
    filter: blur(5px);
    animation: premiumHeroPhoneShadow 6s ease-in-out infinite;
    pointer-events: none;
  }

  .premium-hero__chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    max-width: 560px;
    margin: 0 auto;
  }

  .premium-hero__chip {
    display: flex;
    align-items: center;
    gap: 11px;
    min-width: 0;
    max-width: 100%;
    padding: 11px 16px 11px 11px;
    border: 1px solid #fff;
    border-radius: 17px;
    background: #ffffffe0;
    box-shadow: 0 12px 30px -22px #75519580;
    text-align: left;
  }

  .premium-hero__chip > div {
    min-width: 0;
    overflow-wrap: break-word;
  }

  .premium-hero__chip strong,
  .premium-hero__chip small {
    display: block;
  }

  .premium-hero__chip strong {
    color: #624777;
    font-size: 12px;
    font-weight: 650;
    line-height: 1.5;
  }

  .premium-hero__chip small {
    margin-top: 2px;
    color: var(--hero-muted);
    font-size: 11px;
    line-height: 1.5;
  }

  .premium-hero__actions {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
    margin: 26px auto 0;
  }

  .premium-hero .premium-hero__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    min-height: 58px;
    padding: 17px 30px;
    border: 1px solid #ffffff40;
    border-radius: 17px;
    color: #fff;
    background: linear-gradient(135deg, #9859de, #7238bd);
    box-shadow:
      0 5px 0 -1px #582b97,
      0 16px 30px -13px #7941bc85,
      inset 0 1px 0 #ffffff40;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    text-align: center;
    white-space: normal;
    text-decoration: none;
    overflow-wrap: anywhere;
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .premium-hero__button svg {
    flex-shrink: 0;
  }

  .premium-hero__button:focus-visible {
    outline: 3px solid #a577d9;
    outline-offset: 7px;
  }

  .premium-hero__intro {
    max-width: 820px;
    margin: 30px auto 0;
    color: var(--hero-muted);
    font-size: clamp(15px, 1.4vw, 17px);
    line-height: 1.85;
    text-wrap: pretty;
  }

  .premium-hero__intro strong {
    color: #65477b;
    font-weight: 700;
  }

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
    width: 58px;
    height: 58px;
    margin-bottom: 5px;
    border: 1px solid var(--tile-border);
    border-radius: 19px;
    color: var(--tile-ink);
    background:
      linear-gradient(145deg, var(--tile-top), var(--tile-bottom));
    box-shadow:
      0 6px 0 -1px var(--tile-base),
      0 14px 20px -14px var(--tile-ink),
      inset 0 1px 0 #fff;
    transition: transform .3s ease;
  }

  .premium-hero__tile::before {
    content: "";
    position: absolute;
    inset: 3px;
    border: 1px solid #ffffff95;
    border-radius: 15px;
    pointer-events: none;
  }

  .premium-hero__tile svg {
    position: relative;
    display: block;
    width: 26px;
    height: 26px;
    filter: drop-shadow(0 1px 0 #ffffffb0);
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
    width: 37px;
    height: 37px;
    border-radius: 12px;
    box-shadow:
      0 4px 0 -1px var(--tile-base),
      inset 0 1px 0 #fff;
  }

  .premium-hero__tile--small::before {
    inset: 2px;
    border-radius: 9px;
  }

  .premium-hero__tile--small svg {
    width: 19px;
    height: 19px;
  }

  .premium-hero__points {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
    gap: 18px;
    max-width: 1080px;
    margin: 32px auto 0;
    padding: 0;
    list-style: none;
  }

  .premium-hero__point {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    padding: 25px 22px 24px;
    border: 1px solid #e6d8f2;
    border-radius: 24px;
    background:
      radial-gradient(
        ellipse at 100% 0, #f0e5ff70, transparent 65%
      ),
      linear-gradient(145deg, #fffffff5, #fffcffe6);
    box-shadow:
      0 4px 0 -2px #e9ddf5,
      0 18px 34px -25px #79549b65,
      inset 0 1px 0 #fff;
    text-align: left;
    transition:
      transform .3s ease,
      box-shadow .3s ease,
      border-color .3s ease;
  }

  .premium-hero__point-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    min-width: 0;
  }

  .premium-hero__point-number {
    display: grid;
    flex: 0 0 29px;
    place-items: center;
    width: 29px;
    height: 29px;
    border: 1px solid #eadff3;
    border-radius: 10px;
    color: #a48bb7;
    background: #faf6fd;
    font-size: 11px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .premium-hero__point p {
    width: 100%;
    margin: 24px 0 0;
    color: #624d76;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.7;
    letter-spacing: -.015em;
    overflow-wrap: anywhere;
    text-wrap: pretty;
  }

  .premium-hero__carousel {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin-top: 38px;
  }

  .premium-hero__marquee {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-block: 22px 27px;
    border-top: 1px solid #e7dcef;
    border-bottom: 1px solid #e7dcef;
    background: linear-gradient(180deg, #ffffff85, #f5edfc85);
    -webkit-mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    mask-image:
      linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }

  .premium-hero__track {
    display: flex;
    width: max-content;
    animation: premiumHeroMarquee 48s linear infinite;
    will-change: transform;
  }

  .premium-hero__marquee-group {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-around;
    gap: 16px;
    min-width: 100vw;
    margin: 0;
    padding: 0 16px 0 0;
    list-style: none;
  }

  .premium-hero__service {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 12px;
    padding: 10px 21px 10px 10px;
    border: 1px solid #e5d8f4;
    border-radius: 18px;
    color: #77528e;
    background: linear-gradient(145deg, #fff, #fffcff);
    box-shadow:
      0 4px 0 -2px #e6d7f1,
      0 12px 22px -19px #75519588,
      inset 0 1px 0 #fff;
    font-size: 14px;
    font-weight: 550;
    line-height: 1.5;
    white-space: nowrap;
  }

  .premium-hero__service-icon {
    display: grid;
    flex: 0 0 38px;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid #ecd9cc;
    border-radius: 13px;
    color: #c78055;
    background: linear-gradient(145deg, #fff9f3, #ffeadc);
    box-shadow: inset 0 1px 0 #fff;
  }

  .premium-hero__service:nth-child(even) .premium-hero__service-icon {
    border-color: #e3d2f2;
    color: #9865bd;
    background: linear-gradient(145deg, #fcf8ff, #eee0fb);
  }

  .premium-hero__service-icon svg {
    display: block;
    width: 19px;
    height: 19px;
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: premiumHeroIconSpin 14s linear infinite;
  }

  .premium-hero__service:nth-child(even) .premium-hero__service-icon svg {
    animation-direction: reverse;
  }

  .premium-hero[data-paused="true"] .premium-hero__track,
  .premium-hero[data-paused="true"] .premium-hero__service-icon svg,
  .premium-hero[data-paused="true"] .premium-hero__phone,
  .premium-hero[data-paused="true"] .premium-hero__phone-wrap::after {
    animation-play-state: paused;
  }

  .premium-hero__motion-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    max-width: calc(100% - 32px);
    min-height: 44px;
    margin: 14px auto 0;
    padding: 10px 16px;
    border: 1px solid #e7dbf2;
    border-radius: 999px;
    color: #806a91;
    background: #ffffffb5;
    font: inherit;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    cursor: pointer;
  }

  .premium-hero__motion-button svg {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
  }

  .premium-hero__motion-button:focus-visible {
    outline: 2px solid #9b6bc7;
    outline-offset: 4px;
  }

  @supports (backdrop-filter: blur(16px)) {
    .premium-hero__chip {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
  }

  @keyframes premiumHeroPhoneFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(var(--phone-float-distance));
    }
  }

  @keyframes premiumHeroPhoneShadow {
    0%, 100% {
      transform: scaleX(1);
      opacity: .6;
    }
    50% {
      transform: scaleX(.85);
      opacity: .35;
    }
  }

  @keyframes premiumHeroMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes premiumHeroIconSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (hover: hover) and (pointer: fine) {
    .premium-hero__point:hover {
      transform: translateY(-5px);
      border-color: #d7bceb;
      box-shadow:
        0 5px 0 -2px #e5d5f1,
        0 24px 38px -23px #79549b80;
    }

    .premium-hero__point:hover .premium-hero__tile {
      transform: translateY(-2px);
    }

    .premium-hero .premium-hero__button:hover {
      transform: translateY(-2px);
      box-shadow:
        0 7px 0 -1px #582b97,
        0 20px 35px -13px #7941bc85,
        inset 0 1px 0 #ffffff40;
    }

    .premium-hero__marquee:hover .premium-hero__track {
      animation-play-state: paused;
    }

    .premium-hero__motion-button:hover {
      border-color: #cfb5e4;
      background: #fff;
    }
  }

  @media (min-width: 1024px) {
    .premium-hero {
      padding-top: 136px;
      padding-bottom: 40px;
    }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    .premium-hero__visual {
      grid-template-columns:
        minmax(0, 1fr)
        minmax(0, 5fr)
        minmax(0, 1fr);
      column-gap: 14px;
      max-width: 800px;
      margin-top: 26px;
    }

    .premium-hero__image-wrap {
      padding: 6px;
      border-radius: 23px;
    }

    .premium-hero .premium-hero__image {
      border-radius: 17px;
    }

    .premium-hero .premium-hero__phone {
      border-width: 2px;
      border-radius: 13px;
    }
  }

  @media (max-width: 1023px) {
    .premium-hero__points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      max-width: 760px;
    }

    .premium-hero__point {
      padding: 25px;
    }

    .premium-hero__point p {
      font-size: 16px;
    }
  }

  @media (max-width: 639px) {
    .premium-hero {
      --phone-float-distance: -5px;
      padding-top: 100px;
      padding-bottom: 24px;
    }

    .premium-hero__pill > * {
      padding: 9px 12px;
      font-size: 10px;
      line-height: 1.7;
    }

    .premium-hero__title {
      margin-top: 20px;
      font-size: clamp(30px, 8.2vw, 46px);
      line-height: 1.15;
      letter-spacing: -.045em;
    }

    .premium-hero__subtitle {
      margin-top: 16px;
      font-size: 15px;
      line-height: 1.8;
    }

    /*
      Main image gets its own centered row on mobile.
      Phone has its own row and cannot squeeze or overlap it.
    */

    .premium-hero__visual {
      grid-template-columns: minmax(0, 1fr);
      justify-items: center;
      row-gap: 18px;
      width: min(100%, 400px);
      margin-top: 22px;
      padding: 4px 0 18px;
    }

    .premium-hero__image-wrap {
      grid-column: 1;
      grid-row: 1;
      width: 100%;
      padding: 5px;
      border-radius: 20px;
      box-shadow:
        0 16px 32px -22px #63418055,
        inset 0 1px 0 #ffffff;
    }

    .premium-hero .premium-hero__image {
      width: 100%;
      height: auto;
      max-height: none;
      border-radius: 15px;
    }

    .premium-hero__phone-wrap {
      grid-column: 1;
      grid-row: 2;
      justify-self: center;
      width: 62px;
      max-width: 100%;
      margin: 0;
      padding: 6px 0 12px;
    }

    .premium-hero .premium-hero__phone {
      border-width: 2px;
      border-radius: 11px;
      box-shadow:
        0 9px 17px -10px #55377455,
        0 0 0 1px #d9c4ed70;
    }

    .premium-hero__phone-wrap::after {
      height: 7px;
      filter: blur(4px);
    }

    .premium-hero__chips {
      gap: 8px;
      max-width: 370px;
    }

    .premium-hero__chip {
      flex: 1 1 140px;
      justify-content: center;
      gap: 8px;
      padding: 10px 8px;
      border-radius: 14px;
    }

    .premium-hero__chip strong {
      font-size: 11px;
    }

    .premium-hero__chip small {
      font-size: 10px;
    }

    .premium-hero__chip .premium-hero__tile {
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }

    .premium-hero__chip .premium-hero__tile svg {
      width: 16px;
      height: 16px;
    }

    .premium-hero__actions {
      margin-top: 23px;
    }

    .premium-hero .premium-hero__button {
      width: min(100%, 330px);
      min-height: 54px;
      padding: 15px 16px;
      font-size: 15px;
    }

    .premium-hero__intro {
      margin-top: 26px;
      font-size: 15px;
      line-height: 1.85;
    }

    .premium-hero__points {
      gap: 13px;
      margin-top: 25px;
    }

    .premium-hero__point {
      padding: 19px 15px 20px;
      border-radius: 20px;
    }

    .premium-hero__point-top {
      gap: 8px;
    }

    .premium-hero__point-number {
      flex-basis: 24px;
      width: 24px;
      height: 24px;
      border-radius: 8px;
      font-size: 10px;
    }

    .premium-hero__point .premium-hero__tile {
      width: 46px;
      height: 46px;
      border-radius: 15px;
    }

    .premium-hero__point .premium-hero__tile::before {
      border-radius: 11px;
    }

    .premium-hero__point .premium-hero__tile svg {
      width: 22px;
      height: 22px;
    }

    .premium-hero__point p {
      margin-top: 21px;
      font-size: 14px;
      line-height: 1.7;
    }

    .premium-hero__carousel {
      margin-top: 28px;
    }

    .premium-hero__marquee {
      padding-block: 19px 23px;
    }

    .premium-hero__marquee-group {
      gap: 12px;
      padding-right: 12px;
    }

    .premium-hero__service {
      gap: 10px;
      padding: 9px 16px 9px 9px;
      border-radius: 16px;
      font-size: 13px;
    }

    .premium-hero__service-icon {
      flex-basis: 34px;
      width: 34px;
      height: 34px;
      border-radius: 11px;
    }

    .premium-hero__service-icon svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 359px) {
    .premium-hero__points {
      grid-template-columns: minmax(0, 1fr);
    }

    .premium-hero__point {
      padding: 21px;
    }

    .premium-hero__point p {
      margin-top: 18px;
      font-size: 15px;
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
      opacity: 1 !important;
      transform: none !important;
    }

    .premium-hero__marquee {
      padding-inline: 16px;
      -webkit-mask-image: none;
      mask-image: none;
    }

    .premium-hero__track {
      width: 100%;
      transform: none;
      will-change: auto;
    }

    .premium-hero__marquee-group {
      width: 100%;
      min-width: 0;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      padding: 0;
    }

    .premium-hero__marquee-group[aria-hidden="true"],
    .premium-hero__motion-button {
      display: none;
    }

    .premium-hero__service {
      max-width: 100%;
      white-space: normal;
    }

    .premium-hero__service > span:last-child {
      min-width: 0;
      overflow-wrap: anywhere;
    }
  }
`

export default function Hero() {
  const [motionPaused, setMotionPaused] = useState(false)
  const baseUrl = import.meta.env.BASE_URL || '/'

  const heroImage = `${baseUrl}images/Neeraj2.png`
  const phoneImage = `${baseUrl}images/hero-mobile.svg`

  return (
    <section
      id="top"
      className="premium-hero"
      data-paused={motionPaused}
      aria-labelledby="premium-hero-title"
    >
      <style>{styles}</style>

      <Container className="premium-hero__container">
        <Reveal className="premium-hero__reveal">
          <div className="premium-hero__pill">
            <Pill>
              <Icon name="sparkle" />

              <span>
                Landing Page Design &amp; Development for Coaches,
                Consultants &amp; Trainers
              </span>
            </Pill>
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

        <Reveal delay={200} className="premium-hero__reveal">
          <div className="premium-hero__visual">
            <div className="premium-hero__image-wrap">
              <img
                src={heroImage}
                alt="Coaching landing page shown on desktop and mobile"
                className="premium-hero__image"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <div className="premium-hero__phone-wrap">
              <img
                src={phoneImage}
                alt="Mobile landing page concept preview"
                className="premium-hero__phone"
                decoding="async"
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
      </Container>

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
          aria-label="Pause hero animations"
        >
          <Icon name={motionPaused ? 'play' : 'pause'} />
          {motionPaused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>
    </section>
  )
}