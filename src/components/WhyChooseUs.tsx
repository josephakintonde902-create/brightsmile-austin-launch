import { motion } from "framer-motion";
import { Award, Monitor, Siren, Star } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "15+ Years Experience",
    desc: "Our team brings over a decade of expertise in general and cosmetic dentistry.",
  },
  {
    icon: Monitor,
    title: "Advanced Digital Equipment",
    desc: "State-of-the-art technology for precise diagnostics and comfortable treatments.",
  },
  {
    icon: Siren,
    title: "Same-Day Emergency Care",
    desc: "Urgent dental issues? We offer same-day appointments to get you relief fast.",
  },
  {
    icon: Star,
    title: "5-Star Patient Reviews",
    desc: "Hundreds of Austin families trust us with their smiles — see what they say.",
  },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-20 lg:py-28 bg-card">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Why Choose Us</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Dental Excellence You Can Trust
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-background rounded-2xl p-8 text-center shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <f.icon className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
