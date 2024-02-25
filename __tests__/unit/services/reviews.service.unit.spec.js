import { jest } from "@jest/globals";
import { ReviewService } from "../../../src/services/reviews.service";

let mockReviewRepository = {
  createReview: jest.fn(),
  getReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
};
let reviewService = new ReviewService(mockReviewRepository);

describe("Review Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("getReview Method", async () => {
    const sampleReview = [
      {
        reviewId: 1,
        userId: 1,
        storeId: 1,
        orderId: 1,
        content: "test",
        rating: 4,
        createdAt: "2024-02-02T10:59:39.199Z",
        updatedAt: "2024-02-02T11:50:34.797Z",
      },
      {
        reviewId: 1,
        userId: 2,
        storeId: 2,
        orderId: 2,
        content: "test2",
        rating: 3,
        createdAt: "2024-02-02T10:59:39.199Z",
        updatedAt: "2024-02-02T11:50:34.797Z",
      },
    ];
    mockReviewRepository.getReview.mockReturnValue(sampleReview);

    const Reviews = await reviewService.getReview();

    // expect(Reviews).toEqual(
    //   sampleReview.sort((a, b) => {
    //     return b.createdAt - a.createdAt;
    //   })
    // );
    expect(mockReviewRepository.getReview).toHaveBeenCalledTimes(1);
  });
  test("deleteReview Method By Success", async () => {
    const sampleReview = {
      userId: 1,
      storeId: 1,
      orderId: 1,
      rating: 4,
      content: "test",
    };
    mockReviewRepository.getReview.mockReturnValue(sampleReview);

    const deleteReview = await reviewService.deleteReview();

    expect(mockReviewRepository.getReview).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.deleteReview).toHaveBeenCalledTimes(1);

    expect(deleteReview).toEqual({
      userId: sampleReview.userId,
      storeId: sampleReview.storeId,
      orderId: sampleReview.orderId,
      rating: sampleReview.rating,
      content: sampleReview.content,
      createdAt: sampleReview.createdAt,
      updatedAt: sampleReview.updatedAt,
    });
  });
  test("deleteReview Method By Not Found Review Error", async () => {
    const sampleReview = null;

    mockReviewRepository.getReview.mockReturnValue(sampleReview);

    try {
      await reviewService.deleteReview(8888, "1234");
    } catch (error) {
      expect(mockReviewRepository.getReview).toHaveBeenCalledTimes(1);
      expect(mockReviewRepository.getReview).toHaveBeenCalledWith(8888);

      expect(error.message).toEqual("리뷰 조회에 실패하였습니다");
    }
  });
});
