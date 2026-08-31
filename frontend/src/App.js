import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetail from "@/pages/ProductDetail";
import WishlistPage from "@/pages/WishlistPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/produtos/:id" element={<ProductDetail />} />
            <Route path="/favoritos" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/sobre" element={<AboutPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: 0, fontFamily: "Manrope, sans-serif" } }} />
      </StoreProvider>
    </div>
  );
}

export default App;
