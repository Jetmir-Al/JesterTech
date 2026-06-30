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
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to JesterTech</h1>
                    <p>
                        Your one-stop solution for all your tech needs.
                    </p>
                    <Button
                        className="hero-btn"
                        type="button"
                        onClick={() => navigate('/products') }>
                        Shop Now
                    </Button>
                </div>
                <div className="hero-imgs">
                    {
                        isLoading ? <Loading /> :
                            top?.map((t) => (
                                <div className="img-container" key={t.id}>
                                    <img
                                        src={getImageUrl(t.image)}
                                        alt={t.title}
                                        className="hero-image" />
                                </div>

                            ))
                    }
                </div>
            </div>

            <Services />
            <Featured />
            <Brands />
        </div>
    );
}

export default Home;   