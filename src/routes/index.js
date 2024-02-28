import express from "express";
import AuthRouter from "../routes/auth.router.js";
import UsersRouter from "../routes/users.router.js";
import MenusRouter from "../routes/menus.router.js";
import ReviewRouter from "../routes/reviews.router.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/menu", MenusRouter);
router.use("/users", UsersRouter);
router.use("/reviews", ReviewRouter);

export default router;
