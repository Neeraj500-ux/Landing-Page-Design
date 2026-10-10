import { benefits } from '../data'
import { Container, Reveal } from './ui'

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

const styles = `
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
    width: 100%;
    max-width: 1200px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(20px, 4.5vw, 48px);
  }

  /* ---------- Header ---------- */

  .pv-benefits__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: clamp(16px, 2.2vw, 22px);
    min-width: 0;
  }

  .pv-benefits__header > * {
    min-width: 0;
  }

  .pv-benefits .pv-benefits__header h2 {
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

  .pv-benefits .pv-benefits__header p {
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

  /* ---------- Joined grid (hairline dividers) ---------- */

  .pv-benefits__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1px;
    min-width: 0;
    margin-top: clamp(36px, 5.5vw, 72px);
    overflow: hidden;
    border: 1px solid var(--pv-line);
    border-radius: clamp(20px, 2.4vw, 28px);
    background: var(--pv-line);
    box-shadow:
      0 1px 2px rgba(43, 18, 69, .05),
      0 12px 24px -12px rgba(43, 18, 69, .10),
      0 40px 80px -40px rgba(43, 18, 69, .30);
  }

  .pv-benefits__reveal {
    display: flex;
    min-width: 0;
    height: 100%;
  }

  .pv-benefits__card {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: clamp(24px, 2.8vw, 40px);
    background: linear-gradient(180deg, #ffffff 0%, #fdfbff 100%);
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

  .pv-benefits__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-width: 0;
    margin-bottom: clamp(24px, 3vw, 40px);
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
    box-shadow: 0 1px 2px rgba(43, 18, 69, .06);
    transition:
      color .5s var(--pv-ease),
      background .5s var(--pv-ease),
      border-color .5s var(--pv-ease),
      box-shadow .5s var(--pv-ease);
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
    margin-top: auto;
    padding-top: clamp(24px, 2.8vw, 34px);
  }

  .pv-benefits__accent-line {
    display: block;
    width: 32px;
    max-width: 100%;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--pv-violet), var(--pv-violet-soft));
    transition: width .5s var(--pv-ease);
  }

  /* ---------- Note ---------- */

  .pv-benefits__note {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    max-width: 44rem;
    min-width: 0;
    margin: clamp(24px, 3.2vw, 36px) 0 0;
  }

  .pv-benefits__note-icon {
    display: grid;
    flex: 0 0 22px;
    place-items: center;
    width: 22px;
    height: 22px;
    margin-top: 1px;
    border: 1px solid #d6c4ea;
    border-radius: 50%;
    color: var(--pv-violet);
    background: #fff;
    font-family: Georgia, serif;
    font-size: 13px;
    font-style: italic;
    line-height: 1;
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

  /* ---------- Breakpoints ---------- */

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

    .pv-benefits .pv-benefits__header p {
      padding-bottom: 6px;
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

    .pv-benefits .pv-benefits__header h2 {
      font-size: 26px;
    }

    .pv-benefits__card {
      padding: 22px 20px;
    }
  }

  /* ---------- Hover (only on devices that support it) ---------- */

  @media (hover: hover) and (pointer: fine) {
    .pv-benefits__card:hover::before {
      opacity: 1;
    }

    .pv-benefits__card:hover .pv-benefits__icon {
      color: #ecdcff;
      background: rgba(255, 255, 255, .08);
      border-color: rgba(255, 255, 255, .2);
      box-shadow: none;
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
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pv-benefits *,
    .pv-benefits *::before,
    .pv-benefits *::after {
      animation: none !important;
      transition: none !important;
    }

    .pv-benefits__reveal {
      opacity: 1 !important;
      transform: none !important;
    }
  }
`

export default function Benefits() {
  return (
    <section
      className="pv-benefits"
      aria-label="Benefits of a focused landing page"
    >
      <style>{styles}</style>

      <Container className="pv-benefits__container">
        <div className="pv-benefits__header">
          <Reveal>
            <h2>Give More of Your Visitors a Reason to Take the Next Step.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p>
              A focused landing page helps connect the promise that brought
              someone to you with the information they need before enquiring.
            </p>
          </Reveal>
        </div>

        <div className="pv-benefits__grid">
          {benefits.map(([title, description], index) => (
            <Reveal
              key={title}
              delay={(index % 3) * 70}
              className="pv-benefits__reveal"
            >
              <article className="pv-benefits__card">
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="pv-benefits__note">
          <span className="pv-benefits__note-icon" aria-hidden="true">
            i
          </span>

          <p>
            Results depend on your offer, traffic quality, audience and sales
            follow-up. A landing page is one important part of that journey.
          </p>
        </div>
      </Container>
    </section>
  )
}