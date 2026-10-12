import { useEffect, useRef, useState } from 'react'
import { Container } from './ui'

const points = [
  'Your audience and offer',
  'Your existing page, if you have one',
  'Your main conversion goal',
  'The content and features you need',
  'Suitable next steps for the project',
]

const css = `
  .content-contact {
    --ct-ink: #28143f;
    --ct-muted: #716580;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: clamp(64px, 8vw, 120px) 0;
    color: var(--ct-ink);
    background:
      radial-gradient(ellipse at 4% 12%, #eee3ff 0, transparent 42%),
      radial-gradient(ellipse at 100% 88%, #e8dcfa 0, transparent 43%),
      linear-gradient(135deg, #fff 0%, #fcfaff 48%, #f5effc 100%);
    font-family: inherit;
    -webkit-font-smoothing: antialiased;
  }

  .content-contact,
  .content-contact *,
  .content-contact *::before,
  .content-contact *::after {
    box-sizing: border-box;
  }

  .content-contact::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, #daceeb, transparent);
  }

  .content-contact .ct-decoration {
    position: absolute;
    z-index: -1;
    pointer-events: none;
    width: clamp(280px, 40vw, 640px);
    aspect-ratio: 1;
    border: 1px solid rgba(113, 58, 196, .07);
    border-radius: 50%;
    box-shadow:
      0 0 0 48px rgba(113, 58, 196, .025),
      0 0 0 96px rgba(113, 58, 196, .018);
  }

  .content-contact .ct-decoration-top {
    top: -330px;
    right: -150px;
  }

  .content-contact .ct-decoration-bottom {
    bottom: -400px;
    left: -230px;
  }

  .content-contact .ct-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    gap: 36px;
    width: 100%;
    max-width: 1240px;
    margin-inline: auto;
  }

  .content-contact .ct-copy,
  .content-contact .ct-form-column {
    min-width: 0;
  }

  .content-contact .ct-accent {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }

  .content-contact .ct-accent::before {
    content: '';
    width: 48px;
    height: 5px;
    border-radius: 99px;
    background: linear-gradient(90deg, #54218d, #ac7ee8);
  }

  .content-contact .ct-accent::after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ceb3ee;
  }

  .content-contact .ct-title {
    max-width: 620px;
    margin: 0;
    color: var(--ct-ink);
    font-size: clamp(30px, 4vw, 52px);
    font-weight: 750;
    line-height: 1.12;
    letter-spacing: -.045em;
    overflow-wrap: break-word;
    text-wrap: balance;
  }

  .content-contact .ct-title-accent {
    color: #743ab4;
    background: linear-gradient(110deg, #512080, #8c50cc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .content-contact .ct-description {
    max-width: 570px;
    margin: 22px 0 0;
    color: var(--ct-muted);
    font-size: clamp(15px, 1.4vw, 17px);
    line-height: 1.85;
  }

  /* Discussion card */

  .content-contact .ct-discussion {
    position: relative;
    isolation: isolate;
    margin-top: 32px;
    padding: clamp(22px, 3vw, 32px);
    border: 1px solid rgba(133, 93, 178, .16);
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, .94),
      rgba(246, 240, 254, .82)
    );
    box-shadow:
      0 16px 45px -30px rgba(73, 34, 117, .3),
      inset 0 1px 0 #fff;
    transition:
      border-color .35s ease,
      box-shadow .35s ease;
  }

  .content-contact .ct-discussion::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(
      ellipse at 12% 0%,
      rgba(180, 139, 230, .1),
      transparent 65%
    );
    transition: opacity .45s ease;
  }

  .content-contact .ct-discussion-heading {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .content-contact .ct-icon {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid #e8dcf7;
    border-radius: 14px;
    color: #7441ae;
    background: linear-gradient(145deg, #fff, #eee3fb);
    box-shadow: 0 6px 14px -10px rgba(86, 42, 136, .4);
    transition:
      border-color .3s ease,
      box-shadow .3s ease;
  }

  /* Rotate only the SVG inside its fixed-size wrapper. */
  .content-contact .ct-icon svg,
  .content-contact .ct-check svg {
    display: block;
    transform-box: view-box;
    transform-origin: 50% 50%;
  }

  .content-contact .ct-icon svg {
    animation: ct-calendar-turn 9s ease-in-out infinite;
    animation-play-state: paused;
  }

  .content-contact.ct-in .ct-icon svg {
    animation-play-state: running;
  }

  .content-contact .ct-discussion h3 {
    min-width: 0;
    margin: 0;
    color: var(--ct-ink);
    font-size: clamp(18px, 1.8vw, 21px);
    font-weight: 700;
    line-height: 1.45;
    letter-spacing: -.025em;
    overflow-wrap: break-word;
  }

  .content-contact .ct-discussion-intro {
    margin: 22px 0 14px;
    color: #62516f;
    font-size: 14px;
    font-weight: 600;
  }

  .content-contact .ct-points {
    display: grid;
    gap: 13px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .content-contact .ct-point {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    color: #6b5d78;
    font-size: 15px;
    line-height: 1.6;
    transition: color .25s ease;
  }

  .content-contact .ct-point > span:last-child {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .content-contact .ct-check {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 22px;
    height: 22px;
    margin-top: 1px;
    border: 1px solid #e5d7f5;
    border-radius: 50%;
    color: #7b43b8;
    background: linear-gradient(145deg, #fff, #f0e7fb);
    transition:
      border-color .3s ease,
      box-shadow .3s ease;
  }

  .content-contact .ct-check svg {
    transition: transform .45s cubic-bezier(.22, 1, .36, 1);
  }

  /* Form */

  .content-contact .ct-form-card {
    position: relative;
    min-width: 0;
    margin: 0;
    padding: clamp(22px, 3vw, 38px);
    border: 1px solid rgba(137, 100, 181, .2);
    border-radius: 28px;
    background: linear-gradient(
      155deg,
      rgba(255, 255, 255, .98) 0%,
      rgba(255, 255, 255, .95) 58%,
      rgba(248, 243, 255, .96) 100%
    );
    box-shadow:
      0 30px 70px -35px rgba(75, 34, 122, .3),
      0 8px 24px -16px rgba(75, 34, 122, .15),
      inset 0 1px 0 #fff;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    transition:
      border-color .35s ease,
      box-shadow .35s ease;
  }

  .content-contact .ct-form-card::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 32px;
    right: 32px;
    height: 2px;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      transparent,
      #bd9ae6,
      #7840b8,
      #bd9ae6,
      transparent
    );
  }

  .content-contact .ct-form-card:focus-within {
    border-color: rgba(137, 100, 181, .36);
    box-shadow:
      0 30px 70px -35px rgba(75, 34, 122, .36),
      0 8px 24px -16px rgba(75, 34, 122, .18),
      inset 0 1px 0 #fff;
  }

  .content-contact .ct-form {
    display: grid;
    gap: 20px;
  }

  .content-contact .ct-field-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .content-contact .ct-label {
    display: flex;
    flex-direction: column;
    gap: 9px;
    min-width: 0;
    margin: 0;
    color: #4c365f;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
  }

  .content-contact .ct-field {
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    min-height: 52px;
    margin: 0;
    padding: 13px 15px;
    border: 1px solid #e4dbea;
    border-radius: 12px;
    outline: none;
    color: #342044;
    background: linear-gradient(135deg, #fff, #fcfaff);
    box-shadow: 0 2px 4px rgba(61, 29, 98, .015);
    font: inherit;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    transition:
      border-color .2s ease,
      box-shadow .2s ease;
  }

  .content-contact .ct-field::placeholder {
    color: #a096ac;
    opacity: 1;
  }

  .content-contact .ct-field:focus {
    border-color: #9564c5;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(130, 73, 190, .1);
  }

  .content-contact .ct-field:-webkit-autofill {
    -webkit-text-fill-color: #342044;
    -webkit-box-shadow: 0 0 0 1000px #faf7ff inset;
    caret-color: #342044;
  }

  .content-contact .ct-select-wrap {
    position: relative;
    display: block;
    min-width: 0;
  }

  .content-contact .ct-select {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 44px;
    cursor: pointer;
  }

  .content-contact .ct-select option {
    color: #342044;
    background: #fff;
  }

  .content-contact .ct-select-arrow {
    position: absolute;
    top: 50%;
    right: 16px;
    color: #8a6ca4;
    pointer-events: none;
    transform: translateY(-50%);
  }

  .content-contact .ct-textarea {
    min-height: 126px;
    resize: vertical;
  }

  .content-contact .ct-submit {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    min-height: 56px;
    margin: 2px 0 0;
    padding: 15px 20px;
    border: 1px solid rgba(78, 28, 132, .14);
    border-radius: 14px;
    color: #fff;
    background: linear-gradient(115deg, #4b1d78, #7137aa 60%, #8b4fc2);
    box-shadow:
      0 12px 24px -12px rgba(100, 43, 158, .65),
      inset 0 1px 0 rgba(255, 255, 255, .2);
    font: inherit;
    font-size: 15px;
    font-weight: 650;
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
    transition:
      transform .25s ease,
      box-shadow .25s ease;
  }

  .content-contact .ct-submit::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(
      110deg,
      transparent,
      rgba(255, 255, 255, .12),
      transparent
    );
    transition: opacity .3s ease;
  }

  .content-contact .ct-submit > span {
    min-width: 0;
  }

  .content-contact .ct-submit svg {
    display: block;
    flex: 0 0 auto;
    transform-box: view-box;
    transform-origin: 50% 50%;
    transition: transform .3s ease;
  }

  .content-contact .ct-submit:focus-visible,
  .content-contact .ct-privacy a:focus-visible {
    outline: 3px solid #ac7ed8;
    outline-offset: 4px;
  }

  .content-contact .ct-submit:active {
    transform: translateY(1px);
  }

  .content-contact .ct-form-note {
    max-width: 370px;
    margin: -3px auto 0;
    color: #80718d;
    font-size: 13px;
    line-height: 1.7;
    text-align: center;
  }

  .content-contact .ct-privacy {
    margin: 0;
    padding-top: 17px;
    border-top: 1px solid #eee6f4;
    color: #8b7c97;
    font-size: 11px;
    line-height: 1.8;
    text-align: center;
  }

  .content-contact .ct-privacy a {
    color: #73528f;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color .2s ease;
  }

  /* Success state */

  .content-contact .ct-success {
    display: grid;
    place-items: center;
    min-height: 440px;
    text-align: center;
    animation: ct-success-enter .4s ease both;
  }

  .content-contact .ct-success-icon {
    display: grid;
    place-items: center;
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border: 1px solid #ddcbed;
    border-radius: 24px;
    color: #7941b1;
    background: linear-gradient(145deg, #fff, #ebddfa);
    box-shadow: 0 12px 28px -16px rgba(95, 42, 152, .4);
  }

  .content-contact .ct-success h3 {
    margin: 0;
    color: var(--ct-ink);
    font-size: clamp(22px, 2.5vw, 28px);
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -.03em;
  }

  .content-contact .ct-success p {
    margin: 12px 0 0;
    color: var(--ct-muted);
    font-size: 15px;
    line-height: 1.7;
  }

  /* Entrance animation */

  .content-contact.ct-armed .ct-rise {
    opacity: 0;
    transform: translateY(18px);
    transition:
      opacity .65s ease var(--ct-delay, 0ms),
      transform .65s cubic-bezier(.2, .7, .2, 1) var(--ct-delay, 0ms);
  }

  .content-contact.ct-armed.ct-in .ct-rise {
    opacity: 1;
    transform: none;
  }

  /* Reveal immediately when a keyboard user focuses the form. */
  .content-contact.ct-armed .ct-rise:focus-within {
    opacity: 1;
    transform: none;
    transition-delay: 0ms;
  }

  @keyframes ct-calendar-turn {
    0%, 72%, 100% { transform: rotate(0deg); }
    79% { transform: rotate(-7deg); }
    87% { transform: rotate(7deg); }
    94% { transform: rotate(-3deg); }
  }

  @keyframes ct-success-enter {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  /* Precise-pointer hover effects */

  @media (hover: hover) and (pointer: fine) {
    .content-contact .ct-discussion:hover {
      border-color: rgba(133, 93, 178, .3);
      box-shadow:
        0 22px 48px -30px rgba(73, 34, 117, .35),
        inset 0 1px 0 #fff;
    }

    .content-contact .ct-discussion:hover::before {
      opacity: 1;
    }

    .content-contact .ct-discussion:hover .ct-icon {
      border-color: #d8c1ef;
      box-shadow:
        0 8px 18px -10px rgba(86, 42, 136, .4),
        inset 0 1px 0 rgba(255, 255, 255, .9);
    }

    .content-contact .ct-point:hover {
      color: #51346c;
    }

    .content-contact .ct-point:hover .ct-check {
      border-color: #cdb0e9;
      box-shadow: 0 0 0 3px rgba(133, 93, 178, .06);
    }

    .content-contact .ct-point:hover .ct-check svg {
      transform: rotate(-12deg);
    }

    .content-contact .ct-field:hover:not(:focus) {
      border-color: #cbb5df;
    }

    .content-contact .ct-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 30px -12px rgba(100, 43, 158, .55);
    }

    .content-contact .ct-submit:hover::before {
      opacity: 1;
    }

    .content-contact .ct-submit:hover svg {
      transform: rotate(-12deg);
    }

    .content-contact .ct-privacy a:hover {
      color: #4b1d78;
    }
  }

  /* Responsive layout */

  @media (min-width: 600px) {
    .content-contact .ct-field-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .content-contact .ct-layout {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
      gap: clamp(36px, 5vw, 76px);
    }
  }

  @media (max-width: 599px) {
    .content-contact .ct-layout {
      gap: 28px;
    }

    .content-contact .ct-description {
      line-height: 1.75;
    }

    .content-contact .ct-discussion {
      margin-top: 26px;
      border-radius: 20px;
    }

    .content-contact .ct-form-card {
      padding: 22px 18px;
      border-radius: 22px;
    }

    .content-contact .ct-form,
    .content-contact .ct-field-grid {
      gap: 17px;
    }

    .content-contact .ct-discussion-heading {
      gap: 11px;
    }

    .content-contact .ct-icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
    }

    .content-contact .ct-success {
      min-height: 340px;
    }
  }

  /* Reduced motion */

  @media (prefers-reduced-motion: reduce) {
    .content-contact.ct-armed .ct-rise {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .content-contact .ct-icon svg,
    .content-contact .ct-success {
      animation: none;
    }

    .content-contact .ct-discussion,
    .content-contact .ct-discussion::before,
    .content-contact .ct-icon,
    .content-contact .ct-check,
    .content-contact .ct-check svg,
    .content-contact .ct-point,
    .content-contact .ct-form-card,
    .content-contact .ct-field,
    .content-contact .ct-submit,
    .content-contact .ct-submit::before,
    .content-contact .ct-submit svg,
    .content-contact .ct-privacy a {
      transition: none;
    }

    .content-contact .ct-point:hover .ct-check svg,
    .content-contact .ct-submit:hover,
    .content-contact .ct-submit:hover svg,
    .content-contact .ct-submit:active {
      transform: none;
    }
  }
`

