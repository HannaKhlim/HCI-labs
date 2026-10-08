export default function GenderCard({ label, imageSrc, navigateUrl }) {
  const handleClick = () => {
    window.location.href = navigateUrl;
  };

  return (
    <div
      className="genders__item"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <span className="genders__label">{label}</span>
      <img src={imageSrc} alt={label} className="genders__img" />
    </div>
  );
}