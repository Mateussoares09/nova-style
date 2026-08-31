import { Link } from "react-router-dom";
import Manifesto from "@/components/Manifesto";
import { Reveal } from "@/components/Reveal";

export default function AboutPage() {
  return (
    <main data-testid="about-page" className="pt-16 lg:pt-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">A nossa história</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight max-w-4xl leading-[0.95]">
            Moda que nasce da <span className="italic font-light">essência</span>
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mt-20">
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5745783/pexels-photo-5745783.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Atelier NOVA STYLE"
                className="w-full h-[480px] lg:h-[640px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pt-16" delay={0.2}>
            <span className="font-serif-display text-7xl font-light text-zinc-200">"</span>
            <p className="font-serif-display text-2xl lg:text-3xl leading-snug -mt-6">
              Fundada em 2020 em Lisboa, a NOVA STYLE nasceu de uma convicção simples: o verdadeiro luxo não grita — sussurra.
            </p>
            <p className="text-zinc-600 leading-relaxed mt-8">
              Cada coleção é desenhada no nosso atelier e produzida em pequenas séries por artesãos europeus. Rejeitamos o ciclo do fast fashion e abraçamos peças que atravessam estações, feitas com os melhores tecidos do mundo.
            </p>
            <p className="text-zinc-600 leading-relaxed mt-5">
              Hoje, vestimos clientes em mais de 20 países, mantendo sempre a mesma promessa: qualidade sem compromisso, design sem ruído.
            </p>
            <Link
              to="/produtos"
              data-testid="about-cta-btn"
              className="inline-block mt-10 bg-black text-white px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-zinc-800 transition-colors duration-300"
            >
              Descobrir a Coleção
            </Link>
          </Reveal>
        </div>
      </div>

      <Manifesto />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center">
        <Reveal>
          <p className="font-serif-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight max-w-3xl mx-auto leading-tight">
            "O estilo é a única linguagem que <span className="italic font-light">não precisa de tradução</span>."
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 mt-8">— Direção Criativa, NOVA STYLE</p>
        </Reveal>
      </div>
    </main>
  );
}
