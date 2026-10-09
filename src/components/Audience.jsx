import { audiences } from '../data'
import { Button, Check, Container, Reveal, SectionHead } from './ui'

const baseUrl = import.meta.env.BASE_URL || '/'
const imageBase = `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}images/`

const styles = `
  .expert-audience {
    --audience-ink: #302045;
    --audience-muted: #776684;
    --audience-purple: #793fca;
    --audience-border: #e9dff3;
    --audience-ease: cubic-bezier(.22, 1, .36, 1);

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
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -.04em;
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

  /* A consistent frame keeps all three images aligned.
     Contain preserves the entire image without cropping. */

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
      0 20px 45px -32px #63418080;
    transition:
      transform .4s var(--audience-ease),
      box-shadow .4s ease;
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
    gap: 8px;
    max-width: 100%;
    padding: 8px 13px;
    border: 1px solid #dfccf0;
    border-radius: 999px;
    color: #7542a3;
    background: linear-gradient(135deg, #fff, #f2e8fc);
    box-shadow: inset 0 1px 0 #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.5;
  }

  .expert-audience__badge::before {
    content: "";
    flex: 0 0 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #a575ca;
    box-shadow: 0 0 0 3px #a575ca14;
  }

  .expert-audience .expert-audience__title {
    max-width: 27ch;
    margin: 16px 0 0;
    color: var(--audience-ink);
    font-size: clamp(24px, 2.65vw, 33px);
    font-weight: 750;
    line-height: 1.23;
    letter-spacing: -.035em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .expert-audience .expert-audience__description {
    margin: 16px 0 0;
    color: var(--audience-muted);
    font-size: clamp(15px, 1.4vw, 16px);
    line-height: 1.8;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  .expert-audience .expert-audience__list-label {
    margin: 23px 0 0;
    color: #543d66;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
  }

  .expert-audience .expert-audience__list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 12px 20px;
    margin: 13px 0 0;
    padding: 0;
    list-style: none;
  }

  .expert-audience__list-item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    min-width: 0;
    color: #6c597a;
    font-size: 14px;
    line-height: 1.65;
  }

  .expert-audience__list-item > span:last-child {
    min-width: 0;
    overflow-wrap: break-word;
  }

  .expert-audience__check {
    display: grid;
    flex: 0 0 21px;
    place-items: center;
    width: 21px;
    height: 21px;
    margin-top: 1px;
    border: 1px solid #e5d5ef;
    border-radius: 7px;
    color: var(--row-icon);
    background: linear-gradient(145deg, #fff, var(--row-tint));
  }

  .expert-audience__check svg {
    display: block;
    width: 13px;
    height: 13px;
    margin: 0;
    color: inherit;
  }

  .expert-audience .expert-audience__goals {
    margin: 23px 0 0;
    padding: 16px 18px;
    border: 1px solid #e7dcef;
    border-left: 3px solid #b48bd4;
    border-radius: 15px;
    color: #705b80;
    background: linear-gradient(110deg, #f6effb, #fffaf6);
    font-size: 14px;
    line-height: 1.75;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  .expert-audience__goals strong {
    color: #543d66;
    font-weight: 700;
  }

  .expert-audience__cta {
    display: flex;
    justify-content: center;
    min-width: 0;
    margin-top: clamp(38px, 5vw, 60px);
    padding-bottom: 6px;
    text-align: center;
  }

  .expert-audience .expert-audience__button {
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
    padding: 16px 25px;
    overflow: hidden;
    border: 1px solid #ffffff45;
    border-radius: 17px;
    color: #fff;
    background: linear-gradient(135deg, #9859de, #793fca 55%, #7238bd);
    box-shadow:
      0 5px 0 -1px #582b97,
      0 18px 30px -17px #7941bc99,
      inset 0 1px 0 #ffffff40;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: normal;
    overflow-wrap: anywhere;
    cursor: pointer;
    transition:
      transform .3s var(--audience-ease),
      box-shadow .3s ease,
      filter .3s ease;
  }

  .expert-audience__button::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      110deg, transparent 25%, #ffffff35 50%, transparent 75%
    );
    transform: translateX(-140%);
    transition: transform .8s var(--audience-ease);
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

  .expert-audience .expert-audience__button:active {
    transform: translateY(3px);
    box-shadow:
      0 2px 0 -1px #582b97,
      0 10px 18px -14px #7941bc99;
  }

  .expert-audience .expert-audience__button:focus-visible {
    outline: 3px solid #a577d9;
    outline-offset: 5px;
  }

  @media (min-width: 560px) {
    .expert-audience .expert-audience__list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
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

    .expert-audience .expert-audience__button {
      width: auto;
      min-width: 300px;
      padding-inline: 30px;
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
      padding: 14px;
    }

    .expert-audience .expert-audience__button {
      padding-inline: 16px;
      font-size: 14px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .expert-audience__frame:hover {
      transform: translateY(-3px);
      box-shadow:
        inset 0 1px 0 #fff,
        0 26px 48px -30px #63418085;
    }

    .expert-audience .expert-audience__button:hover {
      transform: translateY(-2px);
      filter: brightness(1.04);
      box-shadow:
        0 5px 0 -1px #582b97,
        0 23px 34px -17px #7941bcaa,
        inset 0 1px 0 #ffffff40;
    }

    .expert-audience__button:hover::after {
      transform: translateX(140%);
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
    .expert-audience .expert-audience__button:hover {
      transform: none;
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
                  <div className="expert-audience__image-stage">
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

                <p className="expert-audience__list-label">
                  Ideal for:
                </p>

                <ul className="expert-audience__list">
                  {audience.l.map((item) => (
                    <li
                      key={item}
                      className="expert-audience__list-item"
                    >
                      <span
                        className="expert-audience__check"
                        aria-hidden="true"
                      >
                        <Check />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

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
            Discuss My Landing Page
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}