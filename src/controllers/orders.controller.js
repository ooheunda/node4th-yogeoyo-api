export class OrdersController {
  constructor(orderService, userRepository, addPointHistory) {
    this.orderService = orderService;
    this.userRepository = userRepository;
    this.addPointHistory = addPointHistory;
  }

  // 오더 주문
  createOrders = async (req, res, next) => {
    try {
      const { request, totalPrice, orderItems } = req.body;
      const { storeId } = req.params;
      const { userId } = req.user;

      if (!totalPrice) {
        return res.status(400).json({
          message: "전체금액이 없습니다.",
        });
      }
      if (!orderItems) {
        return res.status(400).json({
          message: "장바구니가 없습니다.",
        });
      }

      const createdOrders = await this.orderService.createOrders(
        userId,
        storeId,
        request,
        totalPrice,
        orderItems
      );

      // 주문시 포인트 차감 ?? return 값은 ??
      // howmuch 에서 차감을 해야는거잖아 ? 뭘 차감을 하지 ? >> orderItems 개수

      await this.pointsRepository.addPointHistory(userId, -1);

      return res.status(200).json({ data: createdOrders });
    } catch (err) {
      next(err);
    }
  };

  // 오더 조회
  getOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const order = await this.orderService.findOrdersById(orderId);

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

      // 사장권한 찾기 맞는지??
      const user = await this.userRepository.getUserById(userId);
      const role = user.role;

      // 사장권한
      if (role !== "owner") {
        return res.status(400).json({ message: "사장님이 아닙니다." });
      }

      const updatedOrders = await this.orderService.updateOrders(
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
