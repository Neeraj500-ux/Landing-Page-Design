import { services } from '../data'
import { Button, Check, Container, Reveal, SectionHead } from './ui'

function ServiceIcon({ index }) {
  const icons = [
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>,
    <>
      <path d="m16 3 5 5-11 11-6 1 1-6L16 3Z" />
      <path d="m13 6 5 5M4 4H3v17h17v-1" />
    </>,
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
    </>,
    <>
      <rect x="2" y="4" width="14" height="11" rx="2" />
      <path d="M9 15v4m-4 0h8" />
      <rect x="17" y="9" width="5" height="12" rx="1.5" />
    </>,
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 10h18m-13 5 2.5 2.5L16 12" />
    </>,
    <>
      <path d="M4 3v17h17M8 15l4-5 4 2 5-7" />
      <path d="M17 5h4v4" />
    </>,
  ]

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
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
  .lp-services {
    --services-ink: #302045;
    --services-muted: #776684;
    --services-purple: #793fca;
    --services-border: #e7dcef;
    --services-ease: cubic-bezier(.22, 1, .36, 1);

    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-block: clamp(48px, 7vw, 100px);
    color: var(--services-ink);
    background:
      radial-gradient(ellipse at 5% 18%, #e9dbff66, transparent 38%),
      radial-gradient(ellipse at 98% 48%, #ffecdf70, transparent 35%),
      linear-gradient(180deg, #fff, #fcf9ff 50%, #fff);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
    scroll-margin-top: 90px;
  }

  .lp-services,
  .lp-services *,
  .lp-services *::before,
  .lp-services *::after {
    box-sizing: border-box;
  }

  .lp-services .lp-services__container {
    width: 100%;
    max-width: 1200px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 40px);
  }

  .lp-services__header {
    width: 100%;
    max-width: 850px;
    min-width: 0;
    margin-inline: auto;
    text-align: center;
  }

  .lp-services__header h2 {
    max-width: 27ch;
    margin-inline: auto;
    color: var(--services-ink);
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 800;
    line-height: 1.17;
    letter-spacing: -.04em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .lp-services__header p {
    max-width: 65ch;
    margin: 18px auto 0;
    color: var(--services-muted);
    font-size: clamp(15px, 1.65vw, 17px);
    line-height: 1.8;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  /* Image: natural proportions, centered, no fixed height. */

  .lp-services__media-reveal {
    width: 100%;
    max-width: 1020px;
    min-width: 0;
    margin: clamp(30px, 4.5vw, 50px) auto 0;
  }

  .lp-services__media {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: clamp(7px, 1vw, 12px);
    border: 1px solid var(--services-border);
    border-radius: clamp(21px, 3vw, 32px);
    background: linear-gradient(135deg, #fff, #f0e5fc 65%, #ffecdf);
    box-shadow:
      inset 0 1px 0 #fff,
      0 24px 55px -36px #63418085;
    transition: box-shadow .5s ease;
  }

  .lp-services__image-stage {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    border: 1px solid #ffffffb0;
    border-radius: clamp(15px, 2.2vw, 23px);
    background: #fff;
    line-height: 0;
  }

  .lp-services .lp-services__image {
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
    object-fit: contain;
    object-position: center;
    transform: scale(.975);
    transform-origin: center;
    transition: transform .85s var(--services-ease);
  }

  /*
    Scale from .975 to 1: a gentle zoom while keeping the
    entire image inside its frame, including on hover.
  */

  .lp-services__image-stage::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      112deg,
      transparent 20%,
      #ffffff00 35%,
      #ffffff55 49%,
      #ffffff12 59%,
      transparent 75%
    );
    opacity: 0;
    transform: translateX(-120%);
    transition:
      transform .95s var(--services-ease),
      opacity .35s ease;
  }

  /* Cards */

  .lp-services__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    gap: clamp(16px, 2vw, 22px);
    min-width: 0;
    margin-top: clamp(30px, 4vw, 46px);
  }

  .lp-services__card-reveal {
    display: flex;
    min-width: 0;
    height: 100%;
  }

  .lp-services__card {
    --card-tint: #f1e6fb;
    --tile-ink: #8851ad;
    --tile-base: #d8bfe9;
    --tile-border: #e0cdef;

    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: clamp(22px, 2.5vw, 30px);
    border: 1px solid var(--services-border);
    border-radius: 24px;
    background:
      radial-gradient(ellipse at 100% 0%, var(--card-tint), transparent 58%),
      linear-gradient(145deg, #fff, #ffffffd9);
    box-shadow:
      inset 0 1px 0 #fff,
      0 4px 0 -2px #e9dff2,
      0 16px 35px -30px #63418070;
    text-align: left;
    transition:
      transform .4s var(--services-ease),
      border-color .4s ease,
      box-shadow .4s ease;
  }

  .lp-services__card--1,
  .lp-services__card--4 {
    --card-tint: #fff0e5;
    --tile-ink: #be7650;
    --tile-base: #e7c4ad;
    --tile-border: #efd7c7;
  }

  .lp-services__card--2,
  .lp-services__card--5 {
    --card-tint: #fff5d9;
    --tile-ink: #a5853e;
    --tile-base: #e4d39e;
    --tile-border: #eee1bb;
  }

  .lp-services__card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-width: 0;
    margin-bottom: 24px;
  }

  .lp-services__icon {
    position: relative;
    display: grid;
    flex: 0 0 50px;
    place-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid var(--tile-border);
    border-radius: 16px;
    color: var(--tile-ink);
    background: linear-gradient(145deg, #fff, var(--card-tint));
    box-shadow:
      0 5px 0 -1px var(--tile-base),
      0 14px 20px -17px var(--tile-ink),
      inset 0 1px 0 #fff;
    transition: transform .4s var(--services-ease);
  }

  .lp-services__icon::before {
    content: "";
    position: absolute;
    inset: 3px;
    border: 1px solid #ffffffc0;
    border-radius: 12px;
    pointer-events: none;
  }

  .lp-services__icon svg {
    display: block;
    width: 24px;
    height: 24px;
  }

  .lp-services__number {
    display: grid;
    flex: 0 0 30px;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #e8ddf1;
    border-radius: 50%;
    color: #8d769b;
    background: #ffffffa8;
    font-size: 11px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .lp-services .lp-services__title {
    margin: 0;
    color: var(--services-ink);
    font-size: clamp(20px, 2vw, 23px);
    font-weight: 750;
    line-height: 1.3;
    letter-spacing: -.025em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .lp-services .lp-services__description {
    margin: 13px 0 0;
    color: var(--services-muted);
    font-size: 14px;
    line-height: 1.8;
    text-wrap: pretty;
    overflow-wrap: break-word;
  }

  .lp-services__details {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e9dff1;
  }

  .lp-services .lp-services__list-label {
    margin: 0;
    color: #543d66;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.6;
    overflow-wrap: break-word;
  }

  .lp-services .lp-services__list {
    display: grid;
    gap: 11px;
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
  }

  .lp-services__list-item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    min-width: 0;
    color: #6c597a;
    font-size: 14px;
    line-height: 1.65;
  }

  .lp-services__list-item > span:last-child {
    min-width: 0;
    overflow-wrap: break-word;
  }

  .lp-services__check {
    display: grid;
    flex: 0 0 20px;
    place-items: center;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    border: 1px solid var(--tile-border);
    border-radius: 7px;
    color: var(--tile-ink);
    background: linear-gradient(145deg, #fff, var(--card-tint));
  }

  .lp-services__check svg {
    display: block;
    width: 12px;
    height: 12px;
    margin: 0;
    color: inherit;
  }

  /* CTA: keep the existing Button colors and behavior. */

  .lp-services__cta {
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
    margin-top: clamp(32px, 4vw, 48px);
    padding-bottom: 6px;
    text-align: center;
  }

  .lp-services .lp-services__button {
    position: relative;
    isolation: isolate;
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
    border-radius: 17px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: normal;
    overflow-wrap: anywhere;
    box-shadow: 0 16px 30px -20px #63418099;
    transition:
      transform .3s var(--services-ease),
      box-shadow .3s ease;
  }

  .lp-services__button > span {
    min-width: 0;
    white-space: normal;
  }

  .lp-services__button svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .lp-services__button::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      110deg, transparent 25%, #ffffff28 50%, transparent 75%
    );
    transform: translateX(-140%);
    transition: transform .85s var(--services-ease);
  }

  .lp-services .lp-services__button:focus-visible {
    outline: 3px solid #a577d9;
    outline-offset: 5px;
  }

  .lp-services .lp-services__button:active {
    transform: translateY(1px);
  }

  /* Two columns on tablets; three on larger desktops. */

  @media (min-width: 700px) {
    .lp-services__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .lp-services .lp-services__button {
      width: auto;
      min-width: 280px;
      padding-inline: 30px;
    }
  }

  @media (min-width: 1100px) {
    .lp-services__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 699px) {
    .lp-services__header h2 {
      max-width: 24ch;
    }

    .lp-services__card {
      border-radius: 22px;
    }

    .lp-services__media {
      box-shadow:
        inset 0 1px 0 #fff,
        0 18px 34px -27px #63418080;
    }
  }

  @media (max-width: 359px) {
    .lp-services .lp-services__container {
      padding-inline: 14px;
    }

    .lp-services__header h2 {
      font-size: 26px;
    }

    .lp-services__card {
      padding: 20px 18px;
    }

    .lp-services .lp-services__button {
      padding-inline: 18px;
      font-size: 14px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .lp-services__media:hover {
      box-shadow:
        inset 0 1px 0 #fff,
        0 28px 58px -34px #63418090;
    }

    .lp-services__media:hover .lp-services__image {
      transform: scale(1);
    }

    .lp-services__media:hover .lp-services__image-stage::after {
      opacity: 1;
      transform: translateX(120%);
    }

    .lp-services__card:hover {
      transform: translateY(-4px);
      border-color: #d7c0e8;
      box-shadow:
        inset 0 1px 0 #fff,
        0 4px 0 -2px #e5d6f0,
        0 24px 42px -28px #63418080;
    }

    .lp-services__card:hover .lp-services__icon {
      transform: translateY(-2px) rotate(-3deg);
    }

    .lp-services .lp-services__button:hover {
      transform: translateY(-2px);
      box-shadow: 0 22px 34px -20px #634180aa;
    }

    .lp-services__button:hover::after {
      transform: translateX(140%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lp-services *,
    .lp-services *::before,
    .lp-services *::after {
      animation: none !important;
      transition: none !important;
    }

    .lp-services__media-reveal,
    .lp-services__card-reveal,
    .lp-services__cta {
      opacity: 1 !important;
      transform: none !important;
    }

    .lp-services .lp-services__image,
    .lp-services__media:hover .lp-services__image,
    .lp-services__card:hover,
    .lp-services__card:hover .lp-services__icon,
    .lp-services .lp-services__button:hover {
      transform: none;
    }

    .lp-services__image-stage::after,
    .lp-services__button::after {
      display: none;
    }
  }
`

export default function Services() {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const imageUrl = `${
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  }images/Neeraj6.png`

  return (
    <section
      id="get"
      className="lp-services"
      aria-label="Landing page services and deliverables"
    >
      <style>{styles}</style>

      <Container className="lp-services__container">
        <div className="lp-services__header">
          <SectionHead
            title="From Your First Headline to the Final Form—Every Part Has a Purpose."
            text="We bring your message, design and functionality together to create a landing page that supports a clear business goal."
          />
        </div>

        <Reveal className="lp-services__media-reveal">
          <figure className="lp-services__media">
            <div className="lp-services__image-stage">
              <img
                src={imageUrl}
                alt="Responsive landing page design displayed on desktop and mobile"
                loading="lazy"
                decoding="async"
                className="lp-services__image"
              />
            </div>
          </figure>
        </Reveal>

        <div className="lp-services__grid">
          {services.map(([title, description, items], index) => (
            <Reveal
              key={title}
              delay={(index % 3) * 80}
              className="lp-services__card-reveal"
            >
              <article
                className={`lp-services__card lp-services__card--${index}`}
                aria-labelledby={`lp-service-title-${index}`}
              >
                <div className="lp-services__card-top">
                  <span className="lp-services__icon">
                    <ServiceIcon index={index} />
                  </span>

                  <span
                    className="lp-services__number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  id={`lp-service-title-${index}`}
                  className="lp-services__title"
                >
                  {title}
                </h3>

                <p className="lp-services__description">
                  {description}
                </p>

                <div className="lp-services__details">
                  <p className="lp-services__list-label">
                    {index === 4
                      ? 'Available Within the Agreed Scope:'
                      : 'What’s Included:'}
                  </p>

                  <ul className="lp-services__list">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="lp-services__list-item"
                      >
                        <span
                          className="lp-services__check"
                          aria-hidden="true"
                        >
                          <Check />
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="lp-services__cta">
          <Button
            variant="dark"
            className="site-cta--preserve-color lp-services__button"
          >
            Plan My Landing Page
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}