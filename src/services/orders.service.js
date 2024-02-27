export class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  createOrders = async (userId, storeId, request, totalPrice, orderItems) => {
    if (!storeId || !totalPrice || !orderItems) {
      throw new Error("주문정보가 올바르지 않습니다.");
    }

    const createdOrders = await this.orderRepository.createOrders(
      userId,
      storeId,
      request,
      totalPrice,
      orderItems
    );

    return {
      userId: createdOrders.userId,
      storeId: createdOrders.storeId,
      request: createdOrders.request,
      totalPrice: createdOrders.totalPrice,
      orderItems: createdOrders.orderItems,
      createdAt: createdOrders.createdAt,
      updatedAt: createdOrders.updatedAt,
    };
  };

  findOrdersById = async (orderId) => {
    const order = await this.orderRepository.findOrdersById(orderId);

    return {
      orderId: order.orderId,
      name: order.name,
      address: order.address,
      category: order.category,
      request: order.request,
      totalPrice: order.totalPrice,
      orderItems: order.orderItems,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  };

  updateOrders = async (orderId, status) => {
    const order = await this.orderRepository.findOrdersById(orderId);
    if (!order) {
      throw new Error("존재하지 않는 주문입니다.");
    }

    await this.orderRepository.updateOrders(orderId, status);

    const updatedOrders = await this.orderRepository.findOrdersById(orderId);
    if (!updatedOrders) {
      throw new Error("주문이 변경되지 않았습니다.");
    }

    return {
      orderId: updatedOrders.orderId,
      status: updatedOrders.status,
    };
  };
}
