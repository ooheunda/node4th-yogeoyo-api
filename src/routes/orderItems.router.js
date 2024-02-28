import express from "express";
import { OrderItemsController } from "../controllers/orderItems.controller";

const router = express.Router();

const orderItemsController = new OrderItemsController(orderItemsService);

// 장바구니 상품 추가
router.post("/", orderItemsController.createOrderItems);

// 장바구니 조회
router.get("/", orderItemsController.getOrderItem);

// 장바구니 수량 변경
router.put("/", orderItemsController.updateOrderItems);

// 장바구니 특정상품 제거
router.delete("/", orderItemsController.deleteOrderItems);
export default router;
