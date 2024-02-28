import { verifyAccessToken } from "../utils/jwtFunc.js";
import { prisma } from "../utils/prisma.client.js";
import { NotFoundError, UnauthorizedError } from "../utils/common.error.js";

export default async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken)
      return res.status(401).json({ message: "로그인이 필요합니다." });
    if (!accessToken && refreshToken)
      return res
        .status(400)
        .json({ message: "토큰 재발급을 한 번 받아보실래요?" });

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
        if (accessToken)
          return res
            .status(400)
            .json({ message: "토큰 재발급을 한 번 받아보실래요?" });

        return res.status(401).json({ message: "토큰이 만료되었습니다." });

      case "JsonWebTokenError":
        return res.status(401).json({ message: "토큰이 조작되었습니다." });

      default:
        return res
          .status(401)
          .json({ message: err.message ?? "비정상적인 요청입니다." });
    }
  }
};
