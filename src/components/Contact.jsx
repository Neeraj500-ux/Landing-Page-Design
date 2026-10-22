import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const points = [
  'High-converting landing pages',
  'Smart automation and follow-ups',
  'Custom tracking and analytics',
]

const bars = [34, 48, 42, 63, 57, 78, 92]

const initialForm = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  businessType: '',
  website: '',
  goal: '',
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3 17 6-6 4 4 8-8M15 7h6v6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

  .ct-popup-root,
  .ct-popup-overlay {
    --ct-violet: #7c3aed;
    --ct-violet-light: #a98af0;
    --ct-violet-deep: #5b21b6;
    --ct-dark-1: #1b1233;
    --ct-dark-2: #120a24;
    --ct-ink: #14111f;
    --ct-ink-soft: #2a2140;
    --ct-muted: #5b5870;
    --ct-line: #e6dffa;
    --ct-yellow: #ffe04e;
    --ct-ease: cubic-bezier(.22, 1, .36, 1);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .ct-popup-root *,
  .ct-popup-root *::before,
  .ct-popup-root *::after {
    box-sizing: border-box;
  }

  .ct-popup-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background:
      radial-gradient(60% 50% at 20% 10%, rgba(124, 58, 237, .28), transparent 70%),
      rgba(20, 13, 39, .74);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    overflow-y: auto;
    overscroll-behavior: contain;
    animation: ctOverlayIn .25s ease both;
  }

  .ct-popup-overlay *,
  .ct-popup-overlay *::before,
  .ct-popup-overlay *::after {
    box-sizing: border-box;
  }

  .ct-popup-modal {
    position: relative;
    isolation: isolate;
    width: min(100%, 1000px);
    max-height: calc(100dvh - 48px);
    display: grid;
    grid-template-columns: minmax(0, .88fr) minmax(0, 1.12fr);
    grid-template-rows: minmax(0, 1fr);
    overflow: hidden;
    background: #fff;
    border-radius: 28px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, .08),
      0 44px 110px -20px rgba(20, 13, 39, .6),
      0 10px 28px rgba(20, 13, 39, .2);
    animation: ctModalIn .45s var(--ct-ease) both;
  }

  .ct-popup-close {
    position: absolute;
    z-index: 5;
    top: 16px;
    right: 16px;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    padding: 0;
    color: var(--ct-ink-soft);
    background: #fff;
    border: 1px solid var(--ct-line);
    border-radius: 50%;
    box-shadow: 0 6px 16px -8px rgba(91, 33, 182, .35);
    cursor: pointer;
    transition: background .25s, color .25s, transform .35s var(--ct-ease);
    -webkit-tap-highlight-color: transparent;
  }

  .ct-popup-close:hover {
    color: #fff;
    background: var(--ct-violet);
    transform: rotate(90deg);
  }

  .ct-popup-close:focus-visible,
  .ct-popup-root .ct-popup-yellow:focus-visible {
    outline: 3px solid var(--ct-violet-light);
    outline-offset: 3px;
  }

  /* ---------- Left info panel ---------- */

  .ct-popup-side {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0;
    min-width: 0;
    padding: 46px 40px 32px;
    color: #fff;
    text-align: left;
    overflow: hidden;
    background: linear-gradient(160deg, var(--ct-dark-1), var(--ct-dark-2));
  }

  /* Moving background layers */

  .ct-popup-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }

  .ct-popup-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(48px);
    will-change: transform;
  }

  .ct-popup-orb.o1 {
    top: -90px;
    left: -80px;
    width: 280px;
    height: 280px;
    background: rgba(255, 224, 78, .22);
    animation: ctFloatA 14s ease-in-out infinite;
  }

  .ct-popup-orb.o2 {
    right: -120px;
    bottom: -80px;
    width: 360px;
    height: 360px;
    background: rgba(139, 92, 246, .6);
    animation: ctFloatB 17s ease-in-out infinite;
  }

  .ct-popup-orb.o3 {
    top: 42%;
    left: 30%;
    width: 200px;
    height: 200px;
    background: rgba(168, 85, 247, .28);
    animation: ctFloatC 20s ease-in-out infinite;
  }

  .ct-popup-grid {
    position: absolute;
    inset: -40px;
    background-image: radial-gradient(rgba(255, 255, 255, .16) 1px, transparent 1.5px);
    background-size: 26px 26px;
    -webkit-mask-image: radial-gradient(70% 60% at 30% 25%, #000, transparent 75%);
    mask-image: radial-gradient(70% 60% at 30% 25%, #000, transparent 75%);
    animation: ctGridDrift 18s linear infinite;
  }

  .ct-popup-rings {
    position: absolute;
    right: -150px;
    bottom: -150px;
    width: 340px;
    height: 340px;
  }

  .ct-popup-rings i {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, .18);
    border-radius: 50%;
    animation: ctRing 7s ease-out infinite;
  }

  .ct-popup-rings i:nth-child(2) {
    animation-delay: 2.3s;
  }

  .ct-popup-rings i:nth-child(3) {
    animation-delay: 4.6s;
  }

  /* Left content */

  .ct-popup-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    width: fit-content;
    max-width: 100%;
    padding: 8px 15px;
    border: 1px solid rgba(255, 255, 255, .2);
    border-radius: 999px;
    color: #fff;
    background: rgba(255, 255, 255, .08);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    font-size: 12.5px;
    font-weight: 600;
    line-height: 1.4;
  }

  .ct-popup-dot {
    position: relative;
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ct-yellow);
    box-shadow: 0 0 12px rgba(255, 224, 78, .8);
  }

  .ct-popup-dot::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--ct-yellow);
    animation: ctPulse 2s ease-out infinite;
  }

  .ct-popup-side h2 {
    margin: 24px 0 14px;
    max-width: 390px;
    color: #fff;
    font-family: "Bricolage Grotesque", Inter, sans-serif;
    font-size: clamp(32px, 3.4vw, 44px);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -.035em;
    text-align: left;
    text-wrap: balance;
  }

  .ct-popup-side h2 span {
    color: transparent;
    background: linear-gradient(90deg, #ffe04e, #ffb938, #ffe04e);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ctTextShine 5s linear infinite;
  }

  .ct-popup-side p {
    margin: 0;
    max-width: 370px;
    color: rgba(255, 255, 255, .78);
    font-size: 15px;
    line-height: 1.7;
    text-align: left;
  }

  .ct-popup-points {
    display: grid;
    gap: 12px;
    width: 100%;
    max-width: 390px;
    margin: 28px 0 0;
    padding: 0;
    list-style: none;
  }

  .ct-popup-points li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
    padding: 11px 14px;
    color: #fff;
    background: rgba(255, 255, 255, .05);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 14px;
    font-size: 14.5px;
    font-weight: 500;
    line-height: 1.45;
    text-align: left;
    transition: background .3s, border-color .3s, transform .3s var(--ct-ease);
  }

  .ct-popup-points li:hover {
    background: rgba(255, 255, 255, .09);
    border-color: rgba(255, 224, 78, .35);
    transform: translateX(4px);
  }

  .ct-popup-check {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    color: var(--ct-yellow);
    background: rgba(255, 224, 78, .12);
    border: 1px solid rgba(255, 224, 78, .38);
    border-radius: 50%;
  }

  .ct-popup-check path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ctDraw .6s ease forwards;
  }

  .ct-popup-points li:nth-child(1) .ct-popup-check path { animation-delay: .6s; }
  .ct-popup-points li:nth-child(2) .ct-popup-check path { animation-delay: .8s; }
  .ct-popup-points li:nth-child(3) .ct-popup-check path { animation-delay: 1s; }

  /* Growth preview card */

  .ct-popup-growth {
    width: 100%;
    max-width: 390px;
    margin-top: 24px;
    padding: 16px 18px 14px;
    background: rgba(255, 255, 255, .06);
    border: 1px solid rgba(255, 255, 255, .12);
    border-radius: 16px;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    text-align: left;
  }

  .ct-popup-growth-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    color: rgba(255, 255, 255, .78);
    font-size: 12.5px;
    font-weight: 600;
  }

  .ct-popup-growth-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    color: var(--ct-yellow);
    background: rgba(255, 224, 78, .12);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
  }

  .ct-popup-bars {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 56px;
  }

  .ct-popup-bars span {
    flex: 1;
    height: var(--h);
    border-radius: 6px 6px 3px 3px;
    background: linear-gradient(180deg, #ffe04e, rgba(255, 224, 78, .25));
    transform-origin: bottom;
    animation:
      ctBarGrow .9s var(--ct-ease) both,
      ctBarBreath 4.5s ease-in-out infinite;
    animation-delay: calc(var(--i) * .08s + .5s), calc(var(--i) * .25s + 1.6s);
  }

  .ct-popup-bars span:not(:last-child) {
    background: linear-gradient(180deg, rgba(196, 170, 255, .9), rgba(139, 92, 246, .25));
  }

  .ct-popup-side-note {
    width: 100%;
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, .14);
    color: rgba(255, 255, 255, .66);
    font-size: 12.5px;
    font-weight: 500;
    line-height: 1.6;
    text-align: left;
  }

  .ct-popup-side-note + .ct-popup-side-note {
    margin-top: 0;
  }

  .ct-popup-spacer {
    flex: 1 1 auto;
    min-height: 24px;
  }

  /* Staggered entrance for left content */

  .ct-popup-rise {
    opacity: 0;
    animation: ctRise .7s var(--ct-ease) forwards;
    animation-delay: calc(var(--d, 0) * .09s + .15s);
  }

  /* ---------- Form area ---------- */

  .ct-popup-form-area {
    min-width: 0;
    padding: 40px 38px 30px;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: #fff;
    text-align: left;
  }

  .ct-popup-form-head {
    padding-right: 48px;
    margin-bottom: 26px;
  }

  .ct-popup-form-head small {
    display: inline-block;
    margin-bottom: 8px;
    color: var(--ct-violet);
    font-size: 13px;
    font-weight: 700;
  }

  .ct-popup-form-head h3 {
    margin: 0 0 8px;
    color: var(--ct-ink);
    font-family: "Bricolage Grotesque", Inter, sans-serif;
    font-size: clamp(26px, 2.6vw, 33px);
    font-weight: 800;
    letter-spacing: -.03em;
    line-height: 1.15;
  }

  .ct-popup-form-head p {
    margin: 0;
    color: var(--ct-muted);
    font-size: 14.5px;
    line-height: 1.65;
  }

  .ct-popup-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 14px;
  }

  .ct-popup-field {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 7px;
  }

  .ct-popup-field.full {
    grid-column: 1 / -1;
  }

  .ct-popup-field label {
    color: var(--ct-ink-soft);
    font-size: 13px;
    font-weight: 700;
    line-height: 1.3;
  }

  .ct-popup-field label span {
    color: #8b8798;
    font-weight: 500;
  }

  .ct-popup-field input,
  .ct-popup-field select,
  .ct-popup-field textarea {
    display: block;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 12px 14px;
    border: 1px solid #e2dcf2;
    border-radius: 12px;
    outline: none;
    color: var(--ct-ink);
    background: #fbfaff;
    font-family: inherit;
    font-size: 15px;
    line-height: 1.5;
    transition: border-color .2s, box-shadow .25s, background .2s, transform .25s var(--ct-ease);
  }

  .ct-popup-field input,
  .ct-popup-field select {
    height: 48px;
  }

  .ct-popup-field select {
    cursor: pointer;
  }

  .ct-popup-field textarea {
    min-height: 96px;
    resize: vertical;
  }

  .ct-popup-field input:hover,
  .ct-popup-field select:hover,
  .ct-popup-field textarea:hover {
    border-color: #cdbff3;
  }

  .ct-popup-field input:focus,
  .ct-popup-field select:focus,
  .ct-popup-field textarea:focus {
    border-color: var(--ct-violet);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, .13);
  }

  .ct-popup-field input::placeholder,
  .ct-popup-field textarea::placeholder {
    color: #a7a2b8;
    opacity: 1;
  }

  /* ---------- Yellow 3D button ---------- */

  .ct-popup-root .ct-popup-yellow,
  .ct-popup-overlay .ct-popup-yellow {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-width: 0;
    min-height: 56px;
    margin: 0;
    padding: 14px clamp(16px, 4vw, 30px);
    border: 1px solid #f3b01f;
    border-radius: 16px;
    color: #2e0c4d;
    background: linear-gradient(180deg, #ffee82, #ffe04e 48%, #ffca30);
    box-shadow:
      inset 0 1px 0 #fff8c4,
      inset 0 -2px 4px #f5b2144d,
      0 5px 0 #d18f0a,
      0 16px 28px -10px #f5b323a0;
    font-family: inherit;
    font-size: clamp(15px, 1.4vw, 17px);
    font-weight: 800;
    line-height: 1.35;
    text-align: center;
    text-decoration: none;
    white-space: normal;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .ct-popup-overlay .ct-popup-yellow::before {
    content: "";
    position: absolute;
    inset: 0 0 50%;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg, #ffffff40, transparent);
  }

  .ct-popup-overlay .ct-popup-yellow::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -45%;
    width: 32%;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(100deg, transparent, #ffffff99, transparent);
    transform: skewX(-20deg);
    animation: ctShine 5.5s ease-in-out 2s infinite;
  }

  .ct-popup-overlay .ct-popup-yellow > span {
    font-size: 19px;
    line-height: 1;
    transition: transform .25s var(--ct-ease);
  }

  .ct-popup-overlay .ct-popup-yellow:active {
    transform: translateY(3px);
    box-shadow:
      inset 0 1px 0 #fff8c4,
      0 2px 0 #d18f0a,
      0 8px 16px -8px #f5b323a0;
  }

  .ct-popup-overlay .ct-popup-yellow:disabled {
    opacity: .65;
    cursor: not-allowed;
    transform: none;
  }

  .ct-popup-submit {
    grid-column: 1 / -1;
    margin-top: 6px;
  }

  .ct-popup-privacy {
    grid-column: 1 / -1;
    margin: 0;
    color: #8a869a;
    font-size: 12.5px;
    line-height: 1.6;
    text-align: center;
  }

  .ct-popup-error {
    grid-column: 1 / -1;
    margin: 0;
    padding: 11px 14px;
    color: #9d2737;
    background: #fff1f2;
    border: 1px solid #ffd7dc;
    border-radius: 11px;
    font-size: 13.5px;
    line-height: 1.55;
    animation: ctShake .4s ease;
  }

  /* ---------- Success state ---------- */

  .ct-popup-success {
    min-height: 380px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .ct-popup-success-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    margin-bottom: 22px;
    border-radius: 18px;
    color: var(--ct-violet-deep);
    background: #efe7ff;
    animation: ctPop .5s var(--ct-ease) both;
  }

  .ct-popup-success-icon svg {
    width: 26px;
    height: 26px;
  }

  .ct-popup-success h3 {
    margin: 0 0 10px;
    color: var(--ct-ink);
    font-family: "Bricolage Grotesque", Inter, sans-serif;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -.03em;
  }

  .ct-popup-success p {
    margin: 0 0 26px;
    color: var(--ct-muted);
    font-size: 15px;
    line-height: 1.7;
  }

  .ct-popup-done {
    width: auto;
    min-width: 160px;
  }

  /* ---------- Keyframes ---------- */

  @keyframes ctOverlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes ctModalIn {
    from { opacity: 0; transform: translateY(22px) scale(.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes ctRise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes ctShine {
    0%, 55% { transform: translateX(0) skewX(-20deg); }
    100% { transform: translateX(520%) skewX(-20deg); }
  }

  @keyframes ctFloatA {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(70px, 60px) scale(1.15); }
  }

  @keyframes ctFloatB {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-80px, -60px) scale(1.1); }
  }

  @keyframes ctFloatC {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(50px, -40px); }
    66% { transform: translate(-40px, 30px); }
  }

  @keyframes ctGridDrift {
    from { background-position: 0 0; }
    to { background-position: 26px 26px; }
  }

  @keyframes ctRing {
    0% { transform: scale(.35); opacity: .9; }
    100% { transform: scale(1.25); opacity: 0; }
  }

  @keyframes ctPulse {
    0% { transform: scale(1); opacity: .7; }
    100% { transform: scale(3); opacity: 0; }
  }

  @keyframes ctTextShine {
    from { background-position: 0% 0; }
    to { background-position: 200% 0; }
  }

  @keyframes ctDraw {
    to { stroke-dashoffset: 0; }
  }

  @keyframes ctBarGrow {
    from { transform: scaleY(0); opacity: 0; }
    to { transform: scaleY(1); opacity: 1; }
  }

  @keyframes ctBarBreath {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(.84); }
  }

  @keyframes ctPop {
    0% { transform: scale(.4); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes ctShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  /* ---------- Short desktop screens ---------- */

  @media (min-width: 761px) and (max-height: 820px) {
    .ct-popup-overlay {
      padding: 16px;
    }

    .ct-popup-modal {
      max-height: calc(100dvh - 32px);
    }

    .ct-popup-side {
      padding: 32px 32px 22px;
    }

    .ct-popup-side h2 {
      margin-top: 16px;
      font-size: 34px;
    }

    .ct-popup-points {
      gap: 9px;
      margin-top: 20px;
    }

    .ct-popup-points li {
      padding: 9px 12px;
    }

    .ct-popup-growth {
      margin-top: 18px;
      padding: 13px 16px 12px;
    }

    .ct-popup-bars {
      height: 44px;
    }

    .ct-popup-form-area {
      padding: 30px 32px 24px;
    }

    .ct-popup-form-head {
      margin-bottom: 16px;
    }

    .ct-popup-form {
      gap: 12px;
    }
  }

  @media (min-width: 761px) and (max-height: 700px) {
    .ct-popup-side p,
    .ct-popup-side-note,
    .ct-popup-growth {
      display: none;
    }

    .ct-popup-form-head p {
      display: none;
    }

    .ct-popup-form-head {
      margin-bottom: 12px;
    }

    .ct-popup-field input,
    .ct-popup-field select {
      height: 44px;
    }

    .ct-popup-field textarea {
      min-height: 72px;
    }

    .ct-popup-overlay .ct-popup-yellow {
      min-height: 50px;
    }
  }

  /* ---------- Tablet and mobile: single column, scrolls as one card ---------- */

  @media (max-width: 760px) {
    .ct-popup-overlay {
      align-items: flex-start;
      padding: 12px;
    }

    .ct-popup-modal {
      width: 100%;
      max-height: calc(100dvh - 24px);
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto;
      overflow-y: auto;
      overscroll-behavior: contain;
      border-radius: 22px;
    }

    .ct-popup-close {
      position: sticky;
      float: right;
      top: 10px;
      right: auto;
      margin: 10px 10px -52px 0;
      width: 40px;
      height: 40px;
    }

    .ct-popup-side {
      padding: 26px 20px 24px;
    }

    .ct-popup-eyebrow {
      font-size: 11.5px;
      padding: 7px 12px;
    }

    .ct-popup-side h2 {
      max-width: 100%;
      margin: 16px 0 10px;
      padding-right: 44px;
      font-size: clamp(27px, 7.4vw, 36px);
    }

    .ct-popup-side p {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
    }

    .ct-popup-points {
      max-width: 100%;
      gap: 8px;
      margin-top: 18px;
    }

    .ct-popup-points li {
      padding: 9px 12px;
      font-size: 13.5px;
    }

    .ct-popup-check {
      width: 24px;
      height: 24px;
    }

    .ct-popup-growth {
      max-width: 100%;
      margin-top: 16px;
    }

    .ct-popup-spacer,
    .ct-popup-side-note {
      display: none;
    }

    .ct-popup-form-area {
      padding: 24px 20px 22px;
      overflow: visible;
    }

    .ct-popup-form-head {
      margin-bottom: 18px;
      padding-right: 0;
    }

    .ct-popup-form-head h3 {
      font-size: 25px;
    }

    .ct-popup-form-head p {
      font-size: 14px;
    }

    .ct-popup-form {
      gap: 14px 12px;
    }

    /* 16px stops iOS from zooming into fields */
    .ct-popup-field input,
    .ct-popup-field select,
    .ct-popup-field textarea {
      font-size: 16px;
    }

    .ct-popup-field input,
    .ct-popup-field select {
      height: 50px;
    }

    .ct-popup-overlay .ct-popup-yellow {
      min-height: 54px;
      border-radius: 14px;
    }
  }

  @media (max-width: 560px) {
    .ct-popup-form {
      grid-template-columns: minmax(0, 1fr);
    }

    .ct-popup-field.full,
    .ct-popup-submit,
    .ct-popup-privacy,
    .ct-popup-error {
      grid-column: auto;
    }

    .ct-popup-growth {
      display: none;
    }
  }

  @media (max-width: 380px) {
    .ct-popup-overlay {
      padding: 8px;
    }

    .ct-popup-modal {
      max-height: calc(100dvh - 16px);
      border-radius: 18px;
    }

    .ct-popup-side {
      padding: 22px 16px 18px;
    }

    .ct-popup-form-area {
      padding: 20px 16px 18px;
    }

    .ct-popup-side h2 {
      font-size: 26px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ct-popup-overlay,
    .ct-popup-modal,
    .ct-popup-orb,
    .ct-popup-grid,
    .ct-popup-rings i,
    .ct-popup-dot::after,
    .ct-popup-side h2 span,
    .ct-popup-bars span,
    .ct-popup-overlay .ct-popup-yellow::after {
      animation: none;
    }

    .ct-popup-rise {
      opacity: 1;
      animation: none;
    }

    .ct-popup-check path {
      stroke-dashoffset: 0;
      animation: none;
    }

    .ct-popup-close,
    .ct-popup-points li,
    .ct-popup-overlay .ct-popup-yellow > span {
      transition: none;
    }
  }

  /* Hover effects only on mouse devices */

  @media (hover: hover) and (pointer: fine) {
    .ct-popup-overlay .ct-popup-yellow {
      transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
    }

    .ct-popup-overlay .ct-popup-yellow:hover:not(:disabled) {
      transform: translateY(-3px);
      filter: brightness(1.04) saturate(1.05);
      box-shadow:
        inset 0 1px 0 #fff8c4,
        0 8px 0 #d18f0a,
        0 24px 38px -12px #f5b323c0;
    }

    .ct-popup-overlay .ct-popup-yellow:hover > span {
      transform: translateX(3px);
    }
  }
`

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const openPopup = () => {
      setSent(false)
      setSubmitError('')
      setIsOpen(true)
    }

    window.addEventListener('open-contact-popup', openPopup)

    return () => {
      window.removeEventListener('open-contact-popup', openPopup)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const updateField = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    // Connect your real form API here before enabling success.
    setSubmitError(
      'The contact form is not connected yet. Please connect your form API to receive enquiries.'
    )
  }

  const closePopup = () => {
    if (isSubmitting) return
    setIsOpen(false)
  }

  return (
    <div className="ct-popup-root">
      <style>{css}</style>

      {isOpen &&
        createPortal(
          <div
            className="ct-popup-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closePopup()
              }
            }}
          >
            <div
              className="ct-popup-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ct-popup-title"
              aria-describedby="ct-popup-description"
            >
              <button
                className="ct-popup-close"
                type="button"
                onClick={closePopup}
                aria-label="Close contact form"
              >
                <CloseIcon />
              </button>

              <aside className="ct-popup-side">
                {/* Moving background */}
                <div className="ct-popup-bg" aria-hidden="true">
                  <span className="ct-popup-orb o1" />
                  <span className="ct-popup-orb o2" />
                  <span className="ct-popup-orb o3" />
                  <span className="ct-popup-grid" />
                  <span className="ct-popup-rings">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>

                <div
                  className="ct-popup-eyebrow ct-popup-rise"
                  style={{ '--d': 0 }}
                >
                  <span className="ct-popup-dot" />
                  Let&rsquo;s grow together
                </div>

                <h2 className="ct-popup-rise" style={{ '--d': 1 }}>
                  Turn More Clicks Into <span>Customers.</span>
                </h2>

                <p
                  id="ct-popup-description"
                  className="ct-popup-rise"
                  style={{ '--d': 2 }}
                >
                  Tell us about your business. Let&rsquo;s build a smarter
                  growth system that turns more leads into paying customers.
                </p>

                <ul className="ct-popup-points">
                  {points.map((point, index) => (
                    <li
                      key={point}
                      className="ct-popup-rise"
                      style={{ '--d': 3 + index }}
                    >
                      <span className="ct-popup-check">
                        <CheckIcon />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="ct-popup-growth ct-popup-rise"
                  style={{ '--d': 6 }}
                  aria-hidden="true"
                >
                  <div className="ct-popup-growth-head">
                    <span>Your growth, step by step</span>
                    <span className="ct-popup-growth-tag">
                      <TrendIcon />
                      Rising
                    </span>
                  </div>

                  <div className="ct-popup-bars">
                    {bars.map((height, index) => (
                      <span
                        key={index}
                        style={{ '--h': `${height}%`, '--i': index }}
                      />
                    ))}
                  </div>
                </div>

                <div className="ct-popup-spacer" />

                <div className="ct-popup-side-note">
                  Creative Crew &mdash; growth, built around your business.
                </div>
              </aside>

              <div className="ct-popup-form-area">
                {sent ? (
                  <div className="ct-popup-success" aria-live="polite">
                    <div className="ct-popup-success-icon">
                      <CheckIcon />
                    </div>

                    <h3>Thank you!</h3>

                    <p>
                      Your enquiry has been submitted successfully. Our team
                      will get back to you soon.
                    </p>

                    <button
                      className="ct-popup-yellow ct-popup-done"
                      type="button"
                      onClick={closePopup}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="ct-popup-form-head">
                      <small>Get in touch</small>
                      <h3 id="ct-popup-title">Let&rsquo;s talk growth.</h3>
                      <p>
                        Share a few details and tell us what you&rsquo;d like
                        to achieve.
                      </p>
                    </div>

                    <form
                      className="ct-popup-form"
                      onSubmit={handleSubmit}
                    >
                      <div className="ct-popup-field">
                        <label htmlFor="ct-full-name">Full Name *</label>
                        <input
                          id="ct-full-name"
                          name="fullName"
                          value={form.fullName}
                          onChange={updateField}
                          placeholder="Your full name"
                          autoComplete="name"
                          required
                        />
                      </div>

                      <div className="ct-popup-field">
                        <label htmlFor="ct-business-name">
                          Business / Brand *
                        </label>
                        <input
                          id="ct-business-name"
                          name="businessName"
                          value={form.businessName}
                          onChange={updateField}
                          placeholder="Your business name"
                          autoComplete="organization"
                          required
                        />
                      </div>

                      <div className="ct-popup-field">
                        <label htmlFor="ct-email">Email Address *</label>
                        <input
                          id="ct-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={updateField}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                        />
                      </div>

                      <div className="ct-popup-field">
                        <label htmlFor="ct-phone">Phone / WhatsApp *</label>
                        <input
                          id="ct-phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={updateField}
                          placeholder="Your contact number"
                          autoComplete="tel"
                          required
                        />
                      </div>

                      <div className="ct-popup-field">
                        <label htmlFor="ct-business-type">
                          Business Type *
                        </label>

                        <select
                          id="ct-business-type"
                          name="businessType"
                          value={form.businessType}
                          onChange={updateField}
                          required
                        >
                          <option value="">Select business type</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Agency">Agency</option>
                          <option value="Coaching">Coaching</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Local Business">
                            Local Business
                          </option>
                          <option value="SaaS / Technology">
                            SaaS / Technology
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="ct-popup-field">
                        <label htmlFor="ct-website">
                          Website <span>(Optional)</span>
                        </label>

                        <input
                          id="ct-website"
                          name="website"
                          type="url"
                          value={form.website}
                          onChange={updateField}
                          placeholder="https://yourwebsite.com"
                          autoComplete="url"
                        />
                      </div>

                      <div className="ct-popup-field full">
                        <label htmlFor="ct-goal">Your Main Goal *</label>

                        <textarea
                          id="ct-goal"
                          name="goal"
                          value={form.goal}
                          onChange={updateField}
                          placeholder="Tell us about your goals, challenges, or what you want to improve..."
                          required
                        />
                      </div>

                      {submitError && (
                        <p className="ct-popup-error" role="alert">
                          {submitError}
                        </p>
                      )}

                      <button
                        className="ct-popup-yellow ct-popup-submit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? 'Please wait...'
                          : "Yes! Let's Grow My Revenue"}

                        {!isSubmitting && (
                          <span aria-hidden="true">&rarr;</span>
                        )}
                      </button>

                      <p className="ct-popup-privacy">
                        Your information will be used to respond to your
                        enquiry.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}