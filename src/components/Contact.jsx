import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ==========================================================
   Contact.jsx  (Tailwind utility classes only) - light + mobile-first
   Flow:  Button click -> Your details form (FIRST CLICK, logo on top)
          -> 4 questions (one per step, Next)
          -> Book Appointment (date + time slot) -> Thank you screen
   Layout: header/close fixed, content scrolls, buttons ALWAYS
           pinned at the bottom (works on small phones too).
   Data:   Name + Number go to the Google Sheet FIRST (as soon as the
           details step is completed), then the full lead + appointment
           is saved to Sheet + CRM (Supabase) at the end.
   Phone:  fixed +91 prefix, exactly 10 digits.
   Open it with:  window.dispatchEvent(new Event('open-contact-popup'))
   Meta Pixel: Lead + Schedule events fire after successful submit
   ========================================================== */

// ---------- EDIT THESE ----------
const LOGO_IMAGE = '/images/Neeraj12.png' // file lives in /public/images
// Google Apps Script Web App URL (saves every enquiry to the Google Sheet)
const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx4-zXZLsl3B4M4lgpDIWFUROF_GvseaDfzeaQHKUT6BDQAWSuO31MFjFle5e4MfZrQ/exec'
const CRM_ENDPOINT = 'https://nuursmovhbhislrphakl.supabase.co/functions/v1/capture-lead'
const CRM_CATEGORY = 'Landing Page'
const CRM_SERVICE = '10X Landing Page Growth Call'
const FORM_TITLE = 'Creative Crew — Growth Consultation Form'
// WhatsApp confirmation (Supabase edge function: send-whatsapp-confirmation)
const WHATSAPP_ENDPOINT =
  'https://nuursmovhbhislrphakl.supabase.co/functions/v1/send-whatsapp-confirmation'

// ---------- PHONE SETTINGS ----------
const COUNTRY_CODE = '+91'
const PHONE_DIGITS = 10 // exactly 10 digits after +91

// ---------- APPOINTMENT SETTINGS ----------
const APPOINTMENT_DAYS_AHEAD = 14 // kitne din aage tak booking dikhani hai
const SKIP_SUNDAYS = true // Sunday band rakhna hai to true
const MIN_LEAD_HOURS = 1 // aaj ke slots ke liye kam se kam itne ghante baad ka slot
const TIME_ZONE_LABEL = 'IST (India Standard Time)'
// Lunch time (1 PM - 3 PM) ke slots hata diye gaye hain.
// h = 24-hour format hour, m = minute
const TIME_SLOTS = [
  { label: '10:00 AM', h: 10, m: 0 },
  { label: '11:00 AM', h: 11, m: 0 },
  { label: '12:00 PM', h: 12, m: 0 },
  { label: '03:00 PM', h: 15, m: 0 },
  { label: '04:00 PM', h: 16, m: 0 },
  { label: '05:00 PM', h: 17, m: 0 },
  { label: '06:00 PM', h: 18, m: 0 },
]

// Question 2 (link) removed
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

// Steps: 0 details (first click) | 1..questions.length questions | appointment | thank you
const DETAILS_STEP = 0
const FIRST_Q = 1
const APPOINTMENT_STEP = FIRST_Q + questions.length
const DONE_STEP = APPOINTMENT_STEP + 1
const TOTAL_FORM_STEPS = 1 + questions.length + 1 // details + questions + appointment

const initialDetails = { fullName: '', businessName: '', email: '', phone: '' }
const initialAppointment = { date: '', time: '' }

/* ==================== Helpers ==================== */

const pad = (n) => String(n).padStart(2, '0')
const toDateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

// Keep only the 10 local digits (handles pasted "+91 98765 43210", "91987...", "0987...")
function cleanPhoneInput(value) {
  let d = String(value).replace(/\D/g, '')
  if (d.length > PHONE_DIGITS && d.startsWith('91')) d = d.slice(2)
  else if (d.length > PHONE_DIGITS && d.startsWith('0')) d = d.slice(1)
  return d.slice(0, PHONE_DIGITS)
}
const isValidPhone = (digits) => digits.length === PHONE_DIGITS
const toFullPhone = (digits) => `${COUNTRY_CODE}${digits}`

// Slots available for a given day (today ke liye past slots hata deta hai)
function getSlotsForDate(date) {
  const now = new Date()
  const isToday = toDateKey(date) === toDateKey(now)
  if (!isToday) return TIME_SLOTS
  const cutoff = new Date(now.getTime() + MIN_LEAD_HOURS * 60 * 60 * 1000)
  return TIME_SLOTS.filter((s) => {
    const slotDate = new Date(date)
    slotDate.setHours(s.h, s.m, 0, 0)
    return slotDate >= cutoff
  })
}

