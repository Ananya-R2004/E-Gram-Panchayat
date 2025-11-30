import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoImage from "@assets/logo-egram_1761904001695.jpg";
// Footer Component
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="E-Gram Panchayat" className="h-12 w-12 object-contain" />
              <span className="font-serif text-lg font-semibold text-foreground">
                E-Gram Panchayat
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering rural communities through digital governance and transparent administration.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Healthcare
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Agriculture
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Schemes & Policies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-twitter"
              >
                <Twitter className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-md bg-muted hover-elevate flex items-center justify-center"
                data-testid="link-youtube"
              >
                <Youtube className="h-4 w-4 text-foreground" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for updates and announcements
            </p>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} E-Gram Panchayat. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
