import { useApp } from "./context/AppContext";

export default function ProductTile({ product, onOpen }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const handleOpen = () => onOpen && onOpen(product);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-tile" onClick={handleOpen}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-tile__img"
        />
      )}

      <button
        className={`product-tile__wishlist ${inWishlist ? "wishlist-icon--added" : ""}`}
        onClick={handleToggleWishlist}
        aria-label="Add to wishlist"
      >
        ♡
      </button>

      <div className="product-tile__overlay">
        <div className="product-tile__main">
          <span className="product-tile__name">{product.name}</span>
          <span className="product-tile__brand">{product.brand}</span>
          <span className="product-tile__price">{product.price} ₽</span>
        </div>
        <div className="product-tile__extra">
          <p className="product-tile__description">{product.description}</p>
          <button
            className="btn-primary product-tile__btn"
            onClick={handleAddToCart}
          >
            {inCart ? "In cart ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}