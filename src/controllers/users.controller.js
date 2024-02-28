import { userValidation } from "../utils/validationSchema.js";
import { ValidationError } from "../utils/common.error.js";

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  // 유저 정보 조회
  getUserInfo = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const userInfo = await this.usersService.getUserInfo(userId);

      return res.status(200).json({ data: userInfo });
    } catch (err) {
      next(err);
    }
  };

  // 유저 정보 업데이트
  updateUserInfo = async (req, res, next) => {
    try {
      const { password, passwordConfirm, name, address, role } =
        await userValidation.userUpdateSchema.validateAsync(req.body);

      if (password && password !== passwordConfirm)
        throw new ValidationError(
          "비밀번호와 비밀번호 확인이 일치하지 않습니다."
        );

      if (!password && !name && !address && !role)
        throw new ValidationError("수정할 데이터를 입력해주세요.");

      const updatedUser = await this.usersService.updateUserInfo(user, {
        password,
        name,
        address,
        role,
      });

      return res
        .status(200)
        .json({ message: "수정 완료 되었습니다.", data: updatedUser });
    } catch (err) {
      next(err);
    }
  };

  // 회원 탈퇴
  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { password } = await userValidation.passwordSchema.validateAsync(
        req.body
      );

      await this.usersService.deleteUser(userId, password);

      return res.status(200).json({ message: "탈퇴 완료 되었습니다." });
    } catch (err) {
      next(err);
    }
  };
}
