import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const reviews = [1, 2, 3, 4].map((n) => ({
  id: n,
  image: `/images/Neeraj18%20(${n}).jpg`,
  alt: `WhatsApp Client Review ${n}`,
}));

function Lightbox({ index, onClose, onChange }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const touch = useRef(null);
  const open = index !== null;

  const move = useCallback(
    (direction) => {
      onChange((index + direction + reviews.length) % reviews.length);
    },
    [index, onChange]
  );

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }

      if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll("button");
        if (!buttons?.length) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, move, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="wr-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Client review image viewer"
      onClick={onClose}
      onTouchStart={(event) => {
        touch.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }}
      onTouchEnd={(event) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;

        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;

        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          move(dx > 0 ? -1 : 1);
        }
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="wr-lightbox-close"
        aria-label="Close image viewer"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        ✕
      </button>

      <button
        type="button"
        className="wr-lightbox-prev"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation();
          move(-1);
        }}
      >
        ❮
      </button>

      <img
        src={reviews[index].image}
        alt={reviews[index].alt}
        draggable={false}
        onClick={(event) => event.stopPropagation()}
      />

      <button
        type="button"
        className="wr-lightbox-next"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation();
          move(1);
        }}
      >
        ❯
      </button>

      <span className="wr-lightbox-count" aria-live="polite">
        {index + 1} / {reviews.length}
      </span>
    </div>,
    document.body
  );
}

