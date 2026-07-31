import { useNavigate } from "react-router";
import Featured from "../components/home/Featured";
import Services from "../components/home/Services";
import Brands from "../components/home/Brands";
import Button from "../components/ui/Button";
import "./pageStyles/home.css";
import { useQuery } from "@tanstack/react-query";
import { getImageUrl, GetTopProducts } from "../api/productApi";
import Loading from "../utils/Loading";

const Home = () => {

    const navigate = useNavigate();

    const { data: top, isLoading } = useQuery({
        queryKey: ["topProducts"],
        queryFn: async () => {
            return await GetTopProducts();
        }
    })

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            ✨ Powered by Next-Gen AI
                        </div>

                        <h1 className="hero-title">
                            Next-Gen Tech, <br />
                            <span className="hero-title-gradient">
                                Intelligently Compared.
                            </span>
                        </h1>

                        <p className="hero-description">
                            Explore premium devices and let our AI assistant analyze technical specs to find your exact match in seconds.
                        </p>

                        <div className="hero-buttons">
                            <Button className="btn-primary"
                                type="button"
                                onClick={() => navigate("/products")}
                            >
                                Shop Products
                            </Button>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-glow"></div>

                        <div className="product-stack">
                            {
                                isLoading ? <Loading /> : top?.map((product, index) => (
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.title}
                                        className={`product-img product-${index === 0 ? 'left' : index === 1 ? 'center' : 'right'}`}
                                    />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </section>

            <Services />
            <Featured />
            <Brands />
        </div>
    );
}

export default Home;   