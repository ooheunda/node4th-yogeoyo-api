import { ValidationError } from "../utils/common.error.js";
export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }
  createReview = async (req, res, next) => {
    try {
      const { content, rating } = req.body;
      const { userId } = req.user;
      const { storeId, orderId } = req.params;
      if (!content || !rating || !userId || !storeId || !orderId)
        throw new ValidationError("InvalidParamsError");
      const createdReview = await this.reviewService.createReview(
        userId,
        storeId,
        orderId,
        rating,
        content
      );
      return res.status(201).json({ data: createdReview });
    } catch (err) {
      next(err);
    }
  };

  getReview = async (req, res, next) => {
    try {
      const reviews = await this.reviewService.getReview();
      return res.status(200).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };

  updateReview = async (req, res, next) => {
    try {
      const { content, rating } = req.body;
      const { userId } = req.user;
      const { reviewId, storeId, orderId } = req.params;
      const updatedReview = await this.reviewService.updateReview(
        reviewId,
        userId,
        storeId,
        orderId,
        rating,
        content
      );

      return res.status(200).json({ data: updatedReview });
    } catch (err) {
      next(err);
    }
  };

  deleteReview = async (req, res, next) => {
    try {
      const { reviewId, storeId, orderId, rating, content } = req.params;
      const { userId } = req.user;
      const deletedReview = await this.reviewService.deleteReview(
        reviewId,
        storeId,
        orderId,
        userId,
        rating,
        content
      );
      return res.status(200).json({ data: deletedReview });
    } catch (err) {
      next(err);
    }
  };
}
