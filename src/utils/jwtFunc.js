import jwt from "jsonwebtoken";
import { redis } from "./redis.client.js";

export const generateAccessToken = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return accessToken;
};

export const generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );

  await redis.setEx(`${userId}`, 604800, refreshToken);

  return refreshToken;
};

export const verifyAccessToken = (accessToken) => {
  const token = checkTokenType(accessToken);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
};

export const verifyRefreshToken = async (refreshToken) => {
  const token = checkTokenType(refreshToken);

  const isVerify = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
  const isInDB = (await redis.get(`${isVerify.userId}`)) ? 1 : 0;

  return isInDB ? isVerify : null;
};

export const deleteRefreshToken = async (userId) => {
  await redis.del(`${userId}`);
};

const checkTokenType = (token) => {
  const [tokenType, tokenBody] = token.split(" ");
  if (tokenType !== "Bearer") throw new Error("토큰 타입이 일치하지 않습니다.");

  return tokenBody;
};
