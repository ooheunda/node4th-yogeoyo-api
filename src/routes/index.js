import express from "express";
import AuthRouter from "../routes/auth.router.js";
import UsersRouter from "../routes/users.router.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UsersRouter);

export default router;
