import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useLocation } from "wouter";
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
  const [, setLocation] = useLocation();

  const [user, setUser] = useState<{ role: string; fullName: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    const fullName = localStorage.getItem("userName");

    if (token && role) setUser({ role, fullName: fullName || "User" });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setLocation("/");
  };

  const goDashboard = () => {
    if (!user) return;

    if (user.role === "admin") setLocation("/admin/dashboard");
    else setLocation("/villager/dashboard");
  };

  const handleRedirect = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3 rounded-md px-2 py-1"
          >
            <img src={logoImage} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="font-serif text-lg font-semibold hidden sm:block">
              E-Gram Panchayat
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" onClick={() => scrollToSection("#home")}>Home</Button>
            <Button variant="ghost" onClick={() => scrollToSection("#about")}>About</Button>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Button variant="ghost" className="flex items-center gap-1">
                Services <ChevronDown className={`h-4 w-4 ${servicesOpen ? "rotate-180" : ""}`} />
              </Button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border rounded-md shadow-lg">
                  {services.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => scrollToSection(service.href)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-accent"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" onClick={() => scrollToSection("#contact")}>Contact</Button>
            <Button variant="ghost" onClick={() => handleRedirect("/meeting")}>Meeting Room</Button>

            {user ? (
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.fullName}</span>
                </Button>

                <div className="absolute right-0 mt-1 hidden group-hover:block bg-popover border rounded-md shadow-md w-44">
                  <button onClick={goDashboard} className="block px-4 py-2 text-sm w-full text-left hover:bg-accent">
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm w-full text-left text-red-600 hover:bg-accent">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button variant="default" onClick={() => handleRedirect("/register")}>
                Register / Login
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
