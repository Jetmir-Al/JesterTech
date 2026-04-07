import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AddReview = () => {

    const [rating, setRating] = useState<number>(0);


    return (
        <form className="productReview-form" id="productReview-form"
            style={{ display: 'flex' }}
            onSubmit={() => { }}>
            <div className="productReview-inputs">
                <h2 className="userTitle">
                    {"user.name"}
                </h2>

                <label htmlFor="comment">
                    Comment: <br />
                    <textarea name="comment" id="comment"
                        required cols={30} rows={5}
                        onChange={() => { }}
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
                                    starValue <= (rating) ? "star filled" : "star"
                                }
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => setRating(starValue)}
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
    );
}

export default AddReview;