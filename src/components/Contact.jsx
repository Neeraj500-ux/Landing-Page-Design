import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ==========================================================
   Contact.jsx  (100% Tailwind utility classes)
   - Same content, same behavior, same yellow CTA button.
   - Richer purple / violet look + more popup animation.
   - Only the font import and keyframes live in the small
     <style> block at the bottom (Tailwind can't declare them).
   - Arbitrary values only, so it works on Tailwind v3 and v4.
   ========================================================== */

const points = [
  'High-converting landing pages',
  'Smart automation and follow-ups',
  'Custom tracking and analytics',
]

const bars = [34, 48, 42, 63, 57, 78, 92]

// [left %, top %, delay s, size px]
const stars = [
  [12, 14, 0, 3],
  [78, 10, 1.2, 4],
  [90, 38, 2.1, 3],
  [20, 52, 0.7, 4],
  [64, 62, 1.7, 3],
  [8, 82, 2.6, 3],
  [48, 28, 3.1, 3],
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

/* ==================== Shared class strings ==================== */

// Staggered entrance (use with style={rise(n)})
const RISE =
  'opacity-0 animate-[ctRise_.7s_cubic-bezier(.22,1,.36,1)_forwards] motion-reduce:animate-none motion-reduce:opacity-100'

const rise = (step, base = 150, gap = 90) => ({
  animationDelay: `${base + step * gap}ms`,
})

// Moving violet -> purple -> yellow gradient
const FLOW =
  'bg-[length:200%_100%] animate-[ctFlow_6s_ease-in-out_infinite_alternate] motion-reduce:animate-none'

const LABEL = 'text-[13px] font-bold leading-[1.3] text-[#2a2140]'

const FIELD =
  'block m-0 h-[50px] w-full min-w-0 rounded-xl border border-[#e2dcf2] bg-[#fbfaff] px-3.5 py-3 font-[inherit] text-base leading-normal text-[#14111f] outline-none ' +
  'transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#a7a2b8] ' +
  'hover:border-[#cdbff3] focus:border-[#7c3aed] focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,.14)] ' +
  'min-[761px]:h-12 min-[761px]:text-[15px]'

const YELLOW_BTN =
  'group relative isolate inline-flex min-h-[54px] w-full min-w-0 cursor-pointer items-center justify-center gap-2.5 overflow-hidden whitespace-normal rounded-[14px] border border-[#f3b01f] ' +
  'bg-[linear-gradient(180deg,#ffee82,#ffe04e_48%,#ffca30)] px-[clamp(16px,4vw,30px)] py-3.5 text-center font-[inherit] text-[clamp(15px,1.4vw,17px)] font-extrabold leading-[1.35] text-[#2e0c4d] ' +
  'shadow-[inset_0_1px_0_#fff8c4,inset_0_-2px_4px_#f5b2144d,0_5px_0_#d18f0a,0_16px_28px_-10px_#f5b323a0] ' +
  'transition-[transform,box-shadow,filter] duration-200 touch-manipulation [-webkit-tap-highlight-color:transparent] ' +
  'hover:enabled:-translate-y-[3px] hover:enabled:brightness-105 hover:enabled:shadow-[inset_0_1px_0_#fff8c4,0_8px_0_#d18f0a,0_24px_38px_-12px_#f5b323c0] ' +
  'active:translate-y-[3px] active:shadow-[inset_0_1px_0_#fff8c4,0_2px_0_#d18f0a,0_8px_16px_-8px_#f5b323a0] ' +
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] ' +
  'disabled:cursor-not-allowed disabled:opacity-65 ' +
  'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-1/2 before:top-0 before:-z-10 before:bg-[linear-gradient(180deg,#ffffff40,transparent)] ' +
  'after:pointer-events-none after:absolute after:inset-y-0 after:-left-[45%] after:-z-10 after:w-[32%] after:animate-[ctShine_5.5s_ease-in-out_2s_infinite] after:bg-[linear-gradient(100deg,transparent,#ffffff99,transparent)] motion-reduce:after:hidden ' +
  'min-[761px]:min-h-14 min-[761px]:rounded-2xl'

/* ==================== Icons ==================== */

function CheckIcon({ delay = 0, className = 'h-4 w-4', draw = true }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          draw
            ? '[stroke-dasharray:24] [stroke-dashoffset:24] animate-[ctDraw_.6s_ease_forwards] motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]'
            : ''
        }
        style={draw ? { animationDelay: `${delay}ms` } : undefined}
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m3 17 6-6 4 4 8-8M15 7h6v6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ==================== Left panel background ==================== */

function SideBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Violet / purple orbs */}
      <span className="absolute -left-20 -top-[90px] h-[280px] w-[280px] animate-[ctFloatA_14s_ease-in-out_infinite] rounded-full bg-[rgba(167,139,250,.42)] blur-[48px] will-change-transform motion-reduce:animate-none" />
      <span className="absolute -bottom-20 -right-[120px] h-[360px] w-[360px] animate-[ctFloatB_17s_ease-in-out_infinite] rounded-full bg-[rgba(124,58,237,.7)] blur-[48px] will-change-transform motion-reduce:animate-none" />
      <span className="absolute left-[30%] top-[42%] h-[200px] w-[200px] animate-[ctFloatC_20s_ease-in-out_infinite] rounded-full bg-[rgba(217,70,239,.24)] blur-[48px] will-change-transform motion-reduce:animate-none" />
      <span className="absolute right-[18%] top-[6%] h-[120px] w-[120px] animate-[ctFloatA_16s_ease-in-out_infinite] rounded-full bg-[rgba(255,224,78,.14)] blur-[40px] will-change-transform motion-reduce:animate-none" />

      {/* Drifting dot grid */}
      <span className="absolute -inset-10 animate-[ctGridDrift_18s_linear_infinite] [background-image:radial-gradient(rgba(255,255,255,.16)_1px,transparent_1.5px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_60%_at_30%_25%,#000,transparent_75%)] [-webkit-mask-image:radial-gradient(70%_60%_at_30%_25%,#000,transparent_75%)] motion-reduce:animate-none" />

      {/* Twinkling stars */}
      <span className="motion-reduce:hidden">
        {stars.map(([left, top, delay, size], i) => (
          <i
            key={i}
            className="absolute animate-[ctTwinkle_3.6s_ease-in-out_infinite] rounded-full bg-white opacity-0 shadow-[0_0_10px_2px_rgba(255,255,255,.7)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </span>

      {/* Expanding rings */}
      <span className="absolute -bottom-[150px] -right-[150px] h-[340px] w-[340px]">
        {[0, 2.3, 4.6].map((delay) => (
          <i
            key={delay}
            className="absolute inset-0 animate-[ctRing_7s_ease-out_infinite] rounded-full border border-white/20 motion-reduce:animate-none"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </span>
    </div>
  )
}

/* ==================== Main component ==================== */

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const closeTimer = useRef(null)
  const closeRef = useRef(() => {})

  useEffect(() => {
    const openPopup = () => {
      clearTimeout(closeTimer.current)
      setClosing(false)
      setSent(false)
      setSubmitError('')
      setIsOpen(true)
    }

    window.addEventListener('open-contact-popup', openPopup)

    return () => {
      window.removeEventListener('open-contact-popup', openPopup)
      clearTimeout(closeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') closeRef.current()
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

  // Plays a short exit animation, then unmounts
  const closePopup = () => {
    if (isSubmitting || closing) return
    setClosing(true)
    closeTimer.current = setTimeout(() => {
      setIsOpen(false)
      setClosing(false)
    }, 220)
  }

  closeRef.current = closePopup

  return (
    <div className="font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
      <style>{keyframes}</style>

      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto overscroll-contain bg-[radial-gradient(60%_50%_at_20%_10%,rgba(124,58,237,.38),transparent_70%),radial-gradient(50%_45%_at_85%_90%,rgba(168,85,247,.28),transparent_70%),rgba(20,13,39,.78)] p-3 font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased [-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)] max-[380px]:p-2 min-[761px]:items-center min-[761px]:p-6 [&_*]:box-border ${
              closing
                ? 'animate-[ctOverlayOut_.22s_ease_both]'
                : 'animate-[ctOverlayIn_.25s_ease_both]'
            } motion-reduce:animate-none`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePopup()
            }}
          >
            {/* Wrapper = rotating violet light around the card edge */}
            <div
              className={`relative isolate w-full max-w-[1000px] overflow-hidden rounded-[23px] p-px shadow-[0_0_0_1px_rgba(255,255,255,.08),0_44px_110px_-20px_rgba(91,33,182,.7),0_10px_28px_rgba(20,13,39,.25)] max-[380px]:rounded-[19px] min-[761px]:rounded-[29px] ${
                closing
                  ? 'animate-[ctModalOut_.22s_ease-in_both]'
                  : 'animate-[ctModalIn_.55s_cubic-bezier(.22,1,.36,1)_both]'
              } motion-reduce:animate-none`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[250%] animate-[ctSpin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#a855f7_60deg,#7c3aed_120deg,#ffe04e_160deg,transparent_220deg)] motion-reduce:hidden"
              />

              <div
                className="relative max-h-[calc(100dvh_-_24px)] overflow-y-auto overscroll-contain rounded-[22px] bg-white max-[380px]:max-h-[calc(100dvh_-_16px)] max-[380px]:rounded-[18px] min-[761px]:grid min-[761px]:max-h-[calc(100dvh_-_48px)] min-[761px]:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] min-[761px]:grid-rows-[minmax(0,1fr)] min-[761px]:overflow-hidden min-[761px]:rounded-[28px]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="ct-popup-title"
                aria-describedby="ct-popup-description"
              >
                {/* Close button (sticky on phones, fixed in the corner on desktop) */}
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close contact form"
                  className="sticky top-2.5 z-20 float-right -mb-[52px] mr-2.5 mt-2.5 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#e6dffa] bg-white p-0 text-[#2a2140] shadow-[0_6px_16px_-8px_rgba(91,33,182,.35)] transition-[background-color,color,transform] duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] [-webkit-tap-highlight-color:transparent] hover:rotate-90 hover:bg-[#7c3aed] hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#a98af0] motion-reduce:transition-none min-[761px]:absolute min-[761px]:right-4 min-[761px]:top-4 min-[761px]:float-none min-[761px]:m-0 min-[761px]:h-[42px] min-[761px]:w-[42px]"
                >
                  <CloseIcon />
                </button>

                {/* ================= LEFT: INFO PANEL ================= */}
                <aside className="relative isolate flex min-w-0 flex-col items-start justify-start overflow-hidden bg-[linear-gradient(160deg,#3a1590,#24106a_55%,#150a35)] px-5 pb-6 pt-[26px] text-left text-white max-[380px]:px-4 max-[380px]:pb-[18px] max-[380px]:pt-[22px] min-[761px]:px-10 min-[761px]:pb-8 min-[761px]:pt-[46px] [@media(min-width:761px)_and_(max-height:820px)]:px-8 [@media(min-width:761px)_and_(max-height:820px)]:pb-[22px] [@media(min-width:761px)_and_(max-height:820px)]:pt-8">
                  <SideBackground />

                  <div
                    className={`inline-flex w-fit max-w-full items-center gap-[9px] rounded-full border border-white/20 bg-white/10 px-3 py-[7px] text-[11.5px] font-semibold leading-[1.4] text-white [-webkit-backdrop-filter:blur(6px)] [backdrop-filter:blur(6px)] min-[761px]:px-[15px] min-[761px]:py-2 min-[761px]:text-[12.5px] ${RISE}`}
                    style={rise(0)}
                  >
                    <span className="relative h-2 w-2 shrink-0 rounded-full bg-[#ffe04e] shadow-[0_0_12px_rgba(255,224,78,.8)]">
                      <span className="absolute inset-0 animate-[ctPulse_2s_ease-out_infinite] rounded-full bg-[#ffe04e] motion-reduce:animate-none" />
                    </span>
                    Let&rsquo;s grow together
                  </div>

                  <h2
                    className={`ct-display mb-2.5 mt-4 max-w-full pr-11 text-[clamp(27px,7.4vw,36px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white [text-wrap:balance] max-[380px]:text-[26px] min-[761px]:mb-3.5 min-[761px]:mt-6 min-[761px]:max-w-[390px] min-[761px]:pr-0 min-[761px]:text-[clamp(32px,3.4vw,44px)] [@media(min-width:761px)_and_(max-height:820px)]:mt-4 [@media(min-width:761px)_and_(max-height:820px)]:text-[34px] ${RISE}`}
                    style={rise(1)}
                  >
                    Turn More Clicks Into{' '}
                    <span
                      className={`bg-[linear-gradient(90deg,#ffe04e,#ffb938,#ffe04e)] bg-clip-text text-transparent ${FLOW}`}
                    >
                      Customers.
                    </span>
                  </h2>

                  <p
                    id="ct-popup-description"
                    className={`m-0 max-w-full text-sm leading-[1.6] text-white/80 min-[761px]:max-w-[370px] min-[761px]:text-[15px] min-[761px]:leading-[1.7] [@media(min-width:761px)_and_(max-height:700px)]:hidden ${RISE}`}
                    style={rise(2)}
                  >
                    Tell us about your business. Let&rsquo;s build a smarter
                    growth system that turns more leads into paying customers.
                  </p>

                  <ul className="m-0 mt-[18px] grid w-full max-w-full list-none gap-2 p-0 min-[761px]:mt-7 min-[761px]:max-w-[390px] min-[761px]:gap-3 [@media(min-width:761px)_and_(max-height:820px)]:mt-5 [@media(min-width:761px)_and_(max-height:820px)]:gap-[9px]">
                    {points.map((point, index) => (
                      <li
                        key={point}
                        className={RISE}
                        style={rise(3 + index)}
                      >
                        <div className="flex items-center justify-start gap-3.5 rounded-[14px] border border-white/10 bg-white/5 px-3 py-[9px] text-left text-[13.5px] font-medium leading-[1.45] text-white transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:translate-x-1 hover:border-[rgba(255,224,78,.4)] hover:bg-white/10 motion-reduce:transition-none min-[761px]:px-3.5 min-[761px]:py-[11px] min-[761px]:text-[14.5px]">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[rgba(255,224,78,.38)] bg-[rgba(255,224,78,.12)] text-[#ffe04e] min-[761px]:h-7 min-[761px]:w-7">
                            <CheckIcon delay={600 + index * 200} />
                          </span>
                          <span>{point}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Growth preview card */}
                  <div
                    className={`mt-4 hidden w-full max-w-full rounded-2xl border border-white/10 bg-white/[.07] px-[18px] pb-3.5 pt-4 text-left [-webkit-backdrop-filter:blur(8px)] [backdrop-filter:blur(8px)] min-[561px]:block min-[761px]:mt-6 min-[761px]:max-w-[390px] [@media(min-width:761px)_and_(max-height:820px)]:mt-[18px] [@media(min-width:761px)_and_(max-height:760px)]:hidden ${RISE}`}
                    style={rise(6)}
                    aria-hidden="true"
                  >
                    <div className="mb-3.5 flex items-center justify-between gap-3 text-[12.5px] font-semibold text-white/80">
                      <span>Your growth, step by step</span>
                      <span className="inline-flex items-center gap-[5px] rounded-full bg-[rgba(255,224,78,.12)] px-[9px] py-1 text-xs font-bold text-[#ffe04e]">
                        <TrendIcon />
                        Rising
                      </span>
                    </div>

                    <div className="flex h-14 items-end gap-2">
                      {bars.map((height, index) => (
                        <span
                          key={index}
                          className={`flex-1 origin-bottom rounded-b-[3px] rounded-t-md motion-reduce:!animate-none ${
                            index === bars.length - 1
                              ? 'bg-[linear-gradient(180deg,#ffe04e,rgba(255,224,78,.25))]'
                              : 'bg-[linear-gradient(180deg,rgba(196,170,255,.95),rgba(139,92,246,.28))]'
                          }`}
                          style={{
                            height: `${height}%`,
                            animation:
                              'ctBarGrow .9s cubic-bezier(.22,1,.36,1) both, ctBarBreath 4.5s ease-in-out infinite',
                            animationDelay: `${index * 80 + 500}ms, ${
                              index * 250 + 1600
                            }ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="hidden min-h-6 flex-auto min-[761px]:block" />

                  <div className="mt-0 hidden w-full border-t border-white/15 pt-[18px] text-left text-[12.5px] font-medium leading-[1.6] text-white/65 min-[761px]:block [@media(min-width:761px)_and_(max-height:700px)]:hidden">
                    Creative Crew &mdash; growth, built around your business.
                  </div>
                </aside>

                {/* ================= RIGHT: FORM AREA ================= */}
                <div className="relative min-w-0 bg-[radial-gradient(60%_40%_at_100%_0%,rgba(124,58,237,.1),transparent_70%),linear-gradient(180deg,#ffffff,#fcfaff)] px-5 pb-[22px] pt-6 text-left max-[380px]:px-4 max-[380px]:pb-[18px] max-[380px]:pt-5 min-[761px]:overflow-y-auto min-[761px]:overscroll-contain min-[761px]:px-[38px] min-[761px]:pb-[30px] min-[761px]:pt-10 [@media(min-width:761px)_and_(max-height:820px)]:px-8 [@media(min-width:761px)_and_(max-height:820px)]:pb-6 [@media(min-width:761px)_and_(max-height:820px)]:pt-[30px]">
                  {/* Flowing violet accent line */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7c3aed,#a855f7,#ffe04e,#a855f7,#7c3aed)] ${FLOW}`}
                  />

                  {sent ? (
                    <div
                      className="flex min-h-[380px] flex-col items-start justify-center"
                      aria-live="polite"
                    >
                      <div className="mb-[22px] grid h-[60px] w-[60px] animate-[ctPop_.5s_cubic-bezier(.22,1,.36,1)_both] place-items-center rounded-[18px] bg-[#efe7ff] text-[#5b21b6] motion-reduce:animate-none">
                        <CheckIcon className="h-[26px] w-[26px]" />
                      </div>

                      <h3 className="ct-display m-0 mb-2.5 text-[32px] font-extrabold tracking-[-0.03em] text-[#14111f]">
                        Thank you!
                      </h3>

                      <p className="m-0 mb-[26px] text-[15px] leading-[1.7] text-[#5b5870]">
                        Your enquiry has been submitted successfully. Our team
                        will get back to you soon.
                      </p>

                      <button
                        className={`${YELLOW_BTN} !w-auto min-w-40`}
                        type="button"
                        onClick={closePopup}
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-[18px] pr-0 min-[761px]:mb-[26px] min-[761px]:pr-12 [@media(min-width:761px)_and_(max-height:820px)]:mb-4">
                        <small
                          className={`mb-2 inline-flex items-center gap-2 rounded-full bg-[#f1eaff] px-3 py-1 text-[13px] font-bold text-[#7c3aed] ${RISE}`}
                          style={rise(0, 250, 60)}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
                          Get in touch
                        </small>

                        <h3
                          id="ct-popup-title"
                          className={`ct-display m-0 mb-2 text-[25px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14111f] min-[761px]:text-[clamp(26px,2.6vw,33px)] ${RISE}`}
                          style={rise(1, 250, 60)}
                        >
                          Let&rsquo;s talk{' '}
                          <span
                            className={`bg-[linear-gradient(90deg,#7c3aed,#a855f7,#7c3aed)] bg-clip-text text-transparent ${FLOW}`}
                          >
                            growth.
                          </span>
                        </h3>

                        <p
                          className={`m-0 text-sm leading-[1.65] text-[#5b5870] min-[761px]:text-[14.5px] [@media(min-width:761px)_and_(max-height:700px)]:hidden ${RISE}`}
                          style={rise(2, 250, 60)}
                        >
                          Share a few details and tell us what you&rsquo;d like
                          to achieve.
                        </p>
                      </div>

                      <form
                        className="grid grid-cols-1 gap-x-3 gap-y-3.5 min-[561px]:grid-cols-2 min-[761px]:gap-x-3.5 min-[761px]:gap-y-4 [@media(min-width:761px)_and_(max-height:820px)]:gap-y-3"
                        onSubmit={handleSubmit}
                      >
                        <div
                          className={`flex min-w-0 flex-col gap-[7px] ${RISE}`}
                          style={rise(0, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-full-name">
                            Full Name *
                          </label>
                          <input
                            id="ct-full-name"
                            name="fullName"
                            value={form.fullName}
                            onChange={updateField}
                            placeholder="Your full name"
                            autoComplete="name"
                            required
                            className={FIELD}
                          />
                        </div>

                        <div
                          className={`flex min-w-0 flex-col gap-[7px] ${RISE}`}
                          style={rise(1, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-business-name">
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
                            className={FIELD}
                          />
                        </div>

                        <div
                          className={`flex min-w-0 flex-col gap-[7px] ${RISE}`}
                          style={rise(2, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-email">
                            Email Address *
                          </label>
                          <input
                            id="ct-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={updateField}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className={FIELD}
                          />
                        </div>

                        <div
                          className={`flex min-w-0 flex-col gap-[7px] ${RISE}`}
                          style={rise(3, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-phone">
                            Phone / WhatsApp *
                          </label>
                          <input
                            id="ct-phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={updateField}
                            placeholder="Your contact number"
                            autoComplete="tel"
                            required
                            className={FIELD}
                          />
                        </div>

                        <div
                          className={`flex min-w-0 flex-col gap-[7px] ${RISE}`}
                          style={rise(4, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-business-type">
                            Business Type *
                          </label>

                          <select
                            id="ct-business-type"
                            name="businessType"
                            value={form.businessType}
                            onChange={updateField}
                            required
                            className={`${FIELD} cursor-pointer`}
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

                        <div
                          className={`flex min-w-0 flex-col gap-[7px] ${RISE}`}
                          style={rise(5, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-website">
                            Website{' '}
                            <span className="font-medium text-[#8b8798]">
                              (Optional)
                            </span>
                          </label>

                          <input
                            id="ct-website"
                            name="website"
                            type="url"
                            value={form.website}
                            onChange={updateField}
                            placeholder="https://yourwebsite.com"
                            autoComplete="url"
                            className={FIELD}
                          />
                        </div>

                        <div
                          className={`flex min-w-0 flex-col gap-[7px] min-[561px]:col-span-full ${RISE}`}
                          style={rise(6, 330, 55)}
                        >
                          <label className={LABEL} htmlFor="ct-goal">
                            Your Main Goal *
                          </label>

                          <textarea
                            id="ct-goal"
                            name="goal"
                            value={form.goal}
                            onChange={updateField}
                            placeholder="Tell us about your goals, challenges, or what you want to improve..."
                            required
                            className={`${FIELD} !h-auto min-h-24 resize-y [@media(min-width:761px)_and_(max-height:700px)]:min-h-[72px]`}
                          />
                        </div>

                        {submitError && (
                          <p
                            className="col-span-full m-0 animate-[ctShake_.4s_ease] rounded-[11px] border border-[#ffd7dc] bg-[#fff1f2] px-3.5 py-[11px] text-[13.5px] leading-[1.55] text-[#9d2737] motion-reduce:animate-none"
                            role="alert"
                          >
                            {submitError}
                          </p>
                        )}

                        <button
                          className={`${YELLOW_BTN} col-span-full mt-1.5 ${RISE}`}
                          style={rise(7, 330, 55)}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? 'Please wait...'
                            : "Yes! Let's Grow My Revenue"}

                          {!isSubmitting && (
                            <span
                              className="text-[19px] leading-none transition-transform duration-[250ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[3px]"
                              aria-hidden="true"
                            >
                              &rarr;
                            </span>
                          )}
                        </button>

                        <p className="col-span-full m-0 text-center text-[12.5px] leading-[1.6] text-[#8a869a]">
                          Your information will be used to respond to your
                          enquiry.
                        </p>
                      </form>
                    </>
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

/* ==================== Font + keyframes (only non-utility CSS) ==================== */

const keyframes = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

.ct-display {
  font-family: "Bricolage Grotesque", Inter, ui-sans-serif, system-ui, sans-serif;
}

@keyframes ctOverlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ctOverlayOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

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

@keyframes ctFlow {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}

@keyframes ctShine {
  0%, 55% { transform: translateX(0) skewX(-20deg); }
  100% { transform: translateX(520%) skewX(-20deg); }
}

@keyframes ctFloatA {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(70px, 60px) scale(1.15); }
}

@keyframes ctFloatB {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-80px, -60px) scale(1.1); }
}

@keyframes ctFloatC {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(50px, -40px); }
  66% { transform: translate(-40px, 30px); }
}

@keyframes ctGridDrift {
  from { background-position: 0 0; }
  to { background-position: 26px 26px; }
}

@keyframes ctRing {
  0% { transform: scale(.35); opacity: .9; }
  100% { transform: scale(1.25); opacity: 0; }
}

@keyframes ctPulse {
  0% { transform: scale(1); opacity: .7; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes ctTwinkle {
  0%, 100% { opacity: 0; transform: scale(.5); }
  50% { opacity: .95; transform: scale(1.25); }
}

@keyframes ctDraw {
  to { stroke-dashoffset: 0; }
}

@keyframes ctBarGrow {
  from { transform: scaleY(0); opacity: 0; }
  to { transform: scaleY(1); opacity: 1; }
}

@keyframes ctBarBreath {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(.84); }
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