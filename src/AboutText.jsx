import { Component } from "react";
import { translations } from "./translations";

export default class AboutText extends Component {
  render() {
    const { about } = translations;

    return (
      <div className="about-text">
        <h3 className="about-text__header">{about.textHeader}</h3>
        <p className="about-text__paragraph">{about.textParagraph}</p>
      </div>
    );
  }
}