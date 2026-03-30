import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
import { faFacebook, faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-info">
                    <h5>About us</h5>
                    <p>info@jestertech-ks.com</p>
                </div>
                <div className="footer-info">
                    <h5>Help</h5>
                    <p>Termat & Kushtet</p>
                    <p>Na kontaktoni</p>
                </div>
                <div className="footer-info">
                    <h5>Follow Us</h5>
                    <p>
                    <FontAwesomeIcon icon={faFacebook} className="icon" />
                    <FontAwesomeIcon icon={faInstagram} className="icon" />
                    <FontAwesomeIcon icon={faYoutube} className="icon" />
                    <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
                    </p>
                </div>
            </div>
            <hr />
            <p className="footer-text">© {new Date().getFullYear()} JesterTech. All rights reserved.</p>
        </footer>
    );

}

export default Footer;