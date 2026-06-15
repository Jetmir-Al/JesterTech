import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import "./pageStyles/products.css";
import Loading from "../utils/Loading";
import { useGetProductsAdvanced } from "../hooks/useQueries/useProductQueries";
import type { IProduct } from "../types/IProduct";
import { useNavigate, useSearchParams } from "react-router";
import SearchBar from "../components/products/SearchBar";
import SortFilter from "../components/products/SortFilter";


const Products = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { data: products, isLoading } = useGetProductsAdvanced({
        params: Object.fromEntries(searchParams)
    });


    return (
        <main className="products-container">
            <div className="productSearch-container">
                <SearchBar />
                <SortFilter />
               
            </div>
            <div className="productsDisplay-container">
                {
                    isLoading ? <Loading /> :
                        products?.data.map((p: IProduct) => (
                            <div onClick={() => navigate(`/products/${p.id}`)}
                                className='productCard'
                                key={p.id}>
                                <Card
                                    img={p.image}
                                    name={p.title}
                                    price={p.price}
                                    rating={5}
                                    cartItem={{
                                        name: p.title,
                                        price: p.price,
                                        image: p.image,
                                        quantity: p.quantity,
                                        id: p.id,
                                    }}
                                />
                            </div>
                        ))
                }
            </div>
            <div className="pageNumbers-container">
                {
                    Array.from({ length: products?.totalPages || 1 }, (_, index) => (
                        <Button
                            key={index}
                            type="button"
                            className={`pageLink`}
                            onClick={() => { }}
                        >
                            {index + 1}
                        </Button>
                    ))
                }
            </div>
        </main>
    );
}

export default Products;