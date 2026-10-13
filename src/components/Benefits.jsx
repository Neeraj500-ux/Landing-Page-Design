import { benefits } from '../data'
import { Container, Reveal } from './ui'

/* ----------------------------------------------------------------
   Icons — same set, cleaner stroke tuning
----------------------------------------------------------------- */
function BenefitIcon({ index }) {
  const icons = [
    <>
      <path d="M4 19V5m0 14h16" />
      <path d="m7 14 4-4 4 2 5-7" />
      <path d="M16 5h4v4" />
    </>,
    <>
      <circle cx="10" cy="8" r="3" />
      <path d="M3 20v-2a7 7 0 0 1 12-4" />
      <path d="m16 18 2 2 4-5" />
    </>,
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="m9 12 2 2 4-4" />
    </>,
    <>
      <path d="m12 3 8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>,
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0Z" />
      <path d="M7 11h10M7 15h6" />
    </>,
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>,
  ]

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[index % icons.length]}
    </svg>
  )
}

/* ----------------------------------------------------------------
   Decorative backdrop — aurora orbs + grain + sparkle dots
----------------------------------------------------------------- */
function BenefitsBackdrop() {
  const dots = Array.from({ length: 18 })

  return (
    <div className="pv-benefits__backdrop" aria-hidden="true">
      <span className="pv-benefits__orb pv-benefits__orb--1" />
      <span className="pv-benefits__orb pv-benefits__orb--2" />
      <span className="pv-benefits__orb pv-benefits__orb--3" />
      <span className="pv-benefits__grain" />
      <div className="pv-benefits__dots">
        {dots.map((_, i) => (
          <span
            key={i}
            className="pv-benefits__dot"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31) % 100}%`,
              animationDelay: `${(i % 6) * 1.1}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Main component
----------------------------------------------------------------- */
export default function Benefits() {
  return (
    <section
      className="pv-benefits"
      aria-label="Benefits of a focused landing page"
    >
      <style>{styles}</style>

      <BenefitsBackdrop />

      <Container className="pv-benefits__container">
        {/* ------------------ Header ------------------ */}
        <div className="pv-benefits__header">
          <Reveal>
            <div className="pv-benefits__eyebrow">
              <span className="pv-benefits__eyebrow-line" aria-hidden="true" />
              <span className="pv-benefits__eyebrow-text">
                Why it matters
              </span>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="pv-benefits__title-heading">
              Give More of Your Visitors a Reason to{' '}
              <span className="pv-benefits__title-accent">Take the Next Step.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="pv-benefits__lead">
              A focused landing page helps connect the promise that brought
              someone to you with the information they need before enquiring.
            </p>
          </Reveal>
        </div>

        {/* ------------------ Grid ------------------ */}
        <div className="pv-benefits__grid">
          {benefits.map(([title, description], index) => (
            <Reveal
              key={title}
              delay={(index % 3) * 70}
              className="pv-benefits__reveal"
            >
              <article
                className="pv-benefits__card"
                style={{ '--card-index': index }}
              >
                {/* Gradient ring on hover */}
                <span className="pv-benefits__card-ring" aria-hidden="true" />

                {/* Diagonal shine sweep */}
                <span className="pv-benefits__card-shine" aria-hidden="true" />

                <div className="pv-benefits__card-top">
                  <span className="pv-benefits__icon">
                    <BenefitIcon index={index} />
                  </span>

                  <span className="pv-benefits__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="pv-benefits__title">{title}</h3>

                <p className="pv-benefits__description">{description}</p>

                <div className="pv-benefits__card-footer" aria-hidden="true">
                  <span className="pv-benefits__accent-line" />
                  <span className="pv-benefits__footer-dot" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ------------------ Note ------------------ */}
        <Reveal>
          <div className="pv-benefits__note">
            <span className="pv-benefits__note-icon" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>

            <p>
              Results depend on your offer, traffic quality, audience and sales
              follow-up. A landing page is one important part of that journey.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ----------------------------------------------------------------
   Styles
----------------------------------------------------------------- */
const styles = `
  /* ============================================================
     ROOT
  ============================================================ */
  .pv-benefits {
    --pv-ink: #26103d;
    --pv-body: #5a4a70;
    --pv-note: #75658a;
    --pv-violet: #5b2f8f;
    --pv-violet-deep: #2b1245;
    --pv-violet-mid: #4b266a;
    --pv-violet-soft: #b78bdd;
    --pv-line: #e8dff4;
    --pv-tint: #f5effc;
    --pv-ease: cubic-bezier(.22, 1, .36, 1);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-block: clamp(64px, 9vw, 128px);
    overflow: hidden;
    color: var(--pv-ink);
    background:
      radial-gradient(
        ellipse 70% 40% at 50% 0%,
        rgba(183, 139, 221, .14) 0%,
        rgba(183, 139, 221, 0) 70%
      ),
      linear-gradient(180deg, #ffffff 0%, #faf7fe 50%, #f3ecfa 100%);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .pv-benefits,
  .pv-benefits *,
  .pv-benefits *::before,
  .pv-benefits *::after {
    box-sizing: border-box;
  }

  .pv-benefits .pv-benefits__container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(20px, 4.5vw, 48px);
  }

  /* ============================================================
     BACKDROP
  ============================================================ */
  .pv-benefits__backdrop {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .pv-benefits__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: .55;
    will-change: transform;
  }
  .pv-benefits__orb--1 {
    width: 480px; height: 480px;
    top: -140px; left: -140px;
    background: radial-gradient(circle, #c6a6ff 0%, transparent 70%);
    animation: pvOrbFloat1 18s ease-in-out infinite;
  }
  .pv-benefits__orb--2 {
    width: 540px; height: 540px;
    top: 30%; right: -200px;
    background: radial-gradient(circle, #ffd6b8 0%, transparent 70%);
    animation: pvOrbFloat2 22s ease-in-out infinite;
  }
  .pv-benefits__orb--3 {
    width: 420px; height: 420px;
    bottom: -160px; left: 30%;
    background: radial-gradient(circle, #b78bdd 0%, transparent 70%);
    animation: pvOrbFloat3 20s ease-in-out infinite;
  }

  @keyframes pvOrbFloat1 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(70px, 50px) scale(1.1); }
  }
  @keyframes pvOrbFloat2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(-60px, 70px) scale(1.08); }
  }
  @keyframes pvOrbFloat3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(50px, -60px) scale(1.12); }
  }

  /* Soft grain overlay */
  .pv-benefits__grain {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(rgba(91, 47, 143, .04) 1px, transparent 1px);
    background-size: 22px 22px;
    opacity: .6;
    mix-blend-mode: multiply;
  }

  /* Floating dots */
  .pv-benefits__dots {
    position: absolute;
    inset: 0;
  }
  .pv-benefits__dot {
    position: absolute;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #b794e0;
    box-shadow: 0 0 8px 2px rgba(183, 148, 224, .5);
    opacity: 0;
    animation: pvDotFloat 8s linear infinite;
  }
  .pv-benefits__dot:nth-child(3n) {
    background: #f0b27a;
    box-shadow: 0 0 8px 2px rgba(240, 178, 122, .5);
  }
  @keyframes pvDotFloat {
    0%   { opacity: 0; transform: translateY(0) scale(.6); }
    20%  { opacity: .85; }
    80%  { opacity: .5; }
    100% { opacity: 0; transform: translateY(-150px) scale(1); }
  }

  /* ============================================================
     HEADER
  ============================================================ */
  .pv-benefits__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: clamp(16px, 2.2vw, 22px);
    min-width: 0;
  }
  .pv-benefits__header > * { min-width: 0; }

  /* Eyebrow */
  .pv-benefits__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .pv-benefits__eyebrow-line {
    display: inline-block;
    width: 28px; height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--pv-violet), var(--pv-violet-soft));
  }
  .pv-benefits__eyebrow-text {
    color: var(--pv-violet);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .pv-benefits .pv-benefits__title-heading {
    width: 100%;
    max-width: 17em;
    margin: 0;
    color: var(--pv-ink);
    font-size: clamp(28px, 4.2vw, 48px);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -.032em;
    text-wrap: balance;
    overflow-wrap: break-word;
    hyphens: manual;
  }
  .pv-benefits__title-accent {
    background: linear-gradient(120deg, var(--pv-violet) 0%, var(--pv-violet-soft) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .pv-benefits .pv-benefits__lead {
    width: 100%;
    max-width: 34em;
    margin: 0;
    color: var(--pv-body);
    font-size: clamp(16px, 1.45vw, 18px);
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: -.005em;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  /* ============================================================
     GRID
  ============================================================ */
  .pv-benefits__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(14px, 1.6vw, 20px);
    min-width: 0;
    margin-top: clamp(36px, 5.5vw, 72px);
  }

  .pv-benefits__reveal {
    display: flex;
    min-width: 0;
    height: 100%;
  }

  /* --------- CARD --------- */
  .pv-benefits__card {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: clamp(24px, 2.8vw, 34px);
    overflow: hidden;
    border: 1px solid var(--pv-line);
    border-radius: clamp(18px, 2vw, 24px);
    background:
      linear-gradient(180deg, #ffffff 0%, #fdfbff 100%);
    box-shadow:
      0 1px 2px rgba(43, 18, 69, .05),
      0 12px 24px -12px rgba(43, 18, 69, .10),
      0 40px 80px -40px rgba(43, 18, 69, .22);
    transition:
      transform .5s var(--pv-ease),
      border-color .5s var(--pv-ease),
      box-shadow .5s var(--pv-ease);
  }

  /* Dark violet panel fades in on hover */
  .pv-benefits__card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(183, 139, 221, .28) 0%,
        rgba(183, 139, 221, 0) 55%
      ),
      linear-gradient(145deg, var(--pv-violet-deep) 0%, var(--pv-violet-mid) 100%);
    opacity: 0;
    transition: opacity .5s var(--pv-ease);
    pointer-events: none;
  }

  /* Gradient ring around card on hover */
  .pv-benefits__card-ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(183, 139, 221, 0) 0%,
      rgba(183, 139, 221, .7) 50%,
      rgba(183, 139, 221, 0) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity .5s var(--pv-ease);
    pointer-events: none;
  }

  /* Diagonal shine sweep */
  .pv-benefits__card-shine {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      transparent 30%,
      rgba(255, 255, 255, .55) 50%,
      transparent 70%
    );
    transform: translateX(-140%);
    transition: transform .95s var(--pv-ease);
  }

  .pv-benefits__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-width: 0;
    margin-bottom: clamp(24px, 3vw, 36px);
  }

  .pv-benefits__icon {
    display: grid;
    flex: 0 0 52px;
    place-items: center;
    width: 52px;
    height: 52px;
    border: 1px solid var(--pv-line);
    border-radius: 16px;
    color: var(--pv-violet);
    background: linear-gradient(145deg, #faf6ff 0%, var(--pv-tint) 100%);
    box-shadow:
      0 1px 2px rgba(43, 18, 69, .06),
      inset 0 1px 0 #fff;
    transition:
      color .5s var(--pv-ease),
      background .5s var(--pv-ease),
      border-color .5s var(--pv-ease),
      box-shadow .5s var(--pv-ease),
      transform .5s var(--pv-ease);
  }

  .pv-benefits__icon svg {
    display: block;
    width: 24px;
    height: 24px;
  }

  .pv-benefits__number {
    flex: 0 0 auto;
    color: #cbb8e2;
    font-size: clamp(26px, 2.6vw, 32px);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -.02em;
    font-variant-numeric: tabular-nums;
    transition: color .5s var(--pv-ease);
  }

  .pv-benefits .pv-benefits__title {
    margin: 0;
    color: var(--pv-ink);
    font-size: clamp(18px, 1.7vw, 21px);
    font-weight: 650;
    line-height: 1.3;
    letter-spacing: -.018em;
    text-wrap: balance;
    overflow-wrap: break-word;
    transition: color .5s var(--pv-ease);
  }

  .pv-benefits .pv-benefits__description {
    max-width: 38em;
    margin: 12px 0 0;
    color: var(--pv-body);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    text-wrap: pretty;
    overflow-wrap: break-word;
    transition: color .5s var(--pv-ease);
  }

  .pv-benefits__card-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    padding-top: clamp(22px, 2.6vw, 32px);
  }

  .pv-benefits__accent-line {
    display: block;
    width: 32px;
    max-width: 100%;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--pv-violet), var(--pv-violet-soft));
    transition: width .5s var(--pv-ease), background .5s var(--pv-ease);
  }

  .pv-benefits__footer-dot {
    display: block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--pv-violet-soft);
    opacity: .6;
    transition: background .5s var(--pv-ease), opacity .5s var(--pv-ease);
  }

  /* ============================================================
     NOTE
  ============================================================ */
  .pv-benefits__note {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    max-width: 44rem;
    min-width: 0;
    margin: clamp(28px, 3.4vw, 40px) 0 0;
    padding: 14px 18px;
    border: 1px solid var(--pv-line);
    border-radius: 16px;
    background: linear-gradient(145deg, #ffffff 0%, #faf6ff 100%);
    box-shadow:
      0 1px 2px rgba(43, 18, 69, .05),
      0 16px 32px -24px rgba(43, 18, 69, .18);
  }

  .pv-benefits__note-icon {
    display: grid;
    flex: 0 0 26px;
    place-items: center;
    width: 26px;
    height: 26px;
    margin-top: 1px;
    border-radius: 50%;
    color: #fff;
    background: linear-gradient(145deg, var(--pv-violet) 0%, var(--pv-violet-soft) 100%);
    box-shadow: 0 4px 10px -4px rgba(91, 47, 143, .5);
  }
  .pv-benefits__note-icon svg {
    display: block;
  }

  .pv-benefits .pv-benefits__note p {
    min-width: 0;
    margin: 0;
    color: var(--pv-note);
    font-size: 14px;
    line-height: 1.7;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  /* ============================================================
     BREAKPOINTS
  ============================================================ */
  @media (min-width: 680px) {
    .pv-benefits__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 960px) {
    .pv-benefits__header {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
      align-items: end;
      column-gap: clamp(48px, 7vw, 104px);
    }
    .pv-benefits .pv-benefits__lead {
      padding-bottom: 6px;
    }
    .pv-benefits__eyebrow {
      grid-column: 1 / -1;
      margin-bottom: clamp(4px, 1vw, 10px);
    }
  }

  @media (min-width: 1080px) {
    .pv-benefits__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 359px) {
    .pv-benefits .pv-benefits__container {
      padding-inline: 16px;
    }
    .pv-benefits .pv-benefits__title-heading {
      font-size: 26px;
    }
    .pv-benefits__card {
      padding: 22px 20px;
    }
    .pv-benefits__note {
      padding: 12px 14px;
    }
  }

  /* ============================================================
     HOVER (only on capable devices)
  ============================================================ */
  @media (hover: hover) and (pointer: fine) {
    .pv-benefits__card:hover {
      transform: translateY(-6px);
      border-color: rgba(183, 139, 221, .55);
      box-shadow:
        0 1px 2px rgba(43, 18, 69, .05),
        0 24px 44px -20px rgba(43, 18, 69, .22),
        0 60px 100px -50px rgba(43, 18, 69, .40);
    }

    .pv-benefits__card:hover::before {
      opacity: 1;
    }

    .pv-benefits__card:hover .pv-benefits__card-ring {
      opacity: 1;
    }

    .pv-benefits__card:hover .pv-benefits__card-shine {
      transform: translateX(140%);
    }

    .pv-benefits__card:hover .pv-benefits__icon {
      color: #ecdcff;
      background: rgba(255, 255, 255, .08);
      border-color: rgba(255, 255, 255, .2);
      box-shadow: none;
      transform: translateY(-3px) rotate(-4deg);
    }

    .pv-benefits__card:hover .pv-benefits__number {
      color: rgba(255, 255, 255, .35);
    }

    .pv-benefits__card:hover .pv-benefits__title {
      color: #fff;
    }

    .pv-benefits__card:hover .pv-benefits__description {
      color: #dccdee;
    }

    .pv-benefits__card:hover .pv-benefits__accent-line {
      width: 56px;
      background: linear-gradient(90deg, #ecdcff, #ffffff);
    }

    .pv-benefits__card:hover .pv-benefits__footer-dot {
      background: #fff;
      opacity: .9;
    }
  }

  /* ============================================================
     REDUCED MOTION
  ============================================================ */
  @media (prefers-reduced-motion: reduce) {
    .pv-benefits *,
    .pv-benefits *::before,
    .pv-benefits *::after {
      animation: none !important;
      transition: none !important;
    }

    .pv-benefits__orb,
    .pv-benefits__dot {
      animation: none !important;
      opacity: .25;
    }
    .pv-benefits__dot { display: none; }

    .pv-benefits__reveal {
      opacity: 1 !important;
      transform: none !important;
    }

    .pv-benefits__card:hover,
    .pv-benefits__card:hover .pv-benefits__icon {
      transform: none !important;
    }

    .pv-benefits__card-shine { display: none; }
  }
`