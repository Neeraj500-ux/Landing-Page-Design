import React, { useCallback, useEffect, useRef, useState } from "react";

/* ----------------------------- DATA ----------------------------- */

const makeImages = (from, to, names) =>
  names.slice(from - 1, to).map((name, i) => ({
    src: `/images/Neeraj17%20(${from + i}).jpeg`,
    alt: `Landing Page Design ${name}`,
  }));

const NAMES = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

const topImages = makeImages(1, 6, NAMES);
const bottomImages = makeImages(7, 12, NAMES);
const allImages = [...topImages, ...bottomImages];

/* ---------------------------- SHARED ---------------------------- */

const cx = (...parts) => parts.filter(Boolean).join(" ");

const FONT_DISPLAY =
  "[font-family:'Bricolage_Grotesque','Avenir_Next',system-ui,-apple-system,'Segoe_UI',sans-serif]";
const FONT_ACCENT = "[font-family:'Instrument_Serif','Iowan_Old_Style',Georgia,serif]";
const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#ffd76a]";

const ROW_MASK = cx(
  "[mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]",
  "[-webkit-mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]",
  "sm:[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]",
  "sm:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]",
  "lg:[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
  "lg:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
  "motion-reduce:[mask-image:none]",
  "motion-reduce:[-webkit-mask-image:none]"
);

const ICON_BUTTON = cx(
  "grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full",
  "sm:h-[42px] sm:w-[42px] md:h-11 md:w-11",
  "border border-white/25 text-white",
  "bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))]",
  "transition-[transform,background-color,color,border-color] duration-300",
  "ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:border-[rgba(255,215,106,0.7)] hover:bg-[rgba(255,215,106,0.16)] hover:text-[#ffd76a]",
  "active:scale-[0.92]",
  FOCUS_RING
);

const LIGHTS_IDLE = [
  "bg-white/[0.28] group-hover/card:bg-[#f472b6] group-hover/card:shadow-[0_0_8px_rgba(244,114,182,0.7)] group-focus-within/card:bg-[#f472b6]",
  "bg-white/[0.28] delay-[60ms] group-hover/card:bg-[#ffd76a] group-hover/card:shadow-[0_0_8px_rgba(255,215,106,0.7)] group-focus-within/card:bg-[#ffd76a]",
  "bg-white/[0.28] delay-[120ms] group-hover/card:bg-[#bc8fff] group-hover/card:shadow-[0_0_8px_rgba(188,143,255,0.7)] group-focus-within/card:bg-[#bc8fff]",
];
const LIGHTS_LIT = ["bg-[#f472b6]", "bg-[#ffd76a]", "bg-[#bc8fff]"];

const reveal = (revealed) =>
  cx(
    "[transition:opacity_800ms_cubic-bezier(0.22,1,0.36,1),transform_800ms_cubic-bezier(0.22,1,0.36,1)]",
    revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
    "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
  );

/* ----------------------------- ICONS ---------------------------- */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

const ExpandIcon = () => (
  <svg {...iconProps}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);
