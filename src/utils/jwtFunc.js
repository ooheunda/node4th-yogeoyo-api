import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "4h" }
  );
  return accessToken;
};

const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
