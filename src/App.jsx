import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Audience from "./components/Audience";
import Process from "./components/Process";
import Why from "./components/Why";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ImageCarousel from "./components/ImageCarousel";
import Video from "./components/Video";
import WhatsAppReviews from "./components/WhatsAppReviews";

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Problems />
        
         {/* WhatsApp Reviews */}
        <WhatsAppReviews />

        <Video />
         <ImageCarousel />

        
        <Process />
        {/* <Audience /> */}
        <Why />
        <FAQ />
      </main>

      <Footer />

      {/* Global contact popup — render only once */}
      <Contact />
    </>
  );
}