import { useEffect, useState } from 'react'
import { nav } from '../data'
import { Container } from './ui'
export default function Navbar() {
  const [open, setOpen] = useState(false), [solid, setSolid] = useState(false)
  useEffect(() => { const f = () => setSolid(window.scrollY > 20); f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <Container>
        <div className={`flex h-14 items-center justify-between rounded-full border px-4 transition duration-300 sm:px-6 ${solid || open ? 'border-white bg-white/85 shadow-card backdrop-blur-xl' : 'border-transparent'}`}>
          <a href="#top" className="font-display text-lg font-bold text-ink">Your Brand Name</a>
          <nav className="hidden items-center gap-8 md:flex">{nav.map(([l, id]) => <a key={id} href={`#${id}`} className="text-sm font-medium text-ink/70 transition hover:text-cobalt">{l}</a>)}</nav>
          <a href="#contact" className="hidden rounded-full bg-gradient-to-r from-[#6D35C9] to-[#9B5CF0] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 md:block">Book a One-to-One Call</a>
          <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-full bg-cobalt/10 text-cobalt md:hidden">{open ? '✕' : '☰'}</button>
        </div>
        {open && <div className="mt-2 rounded-3xl border border-white bg-white/95 p-4 shadow-card backdrop-blur-xl md:hidden">{nav.map(([l, id]) => <a key={id} onClick={() => setOpen(false)} href={`#${id}`} className="block rounded-xl px-3 py-3 font-medium text-ink/80 hover:bg-cloud">{l}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-gradient-to-r from-[#6D35C9] to-[#9B5CF0] py-3 text-center font-semibold text-white">Book a One-to-One Call</a></div>}
      </Container>
    </header>)
}
