import { problems } from '../data'
import { Button, Container, Pill, Reveal, SectionHead } from './ui'

function ProblemIcon({ index }) {
  const icons = [
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
    </>,
    <>
      <circle cx="10" cy="7" r="3" />
      <path d="M4 21v-3a6 6 0 0 1 12 0v3" />
      <path d="M17 4.2a3 3 0 0 1 0 5.6M19 14a5 5 0 0 1 2 4v3" />
    </>,
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
    </>,
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M7 21v-3a5 5 0 0 1 10 0v3" />
      <path d="M5 6a2.5 2.5 0 0 0 0 5M19 6a2.5 2.5 0 0 1 0 5" />
      <path d="M4 14a4 4 0 0 0-2 3.5V20M20 14a4 4 0 0 1 2 3.5V20" />
    </>,
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10 6h4M11 18h2" />
    </>,
  ]

  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[index % icons.length]}
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z" />
      <path d="M20 2v4m-2-2h4" />
    </svg>
  )
}

const iconThemes = ['peach', 'lavender', 'gold', 'lavender', 'peach']

export default function Problems() {
  return (
    <section className="lp-problems">
      <style>{`
        .lp-problems {
          --lp-ink: #172440;
          --lp-muted: #5e6c82;
          --lp-blue: #3569e8;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(64px, 7.5vw, 112px) 0;
          color: var(--lp-ink);
          background:
            radial-gradient(
              ellipse at 7% 18%,
              rgba(214, 230, 255, .64),
              transparent 43%
            ),
            radial-gradient(
              ellipse at 94% 75%,
              rgba(231, 224, 255, .52),
              transparent 42%
            ),
            linear-gradient(180deg, #fbfcff, #f4f7fc 55%, #fbfcff);
        }

        .lp-problems,
        .lp-problems *,
        .lp-problems *::before,
        .lp-problems *::after {
          box-sizing: border-box;
        }

        .lp-problems::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(66, 98, 151, .035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66, 98, 151, .035) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: linear-gradient(#000, transparent 82%);
          mask-image: linear-gradient(#000, transparent 82%);
        }

        .lp-problems__header {
          max-width: 850px;
          margin-inline: auto;
          text-align: center;
        }

        .lp-problems__pill {
          display: flex;
          justify-content: center;
          margin-bottom: 22px;
        }

        .lp-problems__pill > * {
          max-width: 100%;
          padding: 10px 18px;
          border: 1px solid rgba(82, 118, 194, .16);
          border-radius: 999px;
          color: #365b9c;
          background: rgba(255, 255, 255, .88);
          box-shadow:
            0 4px 16px rgba(45, 77, 135, .045),
            inset 0 1px 0 #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: .035em;
          white-space: normal;
        }

        .lp-problems__header h2 {
          max-width: 780px;
          margin-inline: auto;
          color: var(--lp-ink);
          font-size: clamp(30px, 4.2vw, 52px);
          font-weight: 750;
          line-height: 1.12;
          letter-spacing: -.045em;
          text-wrap: balance;
        }

        .lp-problems__header p {
          max-width: 690px;
          margin-inline: auto;
          color: var(--lp-muted);
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.85;
          text-wrap: pretty;
        }

        .lp-problems__divider {
          width: 64px;
          height: 4px;
          margin: 28px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #a8c7ff, #537ee9, #c4b5f5);
          box-shadow: 0 4px 14px rgba(83, 126, 233, .18);
        }

        .lp-problems__grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: stretch;
          gap: 20px;
          margin-top: clamp(32px, 4.5vw, 56px);
        }

        .lp-problems__item {
          display: flex;
          min-width: 0;
          height: 100%;
        }

        .lp-problem-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: clamp(23px, 2.3vw, 32px);
          border: 1px solid rgba(133, 156, 195, .2);
          border-radius: 26px;
          background: rgba(255, 255, 255, .93);
          box-shadow:
            0 14px 38px -24px rgba(30, 58, 104, .25),
            0 3px 8px rgba(30, 58, 104, .025),
            inset 0 1px 0 #fff;
          transition:
            transform .3s ease,
            box-shadow .3s ease,
            border-color .3s ease;
        }

        .lp-problem-card::before {
          content: "";
          position: absolute;
          top: -1px;
          left: 30px;
          right: 30px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(107, 150, 237, .7),
            transparent
          );
          opacity: 0;
          transition: opacity .3s ease;
        }

        .lp-problem-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
        }

        /* Raised pastel icons — reference image style */

        .lp-problem-card__icon {
          --icon-top: #fff8f2;
          --icon-bottom: #ffe8d9;
          --icon-border: #f4ceb9;
          --icon-color: #d77852;
          --icon-base: #dcae97;
          --icon-shadow: rgba(175, 104, 71, .19);

          position: relative;
          isolation: isolate;
          display: grid;
          flex: 0 0 auto;
          place-items: center;
          width: 58px;
          height: 58px;
          margin-bottom: 6px;
          border: 1px solid var(--icon-border);
          border-radius: 19px;
          color: var(--icon-color);
          background: linear-gradient(
            145deg,
            var(--icon-top),
            var(--icon-bottom)
          );
          box-shadow:
            0 6px 0 -1px var(--icon-base),
            0 12px 18px -7px var(--icon-shadow),
            inset 0 1px 1px rgba(255, 255, 255, .98),
            inset 0 -1px 2px rgba(255, 255, 255, .5);
          transition: transform .3s ease;
        }

        .lp-problem-card__icon::before {
          content: "";
          position: absolute;
          inset: 2px;
          border: 1px solid rgba(255, 255, 255, .58);
          border-radius: 16px;
          pointer-events: none;
        }

        .lp-problem-card__icon svg {
          position: relative;
          display: block;
          width: 27px;
          height: 27px;
          filter: drop-shadow(0 1px 0 rgba(255, 255, 255, .75));
        }

        .lp-problem-card__icon--peach {
          --icon-top: #fffaf5;
          --icon-bottom: #ffeadc;
          --icon-border: #f4cfba;
          --icon-color: #d77750;
          --icon-base: #dcaf98;
          --icon-shadow: rgba(175, 104, 71, .19);
        }

        .lp-problem-card__icon--lavender {
          --icon-top: #fdfaff;
          --icon-bottom: #f0e6fa;
          --icon-border: #dfc7f1;
          --icon-color: #8650ad;
          --icon-base: #c7a7de;
          --icon-shadow: rgba(126, 76, 160, .18);
        }

        .lp-problem-card__icon--gold {
          --icon-top: #fffdf4;
          --icon-bottom: #fff2c9;
          --icon-border: #eed68d;
          --icon-color: #b28b2c;
          --icon-base: #d7bd6e;
          --icon-shadow: rgba(157, 126, 37, .18);
        }

        .lp-problem-card__number {
          color: #76869e;
          font-size: 12px;
          font-weight: 650;
          line-height: 1;
          letter-spacing: .1em;
          font-variant-numeric: tabular-nums;
        }

        .lp-problem-card__title {
          margin: 0;
          color: var(--lp-ink);
          font-size: clamp(19px, 1.7vw, 22px);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -.025em;
          overflow-wrap: anywhere;
          text-wrap: pretty;
        }

        .lp-problem-card__description {
          margin: 12px 0 24px;
          color: var(--lp-muted);
          font-size: 15px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .lp-problem-card__solution {
          margin-top: auto;
          padding: 17px 18px;
          border: 1px solid rgba(66, 150, 112, .13);
          border-radius: 17px;
          background: linear-gradient(135deg, #f3faf6, #edf7f3);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .85);
        }

        .lp-problem-card__solution-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #26744f;
          font-size: 12px;
          font-weight: 750;
          line-height: 1.5;
          letter-spacing: .015em;
        }

        .lp-problem-card__check {
          display: grid;
          flex: 0 0 auto;
          place-items: center;
          width: 23px;
          height: 23px;
          border-radius: 50%;
          color: #26744f;
          background: #deeee5;
        }

        .lp-problem-card__solution-text {
          margin: 0;
          color: #465f56;
          font-size: 14px;
          line-height: 1.75;
          overflow-wrap: anywhere;
        }

        .lp-problems__cta {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          min-width: 0;
          height: 100%;
          min-height: 340px;
          overflow: hidden;
          padding: clamp(26px, 2.8vw, 38px);
          border: 1px solid rgba(255, 255, 255, .45);
          border-radius: 26px;
          color: #fff;
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(182, 166, 255, .4),
              transparent 53%
            ),
            linear-gradient(140deg, #344ea1, #514bb6 55%, #7653c3);
          box-shadow:
            0 20px 42px -22px rgba(69, 67, 153, .55),
            inset 0 1px 0 rgba(255, 255, 255, .3);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .lp-problems__cta::before,
        .lp-problems__cta::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 260px;
          height: 260px;
          right: -145px;
          bottom: -130px;
          border: 1px solid rgba(255, 255, 255, .14);
          border-radius: 50%;
          pointer-events: none;
        }

        .lp-problems__cta::after {
          width: 350px;
          height: 350px;
          right: -190px;
          bottom: -175px;
        }

        .lp-problems__cta-icon {
          display: grid;
          place-items: center;
          width: 60px;
          height: 60px;
          margin-bottom: 28px;
          border: 1px solid rgba(255, 255, 255, .26);
          border-radius: 20px;
          background: rgba(255, 255, 255, .12);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .2);
        }

        .lp-problems__cta-title {
          max-width: 320px;
          margin: 0;
          color: #fff;
          font-size: clamp(25px, 2.4vw, 32px);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -.035em;
          text-wrap: balance;
        }

        .lp-problems__cta-action {
          width: 100%;
          min-width: 0;
          margin-top: 30px;
        }

        .lp-problems .lp-problems__cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 54px;
          height: auto;
          padding: 15px 16px;
          border: 1px solid rgba(255, 255, 255, .85);
          border-radius: 15px;
          color: #384896;
          background: #fff;
          background-image: none;
          box-shadow: 0 8px 22px rgba(27, 24, 79, .15);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.5;
          text-align: center;
          text-decoration: none;
          white-space: normal;
          overflow-wrap: anywhere;
          transition:
            transform .25s ease,
            background-color .25s ease,
            box-shadow .25s ease;
        }

        .lp-problems__cta-button:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 5px;
        }

        @supports (backdrop-filter: blur(16px)) {
          .lp-problem-card {
            background: rgba(255, 255, 255, .78);
            backdrop-filter: blur(16px);
          }

          .lp-problems__cta-icon {
            backdrop-filter: blur(12px);
          }
        }

        @media (min-width: 768px) {
          .lp-problems__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }
        }

        @media (min-width: 1024px) {
          .lp-problems__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .lp-problem-card:hover {
            transform: translateY(-6px);
            border-color: rgba(103, 142, 218, .38);
            box-shadow:
              0 24px 44px -24px rgba(38, 74, 139, .32),
              inset 0 1px 0 #fff;
          }

          .lp-problem-card:hover::before {
            opacity: 1;
          }

          .lp-problem-card:hover .lp-problem-card__icon {
            transform: translateY(-3px) rotate(-3deg);
          }

          .lp-problems__cta:hover {
            transform: translateY(-6px);
            box-shadow: 0 26px 48px -23px rgba(69, 67, 153, .65);
          }

          .lp-problems .lp-problems__cta-button:hover {
            transform: translateY(-2px);
            background: #f1f5ff;
            box-shadow: 0 12px 26px rgba(27, 24, 79, .22);
          }
        }

        @media (max-width: 767px) {
          .lp-problems__header h2 {
            letter-spacing: -.035em;
          }

          .lp-problem-card {
            border-radius: 22px;
          }

          .lp-problem-card__top {
            margin-bottom: 20px;
          }

          .lp-problems__cta {
            min-height: 300px;
            border-radius: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-problems *,
          .lp-problems *::before,
          .lp-problems *::after {
            animation: none !important;
            transition: none !important;
          }

          .lp-problems__item,
          .lp-problems__pill {
            opacity: 1 !important;
            transform: none !important;
          }

          .lp-problem-card:hover .lp-problem-card__icon {
            transform: none;
          }
        }
      `}</style>

      <Container>
        <div className="lp-problems__header">
          <Reveal className="lp-problems__pill">
            <Pill>Common landing page problems</Pill>
          </Reveal>

          <SectionHead
            title="Getting Clicks, but Not Enough Enquiries?"
            text="Your landing page is where visitors decide whether your offer is right for them. If the message is unclear or the next step feels difficult, interested people may leave before connecting with you."
          />

          <div className="lp-problems__divider" aria-hidden="true" />
        </div>

        <div className="lp-problems__grid">
          {problems.map(([title, description, improvement], index) => (
            <Reveal
              key={title}
              delay={Math.min(index * 70, 350)}
              className="lp-problems__item"
            >
              <article className="lp-problem-card">
                <div className="lp-problem-card__top">
                  <span
                    className={`lp-problem-card__icon lp-problem-card__icon--${
                      iconThemes[index % iconThemes.length]
                    }`}
                  >
                    <ProblemIcon index={index} />
                  </span>

                  <span
                    className="lp-problem-card__number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="lp-problem-card__title">
                  {title}
                </h3>

                <p className="lp-problem-card__description">
                  {description}
                </p>

                <div className="lp-problem-card__solution">
                  <div className="lp-problem-card__solution-label">
                    <span className="lp-problem-card__check">
                      <CheckIcon />
                    </span>

                    <span>What We Improve:</span>
                  </div>

                  <p className="lp-problem-card__solution-text">
                    {improvement}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={350} className="lp-problems__item">
            <div className="lp-problems__cta">
              <span className="lp-problems__cta-icon">
                <SparkIcon />
              </span>

              <h3 className="lp-problems__cta-title">
                Ready to turn more visits into conversations?
              </h3>

              <div className="lp-problems__cta-action">
                <Button className="lp-problems__cta-button">
                  Let’s Improve My Landing Page
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}