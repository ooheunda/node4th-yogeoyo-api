export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createReview = async (userId, storeId, orderId, rating, content) => {
    const createdReview = await this.prisma.reviews.create({
      data: { userId, storeId, orderId, rating, content },
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
    rating,
    content
  ) => {
    const updatedReview = await this.prisma.reviews.update({
      where: { reviewId: +reviewId },
      data: {
        userId,
        storeId,
        orderId,
        rating,
        content,
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
