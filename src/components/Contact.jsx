import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ==========================================================
   Contact.jsx  (Tailwind utility classes only) - light + mobile-first
   Flow:  Button click -> Intro screen (photo + points + Continue)
          -> Your details form -> 5 questions (one per step, Next)
          -> Thank you screen
   Layout: header/close fixed, content scrolls, buttons ALWAYS
           pinned at the bottom (works on small phones too).
   Data:   saved to Google Sheet via Apps Script (Date + Time added there)
   Open it with:  window.dispatchEvent(new Event('open-contact-popup'))
   Meta Pixel: Lead event fires after successful form submit
   ========================================================== */

// ---------- EDIT THESE ----------
const HOST_NAME = 'Sohil'
const HOST_IMAGE = '/images/Neeraj20.png' // file lives in /public/images
// Google Apps Script Web App URL (saves every enquiry to the Google Sheet)
const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx4-zXZLsl3B4M4lgpDIWFUROF_GvseaDfzeaQHKUT6BDQAWSuO31MFjFle5e4MfZrQ/exec'
const FORM_TITLE = 'Creative Crew — Growth Consultation Form'

const introPoints = [
  'Discover what’s preventing your landing page from converting visitors into leads and identify opportunities to improve conversion rates by up to 10X.',
  'Learn how to get the most out of your advertising budget and attract more qualified leads for your business.',
  'Gain valuable insights from proven funnel strategies, backed by experience in landing page optimization and conversion-focused marketing.',
  'Identify key improvements in your landing page and sales funnel that can help turn more leads into paying customers and increase your return on ad spend (ROAS) by up to 5X.',
]

const questions = [
  {
    id: 'goal',
    type: 'choice',
    title: 'What is the primary goal you want to achieve for your business?',
    options: [
      'Generate more qualified leads',
      'Increase sales and conversions',
      'Improve my landing page conversion rate',
      'Reduce customer acquisition costs',
      'Build a complete lead generation funnel',
      'Other',
    ],
  },
  {
    id: 'link',
    type: 'text',
    title: 'Please share your Instagram, LinkedIn, website, or landing page link.',
    placeholder: 'Paste your profile or website URL here.',
  },
  {
    id: 'source',
    type: 'choice',
    title: 'How are you currently attracting new leads or customers?',
    options: [
      'Facebook and Instagram Ads',
      'Google Ads',
      'Organic social media marketing',
      'Referrals and word-of-mouth',
      'Direct outreach or cold calling',
      'A combination of paid ads and organic marketing',
      'I’m not generating consistent leads yet',
      'Other',
    ],
  },
  {
    id: 'invest',
    type: 'choice',
    title:
      'Are you ready to invest in a professional landing page and funnel to improve your lead generation and conversions? (Creative Crew’s services start at ₹3,500.)',
    options: [
      'Yes, I’m ready to get started',
      'Yes, but I’d like to discuss my requirements first',
      'Possibly, depending on the proposed solution',
      'I’m just exploring my options',
      'Not at the moment',
    ],
  },
  {
    id: 'timeline',
    type: 'choice',
    title: 'When are you planning to launch a new landing page or improve your existing one?',
    options: [
      'Within the next 7 days',
      'Within 2–4 weeks',
      'Within the next 1–2 months',
      'Within 3 months',
      'I’m currently exploring options without a fixed timeline',
    ],
  },
]

// Steps: 0 intro | 1 details | 2..(1+questions.length) questions | last = thank you
const DETAILS_STEP = 1
const FIRST_Q = 2
const DONE_STEP = FIRST_Q + questions.length
const TOTAL_FORM_STEPS = 1 + questions.length // details + questions

const initialDetails = { fullName: '', businessName: '', email: '', phone: '' }

/* ==================== Shared classes ==================== */

const LABEL = 'text-[12.5px] font-bold leading-[1.3] text-[#2a2140]'

