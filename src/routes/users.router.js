import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersService } from "../services/users.service.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PointsRepository } from "../repositories/points.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const pointsRepository = new PointsRepository(prisma);
const usersService = new UsersService(usersRepository, pointsRepository);
const usersController = new UsersController(usersService);

router.get("/me", authMiddleware, usersController.getUserInfo);
router.patch("/me", authMiddleware, usersController.updateUserInfo);
router.delete("/leave", authMiddleware, usersController.deleteUser);

export default router;
