import { motion } from "framer-motion";
import ba1 from "@/assets/smile-ba-1.webp";
import ba2 from "@/assets/smile-ba-2.webp";
import ba3 from "@/assets/smile-ba-3.webp";

const images = [
  { src: ba1, alt: "Teeth whitening before and after" },
  { src: ba2, alt: "Teeth alignment before and after" },
  { src: ba3, alt: "Cosmetic dental makeover before and after" },
];

const GallerySection = () => (
  <section id="gallery" className="py-20 lg:py-28 bg-card">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Before & After</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Real Patient Results
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="overflow-hidden rounded-2xl shadow-card"
          >
            <img src={img.src} alt={img.alt} className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
