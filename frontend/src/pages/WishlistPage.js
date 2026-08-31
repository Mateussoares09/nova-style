import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/context/StoreContext";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <main data-testid="wishlist-page" className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">A sua seleção</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
            Favoritos<span className="italic font-light text-zinc-400">.</span>
          </h1>
        </Reveal>

        {wishlist.length === 0 ? (
          <div className="py-24 text-center">
            <p data-testid="wishlist-empty-message" className="text-zinc-500 mb-6">Ainda não guardou nenhuma peça.</p>
            <Link to="/produtos" className="text-xs tracking-[0.25em] uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity duration-300">
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-14">
            {wishlist.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
