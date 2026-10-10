import { useEffect, useRef } from 'react'
import { steps } from '../data'
import { Button, Container, Reveal, SectionHead } from './ui'

/* ---------- Icons (inline SVG, inherit currentColor) ---------- */
const iconPaths = {
  discover: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
      <path d="M11 8.5v5M8.5 11h5" />
    </>
  ),
  plan: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="3" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  design: (
    <>
      <path d="m16 3 5 5L9 20H4v-5L16 3Z" />
      <path d="m13 6 5 5" />
    </>
  ),
  build: (
    <>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
    </>
  ),
  launch: (
    <>
      <path d="M12 15 9 12a15 15 0 0 1 11-9 15 15 0 0 1-8 12Z" />
      <path d="M9 12H4s.5-3 2-4c1.5-1 5 0 5 0M12 15v5s3-.5 4-2c1-1.5 0-5 0-5" />
      <circle cx="16" cy="8" r="1.2" />
    </>
  ),
}

const fallbackOrder = ['discover', 'plan', 'design', 'build', 'launch']

function StepIcon({ name }) {
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
      {iconPaths[name] || iconPaths.discover}
    </svg>
  )
}

/* ---------- Styles & animations ---------- */
const css = `
/* Glass card */
.pr-glass{
  position:relative;
  background:linear-gradient(145deg,rgba(255,255,255,.9),rgba(255,255,255,.6));
  border:1px solid rgba(255,255,255,.95);
  -webkit-backdrop-filter:blur(16px) saturate(160%);
  backdrop-filter:blur(16px) saturate(160%);
  box-shadow:
    inset 0 1px 0 #fff,
    inset 0 -1px 0 rgba(109,53,201,.06),
    0 1px 2px rgba(48,32,69,.05),
    0 14px 30px -18px rgba(109,53,201,.35),
    0 32px 60px -38px rgba(48,32,69,.35);
}
.pr-glass::before{
  content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(135deg,rgba(255,255,255,.95),rgba(109,53,201,.16) 45%,rgba(255,138,61,.22));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
}
.pr-glass::after{
  content:'';position:absolute;left:10%;right:10%;top:0;height:1px;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,1),transparent);
}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){
  .pr-glass{background:rgba(255,255,255,.94)}
}

/* Timeline line */
.pr-line{
  position:absolute;top:0;bottom:0;width:2px;border-radius:2px;pointer-events:none;
  left:calc(1.25rem - 1px);
  background:linear-gradient(to bottom,transparent,rgba(109,53,201,.16) 8%,rgba(109,53,201,.16) 92%,transparent);
}
.pr-line-fill{
  position:absolute;inset:0;border-radius:inherit;transform-origin:top;
  background:linear-gradient(to bottom,rgba(109,53,201,0),#6D35C9 10%,#FF8A3D 90%,rgba(255,138,61,0));
}
@media (min-width:768px){.pr-line{left:calc(50% - 1px)}}

/* Step node */
.pr-node{
  position:absolute;z-index:10;display:grid;place-items:center;border-radius:9999px;color:#fff;
  background:linear-gradient(135deg,#6D35C9,#FF8A3D);
  box-shadow:
    0 0 0 4px rgba(255,255,255,.9),
    0 0 0 5px rgba(109,53,201,.14),
    0 10px 22px -6px rgba(109,53,201,.55),
    inset 0 1px 0 rgba(255,255,255,.5);
}
.pr-node::after{
  content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  border:2px solid rgba(109,53,201,.35);
  animation:pr-ring 3.2s ease-out infinite;animation-delay:var(--d,0ms);
}

/* Connector from card to node (desktop) */
.pr-conn{position:absolute;display:none;height:2px;border-radius:2px;pointer-events:none}
@media (min-width:768px){
  .pr-conn{display:block;top:1.75rem;width:2.5rem}
  .pr-step--l .pr-conn{right:-2.5rem;background:linear-gradient(90deg,rgba(109,53,201,.45),rgba(109,53,201,.08))}
  .pr-step--r .pr-conn{left:-2.5rem;background:linear-gradient(270deg,rgba(255,138,61,.5),rgba(255,138,61,.08))}
}
@media (min-width:1024px){
  .pr-conn{width:3rem}
  .pr-step--l .pr-conn{right:-3rem}
  .pr-step--r .pr-conn{left:-3rem}
}
@media (max-width:767px){
  .pr-conn{display:block;top:1.5rem;left:-1rem;width:1rem;background:linear-gradient(90deg,rgba(109,53,201,.45),rgba(109,53,201,.1))}
}

/* Icon tile */
.pr-tile{
  position:relative;display:grid;place-items:center;flex:0 0 auto;border-radius:16px;
  width:3.25rem;height:3.25rem;color:#6D35C9;
  background:linear-gradient(145deg,#fff,#EFE4FB);
  border:1px solid rgba(109,53,201,.18);
  box-shadow:0 5px 0 -1px rgba(109,53,201,.22),0 14px 22px -14px rgba(109,53,201,.6),inset 0 1px 0 #fff;
  transition:transform .4s cubic-bezier(.2,.7,.2,1);
}
.pr-tile::before{content:'';position:absolute;inset:3px;border-radius:12px;border:1px solid rgba(255,255,255,.8);pointer-events:none}
.pr-tile svg{transition:transform .4s cubic-bezier(.2,.7,.2,1)}
.pr-tile--warm{
  color:#E36F2C;
  background:linear-gradient(145deg,#fff,#FFE8D8);
  border-color:rgba(255,138,61,.28);
  box-shadow:0 5px 0 -1px rgba(255,138,61,.28),0 14px 22px -14px rgba(255,138,61,.7),inset 0 1px 0 #fff;
}

/* Ghost number */
.pr-ghost{
  position:absolute;right:1.25rem;top:.4rem;pointer-events:none;user-select:none;
  font-size:3.75rem;line-height:1;font-weight:700;letter-spacing:-.04em;
  background:linear-gradient(160deg,rgba(109,53,201,.2),rgba(109,53,201,.03));
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}

/* Detail panel */
.pr-note{
  position:relative;overflow:hidden;
  border:1px solid rgba(109,53,201,.1);
  background:linear-gradient(145deg,rgba(243,236,252,.9),rgba(255,255,255,.6));
  box-shadow:inset 0 1px 0 #fff;
}
.pr-note::before{
  content:'';position:absolute;left:0;top:.75rem;bottom:.75rem;width:3px;border-radius:0 3px 3px 0;
  background:linear-gradient(to bottom,#6D35C9,#FF8A3D);
}

/* Card hover */
.pr-card{transition:transform .45s cubic-bezier(.2,.7,.2,1),box-shadow .45s ease}
@media (hover:hover) and (pointer:fine){
  .pr-card:hover{
    transform:translate3d(0,-5px,0);
    box-shadow:
      inset 0 1px 0 #fff,
      inset 0 -1px 0 rgba(109,53,201,.08),
      0 1px 2px rgba(48,32,69,.05),
      0 22px 40px -18px rgba(109,53,201,.45),
      0 40px 70px -40px rgba(48,32,69,.4);
  }
  .pr-card:hover .pr-tile{transform:translate3d(0,-2px,0)}
  .pr-card:hover .pr-tile svg{transform:rotate(-8deg) scale(1.08)}
}

/* Entrance (opacity/transform only: no layout shift) */
.pr-step--l{--dx:-30px}
.pr-step--r{--dx:30px}
@media (max-width:767px){.pr-step--l,.pr-step--r{--dx:0px}}
.pr-armed .pr-step .pr-card-wrap{
  opacity:0;transform:translate3d(var(--dx,0),26px,0);
  transition:opacity .8s ease var(--d,0ms),transform .9s cubic-bezier(.2,.7,.2,1) var(--d,0ms);
}
.pr-armed .pr-step.pr-in .pr-card-wrap{opacity:1;transform:none}
.pr-armed .pr-step .pr-node{
  opacity:0;transform:scale(.5);
  transition:opacity .5s ease var(--d,0ms),transform .6s cubic-bezier(.3,1.5,.5,1) var(--d,0ms);
}
.pr-armed .pr-step.pr-in .pr-node{opacity:1;transform:none}
.pr-armed .pr-line-fill{transform:scaleY(0);transition:transform 1.8s cubic-bezier(.3,.6,.2,1)}
.pr-armed .pr-list.pr-in .pr-line-fill{transform:scaleY(1)}

/* Floating accents */
@keyframes pr-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.75);opacity:0}}
@keyframes pr-float{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-18px,0)}}
@keyframes pr-float-b{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-14px,16px,0)}}
.pr-float{animation:pr-float 10s ease-in-out infinite;will-change:transform}
.pr-float-b{animation:pr-float-b 13s ease-in-out infinite;will-change:transform}

/* Reduced motion */
@media (prefers-reduced-motion:reduce){
  .pr-armed .pr-step .pr-card-wrap,
  .pr-armed .pr-step .pr-node,
  .pr-armed .pr-line-fill{opacity:1!important;transform:none!important;transition:none!important}
  .pr-node::after,.pr-float,.pr-float-b{animation:none!important}
  .pr-card,.pr-tile,.pr-tile svg{transition:none!important}
  .pr-card:hover,.pr-card:hover .pr-tile,.pr-card:hover .pr-tile svg{transform:none!important}
}
`

