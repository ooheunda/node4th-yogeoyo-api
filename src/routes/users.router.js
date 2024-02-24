import express from "express";
import { prisma } from "../utils/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersService } from "../services/users.service.js";
import { UsersRepository } from "../repositories/users.repository.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.get("/:userId", usersController.findUserInfoById);
router.patch("/:userId", usersController.updateUserInfo);
router.delete("/leave", usersController.deleteUser);

export default router;
