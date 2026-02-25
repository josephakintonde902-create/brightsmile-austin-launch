import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    review: "BrightSmile completely changed my confidence. The team was incredibly gentle and professional — I actually look forward to my appointments now!",
  },
  {
    name: "David R.",
    review: "Best dental experience our family has ever had. From check-in to checkout, everything was seamless. Highly recommend for kids and adults alike!",
  },
  {
    name: "Jessica L.",
    review: "I was terrified of the dentist until I found BrightSmile. Dr. Chen and the staff made everything painless and stress-free. 10/10!",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Testimonials</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          What Our Patients Say
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.review}"</p>
            <p className="font-heading font-semibold text-foreground">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
