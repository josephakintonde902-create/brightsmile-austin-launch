import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-20 lg:py-28 bg-card">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Get In Touch</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Visit Our Austin Office
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {[
            { icon: Phone, label: "Phone", value: "(512) 555-0147", href: "tel:5125550147" },
            { icon: Mail, label: "Email", value: "info@brightsmileclinic.com", href: "mailto:info@brightsmileclinic.com" },
            { icon: MapPin, label: "Address", value: "123 Dental Way, Austin, TX 78701" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>
                ) : (
                  <p className="font-medium text-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="font-medium text-foreground">Mon–Fri: 8:00 AM – 6:00 PM</p>
              <p className="font-medium text-foreground">Sat: 9:00 AM – 2:00 PM</p>
              <p className="text-sm text-muted-foreground">Sun: Closed</p>
            </div>
          </div>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden shadow-card border border-border/50 min-h-[320px]"
        >
          <iframe
            title="BrightSmile Dental Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220844.2543409498!2d-97.89503!3d30.30798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            className="min-h-[320px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
