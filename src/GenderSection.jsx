import { Component } from "react";
import GenderCard from "./GenderCard";
import { translations } from "./translations";

export default class GenderSection extends Component {
  render() {
    const { genders } = translations;

    const items = [
      { label: genders.women, src: "/photos/woman.png", url: "/products?gender=women" },
      { label: genders.men,   src: "/photos/man.png",   url: "/products?gender=men" },
      { label: genders.kids,  src: "/photos/baby.png",  url: "/products?gender=kids" },
    ];

    return (
      <section className="genders">
        {items.map((item, index) => (
          <GenderCard
            key={index}
            label={item.label}
            imageSrc={item.src}
            navigateUrl={item.url}
          />
        ))}
      </section>
    );
  }
}