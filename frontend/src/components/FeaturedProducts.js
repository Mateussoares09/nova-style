import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

const API = "http://127.0.0.1:8000/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products?featured=true`).then((r) => setProducts(r.data)).catch(() => {});
  }, []);

  return (
    <section data-testid="featured-section" className="bg-[#f4f4f5]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 lg:py-36">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">Seleção</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight">
              Peças em <span className="italic font-light">destaque</span>
            </h2>
          </div>
          <Link
            to="/produtos"
            data-testid="featured-view-all"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity duration-300 w-fit"
          >
            Ver Tudo <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
