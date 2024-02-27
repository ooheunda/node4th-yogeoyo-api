import { UnauthorizedError, NotFoundError } from "../utils/common.error.js";
export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (
    userId,
    storeId,
    orderId,
    rating,
    content,
    image,
    createdAt,
    updatedAt
  ) => {
    const createdReview = await this.reviewRepository.createReview(
      userId,
      storeId,
      orderId,
      rating,
      content,
      image,
      createdAt,
      updatedAt
    );
    return {
      userId: createdReview.userId,
      storeId: createdReview.storeId,
      orderId: createdReview.orderId,
      rating: createdReview.rating,
      content: createdReview.content,
      image: createdReview.image,
      createdAt: createdReview.createdAt,
      updatedAt: createdReview.updatedAt,
    };
  };

  getReview = async (storeId) => {
    const reviews = await this.reviewRepository.getReview(storeId);
    // return reviews.map((reviews) => ({
    //   reviewId: reviews.reviewId,
    //   userId: reviews.userId,
    //   storeId: reviews.storeId,
    //   orderId: reviews.orderId,
    //   rating: reviews.rating,
    //   content: reviews.content,
    //   image: reviews.image,
    //   createdAt: reviews.createdAt,
    //   updatedAt: reviews.updatedAt,
    // }));
    return reviews;
  };

  updateReview = async (reviewId, storeId, userId, rating, content, image) => {
    const review = await this.reviewRepository.getReviewId(reviewId);
    if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다");
    if (review.userId !== userId) {
      throw new UnauthorizedError("수정할 권한이 없습니다");
    }

    await this.reviewRepository.updateReview(
      reviewId,
      storeId,
      userId,
      rating,
      content,
      image
    );

    const updatedReview = await this.reviewRepository.getReview(reviewId);

    return {
      reviewId: updatedReview.reviewId,
      storeId: updatedReview.storeId,
      userId: updatedReview.userId,
      rating: updatedReview.rating,
      content: updatedReview.content,
      image: updatedReview.image,
    };
  };

  deleteReview = async (reviewId, userId) => {
    const review = await this.reviewRepository.getReviewId(reviewId);
    if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다");
    if (review.userId != userId)
      throw new UnauthorizedError("삭제할 권한이 없습니다");
    await this.reviewRepository.deleteReview(reviewId, userId);

    return {
      reviewId: review.reviewId,
      userId: review.userId,
    };
  };
}
