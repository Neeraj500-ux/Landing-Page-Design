import { useEffect, useRef, useState } from 'react'
import { Container } from './ui'

const field =
  'ct-field w-full rounded-xl border border-white/15 bg-white/[.07] px-4 py-3.5 text-base text-white placeholder-white/35 outline-none transition duration-300 hover:border-white/30 focus:border-amber focus:bg-white/[.12] focus:ring-4 focus:ring-amber/20'

const css = `
/* ---------- Liquid glass surface ---------- */
.ct-glass{
  position:relative;
  background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.04));
  border:1px solid rgba(255,255,255,.14);
  -webkit-backdrop-filter:blur(18px) saturate(150%);
  backdrop-filter:blur(18px) saturate(150%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.28),
    inset 0 -1px 0 rgba(255,255,255,.05),
    0 24px 48px -16px rgba(20,6,40,.55),
    0 6px 16px rgba(20,6,40,.22);
}
.ct-glass::before{
  content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(135deg,rgba(255,255,255,.55),rgba(255,255,255,0) 38%,rgba(255,255,255,0) 62%,rgba(255,255,255,.22));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
}
.ct-glass::after{
  content:'';position:absolute;left:8%;right:8%;top:0;height:1px;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent);
}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){
  .ct-glass{background:rgba(60,28,95,.78)}
}

/* ---------- Entrance (transform/opacity only: no layout shift) ---------- */
.ct-armed .ct-rise{
  opacity:0;transform:translate3d(0,24px,0);
  transition:opacity .85s cubic-bezier(.2,.7,.2,1) var(--d,0ms),transform .85s cubic-bezier(.2,.7,.2,1) var(--d,0ms);
}
.ct-armed.ct-in .ct-rise{opacity:1;transform:none}

/* ---------- Floating accents ---------- */
@keyframes ct-float{0%,100%{transform:translate3d(0,0,0) rotate(0)}50%{transform:translate3d(0,-16px,0) rotate(4deg)}}
@keyframes ct-float-b{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-12px,14px,0)}}
@keyframes ct-pop{0%{opacity:0;transform:scale(.92) translate3d(0,10px,0)}100%{opacity:1;transform:none}}
@keyframes ct-pulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.55)}100%{box-shadow:0 0 0 18px rgba(255,255,255,0)}}
.ct-float{animation:ct-float 9s ease-in-out infinite;will-change:transform}
.ct-float-b{animation:ct-float-b 12s ease-in-out infinite;will-change:transform}
.ct-pop{animation:ct-pop .6s cubic-bezier(.2,.7,.2,1) both}
.ct-pulse{animation:ct-pulse 1.8s ease-out infinite}

/* ---------- Polished hovers ---------- */
.ct-card{transition:transform .4s cubic-bezier(.2,.7,.2,1),box-shadow .4s ease,border-color .4s ease}
.ct-card:hover{transform:translate3d(0,-3px,0);border-color:rgba(255,255,255,.24)}
.ct-li{transition:transform .3s ease,color .3s ease}
.ct-li:hover{transform:translate3d(4px,0,0);color:rgba(255,255,255,.95)}
.ct-btn{position:relative;overflow:hidden;isolation:isolate;
  box-shadow:0 10px 30px -8px rgba(255,170,40,.55),inset 0 1px 0 rgba(255,255,255,.55)}
.ct-btn::after{
  content:'';position:absolute;top:0;bottom:0;left:-60%;width:40%;z-index:-1;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);
  transform:skewX(-20deg) translate3d(0,0,0);transition:left .8s ease;
}
.ct-btn:hover::after{left:130%}
.ct-btn:hover{box-shadow:0 16px 36px -8px rgba(255,170,40,.7),inset 0 1px 0 rgba(255,255,255,.6)}
.ct-btn:active{transform:scale(.985)}
.ct-select{
  appearance:none;-webkit-appearance:none;padding-right:2.75rem;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-opacity='.6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 1rem center;
}
.ct-field:-webkit-autofill{-webkit-text-fill-color:#fff;transition:background-color 9999s}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .ct-armed .ct-rise{opacity:1!important;transform:none!important;transition:none!important}
  .ct-float,.ct-float-b,.ct-pop,.ct-pulse{animation:none!important}
  .ct-card,.ct-li,.ct-btn,.ct-btn::after{transition:none!important}
  .ct-card:hover,.ct-li:hover{transform:none!important}
  .ct-btn::after{display:none}
}
`

