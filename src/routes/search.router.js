import express from "express";
import { prisma } from "../utils/prisma.client.js";
import { SearchController } from "../controllers/search.controller.js";
import { SearchService } from "../services/serach.service.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const serachService = new SearchService();
const searchController = new SearchController(usersService);

router.get("/", searchController.getSearchDatas);

export default router;
