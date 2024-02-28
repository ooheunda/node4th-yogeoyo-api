import { UnauthorizedError, NotFoundError } from "../utils/common.error.js";
export class ReviewService {
  constructor(reviewRepository, orderRepository, storeRepository) {
    this.reviewRepository = reviewRepository;
    this.storeRepository = storeRepository;
    this.orderRepository = orderRepository;
  }

  createReview = async (userId, orderId, rating, content, image) => {
    const order = await this.orderRepository.findOrdersById(orderId);

    const createdReview = await this.reviewRepository.createReview(
      userId,
      order.storeId,
      orderId,
      rating,
      content,
      image
    );
    return createdReview;
  };

  getReview = async (storeId) => {
    const store = await this.storeRepository.findOneStore(storeId);
    if (!store) throw new NotFoundError("가게가 존재하지 않습니다");
    const reviews = await this.reviewRepository.getReview(storeId);
    return reviews;
  };

  updateReview = async (reviewId, userId, rating, content, image) => {
    const review = await this.reviewRepository.getReviewId(reviewId);
    if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다");
    if (review.userId !== userId) {
      throw new UnauthorizedError("수정할 권한이 없습니다");
    }
    await this.reviewRepository.updateReview(reviewId, rating, content, image);

    const updatedReview = await this.reviewRepository.getReview(reviewId);

    return updatedReview;
  };

  deleteReview = async (reviewId, userId) => {
    const review = await this.reviewRepository.getReviewId(reviewId);
    if (!review) throw new NotFoundError("리뷰를 찾을 수 없습니다");
    if (review.userId != userId)
      throw new UnauthorizedError("삭제할 권한이 없습니다");
    const deleteReview = await this.reviewRepository.deleteReview(
      reviewId,
      userId
    );

    return deleteReview;
  };
}
