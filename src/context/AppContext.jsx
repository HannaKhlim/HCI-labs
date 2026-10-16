import { createContext, useContext, useState } from "react";
import initialProducts from "../data/products.json";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      image: newProduct.image || "/photos/placeholder.jpg",
    };
    setProducts((prev) => [product, ...prev]);
    notify(`Product "${product.name}" created successfully`);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...updatedProduct, price: Number(updatedProduct.price) } : p))
    );
    notify(`Product "${updatedProduct.name}" updated successfully`);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    removeFromCart(id);
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    notify("Product removed from catalog", "info");
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    notify(`"${product.name}" added to cart`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    notify("Cart cleared", "info");
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        notify(`Removed from wishlist: "${product.name}"`, "info");
        return prev.filter((item) => item.id !== product.id);
      }
      notify(`Added to wishlist: "${product.name}"`);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);
  const isInCart = (id) => cart.some((item) => item.id === id);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    changeQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    isInCart,
    cartCount,
    cartTotal,
    notification,
    closeNotification,
    notify,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}