
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Container } from './ui'

const points = [
  'High-converting landing pages',
  'Smart automation and follow-ups',
  'Custom tracking and analytics',
]

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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

const css = `
  .ct-popup-root {
    --ct-purple: #7755e8;
    --ct-purple-dark: #5135a9;
    --ct-yellow: #f6d85b;
    --ct-ink: #171525;
    --ct-muted: #777487;
    font-family: inherit;
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
    background: rgba(16, 12, 32, .74);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    overflow-y: auto;
    overscroll-behavior: contain;
    animation: ctOverlayIn .22s ease both;
  }

  .ct-popup-modal {
    position: relative;
    isolation: isolate;
    width: min(100%, 960px);
    max-height: calc(100dvh - 48px);
    display: grid;
    grid-template-columns: .88fr 1.12fr;
    overflow: auto;
    background: #fff;
    border: 1px solid rgba(255,255,255,.65);
    border-radius: 24px;
    box-shadow:
      0 35px 100px rgba(12, 8, 30, .32),
      0 8px 24px rgba(12, 8, 30, .12);
    animation: ctModalIn .3s cubic-bezier(.2,.75,.25,1) both;
  }

  .ct-popup-close {
    position: absolute;
    z-index: 5;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    color: #40394f;
    background: rgba(255,255,255,.94);
    border: 1px solid #ebe7f5;
    border-radius: 50%;
    cursor: pointer;
    transition: background .2s, color .2s, transform .2s;
  }

  .ct-popup-close:hover {
    color: var(--ct-purple);
    background: #f0ebff;
    transform: rotate(90deg);
  }

  .ct-popup-close:focus-visible,
  .ct-popup-submit:focus-visible,
  .ct-popup-done:focus-visible {
    outline: 3px solid rgba(119,85,232,.45);
    outline-offset: 3px;
  }

  .ct-popup-side {
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    min-width: 0;
    padding: 44px 32px 30px;
    color: #fff;
    background:
      radial-gradient(
        ellipse at 8% 5%,
        rgba(246,216,91,.20),
        transparent 35%
      ),
      radial-gradient(
        ellipse at 100% 100%,
        rgba(153,125,255,.35),
        transparent 38%
      ),
      linear-gradient(145deg, #25194e 0%, #5135a9 58%, #7957e8 100%);
    overflow: hidden;
  }

  .ct-popup-side::before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 260px;
    height: 260px;
    right: -145px;
    bottom: -130px;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 50%;
    box-shadow:
      0 0 0 28px rgba(255,255,255,.035),
      0 0 0 58px rgba(255,255,255,.025),
      0 0 0 90px rgba(255,255,255,.018);
    pointer-events: none;
  }

  .ct-popup-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    width: fit-content;
    max-width: 100%;
    padding: 9px 12px;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 100px;
    color: #fff;
    background: rgba(255,255,255,.09);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.25px;
  }

  .ct-popup-dot {
    flex-shrink: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ct-yellow);
    box-shadow: 0 0 12px rgba(246,216,91,.75);
  }

  .ct-popup-side h2 {
    margin: 26px 0 15px;
    max-width: 360px;
    color: #fff;
    font-size: clamp(30px, 3.1vw, 41px);
    font-weight: 750;
    line-height: 1.12;
    letter-spacing: -1.5px;
    text-wrap: balance;
  }

  .ct-popup-side h2 span {
    color: var(--ct-yellow);
  }

  .ct-popup-side p {
    margin: 0;
    max-width: 340px;
    color: rgba(255,255,255,.78);
    font-size: 13px;
    line-height: 1.85;
  }

  .ct-popup-points {
    display: grid;
    gap: 16px;
    margin: 29px 0 0;
    padding: 0;
    list-style: none;
  }

  .ct-popup-points li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255,255,255,.95);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.55;
  }

  .ct-popup-check {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 27px;
    height: 27px;
    color: var(--ct-yellow);
    background: rgba(246,216,91,.12);
    border: 1px solid rgba(246,216,91,.32);
    border-radius: 50%;
  }

  .ct-popup-side-note {
    position: relative;
    z-index: 1;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,.17);
    color: rgba(255,255,255,.67);
    font-size: 9px;
    font-weight: 650;
    letter-spacing: .7px;
    line-height: 1.8;
  }

  .ct-popup-form-area {
    min-width: 0;
    padding: 39px 35px 30px;
    background: #fff;
  }

  .ct-popup-form-head {
    padding-right: 37px;
    margin-bottom: 25px;
  }

  .ct-popup-form-head small {
    display: inline-block;
    margin-bottom: 10px;
    color: var(--ct-purple);
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 1.7px;
  }

  .ct-popup-form-head h3 {
    margin: 0 0 9px;
    color: var(--ct-ink);
    font-size: clamp(24px, 2.5vw, 29px);
    font-weight: 750;
    letter-spacing: -.9px;
    line-height: 1.2;
  }

  .ct-popup-form-head p {
    margin: 0;
    color: var(--ct-muted);
    font-size: 12px;
    line-height: 1.8;
  }

  .ct-popup-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 17px 13px;
  }

  .ct-popup-field {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
  }

  .ct-popup-field.full {
    grid-column: 1 / -1;
  }

  .ct-popup-field label {
    color: #302d40;
    font-size: 11px;
    font-weight: 750;
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
    padding: 12px 13px;
    border: 1px solid #e6e3ee;
    border-radius: 10px;
    outline: none;
    color: #211e31;
    background: #fbfaff;
    font-family: inherit;
    font-size: 12px;
    line-height: 1.5;
    transition:
      border-color .2s,
      box-shadow .2s,
      background .2s;
  }

  .ct-popup-field input,
  .ct-popup-field select {
    height: 45px;
  }

  .ct-popup-field select {
    cursor: pointer;
  }

  .ct-popup-field textarea {
    min-height: 91px;
    resize: vertical;
  }

  .ct-popup-field input:hover,
  .ct-popup-field select:hover,
  .ct-popup-field textarea:hover {
    border-color: #cfc5f4;
  }

  .ct-popup-field input:focus,
  .ct-popup-field select:focus,
  .ct-popup-field textarea:focus {
    border-color: var(--ct-purple);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(119,85,232,.11);
  }

  .ct-popup-field input::placeholder,
  .ct-popup-field textarea::placeholder {
    color: #aaa6b7;
    opacity: 1;
  }

  .ct-popup-submit {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 49px;
    margin-top: 1px;
    padding: 13px 18px;
    border: 1px solid rgba(230,190,47,.3);
    border-radius: 11px;
    color: #211b36;
    background: linear-gradient(105deg, #f7dc64 0%, #f4cb43 100%);
    box-shadow: 0 6px 17px rgba(231,193,56,.19);
    font-family: inherit;
    font-size: 12px;
    font-weight: 850;
    cursor: pointer;
    transition:
      transform .2s,
      box-shadow .2s,
      filter .2s;
  }

  .ct-popup-submit > span {
    font-size: 18px;
    line-height: 1;
    transition: transform .2s;
  }

  .ct-popup-submit:hover {
    transform: translateY(-2px);
    filter: saturate(1.06);
    box-shadow: 0 10px 23px rgba(231,193,56,.3);
  }

  .ct-popup-submit:hover > span {
    transform: translateX(3px);
  }

  .ct-popup-submit:disabled {
    opacity: .65;
    cursor: not-allowed;
    transform: none;
  }

  .ct-popup-privacy {
    grid-column: 1 / -1;
    margin: -3px 0 0;
    color: #928da1;
    font-size: 10px;
    line-height: 1.7;
    text-align: center;
  }

  .ct-popup-error {
    grid-column: 1 / -1;
    margin: 0;
    padding: 10px 12px;
    color: #9d2737;
    background: #fff1f2;
    border: 1px solid #ffd7dc;
    border-radius: 9px;
    font-size: 12px;
    line-height: 1.6;
  }

  .ct-popup-success {
    min-height: 370px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .ct-popup-success-icon {
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    margin-bottom: 22px;
    border-radius: 17px;
    color: #4c2fa9;
    background: #eee8ff;
  }

  .ct-popup-success h3 {
    margin: 0 0 11px;
    color: var(--ct-ink);
    font-size: 29px;
    font-weight: 750;
    letter-spacing: -.8px;
  }

  .ct-popup-success p {
    margin: 0 0 24px;
    color: var(--ct-muted);
    font-size: 13px;
    line-height: 1.8;
  }

  .ct-popup-done {
    padding: 12px 25px;
    border: 0;
    border-radius: 10px;
    color: #211b36;
    background: var(--ct-yellow);
    font-family: inherit;
    font-size: 12px;
    font-weight: 850;
    cursor: pointer;
    transition: transform .2s;
  }

  .ct-popup-done:hover {
    transform: translateY(-2px);
  }

  @keyframes ctOverlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes ctModalIn {
    from {
      opacity: 0;
      transform: translateY(15px) scale(.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (min-width: 681px) and (max-height: 760px) {
    .ct-popup-modal {
      max-height: calc(100dvh - 32px);
    }

    .ct-popup-side {
      padding-top: 32px;
      padding-bottom: 24px;
      gap: 22px;
    }

    .ct-popup-side h2 {
      margin-top: 19px;
      font-size: 32px;
    }

    .ct-popup-points {
      gap: 11px;
      margin-top: 20px;
    }

    .ct-popup-form-area {
      padding-top: 29px;
      padding-bottom: 24px;
    }

    .ct-popup-form-head {
      margin-bottom: 18px;
    }

    .ct-popup-form {
      gap: 12px;
    }
  }

  @media (max-width: 680px) {
    .ct-popup-overlay {
      align-items: flex-start;
      padding: 12px;
    }

    .ct-popup-modal {
      width: 100%;
      max-height: calc(100dvh - 24px);
      grid-template-columns: minmax(0, 1fr);
      border-radius: 19px;
    }

    .ct-popup-side {
      gap: 20px;
      padding: 25px 23px 23px;
    }

    .ct-popup-side h2 {
      max-width: 440px;
      margin: 17px 0 9px;
      padding-right: 8px;
      font-size: clamp(27px, 6vw, 33px);
      letter-spacing: -.9px;
    }

    .ct-popup-side p {
      max-width: 480px;
      font-size: 12px;
      line-height: 1.75;
    }

    .ct-popup-points {
      gap: 10px;
      margin-top: 18px;
    }

    .ct-popup-points li {
      gap: 10px;
      font-size: 12px;
    }

    .ct-popup-check {
      width: 24px;
      height: 24px;
    }

    .ct-popup-side-note {
      display: none;
    }

    .ct-popup-form-area {
      padding: 25px 23px 23px;
    }

    .ct-popup-form-head {
      margin-bottom: 19px;
      padding-right: 38px;
    }

    .ct-popup-form-head h3 {
      font-size: 25px;
    }

    .ct-popup-form {
      gap: 14px 11px;
    }

    .ct-popup-field input,
    .ct-popup-field select {
      height: 44px;
    }

    .ct-popup-close {
      top: 10px;
      right: 10px;
      width: 35px;
      height: 35px;
    }
  }

  @media (max-width: 390px) {
    .ct-popup-form {
      grid-template-columns: minmax(0, 1fr);
    }

    .ct-popup-field.full,
    .ct-popup-submit,
    .ct-popup-privacy,
    .ct-popup-error {
      grid-column: auto;
    }

    .ct-popup-side {
      padding: 22px 19px 20px;
    }

    .ct-popup-side h2 {
      padding-right: 0;
      font-size: 27px;
    }

    .ct-popup-form-area {
      padding: 23px 19px 21px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ct-popup-overlay,
    .ct-popup-modal {
      animation: none;
    }

    .ct-popup-close,
    .ct-popup-submit,
    .ct-popup-submit > span,
    .ct-popup-done {
      transition: none;
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
    if (!isOpen) return

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
                <div>
                  <div className="ct-popup-eyebrow">
                    <span className="ct-popup-dot" />
                    LET'S GROW TOGETHER
                  </div>

                  <h2>
                    Turn More Clicks Into <span>Customers.</span>
                  </h2>

                  <p id="ct-popup-description">
                    Tell us about your business. Let's build a smarter growth
                    system that turns more leads into paying customers.
                  </p>

                  <ul className="ct-popup-points">
                    {points.map((point) => (
                      <li key={point}>
                        <span className="ct-popup-check">
                          <CheckIcon />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ct-popup-side-note">
                  CREATIVE CREW · GROWTH, BUILT AROUND YOUR BUSINESS
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
                      className="ct-popup-done"
                      type="button"
                      onClick={closePopup}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="ct-popup-form-head">
                      <small>GET IN TOUCH</small>
                      <h3 id="ct-popup-title">Let's talk growth.</h3>
                      <p>
                        Share a few details and tell us what you'd like to
                        achieve.
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
                        className="ct-popup-submit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? 'Please wait...'
                          : "Let's Grow My Revenue"}

                        {!isSubmitting && (
                          <span aria-hidden="true">→</span>
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
