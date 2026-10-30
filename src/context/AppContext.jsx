import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct as addProductAction, updateProduct as updateProductAction, deleteProduct as deleteProductAction } from "../features/products/productsSlice";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productError = useSelector((state) => state.products.error);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setNotification({ open: true, message, severity });
  const closeNotification = () => setNotification((prev) => ({ ...prev, open: false }));
  const addProduct = (product) => { dispatch(addProductAction(product)); notify(productError || `Product "${product.name}" created successfully`, productError ? "error" : "success"); };
  const updateProduct = (product) => { dispatch(updateProductAction(product)); notify(productError || `Product "${product.name}" updated successfully`, productError ? "error" : "success"); };
  const deleteProduct = (id) => {
    dispatch(deleteProductAction(id));
    setCart((prev) => prev.filter((item) => item.id !== id));
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    notify("Product removed from catalog", "info");
  };
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      return found ? prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...product, qty: 1 }];
    });
    notify(`"${product.name}" added to cart`);
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const changeQty = (id, delta) => setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  const clearCart = () => { setCart([]); notify("Cart cleared", "info"); };
  const toggleWishlist = (product) => setWishlist((prev) => {
    const exists = prev.some((item) => item.id === product.id);
    notify(exists ? `Removed from wishlist: "${product.name}"` : `Added to wishlist: "${product.name}"`, exists ? "info" : "success");
    return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
  });
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);
  const isInCart = (id) => cart.some((item) => item.id === id);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return <AppContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, cart, wishlist, addToCart, removeFromCart, changeQty, clearCart, toggleWishlist, isInWishlist, isInCart, cartCount, cartTotal, notification, closeNotification, notify }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
