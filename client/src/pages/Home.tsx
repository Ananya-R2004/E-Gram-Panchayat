import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import RegisterLogin from "@/components/RegisterLogin";
import MeetingRoom from "@/components/MeetingRoom";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <RegisterLogin />
      <MeetingRoom />
      <Footer />
    </div>
  );
}
