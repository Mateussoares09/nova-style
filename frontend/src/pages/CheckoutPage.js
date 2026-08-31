import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { fmtPrice, waLink, EASE } from "@/lib/shop";
import { Reveal } from "@/components/Reveal";

const API = "http://127.0.0.1:8000/api";

const inputCls = "w-full border border-black/15 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors duration-300 bg-white";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "", address: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const shipping = cartTotal >= 150 || cartTotal === 0 ? 0 : 9;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/orders`, {
        ...form,
        items: cart.map((i) => ({ product_id: i.product.id, name: i.product.name, price: i.product.price, size: i.size, quantity: i.quantity })),
        total: cartTotal + shipping,
      });
      setOrderId(res.data.id);
      clearCart();
    } catch {
      toast.error("Erro ao processar a encomenda. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId)
    return (
      <main data-testid="checkout-success" className="pt-16 lg:pt-20 min-h-screen bg-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="text-center px-6 max-w-lg">
          <CheckCircle2 size={56} strokeWidth={1} className="mx-auto text-[#c0a062]" />
          <h1 className="font-serif-display text-4xl lg:text-5xl uppercase tracking-tight mt-8">Obrigado!</h1>
          <p className="text-zinc-600 mt-4 leading-relaxed">
            A sua encomenda foi recebida com sucesso. Entraremos em contacto brevemente para confirmar os detalhes.
          </p>
          <p className="text-[11px] tracking-[0.2em] uppercase text-zinc-400 mt-4">Ref: {orderId.slice(0, 8).toUpperCase()}</p>
          <Link to="/produtos" data-testid="continue-shopping-btn" className="inline-block mt-10 bg-black text-white px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-zinc-800 transition-colors duration-300">
            Continuar a Comprar
          </Link>
        </motion.div>
      </main>
    );

  return (
    <main data-testid="checkout-page" className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">Último passo</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
            Checkout<span className="italic font-light text-zinc-400">.</span>
          </h1>
        </Reveal>

        {cart.length === 0 ? (
          <div className="py-24 text-center">
            <p data-testid="checkout-empty-message" className="text-zinc-500 mb-6">O seu carrinho está vazio.</p>
            <Link to="/produtos" className="text-xs tracking-[0.25em] uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity duration-300">
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mt-14">
            <form onSubmit={submit} data-testid="checkout-form" className="lg:col-span-7 space-y-5">
              <p className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">Dados de Entrega</p>
              <input required placeholder="Nome completo" value={form.customer_name} onChange={set("customer_name")} data-testid="checkout-name-input" className={inputCls} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input required type="email" placeholder="Email" value={form.email} onChange={set("email")} data-testid="checkout-email-input" className={inputCls} />
                <input required placeholder="Telefone" value={form.phone} onChange={set("phone")} data-testid="checkout-phone-input" className={inputCls} />
              </div>
              <input required placeholder="Morada" value={form.address} onChange={set("address")} data-testid="checkout-address-input" className={inputCls} />
              <input required placeholder="Cidade" value={form.city} onChange={set("city")} data-testid="checkout-city-input" className={inputCls} />
              <button
                type="submit"
                disabled={loading}
                data-testid="checkout-submit-btn"
                className="w-full bg-black text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? "A processar..." : "Confirmar Encomenda"}
              </button>
              <a
                href={waLink(`Olá NOVA STYLE! Gostaria de finalizar a minha encomenda no valor de ${fmtPrice(cartTotal + shipping)}.`)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="checkout-whatsapp-btn"
                className="block w-full border border-[#25D366] text-[#128C7E] text-center py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#25D366] hover:text-white transition-colors duration-300"
              >
                Finalizar pelo WhatsApp
              </a>
            </form>

            <aside className="lg:col-span-5">
              <div className="bg-[#f4f4f5] p-8 lg:p-10">
                <p className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-8">Resumo da Encomenda</p>
                <ul className="space-y-5">
                  {cart.map((i) => (
                    <li key={i.key} className="flex gap-4 items-center">
                      <img src={i.product.image} alt={i.product.name} className="w-14 h-16 object-cover" />
                      <div className="flex-1">
                        <p className="font-serif-display text-lg leading-tight">{i.product.name}</p>
                        <p className="text-xs text-zinc-500">{i.size} · x{i.quantity}</p>
                      </div>
                      <p className="text-sm">{fmtPrice(i.product.price * i.quantity)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-black/10 mt-8 pt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-600"><span>Subtotal</span><span>{fmtPrice(cartTotal)}</span></div>
                  <div className="flex justify-between text-zinc-600"><span>Envio</span><span>{shipping === 0 ? "Grátis" : fmtPrice(shipping)}</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-black/10">
                    <span className="text-xs tracking-[0.25em] uppercase">Total</span>
                    <span data-testid="checkout-total" className="font-serif-display text-2xl">{fmtPrice(cartTotal + shipping)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
