import { audiences } from '../data'
import { Button, Container, Reveal, SectionHead } from './ui'

const baseUrl = import.meta.env.BASE_URL || '/'
const imageBase = `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}images/`

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap');

  .expert-audience {
    --audience-ink: #302045;
    --audience-muted: #6c607e;
    --audience-purple: #7542a4;
    --audience-border: #e4d8f3;
    --audience-ease: cubic-bezier(.22, 1, .36, 1);

    /* Yellow button look (same as Problems.jsx) */
    --btn-text: #3b0f4d;
    --btn-bg: linear-gradient(180deg, #ffe985 0%, #ffd53d 48%, #ffb81c 100%);
    --btn-bg-hover: linear-gradient(180deg, #fff0a0 0%, #ffdf5c 48%, #ffc236 100%);
    --btn-border: #f2a900;
    --btn-shadow:
      0 8px 18px #ffa80040,
      inset 0 1px 0 #ffffffb3,
      inset 0 -3px 0 #e09600;
    --btn-shadow-hover:
      0 14px 26px #ffa80055,
      inset 0 1px 0 #ffffffcc,
      inset 0 -3px 0 #e09600;

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-block: clamp(48px, 7vw, 100px);
    color: var(--audience-ink);
    background:
      radial-gradient(ellipse at 0% 10%, #f0e5fc80, transparent 36%),
      radial-gradient(ellipse at 100% 65%, #ffecdf66, transparent 34%),
      linear-gradient(180deg, #fff, #fcfaff 55%, #fff);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    scroll-margin-top: 90px;
  }

  .expert-audience,
  .expert-audience *,
  .expert-audience *::before,
  .expert-audience *::after {
    box-sizing: border-box;
  }

  .expert-audience .expert-audience__container {
    width: 100%;
    max-width: 1200px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 40px);
  }

  .expert-audience__header {
    max-width: 820px;
    min-width: 0;
    margin-inline: auto;
    text-align: center;
  }

  .expert-audience__header h2 {
    max-width: 23ch;
    margin-inline: auto;
    color: var(--audience-ink);
    font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui,
      -apple-system, "Segoe UI", sans-serif;
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -.035em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .expert-audience__header p {
    max-width: 66ch;
    margin: 18px auto 0;
    color: var(--audience-muted);
    font-size: clamp(15px, 1.7vw, 17px);
    line-height: 1.8;
    text-wrap: pretty;
  }

  .expert-audience__rows {
    display: grid;
    gap: clamp(40px, 6vw, 76px);
    min-width: 0;
    margin-top: clamp(34px, 5vw, 60px);
  }

  .expert-audience__row {
    --row-tint: #f2e8fc;
    --row-icon: #8851ad;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    gap: clamp(24px, 4vw, 44px);
    min-width: 0;
  }

  .expert-audience__row--1 {
    --row-tint: #ffecdf;
    --row-icon: #be7650;
  }

  .expert-audience__row--2 {
    --row-tint: #f5ebfd;
    --row-icon: #8851ad;
  }

  .expert-audience__row + .expert-audience__row {
    padding-top: clamp(32px, 5vw, 64px);
    border-top: 1px solid var(--audience-border);
  }

  .expert-audience__media,
  .expert-audience__content {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .expert-audience__media {
    max-width: 650px;
    margin-inline: auto;
  }

  .expert-audience__frame {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: clamp(7px, 1.2vw, 12px);
    border: 1px solid var(--audience-border);
    border-radius: clamp(20px, 2.8vw, 30px);
    background: linear-gradient(145deg, #fff, var(--row-tint));
    box-shadow:
      inset 0 1px 0 #fff,
      0 22px 48px -30px #63418090;
    transition:
      transform .45s var(--audience-ease),
      box-shadow .45s ease,
      border-color .35s ease;
  }

  .expert-audience__image-stage {
    display: grid;
    place-items: center;
    width: 100%;
    min-width: 0;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    border: 1px solid #ffffffb0;
    border-radius: clamp(14px, 2vw, 21px);
    background:
      radial-gradient(ellipse at 100% 100%, var(--row-tint), transparent 75%),
      #fff;
  }

  .expert-audience .expert-audience__image {
    display: block;
    position: static;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 100%;
    min-height: 0;
    max-height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    object-fit: contain;
    object-position: center;
    transform: none;
  }

  .expert-audience__content {
    text-align: left;
  }

  .expert-audience__badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    max-width: 100%;
    padding: 9px 16px;
    border: 1px solid #ddcdf0;
    border-radius: 999px;
    color: #6b3b8c;
    background: linear-gradient(180deg, #ffffffe6, #f6effbc0);
    box-shadow: 0 8px 24px #68428a0d, inset 0 1px 0 #fff;
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.5;
  }

  .expert-audience__badge::before {
    content: "";
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a066d6, #7542a4);
    box-shadow: 0 0 0 4px #8750b814;
  }

  .expert-audience .expert-audience__title {
    max-width: 27ch;
    margin: 18px 0 0;
    color: var(--audience-ink);
    font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui,
      -apple-system, "Segoe UI", sans-serif;
    font-size: clamp(25px, 2.8vw, 35px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -.035em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .expert-audience .expert-audience__description {
    margin: 16px 0 0;
    color: var(--audience-muted);
    font-size: clamp(15px, 1.4vw, 16.5px);
    line-height: 1.8;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  .expert-audience .expert-audience__goals {
    position: relative;
    margin: 24px 0 0;
    padding: 18px 20px 18px 22px;
    border: 1px solid #e4d8f3;
    border-radius: 18px;
    color: #6c607e;
    background: linear-gradient(130deg, #fffffff0, #f7f0fcd8);
    box-shadow: 0 12px 30px #44226009, inset 0 1px 0 #fff;
    font-size: 14.5px;
    line-height: 1.75;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  .expert-audience .expert-audience__goals::before {
    content: "";
    position: absolute;
    top: 16px;
    bottom: 16px;
    left: 0;
    width: 4px;
    border-radius: 0 4px 4px 0;
    background: linear-gradient(180deg, #a066d6, #7542a4);
  }

  .expert-audience__goals strong {
    color: var(--audience-purple);
    font-weight: 800;
  }

  .expert-audience__cta {
    display: flex;
    justify-content: center;
    min-width: 0;
    margin-top: clamp(38px, 5vw, 60px);
    padding-bottom: 6px;
    text-align: center;
  }

  /* ---------- CTA button (yellow, same as Problems.jsx) ---------- */

  .expert-audience .expert-audience__button.expert-audience__button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: min(100%, 350px);
    max-width: 100%;
    min-width: 0;
    min-height: 56px;
    height: auto;
    padding: 17px 30px;
    overflow: hidden;
    border: 1px solid var(--btn-border);
    border-radius: 14px;
    color: var(--btn-text);
    background: var(--btn-bg);
    box-shadow: var(--btn-shadow);
    filter: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.45;
    letter-spacing: -.005em;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 1px 0 #ffffff55;
    white-space: normal;
    overflow-wrap: anywhere;
    cursor: pointer;
    transition:
      transform 350ms var(--audience-ease),
      box-shadow 350ms ease,
      background 350ms ease,
      border-color 350ms ease;
  }

  .expert-audience .expert-audience__button::after {
    content: none;
  }

  .expert-audience__button > span {
    min-width: 0;
    white-space: normal;
  }

  .expert-audience__button svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .expert-audience .expert-audience__button.expert-audience__button:active {
    transform: translate3d(0, 0, 0);
  }

  .expert-audience .expert-audience__button.expert-audience__button:focus-visible {
    outline: 3px solid var(--btn-text);
    outline-offset: 4px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .expert-audience__row {
      max-width: 760px;
      margin-inline: auto;
    }

    .expert-audience__content {
      max-width: 650px;
      margin-inline: auto;
    }

    .expert-audience .expert-audience__title {
      max-width: 32ch;
      font-size: 32px;
    }
  }

  @media (min-width: 1024px) {
    .expert-audience__row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(32px, 4vw, 60px);
    }

    .expert-audience__row--reverse .expert-audience__media {
      order: 2;
    }

    .expert-audience__row--reverse .expert-audience__content {
      order: 1;
    }

    .expert-audience .expert-audience__button.expert-audience__button {
      width: auto;
      min-width: 300px;
    }
  }

  @media (max-width: 767px) {
    .expert-audience .expert-audience__button.expert-audience__button {
      width: 100%;
      max-width: 360px;
      padding: 16px 18px;
      font-size: 15px;
    }
  }

  @media (max-width: 359px) {
    .expert-audience .expert-audience__container {
      padding-inline: 14px;
    }

    .expert-audience__header h2 {
      font-size: 26px;
    }

    .expert-audience .expert-audience__title {
      font-size: 23px;
    }

    .expert-audience .expert-audience__goals {
      padding: 14px 14px 14px 18px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .expert-audience__frame:hover {
      transform: translateY(-4px);
      border-color: #ccb0e2;
      box-shadow:
        inset 0 1px 0 #fff,
        0 28px 52px -30px #63418095;
    }

    .expert-audience .expert-audience__button.expert-audience__button:hover {
      transform: translate3d(0, -3px, 0);
      border-color: var(--btn-border);
      background: var(--btn-bg-hover);
      box-shadow: var(--btn-shadow-hover);
    }
  }

  @media (hover: none) {
    .expert-audience .expert-audience__button.expert-audience__button:active {
      transform: scale(.98);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .expert-audience *,
    .expert-audience *::before,
    .expert-audience *::after {
      animation: none !important;
      transition: none !important;
    }

    .expert-audience__media,
    .expert-audience__content,
    .expert-audience__cta {
      opacity: 1 !important;
      transform: none !important;
    }

    .expert-audience__frame:hover,
    .expert-audience .expert-audience__button.expert-audience__button:hover,
    .expert-audience .expert-audience__button.expert-audience__button:active {
      transform: none !important;
    }
  }
`

export default function Audience() {
  return (
    <section
      id="who"
      className="expert-audience"
      aria-label="Who our landing pages are built for"
    >
      <style>{styles}</style>

      <Container className="expert-audience__container">
        <div className="expert-audience__header">
          <SectionHead
            title="Built for Experts Who Want More Meaningful Conversations."
            text="Whether you sell personal guidance, professional advice or practical training, your landing page should explain your offer in a way your audience understands."
          />
        </div>

        <div className="expert-audience__rows">
          {audiences.map((audience, index) => (
            <article
              key={audience.t}
              className={[
                'expert-audience__row',
                `expert-audience__row--${index}`,
                index % 2 === 1 ? 'expert-audience__row--reverse' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-labelledby={`expert-audience-title-${index}`}
            >
              <Reveal className="expert-audience__media">
                <figure className="expert-audience__frame">
                  <div className="expert-audience__image-stage image-hover">
                    <img
                      src={`${imageBase}${audience.img}`}
                      alt={
                        audience.alt ||
                        `${audience.t.replace(/^For /, '')} service illustration`
                      }
                      loading="lazy"
                      decoding="async"
                      className="expert-audience__image"
                    />
                  </div>
                </figure>
              </Reveal>

              <Reveal
                delay={100}
                className="expert-audience__content"
              >
                <span className="expert-audience__badge">
                  {audience.t}
                </span>

                <h3
                  id={`expert-audience-title-${index}`}
                  className="expert-audience__title"
                >
                  {audience.h}
                </h3>

                <p className="expert-audience__description">
                  {audience.p}
                </p>

                <p className="expert-audience__goals">
                  <strong>Page goals: </strong>
                  {audience.g}
                </p>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal className="expert-audience__cta">
          <Button
            variant="dark"
            className="expert-audience__button"
          >
            Yes! Let's Grow My Revenue
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}