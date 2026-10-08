import { Link } from "react-router-dom";
import { useApp } from "./context/AppContext";

export default function ProfilePage() {
  const {
    cart,
    wishlist,
    removeFromCart,
    changeQty,
    clearCart,
    toggleWishlist,
    cartTotal,
  } = useApp();

  return (
    <section className="profile-page">
      {/* ИЗБРАННОЕ */}
      <div className="profile-page__wishlist">
        <h2>Wishlist ({wishlist.length})</h2>

        {wishlist.length === 0 ? (
          <p className="profile-empty">Your wishlist is empty.</p>
        ) : (
          <ul className="profile-list">
            {wishlist.map((item) => (
              <li key={item.id} className="profile-list__item">
                <span className="profile-list__name">{item.name}</span>
                <span className="profile-list__brand">{item.brand}</span>
                <span className="profile-list__price">{item.price} ₽</span>
                <button
                  className="btn-secondary"
                  onClick={() => toggleWishlist(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* КОРЗИНА */}
      <div className="profile-page__cart">
        <h2>Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <p className="profile-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="profile-list">
              {cart.map((item) => (
                <li key={item.id} className="profile-list__item">
                  <span className="profile-list__name">{item.name}</span>
                  <span className="profile-list__brand">{item.brand}</span>
                  <span className="profile-list__price">{item.price} ₽</span>

                  <div className="profile-list__qty">
                    <button
                      className="btn-outline"
                      onClick={() => changeQty(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="profile-list__qty-value">{item.qty}</span>
                    <button
                      className="btn-outline"
                      onClick={() => changeQty(item.id, +1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="profile-cart__total">
              <strong>Total: {cartTotal} ₽</strong>
              <button className="btn-primary" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>

      <Link to="/products" className="btn-primary">
        Continue shopping
      </Link>
    </section>
  );
}