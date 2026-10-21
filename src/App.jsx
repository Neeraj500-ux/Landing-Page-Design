
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Audience from "./components/Audience";
import Process from "./components/Process";
import Why from "./components/Why";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyCta from "./components/StickyCta";
import ImageCarousel from "./components/ImageCarousel";
import Video from "./components/Video";

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Problems />
        <ImageCarousel />
        <Video />
        <Process />
        <Audience />
        <Why />
        <FAQ />
      </main>

      <Footer />
      <StickyCta />

      {/* Global contact popup — render only once */}
      <Contact />
    </>
  );
}
