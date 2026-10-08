import { Link } from "react-router-dom";
import { useApp } from "./context/AppContext";

export default function Header({ organization }) {
  const { cartCount, wishlist } = useApp();

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top__item">
          <img src="/icons/email.svg" alt="Email" className="header-top__icon" />
          <span>support@deepmag.ru</span>
        </div>
        <div className="header-top__item">
          <img src="/icons/phone.svg" alt="Phone" className="header-top__icon" />
          <span>+7 (919)-123-45-56</span>
        </div>
        <div className="header-top__item">
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className="header-top__icon" />
          <span>WhatsApp</span>
        </div>
        <div className="header-top__item">
          <img src="/icons/sparkles.svg" alt="Change Theme" className="header-top__icon" />
          <span>Change Theme</span>
        </div>
        <div className="header-top__item">
          <img src="/icons/vision.png" alt="Vision Support" className="header-top__icon" />
          <span>Accessibility</span>
        </div>
        <div className="header-top__item">
          <img src="/icons/translation.png" alt="Change Language" className="header-top__icon" />
          <span>Change Language</span>
        </div>
        <div className="header-top__item">
          <img src="/icons/mask.svg" alt="Delivery" className="header-top__icon" />
          <span>Contactless Delivery</span>
        </div>
      </div>

      <div className="header-bottom-mobile">
        <div className="header-bottom__item header-bottom-mobile__menu">
          <img src="/icons/menu.svg" alt="menu" className="header-bottom-mobile__icon" />
        </div>
        <div className="header-bottom__item logo-wrapper">
          <Link to="/">
            <img src="/logos/logo.png" alt={organization} className="header-bottom__logo" />
          </Link>
        </div>
        <div className="header-bottom__item header-search__wrapper">
          <input type="text" className="header-search" placeholder="Search" />
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-bottom__item">
          <Link to="/">
            <img src="/logos/logo.png" alt={organization} className="header-bottom__logo" />
          </Link>
        </div>
        <div className="header-bottom__item header-search__wrapper">
          <input type="text" className="header-search" placeholder="Search" />
        </div>
        <div className="header-bottom__item header-profile">
          <Link to="/profile" className="header-profile__item">
            <img src="/icons/login.svg" alt="Login" className="header-profile__icon" />
          </Link>
          <Link to="/profile" className="header-profile__item">
            <span className="header-profile__badge">♡ {wishlist.length}</span>
          </Link>
          <Link to="/profile" className="header-profile__item">
            <img src="/icons/cart.svg" alt="Cart" className="header-profile__icon" />
            {cartCount > 0 && <span className="header-profile__badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      <nav className="header-navigation">
        <div className="header-navigation__item">
          <Link to="/products?gender=women" className="header-navigation__option-label">WOMEN</Link>
          <Link to="/products?gender=men" className="header-navigation__option-label">MEN</Link>
          <Link to="/products?gender=kids" className="header-navigation__option-label">KIDS</Link>
        </div>
        <div className="header-navigation__item header-navigation__categories">
          <Link to="/products?category=clothes" className="header-navigation__option-label">Clothing</Link>
          <Link to="/products?category=shoes" className="header-navigation__option-label">Shoes</Link>
          <Link to="/products?category=accessories" className="header-navigation__option-label">Bags &amp; Accessories</Link>
          <Link to="/products?category=underwear" className="header-navigation__option-label">Underwear</Link>
        </div>
        <div className="header-navigation__item header-navigation__item--empty" />
      </nav>
    </header>
  );
}