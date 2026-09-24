import { Component } from "react";

export default class Header extends Component {
  render() {
    const { organization } = this.props;

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
            <img src="/logos/logo.png" alt={organization} className="header-bottom__logo" />
          </div>
          <div className="header-bottom__item header-search__wrapper">
            <input type="text" className="header-search" placeholder="Search" />
          </div>
        </div>

        <div className="mobile-menu-overlay">
          <div className="mobile-menu-overlay__top">
            <img src="/icons/close.svg" alt="Close Menu" className="mobile-menu-overlay__close" />
            <div className="mobile-menu-overlay__profile">
              <div className="header-profile__item">
                <img src="/icons/login.svg" alt="Login" className="header-profile__icon" />
              </div>
              <div className="header-profile__item">
                <img src="/icons/trash.svg" alt="Clear Storage" className="header-profile__icon" />
              </div>
              <div className="header-profile__item">
                <img src="/icons/cart.svg" alt="Cart" className="header-profile__icon" />
              </div>
            </div>
          </div>
          <nav className="mobile-menu-overlay__nav">
            <form className="header-navigation__item mobile-menu-overlay__genders">
              <input className="header-navigation__option" type="radio" id="overlay-women" name="overlay-gender" value="women" />
              <label htmlFor="overlay-women" className="header-navigation__option-label">WOMEN</label>
              <input className="header-navigation__option" type="radio" id="overlay-men" name="overlay-gender" value="men" />
              <label htmlFor="overlay-men" className="header-navigation__option-label">MEN</label>
              <input className="header-navigation__option" type="radio" id="overlay-kids" name="overlay-gender" value="kids" />
              <label htmlFor="overlay-kids" className="header-navigation__option-label">KIDS</label>
            </form>
            <form className="header-navigation__item mobile-menu-overlay__categories">
              <input className="header-navigation__option" type="radio" id="overlay-clothes" name="overlay-category" value="clothes" />
              <label htmlFor="overlay-clothes" className="header-navigation__option-label">Clothing</label>
              <input className="header-navigation__option" type="radio" id="overlay-shoes" name="overlay-category" value="shoes" />
              <label htmlFor="overlay-shoes" className="header-navigation__option-label">Shoes</label>
              <input className="header-navigation__option" type="radio" id="overlay-accessories" name="overlay-category" value="accessories" />
              <label htmlFor="overlay-accessories" className="header-navigation__option-label">Bags &amp; Accessories</label>
              <input className="header-navigation__option" type="radio" id="overlay-underwear" name="overlay-category" value="underwear" />
              <label htmlFor="overlay-underwear" className="header-navigation__option-label">Underwear</label>
            </form>
          </nav>
          <div className="mobile-menu-overlay__logo">
            <img src="/logos/logo.png" alt={organization} className="header-bottom__logo" />
          </div>
        </div>

        <div className="header-bottom">
          <div className="header-bottom__item">
            <img src="/logos/logo.png" alt={organization} className="header-bottom__logo" />
          </div>
          <div className="header-bottom__item header-search__wrapper">
            <input type="text" className="header-search" placeholder="Search" />
          </div>
          <div className="header-bottom__item header-profile">
            <div className="header-profile__item">
              <img src="/icons/login.svg" alt="Login" className="header-profile__icon" />
            </div>
            <div className="header-profile__item">
              <img src="/icons/trash.svg" alt="Clear Storage" className="header-profile__icon" />
            </div>
            <div className="header-profile__item">
              <img src="/icons/cart.svg" alt="Cart" className="header-profile__icon" />
            </div>
          </div>
        </div>

        <nav className="header-navigation">
          <form className="header-navigation__item">
            <input className="header-navigation__option" type="radio" id="women" name="gender" value="women" />
            <label htmlFor="women" className="header-navigation__option-label">WOMEN</label>
            <input className="header-navigation__option" type="radio" id="men" name="gender" value="men" />
            <label htmlFor="men" className="header-navigation__option-label">MEN</label>
            <input className="header-navigation__option" type="radio" id="kids" name="gender" value="kids" />
            <label htmlFor="kids" className="header-navigation__option-label">KIDS</label>
          </form>
          <form className="header-navigation__item header-navigation__categories">
            <input className="header-navigation__option" type="radio" id="clothes" name="category" value="clothes" />
            <label htmlFor="clothes" className="header-navigation__option-label">Clothing</label>
            <input className="header-navigation__option" type="radio" id="shoes" name="category" value="shoes" />
            <label htmlFor="shoes" className="header-navigation__option-label">Shoes</label>
            <input className="header-navigation__option" type="radio" id="accessories" name="category" value="accessories" />
            <label htmlFor="accessories" className="header-navigation__option-label">Bags &amp; Accessories</label>
            <input className="header-navigation__option" type="radio" id="underwear" name="category" value="underwear" />
            <label htmlFor="underwear" className="header-navigation__option-label">Underwear</label>
          </form>
          <div className="header-navigation__item header-navigation__item--empty" />
        </nav>
      </header>
    );
  }
}