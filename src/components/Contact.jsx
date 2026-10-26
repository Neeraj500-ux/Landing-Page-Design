import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ==========================================================
   Contact.jsx  (Tailwind utility classes only) - compact version
   Flow:  Button click -> Intro screen (photo + points + Continue)
          -> Your details form -> 5 questions (one per step, Next)
          -> Thank you screen
   Open it with:  window.dispatchEvent(new Event('open-contact-popup'))
   Meta Pixel: Lead event fires after successful form submit
   ========================================================== */

// ---------- EDIT THESE ----------
const HOST_NAME = 'Sohil'
const HOST_IMAGE = '/images/Neeraj20.png' // file lives in /public/images
const FORM_ENDPOINT = '' // e.g. 'https://formspree.io/f/xxxx' or your API URL

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

const RISE =
  'opacity-0 animate-[ctRise_.5s_cubic-bezier(.22,1,.36,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100'
const rise = (n, base = 40, gap = 55) => ({ animationDelay: `${base + n * gap}ms` })

const FLOW =
  'bg-[length:200%_100%] animate-[ctFlow_6s_ease-in-out_infinite_alternate] motion-reduce:animate-none'

const LABEL = 'text-[12.5px] font-bold leading-[1.3] text-[#2a2140]'

const FIELD =
  'block m-0 h-[46px] w-full min-w-0 rounded-xl border border-[#e2dcf2] bg-[#fbfaff] px-3.5 py-2.5 font-[inherit] text-base leading-normal text-[#14111f] outline-none ' +
  'transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#a7a2b8] ' +
  'hover:border-[#cdbff3] focus:border-[#7c3aed] focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,.14)]'

const YELLOW_BTN =
  'group relative isolate inline-flex min-h-[48px] w-full min-w-0 cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-normal rounded-[14px] border border-[#f3b01f] ' +
  'bg-[linear-gradient(180deg,#ffee82,#ffe04e_48%,#ffca30)] px-[clamp(16px,4vw,26px)] py-2.5 text-center font-[inherit] text-[clamp(14.5px,1.4vw,16px)] font-extrabold leading-[1.3] text-[#2e0c4d] ' +
  'shadow-[inset_0_1px_0_#fff8c4,inset_0_-2px_4px_#f5b2144d,0_4px_0_#d18f0a,0_14px_24px_-10px_#f5b323a0] ' +
  'transition-[transform,box-shadow,filter] duration-200 touch-manipulation [-webkit-tap-highlight-color:transparent] ' +
  'hover:enabled:-translate-y-[2px] hover:enabled:brightness-105 hover:enabled:shadow-[inset_0_1px_0_#fff8c4,0_6px_0_#d18f0a,0_20px_32px_-12px_#f5b323c0] ' +
  'active:enabled:translate-y-[3px] active:enabled:shadow-[inset_0_1px_0_#fff8c4,0_1px_0_#d18f0a,0_8px_16px_-8px_#f5b323a0] ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] ' +
  'disabled:cursor-not-allowed disabled:opacity-55 ' +
  'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-1/2 before:top-0 before:-z-10 before:bg-[linear-gradient(180deg,#ffffff40,transparent)] ' +
  'after:pointer-events-none after:absolute after:inset-y-0 after:-left-[45%] after:-z-10 after:w-[32%] after:animate-[ctShine_5.5s_ease-in-out_2s_infinite] after:bg-[linear-gradient(100deg,transparent,#ffffff99,transparent)] motion-reduce:after:hidden'

