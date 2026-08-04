import { useQuery } from "@tanstack/react-query";
import Card from "../ui/Card";
import "./featured.css";
import { GetFeaturedProducts } from "../../api/productApi";
import Loading from "../../utils/Loading";
import { useNavigate } from "react-router";

const Featured = () => {
    const { data: featured, isLoading } = useQuery({
        queryKey: ["featured"],
        queryFn: async () => {
            return await GetFeaturedProducts();
        }
    });
    const navigate = useNavigate();
    return (
        <div className="featured-container">
            <h2 className="featured-title">Featured Products</h2>
            <div className="swiperFeatured">
                {
                    isLoading ? <Loading />
                        : featured?.map((f, index: number) => (
                            <div
                                className={`item item${index}`}
                                key={f.id}
                                onClick={() => navigate(`/products/${f.id}`)}
                            >
                                <Card
                                    img={f.image}
                                    name={f.title}
                                    price={f.price}
                                    rating={f.averageRating}
                                    cartItem={{
                                        id: f.id,
                                        image: f.image,
                                        name: f.title,
                                        price: f.price,
                                        quantity: f.quantity
                                    }}
                                />

                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Featured;