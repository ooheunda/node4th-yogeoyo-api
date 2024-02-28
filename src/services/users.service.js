import { NotFoundError, UnauthorizedError } from "../utils/common.error.js";
import bcrypt from "bcrypt";

export class UsersService {
  constructor(usersRepository, pointsRepository) {
    this.usersRepository = usersRepository;
    this.pointsRepository = pointsRepository;
  }

  getUserInfo = async (userId) => {
    const user = await this.usersRepository.getUserById(userId);
    if (!user) throw new NotFoundError("존재하지 않는 유저입니다.");

    const [rawPoint] = await this.pointsRepository.getSumOfUserPoints(
      user.userId
    );

    user.point = user.role === "user" ? rawPoint._sum.howMuch : 0;
    delete user.password;

    return user;
  };

  updateUserInfo = async (userId, data) => {
    if (data.role && !["user", "owner"].includes(data.role))
      throw new ValidationError("권한은 user, owner 중 하나여야 합니다.");

    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        +process.env.BCRYPT_SALT
      );
    }
    const updatedUser = await this.usersRepository.updateUserInfo(userId, data);
    delete updatedUser.password;

    return updatedUser;
  };

  deleteUser = async (userId, password) => {
    const user = await this.usersRepository.getUserById(userId);

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedError("비밀번호가 올바르지 않습니다.");

    await this.usersRepository.deleteUser(userId);
  };
}
