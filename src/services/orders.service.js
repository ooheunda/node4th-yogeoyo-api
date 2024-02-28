import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/common.error.js";

export class OrdersService {
  constructor(
    ordersRepository,
    usersRepository,
    pointsRepository,
    menuRepository,
    orderItemsRepository,
    storesRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.usersRepository = usersRepository;
    this.pointsRepository = pointsRepository;
    this.menuRepository = menuRepository;
    this.orderItemsRepository = orderItemsRepository;
    this.storesRepository = storesRepository;
  }

  createOrders = async (user, storeId, request, menus) => {
    if (user.role !== "user")
      throw new UnauthorizedError("음식 주문 권한이 없습니다.");

    let totalPrice = 0;
    for (let i = 0; i < menus.length; i++) {
      const { menuId, quantity } = menus[i];

      const menuInfo = await this.menuRepository.getMenuById(menuId);

      if (!menuInfo) {
        throw new NotFoundError("존재하지 않는 메뉴입니다.");
      }

      totalPrice += menuInfo.price * quantity;
    }

    const curPoint = await this.pointsRepository.getSumOfUserPoints(
      user.userId
    );
    if (curPoint[0]._sum.howMuch < totalPrice) {
      throw new ConflictError(" 포인트가 부족합니다.");
    }

    const order = await this.ordersRepository.createOrders(
      user.userId,
      storeId,
      "accepted",
      request,
      totalPrice
    );

    await this.pointsRepository.addPointHistory(
      user.userId,
      -totalPrice,
      "음식 주문",
      order.orderId
    );

    return { remainPoint: curPoint[0]._sum.howMuch - totalPrice, data: order };
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

  getOrderData = async (user) => {
    const orderList = {};
    if (user.role === "user") {
      orderList.push(
        await this.ordersRepository.getOrdersByUserId(user.userId)
      );
    } else if (user.role === "owner") {
      const store = await this.storesRepository.findStoreByUserId(user.userId);
      if (!store) throw new NotFoundError("보유중인 음식점이 없습니다.");

      orderList.push(
        await this.ordersRepository.getOrdersByStoreId(store.storeId)
      );
    }

    return orderList;
  };

  updateOrderStatus = async (orderId, user) => {
    const order = await this.ordersRepository.findOrdersById(orderId);
    if (!order) throw new NotFoundError("주문이 존재하지 않습니다.");

    const store = await this.storesRepository.findStoreByUserId(user.userId);

    if (user.role !== "owner" || order.storeId !== store.storeId)
      throw new UnauthorizedError("권한이 없습니다.");

    await this.ordersRepository.updateOrderStatus(orderId);
    await this.pointsRepository.addPointHistory(
      user.userId,
      order.totalPrice,
      "배달 완료"
    );

    const point = await this.pointsRepository.getSumOfUserPoints(user.userId);

    return point[0]._sum.howMuch;
  };
}
