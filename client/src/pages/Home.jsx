import AboutUs from "../components/AboutUs";
import Hero from "../components/Hero";
import OurService from "../components/OurService";
import TestimonialCarousel from "../components/testimonial";
import OurPresence from "../components/OurPresence";



function Home() {
  return (
    <div className="container mx-auto p-4">
     <Hero/>
    <AboutUs />
    <OurService />
    <OurPresence />
    <TestimonialCarousel />
    </div>
  );
}

export default Home;