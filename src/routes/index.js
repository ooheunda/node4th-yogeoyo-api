import express from "express";
import AuthRouter from "../routes/auth.router.js";
import UsersRouter from "../routes/users.router.js";
import OrdersRouter from "../routes/orders.router.js";
import MenusRouter from "../routes/menus.router.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/order", OrdersRouter);

router.use("/menu", MenusRouter);

export default router;
