import { jest } from "@jest/globals";
import { OrdersService } from "../../../src/services/orders.service.js";
import { OrdersRepository } from "../../../src/repositories/orders.repository.js";
import { MenusRepository } from "../../../src/services/menus.service.js";
import { PointsRepository } from "../../../src/repositories/points.repository.js";

let mockOrdersRepository = {
  createOrders: jest.fn(),
  findOrdersById: jest.fn(),
  updateOrders: jest.fn(),
};

let mockUsersRepository = {};
let mockPointsRepository = {
  addPointHistory: jest.fn(),
};
let mockMenusRepository = {
  getMenus: jest.fn(),
};

let ordersService = new OrdersService(
  mockOrdersRepository,
  mockUsersRepository,
  mockPointsRepository,
  mockMenusRepository
);

describe("Posts Repository Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("createOrders Test", async () => {
    const sampleOrders = {
      userId: 1,
      storeId: 1,
      menus: [
        { menuId: 1, quantity: 2 },
        { menuId: 2, quantity: 3 },
      ],
      request: "요청사항",
    };

    mockMenusRepository.getMenus
      .mockReturnValueOnce({ price: 10 })
      .mockReturnValueOnce({ price: 20 });

    mockOrdersRepository.createOrders.mockReturnValue({
      userId,
      storeId,
      status: "accepted",
      request,
      totalPrice: 500,
      currentPoints: 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  test("findOrdersById Test", async () => {});

  test("updateOrders Test", async () => {});
});
