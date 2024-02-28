import express from "express";
import AuthRouter from "../routes/auth.router.js";
import UsersRouter from "../routes/users.router.js";
import SearchRouter from "../routes/serach.router.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/search", SearchRouter);

export default router;
