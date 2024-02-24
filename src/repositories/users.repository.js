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

  updateUser = async (userId, email, password, name, address, role) => {
    await this.prisma.users.update({
      where: {
        userid: +userId,
      },
      data: {
        email,
        password,
        name,
        address,
        role,
      },
    });
  };

  deleteUser = async (userId) => {
    await this.prisma.users.delete({
      where: {
        userId: +userId,
      },
    });
  };
}
