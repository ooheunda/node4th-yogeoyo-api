import { jest } from "@jest/globals";
import { ReviewController } from "../../../src/controllers/reviews.controller";
const mockReviewService = {
  createReview: jest.fn(),
  getReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
};
const mockRequest = {
  body: jest.fn(),
  user: jest.fn(),
  params: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const reviewController = new ReviewController(mockReviewService);

describe("Review Controller Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test("getReview Method by Success", async () => {
    const sampleReview = [
      {
        userId: 1,
        storeId: 1,
        orderId: 1,
        rating: 4,
        content: "test",
        createdAt: "2024-02-02T10:59:39.199Z",
        updatedAt: "2024-02-02T11:50:34.797Z",
      },
      {
        userId: 2,
        storeId: 2,
        orderId: 2,
        rating: 3,
        content: "test2",
        createdAt: "2024-02-02T10:59:39.199Z",
        updatedAt: "2024-02-02T11:50:34.797Z",
      },
    ];
    mockReviewService.getReview.mockReturnValue(sampleReview);
    await reviewController.getReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.getReview).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleReview,
    });
  });

  test("createReview Method by Success", async () => {
    const createReviewRequestBodyParams = {
      rating: "Rating_Success",
      content: "Content_Success",
    };
    const createReviewRequestUserParams = {
      userId: "UserId_Success",
    };

    mockRequest.body = createReviewRequestBodyParams;
    mockRequest.user = createReviewRequestUserParams;
    mockRequest.params = { storeId: 1, orderId: 1 };
    const createReviewReturnValue = {
      reviewId: 1,
      storeId: 1,
      orderId: 1,
      ...createReviewRequestUserParams,
      ...createReviewRequestBodyParams,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mockReviewService.createReview.mockReturnValue(createReviewReturnValue);
    await reviewController.createReview(mockRequest, mockResponse, mockNext);
    expect(mockReviewService.createReview).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createReviewReturnValue,
    });
  });

  test("createReview Method by Invalid Params Error", async () => {
    mockRequest.body = {
      rating: "Rating_InvalidParamsError",
      content: "Content_InvalidParamsError",
    };
    mockRequest.body = mockNext;
    await reviewController.createReview(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error("InvalidParamsError"));
  });
});
