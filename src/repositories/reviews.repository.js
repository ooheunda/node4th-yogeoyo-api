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

  updateReview = async (reviewId, userId, rating, content) => {
    const updatedReview = await this.prisma.reviews.update({
      where: { reviewId: +reviewId, userId: +userId },
      data: {
        rating,
        content,
      },
    });
    return updatedReview;
  };

  deleteReview = async (reviewId, userId) => {
    const deletedReview = await this.prisma.reviews.delete({
      where: { reviewId: +reviewId, userId: +userId },
    });
    return deletedReview;
  };
}
