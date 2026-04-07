import AddReview from "../forms/AddReview";
import Button from "../ui/Button";
import "./productDetails.css";
import { useState } from "react";



const ProductDetails = () => {
    const [reviewForm, setReviewForm] = useState<boolean>(false);

    return (
        <div className="productDetails-container">

            {
                <>
                        <div className="productDetails">

                            <div className='productPresentation'>
                                <img className='productImg'
                                    src="/src/assets/s26.png"
                                    alt="sd" />
                                <h2 className='productTitle'>
                                    {""}
                                </h2>
                            </div>

                            <div className='productInfo'>
                                <h4><span>Author:</span> <span>{""}</span></h4>
                                <h4><span>Category:</span> <span>{""}</span></h4>
                                <h4><span>Year:</span> <span>{""}</span></h4>
                                <h4><span>Price:</span> <span>{""}$</span></h4>
                                <h4><span>Quantity:</span> <span>{""}</span></h4>


                                
                                    <div className='productBtns'>

                                            <Button type='button'
                                                className='buy'
                                            onClick={() => {
                                               
                                            }}
                                            >
                                                Buy
                                            </Button>
                                           
                                    </div>
                                    {/*: <h4><span>Unable to buy or borrow this book</span></h4>*/}
                                
                            </div>
                            
                        </div >


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

                    </>
            }
        </div>
    );

}

export default ProductDetails;