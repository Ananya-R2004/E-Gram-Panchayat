import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useLocation } from "wouter";
// NOTE: Assuming this path is correct for your asset
import logoImage from "@assets/logo-egram_1761904001695.jpg"; 

// IMPORTANT: Define services with their correct internal application paths
const services = [
  { name: "Education", href: "/services/education" },
  { name: "Healthcare", href: "/services/healthcare" },
  { name: "Agriculture", href: "/services/agriculture" },
  { name: "Schemes & Policies", href: "/services/schemes" },
  { name: "Issue Reporting", href: "/services/issue-reporting" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  // Get both location state and setLocation function
  const [location, setLocation] = useLocation(); 

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

  // This function handles internal routing (within the Vite App)
  const handleRedirect = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };

  // ✅ FIX: This function handles redirecting to the Home page path and then scrolling.
  const handleHomeNavigation = (hash: string) => {
    setMobileMenuOpen(false);
    
    // 1. If we are NOT on the home path, redirect to the home path with the hash.
    // The Home component (Home.tsx) will then handle the scroll.
    if (location !== "/") {
      setLocation(`/${hash}`);
      return;
    }
    
    // 2. If we ARE on the home path, perform the scroll directly.
    const element = document.querySelector(hash);
    if (element) {
      const offset = 80; // Offset for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always redirects to Home page root and scrolls to #home */}
          <button
            onClick={() => handleHomeNavigation("#home")}
            className="flex items-center gap-3 rounded-md px-2 py-1"
          >
            <img src={logoImage} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="font-serif text-lg font-semibold hidden sm:block">
              E-Gram Panchayat
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" onClick={() => handleHomeNavigation("#home")}>Home</Button>
            <Button variant="ghost" onClick={() => handleHomeNavigation("#about")}>About</Button>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {/* Change: Clicking main Services button goes to a services landing page */}
              <Button variant="ghost" onClick={() => handleRedirect("/services")} className="flex items-center gap-1">
                Services <ChevronDown className={`h-4 w-4 ${servicesOpen ? "rotate-180" : ""}`} />
              </Button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border rounded-md shadow-lg z-50">
                  {services.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => handleRedirect(service.href)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-accent"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" onClick={() => handleHomeNavigation("#contact")}>Contact</Button>

            {/* External Link: Meeting Room */}
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer" aria-label="Open Meeting Room">
              <Button variant="ghost">Meeting Room</Button>
            </a>

            {user ? (
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.fullName}</span>
                </Button>

                <div className="absolute right-0 mt-1 hidden group-hover:block bg-popover border rounded-md shadow-md w-44 z-50">
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

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Content (Ensure Meeting Room link is also updated here) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t px-6 pb-4 pt-2 space-y-2 bg-background z-50">
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleHomeNavigation("#home")}>Home</Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleHomeNavigation("#about")}>About</Button>

          {/* Mobile Services Dropdown - simplified to direct link to Services page */}
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleRedirect("/services")}>Services</Button>
          
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleHomeNavigation("#contact")}>Contact</Button>
          
          {/* ✅ FIX: Mobile External Link to Video Server on port 3000 */}
          <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer" aria-label="Open Meeting Room">
            <Button variant="ghost" className="w-full justify-start">Meeting Room</Button>
          </a>

          {user ? (
            <>
              <Button onClick={goDashboard} className="w-full justify-start" variant="ghost">Dashboard</Button>
              <Button onClick={handleLogout} className="w-full justify-start text-red-600" variant="ghost">Logout</Button>
            </>
          ) : (
            <Button variant="default" className="w-full" onClick={() => handleRedirect("/register")}>
              Register / Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
