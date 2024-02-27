export class OrderItemsService {
  constructor(orderItemsRepository) {
    this.orderItemsRepository = orderItemsRepository;
  }

  createOrderItems = async (menuId, orderId, quantity) => {
    if (!menuId || !orderId || !quantity) {
      throw new Error("장바구니가 올바르지 않습니다.");
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

  findOrderItmesById = async () => {};

  updateOrderItmes = async () => {};

  deleteOrderItmes = async () => {};
}
