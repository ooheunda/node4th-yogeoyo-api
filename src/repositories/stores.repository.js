export class StoresRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 음식점 목록 조회
  findAllSortedStores = async (sort) => {
    const stores = await this.prisma.stores.findMany({
      select: {
        storeId: true,
        name: true,
        category: true,
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
    });

    return store;
  };

  // 음식점 생성
  createStore = async (userId, name, address, category, status) => {
    const createdStore = await this.prisma.stores.create({
      data: {
        userId: +userId,
        name,
        address,
        category: category,
        status: status,
      },
    });

    return createdStore;
  };

  // 음식점 수정
  updateStore = async (userId, name, address, category, status) => {
    const updatedStore = await this.prisma.stores.update({
      where: { userId: +userId },
      data: {
        name,
        address,
        category: category,
        status: status,
      },
    });

    return updatedStore;
  };

  // 음식점 삭제
  deleteStore = async (storeId) => {
    await this.prisma.stores.delete({
      where: {
        storeId: +storeId,
      },
    });
  };

  findStoreByUserId = async (userId) => {
    const store = await this.prisma.stores.findFirst({
      where: { userId: +userId },
    });

    return store;
  };
}
