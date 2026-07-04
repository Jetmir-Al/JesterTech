import { useQuery } from "@tanstack/react-query";
import AiDisplay from "../components/ai/AiDisplay";
import "./pageStyles/compare.css"
import { GetAllProducts } from "../api/productApi";
import Loading from "../utils/Loading";
import NoInfo from "../utils/NoInfo";


function Compare() {
    const { data: products, isLoading, isLoadingError } = useQuery({
        queryKey: ["allProducts"],
        queryFn: async () => {
            return await GetAllProducts();
        }
    })


    return (
        <div className="compare-container">
            <div className="compareForm-container">
                {
                    isLoading ? <Loading /> :
                        products?.length === 0 || isLoadingError ? <NoInfo noInfo="No products as of this moment!" />
                            : <div className="">
                                hello
                            </div>
                }
            </div>
            <AiDisplay mode="general" />
        </div>
    );
}

export default Compare;