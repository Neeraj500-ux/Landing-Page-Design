import { work } from '../data'
import { Button, Card, Container, Reveal, SectionHead } from './ui'
export default function Work() {
  return (
    <section className="py-20 sm:py-28"><Container>
      <SectionHead title="See How Clear Messaging Comes Together With Thoughtful Design." text="Explore landing pages created around different offers, audiences and conversion goals. Each project shows what the business needed and how the page supports that goal." />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {work.map(([p, a, g, ap, img], i) => <Reveal key={p} delay={i * 90}><Card className="group h-full !p-4">
          <div className="overflow-hidden rounded-2xl"><img loading="lazy" src={`/images/${img}`} alt={`${p} preview (concept design)`} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" /></div>
          <div className="p-3 pt-5"><span className="rounded-full bg-amber/25 px-3 py-1 text-xs font-semibold">Concept Design</span>
            <h3 className="mt-3 text-xl font-bold">{p}</h3>
            <dl className="mt-3 space-y-1.5 text-sm text-ink/70"><div><dt className="inline font-semibold text-ink">Audience: </dt><dd className="inline">{a}</dd></div><div><dt className="inline font-semibold text-ink">Goal: </dt><dd className="inline">{g}</dd></div><div><dt className="inline font-semibold text-ink">Approach: </dt><dd className="inline">{ap}</dd></div></dl></div></Card></Reveal>)}
      </div>
      <Reveal className="mt-12 text-center"><Button variant="dark">Discuss a Similar Project</Button></Reveal>
    </Container></section>)
}
