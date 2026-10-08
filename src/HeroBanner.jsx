import heroImg from "./assets/hero.png";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <img src={heroImg} alt="Hero Banner" className="hero-banner__img" />
    </section>
  );
}