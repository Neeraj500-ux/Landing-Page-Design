import { why } from '../data'
import { Card, Container, Reveal, SectionHead } from './ui'
export default function Why() {
  return (
    <section className="py-20 sm:py-28"><Container>
      <SectionHead title="Why Your Brand Name?" text="Your Expertise Deserves a Page That Explains It Well." />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {why.map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 80}><Card className="h-full"><h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-ink/65">{d}</p></Card></Reveal>)}
      </div></Container></section>)
}
