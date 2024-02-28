import { ValidationError } from "../utils/common.error.js";
export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }
  createReview = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { userId } = req.user;
      const { content, rating } = req.body;

      if (!content || !rating)
        throw new ValidationError("content와 rating의 값을 입력해주세요");

      let image = req.file ? req.file.location : undefined;
      const createdReview = await this.reviewService.createReview(
        userId,
        orderId,
        rating,
        content,
        image
      );
      return res.status(201).json({ data: createdReview });
    } catch (err) {
      next(err);
    }
  };

  getReview = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const reviews = await this.reviewService.getReview(storeId);
      return res.status(200).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };

  updateReview = async (req, res, next) => {
    try {
      const { rating, content } = req.body;
      const { userId } = req.user;
      const { reviewId } = req.params;

      let image = req.file ? req.file.location : undefined;
      if (!content || !rating)
        throw new ValidationError("content와 rating의 값을 입력해주세요");

      await this.reviewService.updateReview(
        reviewId,
        userId,
        rating,
        content,
        image
      );

      return res.status(200).json({ message: "리뷰 수정에 성공하였습니다" });
    } catch (err) {
      next(err);
    }
  };

  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { userId } = req.user;
      const deletedReview = await this.reviewService.deleteReview(
        reviewId,
        userId
      );
      return res.status(200).json({ message: "리뷰 삭제에 성공하였습니다" });
    } catch (err) {
      next(err);
    }
  };
}
