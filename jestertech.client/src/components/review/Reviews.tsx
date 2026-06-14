import { useState } from "react";
import Button from "../ui/Button";
import AddReview from "./AddReview";
import NoInfo from "../../utils/NoInfo";
import { useGetReviews } from "../../hooks/useQueries/useReviewQueries";
import { useParams } from "react-router";
import Loading from "../../utils/Loading";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./review.css";
import { useAuthHook } from "../../hooks/useAuthHook";
function Reviews() {
    const [reviewForm, setReviewForm] = useState<boolean>(false);
    const { id } = useParams();
    const { data: reviews, isLoading } = useGetReviews(Number(id));
    const { user, authenticated } = useAuthHook();
  return (
      <div className="productReviews-container">
          <h2 className="review-title">Reviews</h2>
          <div className="productReviews">

              {
                  isLoading ? <Loading /> :
                      reviews?.length === 0 || reviews === undefined ?
                      <NoInfo noInfo="No reviews on this product!" /> :
                          reviews?.map((rev) => (
                              <div className='' key={rev.Id}>
                                  <h2 className=''>{rev.Name}</h2>
                                  <p className=''>
                                      {rev.Comment}
                                  </p>
                                  <div className=''>
                                      {Array.from({ length: rev.Rating }).map((_, index) => (
                                          <FontAwesomeIcon key={index} icon={faStar} className="starIcons" />
                                      ))}
                                  </div>
                              </div>
                     ))
              }
          </div>
          {
              (user && authenticated) && (
                  reviewForm ?
                      <AddReview setReview={() => setReviewForm(r => !r)} />
                      :
                      <Button
                          className="addReview"
                          type="button"
                          onClick={() => setReviewForm(r => !r)}
                      >
                          ADD YOUR REVIEW
                      </Button>
              )
          }
      </div>  );
}

export default Reviews;