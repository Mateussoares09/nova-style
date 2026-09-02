import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/shop";

const API = "https://nova-style-tan.vercel.app/api";
const inputCls = "w-full border border-black/15 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors duration-300 bg-white";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page" className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">Fale connosco</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
            Contacto<span className="italic font-light text-zinc-400">.</span>
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mt-14">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-zinc-600 leading-relaxed max-w-md">
              Tem alguma questão sobre uma peça, encomenda ou parceria? A nossa equipa responde em menos de 24 horas.
            </p>
            <div className="mt-10 space-y-6">
              {[
                [MapPin, "Avenida da Liberdade 120, Lisboa"],
                [Mail, "atelier@novastyle.com"],
                [Phone, "+244 923 000 000"],
              ].map(([Icon, text]) => (
                <div key={text} className="flex items-center gap-4 text-sm text-zinc-700">
                  <span className="w-11 h-11 bg-[#f4f4f5] flex items-center justify-center">
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                  {text}
                </div>
              ))}
            </div>
            <a
              href={waLink("Olá NOVA STYLE! Gostaria de falar convosco.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-btn"
              className="inline-block mt-10 border border-[#25D366] text-[#128C7E] px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#25D366] hover:text-white transition-colors duration-300"
            >
              Falar no WhatsApp
            </a>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.2}>
            <form onSubmit={submit} data-testid="contact-form" className="space-y-5 bg-[#f4f4f5] p-8 lg:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input required placeholder="Nome" value={form.name} onChange={set("name")} data-testid="contact-name-input" className={inputCls} />
                <input required type="email" placeholder="Email" value={form.email} onChange={set("email")} data-testid="contact-email-input" className={inputCls} />
              </div>
              <textarea
                required
                rows={6}
                placeholder="A sua mensagem"
                value={form.message}
                onChange={set("message")}
                data-testid="contact-message-input"
                className={`${inputCls} resize-none`}
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit-btn"
                className="w-full sm:w-auto bg-black text-white px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? "A enviar..." : "Enviar Mensagem"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
