import { useEffect, useRef } from 'react'
import { why } from '../data'
import { Container } from './ui'

/* ----------------------------------------------------------------
   Icons (inline SVG, inherit currentColor)
----------------------------------------------------------------- */
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

/* ----------------------------------------------------------------
   Backdrop — aurora orbs + soft grid + sparkle dots
----------------------------------------------------------------- */
function WhyBackdrop() {
  const dots = Array.from({ length: 16 })
  return (
    <div className="wy-backdrop" aria-hidden="true">
      <span className="wy-orb wy-orb--1 wy-float" />
      <span className="wy-orb wy-orb--2 wy-float-b" />
      <span className="wy-orb wy-orb--3 wy-float" />
      <span className="wy-grid" />
      <div className="wy-dots">
        {dots.map((_, i) => (
          <span
            key={i}
            className="wy-dot"
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 61) % 100}%`,
              animationDelay: `${(i % 6) * 1.05}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Main component
----------------------------------------------------------------- */
export default function Why() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = root.querySelectorAll('[data-wy]')
    root.classList.add('wy-armed')
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('wy-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('wy-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      ref={rootRef}
      className="wy-section"
      aria-label="Why choose Creative Crew"
    >
      <style>{css}</style>

      <WhyBackdrop />

      <Container>
        <div className="wy-header">
          {/* ---------- Left: heading block, left-aligned ---------- */}
          <div className="wy-header__left">
            <div className="wy-eyebrow" data-wy>
              <span className="wy-eyebrow-line" aria-hidden="true" />
              <span className="wy-eyebrow-text">Why it works</span>
            </div>

            <h2 className="wy-title" data-wy>
              Why <span className="wy-title__accent">Creative Crew?</span>
            </h2>

            <p className="wy-subtitle" data-wy>
              Your Expertise Deserves a Page That Explains It Well.
            </p>

            <div data-wy aria-hidden className="wy-rule" />
          </div>

          {/* ---------- Right: stat block ---------- */}
          <div className="wy-header__right" aria-hidden>
            <span className="wy-stat">
              <span className="wy-stat__num">6</span>
              <span className="wy-stat__label">
                Reasons to<br />build it right
              </span>
            </span>
            <span className="wy-stat">
              <span className="wy-stat__num">100%</span>
              <span className="wy-stat__label">
                Focused on<br />your goal
              </span>
            </span>
          </div>
        </div>

        <ul className="wy-grid-list">
          {why.map(([title, desc], i) => (
            <li
              key={title}
              data-wy
              style={{ '--d': `${(i % 3) * 90}ms` }}
              className="wy-item min-w-0"
            >
              <div
                onPointerMove={spotlight}
                className="wy-glass wy-card"
              >
                <span aria-hidden className="wy-spot" />

                <div className="wy-card__top">
                  <span className={`wy-tile ${i % 2 ? 'wy-tile--warm' : ''}`}>
                    <WhyIcon index={i} />
                  </span>
                  <span aria-hidden className="wy-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="wy-card__title">{title}</h3>
                <p className="wy-card__desc">{desc}</p>

                <span aria-hidden className="wy-bar" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* ----------------------------------------------------------------
   Styles
----------------------------------------------------------------- */
const css = `
/* ============================================================
   SECTION WRAPPER
============================================================ */
.wy-section{
  position:relative;isolation:isolate;overflow:hidden;
  padding-block:clamp(56px,7vw,110px);
  background:
    radial-gradient(ellipse 70% 45% at 50% 0%,rgba(155,92,240,.12),transparent 70%),
    linear-gradient(180deg,#ffffff 0%,#faf7ff 50%,#f3ecfa 100%);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:#26103d;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}
.wy-section *,
.wy-section *::before,
.wy-section *::after{box-sizing:border-box}

/* ============================================================
   BACKDROP
============================================================ */
.wy-backdrop{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}

.wy-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.55;will-change:transform}
.wy-orb--1{width:min(520px,80vw);height:min(520px,80vw);top:-140px;left:-160px;background:radial-gradient(circle,#9B5CF0 0%,transparent 70%)}
.wy-orb--2{width:min(560px,85vw);height:min(560px,85vw);top:30%;right:-200px;background:radial-gradient(circle,#FF8A3D 0%,transparent 70%);opacity:.45}
.wy-orb--3{width:min(440px,75vw);height:min(440px,75vw);bottom:-160px;left:30%;background:radial-gradient(circle,#6D35C9 0%,transparent 70%);opacity:.4}

.wy-grid{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(109,53,201,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(109,53,201,.05) 1px,transparent 1px);
  background-size:56px 56px;
  mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 40%,transparent 80%);
  -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 40%,transparent 80%);
  opacity:.5;
}

.wy-dots{position:absolute;inset:0}
.wy-dot{
  position:absolute;width:4px;height:4px;border-radius:50%;
  background:#9B5CF0;box-shadow:0 0 8px 2px rgba(155,92,240,.5);
  opacity:0;animation:wy-dot-float 8s linear infinite;
}
.wy-dot:nth-child(3n){background:#FF8A3D;box-shadow:0 0 8px 2px rgba(255,138,61,.5)}
@keyframes wy-dot-float{
  0%{opacity:0;transform:translateY(0) scale(.6)}
  20%{opacity:.85}
  80%{opacity:.5}
  100%{opacity:0;transform:translateY(-140px) scale(1)}
}

/* ============================================================
   HEADER — left aligned
============================================================ */
.wy-header{
  position:relative;z-index:1;
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:clamp(24px,3vw,36px);
  align-items:end;
  margin-bottom:clamp(32px,4.5vw,56px);
}

.wy-header__left{
  min-width:0;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  text-align:left;
}

/* Eyebrow */
.wy-eyebrow{
  display:inline-flex;
  align-items:center;
  gap:10px;
  margin-bottom:16px;
  min-width:0;
}
.wy-eyebrow-line{
  display:inline-block;
  width:28px;
  height:2px;
  border-radius:999px;
  background:linear-gradient(90deg,#6D35C9,#FF8A3D);
  flex:0 0 auto;
}
.wy-eyebrow-text{
  color:#6D35C9;
  font-size:12px;
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
  white-space:nowrap;
}

/* Main heading */
.wy-title{
  margin:0;
  color:#26103d;
  font-size:clamp(30px,4.6vw,52px);
  font-weight:800;
  line-height:1.08;
  letter-spacing:-.035em;
  text-wrap:balance;
  overflow-wrap:break-word;
  max-width:15ch;
}
.wy-title__accent{
  background:linear-gradient(120deg,#6D35C9 0%,#FF8A3D 100%);
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  color:transparent;
}

/* Subtitle */
.wy-subtitle{
  margin:clamp(14px,1.8vw,20px) 0 0;
  color:rgba(48,32,69,.68);
  font-size:clamp(15px,1.5vw,18px);
  font-weight:400;
  line-height:1.65;
  letter-spacing:-.005em;
  max-width:42ch;
  text-wrap:pretty;
  overflow-wrap:break-word;
}

/* Accent rule under heading */
.wy-rule{
  display:block;
  width:56px;
  height:4px;
  border-radius:999px;
  margin-top:clamp(20px,2.4vw,28px);
  background:linear-gradient(90deg,#6D35C9,#FF8A3D);
  transform-origin:left;
}

/* ============================================================
   STATS
============================================================ */
.wy-header__right{
  display:flex;
  flex-wrap:wrap;
  gap:clamp(20px,3vw,40px);
  min-width:0;
  align-items:flex-end;
  justify-content:flex-start;
}
.wy-stat{
  display:flex;
  flex-direction:column;
  gap:6px;
  padding-left:14px;
  border-left:2px solid rgba(109,53,201,.2);
  min-width:0;
}
.wy-stat__num{
  font-size:clamp(22px,2.4vw,28px);
  font-weight:800;
  letter-spacing:-.02em;
  line-height:1;
  background:linear-gradient(120deg,#6D35C9,#FF8A3D);
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  color:transparent;
}
.wy-stat__label{
  font-size:12px;
  line-height:1.5;
  color:rgba(48,32,69,.6);
  font-weight:500;
}

/* ============================================================
   GRID
============================================================ */
.wy-grid-list{
  position:relative;z-index:1;
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:clamp(14px,1.8vw,22px);
  margin:0;
  padding:0;
  list-style:none;
}
.wy-item{min-width:0}

/* ============================================================
   GLASS CARD
============================================================ */
.wy-glass{
  position:relative;
  overflow:hidden;
  isolation:isolate;
  height:100%;
  background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,255,255,.6));
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

.wy-spot{
  position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;opacity:0;
  background:radial-gradient(
    260px circle at var(--mx,50%) var(--my,0%),
    rgba(155,92,240,.16),
    rgba(255,138,61,.06) 55%,
    transparent 75%
  );
  transition:opacity .4s ease;
}

/* Card content */
.wy-card{
  display:flex;
  flex-direction:column;
  border-radius:clamp(1.25rem,2vw,1.75rem);
  padding:clamp(1.25rem,2vw,1.75rem);
  padding-bottom:clamp(1.75rem,2.4vw,2.25rem);
}

.wy-card__top{
  position:relative;z-index:1;
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:12px;
}

.wy-card__title{
  position:relative;z-index:1;
  margin:clamp(18px,2vw,22px) 0 0;
  font-size:clamp(1.05rem,1.6vw,1.25rem);
  font-weight:700;
  line-height:1.35;
  letter-spacing:-.015em;
  color:#26103d;
  overflow-wrap:break-word;
  text-wrap:balance;
}
.wy-card__desc{
  position:relative;z-index:1;
  margin:10px 0 0;
  font-size:clamp(.9rem,1.3vw,1rem);
  line-height:1.7;
  color:rgba(48,32,69,.68);
  overflow-wrap:break-word;
  text-wrap:pretty;
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
.wy-tile::before{
  content:'';position:absolute;inset:3px;border-radius:12px;
  border:1px solid rgba(255,255,255,.8);pointer-events:none;
}
.wy-tile svg{transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.wy-tile--warm{
  color:#E36F2C;
  background:linear-gradient(145deg,#fff,#FFE8D8);
  border-color:rgba(255,138,61,.28);
  box-shadow:0 5px 0 -1px rgba(255,138,61,.28),0 14px 22px -14px rgba(255,138,61,.7),inset 0 1px 0 #fff;
}

/* Number pill */
.wy-num{
  display:grid;place-items:center;flex:0 0 auto;
  min-width:2rem;height:1.75rem;padding:0 .55rem;border-radius:9999px;
  font-size:.7rem;font-weight:700;letter-spacing:.06em;
  font-variant-numeric:tabular-nums;color:rgba(48,32,69,.55);
  background:rgba(255,255,255,.7);
  border:1px solid rgba(109,53,201,.12);
  box-shadow:inset 0 1px 0 #fff;
}

/* Bottom accent bar */
.wy-bar{
  position:absolute;left:1.5rem;right:1.5rem;bottom:0;height:3px;
  border-radius:3px 3px 0 0;pointer-events:none;z-index:1;
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
.wy-armed .wy-rule{
  opacity:0;transform:scaleX(.3);
  transition:opacity .7s ease .15s,transform .8s cubic-bezier(.2,.7,.2,1) .15s;
}
.wy-armed .wy-rule.wy-in{opacity:1;transform:none}

/* Floating accents */
@keyframes wy-float{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-18px,0)}}
@keyframes wy-float-b{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-14px,16px,0)}}
.wy-float{animation:wy-float 10s ease-in-out infinite;will-change:transform}
.wy-float-b{animation:wy-float-b 13s ease-in-out infinite;will-change:transform}

/* ============================================================
   RESPONSIVE
============================================================ */

/* Tablet: two-column grid */
@media (min-width:640px){
  .wy-grid-list{grid-template-columns:repeat(2,minmax(0,1fr))}
}

/* Desktop: header becomes two columns, stats move to right */
@media (min-width:900px){
  .wy-header{
    grid-template-columns:minmax(0,1.5fr) minmax(0,.5fr);
    gap:clamp(40px,6vw,80px);
  }
  .wy-header__right{
    justify-content:flex-end;
    align-items:flex-end;
    text-align:left;
  }
}

/* Large desktop: three-column grid */
@media (min-width:1080px){
  .wy-grid-list{grid-template-columns:repeat(3,minmax(0,1fr))}
}

/* Small mobile tighten */
@media (max-width:359px){
  .wy-card{padding:1.1rem;padding-bottom:1.5rem}
  .wy-tile{width:2.75rem;height:2.75rem;border-radius:14px}
  .wy-tile svg{width:20px;height:20px}
  .wy-title{font-size:26px}
  .wy-header__right{gap:16px}
  .wy-stat{padding-left:10px}
}

/* Reduced motion */
@media (prefers-reduced-motion:reduce){
  .wy-armed .wy-item,.wy-armed .wy-rule{opacity:1!important;transform:none!important;transition:none!important}
  .wy-float,.wy-float-b,.wy-dot{animation:none!important}
  .wy-dot{display:none}
  .wy-glass,.wy-tile,.wy-tile svg,.wy-bar,.wy-spot{transition:none!important}
  .wy-glass:hover,.wy-glass:hover .wy-tile,.wy-glass:hover .wy-tile svg{transform:none!important}
  .wy-bar{transform:scaleX(1)!important}
}
`