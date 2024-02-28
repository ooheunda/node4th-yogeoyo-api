import { expect, jest } from "@jest/globals";
import { OrdersService } from "../../../src/services/orders.service.js";
import { MenuService } from "../../../src/services/menus.service.js";
import { PointsService } from "../../../src/repositories/points.repository.js";

let mockOrdersRepository = {
  createOrders: jest.fn(),
  findOrdersById: jest.fn(),
  updateOrders: jest.fn(),
};

let mockPointsRepository = {
  addPointHistory: jest.fn(),
};
let mockMenuRepository = {
  getAllMenus: jest.fn(),
};

let ordersService = new OrdersService(mockOrdersRepository);

let menuService = new MenuService(mockMenuRepository);

let pointsService = new PointsService(mockPointsRepository);

describe("Posts Repository Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  // 생성
  test("createOrders Test", async () => {
    const sampleOrders = {
      userId: 1,
      storeId: 1,
      menus: [
        { menuId: 1, quantity: 2 },
        { menuId: 2, quantity: 3 },
      ],
      stauts: "accepted",
      request: "요청사항",
      totalPrice: 1000,
      currentPonints: 10000,
      creaedAt: new Date(),
      updatedAt: new Date(),
    };

    mockMenuRepository.getAllMenus
      .mockReturnValueOnce({ price: 10 })
      .mockReturnValueOnce({ price: 20 });

    mockOrdersRepository.createOrders.mockReturnValue(sampleOrders);

    const createdOrders = await ordersService.createOrders(
      sampleOrders.userId,
      sampleOrders.storeId,
      sampleOrders.menus,
      sampleOrders.request
    );

    expect(mockOrdersRepository.createOrders).toHaveBeenCalledTimes(1);

    expect(mockMenuRepository.getAllMenus).toHaveBeenCalledTimes(1);

    expect(createdOrders).toEqual(sampleOrders);
  });

  // 조회
  test("findOrdersById Test", async () => {
    const sampleOrders = {
      orderId: 1,
      name: "송영욱",
      address: "서울",
      category: "피자",
      status: "accepted",
      request: "요청사항",
      totalPrice: 1111,
      creaedAt: new Date(),
      updatedAt: new Date(),
    };

    const oneOrders = await postsService.findOrdersById();

    expect(oneOrders).toEqual(sampleOrders);

    expect(mockOrdersRepository.findOrdersById).toHaveBeenCalledTimes(1);
  });

  test("updateOrders Test", async () => {
    const sampleOrders = {
      orderId: 1,
      status: "complete",
    };

    expect(mockOrdersRepository.findOrdersById).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.findOrdersById).toHaveBeenCalledWith(
      sampleOrders.orderId
    );

    expect(mockOrdersRepository.updateOrders).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.updateOrders).toHaveBeenCalledWith(
      sampleOrders.orderId,
      sampleOrders.status
    );
    expect(updatedOrder).toEqual({
      orderId: sampleOrders.orderId,
      status: sampleOrders.status,
    });
  });
});
