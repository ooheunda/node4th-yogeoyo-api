export class OrdersService {
  constructor(
    ordersRepository,
    usersRepository,
    pointsRepository,
    menuRepository,
    orderItemsRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.usersRepository = usersRepository;
    this.pointsRepository = pointsRepository;
    this.menuRepository = menuRepository;
    this.orderItemsRepository = orderItemsRepository;
  }

  createOrders = async (userId, storeId, request, menus) => {
    if (!storeId) {
      throw new Error("주문정보가 올바르지 않습니다.");
    }

    // 포인트에서 - 메뉴*수량 = totalPrice
    let totalPrice = 0; // 체크
    for (const menu of menus) {
      const { menuId, quantity } = menu;

      const menuInfo = await this.menuRepository.getMenuById(menuId);

      if (!menuInfo) {
        throw new Error("메뉴 정보가 올바르지 않습니다.");
      }
      totalPrice += menuInfo.price * quantity;
    }

    const points = await this.pointsRepository.addPointHistory(
      userId,
      // orderId,
      "음식 주문",
      -totalPrice
    );

    if (!points) {
      throw new Error("포인트가 없습니다.");
    }

    const status = "accepted";

    const remainPoints = await this.pointsRepository.getSumOfUserPoints(userId);
    if (remainPoints[0]._sum.howMuch < 0) {
      throw new Error(" 포인트가 부족합니다.");
    }

    console.log(remainPoints[0]._sum.howMuch);
    const createdOrders = await this.ordersRepository.createOrders(
      userId,
      storeId,
      status,
      request,
      totalPrice,
      remainPoints[0]._sum.howMuch
    );

    return { remainPoint: remainPoints[0]._sum.howMuch, ...createdOrders };
  };

  findOrdersById = async (orderId) => {
    const order = await this.ordersRepository.findOrdersById(orderId);

    return order;
  };

  updateOrders = async (userId, orderId, status) => {
    const order = await this.ordersRepository.findOrdersById(orderId);

    if (!order) {
      throw new Error("존재하지 않는 주문입니다.");
    }

    // 사장권한 찾기 맞는지??
    const user = await this.usersRepository.getUserById(userId);
    const role = user.role;

    // 사장권한
    if (role !== "owner") {
      throw new Error(" 사장님이 아닙니다.");
    }

    const updatedOrders = await this.ordersRepository.updateOrders(
      userId,
      orderId,
      status
    );
    if (!updatedOrders) {
      throw new Error("주문이 변경되지 않았습니다.");
    }

    return {
      userId: updatedOrders.userId,
      orderId: updatedOrders.orderId,
      status: updatedOrders.status,
    };
  };
}
