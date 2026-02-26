import { motion } from "framer-motion";
import { Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "@/assets/dental-hero.webp";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Smiling patient in bright dental clinic" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl space-y-6"
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-medium text-primary-foreground">Rated 5 Stars by Austin Patients</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground">
            Modern Dental Care With Easy Online Booking
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
            Trusted family and cosmetic dentistry in Austin. Book your appointment in less than 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" className="text-base px-8 rounded-full shadow-elevated" asChild>
              <Link to="/book-appointment">Book Appointment</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
              <a href="tel:5125550147">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
