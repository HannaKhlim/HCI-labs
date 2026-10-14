import { Link } from "react-router-dom";

export default function GenderCard({ label, imageSrc, navigateUrl }) {
  return (
    <Link
      to={navigateUrl}
      className="genders__item"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <span className="genders__label">{label}</span>
      <img src={imageSrc} alt={label} className="genders__img" />
    </Link>
  );
}