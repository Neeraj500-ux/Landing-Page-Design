import React, { useCallback, useEffect, useRef, useState } from "react";

/* ----------------------------- DATA ----------------------------- */

const reviews = [1, 2, 3, 4].map((n) => ({
  id: n,
  image: `/images/Neeraj18%20(${n}).jpg`,
  alt: `WhatsApp Client Review ${n}`,
}));

const stats = [
  { value: "100%", label: "Real chats" },
  { value: "4.9/5", label: "Client rating" },
  { value: "250+", label: "Happy founders" },
];

/* ---------------------------- SHARED ---------------------------- */

const cx = (...p) => p.filter(Boolean).join(" ");

const FONT_DISPLAY =
  "[font-family:'Bricolage_Grotesque','Avenir_Next',system-ui,-apple-system,'Segoe_UI',sans-serif]";
const FONT_ACCENT = "[font-family:'Instrument_Serif','Iowan_Old_Style',Georgia,serif]";
const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#a855f7]";

/* Landscape image frame inside each card.
   - IMG_FRAME: shape of the frame (16/10 = wide landscape). Try aspect-[16/9] or aspect-[4/3].
   - IMG_FIT:   object-cover object-top  -> fills the frame, shows the top of the chat
                object-cover object-center -> crops from the middle
                object-contain -> shows the full image (no crop, may leave side space) */
const IMG_FRAME = "aspect-[16/10]";
const IMG_FIT = "object-cover object-top";

const ICON_BUTTON = cx(
  "grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full md:h-11 md:w-11",
  "border border-white/25 text-white text-lg",
  "bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))]",
  "transition-[transform,background-color,color,border-color] duration-300",
  "hover:border-[rgba(255,215,106,0.7)] hover:bg-[rgba(255,215,106,0.16)] hover:text-[#ffd76a]",
  "active:scale-[0.92]",
  FOCUS_RING
);

const reveal = (on) =>
  cx(
    "[transition:opacity_800ms_cubic-bezier(0.22,1,0.36,1),transform_800ms_cubic-bezier(0.22,1,0.36,1)]",
    on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
  );

/* ---------------------------- LIGHTBOX --------------------------- */

