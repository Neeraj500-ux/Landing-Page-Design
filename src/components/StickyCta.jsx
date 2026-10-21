import { useEffect, useState } from 'react'
import { Button } from './ui'
export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => { const f = () => { const c = document.getElementById('contact'); const nearEnd = c && c.getBoundingClientRect().top < window.innerHeight; setShow(window.scrollY > 500 && !nearEnd) }; f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f) }, [])
  return <Button className={`site-cta--sticky fixed bottom-4 right-4 z-40 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>Yes! Let's Grow My Revenue</Button>
}
