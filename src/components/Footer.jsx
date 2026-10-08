import { Container } from './ui'
export default function Footer() {
  return (
    <footer className="bg-[#2B1245] pb-10 text-white/60"><Container><div className="grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><p className="font-display text-xl font-bold text-white">Your Brand Name</p><p className="mt-3 max-w-sm text-sm">Landing page strategy, design and development for coaches, consultants and trainers.</p><p className="mt-2 text-sm text-white/80">Clear messaging. Thoughtful design. An easier path to enquiry.</p></div>
      <div className="text-sm"><p className="font-semibold text-white">Contact</p><p className="mt-3">[Your Business Email]</p><p className="mt-1">[Your Business Number]</p></div>
      <div className="text-sm"><p className="font-semibold text-white">Links</p><ul className="mt-3 space-y-1.5">{['Privacy Policy', 'Terms & Conditions'].map(l => <li key={l}><a href="#" className="transition hover:text-white">{l}</a></li>)}<li><a href="#contact" className="transition hover:text-white">Contact</a></li></ul></div>
    </div><p className="mt-10 text-xs">© 2026 Your Brand Name. All rights reserved.</p></Container></footer>)
}
