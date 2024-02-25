import express from "express";
import { prisma } from "../utils/index.js";
import { ReviewController } from "../controllers/reviews.controller.js";
import { ReviewService } from "../services/reviews.service.js";
import { ReviewRepository } from "../repositories/reviews.repository.js";
// import { authMiddleware } from "../../middlewares/need-signin.middleware.js";
//미들웨어 수정되면 바꾸기

const router = express.Router();
const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

//리뷰 작성
// router.post("/reviews/:storeId/:orderId", reviewController.createReview);
router.post("/reviews", reviewController.createReview);

//리뷰 조회
router.get("/reviews/:storeId/:orderId", reviewController.getReview);

//리뷰 수정
router.patch(
  "/reviews/:storeId/:orderId/:reviewId",
  reviewController.updateReview
);

//리뷰 삭제
router.delete(
  "/reviews/:storeId/:orderId/:reviewId",
  reviewController.deleteReview
);

export default router;
