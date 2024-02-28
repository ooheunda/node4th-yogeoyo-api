import { expect, jest, test } from "@jest/globals";
import { OrdersRepository } from "../../../src/repositories/orders.repository.js";

let mockPrisma = {
  orders: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

let ordersRepository = new OrdersRepository(mockPrisma);

describe("Posts Repository Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("createOrders TEST", async () => {
    const mockReturn = "craete Return String";
    mockPrisma.orders.create.mockReturnValue(mockReturn);

    const createdOrdersParams = {
      userId: 1,
      storeId: 1,
      request: "요청사항",
      totalPrice: 100,
      currentPoints: 1000,
    };

    const createOrdersData = await ordersRepository.createOrders(
      createdOrdersParams.userId,
      createdOrdersParams.storeId,
      createdOrdersParams.request,
      createdOrdersParams.totalPrice,
      createdOrdersParams.currentPoints
    );

    expect(createOrdersData).toBe(mockReturn);

    expect(mockPrisma.orders.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.orders.create).toHaveBeenCalledWith({
      data: createdOrdersParams,
    });
  });

  test("findOrdersById TEST", async () => {
    const mockReturn = "findUnique Return String";
    mockPrisma.orders.findUnique.mockReturnValue(mockReturn);

    const orderId = 1;
    const order = await ordersRepository.findOrdersById(orderId);

    expect(order).toBe(mockReturn);
  });

  test("updateOrders TEST", async () => {
    const mockReturn = "update Return String";
    mockPrisma.orders.update.mockReturnValue(mockReturn);

    const orderId = 1; // 가상의 orderId를 전달
    const status = "completed";

    const updateOrdersData = await ordersRepository.updateOrders(
      orderId,
      status
    );

    expect(updateOrdersData).toBe(mockReturn);

    expect(mockPrisma.orders.update).toHaveBeenCalledTimes(1);

    expect(mockPrisma.orders.update).toHaveBeenCalledWith({
      where: { orderId },
      data: { status },
    });
  });
});
