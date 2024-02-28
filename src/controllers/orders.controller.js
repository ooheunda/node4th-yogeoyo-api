export class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  // 오더 주문
  createOrders = async (req, res, next) => {
    try {
      const { request, menus } = req.body;
      const { storeId } = req.params;

      const createdOrders = await this.ordersService.createOrders(
        req.user,
        storeId,
        request,
        menus
      );

      return res
        .status(201)
        .json({ message: "주문이 완료되었습니다.", data: createdOrders });
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

      return res.status(200).json({ data: updatedOrders });
    } catch (err) {
      next(err);
    }
  };

  updateOrderStatus = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const profit = await this.ordersService.updateOrderStatus(
        orderId,
        req.user
      );

      return res
        .status(200)
        .json({ message: "배달 완료 처리 되었습니다.", profit });
    } catch (err) {
      next(err);
    }
  };

  getOrderList = async (req, res, next) => {
    try {
      const orderList = await this.ordersService.getOrderList(req.user);

      return res.status(200).json({ data: orderList });
    } catch (err) {
      next(err);
    }
  };
}