function buildUpcomingDays(booked = []) {
  const bookedSet = new Set(booked)
  const out = []
  const base = new Date()
  base.setHours(0, 0, 0, 0)
  for (let i = 0; i <= APPOINTMENT_DAYS_AHEAD; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    if (SKIP_SUNDAYS && d.getDay() === 0) continue
    const slots = getSlotsForDate(d)
    if (slots.length === 0) continue // aaj ke saare slot nikal chuke
    const key = toDateKey(d)
    // har slot par mark: kya wo pehle se book hai?
    const marked = slots.map((sl) => ({ ...sl, booked: bookedSet.has(`${key}|${sl.label}`) }))
    out.push({
      key,
      date: d,
      weekday: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
      full: d.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      isToday: i === 0,
      slots: marked,
      soldOut: marked.every((sl) => sl.booked),
    })
  }
  return out
}

/* ==================== Shared classes ==================== */

const LABEL = 'text-[12.5px] font-bold leading-[1.3] text-[#2a2140]'

const FIELD =
  'block m-0 h-[44px] w-full min-w-0 rounded-xl border border-[#e2dcf2] bg-[#fbfaff] px-3.5 py-2.5 font-[inherit] text-base leading-normal text-[#14111f] outline-none ' +
  'transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#a7a2b8] ' +
  'hover:border-[#cdbff3] focus:border-[#7c3aed] focus:bg-white focus:shadow-[0_0_0_3px_rgba(124,58,237,.14)]'

// Input with a left icon (details form)
const FIELD_ICON =
  'block m-0 h-[48px] w-full min-w-0 rounded-xl border bg-[#fbfaff] pl-11 pr-3.5 font-[inherit] text-base leading-normal text-[#14111f] outline-none ' +
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

function CalendarIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UserIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4.5 20c.9-3.6 3.9-5.5 7.5-5.5s6.6 1.9 7.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function BuildingIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="3.5" width="11" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 9.5h3a1 1 0 0 1 1 1v10h-4M8 8h4M8 12h4M8 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MailIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.5h2.3l1.4 4-1.8 1.3a11 11 0 0 0 5.7 5.7l1.3-1.8 4 1.4v2.3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ==================== Main component ==================== */

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [step, setStep] = useState(DETAILS_STEP)
  const [details, setDetails] = useState(initialDetails)
  const [phoneError, setPhoneError] = useState('')
  const [answers, setAnswers] = useState({})
  const [otherText, setOtherText] = useState({})
  const [appointment, setAppointment] = useState(initialAppointment)
  const [bookedSlots, setBookedSlots] = useState([]) // e.g. ['2026-11-03|10:00 AM']
  const [reservedSlots, setReservedSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [reservationLoading, setReservationLoading] = useState(false)
  const [reservationSupported, setReservationSupported] = useState(false)
  const [availabilityError, setAvailabilityError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const closeTimer = useRef(null)
  const closeRef = useRef(() => {})
  const scrollRef = useRef(null)
  const reservationRef = useRef(null)
  const appointmentRef = useRef(appointment)
  appointmentRef.current = appointment
  // Keep one ID for this form submission so a CRM retry can be deduplicated server-side.
  const submissionIdRef = useRef('')
  const partialSentRef = useRef(false) // First-step request sent to the Sheet
  const partialCrmSavedRef = useRef(false) // First-step record confirmed by CRM
  const sheetSentRef = useRef(false)
  const crmSavedRef = useRef(false)

  const getSubmissionId = () => {
    if (!submissionIdRef.current) {
      submissionIdRef.current =
        typeof window !== 'undefined' && window.crypto?.randomUUID
          ? window.crypto.randomUUID()
          : `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    }
    return submissionIdRef.current
  }

  // Available dates are rebuilt every time the popup opens (so "today" is always fresh)
  const availableDays = useMemo(
    () =>
      isOpen
        ? buildUpcomingDays([
            ...bookedSlots,
            ...reservedSlots.filter((key) => key !== reservationRef.current?.key),
          ])
        : [],
    [isOpen, bookedSlots, reservedSlots]
  )

  // Google Sheet (Apps Script) se already booked slots laao
  const loadBookedSlots = async (showLoading = true) => {
    if (showLoading) setSlotsLoading(true)
    try {
      const res = await fetch(`${FORM_ENDPOINT}?action=booked&t=${Date.now()}`)
      if (!res.ok) throw new Error(`Availability request failed (HTTP ${res.status}).`)
      const data = await res.json()
      if (!Array.isArray(data?.booked) || !Array.isArray(data?.reserved) || data.reservationSupport !== true) {
        setReservationSupported(false)
        throw new Error('The booking backend must be updated to enable safe slot reservations.')
      }
      setReservationSupported(true)
      setAvailabilityError('')
      setBookedSlots(data.booked)
      setReservedSlots(data.reserved)
      const currentReservation = reservationRef.current
      const currentAppointment = appointmentRef.current
      const selectedKey =
        currentAppointment.date && currentAppointment.time
          ? `${currentAppointment.date}|${currentAppointment.time}`
          : ''
      const heldByAnotherLead =
        selectedKey &&
        data.reserved.includes(selectedKey) &&
        currentReservation?.key !== selectedKey
      const booked = selectedKey && data.booked.includes(selectedKey) && !sheetSentRef.current
      const ownHoldExpired =
        currentReservation &&
        !data.reserved.includes(currentReservation.key) &&
        !data.booked.includes(currentReservation.key)
      if (heldByAnotherLead || booked || ownHoldExpired) {
        reservationRef.current = null
        setAppointment((p) => ({ ...p, time: '' }))
        setSubmitError(
          ownHoldExpired
            ? 'Your time hold expired. Please select an available time again.'
            : 'This time was just taken by another lead. Please choose another time.'
        )
      }
    } catch (error) {
      setAvailabilityError(
        error instanceof Error ? error.message : 'Could not load appointment availability.'
      )
    } finally {
      if (showLoading) setSlotsLoading(false)
    }
  }

  // Refresh availability while the appointment step is open so active holds disappear promptly.
  useEffect(() => {
    if (isOpen && step === APPOINTMENT_STEP) {
      loadBookedSlots()
      const interval = window.setInterval(() => loadBookedSlots(false), 5000)
      return () => window.clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step])

  const reserveSlot = async (date, time) => {
    if (!reservationSupported || reservationLoading) return
    setReservationLoading(true)
    setSubmitError('')
    const reservationId = getSubmissionId()
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          stage: 'reserve',
          reservationId,
          appointmentDateISO: date,
          appointmentTime: time,
        }),
      })
      const result = await response.json()
      if (result?.error === 'slot_taken') {
        await loadBookedSlots(false)
        setSubmitError('This time was just taken by another lead. Please choose another time.')
        return
      }
      if (!response.ok || result?.ok !== true || !Array.isArray(result.reserved)) {
        throw new Error(result?.error || `Could not reserve this time (HTTP ${response.status}).`)
      }
      const key = `${date}|${time}`
      reservationRef.current = {
        key,
        reservationId,
        expiresAt: result.reservationExpiresAt,
      }
      setAppointment({ date, time })
      setReservedSlots(result.reserved)
      setAvailabilityError('')
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? `We couldn't reserve this time: ${error.message}`
          : 'We could not reserve this time. Please try again.'
      )
    } finally {
      setReservationLoading(false)
    }
  }

  const releaseReservation = async () => {
    const reservation = reservationRef.current
    if (!reservation) return
    reservationRef.current = null
    setReservedSlots((prev) => prev.filter((key) => key !== reservation.key))
    setAppointment((prev) =>
      `${prev.date}|${prev.time}` === reservation.key ? { ...prev, time: '' } : prev
    )
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        keepalive: true,
        body: JSON.stringify({
          stage: 'release',
          reservationId: reservation.reservationId,
        }),
      })
      const result = await response.json()
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || `Could not release time hold (HTTP ${response.status}).`)
      }
    } catch (error) {
      console.error('[Contact] Could not release appointment hold:', error)
    }
  }

  // Open from anywhere: window.dispatchEvent(new Event('open-contact-popup'))
  // First click opens the details form directly.
  useEffect(() => {
    const openPopup = () => {
      clearTimeout(closeTimer.current)
      setClosing(false)
      setStep(DETAILS_STEP)
      setSubmitError('')
      setPhoneError('')
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
    if (isSubmitting || reservationLoading || closing) return
    if (reservationRef.current) releaseReservation()
    setClosing(true)
    closeTimer.current = setTimeout(() => {
      setIsOpen(false)
      setClosing(false)
      if (step === DONE_STEP) {
        setStep(DETAILS_STEP)
        setDetails(initialDetails)
        setAnswers({})
        setOtherText({})
        setAppointment(initialAppointment)
        reservationRef.current = null
        submissionIdRef.current = ''
        partialSentRef.current = false
        partialCrmSavedRef.current = false
        sheetSentRef.current = false
        crmSavedRef.current = false
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
    if (step === APPOINTMENT_STEP && reservationRef.current) releaseReservation()
    setStep((s) => Math.max(DETAILS_STEP, s - 1))
  }

  const updateDetail = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setDetails((p) => ({ ...p, phone: cleanPhoneInput(value) }))
      if (phoneError) setPhoneError('')
      return
    }
    setDetails((p) => ({ ...p, [name]: value }))
  }

  // Save the first-step contact details to both destinations before advancing.
  const sendDetailsToSheet = async (signal) => {
    if (partialSentRef.current || !FORM_ENDPOINT) return
    const payload = {
      form: FORM_TITLE,
      stage: 'details',
      submissionId: getSubmissionId(),
      fullName: details.fullName.trim(),
      businessName: details.businessName.trim(),
      email: details.email.trim(),
      phone: toFullPhone(details.phone),
    }
    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal,
    })
    // A no-cors response is opaque: this confirms request dispatch, not the Sheet write.
    partialSentRef.current = true
  }

  const sendDetailsToCrm = async (signal) => {
    if (partialCrmSavedRef.current || !CRM_ENDPOINT) return
    const response = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        external_lead_id: getSubmissionId(),
        form_stage: 'step1',
        name: details.fullName.trim(),
        email: details.email.trim(),
        phone: toFullPhone(details.phone),
        company: details.businessName.trim(),
        lead_source: CRM_CATEGORY,
        // Keep this empty for step 1; the final request fills it and updates this same lead.
        service_name: '',
        message: 'Initial enquiry details received.',
        landing_page_url: window.location.href,
        marketing_consent: false,
      }),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok || result?.ok !== true) {
      throw new Error(result?.error || `CRM request failed (HTTP ${response.status}).`)
    }
    partialCrmSavedRef.current = true
  }

  const handleDetailsSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!isValidPhone(details.phone)) {
      setPhoneError(`Please enter a valid ${PHONE_DIGITS}-digit mobile number.`)
      return
    }
    if (!FORM_ENDPOINT && !CRM_ENDPOINT) {
      setSubmitError('The enquiry form is not connected. Please contact us on WhatsApp.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      const saves = []
      if (FORM_ENDPOINT) saves.push(sendDetailsToSheet(controller.signal))
      if (CRM_ENDPOINT) saves.push(sendDetailsToCrm(controller.signal))
      await Promise.all(saves)
      goNext()
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? `We couldn't save your contact details: ${error.message} Please try again.`
          : 'We could not save your contact details. Please try again.'
      )
    } finally {
      window.clearTimeout(timeout)
      setIsSubmitting(false)
    }
  }
  const selectedDay = availableDays.find((d) => d.key === appointment.date)
  const appointmentDateLabel = selectedDay ? selectedDay.full : ''

  const submitAll = async () => {
    if (isSubmitting) return
    if (!appointment.date || !appointment.time) return
    const appointmentKey = `${appointment.date}|${appointment.time}`
    if (!sheetSentRef.current && reservationRef.current?.key !== appointmentKey) {
      setSubmitError('Please reserve an available appointment time before submitting.')
      return
    }
    setIsSubmitting(true)
    setSubmitError('')

    const submissionId = getSubmissionId()
    const reservationId = reservationRef.current?.reservationId || ''
    const fullPhone = toFullPhone(details.phone)

    const answerRows = questions.map((q) => ({
      question: q.title,
      answer:
        answers[q.id] === 'Other'
          ? `Other: ${(otherText[q.id] || '').trim()}`
          : (answers[q.id] || '').trim(),
    }))

    const appointmentText = `${appointmentDateLabel} at ${appointment.time} (${TIME_ZONE_LABEL})`
    // e.g. 2026-11-12T12:00:00+05:30 (IST) - easy for a CRM date/time column
    const slotDef = TIME_SLOTS.find((s) => s.label === appointment.time)
    const appointmentISO = slotDef
      ? `${appointment.date}T${pad(slotDef.h)}:${pad(slotDef.m)}:00+05:30`
      : ''

    const sheetPayload = {
      form: FORM_TITLE,
      stage: 'complete',
      submissionId,
      reservationId,
      ...details,
      phone: fullPhone,
      answers: answerRows,
      appointmentDate: appointmentDateLabel,
      appointmentDateISO: appointment.date,
      appointmentTime: appointment.time,
      appointment: appointmentText,
    }
    const crmPayload = {
      name: details.fullName.trim(),
      email: details.email.trim(),
      phone: fullPhone,
      company: details.businessName.trim(),
      lead_source: CRM_CATEGORY,
      service_name: CRM_SERVICE,
      // Appointment request is included in the CRM note
      // even if the CRM has no separate appointment columns.
      message:
        `Appointment Requested: ${appointmentText}\n\n` +
        answerRows.map(({ question, answer }) => `${question}\n${answer}`).join('\n\n'),
      landing_page_url: typeof window !== 'undefined' ? window.location.href : '',
      external_lead_id: submissionId,
      appointment_date: appointment.date,
      appointment_time: appointment.time,
      appointment_label: appointmentText,
      appointment_datetime: appointmentISO,
    }

    try {
      if (!FORM_ENDPOINT) {
        throw new Error('Google Sheet URL (FORM_ENDPOINT) is missing.')
      }

      if (!sheetSentRef.current) {
        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 20000)
        let sheetRes
        try {
          sheetRes = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(sheetPayload),
            signal: controller.signal,
          })
        } finally {
          window.clearTimeout(timeout)
        }
        let sheetData = null
        try {
          sheetData = await sheetRes.json()
        } catch {
          sheetData = null
        }
        if (['slot_taken', 'reservation_expired'].includes(sheetData?.error)) {
          reservationRef.current = null
          await loadBookedSlots(false)
          setAppointment((p) => ({ ...p, time: '' }))
          setSubmitError(
            sheetData.error === 'slot_taken'
              ? 'Sorry, this slot was just booked by someone else. Please choose another time.'
              : 'Your time hold expired. Please choose an available time again.'
          )
          return
        }
        if (!sheetRes.ok || !sheetData || sheetData.ok !== true) {
          throw new Error(
            sheetData?.error || `The appointment could not be confirmed (HTTP ${sheetRes.status}).`
          )
        }
        sheetSentRef.current = true
        reservationRef.current = null
        setReservedSlots((prev) => prev.filter((key) => key !== appointmentKey))
      }

      if (!crmSavedRef.current && CRM_ENDPOINT) {
        fetch(CRM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(crmPayload),
        })
          .then(async (crmResponse) => {
            const responseText = await crmResponse.text()
            let responseData = {}
            try {
              responseData = responseText ? JSON.parse(responseText) : {}
            } catch {
              responseData = { message: responseText }
            }
            if (!crmResponse.ok || responseData?.ok !== true) {
              throw new Error(
                responseData?.error ||
                  responseData?.message ||
                  `CRM request failed (HTTP ${crmResponse.status}).`
              )
            }
            crmSavedRef.current = true
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
              window.fbq('track', 'Lead', { content_name: CRM_SERVICE })
              window.fbq('track', 'Schedule', { content_name: CRM_SERVICE })
            }
          })
          .catch((error) => console.error('[Contact] CRM update failed after booking:', error))
      }

      fetch(WHATSAPP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          submissionId,
          phone: fullPhone,
          appointmentDate: appointmentDateLabel,
          appointmentTime: appointment.time,
          timeZone: TIME_ZONE_LABEL,
        }),
      }).catch((error) => console.error('[Contact] WhatsApp confirmation failed:', error))

      setBookedSlots((prev) => [...prev, `${appointment.date}|${appointment.time}`])
      setStep(DONE_STEP)
    } catch (err) {
      console.error('[Contact] Appointment booking failed:', err)
      const isNetwork = err instanceof TypeError || err?.message === 'Failed to fetch'
      const detail = isNetwork
        ? 'The booking server did not respond. Please retry, or contact us on WhatsApp.'
        : err?.name === 'AbortError'
          ? 'The booking server timed out. Please check availability and retry.'
        : err instanceof Error
          ? err.message
          : ''
      setSubmitError(
        detail
          ? `We couldn't complete your booking: ${detail}`
          : 'We could not submit your details. Please retry or contact us on WhatsApp.'
      )
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

  const renderDetails = () => {
    const iconWrap =
      'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9b8fc4] transition-colors duration-200 group-focus-within:text-[#7c3aed]'

    // [name, label, type, placeholder, autocomplete, id, Icon]
    const fields = [
      ['fullName', 'Full Name', 'text', 'Enter your full name', 'name', 'ct-full-name', UserIcon],
      ['businessName', 'Business / Brand', 'text', 'Enter your business name', 'organization', 'ct-business', BuildingIcon],
      ['email', 'Email Address', 'email', 'you@example.com', 'email', 'ct-email', MailIcon],
    ]

    const phoneInvalid = Boolean(phoneError)

    return {
      body: (
        <div>
          {progress(1)}

          {/* Header: logo + title */}
          <div className="flex flex-col items-center text-center">
            {/* Dark chip so the white part of the logo stays visible */}
            <span className="grid h-[68px] w-[68px] place-items-center overflow-hidden rounded-[20px] bg-[#14111f] shadow-[0_10px_24px_-10px_rgba(91,33,182,.6)] ring-1 ring-[#e6dffa] min-[561px]:h-[78px] min-[561px]:w-[78px]">
              <img
                src={LOGO_IMAGE}
                alt="Creative Crew logo"
                className="h-full w-full object-contain p-2"
              />
            </span>

            <small className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f1eaff] px-3 py-1 text-[11.5px] font-bold text-[#7c3aed]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
              {FORM_TITLE}
            </small>

            <h3
              id="ct-popup-title"
              className="ct-display m-0 mt-2.5 text-[23px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14111f] min-[561px]:text-[27px]"
            >
              <span className={GRADIENT_TEXT}>10X Landing Page</span> Growth Call
            </h3>
            <p
              id="ct-popup-description"
              className="m-0 mt-1.5 max-w-[360px] text-[13px] leading-[1.5] text-[#5b5870]"
            >
              Tell us a little about you so we can reach out and plan your free growth call.
            </p>
          </div>

          {submitError && (
            <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}

          <form
            id="ct-details-form"
            className="mt-5 grid grid-cols-1 gap-3.5"
            onSubmit={handleDetailsSubmit}
          >
            {fields.map(([name, label, type, ph, ac, id, Icon]) => (
              <div key={name} className="flex min-w-0 flex-col gap-1.5">
                <label className={LABEL} htmlFor={id}>
                  {label} <span className="text-[#7c3aed]">*</span>
                </label>
                <div className="group relative">
                  <span className={iconWrap}>
                    <Icon />
                  </span>
                  <input
                    id={id}
                    name={name}
                    type={type}
                    value={details[name]}
                    onChange={updateDetail}
                    placeholder={ph}
                    autoComplete={ac}
                    required
                    className={`${FIELD_ICON} border-[#e2dcf2]`}
                  />
                </div>
              </div>
            ))}

            {/* Phone: fixed +91 prefix, exactly 10 digits */}
            <div className="flex min-w-0 flex-col gap-1.5">
              <label className={LABEL} htmlFor="ct-phone">
                Phone / WhatsApp <span className="text-[#7c3aed]">*</span>
              </label>
              <div
                className={`group flex h-[48px] w-full min-w-0 items-stretch overflow-hidden rounded-xl border bg-[#fbfaff] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#cdbff3] focus-within:border-[#7c3aed] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(124,58,237,.14)] ${
                  phoneInvalid ? 'border-[#e5484d]' : 'border-[#e2dcf2]'
                }`}
              >
                <span className="flex shrink-0 select-none items-center gap-1.5 border-r border-[#e2dcf2] bg-[#f4efff] px-3 text-[14.5px] font-bold text-[#2e0c4d]">
                  <PhoneIcon className="h-4 w-4 text-[#7c3aed]" />
                  {COUNTRY_CODE}
                </span>
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern={`[0-9]{${PHONE_DIGITS}}`}
                  maxLength={PHONE_DIGITS}
                  value={details.phone}
                  onChange={updateDetail}
                  placeholder="10-digit mobile number"
                  autoComplete="tel-national"
                  aria-invalid={phoneInvalid ? 'true' : undefined}
                  aria-describedby="ct-phone-hint"
                  required
                  // Inline style on purpose: it beats any global input:focus border/outline/shadow
                  // in your CSS, so only the outer wrapper shows the border (no inner lines).
                  style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    borderRadius: 0,
                  }}
                  className="m-0 h-full w-full min-w-0 appearance-none px-3.5 font-[inherit] text-[16px] font-semibold tracking-[0.04em] text-[#14111f] placeholder:font-normal placeholder:tracking-normal placeholder:text-[#a7a2b8]"
                />
                <span
                  className="flex shrink-0 items-center pl-1 pr-3"
                  aria-hidden="true"
                >
                  {details.phone.length === PHONE_DIGITS ? (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#16a34a] text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#f1eaff] px-2 py-0.5 text-[11.5px] font-bold tabular-nums text-[#7c3aed]">
                      {details.phone.length}/{PHONE_DIGITS}
                    </span>
                  )}
                </span>
              </div>
              <span
                id="ct-phone-hint"
                role={phoneInvalid ? 'alert' : undefined}
                className={`text-[12px] leading-[1.3] ${
                  phoneInvalid ? 'font-semibold text-[#d4161d]' : 'font-medium text-[#8a869a]'
                }`}
              >
                {phoneInvalid
                  ? phoneError
                  : 'Enter your 10-digit number without +91 or 0.'}
              </span>
            </div>
          </form>

          <p className="m-0 mt-4 flex items-center justify-center gap-1.5 text-center text-[11.5px] font-medium text-[#8a869a]">
            <LockIcon />
            Your details are safe with us. No spam, ever.
          </p>
        </div>
      ),
      footer: (
        // First step: no Back button (form opens directly on first click)
        <button type="submit" form="ct-details-form" disabled={isSubmitting} className={YELLOW_BTN}>
          {isSubmitting ? 'Saving…' : 'Next'}
          <span
            className="text-[18px] leading-none transition-transform duration-200 group-hover:translate-x-[3px]"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </button>
      ),
    }
  }

  const renderQuestion = (index) => {
    const q = questions[index]
    const value = answers[q.id] || ''
    const needsOther = value === 'Other'
    const valid =
      q.type === 'text'
        ? value.trim().length > 0
        : value && (!needsOther || (otherText[q.id] || '').trim().length > 0)

    // Last question goes to the appointment step (submit happens there)
    const handleNext = () => {
      if (!valid) return
      goNext()
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
        </div>
      ),
      footer: (
        <div className="flex gap-3">
          <button type="button" onClick={goBack} className={BACK_BTN}>
            Back
          </button>
          <button type="button" onClick={handleNext} disabled={!valid} className={YELLOW_BTN}>
            Next
            <span className="text-[18px] leading-none" aria-hidden="true">
              &rarr;
            </span>
          </button>
        </div>
      ),
    }
  }

  /* ---------- Appointment booking step ---------- */

  const renderAppointment = () => {
    const slots = selectedDay ? selectedDay.slots : []
    const appointmentKey = `${appointment.date}|${appointment.time}`
    const valid = Boolean(
      appointment.date &&
        appointment.time &&
        (sheetSentRef.current || reservationRef.current?.key === appointmentKey)
    )

    const pickDate = (day) => {
      if (day.key !== appointment.date && reservationRef.current) releaseReservation()
      setAppointment((p) => {
        return { date: day.key, time: day.key === p.date ? p.time : '' }
      })
    }

    return {
      body: (
        <div>
          {progress(TOTAL_FORM_STEPS)}

          <p className="m-0 mb-1 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#7c3aed]">
            <CalendarIcon className="h-3.5 w-3.5" />
            Last step
          </p>
          <h3
            id="ct-popup-title"
            className="ct-display m-0 mb-1 text-[20px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#14111f] min-[561px]:text-[23px]"
          >
            Book your <span className={GRADIENT_TEXT}>appointment</span>
          </h3>
          <p id="ct-popup-description" className="m-0 mb-3.5 text-[13px] leading-[1.5] text-[#5b5870]">
            Pick a date and time that works best for your free Growth Call.
          </p>

          {availabilityError && (
            <p className="m-0 mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700" role="alert">
              {availabilityError}
            </p>
          )}

          {availableDays.length === 0 ? (
            <p className="m-0 rounded-xl border border-[#ece6fb] bg-[#faf8ff] px-3.5 py-3 text-[13px] leading-[1.5] text-[#5b5870]">
              No slots are open right now. Please check back soon or contact us on WhatsApp.
            </p>
          ) : (
            <>
              {/* Date picker */}
              <p className={`${LABEL} m-0 mb-2`}>Select date *</p>
              <div
                role="radiogroup"
                aria-label="Select appointment date"
                className="grid grid-cols-4 gap-2 min-[561px]:grid-cols-5"
              >
                {availableDays.map((day) => {
                  const selected = appointment.date === day.key
                  return (
                    <button
                      key={day.key}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={day.full}
                      disabled={day.soldOut}
                      onClick={() => pickDate(day)}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border px-1 py-2 text-center leading-tight disabled:cursor-not-allowed disabled:border-[#eee9f7] disabled:bg-[#f3f1f8] disabled:text-[#aaa5b8] disabled:shadow-none transition-[border-color,background-color,box-shadow] duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a98af0] ${
                        selected
                          ? 'border-[#7c3aed] bg-[#7c3aed] text-white shadow-[0_0_0_3px_rgba(124,58,237,.14)]'
                          : 'border-[#e2dcf2] bg-[#fbfaff] text-[#2a2140] hover:border-[#cdbff3]'
                      }`}
                    >
                      <span className={`text-[10.5px] font-bold uppercase tracking-wide ${selected ? 'text-[#e9ddff]' : 'text-[#7c3aed]'}`}>
                        {day.isToday ? 'Today' : day.weekday}
                      </span>
                      <span className="text-[18px] font-extrabold">{day.day}</span>
                      <span className={`text-[10.5px] font-semibold ${selected ? 'text-[#e9ddff]' : 'text-[#8a869a]'}`}>
                        {day.month}
                      </span>
                      {day.soldOut && (
                        <span className="text-[10px] font-extrabold uppercase text-[#d4161d]">Full</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Time slots */}
              <p className={`${LABEL} m-0 mb-2 mt-4`}>
                Select time *
                {slotsLoading && (
                  <span className="ml-2 text-[11.5px] font-medium text-[#8a869a]">Checking availability...</span>
                )}
                {reservationLoading && (
                  <span className="ml-2 text-[11.5px] font-medium text-[#8a869a]">Reserving...</span>
                )}
              </p>
              {!selectedDay ? (
                <p className="m-0 rounded-xl border border-dashed border-[#e2dcf2] bg-[#fbfaff] px-3.5 py-3 text-[12.5px] text-[#8a869a]">
                  Choose a date first to see available time slots.
                </p>
              ) : (
                <div
                  role="radiogroup"
                  aria-label="Select appointment time"
                  className="grid grid-cols-2 gap-2 min-[561px]:grid-cols-3"
                >
                  {slots.map((slot) => {
                    const selected = appointment.time === slot.label
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        disabled={
                          slot.booked ||
                          slotsLoading ||
                          reservationLoading ||
                          !reservationSupported ||
                          Boolean(availabilityError)
                        }
                        onClick={() => reserveSlot(selectedDay.key, slot.label)}
                        className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[13.5px] font-bold disabled:cursor-not-allowed disabled:border-[#eee9f7] disabled:bg-[#f3f1f8] disabled:text-[#aaa5b8] disabled:shadow-none transition-[border-color,background-color,box-shadow] duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a98af0] ${
                          selected
                            ? 'border-[#7c3aed] bg-[#f4efff] text-[#2e0c4d] shadow-[0_0_0_3px_rgba(124,58,237,.14)]'
                            : 'border-[#e2dcf2] bg-[#fbfaff] text-[#2a2140] hover:border-[#cdbff3]'
                        }`}
                      >
                        <ClockIcon className={`h-3.5 w-3.5 ${slot.booked ? 'text-[#c4bfd2]' : 'text-[#7c3aed]'}`} />
                        <span className={slot.booked ? 'line-through' : ''}>{slot.label}</span>
                        {slot.booked && (
                          <span className="text-[10px] font-extrabold uppercase text-[#d4161d]">Booked</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              <p className="m-0 mt-2 text-[11.5px] font-medium text-[#8a869a]">
                All times are in {TIME_ZONE_LABEL}.
              </p>

              {/* Selected summary */}
              {valid && (
                <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#d9ccf7] bg-[#f4efff] px-3 py-2.5 text-[13px] leading-[1.45] text-[#2e0c4d]">
                  <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#7c3aed]" />
                  <span className="min-w-0">
                    <strong className="font-extrabold">Your slot:</strong> {appointmentDateLabel} at{' '}
                    {appointment.time}
                  </span>
                </div>
              )}
            </>
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
          <button
            type="button"
            onClick={goBack}
            disabled={isSubmitting || reservationLoading}
            className={BACK_BTN}
          >
            Back
          </button>
          <button
            type="button"
            onClick={submitAll}
            disabled={!valid || isSubmitting || reservationLoading || slotsLoading || Boolean(availabilityError)}
            className={YELLOW_BTN}
          >
            {isSubmitting ? 'Confirming booking...' : 'Confirm Appointment'}
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
          You&rsquo;re booked!
        </h3>
        <p id="ct-popup-description" className="m-0 text-[14.5px] leading-[1.65] text-[#5b5870]">
          Your appointment request has been submitted successfully. Our team will contact you to
          confirm the details.
        </p>

        {appointment.date && appointment.time && (
          <div className="mt-4 w-full rounded-xl border border-[#d9ccf7] bg-[#f4efff] px-3.5 py-3 text-[13.5px] text-[#2e0c4d]">
            <p className="m-0 mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-[#7c3aed]">
              Your appointment
            </p>
            <p className="m-0 flex items-center gap-2 font-bold">
              <CalendarIcon className="h-4 w-4 shrink-0 text-[#7c3aed]" />
              {appointmentDateLabel}
            </p>
            <p className="m-0 mt-1 flex items-center gap-2 font-bold">
              <ClockIcon className="h-4 w-4 shrink-0 text-[#7c3aed]" />
              {appointment.time} &middot; {TIME_ZONE_LABEL}
            </p>
          </div>
        )}
      </div>
    ),
    footer: (
      <button className={YELLOW_BTN} type="button" onClick={closePopup}>
        Done
      </button>
    ),
  })

  let view
  if (step === DETAILS_STEP) view = renderDetails()
  else if (step === APPOINTMENT_STEP) view = renderAppointment()
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
                    step === DETAILS_STEP || step === DONE_STEP
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