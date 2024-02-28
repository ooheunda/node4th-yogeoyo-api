import { UnauthorizedError, ValidationError } from "../utils/common.error.js";
import { userValidation } from "../utils/validationSchema.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // 회원가입
  userSignUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name, address, role } =
        await userValidation.signUpSchema.validateAsync(req.body);

      if (password !== passwordConfirm)
        throw new ValidationError(
          "비밀번호와 비밀번호 확인이 일치하지 않습니다."
        );

      const newUser = await this.authService.userSignUp(
        email,
        password,
        name,
        address,
        role
      );

      return res
        .status(201)
        .json({ message: "회원가입이 완료 되었습니다.", data: newUser });
    } catch (err) {
      next(err);
    }
  };

  // 로그인
  userSignIn = async (req, res, next) => {
    try {
      const { email, password } =
        await userValidation.signInSchema.validateAsync(req.body);

      const [user, tokens] = await this.authService.userSignIn(email, password);

      res.cookie("accessToken", `Bearer ${tokens.accessToken}`);
      res.cookie("refreshToken", `Bearer ${tokens.refreshToken}`);

      return res
        .status(200)
        .json({ message: `${user.name}님, 환영합니다!`, data: user });
    } catch (err) {
      next(err);
    }
  };

  // 로그아웃
  userSignOut = async (req, res, next) => {
    try {
      const { userId } = req.user;

      await this.authService.userSignOut(userId);

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } catch (err) {
      next(err);
    }
  };

  // 토큰 재발급
  getNewTokens = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken)
        throw new UnauthorizedError(
          "재발급에 필요한 토큰이 존재하지 않습니다."
        );

      const [newAccessToken, newRefreshToken] =
        await this.authService.getNewTokens(refreshToken);

      res.cookie("accessToken", `Bearer ${newAccessToken}`);
      res.cookie("refreshToken", `Bearer ${newRefreshToken}`);

      return res
        .status(200)
        .json({ message: "토큰 재발급이 완료 되었습니다." });
    } catch (err) {
      res.clearCookie("refreshToken");
      switch (err.name) {
        case "TokenExpiredError":
          return res.status(401).json({ message: "토큰이 만료되었습니다." });
        case "JsonWebTokenError":
          return res.status(401).json({ message: "토큰이 조작되었습니다." });
      }
      next(err);
    }
  };

  verifyEmail = async (req, res, next) => {
    try {
      const { token } = req.params;

      await this.authService.verifyEmail(token);

      return res
        .status(200)
        .json({ message: "인증이 완료되었습니다. 로그인 하세요." });
    } catch (err) {
      next(err);
    }
  };
}
