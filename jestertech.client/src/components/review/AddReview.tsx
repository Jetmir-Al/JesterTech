import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuthHook } from "../../hooks/useAuthHook";
import { useCreateReview } from "../../hooks/useQueries/useReviewQueries";
import { useParams } from "react-router";
import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";

const AddReview = ({ setReview }: { setReview: () => void }) => {

    const { user } = useAuthHook();
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const { id } = useParams();
    const { mutateAsync: createReview } = useCreateReview();

    const handleReviewSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(rating, comment, Number(id));
        try {
            setType("info");
            setMessage("Processing your review...!");
            setShowAlert(true);
            await createReview({ rating, comment, productId: Number(id) });
            setType("success");
            setMessage("Your review has been submited!");
            setShowAlert(true);

        } catch {
            setType("error");
            setMessage("Problem submiting review. Try again later!");
            setShowAlert(true);
        }
    }



    return (
        <form className="productReview-form" id="productReview-form"
            onSubmit={handleReviewSubmit}>
            <div className="productReview-inputs">
                <h2 className="userTitle">
                    {user?.name}
                </h2>

                <label htmlFor="comment">
                    Comment: <br />
                    <textarea name="comment" id="comment"
                        required cols={30} rows={5}
                        onChange={(e) => setComment(e.target.value)}
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
                        onClick={() => setReview()}>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AddReview;