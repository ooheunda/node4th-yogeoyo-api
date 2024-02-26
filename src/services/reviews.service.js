export class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  createReview = async (userId, storeId, orderId, rating, content, image) => {
    const createdReview = await this.reviewRepository.createReview(
      userId,
      storeId,
      orderId,
      rating,
      content,
      image
    );
    return {
      userId: createdReview.userId,
      storeId: createdReview.storeId,
      orderId: createdReview.orderId,
      rating: createdReview.rating,
      content: createdReview.content,
      image: createdReview.image,
    };
  };

  getReview = async () => {
    const reviews = await this.reviewRepository.getReview();
    return reviews.map((reviews) => {
      return {
        reviewId: reviews.reviewId,
        userId: reviews.userId,
        storeId: reviews.storeId,
        orderId: reviews.orderId,
        rating: reviews.rating,
        content: reviews.content,
        image: reviews.image,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
      };
    });
  };

  updateReview = async (reviewId, userId, rating, content) => {
    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) throw new Error("리뷰 조회에 실패하였습니다");
    if (review.userId != userId) {
      throw new Error("수정할 권한이 없습니다");
    }

    await this.reviewRepository.updateReview(reviewId, userId, rating, content);

    const updatedReview = await this.reviewRepository.getReview(reviewId);

    return {
      reviewId: updatedReview.reviewId,
      userId: updatedReview.userId,
      rating: updatedReview.rating,
      content: updatedReview.content,
    };
  };

  deleteReview = async (
    reviewId,
    storeId,
    orderId,
    userId,
    rating,
    content
  ) => {
    const review = await this.reviewRepository.getReview(reviewId);
    if (!review) throw new Error("리뷰 조회에 실패하였습니다");
    // if (review.userId != userId) throw new Error("삭제할 권한이 없습니다");
    await this.reviewRepository.deleteReview(
      reviewId,
      storeId,
      orderId,
      userId,
      rating,
      content
    );

    return {
      reviewId: review.reviewId,
      storeId: review.storeId,
      orderId: review.orderId,
      userId: review.userId,
      rating: review.rating,
      content: review.content,
    };
  };
}
