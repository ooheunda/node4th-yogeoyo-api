export class OrderItemsController {
  constructor(orderItemsService) {
    this.orderItemsService = orderItemsService;
  }

  // 주문항목 생성  // orderId 는 ?
  createOrderItems = async (req, res, next) => {
    try {
      const { menuId, orderId, quantity } = req.body;

      if (!menuId || !orderId || !quantity) {
        return res
          .status(400)
          .json({ message: "메뉴Id, 오더Id , 수량이 없습니다." });
      }

      const createdOrderItmes = await this.orderItemsService.createOrderItems(
        menuId,
        orderId,
        quantity
      );
      return res.status(200).json({ data: createdOrderItmes });
    } catch (err) {
      next(err);
    }
  };

  // 주문항목 조회
  getOrderItem = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const orderItem =
        await this.orderItemsService.findOrderItemsById(orderId);

      return res.status(200).json({ data: orderItem });
    } catch (err) {
      next(err);
    }
  };

  // 주문항목 수량변경
  updateOrderItems = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { quantity } = req.body;

      const updatedOrderItems = await this.orderItemsService.updateOrderItems(
        orderId,
        quantity
      );

      return res.status(200).json({ data: updatedOrderItems });
    } catch (err) {
      next(err);
    }
  };

  // 주문항목 삭제
  deleteOrderItems = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const deletedOrderItems =
        await this.orderItemsService.deleteOrderItems(orderId);

      return res.status(200).json({ data: deletedOrderItems });
    } catch (err) {
      next(err);
    }
  };
}
