import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryGrid from "@/components/CategoryGrid";
import Manifesto from "@/components/Manifesto";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <FeaturedProducts />
      <Manifesto />
      <CategoryGrid />
      <Reviews />
    </main>
  );
}
