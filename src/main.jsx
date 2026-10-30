import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import { store } from "./app/store";
import { AppProvider } from "./context/AppContext";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import ProfilePage from "./ProfilePage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import ProductFormPage from "./ProductFormPage";
import TasksPage from "./TasksPage";
import NotFoundPage from "./NotFoundPage";

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1a1a1a" }, secondary: { main: "#525252" } },
  typography: { fontFamily: "Roboto, sans-serif" },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppProvider>
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
          </AppProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
