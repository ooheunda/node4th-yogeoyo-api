import { ConflictError } from "../utils/common.error.js";

export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  getAllMenus = async () => {
    return await this.menuRepository.getAllMenus();
  };

  getMenuById = async (menuId) => {
    return await this.menuRepository.getMenuById(menuId);
  };

  createMenu = async (storeId, stock, status, price, name, image, category) => {
    const isExistMenu = await this.menuRepository.findMenuByName(storeId, name);

    if (isExistMenu) throw new ConflictError("이미 존재하는 메뉴입니다.");
    return await this.menuRepository.createMenu({
      storeId,
      stock,
      status,
      price,
      name,
      image,
      category,
    });
  };

  updateMenu = async (menuId, stock, status, price, name, image, category) => {
    return await this.menuRepository.updateMenu({
      menuId,
      stock,
      status,
      price,
      name,
      image,
      category,
    });
  };

  deleteMenu = async (menuId) => {
    return await this.menuRepository.deleteMenu(menuId);
  };
}
