import express from "express";
import { MenuController } from "../controllers/menu.controller.js";
import { MenuService } from "../services/menus.service.js";
import { MenuRepository } from "../repositories/menus.repository.js";
import { prisma } from "../utils/prisma.client.js";
import uploadImage from "../middlewares/image.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const menuRepository = new MenuRepository(prisma);
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

router.get("/", menuController.getAllMenus);
router.get("/:menuId", menuController.getMenuById);
router.post(
  "/",
  authMiddleware,
  uploadImage.single("image"),
  menuController.createMenu
);
router.patch(
  "/:menuId",
  authMiddleware,
  uploadImage.single("image"),
  menuController.updateMenu
);
router.delete("/:menuId", menuController.deleteMenu);

export default router;
