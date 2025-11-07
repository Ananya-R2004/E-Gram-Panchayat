import { useEffect } from 'react';
import { useLocation } from 'wouter';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    // Check if there is a hash (e.g., '#about' if the path is '/#about')
    const hash = location.split('#')[1];
    if (hash) {
      // Use setTimeout to ensure the DOM is fully rendered before attempting to scroll
      setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          // Scroll logic to jump to the section ID
          const offset = 80; 
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 0); 
    }
  }, [location]); 

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* 🛑 CRITICAL: Ensure these IDs match the links in Navbar.tsx */}
      <div id="home"> 
        <Hero />
      </div>
      <div id="about"> 
        <About />
      </div>
      <div id="services"> 
        <Services />
      </div>
      <div id="contact"> 
        <Contact />
      </div>
      <Footer />
    </div>
  );
}