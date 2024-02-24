import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/error-handler.middleware.js";
import Logger from "./middlewares/logger.middleware.js";
import { client } from "./utils/redis.index.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(Logger);
app.use(express.json());
app.use(cookieParser());

app.use("/", router);
app.use(ErrorHandler);

client.on("connect", () => {
  console.info("Redis connected!");
});
client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

client.connect();

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
