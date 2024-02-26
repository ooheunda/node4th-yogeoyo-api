import redisClient from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = redisClient.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redis.on("connect", () => {
  console.info("Redis connected!");
});

redis.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redis.connect();
