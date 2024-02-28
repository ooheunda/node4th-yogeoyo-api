export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getAllMenus = async () => {
    return await this.prisma.menus.findMany({
      select: {
        menuId: true,
        storeId: true,
        name: true,
        price: true,
      },
    });
  };

  getMenuById = async (menuId) => {
    return await this.prisma.menus.findUnique({
      where: {
        menuId: parseInt(menuId),
      },
    });
  };

  createMenu = async (menuData) => {
    return await this.prisma.menus.create({
      data: { ...menuData },
    });
  };

  updateMenu = async (
    menuId,
    storeId,
    name,
    price,
    image,
    stock,
    category,
    status
  ) => {
    return await this.prisma.menus.update({
      where: {
        menuId: parseInt(menuId),
      },
      data: {
        storeId,
        name,
        price,
        image,
        stock,
        category,
        status,
      },
    });
  };

  deleteMenu = async (menuId) => {
    return await this.prisma.menus.delete({
      where: {
        menuId: parseInt(menuId),
      },
    });
  };

  findMenuByName = async (storeId, name) => {
    return await this.prisma.menus.findFirst({
      where: { AND: [{ storeId: +storeId }, { name: name }] },
    });
  };
}
