import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { ReviewController } from "../controllers/reviews.controller.js";
import { ReviewService } from "../services/reviews.service.js";
import { ReviewRepository } from "../repositories/reviews.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/image.js";

const router = express.Router();
const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

//리뷰 작성
router.post(
  "/:storeId/:orderId",
  authMiddleware,
  uploadImage.single("image"),
  reviewController.createReview
);

//리뷰 조회
router.get("/:storeId", authMiddleware, reviewController.getReview);

//리뷰 수정
router.patch(
  "/:storeId/:orderId/:reviewId",
  authMiddleware,
  reviewController.updateReview
);

//리뷰 삭제
router.delete(
  "/:storeId/:orderId/:reviewId",
  authMiddleware,
  reviewController.deleteReview
);

export default router;
