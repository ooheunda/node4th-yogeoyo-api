export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getUserByEmail = async (email) => {
    const user = await this.prisma.users.findUnique({ where: { email } });

    return user;
  };

  getUserById = async (userId) => {
    const user = await this.prisma.users.findUnique({
      where: { userId: +userId },
    });

    return user;
  };

  createUser = async (email, password, name, address, role) => {
    const newUser = await this.prisma.users.create({
      data: {
        email,
        password,
        name,
        address,
        role,
      },
    });

    return newUser;
  };

  updateUserInfo = async (userId, data) => {
    const updatedUser = await this.prisma.users.update({
      where: {
        userId: +userId,
      },
      data: {
        password: data.password,
        name: data.name,
        address: data.address,
        role: data.role,
      },
    });

    return updatedUser;
  };

  deleteUser = async (userId) => {
    await this.prisma.users.delete({
      where: {
        userId: +userId,
      },
    });
  };

  verifyUserRole = async (userId, role) => {
    await this.prisma.users.update({
      where: { userId: +userId },
      data: { role },
    });
  };
}
