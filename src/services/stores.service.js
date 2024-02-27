import { UnauthorizedError, NotFoundError } from "../utils/common.error.js";

export class StoresService {
  constructor(storesRepository) {
    this.storesRepository = storesRepository;
  }

  // 음식점 목록 조회
  findAllSortedStores = async (sort) => {
    const stores = await this.storesRepository.findAllSortedStores(sort);
    return stores;
  };

  // 음식점 상세 조회
  findOneStore = async (storeId) => {
    const store = await this.storesRepository.findOneStore(storeId);
    return store;
  };

  // 음식점 생성
  createStore = async ({ name, address, category, status }) => {
    await this.storesRepository.createStore({
      name,
      address,
      category,
      status,
    });
  };

  // 음식점 수정
  updateStore = async (storeId, data, userId) => {
    const store = await this.storesRepository.findOneStore(storeId);

    // res는 컨트롤러에서 사용하는 것이기 때문에 throw로 변경
    if (!store) {
      throw new NotFoundError("존재하지 않는 음식점입니다.");
    }

    const { name, address, category, status } = data;
    await this.storesRepository.updateStore(storeId, data);
  };

  // 음식점 삭제
  deleteStore = async (storeId, userId) => {
    const store = await this.storesRepository.findOneStore(storeId);

    if (!store) {
      throw new NotFoundError("음식점 조회에 실패했습니다.");
    }

    if (store.userId !== userId) {
      throw new UnauthorizedError("올바르지 않은 요청입니다.");
    }

    await this.storesRepository.deleteStore(storeId);
  };
}
