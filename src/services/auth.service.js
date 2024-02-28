import bcrypt from "bcrypt";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} from "../utils/common.error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
  generateEmailToken,
  verifyEmailToken,
} from "../utils/jwtFunc.js";
import { sendMail } from "../utils/nodemailer.js";

export class AuthService {
  constructor(usersRepository, pointsRepository) {
    this.usersRepository = usersRepository;
    this.pointsRepository = pointsRepository;
  }

  // 회원가입
  userSignUp = async (email, password, name, address, role) => {
    role = role || "user";

    if (!["user", "owner", "admin"].includes(role)) {
      throw new ValidationError(
        "권한은 user, owner, admin 중 하나여야 합니다."
      );
    }

    const isExistUser = await this.usersRepository.getUserByEmail(email);
    if (isExistUser) throw new ConflictError("이미 사용중인 이메일 입니다.");

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );

    const newUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name,
      address,
      "needVerification"
    );

    const emailToken = generateEmailToken(newUser.userId, newUser.email, role);
    await sendMail(email, emailToken);

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

    if (user.role === "needVerification")
      throw new UnauthorizedError("이메일 인증을 완료해주세요.");

    const [rawPoint] = await this.pointsRepository.getSumOfUserPoints(
      user.userId
    );
    const point = rawPoint ? rawPoint._sum.howMuch : 0;

    const accessToken = generateAccessToken(user.userId);
    const refreshToken = await generateRefreshToken(user.userId);

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
  userSignOut = async (userId) => {
    await deleteRefreshToken(userId);
  };

  // 액세스 토큰 재발급
  getNewTokens = async (refreshToken) => {
    const token = await verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(token.userId);
    const newRefreshToken = await generateRefreshToken(token.userId);

    return [newAccessToken, newRefreshToken];
  };

  // 이메일 인증
  verifyEmail = async (emailToken) => {
    const decodedToken = verifyEmailToken(emailToken);

    await this.usersRepository.verifyUserRole(
      decodedToken.userId,
      decodedToken.role
    );

    if (decodedToken.role === "user")
      await this.pointsRepository.addPointHistory(
        decodedToken.userId,
        1000000,
        "가입 축하금"
      );
  };
}
