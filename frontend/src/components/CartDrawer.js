import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { fmtPrice, waLink, EASE } from "@/lib/shop";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore();

  const waText = `Olá NOVA STYLE! Gostaria de encomendar:\n${cart
    .map((i) => `• ${i.product.name} (${i.size}) x${i.quantity} — ${fmtPrice(i.product.price * i.quantity)}`)
    .join("\n")}\nTotal: ${fmtPrice(cartTotal)}`;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            data-testid="cart-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-white z-[70] flex flex-col"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between px-7 py-6 border-b border-black/5">
              <h2 className="font-serif-display text-2xl uppercase tracking-wider">Carrinho</h2>
              <button onClick={() => setCartOpen(false)} data-testid="cart-close-btn" className="hover:opacity-60 transition-opacity duration-300">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <p data-testid="cart-empty-message" className="text-zinc-500 text-sm">O seu carrinho está vazio.</p>
                  <Link
                    to="/produtos"
                    onClick={() => setCartOpen(false)}
                    className="text-xs tracking-[0.25em] uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity duration-300"
                  >
                    Explorar Produtos
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <li key={item.key} data-testid={`cart-item-${item.product.id}`} className="flex gap-4">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover bg-[#f4f4f5]" />
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-serif-display text-lg leading-tight">{item.product.name}</p>
                          <button onClick={() => removeFromCart(item.key)} data-testid={`cart-remove-${item.product.id}`} className="text-zinc-400 hover:text-black transition-colors duration-300">
                            <Trash2 size={15} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">Tamanho: {item.size}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-black/10">
                            <button onClick={() => updateQty(item.key, -1)} data-testid={`cart-qty-minus-${item.product.id}`} className="px-2.5 py-1.5 hover:bg-black/5 transition-colors duration-200">
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-sm" data-testid={`cart-qty-${item.product.id}`}>{item.quantity}</span>
                            <button onClick={() => updateQty(item.key, 1)} data-testid={`cart-qty-plus-${item.product.id}`} className="px-2.5 py-1.5 hover:bg-black/5 transition-colors duration-200">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-medium">{fmtPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/5 px-7 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">Total</span>
                  <span data-testid="cart-total" className="font-serif-display text-2xl">{fmtPrice(cartTotal)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  data-testid="cart-checkout-btn"
                  className="block w-full bg-black text-white text-center text-xs tracking-[0.3em] uppercase py-4 hover:bg-zinc-800 transition-colors duration-300"
                >
                  Finalizar Compra
                </Link>
                <a
                  href={waLink(waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="cart-whatsapp-btn"
                  className="block w-full border border-black text-center text-xs tracking-[0.3em] uppercase py-4 hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Comprar via WhatsApp
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
