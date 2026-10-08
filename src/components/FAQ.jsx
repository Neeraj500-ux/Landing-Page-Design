import { useState } from 'react'
import { faqs } from '../data'
import { Container, Reveal, SectionHead } from './ui'
export default function FAQ() {
  const [o, setO] = useState(0)
  return (
    <section id="faq" className="py-20 sm:py-28"><Container>
      <SectionHead title="Have Questions Before We Begin?" />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map(([q, a], i) => <Reveal key={q}><div className={`rounded-2xl border transition duration-300 ${o === i ? 'border-cobalt/30 bg-cloud' : 'border-mist hover:border-cobalt/30'}`}>
          <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"><span>{q}</span><span className={`text-xl text-cobalt transition duration-300 ${o === i ? 'rotate-45' : ''}`}>+</span></button>
          <div className={`grid transition-all duration-300 ${o === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="px-5 pb-5 text-ink/65">{a}</p></div></div></div></Reveal>)}
      </div></Container></section>)
}
