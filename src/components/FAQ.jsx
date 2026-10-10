import { useState } from 'react'
import { faqs } from '../data'
import { Container, Reveal, SectionHead } from './ui'

export default function FAQ() {
  const [o, setO] = useState(0)

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHead title="Have Questions Before We Begin?" />

        <div className="mx-auto mt-10 max-w-3xl space-y-3 sm:mt-14 sm:space-y-4 lg:mt-16">
          {faqs.map(([q, a], i) => {
            const open = o === i
            return (
              <Reveal key={q}>
                <div
                  className={`group rounded-2xl border transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out motion-reduce:transition-none ${
                    open
                      ? 'border-cobalt/30 bg-cloud shadow-[0_18px_40px_-24px_rgba(109,53,201,.45)]'
                      : 'border-mist bg-white shadow-[0_1px_2px_rgba(48,32,69,.04)] hover:-translate-y-px hover:border-cobalt/30 hover:shadow-[0_14px_30px_-22px_rgba(48,32,69,.35)] motion-reduce:hover:translate-y-0'
                  }`}
                >
                  <button
                    id={`faq-q-${i}`}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setO(open ? -1 : i)}
                    className="flex min-h-[3.75rem] w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40 sm:gap-6 sm:px-7 sm:py-5"
                  >
                    <span
                      className={`min-w-0 break-words text-[0.98rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 motion-reduce:transition-none sm:text-[1.08rem] ${
                        open ? 'text-cobalt' : 'group-hover:text-cobalt'
                      }`}
                    >
                      {q}
                    </span>

                    {/* Toggle: ripple ring + fill + rotate. Plus turns into a minus when open */}
                    <span aria-hidden className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
                      {/* soft ripple ring on hover (only while closed) */}
                      {!open && (
                        <span className="pointer-events-none absolute inset-0 rounded-full border border-cobalt/40 opacity-0 group-hover:animate-ping group-hover:opacity-60 motion-reduce:hidden" />
                      )}

                      {/* circle */}
                      <span
                        className={`absolute inset-0 rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out motion-reduce:transition-none ${
                          open
                            ? 'scale-100 border-cobalt bg-cobalt shadow-[0_8px_20px_-6px_rgba(109,53,201,.55)]'
                            : 'scale-100 border-cobalt/25 bg-white group-hover:scale-105 group-hover:border-cobalt group-hover:bg-cobalt group-hover:shadow-[0_8px_20px_-6px_rgba(109,53,201,.55)] motion-reduce:group-hover:scale-100'
                        }`}
                      />

                      {/* plus / minus bars */}
                      <span
                        className={`relative block h-4 w-4 transition-[transform,color] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] motion-reduce:transition-none ${
                          open ? 'rotate-180 text-white' : 'rotate-0 text-cobalt group-hover:rotate-90 group-hover:text-white motion-reduce:group-hover:rotate-0'
                        }`}
                      >
                        <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                            open ? 'scale-y-0' : 'scale-y-100'
                          }`}
                        />
                      </span>
                    </span>
                  </button>

                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    aria-hidden={!open}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`mx-5 border-t border-cobalt/10 transition-transform duration-300 ease-out motion-reduce:transition-none sm:mx-7 ${
                          open ? 'translate-y-0' : '-translate-y-1'
                        }`}
                      >
                        <p className="break-words pb-5 pr-2 pt-4 text-[0.95rem] leading-[1.75] text-ink/65 sm:pb-7 sm:pr-12 sm:pt-5 sm:text-base">
                          {a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}