import { benefits } from '../data'
import { Container, Reveal, SectionHead } from './ui'

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
      width="26"
      height="26"
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

const styles = `
  .glass-benefits {
    --benefit-ink: #fff;
    --benefit-muted: #e1d4ed;
    --benefit-gold: #f2cb85;
    --benefit-ease: cubic-bezier(.22, 1, .36, 1);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-block: clamp(52px, 8vw, 108px);
    color: var(--benefit-ink);
    background: linear-gradient(
      125deg,
      #2B1245 0%,
      #4B266A 52%,
      #5B2F8F 100%
    );
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .glass-benefits,
  .glass-benefits *,
  .glass-benefits *::before,
  .glass-benefits *::after {
    box-sizing: border-box;
  }

  /* Decoration is clipped independently, keeping text and shadows free. */

  .glass-benefits__ambient {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    border-radius: inherit;
    background:
      radial-gradient(ellipse at 50% 0%, #b78bdd20, transparent 55%),
      radial-gradient(ellipse at 95% 90%, #9e6bd326, transparent 52%);
  }

  .glass-benefits__ambient::before {
    content: "";
    position: absolute;
    width: min(70vw, 700px);
    aspect-ratio: 1;
    top: 8%;
    left: -20%;
    border-radius: 50%;
    background: #b17adb;
    filter: blur(90px);
    opacity: .18;
  }

  .glass-benefits__ambient::after {
    content: "";
    position: absolute;
    width: min(60vw, 560px);
    aspect-ratio: 1;
    right: -16%;
    bottom: 2%;
    border-radius: 50%;
    background: #e3b577;
    filter: blur(100px);
    opacity: .1;
  }

  .glass-benefits__grid-pattern {
    position: absolute;
    inset: 0;
    opacity: .2;
    background-image:
      linear-gradient(#ffffff12 1px, transparent 1px),
      linear-gradient(90deg, #ffffff12 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: linear-gradient(#000, transparent 78%);
    mask-image: linear-gradient(#000, transparent 78%);
  }

  .glass-benefits .glass-benefits__container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 40px);
  }

  .glass-benefits__header {
    width: 100%;
    max-width: 820px;
    min-width: 0;
    margin-inline: auto;
    text-align: center;
  }

  .glass-benefits__header::before {
    content: "";
    display: block;
    width: 62px;
    height: 5px;
    margin: 0 auto 24px;
    border: 1px solid #ffeac440;
    border-radius: 999px;
    background: linear-gradient(90deg, #bd8bca, #f2cb85);
    box-shadow:
      0 0 25px #edc28b28,
      inset 0 1px 0 #ffffff45;
  }

  .glass-benefits .glass-benefits__header h2 {
    max-width: 24ch;
    margin-inline: auto;
    color: #fff;
    font-size: clamp(29px, 4.2vw, 48px);
    font-weight: 800;
    line-height: 1.17;
    letter-spacing: -.04em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .glass-benefits .glass-benefits__header p {
    max-width: 64ch;
    margin: 20px auto 0;
    color: var(--benefit-muted);
    font-size: clamp(15px, 1.65vw, 17px);
    line-height: 1.8;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  /* Individual glass panels replace the previous joined grid. */

  .glass-benefits__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    gap: clamp(16px, 2vw, 24px);
    min-width: 0;
    margin-top: clamp(32px, 5vw, 58px);
  }

  .glass-benefits__reveal {
    display: flex;
    min-width: 0;
    height: 100%;
  }

  .glass-benefits__card {
    --card-accent: #e2c3ff;
    --card-glow: #c89bff18;

    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: clamp(23px, 2.8vw, 32px);
    border: 1px solid #ffffff26;
    border-top-color: #ffffff47;
    border-radius: 26px;
    background:
      radial-gradient(
        ellipse at 100% 0%,
        var(--card-glow),
        transparent 75%
      ),
      linear-gradient(145deg, #ffffff13, #ffffff06),
      #3d205dd9;
    box-shadow:
      inset 0 1px 0 #ffffff16,
      inset 0 -1px 0 #ffffff05,
      0 8px 16px -12px #16082380,
      0 24px 42px -30px #160823c0;
    transition:
      transform .45s var(--benefit-ease),
      border-color .45s ease,
      box-shadow .45s ease;
  }

  @supports ((backdrop-filter: blur(1px)) or
             (-webkit-backdrop-filter: blur(1px))) {
    .glass-benefits__card {
      background:
        radial-gradient(
          ellipse at 100% 0%,
          var(--card-glow),
          transparent 75%
        ),
        linear-gradient(145deg, #ffffff15, #ffffff06),
        #34174f45;
      -webkit-backdrop-filter: blur(22px) saturate(125%);
      backdrop-filter: blur(22px) saturate(125%);
    }
  }

  .glass-benefits__card--1,
  .glass-benefits__card--4 {
    --card-accent: #f2cb85;
    --card-glow: #f2cb8514;
  }

  .glass-benefits__card--2,
  .glass-benefits__card--5 {
    --card-accent: #f3d7d0;
    --card-glow: #efb7bd14;
  }

  .glass-benefits__card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 18%;
    right: 18%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      #ffffff70,
      transparent
    );
    pointer-events: none;
  }

  .glass-benefits__card::after {
    content: "";
    position: absolute;
    inset: 6px;
    z-index: -1;
    border: 1px solid #ffffff05;
    border-radius: 20px;
    pointer-events: none;
  }

  .glass-benefits__card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    min-width: 0;
    margin-bottom: 26px;
  }

  /* Translucent icon tiles with a subtle raised edge. */

  .glass-benefits__icon {
    position: relative;
    display: grid;
    flex: 0 0 56px;
    place-items: center;
    width: 56px;
    height: 56px;
    border: 1px solid #ffffff30;
    border-top-color: #ffffff60;
    border-radius: 18px;
    color: var(--card-accent);
    background:
      radial-gradient(ellipse at 20% 0%, #ffffff20, transparent 75%),
      linear-gradient(145deg, #ffffff15, #ffffff06);
    box-shadow:
      inset 0 1px 0 #ffffff25,
      inset 0 -2px 5px #200e3618,
      0 4px 0 -1px #22103665,
      0 12px 18px -13px #160823cc;
    transition: transform .45s var(--benefit-ease);
  }

  .glass-benefits__icon::before {
    content: "";
    position: absolute;
    inset: 4px;
    border: 1px solid #ffffff10;
    border-radius: 13px;
    pointer-events: none;
  }

  .glass-benefits__icon svg {
    display: block;
    width: 26px;
    height: 26px;
    filter: drop-shadow(0 2px 4px #170c3020);
  }

  .glass-benefits__number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    min-width: 34px;
    min-height: 28px;
    padding: 4px 8px;
    border: 1px solid #ffffff15;
    border-radius: 10px;
    color: #ddc9ec;
    background: #ffffff05;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: .06em;
    font-variant-numeric: tabular-nums;
  }

  .glass-benefits .glass-benefits__title {
    margin: 0;
    color: #fff;
    font-size: clamp(20px, 2vw, 23px);
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -.025em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .glass-benefits .glass-benefits__description {
    margin: 15px 0 0;
    color: var(--benefit-muted);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  .glass-benefits__card-footer {
    margin-top: auto;
    padding-top: 26px;
  }

  .glass-benefits__accent-line {
    display: block;
    width: 40px;
    max-width: 100%;
    height: 3px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--card-accent),
      #ffffff15
    );
    opacity: .8;
    transform-origin: left;
    transition:
      transform .45s var(--benefit-ease),
      opacity .45s ease;
  }

  /* Original results note retained in a quieter glass panel. */

  .glass-benefits__note {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    max-width: 800px;
    min-width: 0;
    margin: clamp(26px, 3vw, 36px) auto 0;
    padding: 18px 20px;
    border: 1px solid #ffffff16;
    border-radius: 18px;
    background: linear-gradient(110deg, #ffffff08, #ffffff03);
    box-shadow: inset 0 1px 0 #ffffff08;
  }

  .glass-benefits__note-icon {
    display: grid;
    flex: 0 0 21px;
    place-items: center;
    width: 21px;
    height: 21px;
    margin-top: 2px;
    border: 1px solid #e1ccee45;
    border-radius: 50%;
    color: #e1ccee;
    font-family: Georgia, serif;
    font-size: 13px;
    font-style: italic;
    line-height: 1;
  }

  .glass-benefits .glass-benefits__note p {
    min-width: 0;
    margin: 0;
    color: #cbbbd8;
    font-size: 13px;
    line-height: 1.8;
    text-align: left;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  @media (min-width: 680px) {
    .glass-benefits__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1080px) {
    .glass-benefits__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 679px) {
    .glass-benefits__header::before {
      margin-bottom: 20px;
    }

    .glass-benefits__card {
      border-radius: 23px;
    }

    .glass-benefits__card-top {
      margin-bottom: 23px;
    }

    .glass-benefits__icon {
      flex-basis: 50px;
      width: 50px;
      height: 50px;
      border-radius: 16px;
    }

    .glass-benefits__icon svg {
      width: 24px;
      height: 24px;
    }

    .glass-benefits__note {
      padding: 16px;
    }
  }

  @media (max-width: 359px) {
    .glass-benefits .glass-benefits__container {
      padding-inline: 14px;
    }

    .glass-benefits .glass-benefits__header h2 {
      font-size: 27px;
    }

    .glass-benefits__card {
      padding: 22px 19px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .glass-benefits__card:hover {
      transform: translateY(-5px);
      border-color: #ffffff42;
      box-shadow:
        inset 0 1px 0 #ffffff25,
        inset 0 -1px 0 #ffffff08,
        0 10px 20px -13px #16082385,
        0 30px 50px -28px #160823d0;
    }

    .glass-benefits__card:hover .glass-benefits__icon {
      transform: translateY(-2px) rotate(-4deg);
    }

    .glass-benefits__card:hover .glass-benefits__accent-line {
      transform: scaleX(1.4);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glass-benefits *,
    .glass-benefits *::before,
    .glass-benefits *::after {
      animation: none !important;
      transition: none !important;
    }

    .glass-benefits__reveal {
      opacity: 1 !important;
      transform: none !important;
    }

    .glass-benefits__card:hover,
    .glass-benefits__card:hover .glass-benefits__icon,
    .glass-benefits__card:hover .glass-benefits__accent-line {
      transform: none;
    }
  }
`

