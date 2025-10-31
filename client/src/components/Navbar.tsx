import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/logo-egram_1761904001695.jpg";

const services = [
  { name: "Education", href: "#services" },
  { name: "Healthcare", href: "#services" },
  { name: "Agriculture", href: "#services" },
  { name: "Schemes & Policies", href: "#services" },
  { name: "Issue Reporting", href: "#services" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1"
            data-testid="button-logo"
          >
            <img src={logoImage} alt="E-Gram Panchayat Logo" className="h-10 w-10 object-contain" />
            <span className="font-serif text-lg font-semibold text-foreground hidden sm:block">
              E-Gram Panchayat
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#home")}
              data-testid="link-home"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#about")}
              data-testid="link-about"
            >
              About
            </Button>
            
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Button
                variant="ghost"
                className="flex items-center gap-1"
                data-testid="button-services"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-popover-border rounded-md shadow-lg overflow-hidden">
                  {services.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => scrollToSection(service.href)}
                      className="w-full text-left px-4 py-3 text-sm text-popover-foreground hover-elevate transition-colors"
                      data-testid={`link-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => scrollToSection("#contact")}
              data-testid="link-contact"
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#meeting-room")}
              data-testid="link-meeting-room"
            >
              Meeting Room
            </Button>
            <Button
              variant="default"
              onClick={() => scrollToSection("#register")}
              data-testid="button-register"
            >
              Register
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-4 py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("#home")}
              data-testid="link-home-mobile"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("#about")}
              data-testid="link-about-mobile"
            >
              About
            </Button>
            
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setServicesOpen(!servicesOpen)}
                data-testid="button-services-mobile"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </Button>
              {servicesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {services.map((service) => (
                    <Button
                      key={service.name}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => scrollToSection(service.href)}
                      data-testid={`link-service-${service.name.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                    >
                      {service.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("#contact")}
              data-testid="link-contact-mobile"
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("#meeting-room")}
              data-testid="link-meeting-room-mobile"
            >
              Meeting Room
            </Button>
            <Button
              variant="default"
              className="w-full"
              onClick={() => scrollToSection("#register")}
              data-testid="button-register-mobile"
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
