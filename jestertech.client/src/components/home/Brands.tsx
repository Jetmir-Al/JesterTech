import { useQuery } from "@tanstack/react-query";
import "./brands.css";
import { GetProductBrands } from "../../api/productApi";
import Loading from "../../utils/Loading";
import Button from "../ui/Button";
import { useNavigate } from "react-router";

const Brands = () => {
    const navigate = useNavigate();
    const { data: brands, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: async () => {
            return await GetProductBrands();
        }
    })

    return (
        <div className="Brands-container">
            <h2>Brands</h2>
            <div className="Brands">
                {
                    isLoading ? <Loading /> :
                        brands?.map((b: string, index: number) => (
                            <div className="brand-item"
                                key={index}>
                                <Button
                                    type="button"
                                    className=""
                                    onClick={() => navigate(`/products?search=${b}`)}>
                                    <i>{b}</i>
                                </Button>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Brands;