function Lightbox({ index, onClose, onStep }) {
  const ref = useRef(null);
  const isOpen = index !== null;
  const item = isOpen ? reviews[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [isOpen]);

  const onKey = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onStep(-1);
    }
  };

  return (
    <dialog
      ref={ref}
      aria-label="Review preview"
      onClose={onClose}
      onKeyDown={onKey}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cx(
        "fixed inset-0 m-0 h-full max-h-none w-full max-w-none place-items-center border-0 bg-transparent p-3 text-white sm:p-6",
        "open:grid open:animate-[wr-fade_250ms_ease_both]",
        "backdrop:backdrop-blur-[14px]",
        "backdrop:[background:radial-gradient(ellipse_at_50%_20%,rgba(91,47,143,0.5),transparent_70%),rgba(10,2,20,0.92)]",
        "motion-reduce:open:animate-none"
      )}
    >
      {item && (
        <div className="grid max-h-[94dvh] w-[min(520px,100%)] animate-[wr-pop_450ms_cubic-bezier(0.22,1,0.36,1)_both] gap-3 rounded-[24px] border border-white/20 bg-[linear-gradient(150deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))] p-3 shadow-[0_44px_90px_-30px_rgba(0,0,0,0.85),0_0_80px_-30px_rgba(188,143,255,0.5)] backdrop-blur-[26px] motion-reduce:animate-none sm:p-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-white/80 sm:text-sm">
              {index + 1} of {reviews.length}
            </span>
            <button type="button" onClick={onClose} aria-label="Close preview" className={ICON_BUTTON}>
              ✕
            </button>
          </div>

          <div className="grid place-items-center overflow-hidden rounded-2xl p-2 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.16)] sm:p-3 [background:radial-gradient(circle_at_15%_10%,rgba(244,114,182,0.25),transparent_55%),radial-gradient(circle_at_90%_95%,rgba(168,85,247,0.28),transparent_55%),linear-gradient(135deg,#f1e8ff,#faefff)]">
            <img
              key={item.image}
              src={item.image}
              alt={item.alt}
              decoding="async"
              className="mx-auto block h-auto max-h-[66dvh] w-auto max-w-full rounded-xl animate-[wr-swap_450ms_cubic-bezier(0.22,1,0.36,1)_both] object-contain motion-reduce:animate-none"
            />
          </div>

          <div className="flex items-center justify-between gap-3 px-1">
            <p className="m-0 text-sm font-bold sm:text-base">{item.alt}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => onStep(-1)} aria-label="Previous review" className={ICON_BUTTON}>
                ‹
              </button>
              <button type="button" onClick={() => onStep(1)} aria-label="Next review" className={ICON_BUTTON}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ----------------------------- CARD ------------------------------ */

function ReviewCard({ review, index, revealed, onOpen }) {
  return (
    <article
      style={{ transitionDelay: `${index * 120}ms` }}
      className={cx(
        "group/card relative flex w-[86vw] max-w-[520px] shrink-0 snap-center sm:w-[70vw] lg:w-auto lg:max-w-none",
        reveal(revealed)
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge ${review.alt}`}
        className={cx(
          "relative flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-[22px] border-0 p-2 text-left text-inherit sm:rounded-[26px] sm:p-2.5",
          "[-webkit-tap-highlight-color:transparent]",
          "[background:linear-gradient(160deg,#ffffff,#f7f1ff)]",
          "shadow-[0_20px_45px_-22px_rgba(124,58,237,0.45)]",
          "[transition:box-shadow_400ms_ease,transform_450ms_cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-2",
          "hover:shadow-[0_34px_54px_-24px_rgba(124,58,237,0.55),0_0_45px_-14px_rgba(168,85,247,0.5)]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-[inherit] before:p-px before:content-['']",
          "before:[background:linear-gradient(150deg,rgba(196,160,255,0.9),rgba(233,213,255,0.4)_45%,rgba(168,85,247,0.6))]",
          "before:[-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]",
          "before:[-webkit-mask-composite:xor]",
          "before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
          FOCUS_RING
        )}
      >
        {/* top bar */}
        <span className="flex items-center gap-2 px-1 pb-2">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f472b6]" />
            <span className="h-2 w-2 rounded-full bg-[#ffd76a]" />
            <span className="h-2 w-2 rounded-full bg-[#bc8fff]" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-purple-50 px-3 py-1 text-[10px] font-medium text-purple-700 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.15)] sm:text-[11px]">
            Client Review {String(index + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#25d366]/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#15803d] sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25d366]" />
            Real
          </span>
        </span>

        {/* LANDSCAPE image frame (wide ratio, same in every card) */}
        <span
          className={cx(
            "relative block w-full overflow-hidden rounded-[14px] p-1 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.14)] sm:rounded-[16px] sm:p-1.5",
            IMG_FRAME,
            "[background:radial-gradient(circle_at_15%_10%,rgba(244,114,182,0.28),transparent_55%),radial-gradient(circle_at_90%_95%,rgba(168,85,247,0.3),transparent_55%),linear-gradient(135deg,#efe5ff,#f9ecff)]"
          )}
        >
          <img
            src={review.image}
            alt={review.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cx(
              "relative block h-full w-full select-none rounded-[10px] shadow-[0_10px_30px_-10px_rgba(76,29,149,0.5)] [transition:transform_800ms_cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.02] motion-reduce:transition-none",
              IMG_FIT
            )}
          />
        </span>

        {/* footer */}
        <span className="flex items-center justify-between px-1 pb-0.5 pt-2.5">
          <span className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[linear-gradient(135deg,#bc8fff,#f472b6)] text-[11px] font-bold text-white">
              {index + 1}
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-slate-800">Client Feedback</span>
              <span className="block text-[10px] text-slate-400">WhatsApp Review</span>
            </span>
          </span>
          <span className="text-[11px] tracking-wider text-[#f59e0b]">★★★★★</span>
        </span>
      </button>
    </article>
  );
}

/* ------------------------------ MAIN ----------------------------- */

export default function WhatsAppReviews() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

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
      { threshold: 0.1, rootMargin: "60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback((d) => {
    setActiveIndex((c) => (c === null ? c : (c + d + reviews.length) % reviews.length));
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

          <p
            style={stagger(2)}
            className={cx(
              "mx-auto mb-0 mt-5 max-w-[46ch] text-sm leading-[1.7] text-slate-600 [text-wrap:pretty] sm:text-[15px] md:text-base lg:text-[17px]",
              reveal(revealed)
            )}
          >
            Real conversations from clients who trusted us with their projects and saw the
            results first-hand.
          </p>
        </header>

        {/* STATS */}
        <div
          style={stagger(3)}
          className={cx(
            "mx-auto mb-10 grid max-w-2xl grid-cols-3 divide-x divide-purple-200 rounded-2xl border border-purple-200 bg-white/70 py-3 shadow-[0_12px_30px_-15px_rgba(124,58,237,0.35)] backdrop-blur-md sm:mb-12 sm:py-4",
            reveal(revealed)
          )}
        >
          {stats.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <p className="m-0 text-lg font-bold text-purple-600 sm:text-2xl">{s.value}</p>
              <p className="m-0 mt-0.5 text-[10px] text-slate-500 sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CARDS: swipe on mobile/tablet, 2-column landscape grid on desktop */}
      <div
        role="region"
        tabIndex={0}
        aria-label="Client review screenshots. Swipe to browse."
        className={cx(
          "mx-auto flex w-full max-w-[1280px] snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-6 pt-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "sm:gap-5 sm:px-7 md:px-9",
          "lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-12 lg:pb-2 xl:gap-8",
          FOCUS_RING
        )}
      >
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            index={index}
            revealed={revealed}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <p className="mx-auto mb-0 mt-2 text-center text-xs text-slate-500 lg:hidden">
        Swipe to see more · Tap to enlarge
      </p>

      {/* TRUST LINE */}
      <div className="mx-auto mt-10 flex flex-col items-center gap-4 px-5 sm:mt-12">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-700 sm:text-sm">
          {["Real Conversations", "Real Clients", "Real Results"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-purple-500">✓</span>
              {t}
            </span>
          ))}
        </div>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
      </div>

      <Lightbox index={activeIndex} onClose={close} onStep={step} />

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Instrument+Serif:ital@1&display=swap");
        @keyframes wr-shimmer { from { background-position: 100% 0; } to { background-position: 0% 0; } }
        @keyframes wr-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wr-pop { from { opacity: 0; transform: translateY(18px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes wr-swap { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}