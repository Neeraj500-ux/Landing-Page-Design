import { useEffect, useRef } from 'react'
import { why } from '../data'
import { Container, SectionHead } from './ui'

/* ---------- Icons (inline SVG, inherit currentColor) ---------- */
const iconSet = [
  // Strategy Before Styling
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.3" />
  </>,
  // Content and Design Working Together
  <>
    <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
  </>,
  // A Focused Visitor Journey
  <>
    <path d="m4 3 6 18 3-7 7-3L4 3Z" />
    <path d="m14 15 5 5" />
  </>,
  // Attention to Mobile Details
  <>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M10 5h4m-3 14h2" />
  </>,
  // Clear Scope and Communication
  <>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
    <path d="M9 11h6M9 14h3" />
  </>,
  // A Page You Can Build On
  <>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </>,
]

function WhyIcon({ index }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconSet[index % iconSet.length]}
    </svg>
  )
}

/* ---------- Styles & animations ---------- */
const css = `
/* Glass card */
.wy-glass{
  position:relative;overflow:hidden;isolation:isolate;
  background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,255,255,.62));
  border:1px solid rgba(255,255,255,.95);
  -webkit-backdrop-filter:blur(16px) saturate(160%);
  backdrop-filter:blur(16px) saturate(160%);
  box-shadow:
    inset 0 1px 0 #fff,
    inset 0 -1px 0 rgba(109,53,201,.06),
    0 1px 2px rgba(48,32,69,.05),
    0 14px 30px -18px rgba(109,53,201,.35),
    0 32px 60px -38px rgba(48,32,69,.35);
  transition:transform .45s cubic-bezier(.2,.7,.2,1),box-shadow .45s ease;
}
.wy-glass::before{
  content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;z-index:2;
  background:linear-gradient(135deg,rgba(255,255,255,.95),rgba(109,53,201,.16) 45%,rgba(255,138,61,.22));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
}
.wy-glass::after{
  content:'';position:absolute;left:10%;right:10%;top:0;height:1px;pointer-events:none;z-index:2;
  background:linear-gradient(90deg,transparent,#fff,transparent);
}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){
  .wy-glass{background:rgba(255,255,255,.95)}
}

/* Pointer spotlight (desktop only) */
.wy-spot{
  position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;opacity:0;
  background:radial-gradient(260px circle at var(--mx,50%) var(--my,0%),rgba(155,92,240,.16),rgba(255,138,61,.06) 55%,transparent 75%);
  transition:opacity .4s ease;
}

/* Icon tile */
.wy-tile{
  position:relative;display:grid;place-items:center;flex:0 0 auto;border-radius:16px;
  width:3.25rem;height:3.25rem;color:#6D35C9;
  background:linear-gradient(145deg,#fff,#EFE4FB);
  border:1px solid rgba(109,53,201,.18);
  box-shadow:0 5px 0 -1px rgba(109,53,201,.22),0 14px 22px -14px rgba(109,53,201,.6),inset 0 1px 0 #fff;
  transition:transform .45s cubic-bezier(.2,.7,.2,1);
}
.wy-tile::before{content:'';position:absolute;inset:3px;border-radius:12px;border:1px solid rgba(255,255,255,.8);pointer-events:none}
.wy-tile svg{transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.wy-tile--warm{
  color:#E36F2C;
  background:linear-gradient(145deg,#fff,#FFE8D8);
  border-color:rgba(255,138,61,.28);
  box-shadow:0 5px 0 -1px rgba(255,138,61,.28),0 14px 22px -14px rgba(255,138,61,.7),inset 0 1px 0 #fff;
}

/* Number pill */
.wy-num{
  display:grid;place-items:center;flex:0 0 auto;min-width:2rem;height:1.75rem;padding:0 .55rem;border-radius:9999px;
  font-size:.7rem;font-weight:600;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:rgba(48,32,69,.5);
  background:rgba(255,255,255,.7);border:1px solid rgba(109,53,201,.12);
  box-shadow:inset 0 1px 0 #fff;
}

/* Bottom accent bar */
.wy-bar{
  position:absolute;left:1.5rem;right:1.5rem;bottom:0;height:3px;border-radius:3px 3px 0 0;pointer-events:none;z-index:1;
  background:linear-gradient(90deg,#6D35C9,#FF8A3D);
  transform:scaleX(.16);transform-origin:left;
  transition:transform .6s cubic-bezier(.2,.7,.2,1);
}

/* Hover (mouse devices only) */
@media (hover:hover) and (pointer:fine){
  .wy-glass:hover{
    transform:translate3d(0,-6px,0);
    box-shadow:
      inset 0 1px 0 #fff,
      inset 0 -1px 0 rgba(109,53,201,.08),
      0 1px 2px rgba(48,32,69,.05),
      0 24px 44px -18px rgba(109,53,201,.45),
      0 44px 76px -42px rgba(48,32,69,.42);
  }
  .wy-glass:hover .wy-spot{opacity:1}
  .wy-glass:hover .wy-bar{transform:scaleX(1)}
  .wy-glass:hover .wy-tile{transform:translate3d(0,-2px,0)}
  .wy-glass:hover .wy-tile svg{transform:rotate(-8deg) scale(1.1)}
}

/* Entrance (opacity/transform only: no layout shift) */
.wy-armed .wy-item{
  opacity:0;transform:translate3d(0,28px,0);
  transition:opacity .8s ease var(--d,0ms),transform .9s cubic-bezier(.2,.7,.2,1) var(--d,0ms);
}
.wy-armed .wy-item.wy-in{opacity:1;transform:none}
.wy-armed .wy-rule{opacity:0;transform:scaleX(.3);transition:opacity .7s ease .15s,transform .8s cubic-bezier(.2,.7,.2,1) .15s}
.wy-armed .wy-rule.wy-in{opacity:1;transform:none}

/* Floating accents */
@keyframes wy-float{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-18px,0)}}
@keyframes wy-float-b{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-14px,16px,0)}}
.wy-float{animation:wy-float 10s ease-in-out infinite;will-change:transform}
.wy-float-b{animation:wy-float-b 13s ease-in-out infinite;will-change:transform}

/* Reduced motion */
@media (prefers-reduced-motion:reduce){
  .wy-armed .wy-item,.wy-armed .wy-rule{opacity:1!important;transform:none!important;transition:none!important}
  .wy-float,.wy-float-b{animation:none!important}
  .wy-glass,.wy-tile,.wy-tile svg,.wy-bar,.wy-spot{transition:none!important}
  .wy-glass:hover,.wy-glass:hover .wy-tile,.wy-glass:hover .wy-tile svg{transform:none!important}
  .wy-bar{transform:scaleX(1)!important}
}
`

