import { audiences } from '../data'
import { Button, Check, Container, Reveal, SectionHead } from './ui'
export default function Audience() {
  return (
    <section id="who" className="py-20 sm:py-28"><Container>
      <SectionHead title="Built for Experts Who Want More Meaningful Conversations." text="Whether you sell personal guidance, professional advice or practical training, your landing page should explain your offer in a way your audience understands." />
      <div className="mt-16 space-y-20 sm:space-y-28">
        {audiences.map((a, i) => (
          <div key={a.t} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 ? 'lg:order-2' : ''}><div className="group overflow-hidden rounded-[2rem] shadow-card"><img loading="lazy" src={`/images/${a.img}`} alt={`${a.t.replace('For ', '')} working with a client (concept image)`} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" /></div></Reveal>
            <Reveal delay={100}>
              <span className="rounded-full bg-cobalt/10 px-3.5 py-1 text-sm font-semibold text-cobalt">{a.t}</span>
              <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">{a.h}</h3>
              <p className="mt-4 text-ink/65">{a.p}</p>
              <p className="mt-6 text-sm font-semibold">Ideal for:</p>
              <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">{a.l.map(x => <li key={x} className="flex gap-2 text-sm text-ink/75"><Check />{x}</li>)}</ul>
              <p className="mt-6 rounded-2xl bg-cloud p-4 text-sm"><b className="font-semibold">Page goals: </b>{a.g}</p>
            </Reveal>
          </div>))}
      </div>
      <Reveal className="mt-16 text-center"><Button variant="dark">Discuss My Landing Page</Button></Reveal>
    </Container></section>)
}
