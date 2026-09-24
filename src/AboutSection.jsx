import { Component } from "react";
import AboutText from "./AboutText";
import { translations } from "./translations";

export default class AboutSection extends Component {
  render() {
    const { about } = translations;

    return (
      <section className="about">
        <h2 className="about__header">{about.header}</h2>
        <div className="about__container">
          <img src="/photos/about.png" alt="About Us" className="about__img" />
          <AboutText />
        </div>
      </section>
    );
  }
}