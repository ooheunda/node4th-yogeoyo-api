export class StoresRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  // 음식점 전체 조회
  findAllSortedStores = async (sort) => {
    const stores = await prisma.stores.findMany({
      select: {
        storeId: true,
        status: true,
        createdAt: true,
      },
      orderBy: [{ [sort.orderKey]: orderValue }],
    });

    return stores;
  };

  // 음식점 상세 조회
  findOneStore = async (storeId) => {
    const store = await prisma.stores.findUnique({
      where: {
        storeId: +storeId,
      },
      select: {
        storeId: true,
        status: true,
        createdAt: true,
      },
    });
    return store;
  };

  // 음식점 생성
  createStore = async (data) => {
    await prisma.stores.create({
        where: {
            category: category.toLowerCase().find(category)
        }
      data,
    });
  };

  // 음식점 수정
  updateStore = async (storeId, data) => {
    await prisma.stores.update({
      where: {
        storeId: +storeId,
        category: category.toLowerCase().find(category)
      },
      data,
    });
  };

  // 음식점 삭제
  deleteStore = async (storeId) => {
    await prisma.stores.delete({
      where: {
        storeId: +storeId,
      },
    });
  };
}
