import { Reveal } from "@/components/Reveal";

const chapters = [
  { num: "01", title: "Desenho Intemporal", text: "Cada peça nasce de um princípio: durar além das tendências. Silhuetas limpas, proporções estudadas, nada de excessos." },
  { num: "02", title: "Matéria Nobre", text: "Selecionamos lãs italianas, sedas mulberry e algodões orgânicos certificados. O luxo começa no toque." },
  { num: "03", title: "Feito com Consciência", text: "Produção em ateliers europeus, edições limitadas e zero desperdício. Moda que respeita quem a faz e quem a veste." },
];

export default function Manifesto({ compact = false }) {
  return (
    <section data-testid="manifesto-section" className="relative bg-[#0a0a0a] text-white grain">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 lg:py-40">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-4">Manifesto</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight max-w-3xl leading-[1.05]">
            Menos peças. <span className="italic font-light text-zinc-400">Mais intenção.</span>
          </h2>
        </Reveal>

        <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
          {chapters.slice(0, compact ? 2 : 3).map((c, i) => (
            <Reveal key={c.num} delay={i * 0.15}>
              <div className="border-t border-white/15 pt-8">
                <span className="font-serif-display text-6xl lg:text-7xl font-light text-zinc-600">{c.num}</span>
                <h3 className="font-serif-display text-2xl mt-6 mb-4">{c.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
