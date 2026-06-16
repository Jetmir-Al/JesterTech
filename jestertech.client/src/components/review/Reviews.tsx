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
import type { IReview } from "../../types/IReview";
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
                      reviews?.length === 0 ?
                          <NoInfo noInfo="No reviews on this product!" /> :
                          reviews?.map((rev: IReview, index: number) => (
                              <div className='reviews' key={index}>
                                  <h2 className='reviews-user'>{rev.user.name}</h2>
                                  <p className='reviews-comment'>
                                      {rev.comment}
                                  </p>
                                  <div className=''>
                                      {Array.from({ length: rev.rating }).map((_, index) => (
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