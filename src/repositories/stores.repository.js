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
        storeId: true,
        address: true,
        status: true,
        category: true,
        createdAt: true,
      },
    });

    return store;
  };

  // 음식점 생성
  createStore = async (userId, storeId, name, address, category, status) => {
    await this.prisma.stores.create({
      userId: +userId,
      storeId: +storeId,
      name,
      address,
      category: category.toLowerCase().find(category),
      status: status.toLowerCase().find(status),
    });

    return createStore;
  };
  // find 메서드는 enum 값 검증하려고 넣었습니다!
  // 서비스에 넣을지 레포에 넣을지 헷갈렸는데 팀원분들이 각각 흩어져 계실 때라 튜터님께 여쭤봤습니다
  // 기주튜터님 왈: 프로젝트 규모가 커지면 저장소 레벨에서 코드를 참조할 일이 많아지기 때문에 그런 부분을 고려한다면 이 경우는 레포에서 검사하는게 좀더 적합함

  // 음식점 수정
  updateStore = async (userId, storeId, name, address, category, status) => {
    await this.prisma.stores.update({
      userId: +userId,
      storeId: +storeId,
      name,
      address,
      category: category.toLowerCase().find(category),
      status: status.toLowerCase().find(status),
    });

    return updateStore;
  };

  // 음식점 삭제
  deleteStore = async (storeId) => {
    await this.prisma.stores.delete({
      where: {
        storeId: +storeId,
      },
      password,
    });

    return deleteStore;
  };
}
