import express from "express";
import { StoresController } from "../controllers/stores.controller.js";

const router = express.Router();
const storesController = new StoresController();

// 음식점 목록 조회
router.get("/stores", storesController.findAllStores);

// 음식점 상세 조회
router.get("/stores/:storeId", storesController.findOneStore);

// 음식점 생성
router.post("/stores", storesController.createStore);

// 음식점 수정
router.patch("/stores/:storeId", storesController.updateStore);

// 음식점 삭제
router.delete("/stores/:storeId", storesController.deleteStore);

export default router;
