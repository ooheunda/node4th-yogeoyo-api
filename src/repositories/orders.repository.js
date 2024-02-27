export class OrderRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createOrders = async (userId, storeId, request, totalPrice, orderItems) => {
    const createdOrders = await this.prisma.orders.create({
      data: {
        userId,
        storeId,
        request,
        totalPrice,
        orderItems,
      },
    });

    return createdOrders;
  };

  findOrdersById = async (orderId) => {
    const order = await this.prisma.orders.findUnique({
      where: {
        orderId: +orderId,
      },
    });

    return order;
  };

  updateOrders = async (orderId, status) => {
    if (!Object.values(OrderStatus).includes(status)) {
      throw new Error("유효하지 않은 주문 상태입니다.");
    }

    const updatedOrders = await this.prisma.orders.update({
      where: { orderId: +orderId },
      data: { status },
    });
    return updatedOrders;
  };
}
