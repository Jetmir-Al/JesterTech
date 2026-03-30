import Card from "../ui/Card";
import "./featured.css";

const Featured = () => {
    return (
        <div className="featured-container">
            <h2 className="featured-title">Featured Products</h2>
            <div className="featured-products">
                <Card
                    img="./src/assets/s26.png"
                    name="Samsung Galaxy S26"
                    price={999.99}
                    rating={5}
                />
                <Card
                    img="./src/assets/iphone 17.png"
                    name="Iphone 17 Pro Max"
                    price={999.99}
                    rating={4}
                />
                <Card
                    img="./src/assets/oneplus 15.png"
                    name="One Plus 15"
                    price={999.99}
                    rating={4}
                />
            </div>
        </div>
    );
}

export default Featured;