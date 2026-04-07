import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import "./pageStyles/products.css";


const Products = () => {
    const [toggleSortFilter, setToggleSortFilter] = useState(false);

    return (
        <main className="products-container">
            <div className="productSearch-container">
            <form className="productSearch-form" onSubmit={() => { } }>
                <FontAwesomeIcon
                    className="search__icon"
                    icon={faMagnifyingGlass} />
                <input type="text" placeholder="What are you looking?"
                    className="search-input" name="search"
                    onChange={() => { } }
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
                        onSubmit={() => { } }
                    >
                        <h4>Sort by: </h4>
                        <div className="sortForm-inputs">
                            <label htmlFor="name">Name
                                <input type="radio" name="sort" id="name"
                                    value="name"
                                    onChange={() => { } } />
                            </label>
                            <label htmlFor="price">Price
                                <input type="radio" name="sort" id="price"
                                    value="price"
                                    onChange={() => { } } />
                            </label>
                            <label htmlFor="new">New
                                <input type="radio" name="sort" id="new"
                                    value="new"
                                    onChange={() => { } } />
                            </label>
                            <label htmlFor="old">Old
                                <input type="radio" name="sort" id="old"
                                    value="old"
                                    onChange={() => { } } />
                            </label>
                        </div>

                        <h4>Filter by:</h4>
                        <div className="filterForm">
                           
                               <label>
                                    <input type="checkbox" name="ss" id={"s"}
                                    value="yes"
                                    onChange={() => { } }
                                        /> category
                               </label>
                               
                        </div>

                        <div className="sortFilter-btns">
                            <button type="submit">Submit</button>
                                <button id="closeSortFilter" type="button"
                                    onClick={() => setToggleSortFilter(t => !t)}
                            >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            <div className="productsDisplay-container">

               

                <Link to={`/products/1`}
                                    className='productCard'
                >
                    <Card
                        img="./src/assets/s26.png"
                        name="Samsung Galaxy S26"
                        price={999.99}
                        rating={5}
                    />
                                </Link>
            </div>
            <div className="pageNumbers-container">
                {
                    Array.from({ length: 2 }, (_, index) => (
                        <Button
                            key={index}
                            type="button"
                            className={`pageLink`}
                            onClick={() => { } }
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