const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const PrevIcon = () => (
  <svg {...iconProps}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const NextIcon = () => (
  <svg {...iconProps}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/* --------------------------- BROWSER BAR ------------------------- */

function BrowserBar({ label, lit = false, children }) {
  const lights = lit ? LIGHTS_LIT : LIGHTS_IDLE;

  return (
    <span className="flex h-[29px] items-center gap-2 pl-1.5 pr-1 sm:h-[31px] sm:gap-[9px] md:h-[34px] md:gap-3">
      <span className="flex shrink-0 gap-1 sm:gap-1.5">
        {lights.map((tone, index) => (
          <span
            key={index}
            className={cx(
              "h-[7px] w-[7px] rounded-full transition-[background-color,box-shadow] duration-[350ms]",
              "sm:h-2 sm:w-2 md:h-[9px] md:w-[9px]",
              tone
            )}
          />
        ))}
      </span>

      <span className="min-w-0 flex-1 truncate rounded-full bg-[rgba(12,3,24,0.42)] px-2.5 py-[5px] text-[10px] font-medium leading-[1.3] tracking-[0.01em] text-white/[0.84] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:px-[11px] sm:text-[11px] md:px-3.5 md:py-1.5 md:text-xs">
        {label}
      </span>

      {children}
    </span>
  );
}

/* --------------------------- GALLERY CARD ------------------------ */

function GalleryCard({ item, interactive, reverse, onOpen }) {
  const cardRef = useRef(null);
  const frame = useRef(0);

  const handleMove = useCallback((event) => {
    if (event.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;

    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      el.style.setProperty("--ry", `${((x - 0.5) * 6).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * 4).toFixed(2)}deg`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <figure
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cx(
        "group/card relative m-0 w-[var(--card)] shrink-0 rounded-[18px] hover:z-[1]",
        "sm:rounded-[20px] md:rounded-[22px] xl:rounded-[24px]",
        "[--rx:0deg] [--ry:0deg] [--mx:50%] [--my:50%]",
        "[transform:perspective(1100px)_rotateX(var(--rx))_rotateY(var(--ry))]",
        "[transition:transform_450ms_cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transform-none motion-reduce:transition-none motion-reduce:snap-center",
        reverse
          ? "odd:mt-2 sm:odd:mt-3 lg:odd:mt-4"
          : "even:mt-2 sm:even:mt-3 lg:even:mt-4"
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        tabIndex={interactive ? 0 : -1}
        aria-label={`Enlarge ${item.alt}`}
        className={cx(
          "relative block w-full cursor-zoom-in overflow-hidden rounded-[inherit] border-0",
          "p-2 pb-2.5 sm:p-2.5 sm:pb-3 md:p-[11px] md:pb-3",
          "text-left text-inherit [-webkit-tap-highlight-color:transparent]",
          "[background:linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_48%,rgba(255,255,255,0.09)),rgba(30,12,52,0.62)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(0,0,0,0.16),0_25px_45px_-25px_rgba(6,1,14,0.92)]",
          "[transition:box-shadow_400ms_ease,transform_450ms_cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/card:-translate-y-1",
          "group-hover/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.16),0_34px_54px_-24px_rgba(6,1,14,0.95),0_0_45px_-14px_rgba(188,143,255,0.62)]",
          "motion-reduce:transition-none motion-reduce:group-hover/card:translate-y-0",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[2]",
          "before:rounded-[inherit] before:p-px before:content-['']",
          "before:[background:linear-gradient(150deg,rgba(255,255,255,0.6),rgba(255,255,255,0.06)_42%,rgba(188,143,255,0.45))]",
          "before:[-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]",
          "before:[-webkit-mask-composite:xor]",
          "before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
          "after:pointer-events-none after:absolute after:inset-0 after:z-[3]",
          "after:rounded-[inherit] after:opacity-0 after:transition-opacity",
          "after:duration-300 after:content-['']",
          "after:[background:radial-gradient(300px_circle_at_var(--mx)_var(--my),rgba(255,255,255,0.18),transparent_62%)]",
          "group-hover/card:after:opacity-100",
          FOCUS_RING
        )}
      >
        <BrowserBar label={item.alt}>
          <span className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-full text-white/60 transition-[color,transform,background-color] duration-[250ms] group-hover/card:rotate-[8deg] group-hover/card:scale-[1.1] group-hover/card:bg-[rgba(255,215,106,0.16)] group-hover/card:text-[#ffd76a] group-focus-within/card:text-[#ffd76a] sm:h-[26px] sm:w-[26px] [&>svg]:h-3.5 [&>svg]:w-3.5">
            <ExpandIcon />
          </span>
        </BrowserBar>

        {/* Full image, no crop, no blur, no empty space top/bottom */}
        <span className="relative mt-1 block w-full overflow-hidden rounded-[10px] bg-[rgba(19,6,36,0.65)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)] md:rounded-[13px]">
          <img
            src={item.src}
            alt={interactive ? item.alt : ""}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={cx(
              "block h-auto w-full select-none",
              "[transition:transform_800ms_cubic-bezier(0.22,1,0.36,1)]",
              "group-hover/card:scale-[1.015]",
              "motion-reduce:transition-none motion-reduce:group-hover/card:transform-none"
            )}
          />
        </span>
      </button>
    </figure>
  );
}

/* --------------------------- CAROUSEL ROW ------------------------ */

function CarouselRow({ images, offset = 0, reverse = false, revealed, paused, onOpen }) {
  const direction = reverse ? "Moves left to right." : "Moves right to left.";

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Landing page gallery. ${direction} Focus to pause.`}
      className={cx(
        "group/row w-full min-w-0 overflow-hidden",
        "py-3 sm:py-4 md:py-[18px] lg:py-5",
        "[--gap:14px] [--card:70vw] min-[400px]:[--card:66vw]",
        "sm:[--gap:18px] sm:[--card:46vw]",
        "md:[--gap:20px] md:[--card:34vw]",
        "lg:[--gap:24px] lg:[--card:26vw]",
        "xl:[--gap:26px] xl:[--card:clamp(280px,21vw,340px)]",
        "2xl:[--card:340px]",
        ROW_MASK,
        reverse
          ? "[transition:opacity_900ms_ease_680ms,transform_1200ms_cubic-bezier(0.22,1,0.36,1)_680ms]"
          : "[transition:opacity_900ms_ease_500ms,transform_1200ms_cubic-bezier(0.22,1,0.36,1)_500ms]",
        revealed
          ? "translate-x-0 opacity-100"
          : reverse
          ? "-translate-x-[7vw] opacity-0"
          : "translate-x-[7vw] opacity-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ffd76a]",
        "motion-reduce:translate-x-0 motion-reduce:overflow-x-auto motion-reduce:opacity-100",
        "motion-reduce:transition-none motion-reduce:snap-x motion-reduce:snap-mandatory"
      )}
    >
      <div
        className={cx(
          "flex w-max will-change-transform",
          reverse
            ? "animate-[cc-scroll_25s_linear_-18s_infinite_reverse] md:animate-[cc-scroll_30s_linear_-18s_infinite_reverse]"
            : "animate-[cc-scroll_22s_linear_infinite] md:animate-[cc-scroll_27s_linear_infinite]",
          paused && "[animation-play-state:paused]",
          "group-hover/row:[animation-play-state:paused]",
          "group-focus-within/row:[animation-play-state:paused]",
          "group-active/row:[animation-play-state:paused]",
          "motion-reduce:transform-none motion-reduce:animate-none motion-reduce:will-change-auto"
        )}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={cx(
              "flex shrink-0 items-start gap-[var(--gap)] pr-[var(--gap)]",
              "motion-reduce:pl-[var(--gap)]",
              copy === 1 && "motion-reduce:hidden"
            )}
          >
            {images.map((item, index) => (
              <GalleryCard
                key={`${copy}-${index}-${item.src}`}
                item={item}
                interactive={copy === 0}
                reverse={reverse}
                onOpen={() => onOpen(offset + index)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- LIGHTBOX -------------------------- */

function Lightbox({ images, index, onClose, onStep, onSelect }) {
  const dialogRef = useRef(null);
  const isOpen = index !== null;
  const item = isOpen ? images[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onStep(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onStep(-1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Landing page preview"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cx(
        "fixed inset-0 m-0 h-full max-h-none w-full max-w-none",
        "place-items-center border-0 bg-transparent",
        "p-3 text-white sm:p-5 md:p-[clamp(12px,3vw,40px)]",
        "open:grid open:animate-[cc-fade_250ms_ease_both]",
        "backdrop:animate-[cc-fade_300ms_ease_both] backdrop:backdrop-blur-[14px]",
        "backdrop:[background:radial-gradient(ellipse_at_50%_20%,rgba(91,47,143,0.5),transparent_70%),rgba(10,2,20,0.9)]",
        "motion-reduce:open:animate-none motion-reduce:backdrop:animate-none"
      )}
    >
      {item && (
        <div className="grid max-h-[94dvh] w-[min(1080px,100%)] animate-[cc-pop_450ms_cubic-bezier(0.22,1,0.36,1)_both] gap-2.5 rounded-[20px] border border-white/20 bg-[linear-gradient(150deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_44px_90px_-30px_rgba(0,0,0,0.85),0_0_80px_-30px_rgba(188,143,255,0.5)] backdrop-blur-[26px] backdrop-saturate-150 motion-reduce:animate-none sm:p-4 md:gap-3.5 md:rounded-[28px] md:p-[clamp(12px,1.8vw,20px)]">
          <div className="flex items-center justify-between gap-4 px-1">
            <span className="text-xs font-medium tracking-[0.02em] text-white/70 sm:text-sm">
              {index + 1} of {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className={cx(ICON_BUTTON, "hover:rotate-90")}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="overflow-hidden rounded-[16px] bg-[rgba(19,6,36,0.55)] px-2 pb-2.5 pt-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)] md:rounded-[18px]">
            <BrowserBar label={item.alt} lit />

            <div className="relative mt-1.5 grid place-items-center overflow-hidden rounded-xl bg-[rgba(19,6,36,0.6)]">
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                decoding="async"
                className="relative block h-auto max-h-[62dvh] w-auto max-w-full animate-[cc-swap_450ms_cubic-bezier(0.22,1,0.36,1)_both] object-contain object-center motion-reduce:animate-none sm:max-h-[66dvh] md:[max-height:calc(100dvh_-_290px)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-1 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-x-6">
            <p className="m-0 min-w-0 font-bold leading-[1.15] tracking-[-0.025em] [font-size:clamp(16px,2.2vw,28px)]">
              {item.alt}
            </p>

            <div
              role="group"
              aria-label="Choose a design"
              className="col-span-full row-start-2 flex items-center justify-self-center md:col-span-1 md:row-start-auto md:justify-self-auto"
            >
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show ${image.alt}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => onSelect(i)}
                  className={cx(
                    "relative h-7 w-5 cursor-pointer border-0 bg-transparent p-0",
                    FOCUS_RING,
                    "before:absolute before:left-1/2 before:top-1/2 before:h-[7px]",
                    "before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:content-['']",
                    "before:transition-[width,background-color] before:duration-[400ms]",
                    i === index
                      ? "before:w-5 before:bg-[#ffd76a]"
                      : "before:w-[7px] before:bg-white/35 hover:before:bg-white/75"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous design"
                className={cx(ICON_BUTTON, "hover:-translate-x-[3px]")}
              >
                <PrevIcon />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next design"
                className={cx(ICON_BUTTON, "hover:translate-x-[3px]")}
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ---------------------------- BACKGROUND ------------------------- */

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")";

const GRID_LINES = "56px 56px";

/* ------------------------------ MAIN ----------------------------- */

export default function ImageCarousel() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const glowFrame = useRef(0);

  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.12, rootMargin: "80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSectionMove = useCallback((event) => {
    if (event.pointerType !== "mouse") return;
    const bg = bgRef.current;
    if (!bg) return;

    const { clientX, clientY } = event;
    cancelAnimationFrame(glowFrame.current);

    glowFrame.current = requestAnimationFrame(() => {
      const rect = bg.getBoundingClientRect();
      bg.style.setProperty("--sx", `${(clientX - rect.left).toFixed(0)}px`);
      bg.style.setProperty("--sy", `${(clientY - rect.top).toFixed(0)}px`);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(glowFrame.current), []);

  const closePreview = useCallback(() => setActiveIndex(null), []);

  const stepPreview = useCallback((direction) => {
    setActiveIndex((current) =>
      current === null ? current : (current + direction + allImages.length) % allImages.length
    );
  }, []);

  const stagger = (i) => ({ transitionDelay: `${i * 110}ms` });
  const bgPause = inView ? "" : "[animation-play-state:paused]";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cc-carousel-heading"
      onPointerMove={handleSectionMove}
      className={cx(
        "group/sec relative isolate w-full min-w-0 overflow-hidden text-white",
        FONT_DISPLAY,
        "pb-12 pt-14 sm:pb-14 sm:pt-16 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24 xl:pb-24 xl:pt-28",
        "[background:radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(188,143,255,0.2),transparent_65%),linear-gradient(165deg,#130624_0%,#2b1245_42%,#4b266a_100%)]"
      )}
    >
      {/* BACKGROUND */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--sx:50%] [--sy:30%]"
      >
        <span
          className={cx(
            "absolute inset-0 m-auto h-[max(130vw,1100px)] w-[max(130vw,1100px)]",
            "rounded-full opacity-[0.55] blur-[60px] will-change-transform md:blur-[90px]",
            "[background:conic-gradient(from_0deg,rgba(188,143,255,0)_0deg,rgba(188,143,255,0.42)_70deg,rgba(244,114,182,0.2)_140deg,rgba(255,215,106,0.14)_200deg,rgba(91,47,143,0.4)_270deg,rgba(188,143,255,0)_360deg)]",
            "animate-[cc-spin_70s_linear_infinite] motion-reduce:animate-none",
            bgPause
          )}
        />

        <span
          className={cx(
            "absolute -bottom-[140px] right-[4%] h-[340px] w-[340px] rounded-full blur-[30px] will-change-transform",
            "[background:radial-gradient(circle,rgba(255,215,106,0.32),transparent_68%)]",
            "animate-[cc-float_26s_ease-in-out_infinite_alternate] motion-reduce:animate-none",
            bgPause
          )}
        />

        <span
          className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,#000,transparent_85%)] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
          data-grid={GRID_LINES}
        />

        <span className="absolute inset-0 opacity-0 transition-opacity duration-[600ms] group-hover/sec:opacity-100 [-webkit-mask-image:radial-gradient(260px_circle_at_var(--sx)_var(--sy),#000,transparent_70%)] [background-image:linear-gradient(rgba(255,215,106,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,106,0.55)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(260px_circle_at_var(--sx)_var(--sy),#000,transparent_70%)]" />

        <span className="absolute inset-0 bg-[radial-gradient(460px_circle_at_var(--sx)_var(--sy),rgba(188,143,255,0.2),transparent_65%)] opacity-0 transition-opacity duration-[600ms] group-hover/sec:opacity-100" />

        <span
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: GRAIN_BG }}
        />
      </div>

      {/* HEADER */}
      <header className="mx-auto mb-8 grid w-full max-w-[1280px] grid-cols-1 items-end gap-6 px-5 sm:mb-10 sm:px-7 md:mb-12 md:px-9 lg:mb-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-x-14 lg:px-12 xl:gap-x-20">
        <div className="min-w-0 [container-type:inline-size]">
          <span
            style={stagger(0)}
            className={cx(
              "mb-4 inline-flex items-center gap-3 text-[13px] font-medium leading-[1.4] tracking-[0.02em] text-[#eadfff]",
              "before:h-0.5 before:w-9 before:rounded-sm before:content-['']",
              "before:[background:linear-gradient(90deg,#ffd76a,rgba(255,215,106,0))]",
              "sm:text-sm md:mb-5 md:text-[15px]",
              reveal(revealed)
            )}
          >
            Our Creative Work
          </span>

          <h2
            id="cc-carousel-heading"
            style={stagger(1)}
            className={cx(
              "m-0 font-bold leading-[0.98] tracking-[-0.04em] text-white",
              "[font-size:clamp(30px,min(10.4cqw,76px),76px)]",
              "[font-variation-settings:'opsz'_96]",
              reveal(revealed)
            )}
          >
            <span className="block max-w-full whitespace-nowrap">Landing Pages That</span>

            <span
              className={cx(
                "mt-[0.08em] block max-w-full whitespace-nowrap pb-[0.1em]",
                "font-normal italic leading-[1.04] tracking-[-0.01em]",
                FONT_ACCENT,
                "[font-size:min(7.6cqw,0.74em)]",
                "bg-clip-text text-transparent",
                "bg-[linear-gradient(100deg,#f2a93b_0%,#ffd76a_32%,#fff3c4_50%,#ffd76a_68%,#f2a93b_100%)]",
                "[background-position:100%_0] [background-size:220%_100%]",
                revealed && "animate-[cc-shimmer_2.8s_cubic-bezier(0.22,1,0.36,1)_0.6s_both]",
                "motion-reduce:animate-none"
              )}
            >
              Turn Interest Into Enquiries.
            </span>
          </h2>
        </div>

        <div
          className={cx(
            "relative min-w-0 pb-1 pt-5",
            "before:absolute before:left-0 before:top-0 before:h-px before:w-[55%] before:max-w-[220px] before:content-['']",
            "before:[background:linear-gradient(to_right,#ffd76a,rgba(255,215,106,0))]",
            "lg:pl-8 lg:pt-0",
            "lg:before:bottom-1 lg:before:top-1 lg:before:h-auto lg:before:w-px",
            "lg:before:[background:linear-gradient(to_bottom,#ffd76a,rgba(255,215,106,0.05))]"
          )}
        >
          <p
            style={stagger(2)}
            className={cx(
              "m-0 max-w-[44ch] font-normal leading-[1.7] text-white/80",
              "text-sm sm:text-[15px] md:text-base lg:text-[17px] xl:text-[18px]",
              "[text-wrap:pretty]",
              reveal(revealed)
            )}
          >
            Stop Wasting Ad Spend on Low Conversion Pages. Invest in a High-Converting
            Automated Funnel.
          </p>
        </div>
      </header>

      {/* CAROUSEL */}
      <div className="grid w-full min-w-0 gap-1 sm:gap-2 lg:gap-1">
        <CarouselRow
          images={topImages}
          offset={0}
          revealed={revealed}
          paused={!inView}
          onOpen={setActiveIndex}
        />
        <CarouselRow
          images={bottomImages}
          offset={topImages.length}
          reverse
          revealed={revealed}
          paused={!inView}
          onOpen={setActiveIndex}
        />
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        images={allImages}
        index={activeIndex}
        onClose={closePreview}
        onStep={stepPreview}
        onSelect={setActiveIndex}
      />

      {/* FONTS + KEYFRAMES */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Instrument+Serif:ital@1&display=swap");

        @keyframes cc-scroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @keyframes cc-spin { to { transform: rotate(360deg); } }
        @keyframes cc-float { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(-60px,-40px,0) scale(1.15); } }
        @keyframes cc-shimmer { from { background-position: 100% 0; } to { background-position: 0% 0; } }
        @keyframes cc-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cc-pop { from { opacity: 0; transform: translateY(18px) scale(0.96); } to { opacity: 1; transform: none; } }
        @keyframes cc-swap { from { opacity: 0; transform: scale(1.03); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}