export default function Process() {
  const rootRef = useRef(null)

  // Arms entrance animations after mount; content stays visible if JS/observer is unavailable.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = root.querySelectorAll('[data-pr]')
    root.classList.add('pr-armed')
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach(el => el.classList.add('pr-in'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pr-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    )
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="process"
      ref={rootRef}
      className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-28"
    >
      <style>{css}</style>

      {/* Soft ambient glow so the glass has something to blur */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="pr-float absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#9B5CF0]/20 blur-[90px] sm:h-96 sm:w-96" />
        <div className="pr-float-b absolute -right-24 top-1/2 h-64 w-64 rounded-full bg-[#FF8A3D]/20 blur-[90px] sm:h-96 sm:w-96" />
        <div className="pr-float absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-[#6D35C9]/10 blur-[80px] sm:h-72 sm:w-72" />
      </div>

      <Container>
        <SectionHead title="A Clear Process From First Conversation to Launch." />

        <ol data-pr className="pr-list relative mt-12 space-y-7 sm:mt-16 md:space-y-0">
          <span aria-hidden className="pr-line">
            <span className="pr-line-fill" />
          </span>

          {steps.map(([title, desc, detail, label, icon], i) => {
            const right = i % 2 === 1
            const iconName = icon || fallbackOrder[i % fallbackOrder.length]
            return (
              <li
                key={title}
                data-pr
                style={{ '--d': '0ms' }}
                className={`pr-step ${right ? 'pr-step--r' : 'pr-step--l'} relative pl-14 md:grid md:grid-cols-2 md:gap-x-20 md:py-4 md:pl-0 lg:gap-x-24`}
              >
                <span
                  className="pr-node left-0 top-1 h-10 w-10 font-display text-base font-bold md:left-1/2 md:top-5 md:-ml-6 md:h-12 md:w-12 md:text-lg"
                  style={{ '--d': '120ms' }}
                >
                  {i + 1}
                </span>

                <div
                  className={`pr-card-wrap relative min-w-0 ${right ? 'md:col-start-2' : 'md:col-start-1'}`}
                  style={{ '--d': '60ms' }}
                >
                  <span aria-hidden className="pr-conn" />
                  <div className="pr-card pr-glass rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6 lg:p-7">
                    <span aria-hidden className="pr-ghost font-display">0{i + 1}</span>

                    <span className={`pr-tile ${i % 2 ? 'pr-tile--warm' : ''}`}>
                      <StepIcon name={iconName} />
                    </span>

                    <h3 className="relative mt-5 break-words text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-[1.35rem]">
                      {title}
                    </h3>
                    <p className="relative mt-2 text-[0.95rem] leading-relaxed text-ink/65 sm:text-base">{desc}</p>

                    <p className="pr-note relative mt-4 rounded-2xl py-3.5 pl-5 pr-4 text-left text-sm leading-relaxed text-ink/75 sm:mt-5">
                      <b className="font-semibold text-cobalt">{label}: </b>
                      {detail}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        <Reveal className="mt-12 text-center sm:mt-14">
          <Button variant="dark">Start With a One-to-One Call</Button>
        </Reveal>
      </Container>
    </section>
  )
}