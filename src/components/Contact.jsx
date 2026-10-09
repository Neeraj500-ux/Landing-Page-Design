import { useState } from 'react'
import { Container, Reveal } from './ui'
const field = 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition focus:border-amber focus:bg-white/10'
export default function Contact() {
  const [sent, setSent] = useState(false)
  const submit = e => { e.preventDefault(); setSent(true) } // TODO: connect to your form backend / CRM
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#2B1245] via-[#4B266A] to-[#5B2F8F] py-20 text-white sm:py-28">
      <div aria-hidden className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#9B5CF0]/40 blur-[110px]" />
      <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">Let’s Build a Better Destination for Your Next Click.</h2>
          <p className="mt-5 text-lg text-white/70">Your offer deserves a page that communicates its value clearly and makes it easy for the right people to connect. Tell us about your business, the service you want to promote and what you want your landing page to achieve.</p>
          <h3 className="mt-9 text-xl font-bold">Book Your One-to-One Landing Page Call.</h3>
          <p className="mt-3 text-sm font-semibold text-white/80">On the call, we’ll discuss:</p>
          <ul className="mt-3 space-y-2 text-white/70">{['Your audience and offer', 'Your existing page, if you have one', 'Your main conversion goal', 'The content and features you need', 'Suitable next steps for the project'].map(x => <li key={x} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />{x}</li>)}</ul>
          <div className="image-hover mt-9 hidden w-full rounded-3xl ring-1 ring-white/10 lg:block"><img loading="lazy" src="/images/team.svg" alt="Team beside a landing page preview (concept image)" className="w-full" /></div>
        </Reveal>
        <Reveal delay={120}>
          {sent ? <div className="grid min-h-[24rem] place-items-center rounded-3xl bg-white p-8 text-center text-ink"><div><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cobalt text-2xl text-white">✓</div><h3 className="mt-5 text-2xl font-bold">Thank you—we’ve got your details.</h3><p className="mt-2 text-ink/65">We’ll contact you to arrange a suitable time.</p></div></div> :
          <form onSubmit={submit} className="space-y-4 rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">Full Name<input required name="name" className={`${field} mt-1.5`} /></label>
              <label className="block text-sm">Business / Brand Name<input required name="brand" className={`${field} mt-1.5`} /></label>
              <label className="block text-sm">Email Address<input required type="email" name="email" className={`${field} mt-1.5`} /></label>
              <label className="block text-sm">Phone / WhatsApp Number<input required type="tel" name="phone" className={`${field} mt-1.5`} /></label>
            </div>
            <label className="block text-sm">Your Business Type<select name="type" className={`${field} mt-1.5`}>{['Coach', 'Consultant', 'Trainer', 'Other'].map(o => <option key={o} className="text-ink">{o}</option>)}</select></label>
            <label className="block text-sm">Current Website or Landing Page (optional)<input type="url" name="site" placeholder="https://" className={`${field} mt-1.5`} /></label>
            <label className="block text-sm">What Would You Like Your Page to Achieve?<textarea required rows={4} name="goal" className={`${field} mt-1.5`} /></label>
            <button className="site-cta w-full rounded-full bg-gradient-to-r from-amber to-sun py-3.5 font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:brightness-105">Book My One-to-One Call</button>
            <p className="text-center text-sm text-white/55">Share your details, and we’ll contact you to arrange a suitable time.</p>
            <p className="text-center text-xs text-white/40">By submitting this form, you agree to be contacted by Your Brand Name about your enquiry. Please read our <a href="#" className="underline">Privacy Policy</a>.</p>
          </form>}
        </Reveal>
      </Container></section>)
}
