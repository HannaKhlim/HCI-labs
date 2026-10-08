export default function ProductTile({ name, brand, price }) {
  return (
    <div className="product-tile">
      <div className="product-tile__overlay">
        <div className="product-tile__main">
          <span className="product-tile__name">{name}</span>
          <span className="product-tile__brand">{brand}</span>
          <span className="product-tile__price">{price} ₽</span>
        </div>
      </div>
    </div>
  );
}