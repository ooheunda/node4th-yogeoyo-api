export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createReview = async (userId, storeId, orderId, rating, content, image) => {
    const createdReview = await this.prisma.reviews.create({
      data: {
        userId,
        storeId: +storeId,
        orderId: +orderId,
        rating,
        content,
        image,
      },
    });
    return createdReview;
  };

  getReview = async () => {
    const reviews = await this.prisma.reviews.findMany({
      include: {},
    });
    return reviews;
  };

  getReviewId = async (reviewId) => {
    const review = await this.prisma.reviews.findUnique({
      where: { reviewId: +reviewId },
    });
    return review;
  };
  updateReview = async (
    reviewId,
    storeId,
    orderId,
    userId,
    rating,
    content,
    image
  ) => {
    const updatedReview = await this.prisma.reviews.update({
      where: { reviewId: +reviewId },
      data: {
        userId,
        storeId: +storeId,
        orderId: +orderId,
        rating,
        content,
        image,
      },
    });
    return updatedReview;
  };

  deleteReview = async (reviewId, storeId, orderId, userId) => {
    const deletedReview = await this.prisma.reviews.delete({
      where: {
        reviewId: +reviewId,
        storeId: +storeId,
        orderId: +orderId,
        userId: +userId,
      },
    });
    return deletedReview;
  };
}
