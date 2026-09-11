import HeroBanner from "./HeroBanner";
import GendersSection from "./GendersSection";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import AboutSection from "./AboutSection";
import SubscribeModule from "./SubscribeModule";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <GendersSection />
      <NewArrivalsCarousel />
      <AboutSection />
      <SubscribeModule />
    </>
  );
}
