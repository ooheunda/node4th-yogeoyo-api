export class PointsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getPointHistoryByUserId = async (userId) => {
    const points = await this.prisma.points.findMany({
      where: { userId: +userId },
    });

    return points;
  };

  getSumOfUserPoints = async (userId) => {
    const point = await this.prisma.points.groupBy({
      by: ["userId"],
      where: { userId: +userId },
      _sum: {
        howMuch: true,
      },
    });

    return point;
  };

  addPointHistory = async (userId, howMuch, reason, orderId) => {
    await this.prisma.points.create({
      data: {
        userId: +userId,
        orderId: orderId ? +orderId : null,
        reason,
        howMuch,
      },
    });
  };
}