const points = [
  'Your audience and offer',
  'Your existing page, if you have one',
  'Your main conversion goal',
  'The content and features you need',
  'Suitable next steps for the project',
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const ref = useRef(null)
  const submit = e => { e.preventDefault(); setSent(true) } // TODO: connect to your form backend / CRM

  // Arms the entrance animation after mount; content stays visible if JS/observer is unavailable.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('ct-armed')
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('ct-in'); return }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ct-in'); io.disconnect() } },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#2B1245] via-[#4B266A] to-[#5B2F8F] py-16 text-white sm:py-24 lg:py-28"
    >
      <style>{css}</style>

      {/* Ambient background + floating accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ct-float absolute -top-32 right-[-6rem] h-72 w-72 rounded-full bg-[#9B5CF0]/40 blur-[90px] sm:-top-40 sm:right-0 sm:h-96 sm:w-96 sm:blur-[110px]" />
        <div className="ct-float-b absolute -bottom-32 left-[-6rem] h-64 w-64 rounded-full bg-amber/10 blur-[90px] sm:h-96 sm:w-96 sm:blur-[120px]" />
        <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <span className="ct-float absolute left-[6%] top-[14%] hidden h-3 w-3 rounded-full bg-amber/70 shadow-[0_0_24px_6px_rgba(255,180,50,.35)] sm:block" />
        <span className="ct-float-b absolute right-[8%] top-[48%] hidden h-16 w-16 rounded-full border border-white/15 bg-white/[.04] backdrop-blur-sm lg:block" />
        <span className="ct-float absolute bottom-[10%] left-[44%] hidden h-2.5 w-2.5 rounded-full bg-white/60 lg:block" />
      </div>

      <Container className="relative grid gap-10 sm:gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        {/* ---------- Left column ---------- */}
        <div className="min-w-0">
          <div className="ct-rise" style={{ '--d': '0ms' }}>
            <span className="mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-amber to-sun" />
            <h2 className="text-balance break-words text-[1.75rem] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              Let’s Build a Better Destination for Your Next Click.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Your offer deserves a page that communicates its value clearly and makes it easy for the right people to connect. Tell us about your business, the service you want to promote and what you want your landing page to achieve.
            </p>
          </div>

          <div className="ct-rise mt-8 sm:mt-9" style={{ '--d': '120ms' }}>
            <div className="ct-glass ct-card rounded-3xl p-5 sm:p-7">
              <h3 className="text-lg font-bold sm:text-xl">Book Your One-to-One Landing Page Call.</h3>
              <p className="mt-3 text-sm font-semibold text-white/80">On the call, we’ll discuss:</p>
              <ul className="mt-4 space-y-3 text-[0.95rem] text-white/70 sm:text-base">
                {points.map(x => (
                  <li key={x} className="ct-li flex items-start gap-3">
                    <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber/15 ring-1 ring-amber/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    </span>
                    <span className="min-w-0">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Right column ---------- */}
        <div className="ct-rise min-w-0" style={{ '--d': '180ms' }}>
          {sent ? (
            <div className="ct-pop grid min-h-[22rem] place-items-center rounded-3xl bg-white p-6 text-center text-ink shadow-[0_30px_60px_-20px_rgba(20,6,40,.6)] sm:min-h-[24rem] sm:p-8">
              <div>
                <div className="ct-pulse mx-auto grid h-14 w-14 place-items-center rounded-full bg-cobalt text-2xl text-white">✓</div>
                <h3 className="mt-5 text-xl font-bold sm:text-2xl">Thank you—we’ve got your details.</h3>
                <p className="mt-2 text-ink/65">We’ll contact you to arrange a suitable time.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="ct-glass space-y-4 rounded-3xl p-5 sm:space-y-5 sm:p-8 lg:p-9">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <label className="block min-w-0 text-sm font-medium text-white/85">Full Name<input required name="name" autoComplete="name" className={`${field} mt-1.5`} /></label>
                <label className="block min-w-0 text-sm font-medium text-white/85">Business / Brand Name<input required name="brand" autoComplete="organization" className={`${field} mt-1.5`} /></label>
                <label className="block min-w-0 text-sm font-medium text-white/85">Email Address<input required type="email" name="email" autoComplete="email" className={`${field} mt-1.5`} /></label>
                <label className="block min-w-0 text-sm font-medium text-white/85">Phone / WhatsApp Number<input required type="tel" name="phone" autoComplete="tel" className={`${field} mt-1.5`} /></label>
              </div>
              <label className="block text-sm font-medium text-white/85">Your Business Type
                <select name="type" className={`${field} ct-select mt-1.5`}>
                  {['Coach', 'Consultant', 'Trainer', 'Other'].map(o => <option key={o} className="text-ink">{o}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium text-white/85">Current Website or Landing Page (optional)<input type="url" name="site" placeholder="https://" className={`${field} mt-1.5`} /></label>
              <label className="block text-sm font-medium text-white/85">What Would You Like Your Page to Achieve?<textarea required rows={4} name="goal" className={`${field} mt-1.5 resize-y`} /></label>
              <button className="site-cta ct-btn min-h-[3.25rem] w-full rounded-full bg-gradient-to-r from-amber to-sun px-6 py-3.5 text-base font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber/40">
                Book My One-to-One Call
              </button>
              <p className="text-center text-sm text-white/55">Share your details, and we’ll contact you to arrange a suitable time.</p>
              <p className="text-center text-xs leading-relaxed text-white/40">
                By submitting this form, you agree to be contacted by Your Brand Name about your enquiry. Please read our <a href="#" className="underline underline-offset-2 transition hover:text-white/70">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}