export default function Benefits() {
  return (
    <section
      className="glass-benefits"
      aria-label="Benefits of a focused landing page"
    >
      <style>{styles}</style>

      <div className="glass-benefits__ambient" aria-hidden="true">
        <div className="glass-benefits__grid-pattern" />
      </div>

      <Container className="glass-benefits__container">
        <div className="glass-benefits__header">
          <SectionHead
            light
            title="Give More of Your Visitors a Reason to Take the Next Step."
            text="A focused landing page helps connect the promise that brought someone to you with the information they need before enquiring."
          />
        </div>

        <div className="glass-benefits__grid">
          {benefits.map(([title, description], index) => (
            <Reveal
              key={title}
              delay={(index % 3) * 70}
              className="glass-benefits__reveal"
            >
              <article
                className={`glass-benefits__card glass-benefits__card--${index}`}
              >
                <div className="glass-benefits__card-top">
                  <span className="glass-benefits__icon">
                    <BenefitIcon index={index} />
                  </span>

                  <span
                    className="glass-benefits__number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="glass-benefits__title">
                  {title}
                </h3>

                <p className="glass-benefits__description">
                  {description}
                </p>

                <div
                  className="glass-benefits__card-footer"
                  aria-hidden="true"
                >
                  <span className="glass-benefits__accent-line" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="glass-benefits__note">
          <span
            className="glass-benefits__note-icon"
            aria-hidden="true"
          >
            i
          </span>

          <p>
            Results depend on your offer, traffic quality, audience and
            sales follow-up. A landing page is one important part of that
            journey.
          </p>
        </div>
      </Container>
    </section>
  )
}