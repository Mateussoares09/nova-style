import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskedLine } from "@/components/Reveal";
import { EASE } from "@/lib/shop";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://static.prod-images.emergentagent.com/jobs/85a04bd4-c888-4488-b63c-fa22f1cf3ab9/images/832c0bacfc15f1a9f5255e725810a4f806c4b61c2ed71ec9fd7c384d16047d65.jpeg"
          alt="NOVA STYLE — Nova Coleção"
          className="w-full h-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex flex-col justify-end max-w-[1600px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="text-white/70 text-xs tracking-[0.35em] uppercase mb-6"
        >
          Coleção Outono / Inverno 2026
        </motion.p>

        <h1 className="font-serif-display text-white uppercase leading-[0.9] tracking-tight text-5xl sm:text-6xl lg:text-[7vw]">
          <MaskedLine delay={0.35}>Vestir o</MaskedLine>
          <MaskedLine delay={0.5} className="italic font-light">Extraordinário</MaskedLine>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/produtos"
            data-testid="hero-cta-shop"
            className="group inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-zinc-200 transition-colors duration-300"
          >
            Explorar Coleção
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/sobre"
            data-testid="hero-cta-about"
            className="inline-flex items-center justify-center gap-3 border border-white/40 text-white px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
          >
            A Nossa História
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-8 lg:right-12 hidden md:flex items-center gap-3 text-white/50 text-[10px] tracking-[0.3em] uppercase"
      >
        <span className="w-10 h-px bg-white/40" />
        Scroll
      </motion.div>
    </section>
  );
}
