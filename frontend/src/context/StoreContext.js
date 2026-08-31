import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => load("nova_cart", []));
  const [wishlist, setWishlist] = useState(() => load("nova_wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => localStorage.setItem("nova_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("nova_wishlist", JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (product, size = product.sizes?.[0] || "U") => {
    setCart((prev) => {
      const key = `${product.id}-${size}`;
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { key, product, size, quantity: 1 }];
    });
    toast.success(`${product.name} adicionado ao carrinho`);
    setCartOpen(true);
  };

  const updateQty = (key, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );

  const removeFromCart = (key) => setCart((prev) => prev.filter((i) => i.key !== key));
  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        toast(`${product.name} removido dos favoritos`);
        return prev.filter((p) => p.id !== product.id);
      }
      toast.success(`${product.name} adicionado aos favoritos`);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((p) => p.id === id);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{ cart, wishlist, cartOpen, setCartOpen, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, isWishlisted, cartTotal, cartCount }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
