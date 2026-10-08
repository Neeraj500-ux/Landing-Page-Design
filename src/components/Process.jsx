import { steps } from '../data'
import { Button, Container, Reveal, SectionHead } from './ui'
export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28"><Container>
      <SectionHead title="A Clear Process From First Conversation to Launch." />
      <ol className="relative mt-16 space-y-8 before:absolute before:bottom-0 before:left-5 before:top-0 before:w-px before:bg-gradient-to-b before:from-cobalt/0 before:via-cobalt/40 before:to-cobalt/0 md:space-y-0 md:before:left-1/2">
        {steps.map(([t, d, x, lab], i) => <li key={t} className={`relative pl-14 md:grid md:grid-cols-2 md:gap-16 md:py-5 md:pl-0 ${i % 2 ? '' : ''}`}>
          <span className="absolute left-0 top-1 z-10 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#6D35C9] to-[#FF8A3D] font-display font-bold text-white shadow-lg shadow-cobalt/30 md:left-1/2 md:-translate-x-1/2">{i + 1}</span>
          <Reveal className={i % 2 ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}>
            <div className="relative rounded-[1.75rem] border border-white bg-white/90 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(109,53,201,.4)]">
              <span aria-hidden className={`absolute right-5 top-2 font-display text-6xl font-bold text-cobalt/10 ${i % 2 ? '' : 'md:left-5 md:right-auto'}`}>0{i + 1}</span>
              <h3 className="relative text-xl font-bold">{t}</h3><p className="relative mt-2 text-ink/65">{d}</p>
              <p className="relative mt-3 rounded-2xl bg-cloud p-3 text-left text-sm"><b className="font-semibold text-cobalt">{lab}: </b>{x}</p></div></Reveal></li>)}
      </ol>
      <Reveal className="mt-14 text-center"><Button variant="dark">Start With a One-to-One Call</Button></Reveal>
    </Container></section>)
}
