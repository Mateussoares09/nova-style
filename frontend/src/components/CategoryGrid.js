import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const cats = [
  { name: "Casacos", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80", span: "lg:col-span-7", h: "h-[420px] lg:h-[560px]" },
  { name: "Alfaiataria", image: "https://images.pexels.com/photos/5745783/pexels-photo-5745783.jpeg?auto=compress&cs=tinysrgb&w=1200", span: "lg:col-span-5", h: "h-[420px] lg:h-[560px]" },
  { name: "Tops", image: "https://images.unsplash.com/photo-1606143412458-acc5f86de897?auto=format&fit=crop&w=1200&q=80", span: "lg:col-span-4", h: "h-[380px] lg:h-[460px]" },
  { name: "Vestidos", image: "https://images.pexels.com/photos/8465947/pexels-photo-8465947.jpeg?auto=compress&cs=tinysrgb&w=1200", span: "lg:col-span-4", h: "h-[380px] lg:h-[460px]" },
  { name: "Acessórios", image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=1200&q=80", span: "lg:col-span-4", h: "h-[380px] lg:h-[460px]" },
];

export default function CategoryGrid() {
  return (
    <section data-testid="categories-section" className="bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 lg:py-36">
        <Reveal className="flex items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">Categorias</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight">
              Explorar por <span className="italic font-light">universo</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {cats.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className={c.span}>
              <Link
                to={`/produtos?categoria=${encodeURIComponent(c.name)}`}
                data-testid={`category-card-${c.name.toLowerCase()}`}
                className={`group relative block overflow-hidden bg-[#f4f4f5] ${c.h}`}
              >
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
                  <span className="font-serif-display text-2xl lg:text-3xl text-white uppercase tracking-wider">{c.name}</span>
                  <span className="w-10 h-10 bg-white/15 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
