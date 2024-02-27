import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { OrdersController } from "../controllers/orders.controller.js";
import { OrdersService } from "../services/orders.service.js";
import { OrdersRepository } from "../repositories/orders.repository.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PointsRepository } from "../repositories/points.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 역순서대로 해줘야됨
const ordersRepository = new OrdersRepository(prisma);
const usersRepository = new UsersRepository(prisma);
const pointsRepository = new PointsRepository(prisma);
const ordersService = new OrdersService(
  ordersRepository,
  usersRepository,
  pointsRepository
);
const ordersController = new OrdersController(ordersService);

// 주문
router.post("/", authMiddleware, ordersController.createOrders);

// 주문 확인
router.get("/", authMiddleware, ordersController.getOrder);

// 주문 완료
router.put("/", authMiddleware, ordersController.updateOrders);

export default router;