export default function WhatsAppReviews() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const slideRef = useRef(0);
  const directionRef = useRef(1);
  const pausedRef = useRef(false);

  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [ratios, setRatios] = useState(() => reviews.map(() => 1));

  const pause = useCallback(() => {
    pausedRef.current = true;
    setPaused(true);

    // Stop an in-progress automatic scroll at the current position.
    const track = trackRef.current;
    if (track) {
      track.scrollTo({
        left: track.scrollLeft,
        behavior: "instant",
      });
    }
  }, []);

  const closeLightbox = useCallback(() => setActive(null), []);

  const openLightbox = useCallback(
    (index) => {
      pause();
      setActive(index);
    },
    [pause]
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const sync = () => {
      setMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    sync();
    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const sync = () => setPageVisible(!document.hidden);
    sync();

    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback((index, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;

    const next = (index + reviews.length) % reviews.length;
    const cards = track.querySelectorAll(".wr-card");
    if (!cards[next]) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollTo({
      left: cards[next].offsetLeft - cards[0].offsetLeft,
      behavior: smooth && !reduce ? "smooth" : "instant",
    });
  }, []);

  const updateSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".wr-card"));
    if (!cards.length) return;

    let nearest = 0;
    let distance = Infinity;

    cards.forEach((card, index) => {
      const difference = Math.abs(
        card.offsetLeft - cards[0].offsetLeft - track.scrollLeft
      );

      if (difference < distance) {
        distance = difference;
        nearest = index;
      }
    });

    slideRef.current = nearest;
    setSlide(nearest);
  }, []);

  useEffect(() => {
    if (
      !mobile ||
      !visible ||
      !pageVisible ||
      paused ||
      reducedMotion ||
      active !== null
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;

      let next = slideRef.current + directionRef.current;

      // Move back smoothly after reaching either end.
      if (next >= reviews.length || next < 0) {
        directionRef.current *= -1;
        next = slideRef.current + directionRef.current;
      }

      goToSlide(next);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [
    mobile,
    visible,
    pageVisible,
    paused,
    reducedMotion,
    active,
    goToSlide,
  ]);

  const manualSlide = (index) => {
    pause();
    goToSlide(index);
  };

  return (
    <section
      ref={sectionRef}
      className={`wr-section ${revealed ? "wr-revealed" : ""}`}
      aria-labelledby="wr-heading"
    >
      <div className="wr-glows" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <header className="wr-header">
        <span className="wr-eyebrow">Real Client Feedback</span>

        <h2 id="wr-heading">
          Real Messages.
          <span>Real Client Reviews.</span>
        </h2>
      </header>

      <div className="wr-gallery">
        <div
          ref={trackRef}
          id="wr-carousel"
          className="wr-track"
          role="region"
          aria-roledescription={mobile ? "carousel" : undefined}
          aria-label="Client review images"
          tabIndex={0}
          onScroll={updateSlide}
          onPointerDown={pause}
          onWheel={pause}
          onFocusCapture={pause}
          onKeyDown={(event) => {
            if (!mobile) return;

            if (event.key === "ArrowRight") {
              event.preventDefault();
              manualSlide(slideRef.current + 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              manualSlide(slideRef.current - 1);
            }
          }}
        >
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className="wr-card"
              style={{
                "--r": ratios[index],
                "--delay": `${index * 100}ms`,
              }}
            >
              <ReviewImage
                review={review}
                onOpen={() => openLightbox(index)}
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (!naturalWidth || !naturalHeight) return;

                  const ratio = naturalWidth / naturalHeight;

                  setRatios((previous) =>
                    Math.abs(previous[index] - ratio) < 0.001
                      ? previous
                      : previous.map((value, i) =>
                          i === index ? ratio : value
                        )
                  );
                }}
              />
            </article>
          ))}
        </div>

        <div className="wr-controls">
          <button
            type="button"
            className="wr-arrow"
            aria-label="Previous review"
            aria-controls="wr-carousel"
            onClick={() => manualSlide(slideRef.current - 1)}
          >
            ‹
          </button>

          <div className="wr-dots" aria-label="Choose a review">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={`wr-dot ${slide === index ? "is-active" : ""}`}
                aria-label={`Go to review ${index + 1}`}
                aria-current={slide === index ? "true" : undefined}
                aria-controls="wr-carousel"
                onClick={() => manualSlide(index)}
              >
                <span />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="wr-arrow"
            aria-label="Next review"
            aria-controls="wr-carousel"
            onClick={() => manualSlide(slideRef.current + 1)}
          >
            ›
          </button>

          {!reducedMotion && (
            <button
              type="button"
              className="wr-arrow wr-play"
              aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
              aria-controls="wr-carousel"
              onClick={() => {
                if (paused) {
                  pausedRef.current = false;
                  setPaused(false);
                } else {
                  pause();
                }
              }}
            >
              {paused ? "▶" : "Ⅱ"}
            </button>
          )}
        </div>

        <p className="wr-hint">
          {reducedMotion
            ? "Swipe Left Or Right · Tap To View"
            : paused
              ? "Paused · Press Play To Resume"
              : "Auto Sliding · Tap Or Swipe To Pause"}
        </p>
      </div>

      <Lightbox
        index={active}
        onClose={closeLightbox}
        onChange={setActive}
      />

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Instrument+Serif:ital@1&display=swap");

        .wr-section,
        .wr-section *,
        .wr-lightbox,
        .wr-lightbox * {
          box-sizing: border-box;
        }

        .wr-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          padding: 56px 0;
          color: #0f172a;
          font-family: "Bricolage Grotesque", system-ui, sans-serif;
          background:
            radial-gradient(circle at 0% 0%, #d8beff80, transparent 45%),
            radial-gradient(circle at 100% 0%, #f0c8ff4d, transparent 45%),
            radial-gradient(circle at 0% 100%, #cdb9ff66, transparent 45%),
            radial-gradient(circle at 100% 100%, #e1c8ff80, transparent 45%),
            linear-gradient(160deg, #fff, #faf6ff 50%, #f3ebff);
        }

        .wr-glows {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .wr-glows span {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: #d9c2ff70;
          filter: blur(90px);
        }

        .wr-glows span:nth-child(1) { top: -96px; left: -96px; }
        .wr-glows span:nth-child(2) {
          top: -96px;
          right: -96px;
          background: #f0d4ff66;
        }
        .wr-glows span:nth-child(3) { bottom: -112px; left: -96px; }
        .wr-glows span:nth-child(4) { bottom: -112px; right: -96px; }

        .wr-header {
          max-width: 850px;
          margin: 0 auto 32px;
          padding-inline: 20px;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 800ms ease, transform 800ms ease;
        }

        .wr-revealed .wr-header {
          opacity: 1;
          transform: none;
        }

        .wr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #7e22ce;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: .02em;
        }

        .wr-eyebrow::before,
        .wr-eyebrow::after {
          content: "";
          width: 32px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, #a855f7);
        }

        .wr-eyebrow::after {
          transform: rotate(180deg);
        }

        .wr-header h2 {
          margin: 0;
          font-size: clamp(32px, 8.5vw, 34px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -.04em;
        }

        .wr-header h2 > span {
          display: block;
          margin-top: .06em;
          padding-bottom: .1em;
          font-family: "Instrument Serif", Georgia, serif;
          font-weight: 400;
          font-style: italic;
          line-height: 1.05;
          letter-spacing: -.01em;
          color: #9333ea;
          background: linear-gradient(
            100deg, #7c3aed, #c026d3 35%, #a855f7 50%, #c026d3 68%, #7c3aed
          );
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .wr-revealed .wr-header h2 > span {
          animation: wr-shimmer 2.8s ease .6s both;
        }

        @keyframes wr-shimmer {
          from { background-position: 100% 0; }
          to { background-position: 0% 0; }
        }

        .wr-gallery {
          width: 100%;
          max-width: 1280px;
          min-width: 0;
          margin-inline: auto;
        }

        .wr-track {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          width: 100%;
          min-width: 0;
          padding: 8px 20px 24px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-padding-inline: 20px;
          overscroll-behavior-x: contain;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          direction: ltr;
        }

        .wr-track::-webkit-scrollbar { display: none; }

        .wr-card {
          flex: 0 0 86%;
          width: 86%;
          min-width: 0;
          margin: 0;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 700ms ease, transform 700ms ease;
          transition-delay: var(--delay);
        }

        .wr-revealed .wr-card {
          opacity: 1;
          transform: none;
        }

        .wr-track::after {
          content: "";
          flex: 0 0 max(0px, calc(14% - 16px));
        }

        .wr-image-button {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          border-radius: 16px;
          background: #0b1014;
          cursor: zoom-in;
          box-shadow: 0 12px 28px -16px #7c3aed73;
          transition: transform 300ms ease;
        }

        .wr-image-button img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: inherit;
          object-fit: contain;
          user-select: none;
        }

        @media (hover: hover) {
          .wr-image-button:hover { transform: scale(1.02); }
        }

        .wr-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 2px;
          padding-inline: 20px;
        }

        .wr-arrow {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          padding: 0;
          border: 1px solid #a855f733;
          border-radius: 50%;
          background: #ffffffcc;
          color: #7c3aed;
          font-family: inherit;
          font-size: 30px;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 5px 18px #7c3aed17;
          transition: background 200ms ease, transform 200ms ease;
        }

        .wr-arrow:hover { background: #fff; }
        .wr-arrow:active { transform: scale(.95); }
        .wr-play { font-size: 15px; }

        .wr-dots { display: flex; align-items: center; }

        .wr-dot {
          display: grid;
          place-items: center;
          width: 27px;
          height: 42px;
          padding: 0;
          border: 0;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
        }

        .wr-dot span {
          width: 7px;
          height: 7px;
          border-radius: 99px;
          background: #d7c3ef;
          transition: width 250ms ease, background 250ms ease;
        }

        .wr-dot.is-active span {
          width: 21px;
          background: linear-gradient(100deg, #7c3aed, #c026d3);
        }

        .wr-hint {
          margin: 12px 20px 0;
          color: #80658f;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: .02em;
          text-align: center;
        }

        .wr-section button:focus-visible,
        .wr-track:focus-visible,
        .wr-lightbox button:focus-visible {
          outline: 2px solid #9333ea;
          outline-offset: 3px;
        }

        .wr-track:focus-visible { outline-offset: -3px; }

        .wr-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100dvh;
          padding: 12px;
          overflow: hidden;
          background: #0009;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .wr-lightbox > img {
          display: block;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: calc(100dvh - 96px);
          border-radius: 16px;
          object-fit: contain;
          box-shadow: 0 24px 70px #0005;
          user-select: none;
        }

        .wr-lightbox button {
          position: absolute;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: #fffffff0;
          color: #0f172a;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 6px 20px #0002;
        }

        .wr-lightbox-close { top: 16px; right: 16px; }
        .wr-lightbox-prev { top: 50%; left: 12px; transform: translateY(-50%); }
        .wr-lightbox-next { top: 50%; right: 12px; transform: translateY(-50%); }

        .wr-lightbox-count {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          padding: 5px 12px;
          border-radius: 99px;
          background: #0009;
          color: #fff;
          font: 500 14px/1.5 system-ui, sans-serif;
        }

        @media (min-width: 640px) {
          .wr-section { padding-block: 64px; }
          .wr-header { margin-bottom: 48px; padding-inline: 28px; }
          .wr-header h2 { font-size: 48px; }
          .wr-eyebrow { font-size: 14px; }

          .wr-track {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
            padding-inline: 28px;
            overflow: visible;
            scroll-snap-type: none;
          }

          .wr-track::after { display: none; }
          .wr-card { width: 100%; }
          .wr-controls, .wr-hint { display: none; }
          .wr-lightbox { padding: 24px; }
          .wr-lightbox > img { max-height: calc(100dvh - 48px); }
        }

        @media (min-width: 768px) {
          .wr-section { padding-block: 80px; }
          .wr-header h2 { font-size: 56px; }
          .wr-track { gap: 24px; padding-inline: 36px; }
        }

        @media (min-width: 1024px) {
          .wr-section { padding-block: 96px; }
          .wr-header { margin-bottom: 56px; }
          .wr-header h2 { font-size: 64px; }
          .wr-eyebrow { font-size: 15px; }

          .wr-track {
            display: flex;
            gap: 20px;
            padding-inline: 48px;
          }

          .wr-card { flex: var(--r) 1 0%; width: auto; }
          .wr-image-button { border-radius: 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wr-header,
          .wr-card {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .wr-revealed .wr-header h2 > span { animation: none; }

          .wr-image-button,
          .wr-arrow,
          .wr-dot span { transition: none; }

          .wr-image-button:hover,
          .wr-arrow:active { transform: none; }
        }
      `}</style>
    </section>
  );
}

function ReviewImage({ review, onOpen, onLoad }) {
  const pointer = useRef(null);
  const swiped = useRef(false);

  return (
    <button
      type="button"
      className="wr-image-button"
      aria-label={`Open ${review.alt}`}
      onPointerDown={(event) => {
        pointer.current = { x: event.clientX, y: event.clientY };
        swiped.current = false;
      }}
      onPointerMove={(event) => {
        if (!pointer.current) return;

        if (
          Math.hypot(
            event.clientX - pointer.current.x,
            event.clientY - pointer.current.y
          ) > 10
        ) {
          swiped.current = true;
        }
      }}
      onPointerCancel={() => {
        swiped.current = true;
        pointer.current = null;
      }}
      onClick={(event) => {
        const start = pointer.current;
        pointer.current = null;

        if (
          event.detail !== 0 &&
          (swiped.current ||
            (start &&
              Math.hypot(
                event.clientX - start.x,
                event.clientY - start.y
              ) > 10))
        ) {
          return;
        }

        onOpen();
      }}
    >
      <img
        src={review.image}
        alt={review.alt}
        decoding="async"
        draggable={false}
        onLoad={onLoad}
      />
    </button>
  );
}