import { useEffect, useState } from 'react'
export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => { const c = document.getElementById('contact'); const nearEnd = c && c.getBoundingClientRect().top < window.innerHeight; setShow(window.scrollY > 500 && !nearEnd) }; f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  return <a href="#contact" className={`site-cta site-cta--sticky fixed bottom-4 right-4 z-40 rounded-full bg-gradient-to-r from-[#6D35C9] to-[#9B5CF0] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-10px_rgba(109,53,201,.8)] transition duration-300 hover:-translate-y-0.5 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>Book My One-to-One Call</a>
}
