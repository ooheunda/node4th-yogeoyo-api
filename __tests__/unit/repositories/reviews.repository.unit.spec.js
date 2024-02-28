import { jest } from "@jest/globals";
import { ReviewRepository } from "../../../src/repositories/reviews.repository";

let mockPrisma = {
  reviews: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let reviewRepository = new ReviewRepository(mockPrisma);

describe("Review Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getReview Method", async () => {
    const mockReturn = "findMany String";
    mockPrisma.reviews.findMany.mockReturnValue(mockReturn);

    const review = await reviewRepository.getReview();

    expect(reviewRepository.prisma.reviews.findMany).toHaveBeenCalledTimes(1);

    expect(review).toBe(mockReturn);
  });
  test("createReview Method", async () => {
    const mockReturn = "create Return String";
    mockPrisma.reviews.create.mockReturnValue(mockReturn);

    const createReviewParams = {
      userId: 2,
      storeId: 1,
      orderId: 1,
      rating: 4,
      content: "createReviewcontent",
      image: "createReviewimage",
    };
    const createReviewData = await reviewRepository.createReview(
      createReviewParams.userId,
      createReviewParams.storeId,
      createReviewParams.orderId,
      createReviewParams.rating,
      createReviewParams.content,
      createReviewParams.image
    );
    expect(createReviewData).toBe(mockReturn);

    expect(mockPrisma.reviews.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.reviews.create).toHaveBeenCalledWith({
      data: createReviewParams,
    });
  });
});
