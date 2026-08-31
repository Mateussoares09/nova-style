import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

const API = "http://127.0.0.1:8000/api";

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get("categoria") || "Todos";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/categories`).then((r) => setCategories(r.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = active === "Todos" ? `${API}/products` : `${API}/products?category=${encodeURIComponent(active)}`;
    axios.get(url).then((r) => setProducts(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [active]);

  const setCat = (c) => setParams(c === "Todos" ? {} : { categoria: c });

  return (
    <main data-testid="products-page" className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">Coleção Completa</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
            Produtos<span className="italic font-light text-zinc-400">.</span>
          </h1>
        </Reveal>

        <div data-testid="category-filters" className="flex flex-wrap gap-3 mt-12 mb-14">
          {["Todos", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              data-testid={`filter-${c.toLowerCase()}`}
              className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-colors duration-300 ${
                active === c ? "bg-black text-white border-black" : "border-black/15 text-zinc-600 hover:border-black hover:text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#f4f4f5] animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p data-testid="no-products-message" className="text-zinc-500 py-20 text-center">Nenhum produto encontrado nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
