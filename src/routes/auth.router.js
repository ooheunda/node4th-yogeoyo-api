import express from "express";
import { prisma } from "../utils/index.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../controllers/auth.service.js";
import { AuthRepository } from "../controllers/auth.repository.js";

const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.get("/sign-up", authController.userSignUp);
router.get("/sign-in", authController.userSignIn);
router.get("/sign-out", authController.userSignOut);
router.get("/leave", authController.userLeave);

export default router;