const FIELD =
  'block m-0 h-[44px] w-full min-w-0 rounded-xl border border-[#e2dcf2] bg-[#fbfaff] px-3.5 py-2.5 font-[inherit] text-base leading-normal text-[#14111f] outline-none ' +
  'transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#a7a2b8] ' +
  'hover:border-[#cdbff3] focus:border-[#7c3aed] focus:bg-white focus:shadow-[0_0_0_3px_rgba(124,58,237,.14)]'

const YELLOW_BTN =
  'group relative inline-flex min-h-[46px] w-full min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-normal rounded-[14px] border border-[#f3b01f] ' +
  'bg-[linear-gradient(180deg,#ffee82,#ffe04e_48%,#ffca30)] px-4 py-2 text-center font-[inherit] text-[15px] font-extrabold leading-[1.25] text-[#2e0c4d] ' +
  'shadow-[inset_0_1px_0_#fff8c4,0_3px_0_#d18f0a,0_10px_18px_-10px_#f5b323a0] ' +
  'transition-[transform,box-shadow,filter] duration-200 touch-manipulation [-webkit-tap-highlight-color:transparent] ' +
  'hover:enabled:-translate-y-px hover:enabled:brightness-105 ' +
  'active:enabled:translate-y-[2px] active:enabled:shadow-[inset_0_1px_0_#fff8c4,0_1px_0_#d18f0a] ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] ' +
  'disabled:cursor-not-allowed disabled:opacity-55'

const BACK_BTN =
  'inline-flex h-[46px] shrink-0 cursor-pointer items-center justify-center rounded-[14px] border border-[#e2dcf2] bg-white px-4 text-[14.5px] font-bold text-[#5b21b6] transition-colors duration-200 hover:bg-[#f4efff] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] disabled:cursor-not-allowed disabled:opacity-55'

const GRADIENT_TEXT =
  'bg-[linear-gradient(90deg,#7c3aed,#a855f7)] bg-clip-text text-transparent'

/* ==================== Icons ==================== */

function CheckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ==================== Main component ==================== */

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [step, setStep] = useState(0)
  const [details, setDetails] = useState(initialDetails)
  const [answers, setAnswers] = useState({})
  const [otherText, setOtherText] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const closeTimer = useRef(null)
  const closeRef = useRef(() => {})
  const scrollRef = useRef(null)

  // Open from anywhere: window.dispatchEvent(new Event('open-contact-popup'))
  useEffect(() => {
    const openPopup = () => {
      clearTimeout(closeTimer.current)
      setClosing(false)
      setStep(0)
      setSubmitError('')
      setIsOpen(true)
    }
    window.addEventListener('open-contact-popup', openPopup)
    return () => {
      window.removeEventListener('open-contact-popup', openPopup)
      clearTimeout(closeTimer.current)
    }
  }, [])

  // Lock page scroll + Escape key
  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  // Scroll content to top on every step change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [step])

  const closePopup = () => {
    if (isSubmitting || closing) return
    setClosing(true)
    closeTimer.current = setTimeout(() => {
      setIsOpen(false)
      setClosing(false)
      if (step === DONE_STEP) {
        setStep(0)
        setDetails(initialDetails)
        setAnswers({})
        setOtherText({})
      }
    }, 200)
  }
  closeRef.current = closePopup

  const goNext = () => {
    setSubmitError('')
    setStep((s) => s + 1)
  }
  const goBack = () => {
    setSubmitError('')
    setStep((s) => Math.max(0, s - 1))
  }

  const updateDetail = (e) => {
    const { name, value } = e.target
    setDetails((p) => ({ ...p, [name]: value }))
  }

  const submitAll = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    const payload = {
      form: FORM_TITLE,
      ...details,
      answers: questions.map((q) => ({
        question: q.title,
        answer:
          answers[q.id] === 'Other'
            ? `Other: ${otherText[q.id] || ''}`
            : answers[q.id],
      })),
    }

    try {
      if (!FORM_ENDPOINT) {
        throw new Error(
          'The contact form is not connected yet. Please add your form API URL (FORM_ENDPOINT) to receive enquiries.'
        )
      }

      // Google Apps Script: text/plain + no-cors avoids the CORS preflight error.
      // Date & Time are added automatically in the Google Sheet by the script.
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })

      // Meta Pixel: fire Lead event after successful submit
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', { content_name: '10X Landing Page Growth Call' })
      }

      setStep(DONE_STEP)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ---------- Progress bar ---------- */

  const progress = (n) => (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center justify-between text-[12px] font-bold text-[#7c3aed]">
        <span>
          Step {n} of {TOTAL_FORM_STEPS}
        </span>
        <span className="text-[#8b8798]">{Math.round((n / TOTAL_FORM_STEPS) * 100)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#efe9fc]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#7c3aed,#a855f7,#ffe04e)] transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: `${(n / TOTAL_FORM_STEPS) * 100}%` }}
        />
      </div>
    </div>
  )

  /* ---------- Step renderers: each returns { body, footer } ---------- */

  const renderIntro = () => ({
    body: (
      <div className="flex flex-col items-center text-center">
        {/* Plain round photo - no ring / glow effect */}
        <img
          src={HOST_IMAGE}
          alt={HOST_NAME}
          className="h-16 w-16 rounded-full bg-[#efe7ff] object-cover object-top min-[561px]:h-[84px] min-[561px]:w-[84px]"
        />

        <h3
          id="ct-popup-title"
          className="ct-display m-0 mt-2.5 text-[21px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14111f] min-[561px]:text-[26px]"
        >
          {HOST_NAME}&rsquo;s <span className={GRADIENT_TEXT}>10X Landing Page</span> Growth Call
        </h3>

        <p
          id="ct-popup-description"
          className="m-0 mt-2 text-[12.5px] font-bold leading-[1.4] text-[#d4161d] min-[561px]:text-[14px]"
        >
          Exclusively for serious coaches, consultants, and business owners who are ready to invest
          in their growth.
        </p>

        <ol className="m-0 mt-3.5 grid w-full list-none gap-2 p-0 text-left">
          {introPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-[#ece6fb] bg-[#faf8ff] px-2.5 py-2 text-[12.5px] leading-[1.45] text-[#4b475f] min-[561px]:px-3 min-[561px]:py-2.5 min-[561px]:text-[13px]"
            >
              <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[11px] font-extrabold text-white">
                {i + 1}
              </span>
              <span className="min-w-0">{point}</span>
            </li>
          ))}
        </ol>

        <p className="m-0 mt-3 text-center text-[11.5px] font-medium text-[#8a869a]">
          Creative Crew &mdash; growth, built around your business.
        </p>
      </div>
    ),
    footer: (
      <button type="button" onClick={goNext} className={YELLOW_BTN}>
        Continue
        <span
          className="text-[18px] leading-none transition-transform duration-200 group-hover:translate-x-[3px]"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </button>
    ),
  })

  const renderDetails = () => ({
    body: (
      <div>
        {progress(1)}
        <small className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-[#f1eaff] px-3 py-1 text-[12px] font-bold text-[#7c3aed]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
          {FORM_TITLE}
        </small>
        <h3
          id="ct-popup-title"
          className="ct-display m-0 mb-1 text-[22px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14111f]"
        >
          Let&rsquo;s talk <span className={GRADIENT_TEXT}>growth.</span>
        </h3>
        <p id="ct-popup-description" className="m-0 mb-3.5 text-[13px] leading-[1.5] text-[#5b5870]">
          Share your details so we can reach you.
        </p>

        <form
          id="ct-details-form"
          className="grid grid-cols-1 gap-x-3 gap-y-3 min-[561px]:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            goNext()
          }}
        >
          {[
            ['fullName', 'Full Name *', 'text', 'Your full name', 'name', 'ct-full-name'],
            ['businessName', 'Business / Brand *', 'text', 'Your business name', 'organization', 'ct-business'],
            ['email', 'Email Address *', 'email', 'you@example.com', 'email', 'ct-email'],
            ['phone', 'Phone / WhatsApp *', 'tel', 'Your contact number', 'tel', 'ct-phone'],
          ].map(([name, label, type, ph, ac, id]) => (
            <div key={name} className="flex min-w-0 flex-col gap-1.5">
              <label className={LABEL} htmlFor={id}>
                {label}
              </label>
              <input
                id={id}
                name={name}
                type={type}
                value={details[name]}
                onChange={updateDetail}
                placeholder={ph}
                autoComplete={ac}
                required
                className={FIELD}
              />
            </div>
          ))}
        </form>
      </div>
    ),
    footer: (
      <div className="flex gap-3">
        <button type="button" onClick={goBack} className={BACK_BTN}>
          Back
        </button>
        {/* submit button lives in the pinned footer but still submits the form above */}
        <button type="submit" form="ct-details-form" className={YELLOW_BTN}>
          Next
          <span className="text-[18px] leading-none" aria-hidden="true">
            &rarr;
          </span>
        </button>
      </div>
    ),
  })

  const renderQuestion = (index) => {
    const q = questions[index]
    const value = answers[q.id] || ''
    const isLast = index === questions.length - 1
    const needsOther = value === 'Other'
    const valid =
      q.type === 'text'
        ? value.trim().length > 0
        : value && (!needsOther || (otherText[q.id] || '').trim().length > 0)

    const handleNext = () => {
      if (!valid || isSubmitting) return
      if (isLast) submitAll()
      else goNext()
    }

    return {
      body: (
        <div>
          {progress(2 + index)}

          <p className="m-0 mb-1 text-[12px] font-bold text-[#7c3aed]">
            Question {index + 1} of {questions.length}
          </p>
          <h3
            id="ct-popup-title"
            className="ct-display m-0 mb-3 text-[18px] font-extrabold leading-[1.3] tracking-[-0.02em] text-[#14111f] min-[561px]:text-[21px]"
          >
            {q.title} <span className="text-[#7c3aed]">*</span>
          </h3>
          <span id="ct-popup-description" className="sr-only">
            Question {index + 1} of {questions.length}
          </span>

          {q.type === 'text' ? (
            <input
              autoFocus
              value={value}
              onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              placeholder={q.placeholder}
              className={FIELD}
              aria-label={q.title}
            />
          ) : (
            <div role="radiogroup" aria-label={q.title} className="grid gap-2">
              {q.options.map((opt) => {
                const selected = value === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                    className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13.5px] font-semibold leading-[1.35] transition-[border-color,background-color,box-shadow] duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a98af0] ${
                      selected
                        ? 'border-[#7c3aed] bg-[#f4efff] text-[#2e0c4d] shadow-[0_0_0_3px_rgba(124,58,237,.14)]'
                        : 'border-[#e2dcf2] bg-[#fbfaff] text-[#2a2140] hover:border-[#cdbff3]'
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
                        selected
                          ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                          : 'border-[#cfc7e6] bg-white text-transparent'
                      }`}
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="min-w-0">{opt}</span>
                  </button>
                )
              })}

              {needsOther && (
                <input
                  autoFocus
                  value={otherText[q.id] || ''}
                  onChange={(e) => setOtherText((p) => ({ ...p, [q.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder="Please tell us more..."
                  className={FIELD}
                  aria-label="Other, please specify"
                />
              )}
            </div>
          )}

          {submitError && (
            <p
              className="m-0 mt-3 rounded-[11px] border border-[#ffd7dc] bg-[#fff1f2] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[#9d2737]"
              role="alert"
            >
              {submitError}
            </p>
          )}
        </div>
      ),
      footer: (
        <div className="flex gap-3">
          <button type="button" onClick={goBack} disabled={isSubmitting} className={BACK_BTN}>
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!valid || isSubmitting}
            className={YELLOW_BTN}
          >
            {isSubmitting ? 'Please wait...' : isLast ? "Yes! Let's Grow My Revenue" : 'Next'}
            {!isSubmitting && (
              <span className="text-[18px] leading-none" aria-hidden="true">
                &rarr;
              </span>
            )}
          </button>
        </div>
      ),
    }
  }

  const renderDone = () => ({
    body: (
      <div className="flex min-h-[240px] flex-col items-start justify-center" aria-live="polite">
        <div className="mb-4 grid h-14 w-14 animate-[ctPop_.4s_cubic-bezier(.22,1,.36,1)_both] place-items-center rounded-[16px] bg-[#efe7ff] text-[#5b21b6] motion-reduce:animate-none">
          <CheckIcon className="h-[26px] w-[26px]" />
        </div>
        <h3
          id="ct-popup-title"
          className="ct-display m-0 mb-2 text-[28px] font-extrabold tracking-[-0.03em] text-[#14111f]"
        >
          Thank you!
        </h3>
        <p id="ct-popup-description" className="m-0 text-[14.5px] leading-[1.65] text-[#5b5870]">
          Your enquiry has been submitted successfully. Our team will get back to you soon.
        </p>
      </div>
    ),
    footer: (
      <button className={YELLOW_BTN} type="button" onClick={closePopup}>
        Done
      </button>
    ),
  })

  let view
  if (step === 0) view = renderIntro()
  else if (step === DETAILS_STEP) view = renderDetails()
  else if (step === DONE_STEP) view = renderDone()
  else view = renderQuestion(step - FIRST_Q)

  return (
    <div className="font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
      <style>{keyframes}</style>

      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] flex items-center justify-center overscroll-contain bg-[rgba(20,13,39,.7)] p-2 font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased [-webkit-backdrop-filter:blur(5px)] [backdrop-filter:blur(5px)] min-[561px]:p-5 [&_*]:box-border ${
              closing
                ? 'animate-[ctOverlayOut_.2s_ease_both]'
                : 'animate-[ctOverlayIn_.2s_ease_both]'
            } motion-reduce:animate-none`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closePopup()
            }}
          >
            {/* Card: header line + scrolling content + pinned footer */}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ct-popup-title"
              aria-describedby="ct-popup-description"
              className={`relative flex max-h-[calc(100dvh-16px)] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#ffffff,#fcfaff)] shadow-[0_30px_80px_-20px_rgba(91,33,182,.55),0_8px_24px_rgba(20,13,39,.2)] min-[561px]:max-h-[calc(100dvh-40px)] ${
                closing
                  ? 'animate-[ctModalOut_.2s_ease-in_both]'
                  : 'animate-[ctModalIn_.35s_cubic-bezier(.22,1,.36,1)_both]'
              } motion-reduce:animate-none`}
            >
              {/* Static accent line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-[linear-gradient(90deg,#7c3aed,#a855f7,#ffe04e)]"
              />

              {/* Close button - fixed, never scrolls away */}
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close contact form"
                className="absolute right-2.5 top-3 z-20 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[#e6dffa] bg-white p-0 text-[#2a2140] shadow-[0_4px_12px_-6px_rgba(91,33,182,.35)] transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:bg-[#7c3aed] hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0]"
              >
                <CloseIcon />
              </button>

              {/* Scrolling content */}
              <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-3 pt-6 min-[561px]:px-8 min-[561px]:pt-8 [scrollbar-width:thin]"
              >
                <div
                  key={step}
                  className={
                    step === 0 || step === DONE_STEP
                      ? ''
                      : 'animate-[ctSlide_.3s_cubic-bezier(.22,1,.36,1)_both] motion-reduce:animate-none'
                  }
                >
                  {view.body}
                </div>
              </div>

              {/* Pinned footer - buttons always visible on mobile */}
              <div className="shrink-0 border-t border-[#efe9fc] bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 min-[561px]:px-8 min-[561px]:pb-5">
                {view.footer}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

/* ==================== Font + keyframes ==================== */

const keyframes = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

.ct-display { font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif; }

@keyframes ctOverlayIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes ctOverlayOut { from { opacity: 1; } to { opacity: 0; } }

@keyframes ctModalIn {
  from { opacity: 0; transform: translateY(20px) scale(.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ctModalOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(12px) scale(.97); }
}

@keyframes ctSlide {
  from { opacity: 0; transform: translateX(18px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes ctPop {
  0% { transform: scale(.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
`