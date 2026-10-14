import { useState } from "react";
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

  // === Множественный выбор ===
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const removeSelected = () => {
    selectedIds.forEach((id) => removeFromCart(id));
    setSelectedIds([]);
  };

  const selectAll = () => {
    if (selectedIds.length === cart.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map((item) => item.id));
    }
  };

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
            <div className="profile-cart__toolbar">
              <label className="profile-cart__select-all">
                <input
                  type="checkbox"
                  checked={selectedIds.length === cart.length && cart.length > 0}
                  onChange={selectAll}
                />
                <span>Select all</span>
              </label>

              {selectedIds.length > 0 && (
                <button className="btn-secondary" onClick={removeSelected}>
                  Delete selected ({selectedIds.length})
                </button>
              )}
            </div>

            <ul className="profile-list">
              {cart.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <li
                    key={item.id}
                    className={`profile-list__item ${
                      isSelected ? "profile-list__item--selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(item.id)}
                    />

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
                );
              })}
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