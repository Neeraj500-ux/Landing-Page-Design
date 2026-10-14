import { Container } from './ui'

/* ----------------------------------------------------------------
   Data — swap these with your real values when ready
----------------------------------------------------------------- */
const CONTACT_EMAIL = '[Your Business Email]'
const CONTACT_PHONE = '[Your Business Number]'

const QUICK_LINKS = [
  { label: 'How It Works', href: '#how' },
  { label: 'About', href: '#about' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const logoSrc = `${
    baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  }images/Neeraj12.png`

  return (
    <footer className="site-footer" aria-label="Site footer">
      <style>{styles}</style>

      {/* soft aurora glow */}
      <div className="site-footer__glow" aria-hidden="true" />

      <Container>
        {/* ============ MAIN GRID ============ */}
        <div className="site-footer__grid">
          {/* ---------- Brand column ---------- */}
          <div className="site-footer__brand">
            <a
              href="#top"
              className="site-footer__logo"
              aria-label="Creative Crew — home"
            >
              <span className="site-footer__logo-mark">
                <img
                  src={logoSrc}
                  alt="Creative Crew logo"
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="site-footer__logo-text">Creative Crew</span>
            </a>

            <p className="site-footer__desc">
              Meta Ads services for fashion designing, beauty and
              skill-based institutes.
            </p>

            <p className="site-footer__desc site-footer__desc--muted">
              Helping prospective students discover your courses and take the
              next step toward an admission conversation.
            </p>
          </div>

          {/* ---------- Contact column ---------- */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Contact</h3>
            <p className="site-footer__contact-line">
              Use the enquiry form and we&rsquo;ll reply to you directly.
            </p>
            <ul className="site-footer__contact-list">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer__link">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE}`} className="site-footer__link">
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* ---------- Quick links column ---------- */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Quick Links</h3>
            <ul className="site-footer__links">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="site-footer__link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============ DIVIDER ============ */}
        <div className="site-footer__divider" aria-hidden="true" />

        {/* ============ MIDDLE ROW: copyright + CTA ============ */}
        <div className="site-footer__mid">
          <p className="site-footer__copyright">
            © 2026 Creative Crew. All rights reserved.
          </p>

          <a href="#contact" className="site-footer__cta">
            <span> Yes! Let's Grow My Revenue </span>
          </a>
        </div>

        {/* ============ DISCLAIMERS ============ */}
        <div className="site-footer__disclaimers">
          <p>
            This website is independently operated by Creative Crew and is not
            affiliated with or endorsed by Meta, Facebook or Instagram.
          </p>
          <p>
            Campaign targets are not guarantees. Lead volume, lead quality and
            admissions vary with advertising budget, course offering, location,
            campaign response and the institute&rsquo;s admissions process.
          </p>
        </div>
      </Container>
    </footer>
  )
}

/* ----------------------------------------------------------------
   Styles
----------------------------------------------------------------- */
const styles = `
.site-footer{
  --ftr-bg-1:#2B1245;
  --ftr-bg-2:#1b0a2e;
  --ftr-ink:#ffffff;
  --ftr-muted:rgba(255,255,255,.62);
  --ftr-muted-strong:rgba(255,255,255,.8);
  --ftr-line:rgba(255,255,255,.10);
  --ftr-violet:#9B5CF0;
  --ftr-violet-deep:#6D35C9;
  --ftr-orange:#FF8A3D;
  --ftr-ease:cubic-bezier(.22,1,.36,1);

  /* Yellow button look (same as Problems.jsx) */
  --btn-text:#3b0f4d;
  --btn-bg:linear-gradient(180deg,#ffe985 0%,#ffd53d 48%,#ffb81c 100%);
  --btn-bg-hover:linear-gradient(180deg,#fff0a0 0%,#ffdf5c 48%,#ffc236 100%);
  --btn-border:#f2a900;
  --btn-shadow:
    0 8px 18px #ffa80040,
    inset 0 1px 0 #ffffffb3,
    inset 0 -3px 0 #e09600;
  --btn-shadow-hover:
    0 14px 26px #ffa80055,
    inset 0 1px 0 #ffffffcc,
    inset 0 -3px 0 #e09600;

  position:relative;
  isolation:isolate;
  overflow:hidden;
  width:100%;
  padding-block:clamp(48px,6vw,88px) clamp(28px,3.5vw,44px);
  color:var(--ftr-muted);
  background:
    radial-gradient(ellipse 70% 55% at 15% 0%, rgba(155,92,240,.20), transparent 60%),
    radial-gradient(ellipse 60% 50% at 90% 100%, rgba(255,138,61,.10), transparent 60%),
    linear-gradient(180deg,var(--ftr-bg-1) 0%,var(--ftr-bg-2) 100%);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}
.site-footer *,
.site-footer *::before,
.site-footer *::after{box-sizing:border-box}

/* Soft decorative glow */
.site-footer__glow{
  position:absolute;
  top:-160px;
  left:50%;
  transform:translateX(-50%);
  width:min(880px,120%);
  height:320px;
  background:radial-gradient(ellipse at center, rgba(155,92,240,.28), transparent 70%);
  filter:blur(80px);
  pointer-events:none;
  z-index:0;
}

.site-footer > *:not(.site-footer__glow){position:relative;z-index:1}

/* ============================================================
   MAIN GRID
============================================================ */
.site-footer__grid{
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:clamp(32px,4vw,48px);
  padding-bottom:clamp(28px,3.5vw,40px);
}

/* ---------- Brand column ---------- */
.site-footer__brand{min-width:0}

.site-footer__logo{
  display:inline-flex;
  align-items:center;
  gap:14px;
  padding:10px 22px 10px 12px;
  border-radius:16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.10);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.06),
    0 12px 30px -18px rgba(0,0,0,.5);
  text-decoration:none;
  transition:border-color .3s ease, background .3s ease, transform .3s var(--ftr-ease);
}
.site-footer__logo:hover{
  border-color:rgba(155,92,240,.45);
  background:rgba(155,92,240,.08);
  transform:translateY(-1px);
}

.site-footer__logo-mark{
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:44px;
  height:44px;
  border-radius:12px;
  background:linear-gradient(145deg,#ffffff,#EDE3FA);
  box-shadow:
    inset 0 1px 0 #fff,
    0 6px 14px -6px rgba(109,53,201,.55);
  overflow:hidden;
}
.site-footer__logo-mark img{
  display:block;
  width:32px;
  height:32px;
  object-fit:contain;
}

.site-footer__logo-text{
  color:#fff;
  font-weight:800;
  font-size:clamp(18px,1.6vw,20px);
  letter-spacing:-.02em;
  line-height:1;
  white-space:nowrap;
}

.site-footer__desc{
  margin:22px 0 0;
  max-width:44ch;
  font-size:14px;
  line-height:1.7;
  color:var(--ftr-muted-strong);
  text-wrap:pretty;
  overflow-wrap:break-word;
}
.site-footer__desc + .site-footer__desc{margin-top:12px}
.site-footer__desc--muted{color:var(--ftr-muted)}

/* ---------- Columns ---------- */
.site-footer__col{min-width:0}

.site-footer__heading{
  margin:0 0 16px;
  color:var(--ftr-orange);
  font-size:13px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
}

.site-footer__contact-line{
  margin:0 0 14px;
  max-width:34ch;
  font-size:14px;
  line-height:1.7;
  color:var(--ftr-muted-strong);
  text-wrap:pretty;
  overflow-wrap:break-word;
}

.site-footer__contact-list{
  display:grid;
  gap:10px;
  margin:0;
  padding:0;
  list-style:none;
  font-size:14px;
}

.site-footer__links{
  display:grid;
  gap:12px;
  margin:0;
  padding:0;
  list-style:none;
  font-size:14px;
}

.site-footer__link{
  display:inline-block;
  color:var(--ftr-muted-strong);
  text-decoration:none;
  line-height:1.6;
  transition:color .25s ease, transform .25s var(--ftr-ease);
}
.site-footer__link:hover{
  color:#fff;
  transform:translateX(3px);
}
.site-footer__link:focus-visible{
  outline:2px solid var(--ftr-violet);
  outline-offset:4px;
  border-radius:4px;
}

/* ============================================================
   DIVIDER
============================================================ */
.site-footer__divider{
  height:1px;
  width:100%;
  background:linear-gradient(90deg,transparent,var(--ftr-line) 15%,var(--ftr-line) 85%,transparent);
  margin-block:clamp(20px,2.6vw,28px);
}

/* ============================================================
   MIDDLE ROW
============================================================ */
.site-footer__mid{
  display:flex;
  flex-direction:column;
  gap:20px;
  align-items:flex-start;
  justify-content:space-between;
}

.site-footer__copyright{
  margin:0;
  font-size:13.5px;
  color:var(--ftr-muted-strong);
  line-height:1.6;
}

/* ---------- CTA button (yellow, same as Problems.jsx) ---------- */
.site-footer a.site-footer__cta{
  position:relative;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  max-width:100%;
  min-height:56px;
  padding:17px 30px;
  border:1px solid var(--btn-border);
  border-radius:14px;
  color:var(--btn-text);
  background:var(--btn-bg);
  box-shadow:var(--btn-shadow);
  font-family:inherit;
  font-size:16px;
  font-weight:800;
  line-height:1.45;
  letter-spacing:-.005em;
  text-align:center;
  text-decoration:none;
  text-shadow:0 1px 0 #ffffff55;
  overflow-wrap:anywhere;
  transition:
    transform 350ms var(--ftr-ease),
    box-shadow 350ms ease,
    background 350ms ease,
    border-color 350ms ease;
}
.site-footer a.site-footer__cta:focus-visible{
  outline:3px solid var(--ftr-orange);
  outline-offset:4px;
}
.site-footer a.site-footer__cta:active{
  transform:translate3d(0,0,0);
}

/* Hover only on devices with accurate hover input */
@media (hover:hover) and (pointer:fine){
  .site-footer a.site-footer__cta:hover{
    transform:translate3d(0,-3px,0);
    border-color:var(--btn-border);
    background:var(--btn-bg-hover);
    box-shadow:var(--btn-shadow-hover);
  }
}

/* Touch feedback */
@media (hover:none){
  .site-footer a.site-footer__cta:active{transform:scale(.98)}
}

/* ============================================================
   DISCLAIMERS
============================================================ */
.site-footer__disclaimers{
  display:grid;
  gap:10px;
  margin-top:clamp(28px,3.5vw,44px);
  padding-top:clamp(20px,2.6vw,28px);
  border-top:1px solid var(--ftr-line);
}
.site-footer__disclaimers p{
  margin:0;
  font-size:12.5px;
  line-height:1.7;
  color:rgba(255,255,255,.5);
  text-wrap:pretty;
  overflow-wrap:break-word;
}

/* ============================================================
   RESPONSIVE
============================================================ */

/* Mobile — full-width button */
@media (max-width:639px){
  .site-footer a.site-footer__cta{
    width:100%;
    padding:16px 18px;
    font-size:15px;
  }
}

/* Tablet — 2 columns */
@media (min-width:640px){
  .site-footer__grid{
    grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);
    gap:clamp(36px,4vw,52px);
  }
  .site-footer__brand{
    grid-column:1 / -1;
  }
}

/* Desktop — reference layout: 1.4fr / 1fr / 1fr */
@media (min-width:900px){
  .site-footer__grid{
    grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr);
    gap:clamp(40px,5vw,72px);
  }
  .site-footer__brand{grid-column:auto}

  .site-footer__mid{
    flex-direction:row;
    align-items:center;
    gap:24px;
  }

  .site-footer a.site-footer__cta{
    flex:0 0 auto;
    min-width:280px;
  }
}

/* Large desktop — slightly more air */
@media (min-width:1200px){
  .site-footer__grid{
    gap:clamp(56px,6vw,96px);
  }
}

/* Small mobile — tighten */
@media (max-width:359px){
  .site-footer{padding-top:40px}
  .site-footer__logo{padding:8px 16px 8px 10px;gap:10px;border-radius:14px}
  .site-footer__logo-mark{width:38px;height:38px;border-radius:10px}
  .site-footer__logo-mark img{width:26px;height:26px}
  .site-footer__logo-text{font-size:17px}
  .site-footer__copyright{font-size:12.5px}
}

/* Reduced motion */
@media (prefers-reduced-motion:reduce){
  .site-footer *,
  .site-footer *::before,
  .site-footer *::after{
    transition:none !important;
    animation:none !important;
  }
  .site-footer__logo:hover,
  .site-footer__link:hover,
  .site-footer a.site-footer__cta:hover,
  .site-footer a.site-footer__cta:active{
    transform:none !important;
  }
}
`