function CheckIcon({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const ref = useRef(null)

  const submit = (event) => {
    event.preventDefault()

    // Existing demo behavior preserved.
    // Connect your backend / CRM here to save submissions.
    setSent(true)
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (
      reducedMotion ||
      typeof IntersectionObserver === 'undefined'
    ) {
      element.classList.add('ct-in')

      return () => {
        element.classList.remove('ct-in')
      }
    }

    element.classList.add('ct-armed')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        element.classList.add('ct-in')
        observer.disconnect()
      },
      { threshold: 0.05 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      element.classList.remove('ct-armed', 'ct-in')
    }
  }, [])

  return (
    <section
      id="contact"
      ref={ref}
      className="content-contact"
      aria-labelledby="content-contact-title"
    >
      <style>{css}</style>

      <div
        className="ct-decoration ct-decoration-top"
        aria-hidden="true"
      />

      <div
        className="ct-decoration ct-decoration-bottom"
        aria-hidden="true"
      />

      <Container>
        <div className="ct-layout">
          <div className="ct-copy">
            <div className="ct-rise">
              <div className="ct-accent" aria-hidden="true" />

              <h2 id="content-contact-title" className="ct-title">
                Let’s Build a Better Destination for{' '}
                <span className="ct-title-accent">
                  Your Next Click.
                </span>
              </h2>

              <p className="ct-description">
                Your offer deserves a page that communicates its value
                clearly and makes it easy for the right people to connect.
                Tell us about your business, the service you want to promote
                and what you want your landing page to achieve.
              </p>
            </div>

            <div
              className="ct-rise"
              style={{ '--ct-delay': '100ms' }}
            >
              <div className="ct-discussion">
                <div className="ct-discussion-heading">
                  <span className="ct-icon" aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="3"
                      />
                      <path d="M16 3v4M8 3v4M3 11h18" />
                      <path d="m9 16 2 2 4-4" />
                    </svg>
                  </span>

                  <h3>Book Your One-to-One Landing Page Call.</h3>
                </div>

                <p className="ct-discussion-intro">
                  On the call, we’ll discuss:
                </p>

                <ul className="ct-points">
                  {points.map((point) => (
                    <li key={point} className="ct-point">
                      <span className="ct-check">
                        <CheckIcon />
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="ct-form-column ct-rise"
            style={{ '--ct-delay': '160ms' }}
          >
            {sent ? (
              <div
                className="ct-form-card ct-success"
                role="status"
                aria-live="polite"
              >
                <div>
                  <div className="ct-success-icon">
                    <CheckIcon size={32} />
                  </div>

                  <h3>Thank you—we’ve got your details.</h3>

                  <p>
                    We’ll contact you to arrange a suitable time.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="ct-form-card ct-form"
              >
                <div className="ct-field-grid">
                  <label className="ct-label">
                    Full Name
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      className="ct-field"
                    />
                  </label>

                  <label className="ct-label">
                    Business / Brand Name
                    <input
                      required
                      type="text"
                      name="brand"
                      autoComplete="organization"
                      className="ct-field"
                    />
                  </label>

                  <label className="ct-label">
                    Email Address
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="ct-field"
                    />
                  </label>

                  <label className="ct-label">
                    Phone / WhatsApp Number
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className="ct-field"
                    />
                  </label>
                </div>

                <label className="ct-label">
                  Your Business Type

                  <span className="ct-select-wrap">
                    <select
                      name="type"
                      className="ct-field ct-select"
                    >
                      {['Coach', 'Consultant', 'Trainer', 'Other'].map(
                        (option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>

                    <svg
                      className="ct-select-arrow"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </label>

                <label className="ct-label">
                  Current Website or Landing Page (optional)
                  <input
                    type="url"
                    name="site"
                    placeholder="https://"
                    className="ct-field"
                  />
                </label>

                <label className="ct-label">
                  What Would You Like Your Page to Achieve?
                  <textarea
                    required
                    rows={4}
                    name="goal"
                    className="ct-field ct-textarea"
                  />
                </label>

                <button type="submit" className="ct-submit">
                  <span>Yes! Help Me Increase My Revenue.</span>

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </button>

                <p className="ct-form-note">
                  Share your details, and we’ll contact you to arrange a
                  suitable time.
                </p>

                <p className="ct-privacy">
                  By submitting this form, you agree to be contacted by Your
                  Brand Name about your enquiry. Please read our{' '}
                  <a href="#">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}