export class OrdersService {
  constructor(
    ordersRepository,
    userRepository,
    addPointHistory,
    menusRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.userRepository = userRepository;
    this.addPointHistory = addPointHistory;
    this.menusRepository = menusRepository;
  }

  createOrders = async (userId, storeId, menus, request) => {
    if (!storeId) {
      throw new Error("주문정보가 올바르지 않습니다.");
    }

    // let totalPrice = 0; // 체크
    for (const menu of menus) {
      const { menuId, quantity } = menu;
      const menuInfo = await this.menusRepository.getMenus(menuId);
      if (!menuInfo) {
        throw new Error("메뉴 정보가 올바르지 않습니다.");
      }
      totalPrice += menuInfo.price * quantity;
    }
    console.log(totalPrice);
    const points = await this.pointsRepository.addPointHistory(
      userId,
      orderId,
      "주문 완료로 인한 포인트 차감",
      -totalPrice
    );
    if (!points) {
      throw new Error("포인트가 올바르지 않습니다.");
    }

    const currentPoints = points.howmuch - totalPrice;

    const status = "accepted";

    const createdOrders = await this.ordersRepository.createOrders(
      userId,
      storeId,
      status,
      request,
      totalPrice,
      currentPoints,
      createdAt,
      updatedAt
    );

    return {
      userId: createdOrders.userId,
      storeId: createdOrders.storeId,
      status: createdOrders.status,
      request: createdOrders.request,
      totalPrice: createdOrders.totalPrice,
      currentPoints: createdOrders.currentPoints,
      createdAt: createdOrders.createdAt,
      updatedAt: createdOrders.updatedAt,
    };
  };

  findOrdersById = async (orderId) => {
    const order = await this.ordersRepository.findOrdersById(orderId);

    return {
      orderId: order.orderId,
      name: order.name,
      address: order.address,
      category: order.category,
      status: order.status,
      request: order.request,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  };

  updateOrders = async (orderId, status) => {
    const order = await this.ordersRepository.findOrdersById(orderId);
    if (!order) {
      throw new Error("존재하지 않는 주문입니다.");
    }

    const updatedOrders = await this.ordersRepository.updateOrders(
      orderId,
      status
    );
    if (!updatedOrders) {
      throw new Error("주문이 변경되지 않았습니다.");
    }

    return {
      orderId: updatedOrders.orderId,
      status: updatedOrders.status,
    };
  };
}
