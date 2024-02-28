export class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  // 오더 주문 // status
  createOrders = async (req, res, next) => {
    try {
      const { request, menus } = req.body;
      const { storeId } = req.params;
      const { userId } = req.user;

      const createdOrders = await this.ordersService.createOrders(
        userId,
        storeId,
        request,
        menus
      );

      return res.status(200).json({ data: createdOrders });
    } catch (err) {
      next(err);
    }
  };

  // 오더 조회
  getOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const order = await this.ordersService.findOrdersById(orderId);

      return res.status(200).json({ data: order });
    } catch (err) {
      next(err);
    }
  };

  // 오더 업데이트
  updateOrders = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { orderId } = req.params;
      const { status } = req.body;

      const updatedOrders = await this.ordersService.updateOrders(
        userId,
        orderId,
        status
      );

      if (!updatedOrders) {
        return res
          .status(400)
          .json({ message: "주문정보를 찾을 수 없습니다." });
      }

      return res.status(200).json({ data: updatedOrders });
    } catch (err) {
      next(err);
    }
  };
}
