import { ValidationError } from "../utils/common.error.js";

export class SearchService {
  constructor(storeRepository, menuRepository) {
    this.storeRepository = storeRepository;
    this.menuRepository = menuRepository;
  }

  getSearchDatas = async (searchStr, filter) => {
    if (filter && !["store", "menu"].includes(filter))
      throw new ValidationError("filter는 store, menu 중 하나여야 합니다.");

    const searchList = [];
    switch (filter) {
      case "all":
        const storeList = await this.storeRepository.getSearchDatas(searchStr);
        const menuList = await this.menuRepository.getSearchDatas(searchStr);
        break;
      case "store":
        break;
      case "menu":
    }

    return searchList;
  };
}
