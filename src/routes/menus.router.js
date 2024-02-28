import express from "express";
import { MenuController } from '../controllers/menu.controller.js';
import { MenuService } from '../services/MenuService.js';
import { MenuRepository } from '../repositories/MenuRepository.js';
import { prisma } from "../utils/index.js";
import uploadImage from "../middlewares/image.js"
// import authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

const menuRepository = new MenuRepository(prisma);
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

router.get('/', menuController.getAllMenus.bind(menuController));
router.get('/:menuId', menuController.getMenuById.bind(menuController));
router.post('/', uploadImage.single("image"), menuController.createMenu.bind(menuController));
router.patch('/:menuId', uploadImage.single("image"), menuController.updateMenu.bind(menuController));
router.delete('/:menuId', menuController.deleteMenu.bind(menuController));

export default router;