export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-column">
          <h4 className="footer-column__title">Information</h4>
          <ul className="footer-column-list">
            <li className="footer-column-list__item">About Us</li>
            <li className="footer-column-list__item">Stores</li>
            <li className="footer-column-list__item">Careers</li>
            <li className="footer-column-list__item">News</li>
            <li className="footer-column-list__item">Brands</li>
            <li className="footer-column-list__item">Sitemap</li>
            <li className="footer-column-list__item">Partners</li>
            <li className="footer-column-list__item">Contacts</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-column__title">Support</h4>
          <ul className="footer-column-list">
            <li className="footer-column-list__item">Delivery &amp; Payment</li>
            <li className="footer-column-list__item">Returns &amp; Exchange</li>
            <li className="footer-column-list__item">Warranty</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-column__title">Service</h4>
          <ul className="footer-column-list">
            <li className="footer-column-list__item">Loyalty Program</li>
            <li className="footer-column-list__item">Gift Cards</li>
            <li className="footer-column-list__item">Try Before You Buy</li>
            <li className="footer-column-list__item">Personal Stylist</li>
            <li className="footer-column-list__item">Online Consultations</li>
            <li className="footer-column-list__item">Feedback</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-column__title">DEEPMAG</h4>
          <ul className="footer-column-list">
            <li className="footer-column-list__item">About the Brand</li>
            <li className="footer-column-list__item">Philosophy</li>
            <li className="footer-column-list__item">Collections</li>
            <li className="footer-column-list__item">Press</li>
            <li className="footer-column-list__item">Social Responsibility</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom__item">© 2026 DEEPMAG. All rights reserved.</span>
        <span className="footer-bottom__item">Privacy Policy</span>
      </div>
    </footer>
  );
}