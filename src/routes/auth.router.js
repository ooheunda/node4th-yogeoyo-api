import express from "express";
import { prisma } from "../utils/index.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PointsRepository } from "../repositories/points.repository.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const pointsRepository = new PointsRepository(prisma);
const authService = new AuthService(usersRepository, pointsRepository);
const authController = new AuthController(authService);

router.post("/sign-up", authController.userSignUp);
router.post("/sign-in", authController.userSignIn);
router.post("/sign-out", authController.userSignOut);

export default router;
