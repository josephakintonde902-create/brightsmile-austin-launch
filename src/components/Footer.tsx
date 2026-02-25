import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/80 py-14">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-heading text-xl font-bold text-primary-foreground mb-3">BrightSmile Dental</p>
          <p className="text-sm leading-relaxed">Your trusted family and cosmetic dentistry practice in Austin, Texas.</p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-semibold text-primary-foreground mb-3 text-sm uppercase tracking-wide">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Services", "Results", "Reviews", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="font-semibold text-primary-foreground mb-3 text-sm uppercase tracking-wide">Services</p>
          <ul className="space-y-2 text-sm">
            {["Teeth Whitening", "Dental Implants", "Root Canal", "Invisalign", "Cosmetic Dentistry", "Pediatric Dentistry"].map((s) => (
              <li key={s}><a href="#services" className="hover:text-primary-foreground transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-semibold text-primary-foreground mb-3 text-sm uppercase tracking-wide">Follow Us</p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p>© 2026 BrightSmile Dental Studio. All rights reserved.</p>
        <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
