import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { fmtPrice, EASE } from "@/lib/shop";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
      data-testid={`product-card-${product.id}`}
      className="group"
    >
      <div className="relative overflow-hidden bg-[#f4f4f5] aspect-[3/4]">
        <Link to={`/produtos/${product.id}`} data-testid={`product-link-${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        {product.tag && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
            {product.tag}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          data-testid={`wishlist-btn-${product.id}`}
          aria-label="Favoritos"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-300"
        >
          <Heart size={16} strokeWidth={1.5} className={wished ? "fill-black text-black" : "text-zinc-600"} />
        </button>
        <button
          onClick={() => addToCart(product)}
          data-testid={`quick-add-btn-${product.id}`}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs tracking-[0.25em] uppercase py-3.5 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"
        >
          <Plus size={14} /> Adicionar
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-1">{product.category}</p>
          <Link to={`/produtos/${product.id}`} className="font-serif-display text-xl hover:opacity-60 transition-opacity duration-300">
            {product.name}
          </Link>
        </div>
        <p data-testid={`product-price-${product.id}`} className="text-sm font-medium mt-4">{fmtPrice(product.price)}</p>
      </div>
    </motion.article>
  );
}
