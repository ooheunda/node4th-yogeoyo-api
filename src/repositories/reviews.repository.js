export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createReview = async (userId, storeId, orderId, content, rating) => {
    const createdReview = await this.prisma.reviews.create({
      data: { userId, storeId, orderId, content, rating },
    });
    return createdReview;
  };

  getReview = async () => {
    const reviews = await this.prisma.reviews.findMany({
      include: {},
    });
    return reviews;
  };

  updateReview = async (
    reviewId,
    userId,
    storeId,
    orderId,
    content,
    rating
  ) => {
    const updatedReview = await this.prisma.reviews.update({
      where: { reviewId: +reviewId },
      data: {
        userId,
        storeId,
        orderId,
        content,
        rating,
      },
    });
    return updatedReview;
  };

  deleteReview = async (reviewId, userId) => {
    const deletedReview = await this.prisma.reviews.delete({
      where: { reviewId: +reviewId, user: { userId } },
    });
    return deletedReview;
  };
}