const BACK_BTN =
  'inline-flex h-[48px] shrink-0 cursor-pointer items-center justify-center rounded-[14px] border border-[#e2dcf2] bg-white px-4 text-[14.5px] font-bold text-[#5b21b6] transition-colors duration-200 hover:bg-[#f4efff] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] disabled:cursor-not-allowed disabled:opacity-55'

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

  // Scroll to top on every step change
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
    }, 220)
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
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Something went wrong. Please try again.')

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

  /* ---------- Step renderers ---------- */

  const renderIntro = () => (
    <div className="flex flex-col items-center text-center">
      <div
        className={`relative grid h-[84px] w-[84px] place-items-center rounded-full p-[3px] ${RISE}`}
        style={{
          ...rise(0),
          background: 'conic-gradient(from 0deg,#7c3aed,#a855f7,#ffe04e,#a855f7,#7c3aed)',
        }}
      >
        <img
          src={HOST_IMAGE}
          alt={HOST_NAME}
          className="h-full w-full rounded-full border-[3px] border-white bg-[#efe7ff] object-cover object-top"
        />
      </div>

      <p className={`m-0 mt-2 text-sm font-semibold text-[#5b5870] ${RISE}`} style={rise(1)}>
        {HOST_NAME}
      </p>

      <h3
        id="ct-popup-title"
        className={`ct-display m-0 mt-1.5 text-[22px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14111f] min-[561px]:text-[26px] ${RISE}`}
        style={rise(2)}
      >
        The{' '}
        <span
          className={`bg-[linear-gradient(90deg,#7c3aed,#a855f7,#7c3aed)] bg-clip-text text-transparent ${FLOW}`}
        >
          10X Landing Page
        </span>{' '}
        Growth Call With {HOST_NAME}
      </h3>

      <p
        id="ct-popup-description"
        className={`m-0 mt-2 text-[13.5px] font-bold leading-[1.45] text-[#d4161d] min-[561px]:text-[14.5px] ${RISE}`}
        style={rise(3)}
      >
        Only for serious Coaches, Consultants &amp; Business Owners ready to invest in Growth
      </p>

      <ol className="m-0 mt-4 grid w-full list-none gap-2 p-0 text-left">
        {introPoints.map((point, i) => (
          <li
            key={i}
            className={`flex items-start gap-2.5 rounded-xl border border-[#ece6fb] bg-[#faf8ff] px-3 py-2.5 text-[13px] leading-[1.5] text-[#4b475f] transition-[transform,border-color] duration-300 hover:translate-x-1 hover:border-[#cdbff3] ${RISE}`}
            style={rise(4 + i)}
          >
            <span className="mt-px grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#7c3aed] text-[11px] font-extrabold text-white">
              {i + 1}
            </span>
            <span className="min-w-0">{point}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={goNext}
        className={`${YELLOW_BTN} mt-4 ${RISE}`}
        style={rise(9)}
      >
        Continue
        <span
          className="text-[18px] leading-none transition-transform duration-[250ms] group-hover:translate-x-[3px]"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </button>
    </div>
  )

  const progress = (n) => (
    <div className="mb-3.5">
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

  const renderDetails = () => (
    <div>
      {progress(1)}
      <small className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-[#f1eaff] px-3 py-1 text-[12.5px] font-bold text-[#7c3aed]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
        Get in touch
      </small>
      <h3
        id="ct-popup-title"
        className="ct-display m-0 mb-1 text-[23px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14111f]"
      >
        Let&rsquo;s talk{' '}
        <span
          className={`bg-[linear-gradient(90deg,#7c3aed,#a855f7,#7c3aed)] bg-clip-text text-transparent ${FLOW}`}
        >
          growth.
        </span>
      </h3>
      <p id="ct-popup-description" className="m-0 mb-4 text-[13.5px] leading-[1.55] text-[#5b5870]">
        Share your details so we can reach you.
      </p>

      <form
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
        ].map(([name, label, type, ph, ac, id], i) => (
          <div
            key={name}
            className={`flex min-w-0 flex-col gap-1.5 ${RISE}`}
            style={rise(i, 60, 45)}
          >
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

        <div className="col-span-full mt-1 flex gap-3">
          <button type="button" onClick={goBack} className={BACK_BTN}>
            Back
          </button>
          <button type="submit" className={YELLOW_BTN}>
            Next
            <span className="text-[18px] leading-none" aria-hidden="true">
              &rarr;
            </span>
          </button>
        </div>
      </form>
    </div>
  )

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

    return (
      <div>
        {progress(2 + index)}

        <p className="m-0 mb-1 text-[12.5px] font-bold text-[#7c3aed]">
          Question {index + 1} of {questions.length}
        </p>
        <h3
          id="ct-popup-title"
          className="ct-display m-0 mb-3 text-[19px] font-extrabold leading-[1.3] tracking-[-0.02em] text-[#14111f] min-[561px]:text-[21px]"
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
            {q.options.map((opt, i) => {
              const selected = value === opt
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                  className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[14px] font-semibold leading-[1.35] opacity-0 animate-[ctRise_.4s_cubic-bezier(.22,1,.36,1)_forwards] transition-[border-color,background-color,box-shadow,transform] duration-200 [-webkit-tap-highlight-color:transparent] hover:-translate-y-px focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a98af0] motion-reduce:animate-none motion-reduce:opacity-100 ${
                    selected
                      ? 'border-[#7c3aed] bg-[#f4efff] text-[#2e0c4d] shadow-[0_0_0_3px_rgba(124,58,237,.14)]'
                      : 'border-[#e2dcf2] bg-[#fbfaff] text-[#2a2140] hover:border-[#cdbff3]'
                  }`}
                  style={{ animationDelay: `${i * 35}ms` }}
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
                className={`${FIELD} animate-[ctRise_.35s_ease_both]`}
                aria-label="Other, please specify"
              />
            )}
          </div>
        )}

        {submitError && (
          <p
            className="m-0 mt-3 animate-[ctShake_.4s_ease] rounded-[11px] border border-[#ffd7dc] bg-[#fff1f2] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[#9d2737] motion-reduce:animate-none"
            role="alert"
          >
            {submitError}
          </p>
        )}

        <div className="mt-4 flex gap-3">
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
      </div>
    )
  }

  const renderDone = () => (
    <div className="flex min-h-[260px] flex-col items-start justify-center" aria-live="polite">
      <div className="mb-4 grid h-14 w-14 animate-[ctPop_.5s_cubic-bezier(.22,1,.36,1)_both] place-items-center rounded-[16px] bg-[#efe7ff] text-[#5b21b6] motion-reduce:animate-none">
        <CheckIcon className="h-[26px] w-[26px]" />
      </div>
      <h3
        id="ct-popup-title"
        className="ct-display m-0 mb-2 text-[30px] font-extrabold tracking-[-0.03em] text-[#14111f]"
      >
        Thank you!
      </h3>
      <p id="ct-popup-description" className="m-0 mb-5 text-[14.5px] leading-[1.65] text-[#5b5870]">
        Your enquiry has been submitted successfully. Our team will get back to you soon.
      </p>
      <button className={`${YELLOW_BTN} !w-auto min-w-40`} type="button" onClick={closePopup}>
        Done
      </button>
    </div>
  )

  let content
  if (step === 0) content = renderIntro()
  else if (step === DETAILS_STEP) content = renderDetails()
  else if (step === DONE_STEP) content = renderDone()
  else content = renderQuestion(step - FIRST_Q)

  return (
    <div className="font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
      <style>{keyframes}</style>

      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto overscroll-contain bg-[radial-gradient(60%_50%_at_20%_10%,rgba(124,58,237,.38),transparent_70%),radial-gradient(50%_45%_at_85%_90%,rgba(168,85,247,.28),transparent_70%),rgba(20,13,39,.78)] p-2.5 font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased [-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)] max-[380px]:p-2 min-[561px]:items-center min-[561px]:p-5 [&_*]:box-border ${
              closing
                ? 'animate-[ctOverlayOut_.22s_ease_both]'
                : 'animate-[ctOverlayIn_.25s_ease_both]'
            } motion-reduce:animate-none`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closePopup()
            }}
          >
            {/* Rotating violet light around the card edge */}
            <div
              className={`relative isolate w-full max-w-[520px] overflow-hidden rounded-[25px] p-px shadow-[0_0_0_1px_rgba(255,255,255,.08),0_44px_110px_-20px_rgba(91,33,182,.7),0_10px_28px_rgba(20,13,39,.25)] ${
                closing
                  ? 'animate-[ctModalOut_.22s_ease-in_both]'
                  : 'animate-[ctModalIn_.5s_cubic-bezier(.22,1,.36,1)_both]'
              } motion-reduce:animate-none`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[250%] animate-[ctSpin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#a855f7_60deg,#7c3aed_120deg,#ffe04e_160deg,transparent_220deg)] motion-reduce:hidden"
              />

              <div
                ref={scrollRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ct-popup-title"
                aria-describedby="ct-popup-description"
                className="relative max-h-[calc(100dvh_-_20px)] overflow-y-auto overscroll-contain rounded-[24px] bg-[radial-gradient(60%_30%_at_100%_0%,rgba(124,58,237,.1),transparent_70%),linear-gradient(180deg,#ffffff,#fcfaff)] min-[561px]:max-h-[calc(100dvh_-_40px)]"
              >
                {/* Flowing violet accent line */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7c3aed,#a855f7,#ffe04e,#a855f7,#7c3aed)] ${FLOW}`}
                />

                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close contact form"
                  className="sticky top-2 z-20 float-right -mb-[44px] mr-2 mt-2 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[#e6dffa] bg-white p-0 text-[#2a2140] shadow-[0_6px_16px_-8px_rgba(91,33,182,.35)] transition-[background-color,color,transform] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] [-webkit-tap-highlight-color:transparent] hover:rotate-90 hover:bg-[#7c3aed] hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] motion-reduce:transition-none"
                >
                  <CloseIcon />
                </button>

                <div
                  key={step}
                  className="px-4 pb-5 pt-7 max-[380px]:px-3.5 min-[561px]:px-8 min-[561px]:pb-6 min-[561px]:pt-8"
                >
                  <div
                    className={
                      step === 0 || step === DONE_STEP
                        ? ''
                        : 'animate-[ctSlide_.4s_cubic-bezier(.22,1,.36,1)_both] motion-reduce:animate-none'
                    }
                  >
                    {content}
                  </div>

                  {step === 0 && (
                    <p className="m-0 mt-3 text-center text-[11.5px] font-medium text-[#8a869a]">
                      Creative Crew &mdash; growth, built around your business.
                    </p>
                  )}
                </div>
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
  0% { opacity: 0; transform: translateY(34px) scale(.92); filter: blur(8px); }
  60% { opacity: 1; filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
@keyframes ctModalOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(18px) scale(.96); }
}

@keyframes ctSpin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes ctRise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ctSlide {
  from { opacity: 0; transform: translateX(26px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes ctFlow {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

@keyframes ctShine {
  0%, 55% { transform: translateX(0) skewX(-20deg); }
  100% { transform: translateX(520%) skewX(-20deg); }
}

@keyframes ctPop {
  0% { transform: scale(.4); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes ctShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
`