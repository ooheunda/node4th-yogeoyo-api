import bcrypt from "bcrypt";
import { ValidationError, ConflictError } from "../utils/common.error.js";
export class AuthService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  // 회원가입
  userSignUp = async (email, password, name, address, role) => {
    if (!["user", "owner", "admin"].includes(role))
      throw new ValidationError("권한은 user, owner, admin 중 하나 입니다.");

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

    return {
      userId: newUser.userId,
      name: newUser.name,
      address: newUser.address,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
  };

  // 로그인
  userSignIn = async () => {};

  // 로그아웃
  userSignOut = async () => {};

  // 회원탈퇴
  userLeave = async () => {};
}
