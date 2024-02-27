import { verifyAccessToken } from "../utils/jwtFunc.js";
import { prisma } from "../utils/prisma.client.js";
import { NotFoundError } from "../utils/common.error.js";

export default async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) throw new Error("로그인이 필요합니다.");
    if (!accessToken && refreshToken) return res.redirect("/auth/tokens");

    const decodedToken = verifyAccessToken(accessToken);
    const userId = decodedToken.userId;

    const user = await prisma.users.findUnique({
      where: { userId: +userId },
    });

    if (!user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new NotFoundError("서버에 사용자가 존재하지 않습니다.");
    }

    req.user = user;

    next();
  } catch (err) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    switch (err.name) {
      case "TokenExpiredError":
        return res.redirect("/auth/tokens");

      case "JsonWebTokenError":
        return res.status(401).json({ message: "토큰이 조작되었습니다." });

      default:
        return res
          .status(401)
          .json({ message: err.message ?? "비정상적인 요청입니다." });
    }
  }
};
