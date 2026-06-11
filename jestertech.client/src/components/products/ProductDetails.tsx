import { useParams } from "react-router";
import { useGetProductById } from "../../hooks/useQueries/useProductQueries";
import Loading from "../../utils/Loading";
import AddReview from "../forms/AddReview";
import Button from "../ui/Button";
import "./productDetails.css";
import { useState } from "react";
import { getImageUrl } from "../../api/productApi";
import { useAuthHook } from "../../hooks/useAuthHook";



const ProductDetails = () => {
    const [reviewForm, setReviewForm] = useState<boolean>(false);
    const { id } = useParams();
    const { authenticated, user } = useAuthHook();
    const { data: product, isLoading } = useGetProductById(Number(id));
    
    if (isLoading) return <Loading />
    return (
        <div className="productDetails-container">

            {
                product &&
                <>
                        <div className="productDetails">

                            <div className='productPresentation'>
                            <img className='productImg'
                                src={getImageUrl(product.image)}
                                    alt="sd" />
                            <h2 className='productTitle'>
                                {product.brand}
                                </h2>
                            </div>

                            <div className='productInfo'>
                            <h4><span>Title:</span> <span>{product.title}</span></h4>
                            <h4><span>Category:</span> <span>{product.category}</span></h4>
                            <h4><span>Guarantee:</span> <span>{product.garantee} years</span></h4>
                            <h4><span>Price:</span> <span>{product.price}$</span></h4>


                                
                                    <div className='productBtns'>

                                            <Button type='button'
                                                className='buy'
                                            onClick={() => {
                                               
                                            }}
                                            >
                                                Buy
                                            </Button>
                                           
                                    </div>
                                    {/*: <h4><span>Unable to buy or borrow this 
                                        </span></h4>*/}
                                
                            </div>
                            
                        </div >

                    {
                        (authenticated && user) &&
                        <div className="productReviews-container">
                            <h2 className="review-title">Reviews</h2>
                            <div className="productReviews">

                                {
                                    //reviews === null ?
                                    //    <NoInfo /> :
                                    //    reviews.map((rev, index) => (
                                    //        <Reviews key={index}
                                    //            name={rev.name}
                                    //            comment={rev.comment}
                                    //            stars={rev.rating}
                                    //        />
                                    //    ))
                                }
                            </div>
                        {
                            reviewForm ? 
                                <AddReview />
                                        :
                                <Button
                                    className="addReview"
                                    type="button"
                                    onClick={() => setReviewForm(r => !r)}
                                >
                                    ADD YOUR REVIEW
                                </Button>

                            }
                        </div>

                    }
                    </>
            }
        </div>
    );

}

export default ProductDetails;