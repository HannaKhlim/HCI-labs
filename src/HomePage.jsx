import { useState } from "react";
import HeroBanner from "./HeroBanner";
import GenderSection from "./GenderSection";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import AboutSection from "./AboutSection";
import SubscribeModule from "./SubscribeModule";
import ProductModal from "./ProductModal";
import { useApp } from "./context/AppContext";

export default function HomePage() {
  const { products } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const newArrivals = products.slice(0, 6);

  return (
    <>
      <HeroBanner />
      <GenderSection />
      <NewArrivalsCarousel
        title="New Arrivals"
        items={newArrivals}
        onOpenProduct={(p) => setSelectedProduct(p)}
      />
      <AboutSection />
      <SubscribeModule />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}