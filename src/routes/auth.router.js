import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PointsRepository } from "../repositories/points.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const pointsRepository = new PointsRepository(prisma);
const authService = new AuthService(usersRepository, pointsRepository);
const authController = new AuthController(authService);

router.post("/sign-up", authController.userSignUp);
router.post("/sign-in", authController.userSignIn);
router.post("/sign-out", authMiddleware, authController.userSignOut);
router.post("/tokens", authController.getNewTokens);

export default router;
