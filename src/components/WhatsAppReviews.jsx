import React, { useEffect, useRef, useState } from "react";

/* ----------------------------- DATA ----------------------------- */

const reviews = [1, 2, 3, 4].map((n) => ({
  id: n,
  image: `/images/Neeraj18%20(${n}).jpg`,
  alt: `WhatsApp Client Review ${n}`,
}));

/* ---------------------------- SHARED ---------------------------- */

const cx = (...p) => p.filter(Boolean).join(" ");

const FONT_DISPLAY =
  "[font-family:'Bricolage_Grotesque','Avenir_Next',system-ui,-apple-system,'Segoe_UI',sans-serif]";
const FONT_ACCENT = "[font-family:'Instrument_Serif','Iowan_Old_Style',Georgia,serif]";

const reveal = (on) =>
  cx(
    "[transition:opacity_800ms_cubic-bezier(0.22,1,0.36,1),transform_800ms_cubic-bezier(0.22,1,0.36,1)]",
    on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
  );

/* ----------------------------- CARD ------------------------------ */
/* Image only. Full image, natural ratio, no cropping, no click. */

function ReviewCard({ review, index, revealed }) {
  return (
    <article
      style={{ transitionDelay: `${index * 120}ms` }}
      className={cx(
        // mobile: centered, capped width so image doesn't look oversized
        "mx-auto w-full min-w-0 max-w-[420px] self-start sm:max-w-none",
        reveal(revealed)
      )}
    >
      <div className="overflow-hidden rounded-2xl bg-[#0b1014] shadow-[0_12px_28px_-16px_rgba(124,58,237,0.45)] lg:rounded-[22px]">
        <img
          src={review.image}
          alt={review.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-auto w-full select-none"
        />
      </div>
    </article>
  );
}

/* ------------------------------ MAIN ----------------------------- */

export default function WhatsAppReviews() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stagger = (i) => ({ transitionDelay: `${i * 110}ms` });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="wr-heading"
      className={cx(
        "relative isolate w-full min-w-0 overflow-hidden text-slate-900",
        FONT_DISPLAY,
        "pb-14 pt-14 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24",
        "[background:radial-gradient(circle_at_0%_0%,rgba(216,190,255,0.5),transparent_45%),radial-gradient(circle_at_100%_0%,rgba(240,200,255,0.3),transparent_45%),radial-gradient(circle_at_0%_100%,rgba(205,185,255,0.4),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(225,200,255,0.5),transparent_45%),linear-gradient(160deg,#ffffff_0%,#faf6ff_50%,#f3ebff_100%)]"
      )}
    >
      {/* BACKGROUND: soft light-purple glows only (no grid lines) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-[#d9c2ff]/45 blur-[90px] sm:h-[440px] sm:w-[440px]" />
        <span className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#f0d4ff]/40 blur-[90px] sm:h-[400px] sm:w-[400px]" />
        <span className="absolute -bottom-28 -left-24 h-[320px] w-[320px] rounded-full bg-[#cdb8ff]/40 blur-[90px] sm:h-[440px] sm:w-[440px]" />
        <span className="absolute -bottom-28 -right-24 h-[300px] w-[300px] rounded-full bg-[#e2cbff]/50 blur-[90px] sm:h-[400px] sm:w-[400px]" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-7 md:px-9 lg:px-12">
        {/* HEADER */}
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <span
            style={stagger(0)}
            className={cx(
              "mb-4 inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.02em] text-purple-700 sm:text-sm md:text-[15px]",
              "before:h-0.5 before:w-9 before:rounded-sm before:content-[''] before:[background:linear-gradient(90deg,rgba(168,85,247,0),#a855f7)]",
              "after:h-0.5 after:w-9 after:rounded-sm after:content-[''] after:[background:linear-gradient(90deg,#a855f7,rgba(168,85,247,0))]",
              reveal(revealed)
            )}
          >
            Real Client Feedback
          </span>

          <h2
            id="wr-heading"
            style={stagger(1)}
            className={cx(
              "m-0 font-bold leading-[1] tracking-[-0.04em] text-slate-900",
              "text-[34px] sm:text-5xl md:text-[56px] lg:text-[64px]",
              reveal(revealed)
            )}
          >
            Real Messages.
            <span
              className={cx(
                "mt-[0.06em] block pb-[0.1em] font-normal italic leading-[1.05] tracking-[-0.01em]",
                FONT_ACCENT,
                "bg-clip-text text-transparent",
                "bg-[linear-gradient(100deg,#7c3aed_0%,#c026d3_35%,#a855f7_50%,#c026d3_68%,#7c3aed_100%)]",
                "[background-size:220%_100%] [background-position:100%_0]",
                revealed && "animate-[wr-shimmer_2.8s_cubic-bezier(0.22,1,0.36,1)_0.6s_both]",
                "motion-reduce:animate-none"
              )}
            >
              Real Client Reviews.
            </span>
          </h2>
        </header>
      </div>

      {/* IMAGES: mobile = 1 column (ek ke niche ek), tablet = 2, desktop = 4 in a row */}
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-5 px-5 sm:grid-cols-2 sm:gap-5 sm:px-7 md:gap-6 md:px-9 lg:grid-cols-4 lg:gap-6 lg:px-12">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} revealed={revealed} />
        ))}
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Instrument+Serif:ital@1&display=swap");
        @keyframes wr-shimmer { from { background-position: 100% 0; } to { background-position: 0% 0; } }
      `}</style>
    </section>
  );
}