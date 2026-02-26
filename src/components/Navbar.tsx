import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#why-us" },
    { label: "Services", href: "#services" },
    { label: "Results", href: "#gallery" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#hero" className="font-heading text-xl font-bold text-primary">
          BrightSmile<span className="text-foreground"> Dental</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:5125550147" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Phone className="h-4 w-4" /> (512) 555-0147
          </a>
          <Button size="sm" asChild>
            <Link to="/book-appointment">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary">
              {l.label}
            </a>
          ))}
          <Button className="w-full" size="sm" asChild>
            <Link to="/book-appointment">Book Appointment</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
