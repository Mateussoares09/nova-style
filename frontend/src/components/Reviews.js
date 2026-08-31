import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const reviews = [
  { name: "Mariana C.", city: "Lisboa", text: "A qualidade do Casaco Aurora superou todas as expectativas. Parece saído de uma passerelle de Paris.", rating: 5 },
  { name: "Diogo F.", city: "Porto", text: "O Fato Onyx é impecável. Corte perfeito, tecido sublime. Já é a minha peça favorita para eventos.", rating: 5 },
  { name: "Sofia A.", city: "Luanda", text: "Encomendei pelo WhatsApp e a experiência foi rápida e pessoal. A camisa de seda é um sonho.", rating: 5 },
];

export default function Reviews() {
  return (
    <section data-testid="reviews-section" className="bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 lg:py-36">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">Testemunhos</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight">
            Quem veste, <span className="italic font-light">confia</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12}>
              <figure className="bg-[#f4f4f5] p-8 lg:p-10 h-full flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#c0a062] text-[#c0a062]" />
                  ))}
                </div>
                <blockquote className="font-serif-display text-xl leading-snug flex-1">"{r.text}"</blockquote>
                <figcaption className="mt-8 text-xs tracking-[0.2em] uppercase text-zinc-500">
                  {r.name} — {r.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
