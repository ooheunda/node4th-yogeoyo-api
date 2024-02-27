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
      if (!content || !rating)
        throw new ValidationError("content와 rating의 값을 입력해주세요");

      if (!storeId || !orderId) throw new ValidationError("InvalidParamsError");
      let image = null;
      if (req.file) image = req.file.location;
      const createdReview = await this.reviewService.createReview(
        userId,
        storeId,
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
      const { content, rating } = req.body;
      const { userId } = req.user;
      const { reviewId, storeId } = req.params;
      const image = req.file;

      if (!content || !rating)
        throw new ValidationError("content와 rating의 값을 입력해주세요");

      if (!storeId) throw new ValidationError("InvalidParamsError");

      const updatedReview = await this.reviewService.updateReview(
        reviewId,
        storeId,
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
