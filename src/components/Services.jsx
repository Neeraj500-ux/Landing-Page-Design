import { services } from '../data'
import { Button, Card, Check, Container, Reveal, SectionHead } from './ui'
export default function Services() {
  return (
    <section id="get" className="py-20 sm:py-28"><Container>
      <SectionHead title="From Your First Headline to the Final Form—Every Part Has a Purpose." text="We bring your message, design and functionality together to create a landing page that supports a clear business goal." />
      <Reveal className="mt-12"><img loading="lazy" src="/images/deliverables.svg" alt="Full-page design preview with hero, enquiry form and mobile panels (concept)" className="w-full rounded-[2rem] shadow-card" /></Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(([t, d, l], i) => <Reveal key={t} delay={(i % 3) * 80}><Card className="h-full"><h3 className="text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-ink/65">{d}</p>
          <p className="mt-5 text-sm font-semibold">{i === 4 ? 'Available Within the Agreed Scope:' : 'What’s Included:'}</p>
          <ul className="mt-3 space-y-2">{l.map(x => <li key={x} className="flex gap-2 text-sm text-ink/75"><Check />{x}</li>)}</ul></Card></Reveal>)}
      </div>
      <Reveal className="mt-12 text-center"><Button variant="dark" className="site-cta--preserve-color">Plan My Landing Page</Button></Reveal>
    </Container></section>)
}
