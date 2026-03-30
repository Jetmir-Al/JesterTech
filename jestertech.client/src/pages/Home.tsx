import Featured from "../components/home/Featured";
import Services from "../components/home/Services";
import Button from "../components/ui/Button";
import "./pageStyles/home.css";

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to JesterTech</h1>
                    <p>
                        Your one-stop solution for all your tech needs.
                    </p>
                    <Button
                        className="hero-btn"
                        type="button"
                        onClick={() => { } }>
                        Shop Now
                    </Button>
                </div>
                <div className="hero-imgs">
                    <div className="img-container">
                        <img src="./src/assets/s26.png" alt="samsung galaxy S26" className="hero-image" />
                    </div>
                    <div className="img-container">
                        <img src="./src/assets/oneplus 15.png" alt="oneplus 15" className="hero-image main-img" />
                    </div>
                    <div className="img-container">
                        <img src="./src/assets/iphone 17.png" alt="iphone 17" className="hero-image" />
                    </div>
                </div>
            </div>

            <Services />
            <Featured />
        </div>
    );
}

export default Home;   