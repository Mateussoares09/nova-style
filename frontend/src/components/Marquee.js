import FastMarquee from "react-fast-marquee";

const items = ["Nova Coleção 2026", "Envio Gratuito Europa", "Alfaiataria Premium", "Edições Limitadas", "Materiais Sustentáveis"];

export default function EditorialMarquee() {
  return (
    <div data-testid="editorial-marquee" className="bg-[#f4f4f5] border-y border-black/5 py-6 overflow-hidden">
      <FastMarquee speed={30} gradient={false} autoFill>
        {items.map((t, i) => (
          <span key={i} className="mx-16 flex items-center gap-16">
            <span className="font-serif-display text-2xl lg:text-3xl uppercase tracking-widest text-[#0a0a0a]">{t}</span>
            <span className="w-2 h-2 rotate-45 bg-[#c0a062] inline-block" />
          </span>
        ))}
      </FastMarquee>
    </div>
  );
}
