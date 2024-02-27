import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { OrdersController } from "../controllers/orders.controller.js";
import { OrderService } from "../services/orders.service.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PointsRepository } from "../repositories/points.repository.js";

const router = express.Router();

// 역순서대로 해줘야됨
const ordersRepository = new OrderRepository(prisma);
const usersRepository = new UsersRepository(prisma);
const pointsRepository = new PointsRepository(prisma);
const ordersService = new OrderService(ordersRepository);
const ordersController = new OrdersController(
  ordersService,
  usersRepository,
  pointsRepository
);

// 주문
router.post("/order", ordersController.createOrders);

// 주문 확인
router.get("/", ordersController.getOrder);

// 주문 완료
router.put("/", ordersController.updateOrders);

export default router;
