import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faLock, faHeadset } from "@fortawesome/free-solid-svg-icons";
import "./services.css";

function Services() {
    return (
        <div className="service-container">
                <div className="service">
                    <FontAwesomeIcon className="serviceIcon" icon={faTruck} />
                    <h3 className="">Free Shipping</h3>
                    <p className="">Order more than 100$</p>

            </div>
            <div className="service">
                    <FontAwesomeIcon icon={faLock}
                        className="serviceIcon" />
                    <h3 className="">Secure Payment</h3>
                    <p className="">100% Secure Payment</p>

            </div>
            <div className="service">
                    <FontAwesomeIcon icon={faHeadset}
                        className="serviceIcon" />
                    <h3 className="">24/7 Support</h3>
                    <p className="">Call us anytime</p>

            </div>
        </div>
    );
}

export default Services;