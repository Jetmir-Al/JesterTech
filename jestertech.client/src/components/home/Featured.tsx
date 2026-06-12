import { useQuery } from "@tanstack/react-query";
import Card from "../ui/Card";
import "./featured.css";
import { GetFeaturedProducts } from "../../api/productApi";
import Loading from "../../utils/Loading";

const Featured = () => {
    const { data: featured, isLoading } = useQuery({
        queryKey: ["featured"],
        queryFn: async () => {
            return await GetFeaturedProducts();
        }
    })
    return (
        <div className="featured-container">
            <h2 className="featured-title">Featured Products</h2>
            <div className="featured-products">
                {
                    isLoading ? <Loading />
                        : featured?.map((f) => (
                            <Card
                                key={f.id}
                                img={f.image}
                                name={f.title}
                                price={f.price}
                                rating={5}
                                cartItem={{
                                    id: f.id,
                                    image: f.image,
                                    name: f.title,
                                    price: f.price,
                                    quantity: f.quantity
                                } }
                            />
                        ))
                }
            </div>
        </div>
    );
}

export default Featured;