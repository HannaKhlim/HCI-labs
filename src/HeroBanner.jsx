import { Component } from "react";
import heroImg from "./assets/hero.png";

export default class HeroBanner extends Component {
  render() {
    return (
      <section className="hero-banner">
        <img src={heroImg} alt="Hero Banner" className="hero-banner__img" />
      </section>
    );
  }
}