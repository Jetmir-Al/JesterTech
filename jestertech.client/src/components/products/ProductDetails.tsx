import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./productDetails.css";



const ProductDetails = () => {


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
                                
                                <>

                                        <Button className="addReview"
                                            type="button"
                                            onClick={() => { }}>
                                            ADD YOUR REVIEW
                                        </Button>

                                        <form className="productReview-form" id="productReview-form"
                                            style={{ display:'flex'  }}
                                            onSubmit={() => { } }>
                                        <div className="productReview-inputs">
                                            <h2 className="userTitle">
                                                {"user.name"}
                                            </h2>

                                            <label htmlFor="comment">
                                                Comment: <br />
                                            <textarea name="comment" id="comment"
                                                required cols={30} rows={5}
                                                        onChange={() => { } }
                                                ></textarea>
                                            </label>
                                            <div className="starRating">
                                                {[...Array(5)].map((_, index) => {
                                                    const starValue = index + 1;

                                                    return (
                                                        <FontAwesomeIcon
                                                            key={index}
                                                            icon={faStar}
                                                            className={
                                                                starValue ? "star filled" : "star"
                                                            }
                                                            onClick={() => { }}
                                                            onMouseEnter={() => { } }
                                                        />
                                                    );
                                                })}
                                            </div>

                                                <div className="productReviewBtns">
                                                    <Button
                                                        className=""
                                                        type="submit"
                                                        onClick={() => { }}
                                                    >
                                                        Submit
                                                    </Button>
                                                    <Button className="cancelReview"
                                                        type="button"
                                                        onClick={() => { }}>Cancel
                                                    </Button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            }
                        </div>

                    </>
            }
        </div>
    );

}

export default ProductDetails;