import express from "express";
import { OrdersController } from "../controllers/orders.controller.js";
import { OrderService } from "../services/orders.service.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PointsRepository } from "../repositories/points.repository.js";

const router = express.Router();

const usersRepository = new UsersRepository(usersRepository);
const pointsRepository = new PointsRepository(pointsRepository);
const ordersController = new OrdersController(
  ordersService,
  usersRepository,
  pointsRepository
);
const ordersService = new OrderService(ordersRepository);
const ordersRepository = new OrderRepository(prisma);

// 주문
router.post("/", ordersController.createOrders);

// 주문 확인
router.get("/", ordersController.getOrder);

// 주문 완료
router.put("/", ordersController.updateOrders);

export default router;
