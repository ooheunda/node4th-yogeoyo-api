export class OrdersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createOrders = async (userId, storeId, status, request, totalPrice) => {
    const createdOrders = await this.prisma.orders.create({
      data: {
        user: { connect: { userId: userId } },
        store: { connect: { storeId: +storeId } },
        status,
        request,
        totalPrice,
      },
    });

    return createdOrders;
  };

  findOrdersById = async (orderId) => {
    const order = await this.prisma.orders.findFirst({
      where: {
        orderId: +orderId,
      },
    });

    return order;
  };

  updateOrders = async (userId, orderId, status) => {
    const updatedOrders = await this.prisma.orders.update({
      where: { userId: +userId, orderId: +orderId },
      data: { status },
    });
    return updatedOrders;
  };
}
