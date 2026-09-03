import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import "./pageStyles/products.css";
import Loading from "../utils/Loading";
import { useGetProductsAdvanced } from "../hooks/useQueries/useProductQueries";
import type { IProduct } from "../types/IProduct";
import { useNavigate, useSearchParams } from "react-router";
import SearchBar from "../components/products/SearchBar";
import SortFilter from "../components/products/SortFilter";
import AiDisplay from "../components/ai/AiDisplay";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const params = {
        page: searchParams.get("page") || undefined,
        pageSize: searchParams.get("pageSize") || undefined,
        search: searchParams.get("search") || undefined,
        sort: searchParams.get("sort") || undefined,
        categories: searchParams.getAll("categories"),
    };

    const { data: products, isLoading } = useGetProductsAdvanced({
        params: params
    });


    return (
        <main className="products-container">
            <div className="productSearch-container">
                <SearchBar />
                <SortFilter />

            </div>
            <div className="productsDisplay-wrapper">
                <div className="productsDisplay-container">
                    {
                        isLoading ?
                            <div className="loadingProducts"> 
                                <Loading />
                            </div>
                            :
                            products?.data.map((p: IProduct) => (
                                <div onClick={() => navigate(`/products/${p.id}`)}
                                    className='productCard'
                                    key={p.id}>
                                    <Card
                                        img={p.image}
                                        name={p.title}
                                        price={p.price}
                                        rating={p.averageRating}
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

                <AiDisplay mode="general" />
            </div>
            <div className="pageNumbers-container">
                <div className="pageNumbers">
                    <Button
                        type="button"
                        className="arrowBtn"
                        disabled={parseInt(params.page || "1") <= 1}
                        onClick={() => {
                            setSearchParams(prev => {
                                const params = new URLSearchParams(prev);
                                params.set("page", (parseInt(params.get("page") || "1") - 1).toString());
                                return params;
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </Button>
                    {
                        Array.from({ length: products?.totalPages || 1 }, (_, index) => (
                            <Button
                                key={index}
                                type="button"
                                className={`pageLink ${parseInt(params.page || "1") === index + 1 ? 'active' : ''}`}
                                onClick={() => {
                                    setSearchParams(prev => {
                                        const params = new URLSearchParams(prev);
                                        params.set("page", (index + 1).toString());
                                        return params;
                                    });
                                }}
                            >
                                {index + 1}
                            </Button>
                        ))
                    }
                    <Button
                        type="button"
                        className="arrowBtn"
                        disabled={parseInt(params.page || "1") >= (products?.totalPages || 1)}
                        onClick={() => {
                            setSearchParams(prev => {
                                const params = new URLSearchParams(prev);
                                params.set("page", (parseInt(params.get("page") || "1") + 1).toString());
                                return params;
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faCaretRight} />
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default Products;