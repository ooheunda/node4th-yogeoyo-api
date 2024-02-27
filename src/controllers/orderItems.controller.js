export class OrderItemsController {
  constructor(orderItmesService) {
    this.orderItmesService = orderItmesService;
  }

  // 장바구니 생성  // orderId 는 ?
  createOrderItems = async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const { menuId, orderId } = req.params;

      if (!quantity) {
        return res.status(400).json({ message: "수량이 없습니다." });
      }

      const createdOrderItmes = await this.orderItmesService.createOrderItems(
        menuId,
        orderId,
        quantity
      );
      return res.status(200).json({ data: createdOrderItmes });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 조회
  getOrderItem = async (req, res, next) => {
    try {
      const { menuId } = req.params;

      const orderItem = await this.orderItmesService.findOrderItmesById(menuId);

      return res.status(200).json({ data: orderItem });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 수량변경
  updateOrderItmes = async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const { menuId } = req.params;

      const updatedOrderItmes = await this.orderItmesService.updateOrderItmes(
        menuId,
        quantity
      );

      return res.status(200).json({ data: updatedOrderItmes });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 삭제
  deleteOrderItmes = async (req, res, next) => {
    try {
      const { menuId } = req.params;

      const deletedOrderItems =
        await this.orderItmesService.deleteOrderItmes(menuId);

      return res.status(200).json({ data: deletedOrderItems });
    } catch (err) {
      next(err);
    }
  };
}
