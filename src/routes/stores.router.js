import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { StoresController } from "../controllers/stores.controller.js";
import { StoresService } from "../services/stores.service.js";
import { StoresRepository } from "../repositories/stores.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const storesRepository = new StoresRepository(prisma);
const storesService = new StoresService(storesRepository);
const storesController = new StoresController(storesService);

// 음식점 목록 조회
router.get("/", storesController.findAllStores);

// 음식점 상세 조회
router.get("/:storeId", storesController.findOneStore);

// 음식점 생성
router.post("/", authMiddleware, storesController.createStore);

// 음식점 수정
router.patch("/", authMiddleware, storesController.updateStore);

// 음식점 삭제
router.delete("/", authMiddleware, storesController.deleteStore);

export default router;
