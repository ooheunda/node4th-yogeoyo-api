export class StoresRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 음식점 목록 조회
  findAllSortedStores = async (sort) => {
    const stores = await this.prisma.stores.findMany({
      select: {
        storeId: true,
        status: true,
        createdAt: true,
      },
      orderBy: [{ [sort.orderKey]: sort.orderValue }],
    });

    return stores;
  };

  // 음식점 상세 조회
  findOneStore = async (storeId) => {
    const store = await this.prisma.stores.findUnique({
      where: {
        storeId: +storeId,
      },
      select: {
        name: true,
        address: true,
        status: true,
        category: true,
        createdAt: true,
      },
    });

    return store;
  };

  // 음식점 생성
  createStore = async (userId, name, address, category, status) => {
    console.log(status); // undefined
    const createdStore = await this.prisma.stores.create({
      data: {
        userId: +userId,
        name,
        address,
        category: category.toLowerCase(),
        status: status.toLowerCase(),
      },
    });

    return createdStore;
  };

  // 음식점 수정
  updateStore = async (storeId, userId, name, address, category, status) => {
    const updatedStore = await this.prisma.stores.update({
      where: { storeId: +storeId },
      data: {
        userId: +userId,
        name,
        address,
        category: category.toLowerCase(),
        status: status.toLowerCase(),
      },
    });

    return updatedStore;
  };

  // 음식점 삭제
  deleteStore = async (storeId, password) => {
    await this.prisma.stores.delete({
      where: {
        storeId: +storeId,
      },
      password,
    });

    return { message: "음식점이 삭제되었습니다." };
  };
}
