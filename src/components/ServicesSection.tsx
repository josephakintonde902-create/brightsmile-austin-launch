import { motion } from "framer-motion";
import { Sparkles, CircleDot, Activity, SmilePlus, Palette, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Sparkles, title: "Teeth Whitening", desc: "Professional whitening treatments for a brighter, more confident smile." },
  { icon: CircleDot, title: "Dental Implants", desc: "Permanent, natural-looking tooth replacements that last a lifetime." },
  { icon: Activity, title: "Root Canal Treatment", desc: "Pain-free root canal therapy using modern techniques and sedation." },
  { icon: SmilePlus, title: "Invisalign", desc: "Straighten your teeth discreetly with custom clear aligners." },
  { icon: Palette, title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers tailored to your goals." },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle, kid-friendly dental care in a fun and welcoming environment." },
];

const ServicesSection = () => (
  <section id="services" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Our Services</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Comprehensive Dental Solutions
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-card rounded-2xl p-7 shadow-soft hover:shadow-card transition-all border border-border/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
            <Button variant="link" className="px-0 text-primary font-medium">
              Learn More →
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
