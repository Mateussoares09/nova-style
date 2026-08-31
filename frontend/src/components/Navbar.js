import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/produtos", label: "Produtos" },
  { to: "/produtos?vista=categorias", label: "Categorias" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-500 ${
        scrolled ? "bg-white/90 border-b border-black/5" : "bg-white/70"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" data-testid="brand-logo" className="font-serif-display text-2xl lg:text-3xl tracking-[0.15em] uppercase">
          Nova<span className="italic font-light"> Style</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-xs tracking-[0.2em] uppercase text-zinc-600 hover:text-black transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-[width] duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/favoritos" data-testid="nav-wishlist-btn" className="relative hover:opacity-60 transition-opacity duration-300">
            <Heart size={20} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button onClick={() => setCartOpen(true)} data-testid="nav-cart-btn" className="relative hover:opacity-60 transition-opacity duration-300">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span data-testid="cart-count-badge" className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} data-testid="mobile-menu-btn" className="lg:hidden">
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden overflow-hidden bg-white border-t border-black/5"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-[0.2em] uppercase text-zinc-700"
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
