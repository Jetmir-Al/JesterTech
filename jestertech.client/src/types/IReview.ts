

export interface IReview {
    id: number;
    user: {
        name: string;
    }
    rating: number;
    comment: string;
}