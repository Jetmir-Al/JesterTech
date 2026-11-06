import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Brand / About Column */}
                <div className="footer-info brand-col">
                    <h3 className="footer-brand">EcomTech</h3>
                    <p className="footer-desc">
                        Your ultimate destination for cutting-edge electronics, high-end smartphones,
                        gaming rigs, and smart home appliances in Kosovo.
                    </p>
                    <div className="footer-contact-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Prishtine, Kosova
                    </div>
                    <div className="footer-contact-item">
                        <FontAwesomeIcon icon={faPhone} /> +383 (44) 000-000
                    </div>
                    <div className="footer-contact-item">
                        <FontAwesomeIcon icon={faEnvelope} /> info@ecomTech-ks.com
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="footer-info">
                    <h5>Quick Links</h5>
                    <a href="/products">All Products</a>
                    <a href="/categories">Categories</a>
                    <a href="/deals">Special Deals</a>
                    <a href="/about">About Us</a>
                </div>

                {/* Customer Service Column */}
                <div className="footer-info">
                    <h5>Customer Service</h5>
                    <a href="/contact">Na kontaktoni</a>
                    <a href="/terms">Termat & Kushtet</a>
                    <a href="/faq">FAQ & Shipping</a>
                    <a href="/returns">Returns Policy</a>
                </div>

                {/* Socials / Follow Us Column */}
                <div className="footer-info">
                    <h5>Follow Us</h5>
                    <p className="footer-desc-small">Stay connected for the latest tech drops and deals.</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
                            <FontAwesomeIcon icon={faFacebook} className="icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
                            <FontAwesomeIcon icon={faInstagram} className="icon" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
                            <FontAwesomeIcon icon={faYoutube} className="icon" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
                        </a>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p className="footer-text">© {new Date().getFullYear()} EcomTech. All rights reserved.</p>
                <div className="payment-badges">
                    <span>Secure Checkout</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;