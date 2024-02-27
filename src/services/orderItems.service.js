export class OrderItemsService {
  constructor(orderItemsRepository) {
    this.orderItemsRepository = orderItemsRepository;
  }

  createOrderItems = async (menuId, orderId, quantity) => {
    if (!menuId || !orderId || !quantity) {
      throw new Error("주문 항목이 올바르지 않습니다.");
    }

    const createdOrderItmes = await this.orderItemsRepository.createOrderItems(
      menuId,
      orderId,
      quantity
    );

    return {
      menuId: createdOrderItmes.menuId,
      orderId: createdOrderItmes.orderId,
      quantity: createdOrderItmes.quantity,
    };
  };

  findOrderItemsById = async (orderId) => {
    const orderItem =
      await this.orderItemsRepository.findOrderItemsById(orderId);

    return orderItem;
  };

  updateOrderItems = async (orderId, quantity) => {
    const orderItems =
      await this.orderItemsRepository.findOrderItemsById(orderId);
    if (!orderItems) {
      throw new Error("주문 항목이 없습니다.");
    }

    const updatedOrderItems = await this.orderItemsRepository.updateOrderItems(
      orderId,
      quantity
    );
    if (!updatedOrderItems) {
      throw new Error("주문 항목을 업데이트 할 수 없습니다.");
    }

    return {
      orderId: updatedOrderItems.orderId,
      quantity: updatedOrderItems.quantity,
    };
  };

  deleteOrderItems = async (orderId) => {
    const orderItems = await this.orderItemsRepository.findOrdersById(orderId);
    if (!orderItems) {
      throw new Error("주문 항목이 존재하지 않습니다.");
    }

    const deletedOrderItems =
      await this.orderItemsRepository.deleteOrderItems(orderId);

    return {
      orderId: deletedOrderItems.orderId,
    };
  };
}
