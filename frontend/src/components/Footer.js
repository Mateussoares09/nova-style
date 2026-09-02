import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/shop";

const API = "https://nova-style-tan.vercel.app/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter`, { email });
      toast.success(res.data.message);
      setEmail("");
    } catch {
      toast.error("Erro ao subscrever. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer data-testid="main-footer" className="relative bg-[#0a0a0a] text-white grain">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p className="font-serif-display text-4xl lg:text-5xl uppercase tracking-wider leading-tight">
              Nova<span className="italic font-light"> Style</span>
            </p>
            <p className="text-zinc-400 text-sm mt-6 max-w-sm leading-relaxed">
              Moda contemporânea de luxo acessível. Peças intemporais, desenhadas para durar além das estações.
            </p>
            <div className="flex gap-5 mt-8">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#social" aria-label="Rede social" className="w-10 h-10 border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6">Navegação</p>
            <ul className="space-y-3 text-sm text-zinc-300">
              {[["Home", "/"], ["Produtos", "/produtos"], ["Sobre", "/sobre"], ["Favoritos", "/favoritos"], ["Contacto", "/contacto"]].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors duration-300">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6">Newsletter</p>
            <p className="text-sm text-zinc-300 mb-5">Receba em primeira mão as novas coleções e ofertas exclusivas.</p>
            <form onSubmit={subscribe} data-testid="newsletter-form" className="flex border-b border-white/25 focus-within:border-white transition-colors duration-300">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O seu email"
                data-testid="newsletter-email-input"
                className="flex-1 bg-transparent py-3 text-sm placeholder:text-zinc-500 focus:outline-none"
              />
              <button type="submit" disabled={loading} data-testid="newsletter-submit-btn" aria-label="Subscrever" className="px-3 hover:translate-x-1 transition-transform duration-300">
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
            <a href={waLink("Olá NOVA STYLE! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link" className="inline-block mt-6 text-xs tracking-[0.2em] uppercase text-[#c0a062] hover:text-white transition-colors duration-300">
              WhatsApp: +244 923 000 000
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-[11px] tracking-[0.15em] uppercase text-zinc-500">
          <p>© 2026 NOVA STYLE. Todos os direitos reservados.</p>
          <p>Desenhado em Lisboa · Feito para o mundo</p>
        </div>
      </div>
    </footer>
  );
}
