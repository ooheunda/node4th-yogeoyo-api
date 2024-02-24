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
        .json({ message: "회원가입 완료 되었습니다.", data: newUser });
    } catch (err) {
      next(err);
    }
  };

  // 로그인
  userSignIn = async (req, res, next) => {};

  // 로그아웃
  userSignOut = async (req, res, next) => {};
}
