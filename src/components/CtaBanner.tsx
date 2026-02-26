import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaBanner = () => (
  <section className="py-20 lg:py-28 bg-primary">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto space-y-6"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
          Ready for a Healthier, Brighter Smile?
        </h2>
        <p className="text-lg text-primary-foreground/80">
          Schedule your appointment today and experience stress-free dental care.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="text-base px-10 rounded-full font-semibold shadow-elevated"
          asChild
        >
          <Link to="/book-appointment">Book Your Visit Now</Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default CtaBanner;
