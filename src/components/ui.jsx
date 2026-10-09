import { useEffect, useRef } from 'react'
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { el && el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`}>{children}</div>
}
export const Container = ({ children, className = '' }) => <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
export const Pill = ({ children, className = '' }) => <span className={`inline-flex items-center gap-2 rounded-full border border-cobalt/15 bg-white/80 px-4 py-1.5 text-sm font-medium text-cobalt shadow-sm ${className}`}>{children}</span>
export const SectionHead = ({ title, text, center = true, light = false }) => (
  <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <h2 className={`text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl ${light ? 'text-white' : ''}`}>{title}</h2>
    {text && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-ink/65'}`}>{text}</p>}
  </Reveal>
)
export const Button = ({ href = '#contact', children, variant = 'primary', className = '' }) => {
  const v = variant === 'primary' ? 'bg-gradient-to-r from-amber to-sun text-ink shadow-[0_10px_28px_-10px_rgba(255,138,61,.8)] hover:brightness-105' : variant === 'dark' ? 'bg-gradient-to-r from-[#6D35C9] to-[#9B5CF0] text-white shadow-[0_10px_28px_-10px_rgba(109,53,201,.7)] hover:brightness-110' : 'border border-white/30 text-white hover:bg-white/10'
  return <a href={href} className={`site-cta group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${v} ${className}`}>{children}<span aria-hidden className="transition group-hover:translate-x-1">→</span></a>
}
export const Check = () => <svg className="mt-1 h-4 w-4 shrink-0 text-cobalt" viewBox="0 0 20 20" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" /></svg>
export const Card = ({ children, className = '' }) => <div className={`rounded-[1.75rem] border border-white/80 bg-white/90 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_24px_48px_-20px_rgba(109,53,201,.4)] ${className}`}>{children}</div>
