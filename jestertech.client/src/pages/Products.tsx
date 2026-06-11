import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import "./pageStyles/products.css";
import Loading from "../utils/Loading";
import { useGetProductCategories, useGetProductsAdvanced } from "../hooks/useQueries/useProductQueries";
import type { IProduct } from "../types/IProduct";
import { useSearchParams } from "react-router";


const Products = () => {
    const [toggleSortFilter, setToggleSortFilter] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "";
    const categories = searchParams.getAll("categories");

    const { data: products, isLoading } = useGetProductsAdvanced({
        params: {
            page: String(page),
            pageSize: "20",
            search,
            categories: categories.join(","),
            sort
        }
    });
    const { data: Categories } = useGetProductCategories();

    const handleSortFilter = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const sortValue = formData.get("sort");

        const selectedCategories = formData.getAll("categories") || [];
        const newParams = new URLSearchParams();
        newParams.set("page", "1");
        if (search) newParams.set("search", search);
        if (sortValue) newParams.set("sort", sortValue.toString());
        selectedCategories.forEach(c => newParams.append("categories", c.toString()));
        setSearchParams(newParams);
        setToggleSortFilter(false);
    };

    return (
        <main className="products-container">
            <div className="productSearch-container">
                <form className="productSearch-form" onSubmit={() => { } }>
                    <FontAwesomeIcon
                        className="search__icon"
                        icon={faMagnifyingGlass} />
                    <input type="text" placeholder="What are you looking?"
                        className="search-input" name="search"
                        defaultValue={search}
                        onChange={() => { }}
                    />
                </form>

                <div className="sortFilter-Container">
                    <Button className="sortFilter-btn"
                        onClick={() => setToggleSortFilter(s => !s)}>
                        <FontAwesomeIcon className="sortFilter-icon"
                            icon={faEllipsisVertical} />
                    </Button>
                    <div className="sortFilter"
                        id="sortFilter-field"
                        style={{ display: toggleSortFilter ? 'flex' : 'none' }}
                    >
                        <form
                            className="sortForm"
                            onSubmit={handleSortFilter}
                        >
                            <h4>Sort by: </h4>
                            <div className="sortForm-inputs">
                                <label htmlFor="name">Name
                                    <input type="radio" name="sort" id="name"
                                        value="name" />
                                </label>
                                <label htmlFor="price">Price
                                    <input type="radio" name="sort" id="price"
                                        value="price" />
                                </label>
                                <label htmlFor="new">New
                                    <input type="radio" name="sort" id="new"
                                        value="new" />
                                </label>
                                <label htmlFor="old">Old
                                    <input type="radio" name="sort" id="old"
                                        value="old" />
                                </label>
                            </div>

                            <h4>Filter by:</h4>
                            <div className="filterForm">
                                {
                                    Categories &&
                                    Categories.map((c: string, index: number) => (
                                        <label key={index}>
                                            <input type="checkbox" name="categories" id={c}
                                                value={c}
                                                defaultChecked={categories.includes(c)}
                                            /> {c}
                                        </label>
                                    ))
                                }

                            </div>

                            <div className="sortFilter-btns">
                                <Button type="submit"
                                    className="">
                                    Submit
                                </Button>
                                <Button
                                    className="closeSortFilter"
                                    type="button"
                                    onClick={() => setToggleSortFilter(t => !t)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="productsDisplay-container">
                {
                    isLoading ? <Loading /> :
                        products?.data.map((p: IProduct) => (

                            <Link to={`/products/${p.id}`}
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
                            </Link>
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