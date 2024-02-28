import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
  ConflictError,
} from "../utils/common.error.js";
import bcrypt from "bcrypt";

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
    if (!store) throw new NotFoundError("존재하지 않는 음식점입니다.");

    return store;
  };

  // 음식점 생성
  createStore = async (userId, name, address, category, status) => {
    const isExist = await this.storesRepository.findStoreByUserId(userId);
    if (isExist)
      throw new ConflictError("한 유저는 하나의 음식점만 운영할 수 있습니다.");

    const enumCategory = [
      "chicken",
      "pizza",
      "burger",
      "salad",
      "korean_food",
      "japanese_food",
      "chinese_food",
      "snack_bar",
      "cafe",
      "etc",
    ];
    const enumStatus = ["opened", "closed"];

    if (!enumCategory.includes(category)) {
      throw new ValidationError("유효하지 않은 카테고리입니다.");
    }
    if (!enumStatus.includes(status)) {
      throw new ValidationError("유효하지 않은 상태입니다.");
    }

    const createdStore = await this.storesRepository.createStore(
      userId,
      name,
      address,
      category,
      status
    );

    return createdStore;
  };

  // 음식점 수정
  updateStore = async (userId, name, address, category, status) => {
    const store = await this.storesRepository.findStoreByUserId(userId);

    if (!store) throw new NotFoundError("존재하지 않는 음식점입니다.");

    const enumCategory = [
      "chicken",
      "pizza",
      "burger",
      "salad",
      "korean_food",
      "japanese_food",
      "chinese_food",
      "snack_bar",
      "cafe",
      "etc",
    ];
    const enumStatus = ["opened", "closed"];

    if (category && !enumCategory.includes(category))
      throw new ValidationError("유효하지 않은 카테고리입니다.");

    if (status && !enumStatus.includes(status))
      throw new ValidationError("유효하지 않은 상태입니다.");

    const updatedStore = await this.storesRepository.updateStore(
      userId,
      name,
      address,
      category,
      status
    );

    return updatedStore;
  };

  // 음식점 삭제
  deleteStore = async (user, password) => {
    const store = await this.storesRepository.findStoreByUserId(user.userId);

    if (!store) {
      throw new NotFoundError("존재하지 않는 음식점입니다.");
    }

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedError("비밀번호가 올바르지 않습니다.");

    await this.storesRepository.deleteStore(store.storeId);
  };
}
