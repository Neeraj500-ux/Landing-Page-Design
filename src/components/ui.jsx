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
// Every button now uses the same yellow style from index.css (.site-cta).
// The `variant` prop is still accepted so existing code keeps working, but it no longer changes the look.
export const Button = ({ href = '#contact', children, variant = 'primary', className = '' }) => {
  return <a href={href} className={`site-cta group ${className}`}>{children}<span aria-hidden>→</span></a>
}
export const Check = () => <svg className="mt-1 h-4 w-4 shrink-0 text-cobalt" viewBox="0 0 20 20" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" /></svg>
export const Card = ({ children, className = '' }) => <div className={`rounded-[1.75rem] border border-white/80 bg-white/90 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_24px_48px_-20px_rgba(109,53,201,.4)] ${className}`}>{children}</div>