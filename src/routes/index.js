import express from "express";
import AuthRouter from "../routes/auth.router.js";
import UsersRouter from "../routes/users.router.js";
import StoresRouter from "../routes/stores.router.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/stores", StoresRouter);
export default router;
