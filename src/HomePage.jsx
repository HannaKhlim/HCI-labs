import { Component } from "react";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import GendersSection from "./GenderSection";
import NewArrivalsCarousel from "./NewArrivalsCarousel";
import AboutSection from "./AboutSection";
import SubscribeModule from "./SubscribeModule";
import Footer from "./Footer";

export default class HomePage extends Component {
  render() {
    const organization = "DEEPMAG";
    const pageTitle = "New Arrivals";

    const products = [
      { id: 1, name: "Oversize T-Shirt", brand: "Calvin Klein", price: 4500 },
      { id: 2, name: "Slim Jeans", brand: "Tommy Hilfiger", price: 8900 },
      { id: 3, name: "Leather Sneakers", brand: "Geox", price: 11200 },
      { id: 4, name: "Wool Coat", brand: "Armani Exchange", price: 24500 },
    ];

    return (
      <>
        <Header organization={organization} />
        <main>
          <HeroBanner />
          <GendersSection />
          <NewArrivalsCarousel title={pageTitle} items={products} />
          <AboutSection />
          <SubscribeModule />
        </main>
        <Footer organization={organization} />
      </>
    );
  }
}