export default function Why() {
  const rootRef = useRef(null)

  // Arms entrance animations after mount; content stays visible if JS/observer is unavailable.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = root.querySelectorAll('[data-wy]')
    root.classList.add('wy-armed')
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach(el => el.classList.add('wy-in'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wy-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    )
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const spotlight = e => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-28">
      <style>{css}</style>

      {/* Soft ambient glow so the glass has something to blur */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="wy-float absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#9B5CF0]/20 blur-[90px] sm:h-96 sm:w-96" />
        <div className="wy-float-b absolute -right-24 top-1/2 h-64 w-64 rounded-full bg-[#FF8A3D]/20 blur-[90px] sm:h-96 sm:w-96" />
        <div className="wy-float absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[#6D35C9]/10 blur-[80px] sm:h-72 sm:w-72" />
      </div>

      <Container>
        <SectionHead title="Why Your Brand Name?" text="Your Expertise Deserves a Page That Explains It Well." />
        <div
          data-wy
          aria-hidden
          className="wy-rule mx-auto mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-[#6D35C9] to-[#FF8A3D]"
        />

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {why.map(([title, desc], i) => (
            <li
              key={title}
              data-wy
              style={{ '--d': `${(i % 3) * 90}ms` }}
              className="wy-item min-w-0"
            >
              <div
                onPointerMove={spotlight}
                className="wy-glass h-full rounded-[1.5rem] p-5 pb-7 sm:rounded-[1.75rem] sm:p-6 sm:pb-8 lg:p-7 lg:pb-9"
              >
                <span aria-hidden className="wy-spot" />

                <div className="relative z-[1] flex items-start justify-between gap-3">
                  <span className={`wy-tile ${i % 2 ? 'wy-tile--warm' : ''}`}>
                    <WhyIcon index={i} />
                  </span>
                  <span aria-hidden className="wy-num">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="relative z-[1] mt-5 break-words text-lg font-bold leading-snug tracking-tight sm:mt-6 sm:text-xl">
                  {title}
                </h3>
                <p className="relative z-[1] mt-2 text-[0.95rem] leading-relaxed text-ink/65 sm:text-base">{desc}</p>

                <span aria-hidden className="wy-bar" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}