import Header from "./Header";
import Footer from "./Footer";
import HeroBanner from "./HeroBanner";
import GendersSection from "./GenderSection";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import AboutSection from "./AboutSection";
import SubscribeModule from "./SubscribeModule";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <GendersSection />
        <NewArrivalsCarousel />
        <AboutSection />
        <SubscribeModule />
      </main>
      <Footer />
    </>
  );
}