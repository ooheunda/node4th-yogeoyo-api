import { ValidationError } from "../utils/common.error.js";
import { userValidation } from "../utils/validationSchema.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // 회원가입
  userSignUp = async (req, res, next) => {
    try {
      const {
        email,
        password,
        passwordConfirm,
        name,
        address,
        role = "user",
      } = await userValidation.signUpSchema.validateAsync(req.body);

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

  // 액세스 토큰 재발급 (미들웨어에서 리다이렉트하는 방식으로만 접근됩니다.)
  getNewTokens = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      const [newAccessToken, newRefreshToken] =
        await this.authService.getNewTokens(refreshToken);

      res.cookie("accessToken", `Bearer ${newAccessToken}`);
      res.cookie("refreshToken", `Bearer ${newRefreshToken}`);

      return res.status(200).json({ message: "요청을 다시 시도해주세요." });
    } catch (err) {
      res.clearCookie("refreshToken");
      next(err);
    }
  };
}
