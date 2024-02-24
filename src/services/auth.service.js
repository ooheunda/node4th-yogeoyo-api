import bcrypt from "bcrypt";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from "../utils/common.error.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtFunc.js";

export class AuthService {
  constructor(usersRepository, pointsRepository) {
    this.usersRepository = usersRepository;
    this.pointsRepository = pointsRepository;
  }

  // 회원가입
  userSignUp = async (email, password, name, address, role) => {
    if (!["user", "owner", "admin"].includes(role))
      throw new ValidationError(
        "권한은 user, owner, admin 중 하나여야 합니다."
      );

    const isExistUser = await this.usersRepository.getUserByEmail(email);
    if (isExistUser) throw new ConflictError("이미 사용중인 이메일 입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name,
      address,
      role
    );

    if (newUser.role === "user")
      await this.pointsRepository.addPointHistory(newUser.userId, 1000000);

    return {
      userId: newUser.userId,
      name: newUser.name,
      address: newUser.address,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
  };

  // 로그인
  userSignIn = async (email, password) => {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new NotFoundError("해당하는 유저가 존재하지 않습니다.");

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedError("비밀번호가 올바르지 않습니다.");

    const [rawPoint] = await this.pointsRepository.getSumOfUserPoints(
      user.userId
    );
    const point = user.role === "user" ? rawPoint._sum.howMuch : 0;

    const accessToken = generateAccessToken(user.userId);
    const refreshToken = generateRefreshToken(user.userId);

    return [
      {
        userId: user.userId,
        name: user.name,
        address: user.address,
        point,
        role: user.role,
      },
      { accessToken, refreshToken },
    ];
  };

  // 로그아웃
  userSignOut = async () => {};
}
