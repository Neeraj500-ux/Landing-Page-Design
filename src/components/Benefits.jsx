import { benefits } from '../data'
import { Container, Reveal, SectionHead } from './ui'
export default function Benefits() {
  return (
    <section className="bg-gradient-to-br from-[#2B1245] via-[#4B266A] to-[#5B2F8F] py-20 text-white sm:py-28"><Container>
      <SectionHead light title="Give More of Your Visitors a Reason to Take the Next Step." text="A focused landing page helps connect the promise that brought someone to you with the information they need before enquiring." />
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map(([t, d], i) => <Reveal key={t} delay={i * 60} className="bg-[#34174F]"><div className="h-full p-8 transition duration-300 hover:bg-white/[.06]"><div className="mb-5 h-1 w-8 rounded-full bg-amber" /><h3 className="text-xl font-bold">{t}</h3><p className="mt-3 text-white/65">{d}</p></div></Reveal>)}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/50">Results depend on your offer, traffic quality, audience and sales follow-up. A landing page is one important part of that journey.</p>
    </Container></section>)
}
