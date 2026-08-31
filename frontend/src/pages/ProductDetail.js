import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowLeft, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { fmtPrice, waLink, EASE } from "@/lib/shop";

const API = "http://127.0.0.1:8000/api";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setProduct(null);
    axios
      .get(`${API}/products/${id}`)
      .then((r) => {
        setProduct(r.data);
        setSize(r.data.sizes[0]);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound)
    return (
      <main className="pt-32 pb-24 text-center">
        <p className="text-zinc-500">Produto não encontrado.</p>
        <Link to="/produtos" className="inline-block mt-4 text-xs tracking-[0.25em] uppercase border-b border-black pb-1">Voltar aos produtos</Link>
      </main>
    );

  if (!product)
    return (
      <main className="pt-16 lg:pt-20 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-[#f4f4f5] animate-pulse" />
          <div className="space-y-4 pt-8">
            <div className="h-8 w-2/3 bg-[#f4f4f5] animate-pulse" />
            <div className="h-4 w-1/3 bg-[#f4f4f5] animate-pulse" />
          </div>
        </div>
      </main>
    );

  const wished = isWishlisted(product.id);

  return (
    <main data-testid="product-detail-page" className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <Link to="/produtos" data-testid="back-to-products" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-black transition-colors duration-300 mb-10">
          <ArrowLeft size={14} /> Voltar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden bg-[#f4f4f5] aspect-[3/4]"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.tag && (
              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">{product.tag}</span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="lg:py-8"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mb-3">{product.category}</p>
            <h1 data-testid="product-detail-name" className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none">{product.name}</h1>
            <p data-testid="product-detail-price" className="text-2xl font-light mt-6">{fmtPrice(product.price)}</p>
            <p className="text-zinc-600 leading-relaxed mt-8 max-w-md">{product.description}</p>

            <div className="mt-10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-4">Tamanho</p>
              <div className="flex flex-wrap gap-3" data-testid="size-selector">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    data-testid={`size-btn-${s}`}
                    className={`min-w-[52px] px-4 py-3 text-sm border transition-colors duration-300 ${
                      size === s ? "bg-black text-white border-black" : "border-black/15 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product, size)}
                data-testid="add-to-cart-btn"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-zinc-800 transition-colors duration-300"
              >
                <ShoppingBag size={16} /> Adicionar ao Carrinho
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                data-testid="detail-wishlist-btn"
                aria-label="Favoritos"
                className={`inline-flex items-center justify-center px-6 py-4 border transition-colors duration-300 ${
                  wished ? "bg-black text-white border-black" : "border-black/20 hover:border-black"
                }`}
              >
                <Heart size={16} className={wished ? "fill-white" : ""} />
              </button>
            </div>

            <a
              href={waLink(`Olá NOVA STYLE! Tenho interesse no produto: ${product.name} (Tamanho ${size}) — ${fmtPrice(product.price)}`)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-buy-btn"
              className="mt-4 w-full inline-flex items-center justify-center gap-3 border border-[#25D366] text-[#128C7E] px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#25D366] hover:text-white transition-colors duration-300"
            >
              Comprar pelo WhatsApp
            </a>

            <div className="mt-12 border-t border-black/10 pt-8 space-y-5">
              <p className="text-sm text-zinc-600 leading-relaxed">{product.details}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[[Truck, "Envio grátis +150€"], [RotateCcw, "Devolução 30 dias"], [ShieldCheck, "Compra segura"]].map(([Icon, label]) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-[11px] text-zinc-500">
                    <Icon size={18} strokeWidth={1.25} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
