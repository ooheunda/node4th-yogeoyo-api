export class OrderItemsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createOrderItems = async (menuId, orderId, quantity) => {
    const createdOrderItmes = await this.prisma.orderItems.create({
      data: {
        menuId,
        orderId,
        quantity,
      },
    });

    return createdOrderItmes;
  };

  findOrderItemsById = async (orderId) => {
    const orderItem = await this.prisma.orderItems.findUnique({
      where: {
        orderId: +orderId,
      },
    });
    return orderItem;
  };

  updateOrderItems = async (orderId, quantity) => {
    const updatedOrderItems = await this.prisma.orderItems.update({
      where: {
        orderId: +orderId,
      },
      data: { quantity },
    });

    return updatedOrderItems;
  };

  deleteOrderItems = async (orderId) => {
    const deletedOrderItems = await this.prisma.orderItems.delete({
      where: { orderId: +orderId },
    });
    return deletedOrderItems;
  };
}
