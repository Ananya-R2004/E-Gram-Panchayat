import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@assets/homepgbg_1761904001690.jpg";

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Welcome to E-Gram Panchayat
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Empowering rural communities through digital governance. Connect, engage, and access essential services for your village.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="default"
            onClick={() => scrollToSection("#register")}
            className="min-w-40"
            data-testid="button-hero-register"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#about")}
            className="min-w-40 bg-background/20 backdrop-blur border-white/30 text-white hover:bg-background/30"
            data-testid="button-hero-learn-more"
          >
            Learn More
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll-indicator"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
}
