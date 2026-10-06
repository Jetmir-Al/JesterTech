

export interface IReview {
    id: number;
    user: {
        name: string;
    }
    rating: number;
    comment: string;
}



export interface IReviewPagination{
    totalCount: number;
    page: number;
    pageSize: number;
    reviews: IReview[];   
}