import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import ProfilePage from "./ProfilePage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import ProductFormPage from "./ProductFormPage";
import TasksPage from "./TasksPage";
import NotFoundPage from "./NotFoundPage";

// Основная маршрутизация существующего приложения. Компоненты магазина сохранены.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="admin/product/new" element={<ProductFormPage />} />
        <Route path="admin/product/edit/:id" element={<ProductFormPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
